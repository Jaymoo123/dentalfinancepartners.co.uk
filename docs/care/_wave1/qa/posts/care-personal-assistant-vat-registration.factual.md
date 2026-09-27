# Track A factual QA: care-personal-assistant-vat-registration

Date: 2026-09-27. Grader: Opus, adversarial. Sources: `docs/care/house_positions.md` (HP1, HP3, HP4, HP8, HP18, HP21, HP28), the reviewed audience-page position `docs/care/_wave1/self-employed-carers-and-personal-assistants.json`, SI 2014/2936 Sch 1 para 1(3)(c) at legislation.gov.uk, gov.uk/vat-registration/when-to-register, VAT Notice 701/2.

**Verdict: PASS.** 0 edits. Body 1,175 words.

## Primary-source verifications required by the task

**1. CQC carve-out, SI 2014/2936 Sch 1 para 1(3)(c).** Fetched `legislation.gov.uk/uksi/2014/2936/schedule/1/made`. Paragraph 1(3) disapplies the regulated activity of personal care to, at (c), "the services of a carer employed by an individual or related third party, without the involvement of an undertaking acting as an employment agency or employment business, and working wholly under the direction and control of that individual or related third party in order to meet the individual's own care requirements". "Related third party" is defined to include a person with parental responsibility, a person with power of attorney or lawful authority to arrange care, a group making collective arrangements, and a trust established to provide care to a named individual. The post's paraphrase ("a carer engaged by the individual, or by a related third party acting for them ... provided no employment agency is in the middle and you work wholly under that person's direction and control") carries all four limbs. CORRECT.

**2. Backward-looking registration test.** gov.uk: taxable turnover for the last 12 months goes over £90,000; tell HMRC "within 30 days of the end of the month when you went over the threshold"; registered from "the first day of the second month after you go over the threshold". The post states exactly this, including that the test is checked monthly and is not the tax year or accounting year. CORRECT.

**3. Forward-looking 30-day test.** gov.uk: taxable turnover "going to go over the £90,000 threshold in the next 30 days"; register "by the end of that 30-day period"; effective date is "the date you realised, not the date your turnover went over the threshold". The post states registration "by the end of it" and effect "from the day the expectation arose". CORRECT.

## Assertions

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | VAT registration compulsory once taxable turnover exceeds £90,000 over any rolling 12 months | HP3 | CORRECT |
| 2 | Backward test: notify within 30 days of the month end, registered from the first day of the second month after | gov.uk verbatim (above) | CORRECT |
| 3 | Forward test: over £90,000 expected in the next 30 days alone, register by the end of that period, effective from the day the expectation arose | gov.uk verbatim (above) | CORRECT |
| 4 | Welfare exemption sits in Group 7 of Schedule 9 to VATA 1994 and covers charities, public bodies and state regulated providers | HP1, Notice 701/2 | CORRECT |
| 5 | A CQC registered agency is state regulated; a directly engaged PA is not | HP1 + SI 2014/2936 Sch 1 para 1(3)(c) | CORRECT |
| 6 | The Sch 1 carve-out is what keeps the PA out of both CQC registration and the exemption | Audience JSON reviewed position; SI 2014/2936 | CORRECT, no contradiction |
| 7 | A directly engaged PA's fees are standard rated and count in full towards £90,000 | HP1 + HP3, and the audience JSON stats block | CORRECT |
| 8 | An agency billing £300,000 of exempt care can have zero taxable turnover | HP3 (same illustration, "several million pounds but zero taxable turnover") | CORRECT |
| 9 | Funding route (private, family, local authority direct payment, personal health budget, platform) does not change the liability of the supply | HP3 by extension; Notice 701/2 on payer identity | CORRECT |
| 10 | Client money held and accounted for (shopping cash) is not turnover | VATA 1994 s.19 consideration principle; nothing supplied. No figure asserted | CORRECT |
| 11 | Travel recharged as part of the service is normally consideration for that service and standard rated | HMRC recharged-expenses treatment (not a disbursement where it is the PA's own cost). Hedged as "normally" | CORRECT |
| 12 | Income tax mileage deduction 55p per mile for the first 10,000 business miles from 6 April 2026 | HP8; matches the audience JSON stat and its expenses challenge | CORRECT |
| 13 | Agency shifts: the PA supplies services to the agency, a taxable supply, and it counts | HP3 (all taxable supplies aggregate) | CORRECT |
| 14 | Other trading income through the same sole trader business joins the same running total | HP3 | CORRECT |
| 15 | Employment income is out of scope of the threshold | Threshold applies to business supplies only | CORRECT |
| 16 | ~£1,730 a week is the annual equivalent of £90,000 | Arithmetic: 90,000 / 52 = 1,730.77. Hedged "around" | CORRECT |
| 17 | A limited company is a separate person for VAT and begins with its own rolling total | VATA 1994 s.3 / Sch 1; standard | CORRECT |
| 18 | Corporation tax 19% on the first £50,000 | HP18 | CORRECT |
| 19 | Dividends at 10.75% (basic rate) from 6 April 2026 | HP28; matches audience JSON | CORRECT |
| 20 | Splitting one business in two to stay under £90,000 is artificial separation; HMRC can direct a single taxable person from a current date | VATA 1994 Sch 1 para 2 (direction has prospective effect). Post correctly says "from a current date", not retrospectively | CORRECT |
| 21 | Employing another carer, taking a partner or sending a substitute ends the carve-out and requires CQC registration before the activity starts | SI 2014/2936 Sch 1 para 1(3)(c) (direction and control limb fails); HP21; audience JSON challenge 1 | CORRECT |
| 22 | Trading unregistered is a criminal offence | HP21 | CORRECT |
| 23 | Once CQC registered, care supplies become exempt welfare, stop counting towards £90,000, and input VAT on costs used for them is irrecoverable | HP1 and the HP consistency rule that exemption is a cost | CORRECT |
| 24 | On crossing the threshold you charge 20% from the registration date | Standard rate, VATA 1994 s.2. HP silent, primary law relied on. No estate figure conflict | CORRECT |
| 25 | Private clients and direct payment families cannot recover that 20% | Non-taxable persons; follows | CORRECT |
| 26 | Partial exemption de minimis: exempt input tax averaging no more than £625 a month and less than half of total input tax | HP4, both limbs, same figures. Matches the sibling `vat-on-domiciliary-care` grading | CORRECT |
| 27 | CQC covers England only; Care Inspectorate (Scotland), Care Inspectorate Wales and RQIA run their own regimes, and state-regulated status is what decides the exemption | Audience JSON verified source; HP default-jurisdiction rule. Devolution flagged only where it changes the answer, per the brief | CORRECT |

No WRONG, no STALE, no UNSOURCED. Nothing removed. No figure in the post is absent from house positions, the audience JSON or primary law.

## Contradiction check against the reviewed audience page

Every load-bearing claim matches `self-employed-carers-and-personal-assistants.json`: the Sch 1 carve-out and the conditions that end it, the consequent loss of the welfare exemption, standard rating against a rolling £90,000, the 55p and 10.75% figures, the incorporation framing (profit-driven, and check the payer will contract with a company), and the devolved-regulator position. The post goes deeper rather than restating, as row 10 of the brief requires: the two timing tests, what enters and leaves the threshold, artificial separation, the inversion on employing a second carer, and the post-registration partial exemption and 20% pass-through. No contradiction found.

## Internal links (4 of a maximum 5, all verified on disk)

| Link | Target | Status |
|---|---|---|
| `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` | `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare Exemption" | OK, category slugifies to the path |
| `/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators` | `care/web/content/blog/mtd-it-care-owner-operators.md`, category "Care Home Accounts and Funding" | OK, category slugifies to the path |
| `/services/care-vat-review` | `care/web/src/data/care-services.ts` line 171, slug `care-vat-review` | OK |
| `/for/self-employed-carers-and-personal-assistants` | `care/web/src/data/care-hubs.ts` line 359, slug `self-employed-carers-and-personal-assistants` | OK, the Wave 1 segment page |

## Frontmatter

YAML parses, 15 keys. `date`, `dateModified` and `updatedDate` all "2026-09-27" (the care loader reads `updatedDate`; both set per the brief). category "VAT and Welfare Exemption" is verbatim from the list. canonical matches the category slug `vat-and-welfare-exemption` plus the slug. metaTitle 42 chars, metaDescription 149 chars, summary 56 words, 6 FAQs, 5 key takeaways, author and generator as specified. No em-dashes anywhere in the file. Body is raw HTML, no markdown. Body 1,175 words, inside 800 to 1,200.

The two "Source: gov.uk/..." tails inside FAQ answers are house style on this site, not pipeline leakage: the live post `mtd-it-care-owner-operators.md` carries three of them. Left in place, flagged to Track B in case the editorial pass wants consistency across the wave, since most Wave 1 drafts do not use them.

## Notes for Track B

1. Sameness risk with the sibling `vat-on-domiciliary-care.md`: both carry the Group 7 framing, the "exemption is a cost" point and the £625 de minimis limb. The figures must not change, but the sentences around them should be checked for near-verbatim overlap.
2. FAQ 2 and the body's second H2 both explain the carve-out; check for restatement.
3. The "Source:" tails in FAQs 1 and 2 only, not the other four. Inconsistent within the post itself.
4. Nothing removed for Track B to rewrite around.

## Manager notes

None. No defect found that must be fixed elsewhere. The Wave 1 segment page for this slug is already present in `care/web/src/data/care-hubs.ts`, so the `/for/` link will resolve at build.
