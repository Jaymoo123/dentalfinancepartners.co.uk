# Track A factual QA: nhs-uniform-tax-relief-laundry-allowance

Reviewed 2026-09-27. File: `docs/medical/_wave1/posts/nhs-uniform-tax-relief-laundry-allowance.md`
(extension of the live post `Medical/web/content/blog/nhs-uniform-tax-relief-laundry-allowance.md`).
Authorities: `docs/medical/house_positions.md` sections 8, 11, 11.A, 12; spec
`docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13 S4b and the S4a QA paragraph; gov.uk where the
house file is silent.

## Structure and frontmatter (S4b)

| Check | Result |
|---|---|
| YAML parses, all required keys present | CORRECT |
| slug, canonical, date, category unchanged from the live post (PARTIAL row rule) | CORRECT |
| canonical Medical flat form `/blog/<slug>` | CORRECT |
| dateModified bumped to 2026-09-27 | CORRECT |
| metaTitle 54 chars (limit 60), metaDescription 151 (limit 155) | CORRECT |
| summary 59 words (band 40 to 60) | CORRECT |
| keyTakeaways 5 (band 3 to 5), faqs 6 (band 4 to 6) | CORRECT |
| category "Medical Expenses" is an existing Medical label | CORRECT |
| generator `claude-opus` | CORRECT |
| Body raw HTML, no markdown constructs | CORRECT |
| Internal links: 4, all flat `/blog/<slug>`, all verified on disk, limit 5 | CORRECT |
| No em-dashes, British English, no pricing, no named people, no firm claims | CORRECT |
| Body length 1,175 words after edits (band 800 to 1,200) | CORRECT |

## Assertions

| # | Assertion | Verdict | Authority |
|---|---|---|---|
| 1 | No single NHS uniform allowance figure; the flat rate follows the occupational group | CORRECT | 11 |
| 2 | £185 ambulance staff on active service | CORRECT | 11 table |
| 3 | £125 nurses, healthcare assistants, therapists, radiographers | CORRECT | 11 table |
| 4 | £125 porters, ward clerks, hospital domestics | CORRECT | 11 table |
| 5 | £80 laboratory, pharmacy and uniformed ancillary staff | CORRECT | 11 table |
| 6 | £12 a year for shoes where a prescribed style is obligatory | CORRECT | 11, EIM67200 |
| 7 | £6 a year for stockings, tights or socks where a prescribed style or colour is obligatory | CORRECT | 11, EIM67200 |
| 8 | The additions turn on the obligation, not on who bought the items | CORRECT | 11 (corrected test) |
| 9 | Maximum £143 | CORRECT | 11 |
| 10 | The additions were offered to any occupational group ("take your own group's rate, then add £12 and £6") | WRONG, fixed | 11 confines them to the nursing group; £143 only computes off £125 |
| 11 | Flat rate is a deduction, not a payment | CORRECT | 11.A |
| 12 | £125 is worth £25 at basic rate and £50 at higher rate | CORRECT | 11.A |
| 13 | Worked example gave a resident doctor a £125 flat rate | WRONG, fixed | no doctor rate in the 11 table; the same post says most hospital doctors get nothing |
| 14 | Five years of £25 is about £125, of which £100 is a repayment and the current year a coding change | CORRECT | arithmetic + 11 coding-adjustment rule |
| 15 | Current tax year and the 4 previous tax years | CORRECT | 11, verbatim gov.uk |
| 16 | A 2026/27 claim reaches 2022/23, which closes 5 April 2027 | CORRECT | 11 window applied |
| 17 | Routes: gov.uk online service, form P87, or Self Assessment return; if you file a return you must claim through it | CORRECT | 11 |
| 18 | P87 suits several closed years at once or an ended employment, as there is no current pay to code against | CORRECT | 11 |
| 19 | Flat rate amounts need no evidence; other expenses do | CORRECT | 11, gov.uk job-expenses guidance |
| 20 | HMRC campaign: for most expense claims you need evidence | UNSOURCED (kept, non-numeric, consistent with the campaign page cited at 11) | - |
| 21 | No claim where the employer reimburses the cost | CORRECT | 11 |
| 22 | No laundering claim where a free employer laundry service is not used; HMRC names it a headline error | CORRECT | 11 |
| 23 | Initial cost of buying work clothing never allowable; everyday clothing never allowable | CORRECT | 11 |
| 24 | GMC registration fee deductible under ITEPA 2003 s.343 | CORRECT | 12 writing rule (s.343 for a statutory registration fee: GMC, NMC, HCPC) |
| 25 | Annual subscription to a body on HMRC's approved List 3 deductible under s.344 | CORRECT | 12; List 3 used only to name approved bodies, not as authority for the framework |
| 26 | No GMC fee amount stated anywhere | CORRECT | 8, 12 (amount UNVERIFIED, no page may state it) |
| 27 | No BMA reference, so the 85% restriction is not owed | CORRECT | 12 |
| 28 | Medical indemnity you bear yourself is deductible | CORRECT | 8 |
| 29 | CNSGP has provided state indemnity for NHS general-practice clinical work in England at no subscription since 1 April 2019 | CORRECT | 8 |
| 30 | Mileage 55p first 10,000 business miles 2026/27, 25p thereafter | CORRECT | 8 |
| 31 | Home to first site is ordinary commuting, not claimable | CORRECT | 8 |
| 32 | A fee the employer paid or reimbursed free of tax is not claimable | CORRECT | 12 |
| 33 | HMRC: claim directly and "receive 100% of the money owed" | CORRECT | 11.A verbatim |
| 34 | HMRC: "you're still responsible for any claims made on your behalf" | CORRECT | 11.A verbatim |
| 35 | Assignments of an income tax repayment are void and not recognised for income tax purposes | CORRECT | 11.A |
| 36 | Agents now use a nomination that can be cancelled at any point | CORRECT | 11.A |
| 37 | No commencement date, statutory instrument or form number asserted for the assignment-to-nomination change | CORRECT (verified by grep: no form numbers other than P87, no date other than the CNSGP 2019 and the 5 April 2027 year close) | 11.A |
| 38 | The nomination described as something "HMRC describes as non legally binding" | UNSOURCED attribution, fixed (de-attributed) | 11.A supports revocability, not the quoted HMRC wording |
| 39 | Repayment agents often submit only the flat rate because it needs no evidence | UNSOURCED (kept; hedged as a tendency, no figure attached) | - |
| 40 | A flat rate already in the tax code, claimed again, creates an underpayment; check the P2 or personal tax account | UNSOURCED (kept, mechanism only, no figure) | - |
| 41 | Rates implied current for 2026/27 without claiming an annual uprate | CORRECT | 11 year-tagging rule |
| 42 | £60 generic default not used; no single "NHS rate" quoted | CORRECT | 11.A prohibition |

No STALE findings: every rate, threshold and date in the post is the current 2026/27 position in the house file.

## Edit log

1. Body, "How much is a doctors tax rebate actually worth?": the £12 and £6 additions were offered to any
   occupational group. Scoped them to the nursing group and gave HMRC's EIM67200 definition of that group
   (nurses and midwives of all grades, auxiliaries, students, dental nurses, nursing assistants, healthcare
   assistants or workers). Assertion 10.
2. Same section: "A resident doctor on the basic rate with a £125 flat rate saves £25 a year" replaced with
   "Someone in the £125 group paying basic rate saves £25 a year". No occupational group in the house table
   gives a doctor a £125 flat rate. Assertion 13.
3. Body, "What have the rules on repayment agents changed?" and FAQ 4: "which HMRC describes as non legally
   binding" replaced with "which is not legally binding". The substance is supported by 11.A; the attribution
   to HMRC wording is not. Assertion 38.

No figures were removed: every figure in the post has an authority in the house file.

YAML re-validated after the edits; body 1,175 words, still inside the 800 to 1,200 band.

VERDICT: PASS
