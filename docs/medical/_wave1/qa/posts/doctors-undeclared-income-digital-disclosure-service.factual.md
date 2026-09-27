# Factual QA (Track A): doctors-undeclared-income-digital-disclosure-service

File: `docs/medical/_wave1/posts/doctors-undeclared-income-digital-disclosure-service.md` (new post)
Reviewed 2026-09-27. Tie-breaker: `docs/medical/house_positions.md`, which is silent on
disclosure, so every assertion below is checked against primary law and HMRC guidance.

Sources used, fetched 2026-09-27:

- **DDS guide** = gov.uk "Your guide to making a disclosure" (`/government/publications/hmrc-your-guide-to-making-a-disclosure/your-guide-to-making-a-disclosure`)
- **CC/FS11** = gov.uk "Compliance checks: penalties for failure to notify - CC/FS11" (updated 19 March 2026)
- **CC/FS7A** = gov.uk "Compliance checks: penalties for inaccuracies in returns or documents - CC/FS7A", cross-checked against HMRC Compliance Handbook CH82470
- **CDF** = gov.uk "Admitting tax fraud: the Contractual Disclosure Facility (CDF)"
- **TMA 1970** ss.29, 34, 36; **FA 2007 Sch 24**; **FA 2008 Sch 41**

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | metaDescription, summary, kt1, faq1, intro | Careless: unprompted penalty starts at 0%, prompted at 15% | CC/FS7A / CH82470 (careless 0-30 unprompted, 15-30 prompted) | CORRECT |
| 2 | summary, kt2, faq2, intro, H2.1 | Reasonable care = 4 years | TMA 1970 s.34 (4 years after end of year of assessment); DDS guide "maximum of 4 years" | CORRECT |
| 3 | summary, kt2, faq2, intro, H2.1 | Careless = 6 years, TMA 1970 s.36(1) | s.36(1); DDS guide "maximum of 6 years" | CORRECT |
| 4 | summary, kt2, faq2, intro, H2.1 | Deliberate = 20 years, TMA 1970 s.36(1A) | s.36(1A); DDS guide "maximum of 20 years" | CORRECT (s.36(1A) also reaches non-deliberate failure to notify under s.7 and certain schemes; the post does not claim the list is exhaustive, so no edit) |
| 5 | kt2, faq2, H2.1 | "HMRC's own disclosure guidance uses the same three figures" | DDS guide, verbatim 4 / 6 / 20 | CORRECT |
| 6 | H2.1 | Closed years are reopened by discovery assessment under TMA 1970 s.29 | s.29(1) | CORRECT |
| 7 | kt3, faq3, H2.3 | DDS is two steps: notify, HMRC acknowledges and issues a disclosure reference number, then disclose | DDS guide steps 1 and 2 | CORRECT |
| 8 | kt3, faq3, intro, H2.3, closing | 90 days run from the date HMRC acknowledges the notification, to submit the disclosure **and pay** | DDS guide: "disclose within 90 days of the date that we acknowledge your notification"; "get your disclosure and payment within 90 days of the date we issue the notification acknowledgement" | CORRECT (including the "and pay" limb and the acknowledgement, not notification, start date) |
| 9 | H2.2 table | Careless 0-30 unprompted / 15-30 prompted | CC/FS7A, CH82470 | CORRECT |
| 10 | H2.2 table, faq1, intro | Deliberate not concealed 20-70 unprompted / 35-70 prompted | CC/FS7A, CH82470 | CORRECT |
| 11 | H2.2 table | Deliberate and concealed 30-100 unprompted / 50-100 prompted | CC/FS7A, CH82470 | CORRECT |
| 12 | H2.2 | Return inaccuracies are penalised under FA 2007 Sch 24, ranges published in CC/FS7A | Sch 24 paras 1, 4, 10; CC/FS7A is the inaccuracies factsheet | CORRECT |
| 13 | faq5, H2.2 | Never registering = failure to notify, penalised under FA 2008 Sch 41, not Sch 24 | Sch 41 para 1 (obligation under TMA s.7); CC/FS11 | CORRECT |
| 14 | faq5, H2.2 | Sch 41 non-deliberate: unprompted 0-30 within 12 months of the tax being due, 10-30 after; prompted 10-30 within 12 months, 20-30 after | CC/FS11, all four figures matched exactly | CORRECT (the 12-month split is on both the unprompted and the prompted row, as written) |
| 15 | faq5, H2.2 | Sch 41 deliberate bands match the inaccuracy bands (20-70 and 30-100) | CC/FS11: deliberate 20-70 / 35-70, deliberate and concealed 30-100 / 50-100 | CORRECT |
| 16 | H2.2 | Quality of disclosure: telling up to 30%, helping up to 40%, giving access up to 30% | CC/FS11 and CC/FS7A, identical split | CORRECT |
| 17 | kt4, intro, H2.4 | Interest runs daily from the date each year's tax was originally due until paid | DDS guide: "We charge interest from the date tax is due until the date it's paid. Interest is calculated on a daily basis" | CORRECT (described qualitatively, no rate asserted, so nothing to go stale) |
| 18 | intro, H2.4 | Interest is compensation for late payment, not reduced by coming forward | Penalty reductions in Sch 24 / Sch 41 attach to the penalty only; no interest relief in the DDS guide | CORRECT |
| 19 | faq4, intro, H2.4 | If you cannot pay in full, call the helpline as soon as possible and before sending the disclosure in, so time to pay is arranged alongside it | DDS guide: "If you cannot pay the full amount, let us know as soon as possible and before you send in your disclosure by calling the helpline" | CORRECT |
| 20 | faq4, H2.4 | Time to pay changes the schedule, not the amount; interest continues | Standard TTP terms; consistent with source 17 | CORRECT |
| 21 | faq6, H2.3 | HMRC will not accept disclosures found to be largely wrong or incomplete when checked | DDS guide, verbatim "HMRC will not accept disclosures that are found to be largely wrong or incomplete when we check them" | CORRECT |
| 22 | kt5, faq6, H2.5 | Fraud goes to the Contractual Disclosure Facility under Code of Practice 9, which covers deliberate behaviour only and not errors or mistakes | CDF page: "You can only use the Contractual Disclosure Facility to admit to tax fraud. You must not use the facility to tell HMRC about errors, mistakes or avoidance schemes that are not related to fraud" | CORRECT |
| 23 | faq6, H2.5 | The CDF is requested on form CDF1 | CDF page links "ask HMRC to consider you for a Contractual Disclosure Facility contract (form CDF1)" | CORRECT |
| 24 | faq1, intro | A disclosure is unprompted when made before you have reason to believe HMRC has discovered the problem or is about to | FA 2007 Sch 24 para 9(2); FA 2008 Sch 41 para 12(3) | CORRECT |
| 25 | throughout | No HMRC outcome promised | Checked: the post promises a penalty **range floor**, never an acceptance, a settlement figure, a reduction or immunity. "Lands lower" at H2.2 is tied to the quality-of-disclosure reductions in source 16 and is qualitative | CORRECT |

No unsourced figures were found. Nothing removed, nothing corrected.

## Edit log

Total edits: **0**. No WRONG, STALE or UNSOURCED assertion was found; the post was not
modified. Frontmatter re-parsed as YAML after review: valid, 14 keys, unchanged.

## Frontmatter validation (S4b)

- Required keys all present: slug, title, date, category, metaDescription, metaTitle, h1, summary, author, canonical, dateModified, faqs, keyTakeaways, generator. PASS
- metaTitle 51 chars (limit 60). PASS
- metaDescription 137 chars (limit 155). PASS
- canonical `https://www.medicalaccounts.co.uk/blog/doctors-undeclared-income-digital-disclosure-service`, Medical flat form. PASS
- author "Medical Accountants UK Editorial Team", matching the site's existing posts. PASS
- category "Private Practice", verbatim on the Medical list. PASS
- generator `claude-opus`. PASS
- date 2026-09-27, dateModified 2026-09-27 (new post, equal as required). PASS
- summary 44 words (band 40 to 60). PASS
- faqs 6 (band 4 to 6), keyTakeaways 5 (band 3 to 5). PASS

## Body validation

- Raw HTML throughout, no markdown syntax. PASS
- No em-dashes anywhere in the file. PASS
- Internal links, 4 total (limit 5), all flat `/blog/<slug>` as Medical requires, each verified on disk in `Medical/web/content/blog/`: accountant-self-assessment, private-practice-tax-nhs-and-private-income, locum-doctor-self-assessment-filing-guide, locum-doctor-expenses-what-you-can-claim. PASS
- Body word count **1,191** (band 800 to 1,200). PASS
- No pricing, no named people, no statute over-citation (three references: TMA s.29, s.34 implied as the ordinary limit, s.36(1) and s.36(1A)). PASS

VERDICT: PASS
