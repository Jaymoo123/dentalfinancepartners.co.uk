# Factual QA (Track A): gp-vat-registration

Post: `docs/medical/_wave1/posts/gp-vat-registration.md` (extension of the live
`Medical/web/content/blog/gp-vat-registration.md`)
Reviewed: 2026-09-27
Authorities: `docs/medical/house_positions.md` §6 and §6.A; VATA 1994 Sch 9 Group 7 and Sch 8
Group 12; VAT Notice 701/57; gov.uk VAT registration, flat rate scheme and partial exemption pages.

## VERDICT: PASS

2 corrections applied (1 rule stated wrongly, in two places; 1 wrong category label). No
unsourced figures found, so nothing removed. Body 991 words, inside the 800 to 1,200 band.

## Assertions

### Frontmatter

| # | Assertion | Source | Verdict |
|---|---|---|---|
| 1 | Private medical care exempt under VATA 1994 Sch 9 Group 7 Item 1 | §6 | CORRECT |
| 2 | Two-part test: within registered field AND primary purpose protection, maintenance or restoration of health | §6 (VATHLT2010), 701/57 | CORRECT |
| 3 | Only taxable turnover counts towards £90,000; exempt and outside-scope GMS/PMS excluded | §6 | CORRECT |
| 4 | Medico-legal, expert witness, pre-employment medicals, purely cosmetic = standard-rated | §6, 701/57 | CORRECT |
| 5 | Rolling 12-month look back, 30 days from the end of that month to register | §6, gov.uk | CORRECT |
| 6 | Forward look: expect to pass £90,000 in the next 30 days alone | gov.uk | CORRECT |
| 7 | FAQ2 "you register immediately" on the forward look | gov.uk "register by the end of that 30 day period" | **WRONG, fixed** |
| 8 | De minimis £625 a month / £7,500 a year and 50% of total input VAT | §6 | CORRECT |
| 9 | Standard rate 20% | VATA 1994 s.2 | CORRECT |
| 10 | Cosmetic exempt where part of a health care treatment programme, taxable where purely for appearance | 701/57 | CORRECT |
| 11 | Voluntary registration allowed below £90,000; recovery limited by partial exemption; MTD returns | gov.uk | CORRECT |
| 12 | Dispensing: NHS prescription drugs zero rated, not exempt, input VAT recoverable | §6.A | CORRECT |
| 13 | FRS join limit: taxable turnover excl VAT £150,000 or less | gov.uk FRS | CORRECT |
| 14 | FRS 1% discount in the first year of registration | gov.uk FRS | CORRECT |
| 15 | FRS category list has no medical or health entry | gov.uk FRS category table | CORRECT |
| 16 | Limited cost business: goods under 2% of turnover, or under £1,000 a year, pays 16.5% | gov.uk FRS | CORRECT |
| 17 | No specific flat rate percentage asserted for a doctor | — | CORRECT (absence verified) |

### Body

| # | Assertion | Source | Verdict |
|---|---|---|---|
| 18 | NHS GMS and PMS (Global Sum, QOF, enhanced services) outside the scope, never counts | §6 | CORRECT |
| 19 | Purpose, not NHS-vs-private and not clinical skill, decides liability | §6 | CORRECT |
| 20 | Report enabling a court, insurer or employer decision is taxable | §6, 701/57 | CORRECT |
| 21 | Table: private consultations/diagnosis/treatment exempt | §6 | CORRECT |
| 22 | Table: medico-legal reports standard-rated 20% | §6 | CORRECT |
| 23 | Table: expert witness opinion and testimony standard-rated 20% | §6 | CORRECT |
| 24 | Table: purely cosmetic standard-rated 20%; cosmetic within a treatment programme exempt | 701/57 | CORRECT |
| 25 | Table: pre-employment medicals for an employer's hiring decision standard-rated | 701/57 | CORRECT |
| 26 | Table: "In-service health screening and post-employment fitness checks" exempt | 701/57 (exemption rests on checks on **existing** staff; "post-employment" is not a category and contradicts the exempt limb) | **WRONG, fixed** |
| 27 | Table: room hire exempt as a licence to occupy land unless opted to tax | VATA 1994 Sch 9 Group 1 | CORRECT |
| 28 | Occupational health splits, one contract can carry both treatments and must be apportioned | 701/57 | CORRECT |
| 29 | Look back rolls, checked at every month end, 30 days from the month end to register | gov.uk | CORRECT |
| 30 | Forward look "registration is then immediate" | gov.uk (by the end of the 30-day period) | **WRONG, fixed** |
| 31 | Deregistration threshold £88,000 | §6 | CORRECT |
| 32 | Zero rating under VATA 1994 Sch 8 Group 12 carries full input VAT recovery | §6.A | CORRECT |
| 33 | Partial exemption: direct attribution plus apportioned overheads; cross either de minimis limit and all exempt input VAT is lost | VAT Regs 1995 regs 99 to 110 | CORRECT |
| 34 | FRS £150,000, 1% first-year discount, no medical category, 16.5% limited cost outcome | gov.uk FRS | CORRECT |

No STALE verdicts: £90,000, £88,000 and the de minimis limits are the live 2026/27 figures per the
§6 currency pass of 2026-08-26. No UNSOURCED figures: the worked-example numbers of the live post
were dropped in the extension, and every remaining number is a statutory or gov.uk threshold.

## Edit log

1. **FAQ "When does a doctor have to register for VAT?"** — "you register immediately" replaced
   with "you must register by the end of that 30-day period". Reason: gov.uk states the forward
   look duty as registration by the end of the 30-day period, not instantly on forming the
   expectation. WRONG.
2. **Body, "When Exactly Must You Register?"** — "Registration is then immediate rather than
   waiting for a month end" replaced with "You must then register by the end of that 30-day
   period, rather than waiting for a month end". Same rule, same reason. WRONG.
3. **Body, income table** — "In-service health screening and post-employment fitness checks"
   replaced with "In-service health screening and fitness-for-work checks on existing staff".
   Reason: the exempt limb of occupational health is care for people who are employees at the
   time. "Post-employment" names no recognised category and cuts against the row's own verdict.
   WRONG.

Nothing removed, nothing added.

## S4b frontmatter and format checks

| Check | Result |
|---|---|
| YAML parses after edits | PASS |
| `dateModified` bumped | PASS (2026-06-12 on the live post to 2026-09-27) |
| `date` and `slug` and `canonical` and `category` kept from the live post | PASS |
| `generator: claude-opus` | PASS |
| `category: GP Practice Management` on the Medical list | PASS |
| `canonical` flat Medical form `/blog/<slug>` | PASS |
| `metaTitle` 55 chars (≤ 60) | PASS |
| `metaDescription` 154 chars (≤ 155) | PASS |
| `summary` 47 words (40 to 60) | PASS |
| `faqs` 6, `keyTakeaways` 5 | PASS |
| Body raw HTML, no markdown syntax | PASS |
| Internal links: 5, all `/blog/<slug>` flat, all present on disk | PASS |
| No em-dashes | PASS |
| Body 991 words (800 to 1,200) | PASS |

## Note for the integrator, not a Track A defect

The live post carries `metaTitle_prev`, `metaDescription_prev` and an `editorialNote` recording the
SERP meta-optimisation rewrite of 2026-06-12. The extension drops all three and writes a new
`metaTitle` and `metaDescription`. If the meta programme's audit trail is meant to survive an
extension, that is an editorial or integrator call, not a factual one.
