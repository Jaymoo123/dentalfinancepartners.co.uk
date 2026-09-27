# Track A factual QA: charity-vat-reduced-rate-fuel-and-power-certificate

Date: 2026-09-27. Verdict: **PASS** (2 edits, both minor). Final body word count: 1,105. No em-dashes.

## Priority check: the temporary zero rate

**CONFIRMED at source, on all three legs (announcement date, dates of effect, charity non-business scope).**

- VAT Notice 701/19, last updated 8 September 2026, https://www.gov.uk/guidance/vat-on-fuel-and-power-notice-70119 : "The temporary zero rate applies from 1 October 2026 to 31 March 2027. During this period, qualifying supplies of electricity in Great Britain are liable to VAT at 0%."
- Policy paper, https://www.gov.uk/government/publications/temporary-zero-rate-of-vat-for-domestic-electricity-in-great-britain/temporary-zero-rate-of-vat-in-great-britain-for-domestic-electricity : "This measure was announced on 21 July 2026." / "This measure introduces a temporary zero rate of VAT for qualifying supplies of electricity in Great Britain, for the period 1 October 2026 to 31 March 2027." Scope covers "supplies of fuel and power made to people's homes, as well as fuel and power for non-business charitable use."
- Enacting order: The Value Added Tax (Supplies of Domestic Electricity) Order 2026, SI 2026/987, https://www.legislation.gov.uk/uksi/2026/987/article/3/made . Article 3 inserts a new Group 24 into VATA 1994 Sch 8 zero-rating "supplies in England and Wales and Scotland of electricity for qualifying use", with qualifying use defined as domestic use or "use by a charity otherwise than in the course or furtherance of a business", the 1,000 kWh a month deeming, and "if at least 60% of the electricity is supplied for qualifying use, the whole supply is to be treated as a supply for qualifying use".

Northern Ireland unchanged at 5%, and all other domestic fuel stays at 5% UK-wide (policy paper). The post states both correctly. Nothing removed.

## Assertion table

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | 5% reduced rate on fuel and power for qualifying use; 20% otherwise | CORRECT | VATA 1994 Sch 7A Group 1 Item 1; house_positions.md line 106 |
| 2 | Commodities: coal/coke, gases, petroleum gases, fuel oil/gas oil/kerosene, electricity, heat, air conditioning | CORRECT | Sch 7A Gp 1 Item 1(a) to (e) |
| 3 | Qualifying use = domestic use, or use by a charity otherwise than in the course or furtherance of a business | CORRECT | Sch 7A Gp 1 Notes; SI 2026/987 art.3 |
| 4 | Temporary 0% on GB electricity 1 Oct 2026 to 31 Mar 2027, announced 21 Jul 2026 | CORRECT | see above |
| 5 | Gas stays 5%; NI electricity stays 5% | CORRECT | policy paper |
| 6 | 5% returns 1 April 2027 | CORRECT | implied by the end date 31 Mar 2027; stated as a budgeting point, not as a new rate |
| 7 | 60% rule: at or above 60% the whole supply is qualifying; below, apportion | CORRECT | Notice 701/19: "If 60% or more of the fuel or power is for qualifying use, you should treat the whole supply as for qualifying use and charge tax at the reduced rate." Sch 7A Gp 1 Notes to the same effect |
| 8 | Certificate contents: both parties' name, address, VAT number; premises address; exact qualifying percentage; signed and dated declaration by a responsible officer; undertaking to notify changes | CORRECT | Notice 701/19 certificate requirements (adds "position" of the signatory, not a defect) |
| 9 | One certificate per premises | CORRECT | Notice 701/19 (certificate is given for the premises supplied) |
| 10 | Incorrect certificate may carry a financial penalty | CORRECT | Notice 701/19 |
| 11 | De minimis: 1,000 kWh electricity a month; 150 therms or 4,397 kWh piped gas a month; 2,300 litres fuel oil/gas oil/kerosene; one tonne or less coal or coke | CORRECT, one word added | Notice 701/19 de minimis table; Sch 7A Gp 1 Notes. Notice says "domestic grade coal or coke" |
| 12 | De minimis supplies are deemed domestic use, no certificate needed | CORRECT | Notice 701/19 |
| 13 | De minimis supplies "get the reduced rate automatically" | STALE inside the window (a small GB electricity supply is 0%, not 5%) | fixed |
| 14 | No charge generally means non-business for HMRC | CORRECT | Notice 701/19 charity section |
| 15 | CIC is not a charity, so standard rate | CORRECT | relief turns on "use by a charity"; Sch 7A Gp 1 Notes |
| 16 | Trading subsidiary is a separate company carrying on a business, standard-rated | CORRECT | same limb |

## Edits made (2)

1. De minimis section: "get the reduced rate automatically" changed to "get the relief automatically", "the reduced rate should already be on the bill" to "the correct rate should already be on the bill", plus a closing sentence naming 0% electricity / 5% gas inside the window. Reason: assertion 13 was stale against the temporary zero rate the same post introduces.
2. "one tonne or less of coal or coke" to "one tonne or less of domestic grade coal or coke", in both the body and the matching FAQ, to match Notice 701/19.

No figures removed. No UNSOURCED figures found.

## Links and frontmatter

All three internal links resolve, with categories that slugify to the path used:

- `/blog/charity-vat/do-charities-pay-vat` -> `charities/web/content/blog/do-charities-pay-vat.md`, category "Charity VAT"
- `/blog/charity-vat/can-charities-claim-back-vat` -> `charities/web/content/blog/can-charities-claim-back-vat.md`, category "Charity VAT"
- `/blog/cics-and-social-enterprises/cic-vs-charity` -> `charities/web/content/blog/cic-vs-charity.md`, category "CICs and Social Enterprises"

Frontmatter: YAML parses after editing. All required keys present. metaTitle 54, metaDescription 152, summary 51 words, keyTakeaways 5, faqs 6, category "Charity VAT" is on the brief's list, canonical matches the category slug, dateModified and updatedDate both set to 2026-09-27.

## Notes for Track B

- `title` is 62 characters. The brief caps `metaTitle`, not `title`, so this is not a defect, but shorten if the wave has a house limit.
- `h1` is 90 characters, long for a single line at mobile width.
- The 60% section's second paragraph ("the gap between those two answers is larger than the gap between 55% and 62% suggests") is the only sentence in the post that argues rather than answers. Check it against the wave's padding rule; do not change the figures.
