# Stage 1B, HP lock drafts (statutory anchor verification)

Verification pass 2026-09-11. Primary sources only (legislation.gov.uk, gov.uk HMRC guidance and manuals). Every URL below was fetched in this pass. Anchors that could not be confirmed are marked UNCONFIRMED rather than asserted.

Does not edit `house_positions.md` or `rates_ledger.json`. Contradictions are quoted and adjudicated below.

---

## Anchor 1. Food VAT boundary, catering exclusion, hot-food test

**Locked position.** Food of a kind used for human consumption is zero-rated under VATA 1994 Schedule 8 Group 1, subject to the excepted items (ice cream, confectionery, alcoholic beverages and other beverages, savoury snacks, pet food, home-brew kits) and the catering exclusion in Note 3. A supply is catering, and so standard-rated at 20%, if it is consumed on the premises (Note 3(a), premises defined by Note 3A to include any area the supplier sets aside for its customers to eat in), or if it is a supply of hot food for consumption off the premises (Note 3(b)). Hot takeaway food is standard-rated only where it is above ambient air temperature at the time it is provided to the customer AND meets at least one of the five Note 3B conditions: heated for the purpose of enabling it to be consumed hot; heated to order; kept hot after being heated; provided in packaging that retains heat or is specifically designed for hot food; advertised or marketed in a way that indicates it is supplied hot. Food that is merely incidentally warm (freshly baked bread cooling on a rack) and meets none of the five conditions stays zero-rated.

**Source:**
- Value Added Tax Act 1994, Schedule 8, Part II, Group 1 (Food), general item 1, excepted items 1 to 7, and Notes 3, 3A, 3B, 3C. Fetched: https://www.legislation.gov.uk/ukpga/1994/23/schedule/8/2026-04-06
  - Note 3 verbatim (as returned): catering "includes any supply of it for consumption on the premises on which it is supplied" and "any supply of hot food for consumption off those premises".
  - Note 3A verbatim: premises include "any area set aside for the consumption of food by that supplier's customers".
  - Note 3C: food is hot where it is above "ambient air temperature".
- Value Added Tax Act 1994, section 2(1): "VAT shall be charged at the rate of 20 per cent". Fetched: https://www.legislation.gov.uk/ukpga/1994/23/section/2
- Catering, takeaway food (VAT Notice 709/1), HMRC. Fetched: https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091
  - Premises verbatim: "'Premises' are the areas occupied by the food retailer or, any area set aside for the consumption of food by the food retailers' customers, whether or not the area may also be used by the customers of other food retailers."
  - Five conditions verbatim: "been heated for the purposes of enabling it to be consumed hot"; "been heated to order"; "been kept hot after being heated"; "provided to a customer in packaging that retains heat...or in any other packaging that is specifically designed for hot food"; "advertised or marketed in a way that indicates that it's supplied hot".

**Commonly confused (flag for writers).** Two distinct failure modes. First, the five conditions are not free-standing: the Note 3B gateway is that the food is hot (above ambient) *when provided to the customer*; only then do the five conditions bite. Writing "any food marketed as hot is standard-rated" without the ambient gateway is wrong. Second, the premises test is statutory (Note 3A), not merely HMRC practice, and it captures shared food-court seating; cold food eaten in is standard-rated by Note 3(a), not by any hot-food rule.

**Note on drafting history.** The five-condition test is the post-2012 codification (Finance Act 2012 inserted Notes 3A to 3C); the pre-2012 "heated for the purposes of enabling it to be consumed at a temperature above ambient" single test is obsolete and must not be cited.

**Confidence: LOCKED.** Consistent with existing HP 1, HP 2, HP 3 and `rates_ledger.json` key `vat_standard_rate` (20%). The ledger cites the 709/1 notice as the source for the 20% rate; the statutory source is VATA 1994 s.2(1), which is the stronger citation and is now recorded here. Not a contradiction, an upgrade.

---

## Anchor 2. Pet food vs working dog food

**Locked position.** Animal feeding stuffs are within the Group 1 general items, but excepted item 6 removes pet food from zero-rating. Excepted item 6 verbatim: "Pet foods, canned, packaged or prepared; packaged foods (not being pet foods) for birds other than poultry or game; and biscuits and meal for cats and dogs." So dog food splits three ways. (a) All biscuit and meal for cats and dogs is standard-rated, regardless of who the dog is, because the final limb of item 6 is unconditional. (b) Canned, packaged or prepared food held out for sale as pet food is standard-rated. (c) Food specially formulated and held out for sale exclusively for working dogs is not pet food and is zero-rated, unless it is biscuit or meal. The test is how the product is held out for sale (labelling, packaging, display, invoicing, advertising, catalogue listing), not what the buyer's dog actually does. A product described as suitable "for all breeds, size and age of dog" is held out as pet food and is standard-rated.

**Source:**
- Value Added Tax Act 1994, Schedule 8, Part II, Group 1, excepted item 6. Fetched: https://www.legislation.gov.uk/ukpga/1994/23/schedule/8/2026-04-06
- Animals and animal food (VAT Notice 701/15), HMRC, paragraphs 6.1, 6.4 and 6.5. Fetched: https://www.gov.uk/guidance/animals-and-animal-food-notice-70115
  - Para 6.5 verbatim: "All biscuit and meal for cats and dogs is standard-rated."
  - Para 6.4 verbatim: "If a specially formulated food is held out for sale exclusively for working dogs it will come within the scope of the VAT relief, unless it is biscuit or meal."
  - Para 6.4 identifies qualifying working categories including sheepdog breeds, assistance dogs, gun dogs and racing greyhounds.

**Commonly confused (flag for writers).** The consumer question "is there VAT on dog food" has the answer "usually yes, 20%", and the working-dog carve-out is a *labelling* carve-out sitting with the manufacturer, not something a working-dog owner can claim at the till. Also note the biscuit-and-meal trap: a working-dog product that happens to be biscuit or meal is still standard-rated. Do not write the page as "working dogs are VAT free".

**URL note.** The commonly cited URL `https://www.gov.uk/guidance/animals-and-animal-food-and-vat-notice-70115` returns HTTP 404. The live URL is `https://www.gov.uk/guidance/animals-and-animal-food-notice-70115` (no "and-vat"). Use the live one.

**Confidence: LOCKED.** No existing HP covers pet food; nothing to contradict.

---

## Anchor 3. Alcohol duty, current 2026/27 rates, draught relief, small producer relief

**Locked position.** Since 1 August 2023 alcohol duty is charged on a single strength-based structure across all product categories, by litre of pure alcohol, under Finance (No. 2) Act 2023 Part 2. Rates were uprated with effect on and after **1 February 2026** and are the rates in force for the remainder of 2026/27. Standard rates per litre of pure alcohol: below 1.2% ABV nil; 1.2% to below 3.5% £9.96 (all categories); 3.5% to below 8.5% £22.58 beer, £10.39 still cider and sparkling cider up to 5.5%, £26.61 spirits, wine and other fermented products (and sparkling cider 5.6% to 8.4%); 8.5% to 22% £30.62 all categories; above 22% £33.99 all categories.

Draught Relief gives reduced rates on qualifying draught products: 1.2% to below 3.5% £8.58; 3.5% to below 8.5% £19.45 for beer, spirits, wine and other fermented products, and £8.95 for still cider and sparkling cider up to 5.5%. Qualifying conditions are statutory: the product must be under 8.5% ABV and, at the excise duty point, contained in a large draught container of at least 20 litres capacity that incorporates or is designed to connect to a qualifying dispense system (pressurised gas or pump). Draught relief is expressed as reduced *rates*, not as a headline percentage discount; GOV.UK does not publish a single discount percentage.

Small Producer Relief replaced and extended Small Brewers Relief from 1 August 2023. It applies to producers of alcoholic products of less than 8.5% ABV made on small production premises where the alcohol production amount is 4,500 hectolitres of pure alcohol or less in the relevant production year (1 February to 31 January), and not produced under licence. The 1 February 2026 uprating also increased the cash discount under SPR to maintain its relative value.

**Source:**
- Finance (No. 2) Act 2023, Part 2, Chapter 2, sections 50 to 53 (draught relief), in particular section 51 "Alcoholic products qualifying for draught relief" (under 8.5% ABV, large draught container of at least 20 litres capacity connected to a qualifying dispense system). Fetched: https://www.legislation.gov.uk/ukpga/2023/30/part/2/chapter/2
- Finance (No. 2) Act 2023, Part 2, Chapter 3, sections 54 to 71 (small producer relief), in particular s.54 "Small producer relief: discounted rates", s.55 "Small producer alcoholic products", s.56 "Small production premises", s.57 "'Alcohol production amount' etc", s.59 "Duty discount for small producer alcoholic products". Fetched: https://www.legislation.gov.uk/ukpga/2023/30/part/2/chapter/3
- Alcohol Duty rates, HMRC guidance, table stated as effective from 1 February 2026. Fetched: https://www.gov.uk/guidance/alcohol-duty-rates
- Alcohol Duty uprating, HMRC policy paper: "All changes will have effect on and after 1 February 2026"; "the government will also increase the cash discount provided to small producers to maintain the relative value of Small Producer Relief (SPR) compared to the main rates." Fetched: https://www.gov.uk/government/publications/alcohol-duty-rates-change/alcohol-duty-uprating
- Check if you can pay less Alcohol Duty on draught products, HMRC: container "able to hold 20 litres or more of product"; product "less than 8.5% alcohol by volume (ABV)"; container must "be able to connect to either a pump system or gas pressurised drinks tap". Fetched: https://www.gov.uk/guidance/check-if-you-can-pay-less-alcohol-duty-on-draught-products
- Check if you're eligible for Small Producer Relief on Alcohol Duty, HMRC: "4,500 hectolitres or less of pure alcohol"; strength "less than 8.5% ABV"; production year 1 February to 31 January. Fetched: https://www.gov.uk/guidance/check-if-youre-eligible-for-small-producer-relief-on-alcohol-duty
- Reform of Alcohol Duty rates and reliefs, HMRC policy paper: SPR "reforms the previous Small Brewers Relief by extending it to all producers meeting the criteria"; "Producers will be eligible for the relief if they produce less than 4,500 hectolitres (hL) of alcohol per year"; "The new duty structure for alcoholic products and the two new reliefs will take effect from 1 August 2023." Fetched: https://www.gov.uk/government/publications/reform-of-the-alcohol-duty-system/reform-of-alcohol-duty-rates-and-reliefs

**Confidence: CONTRADICTS EXISTING HP (dates, not values).**

Existing HP 16 reads: "Draught products at 3.5% to below 8.5% ABV attract duty of £19.45 per litre of pure alcohol (beer, spirits, wine and other fermented products) or £8.95 per litre (still cider, sparkling cider 3.5% to 5.5% ABV). This is materially lower than the equivalent packaged rate of £22.58 per litre for beer at 3.5% to 8.4% ABV."

The **figures are right and remain right for 2026/27**. The problem is in `rates_ledger.json`, which stamps all three with `"applies_from": "2023-08-01"`:
- `draught_relief_beer_wine_spirits_3p5_to_8p5_abv` = 19.45, applies_from 2023-08-01
- `draught_relief_still_cider_3p5_to_8p5_abv` = 8.95, applies_from 2023-08-01
- `packaged_beer_duty_3p5_to_8p4_abv` = 22.58, applies_from 2023-08-01

**The ledger dates are wrong.** These are the rates set by the uprating effective **1 February 2026**, not the 1 August 2023 introductory rates. The structure dates from 1 August 2023; these specific cash rates do not. Correct `applies_from` to `2026-02-01` on all three. The values need no change.

Also missing from HP 16 and worth adding: the dispense-system condition. A 20-litre container alone does not qualify; it must incorporate or be designed to connect to a qualifying dispense system. A 20-litre bag-in-box sold for self-pour does not automatically get draught relief.

**Uprating cadence flag.** Alcohol duty is now uprated on 1 February, not 6 April. Any page that says "from the start of the tax year" is wrong. The next uprating window is 1 February 2027, which falls *inside* 2026/27, so the rates above are correct as at today but have a known expiry inside the tax year. Diarise re-verification for late January 2027.

---

## Anchor 4. Excise duty vs alcohol duty, scope split

**Locked position.** Alcohol Duty is one excise duty among several. Excise duty is the umbrella category covering alcohol, tobacco products, hydrocarbon oils and biofuels, gambling duties and the Climate Change Levy; Alcohol Duty specifically is the single strength-based duty on beer, cider, wine, other fermented products and spirits created by Finance (No. 2) Act 2023 Part 2, which from 1 August 2023 replaced the separate beer, cider, wine and spirits duty regimes.

**Source:**
- Goods liable to excise duty, HMRC, listing wine and other fermented products, beer, cider, spirits, imported composite goods containing alcohol, tobacco products, hydrocarbon oil, imported composite goods containing mineral oils, Climate Change Levy, biofuels. Fetched: https://www.gov.uk/government/publications/excise-tax-types-excise-duty-rates-and-supplementary-guidance/goods-liable-to-excise-duty
- Finance (No. 2) Act 2023, Part 2 (Alcohol Duty), Chapters 2 and 3 as fetched above.

**Recommended scope split (editorial, not statutory).** Two pages are justified and are not duplicates, provided the split is by scope and not by synonym:
- "Alcohol duty" page = the strength-based rate tables, draught relief, small producer relief, how a pub or bar computes duty in a cost of goods model. Transactional, rate-table led.
- "Excise duty" page = what excise duty is as a category, which goods it covers, the duty point and duty suspension concept, and the fact that a hospitality operator normally buys duty-paid so the duty is embedded in the wholesale price rather than separately accounted for. Explanatory, category led, links down to the alcohol duty page.

What must NOT happen is two pages both trying to rank on "alcohol duty rates". The excise page must not carry a rate table for alcohol. If it does, cannibalisation is certain because the query sets overlap.

**Confidence: LOCKED** on the legal distinction (alcohol duty is a subset of excise duty, confirmed by the HMRC excise tax-type list). The two-page recommendation is an editorial judgment, not a statutory finding, and is flagged as such.

---

## Anchor 5. Machine Games Duty, types and rates

**Locked position.** MGD is charged on net takings from dutiable machine games. Three machine types and three rates. Type 1 (lower rate, 5%): the highest charge payable for playing a dutiable machine game on the machine does not exceed 20p AND the maximum cash prize does not exceed £10. Type 2 (standard rate, 20%): not a type 1 machine, and it can be demonstrated that the highest charge payable for playing does not exceed £5. All other machines (higher rate, 25%): cost of play exceeding £5. Where a machine offers more than one type of game, the highest applicable rate applies to all takings from that machine.

**Source:**
- Finance Act 2012, Schedule 24 (Machine Games Duty), paragraph 5(2) and 5(3) (type 1 and type 2 definitions) and paragraph 9 (rates). Fetched: https://www.legislation.gov.uk/ukpga/2012/14/schedule/24
  - Para 5(2) verbatim: "the highest charge payable for playing a dutiable machine game on the machine does not exceed 20p, and the maximum amount of cash that can be won from playing a dutiable machine game on the machine does not exceed £10."
  - Para 5(3) verbatim: "it is not a type 1 machine, and it can be demonstrated that the highest charge payable for playing a dutiable machine game on the machine does not exceed £5."
- Machine Games Duty: How much you pay, GOV.UK. Fetched: https://www.gov.uk/machine-game-duty/how-much-you-pay
  - Table verbatim: "Machine type 1 - lower rate" / "20 pence or less" / "£10 or less" / "5%"; "Machine type 2 - standard rate" / "21 pence to £5" / "£11 or more" / "20%"; "All other machine types - higher rate" / "More than £5" / "Any" / "25%".
  - Verbatim: "If your machine has more than one type of game, you pay the rate for the highest rated game on all takings from the machine."

**Commonly confused (flag for writers).** The statute defines type 1 and type 2 only; "type 3" is GOV.UK shorthand for machines that are neither, and the statute reaches them as the residual higher-rate category. Writing "type 3 machines as defined in Schedule 24" would be a citation that does not exist. Also, the GOV.UK table's type 2 "Prize: £11 or more" column is a presentational simplification; the statutory type 2 test is only about cost of play (not exceeding £5) plus failing the type 1 test. Follow the statute for any borderline case.

**URL note.** `https://www.gov.uk/machine-games-duty/how-much-you-pay` returns HTTP 404. The live path is singular: `https://www.gov.uk/machine-game-duty/how-much-you-pay`.

**Confidence: LOCKED.** Consistent with existing HP 18, which asserts only the registration-before-play obligation and does not state rates. HP 18's final sentence ("Registration is not required for machines where prizes are less than the cost to play") is consistent with the dutiable-machine-game definition and is not contradicted. The 25% higher rate has applied since 1 March 2015; that commencement date is asserted by GOV.UK but the amending provision itself was not separately fetched in this pass.

**Not fetched this pass:** the Finance Act 2015 provision that inserted the 25% higher rate. The rate itself is confirmed by two sources above; only its commencement date rests on secondary GOV.UK narrative.

---

## Anchor 6. Troncs and tips, NIC treatment vs the allocation duty

**Locked position, part A (NIC).** A gratuity paid to an employee is disregarded from earnings for NIC purposes under paragraph 5 of Part 10 of Schedule 3 to the Social Security (Contributions) Regulations 2001 where either it is not made, directly or indirectly, by the secondary contributor (the employer) and does not comprise or represent sums previously paid to the employer, OR the employer does not allocate the payment, directly or indirectly, to the earner. In the tronc case, the operative limb is the second: where a tronc is run independently and the employer is not involved in allocation either directly or indirectly, there is no NIC liability for employer or employee. PAYE income tax remains due on tronc receipts. Two things do NOT of themselves amount to employer allocation: that it is a term of the employment that the employee is entitled to share in an independently run tronc, and that the employer reserves the right to make deductions from gratuities before they reach the tronc.

**Locked position, part B (allocation duty).** The Employment (Allocation of Tips) Act 2023 (c. 13) inserts sections 27C to 27K into the Employment Rights Act 1996 and requires employers to pass on the total amount of qualifying tips, gratuities and service charges to workers without deductions, to allocate them fairly (having regard to the statutory Code of Practice), to do so no later than the end of the month following the month of receipt, to have a written tips policy and to keep records, with enforcement by employment tribunal. Agency workers are within scope (s.5). Section 3 of the Act expressly contemplates independent tronc arrangements as a route to fair allocation. Sections 1 to 8 and 10 to 12 came into force on **1 October 2024**; section 9 (code of practice power) and parts of the Act were commenced earlier, on 31 July 2023, to allow the Code to be made.

**These are two different regimes and must never be merged.** The NIC disregard is a *tax* consequence and is optional in the sense that an employer can run tips through payroll and simply pay the NIC. The Tips Act duty is an *employment law* obligation and is mandatory: it applies whether or not a tronc exists and whether or not NIC is being saved. A compliant tronc does not discharge the Tips Act duty automatically, and a Tips Act compliant distribution run by the employer does not earn the NIC disregard. The common error in hospitality content is writing "set up a tronc and you comply with the Tips Act and save NIC" as though it were one action with one test. It is two tests: independence of allocation (NIC) and fairness plus transparency plus no deductions plus timing (Tips Act).

**Source:**
- The Social Security (Contributions) Regulations 2001 (SI 2001/1004), Schedule 3, Part X, paragraph 5 (gratuities and offerings). Fetched: https://www.legislation.gov.uk/uksi/2001/1004/schedule/3/part/X
  - Conditions as returned: "(a) ... is not made, directly or indirectly, by the secondary contributor; and does not comprise or represent sums previously paid to the secondary contributor" or "the secondary contributor does not allocate the payment, directly or indirectly, to the earner".
- HMRC National Insurance Manual NIM02922. Fetched: https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922
  - Verbatim: "If an employer does not allocate gratuities or payments in respect of gratuities either directly or indirectly to the employee the payments can be disregarded from earnings."
  - Verbatim: "If gratuities are paid via an independently run tronc and the employer is not involved in the allocation either directly or indirectly, there is no NICs liability."
  - Manual cites: "Paragraph 5(3) of Part 10 of Schedule 3 to the Social Security (Contributions) Regulations 2001".
- Employment (Allocation of Tips) Act 2023 (c. 13), sections 1 to 15, including s.3 (Independent troncs), s.4 (When tips etc must be dealt with), s.5 (Agency workers), s.6 (Information), s.9 (Code of practice about tips etc), s.14 (Commencement). Fetched: https://www.legislation.gov.uk/ukpga/2023/13/contents
- The Employment (Allocation of Tips) Act 2023 (Commencement No. 2) Regulations 2024 (SI 2024/829), regulation 3: sections 1 to 8 and 10 to 12 come into force on 1 October 2024. Fetched: https://www.legislation.gov.uk/uksi/2024/829/made
- Earlier commencement: The Employment (Allocation of Tips) Act 2023 (Commencement No. 1) Regulations 2023 (SI 2023/876), 31 July 2023, referenced in the note to SI 2024/829. Not separately fetched.

**Confidence: LOCKED**, and it strengthens existing HP 7 and HP 8 rather than contradicting them.

HP 7 currently cites only NIM02922 for the NIC position. The statutory anchor, **paragraph 5 of Part 10 of Schedule 3 to the Social Security (Contributions) Regulations 2001**, is now confirmed by direct fetch and should be quoted alongside the manual on any page that makes the NIC claim. A manual is HMRC practice; the regulation is the law. `rates_ledger.json` key `tronc_nic_exempt` records the manual URL only, with `applies_from: "historic"`; that is defensible but the statutory reference should be added to its `notes`.

HP 8 says the Act inserts provisions and is "in force from 1 October 2024". Confirmed by SI 2024/829 reg 3. One refinement: it is not the whole Act. Section 9 and the code-of-practice machinery commenced 31 July 2023. Pages should say "the main duties came into force on 1 October 2024", not "the Act came into force on 1 October 2024".

---

## Anchor 7. Retail, Hospitality and Leisure relief, 2026/27 England

**Locked position.** For 2026/27 in England the RHL relief scheme has **ended**. GOV.UK states: "You cannot make a new claim for retail, hospitality and leisure relief" and "From 1 April 2026, you will need to use rate multipliers to calculate your business rates bill." In its place, two permanently lower multipliers for qualifying RHL properties **did take effect from 1 April 2026** in England. Confirmed 2026/27 England multipliers: RHL properties pay 38.2p where rateable value is below £51,000 and 43p where rateable value is £51,000 to £499,999; the national equivalents for non-RHL properties are 43.2p and 48p respectively (so the RHL multipliers sit 5p below); properties with rateable value of £500,000 or more pay 50.8p and do not get an RHL multiplier. Businesses that lost RHL relief at the 1 April 2026 revaluation may instead be eligible for supporting small business relief.

**Cash cap: UNCONFIRMED, and probably moot.** The £110,000 per business cash cap was a feature of the annual RHL *relief* schemes (the 75% and then 40% versions). Because the relief has ended for 2026/27 and been replaced by a permanently lower multiplier, there is no cash cap to state for 2026/27: a multiplier is not a capped relief. I could not find, and did not fetch, any primary source stating a cash cap for 2026/27, because there does not appear to be one to state. **Do not write a cash cap figure on any 2026/27 page.** If a page discusses prior years, the cap belongs to those years and must be dated.

**Devolution.** Business rates are devolved. The multipliers and the ended-relief position above are **England only**. Scotland (non-domestic rates, Scottish Government), Wales (Welsh Government) and Northern Ireland (regional and district rates, Land and Property Services) each run separate regimes with separate reliefs and separate poundages. This pass verified England only and asserts nothing about the other three.

**Source:**
- Business rates relief: retail, hospitality and leisure relief, GOV.UK. Verbatim: "You cannot make a new claim for retail, hospitality and leisure relief." and "From 1 April 2026, you will need to use rate multipliers to calculate your business rates bill." Fetched: https://www.gov.uk/business-rates-relief/retail-discount
- Estimate your business rates, GOV.UK (2026 to 2027 multipliers). Verbatim: "48 pence if your rateable value is £51,000 or more (up to £499,999)"; "43.2 pence if your rateable value is below £51,000"; for retail, hospitality and leisure: "43 pence if your rateable value is £51,000 or more (up to £499,999)" and "38.2 pence if your rateable value is below £51,000"; for £500,000 or more: "Use a multiplier of 50.8 pence." Fetched: https://www.gov.uk/calculate-your-business-rates
- Business rates multipliers for qualifying retail, hospitality or leisure properties, GOV.UK: "From April 2026, the government is introducing two lower business rates multipliers for RHL properties", "5p below their national equivalents", £500,000 rateable value threshold. Fetched: https://www.gov.uk/guidance/business-rates-multipliers-qualifying-retail-hospitality-or-leisure — note this page states the design but does NOT carry the numeric pence figures; the numbers above come from the estimate-your-business-rates page.

**Confidence: LOCKED on the multipliers and the ending of the relief. UNCONFIRMED on the cash cap (see above, and the correct editorial response is to omit it, not to hunt harder).**

Consistent with existing HP 19, which already says: "Retail, Hospitality and Leisure business rates relief has ended for new claims from 1 April 2026; from that date businesses use revised rate multipliers" and records the same four pence figures. HP 19's caution "Transitional protection for existing relief was not separately confirmed; do not assert it" still stands; this pass did not confirm it either. HP 19 should be extended with the supporting small business relief signpost, which is new on the GOV.UK page as of this pass.

`rates_ledger.json` carries no RHL keys at all. It should gain `rhl_multiplier_below_51k` = 38.2p, `rhl_multiplier_51k_to_499999` = 43p, `standard_multiplier_500k_plus` = 50.8p, all `applies_from: "2026-04-01"`, England only. Flagging as a gap, not editing the file.

---

## Summary of required ledger and HP corrections

Not applied in this pass. For the orchestrator to action.

1. `rates_ledger.json`: three alcohol duty keys carry `"applies_from": "2023-08-01"`. Values are correct; the date is wrong. Correct to `"2026-02-01"` and add a note that alcohol duty uprates on 1 February, next on 1 February 2027.
2. `rates_ledger.json`: add the four 2026/27 England business rates multipliers. Currently absent.
3. `rates_ledger.json`, `tronc_nic_exempt`: add the statutory reference (SI 2001/1004 Sch 3 Part X para 5) to `notes`; the manual URL alone is HMRC practice, not law.
4. HP 16: add the dispense-system condition to draught relief. Container size alone is not the test.
5. HP 8: change "in force from 1 October 2024" to "main duties in force from 1 October 2024"; s.9 commenced 31 July 2023.
6. HP 19: add the supporting small business relief signpost. Do not add a cash cap.
7. New HP needed for pet food (anchor 2); no existing position covers it.
8. New HP needed for the excise vs alcohol duty scope split (anchor 4) to prevent the two pages cannibalising.
