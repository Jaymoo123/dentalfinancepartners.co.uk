export interface HospitalityHub {
  slug: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const hospitalityHubs: HospitalityHub[] = [
  {
    slug: "restaurants",
    title: "Restaurants",
    headline: "Specialist accounts, VAT and payroll for restaurant operators",
    metaTitle: "Accountants for Restaurants | Hospitality Tax",
    metaDescription:
      "Specialist accountants for restaurant owners and operators. Food VAT, tronc schemes, EPOS reconciliation, payroll and annual accounts for UK restaurants.",
    intro:
      "Restaurants carry some of the most intricate VAT rules in UK tax law alongside tronc compliance, EPOS reconciliation, high staff turnover and the constant pressure on gross profit. Whether you run a single dining room or a group of sites, accurate accounts and tight cost control are not a distraction from the business. They are how you protect the margin.",
    stats: [
      {
        value: "£12.71",
        // ponytail: NLW from 1 Apr 2026, HP 11, gov.uk/national-minimum-wage-rates
        label: "National Living Wage per hour from 1 April 2026, the floor for every front-of-house and kitchen worker aged 21 and over",
      },
      {
        value: "15%",
        // ponytail: employer NIC rate from Apr 2025, HP 12, gov.uk rates-and-allowances-national-insurance-contributions
        label: "Employer National Insurance rate above the £5,000 secondary threshold, applied to every member of staff on payroll",
      },
      {
        value: "12.5%",
        // ponytail: FRS catering sector rate, HP 5, gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300
        label: "VAT Flat Rate Scheme sector rate for catering businesses including restaurants; the limited-cost-trader override rate is 16.5%",
      },
    ],
    challenges: [
      {
        title: "Food and drink VAT across every menu line",
        body: "Every restaurant meal consumed on the premises is a standard-rated catering supply at 20%, regardless of whether the individual dish would be zero-rated as a cold takeaway. Alcohol is always standard-rated. Confectionery, savoury snacks and soft drinks are standard-rated even when sold cold. Getting the VAT category wrong for even a subset of sales creates an understatement that compounds across every return. Operators running a takeaway alongside the dining room face additional hot-versus-cold analysis on every item.",
      },
      {
        title: "Tronc compliance under the Tips Act 2023",
        body: "The Employment (Allocation of Tips) Act 2023 has been in force since 1 October 2024. Every restaurant must have a written tips policy, pass 100% of qualifying tips to workers without deduction, and keep allocation records. A tronc run by a genuinely independent troncmaster allows the employer to avoid employer National Insurance on distributions; any employer involvement in who receives what destroys that exemption. Tips cannot count toward the National Living Wage under any arrangement.",
      },
      {
        title: "EPOS reconciliation and daily takings",
        body: "Till and point-of-sale systems generate card, cash and split-tender transactions across every cover. Reconciling EPOS data to bank deposits, accounting for card-processor settlement timing and matching to supplier invoices is a daily discipline. Discrepancies between declared sales and EPOS records are an HMRC trigger, particularly where cash covers form a significant part of trade.",
      },
      {
        title: "Staff cost against covers and average spend",
        body: "Labour is typically the largest operating cost after food and drink. Wage-to-sales ratio across kitchen and front-of-house varies by covers, shift patterns and menu pricing. Accounts that correctly separate tronc distributions from contracted wages, and that code staff costs against each department, give operators the data to manage rather than guess at their labour position.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts with food and drink margin visibility",
        body: "We prepare year-end accounts structured to show gross profit on food, gross profit on drink, and labour as a percentage of revenue across each trading week. Corporation Tax is calculated and filed alongside. For sole-trader operators, we handle the self-assessment and Making Tax Digital for Income Tax obligations that apply above £50,000 from 6 April 2026.",
      },
      {
        title: "Tronc scheme setup and payroll",
        body: "We design a compliant tronc structure with an independent troncmaster, prepare the written tips policy required by the Tips Act, and run the tronc payroll alongside your main payroll each period, including RTI submissions and National Minimum Wage compliance checks for every pay reference period.",
      },
      {
        title: "VAT returns and food rate review",
        body: "We prepare and submit your quarterly VAT returns, review your menu against the eat-in, hot takeaway and cold takeaway VAT rules, and advise on the Flat Rate Scheme catering rate of 12.5% versus the standard method. Where a multi-site group uses different EPOS systems, we reconcile each site before consolidation.",
      },
    ],
    faqs: [
      {
        question: "What gross profit percentage should a restaurant target?",
        answer: "GP% targets vary by cuisine, price point, wet-versus-dry mix and service style, so no single figure applies across the sector. Food GP% and beverage GP% should be tracked separately and benchmarked against your own prior periods rather than presented as an industry absolute. We help operators build their own rolling GP% reports from coded accounts.",
      },
      {
        question: "Do I charge VAT differently on eat-in versus takeaway orders?",
        answer: "Yes. Food and drink consumed on the premises is a catering supply and is standard-rated at 20% regardless of the individual item. Hot takeaway food is also standard-rated. Most cold takeaway food is zero-rated, but confectionery, savoury snacks, soft drinks, alcohol and ice cream are standard-rated even as cold takeaway. See HMRC Notice 709/1 at gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091.",
      },
      {
        question: "Can a restaurant run a tronc and save employer National Insurance?",
        answer: "Yes, where the tronc is run by a genuinely independent troncmaster who controls all allocation decisions without employer involvement. HMRC's position is set out at NIM02922 (gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922). If the employer is involved in deciding who receives what, the National Insurance exemption is lost. Income tax via PAYE still applies to all tronc receipts.",
      },
      {
        question: "Are casual kitchen and waiting staff employees for payroll?",
        answer: "Almost always yes. Zero-hours and casual arrangements do not on their own make a worker self-employed. HMRC's employment status tests look at control, substitution and mutuality of obligation. Misclassifying employed workers as self-employed leads to backdated PAYE, employer National Insurance and potential penalties. See gov.uk/employment-status/employee.",
      },
    ],
  },
  {
    slug: "pubs-and-bars",
    title: "Pubs and Bars",
    headline: "Specialist accounts, duty and payroll for pub and bar operators",
    metaTitle: "Accountants for Pubs and Bars | Hospitality Tax",
    metaDescription:
      "Specialist accountants for pub and bar operators. Alcohol duty, draught relief, wet and dry GP splits, Machine Games Duty, tronc and payroll for UK licensed premises.",
    intro:
      "Licensed-trade finance is a specialist discipline. Wet and dry GP splits, draught relief pricing, AWRS due diligence, Machine Games Duty, premises licence costs and tronc for bar teams all sit outside the scope of a generalist accountant. Whether you are a tenanted publican, a leaseholder or a freehold operator running one site or several, the accounts and tax need to reflect how a pub actually works.",
    stats: [
      {
        value: "£19.45",
        // ponytail: draught relief rate beer/wine/spirits 3.5%-8.5% ABV, HP 16, gov.uk/guidance/alcohol-duty-rates
        label: "Alcohol duty per litre of pure alcohol on qualifying draught beer, wine and spirits (containers 20 litres or more), versus £22.58 per litre for equivalent packaged products",
      },
      {
        value: "6.5%",
        // ponytail: FRS pub sector rate, HP 5, gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300
        label: "VAT Flat Rate Scheme sector rate for public houses; wet-led operators with low goods spend may be caught by the 16.5% limited-cost-trader override",
      },
      {
        value: "£10,500",
        // ponytail: Employment Allowance, HP 13, gov.uk/claim-employment-allowance
        label: "Employment Allowance per year, reducing the employer National Insurance bill for eligible pubs with front-of-house, cellar and kitchen teams",
      },
    ],
    challenges: [
      {
        title: "Wet and dry GP split across every till",
        body: "A pub's margin depends on whether you are measuring draught, packaged, food or gaming income. Wet GP% on draught products is calculated after duty and not after retail VAT. Dry GP% on food follows the same eat-in standard-rating rules as a restaurant. Stocktakes, yield analysis and waste all affect the wet margin in ways that pure accounting systems do not capture without operator-specific setup. GP% targets are illustrative guidance for management, not authoritative benchmarks.",
      },
      {
        title: "Alcohol duty compliance and AWRS due diligence",
        body: "Buying alcohol for resale from a UK wholesaler requires verifying that the wholesaler is approved under HMRC's Alcohol Wholesaler Registration Scheme before purchase, and repeating that check regularly. Records of URN verification must be kept as evidence of due diligence. Draught relief reduces the duty rate on qualifying products served from containers of at least 20 litres, making the packaged versus draught pricing decision a real margin calculation, not a guess.",
      },
      {
        title: "Licensing costs and their tax treatment",
        body: "A premises licence and a designated premises supervisor holding a personal licence are both required to sell alcohol in England and Wales (Scotland operates a different regime). The tax treatment of licensing costs splits at the first application: costs incurred on a first application for a premises licence are capital expenditure and are not deductible from trading profits (HMRC BIM61405, Kneeshaw v Albertolli). Renewal costs are deductible. This is a common error in licensed-trade accounts.",
      },
      {
        title: "Machine Games Duty registration",
        body: "Any pub or bar whose gaming machines offer cash prizes must register for Machine Games Duty before those machines go live. The duty falls on the operator holding the qualifying licence. Registration after machines are already in play exposes the operator to penalties for the period of non-compliance.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts with wet and dry margin analysis",
        body: "We prepare pub accounts with cellar reconciliation, draught and packaged product margin analysis, food cost coding and gaming machine income treatment. Corporation Tax is calculated correctly for the structure of your tenancy or freehold arrangement. Licensing costs are categorised as capital or deductible based on the first-application versus renewal rule.",
      },
      {
        title: "VAT returns, food and drink split and FRS review",
        body: "We prepare quarterly VAT returns with the correct split between wet and dry sales, apply the food-VAT rules for hot and cold supplies, and review whether the Flat Rate Scheme pub-category rate of 6.5% or the standard method gives a better outcome for your business. Wet-led operators with low goods spend are checked against the 16.5% limited-cost-trader test before an FRS recommendation is made.",
      },
      {
        title: "Tronc, payroll and employment compliance",
        body: "We design tronc schemes for table-service bars and pubs under the Tips Act 2023 rules, operate payroll for variable-hours bar and kitchen teams, handle RTI submissions and carry out National Minimum Wage compliance checks each pay period. Employer National Insurance is calculated at 15% above the £5,000 secondary threshold from April 2025.",
      },
    ],
    faqs: [
      {
        question: "How do I split wet and dry sales in the pub accounts?",
        answer: "Wet sales (draught, packaged alcohol, soft drinks) and dry sales (food, snacks, accommodation where applicable) should be coded to separate nominal codes from the point of sale. A till or EPOS system with product-level VAT rates makes this automatic. At year-end, the split determines your wet and dry GP% and the correct VAT categorisation for each sales type. Draught products have a lower duty cost and typically a higher GP% than packaged; the accounts should reflect both separately.",
      },
      {
        question: "Does draught relief change my drinks pricing?",
        answer: "Yes, materially. Draught products (served from containers of at least 20 litres) attract alcohol duty of £19.45 per litre of pure alcohol for beer, wine and spirits at 3.5% to below 8.5% ABV, versus £22.58 per litre for the equivalent packaged product. That difference feeds directly into cost price and therefore into your GP% calculation. Cask and keg pricing models should use the draught rate, not the packaged rate. Figures from gov.uk/guidance/alcohol-duty-rates.",
      },
      {
        question: "Can I deduct the cost of my premises licence?",
        answer: "Only renewal costs are deductible. The cost of a first-application premises licence is capital expenditure and cannot be deducted from trading profits. This is confirmed in HMRC Business Income Manual BIM61405 (Kneeshaw v Albertolli). Renewal costs, by contrast, are a deductible trading expense. Treating first-application costs as revenue expenditure is a common error that can result in a discovery assessment.",
      },
      {
        question: "What VAT Flat Rate Scheme rate applies to a pub?",
        answer: "Public houses use the 6.5% FRS sector rate. However, if the value of goods you purchase is less than 2% of your FRS turnover or less than £1,000 per year (whichever is the higher test), you are a limited-cost trader and must apply the 16.5% override rate instead. Wet-led pubs with minimal food spend are at risk of this override. See gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300.",
      },
    ],
  },
  {
    slug: "takeaways",
    title: "Takeaways",
    headline: "Accounts, food VAT and compliance for takeaway operators",
    metaTitle: "Accountants for Takeaways | Hospitality Tax",
    metaDescription:
      "Specialist accountants for takeaway owners. Hot food VAT, delivery platform reconciliation, cash takings, MTD and annual accounts for UK takeaways and fast food.",
    intro:
      "Takeaway businesses face a distinct set of VAT rules, a growing share of income from delivery platforms, and sustained HMRC attention on cash sales. The hot-versus-cold distinction is determined by five statutory tests, not a simple temperature check. Delivery platform statements need reconciling line by line. And for sole-trader operators, Making Tax Digital for Income Tax is live above £50,000 from April 2026. Getting these right requires someone who knows the takeaway sector, not a generic bookkeeper.",
    stats: [
      {
        value: "£90,000",
        // ponytail: VAT registration threshold, HP 4, gov.uk/vat-registration/when-to-register
        label: "Rolling 12-month taxable turnover threshold at which VAT registration becomes compulsory; takeaway owners must monitor monthly, not at year-end",
      },
      {
        value: "100%",
        // ponytail: SBRR at RV up to £12,000, HP 20, gov.uk/apply-for-business-rate-relief/small-business-rate-relief
        label: "Small Business Rate Relief available on a single property with rateable value up to £12,000; many takeaways qualify and have never claimed",
      },
      {
        value: "20%",
        // ponytail: standard rate on hot food, HP 1, gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091
        label: "VAT rate on hot takeaway food; most cold takeaway food is zero-rated, with carve-outs for confectionery, savoury snacks, soft drinks and alcohol",
      },
    ],
    challenges: [
      {
        title: "Hot versus cold: five tests, not one",
        body: "Hot takeaway food is standard-rated at 20% if it meets any one of five tests: intentionally heated for consumption, heated to order, kept hot after cooking (for example in a heated cabinet), supplied in heat-retentive packaging, or advertised and marketed as a hot supply. Cold food is generally zero-rated unless it falls into the carve-outs (confectionery, savoury snacks, soft drinks, alcohol, ice cream). Applying the wrong rate to a proportion of sales, even one product line, creates a systematic understatement. HMRC Notice 709/1 at gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091 sets out all five tests.",
      },
      {
        title: "Delivery platform reconciliation",
        body: "Platforms pay net of commission, promotion charges and customer refunds. Reconciling platform payouts to actual gross sales, understanding the VAT treatment of commission invoices, and coding refunds correctly requires a line-by-line process against each platform statement. A mismatch between declared sales and platform data is a known HMRC audit trigger. VAT on delivery-platform commission should be reclaimed where you are VAT-registered and a valid VAT invoice has been issued.",
      },
      {
        title: "Cash sales and record-keeping",
        body: "Cash-intensive takeaways are subject to closer HMRC attention. An accurate till or EPOS record, an end-of-day reconciliation from cash received to bank deposit, and consistent coding of mixed cash-and-card days are basic requirements for accounts that can withstand scrutiny. Gaps in the audit trail invite an enquiry into whether all income has been declared.",
      },
      {
        title: "VAT threshold and business rates",
        body: "A growing takeaway can cross the £90,000 VAT registration threshold without realising it if turnover is not monitored on a rolling 12-month basis rather than at year-end only. Equally, many small takeaway premises have a rateable value below £12,000 and qualify for 100% Small Business Rate Relief, tapering to zero at £15,000, but have never applied for it.",
      },
    ],
    howWeHelp: [
      {
        title: "VAT returns with hot and cold analysis",
        body: "We prepare your quarterly VAT returns applying the correct rate to each product category, reconcile delivery platform income from all platforms to gross sales, and handle any input VAT on platform commission invoices. Where you are approaching the £90,000 threshold, we give you advance notice so registration can be managed rather than forced.",
      },
      {
        title: "Annual accounts and tax",
        body: "We prepare year-end accounts capturing income from all channels (cash, card, platforms), correctly coding food purchases, waste and supplier credit notes to give a reliable gross margin figure. Sole-trader operators above £50,000 income are set up for Making Tax Digital for Income Tax from 6 April 2026 using MTD-compatible software.",
      },
      {
        title: "Business rates and compliance",
        body: "We review your rateable value against the Small Business Rate Relief thresholds and prepare the application where you qualify. We also advise on food business registration requirements (at least 28 days before trading, as required by law) and on the cash basis versus accruals choice for sole-trader takeaway operators.",
      },
    ],
    faqs: [
      {
        question: "Is hot takeaway food always standard-rated?",
        answer: "Hot takeaway food is standard-rated at 20% if it meets any one of five tests set out in HMRC Notice 709/1 (gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091). The tests cover whether food was intentionally heated for consumption, heated to order, kept hot after cooking, supplied in heat-retentive packaging, or advertised as a hot supply. Meeting any single test is enough to trigger standard-rating.",
      },
      {
        question: "Is cold takeaway food zero-rated?",
        answer: "Most cold food sold for takeaway is zero-rated, but there are four carve-outs: confectionery (including chocolate and sweets), crisps and savoury snacks, soft drinks (including carbonated drinks and squashes), and alcohol. Ice cream is also standard-rated. All other food for human consumption sold cold for takeaway is generally zero-rated. See gov.uk/guidance/food-products-and-vat-notice-70114.",
      },
      {
        question: "When does a takeaway have to register for VAT?",
        answer: "VAT registration is compulsory once rolling 12-month taxable turnover exceeds £90,000. The trigger is a rolling test: if cumulative taxable sales in any 12-month window exceed £90,000, you must register within 30 days of the end of that month. This means a takeaway with growing delivery platform income should monitor monthly, not at year-end only. See gov.uk/vat-registration/when-to-register.",
      },
      {
        question: "Can my takeaway claim small business rate relief?",
        answer: "Yes, if it is your only business property and its rateable value is £12,000 or below, you qualify for 100% Small Business Rate Relief with no rates to pay. The relief tapers between £12,001 and £15,000 (50% at £13,500, 33% at £14,000) and is nil above £15,000. Many takeaway premises qualify and the relief has never been claimed. See gov.uk/apply-for-business-rate-relief/small-business-rate-relief.",
      },
    ],
  },
  {
    slug: "hotels-and-guesthouses",
    title: "Hotels and Guesthouses",
    headline: "Specialist accounts, TOMS and payroll for hotels, B&Bs and guesthouses",
    metaTitle: "Accountants for Hotels and Guesthouses | Hospitality Tax",
    metaDescription:
      "Specialist accountants for hotel, guesthouse and B&B operators. TOMS, accommodation VAT, occupancy accounting, capital allowances and payroll for UK hotels.",
    intro:
      "Hotel and guesthouse finance is driven by rooms revenue, departmental cost control and a VAT regime that changes character when you package bought-in travel elements. The Tour Operators' Margin Scheme applies to any operator bundling accommodation with bought-in transport or other travel services, not only dedicated tour operators. Add occupancy-led staffing, OTA commission reconciliation and capital allowances on refurbishment, and you need an accountant who understands how accommodation businesses actually generate and spend money.",
    stats: [
      {
        value: "10.5%",
        // ponytail: FRS hotels/accommodation sector rate, HP 5, gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300
        label: "VAT Flat Rate Scheme sector rate for hotels and accommodation businesses including B&Bs, guesthouses, motels and self-catering",
      },
      {
        value: "£7,500",
        // ponytail: Rent-a-Room relief, HP 21, gov.uk/rent-room-in-your-home/the-rent-a-room-scheme
        label: "Rent-a-Room relief per year for B&B and guesthouse owners letting rooms in their own home (£3,750 if shared); the residence condition must be met",
      },
      {
        value: "£1,000,000",
        // ponytail: AIA limit, HP 22, gov.uk/capital-allowances/annual-investment-allowance
        label: "Annual Investment Allowance for qualifying plant and machinery including kitchen equipment, furniture and fit-out; the main-pool Writing Down Allowance is 14% from April 2026 under FA 2026",
      },
    ],
    challenges: [
      {
        title: "TOMS: when packaging bought-in travel triggers margin VAT",
        body: "The Tour Operators' Margin Scheme applies when any operator bundles bought-in travel elements (accommodation, transport or other travel services purchased from third parties) and sells them as a package. Under TOMS, VAT is due only on the margin between the selling price and the cost of the bought-in elements. Input VAT on those elements cannot be recovered. This applies to hotels and guesthouses that bundle stays with bought-in transfers, excursions or third-party accommodation even if travel is not the main activity. See gov.uk/guidance/tour-operators-margin-scheme-for-vat-notice-7095.",
      },
      {
        title: "Occupancy and departmental cost control",
        body: "Revenue per available room (RevPAR), average daily rate and occupancy percentage are the core trading KPIs for accommodation businesses, but they are illustrative management metrics rather than authoritative benchmarks. Departmental accounts separating rooms revenue, food and beverage and events allow the operator to see which areas are profitable and where costs are running ahead of revenue. OTA commission, housekeeping labour and linen are among the costs that must be coded correctly to make departmental reporting meaningful.",
      },
      {
        title: "B&B and rent-a-room: the residence boundary",
        body: "A B&B or guesthouse owner letting rooms in their own home may use Rent-a-Room relief of up to £7,500 per year (£3,750 if the property is shared with another person), making that letting income tax-free. The condition is genuine residence: the owner must live in the property. A property used solely as a trading premises does not qualify. Operating a full guest house as a trade (not letting part of a home) is assessed under trading income rules, not the Rent-a-Room Scheme.",
      },
      {
        title: "Refurbishment, fit-out and capital allowances",
        body: "Hotels and guesthouses invest repeatedly in rooms, kitchens and common areas. Kitchen equipment, furniture, fixtures and fittings are qualifying plant and machinery for capital allowances purposes. The Annual Investment Allowance covers up to £1,000,000 of qualifying spend per year. From the 2026-27 tax year, the main-pool Writing Down Allowance reduces to 14% (Finance Act 2026 s.28), and a new 40% First Year Allowance is available for qualifying main-pool additions (FA 2026 s.29). Capital allowance sequencing (AIA first, then FYA, then WDA) matters for large refurbishment projects.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts with departmental revenue analysis",
        body: "We prepare hotel and guesthouse accounts with rooms, food and beverage and events reported as separate revenue streams, producing management accounts that give you occupancy, ADR and departmental margin visibility each period. Corporation Tax is calculated for the entity structure, whether that is a sole trader, partnership or limited company.",
      },
      {
        title: "VAT including TOMS and OTA reconciliation",
        body: "We prepare quarterly VAT returns reconciled to OTA statements, channel manager data and direct bookings, recovering input VAT on commissions. Where TOMS applies because you package bought-in travel elements, we calculate the margin VAT correctly and advise on when TOMS is triggered versus a standard supply of accommodation.",
      },
      {
        title: "Payroll, tronc and capital allowances",
        body: "We run departmental payroll for housekeeping, front-of-house and F&B teams, handle tronc for service charges on room and restaurant bills under the Tips Act 2023 rules, and review all capital expenditure on refurbishment for available capital allowances. Employer National Insurance is calculated at 15% above the £5,000 secondary threshold from April 2025, and the £10,500 Employment Allowance is claimed where eligible.",
      },
    ],
    faqs: [
      {
        question: "Does TOMS apply to my hotel?",
        answer: "TOMS applies whenever you bundle bought-in travel elements (accommodation, transport or other travel services purchased from third parties) and sell them as a package. It is not limited to dedicated tour operators: a hotel packaging stays with bought-in transfers or excursions is within TOMS for those sales. Under TOMS, VAT is due only on the margin, and input VAT on bought-in elements cannot be recovered. See gov.uk/guidance/tour-operators-margin-scheme-for-vat-notice-7095.",
      },
      {
        question: "Can a B&B use the Rent-a-Room Scheme?",
        answer: "Yes, but only where the owner genuinely lives in the property. The Rent-a-Room Scheme allows up to £7,500 per year of letting income to be received tax-free (£3,750 if shared with another person), and explicitly covers bed and breakfast and guest houses. The condition is residence: a property used solely as a commercial guest house that is not the owner's home does not qualify. Operating a full guest house as a trade is assessed under trading income rules instead. See gov.uk/rent-room-in-your-home/the-rent-a-room-scheme.",
      },
      {
        question: "Can I claim capital allowances on a hotel refurbishment?",
        answer: "Yes. Kitchen equipment, furniture, fixtures and fittings are qualifying plant and machinery. The Annual Investment Allowance covers up to £1,000,000 of qualifying spend per year (gov.uk/capital-allowances/annual-investment-allowance). From April 2026, the main-pool Writing Down Allowance reduces from 18% to 14% under Finance Act 2026 s.28, and a 40% First Year Allowance is available for qualifying main-pool additions under FA 2026 s.29. The optimal sequencing is AIA first, then FYA on remaining qualifying spend, then WDA on the pool balance.",
      },
      {
        question: "What VAT Flat Rate Scheme rate applies to a hotel or B&B?",
        answer: "Hotels and accommodation businesses (including B&Bs, guesthouses, motels, self-catering and youth hostels) use the 10.5% FRS sector rate. The tradescode determines the rate, not the business's own description of itself. A guest house applying the wrong sector rate is accounting incorrectly and may face an assessment for the difference. See gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300.",
      },
    ],
  },
  {
    slug: "cafes-and-coffee-shops",
    title: "Cafes and Coffee Shops",
    headline: "Accounts, VAT and payroll for cafe and coffee shop operators",
    metaTitle: "Accountants for Cafes and Coffee Shops | Hospitality Tax",
    metaDescription:
      "Specialist accountants for cafe and coffee shop owners. Food and drink VAT, Small Business Rate Relief, payroll, MTD and annual accounts for UK cafes.",
    intro:
      "Cafes and coffee shops sit in one of the most intricate corners of UK food VAT. Hot drinks are standard-rated regardless of whether they are consumed in or taken away. Cold food sold as takeaway is generally zero-rated but the eat-in rule changes the position for the same item sold across the counter. Add the Small Business Rate Relief that many cafes qualify for and never claim, the employment status of part-time baristas, and Making Tax Digital for sole-trader operators, and getting the numbers right matters more than most owners realise.",
    stats: [
      {
        value: "£12,000",
        // ponytail: SBRR 100% threshold, HP 20, gov.uk/apply-for-business-rate-relief/small-business-rate-relief
        label: "Rateable value below which a single-property cafe qualifies for 100% Small Business Rate Relief with no business rates to pay",
      },
      {
        value: "£10,500",
        // ponytail: Employment Allowance, HP 13, gov.uk/claim-employment-allowance
        label: "Employment Allowance per year that eligible cafes can offset against their employer National Insurance bill, material for small teams on part-time and variable hours",
      },
      {
        value: "£90,000",
        // ponytail: VAT registration threshold, HP 4, gov.uk/vat-registration/when-to-register
        label: "Rolling 12-month taxable turnover threshold for compulsory VAT registration; cafes with eat-in seating accumulate standard-rated sales faster than takeaway-only operators",
      },
    ],
    challenges: [
      {
        title: "Hot drinks and eat-in VAT across every till line",
        body: "Hot drinks (including coffee, tea and other hot beverages) are a standard-rated supply at 20% whether consumed in or taken away, because they are hot. Cold food consumed on the premises is standard-rated because it is a catering supply. The same cold sandwich sold as takeaway is zero-rated unless it contains a standard-rated carve-out item (confectionery, savoury snacks, soft drinks, alcohol). A cafe with eat-in seating and a takeaway counter must apply the correct rate to each sale, not an averaged rate. HMRC Notice 709/1 at gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091 sets out the rules.",
      },
      {
        title: "Small Business Rate Relief: most small cafes qualify and never claim",
        body: "Many small cafe premises have a rateable value below £12,000. Provided it is the business's only property, 100% Small Business Rate Relief applies and no business rates are due. The relief tapers between £12,001 and £15,000 and is nil above £15,000. Retail, Hospitality and Leisure relief has ended for new claims from 1 April 2026 and cannot be added. SBRR is the live lever for small cafes. See gov.uk/apply-for-business-rate-relief/small-business-rate-relief.",
      },
      {
        title: "Part-time and casual staff employment status",
        body: "Cafe baristas and counter staff working part-time or irregular hours are almost always employees for PAYE purposes, not self-employed. The National Living Wage of £12.71 per hour applies to workers aged 21 and over from 1 April 2026, with lower rates for younger workers. Employer National Insurance is 15% above the £5,000 secondary threshold from April 2025. The Employment Allowance of £10,500 per year reduces the NIC bill for eligible cafes and is frequently unclaimed.",
      },
      {
        title: "Food business registration and VAT threshold monitoring",
        body: "Every food business in England, Wales and Northern Ireland must register with the local authority at least 28 days before trading begins. The registration is free and cannot be refused, but failure to register is a criminal offence. For growing cafes, the £90,000 rolling VAT threshold needs monthly monitoring rather than an annual review; a cafe that crosses the threshold mid-year must register within 30 days.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts with food and drink margin breakdown",
        body: "We prepare cafe accounts with beverage and food gross margin reported separately, giving the operator a clear view of the contribution from each revenue stream. Corporation Tax is calculated and filed for limited company cafes. Sole-trader operators above £50,000 income are set up for Making Tax Digital for Income Tax from 6 April 2026.",
      },
      {
        title: "VAT returns and menu rate review",
        body: "We prepare quarterly VAT returns applying the eat-in, hot and cold takeaway rules to each menu line, review your menu categorisation for any misclassified supplies, and advise on whether the Flat Rate Scheme catering sector rate of 12.5% is appropriate for your business. We also check and apply for Small Business Rate Relief where your premises qualify.",
      },
      {
        title: "Payroll, Employment Allowance and employment status",
        body: "We run payroll for mixed-hours cafe teams, confirm employment status for anyone paid as self-employed, claim the Employment Allowance of £10,500 per year where eligible, and carry out National Minimum Wage compliance checks each pay period. National Living Wage from 1 April 2026 is £12.71 for workers aged 21 and over.",
      },
    ],
    faqs: [
      {
        question: "Do I charge VAT on hot drinks and cold food?",
        answer: "Hot drinks (coffee, tea, hot chocolate) are standard-rated at 20% regardless of whether they are consumed in or taken away, because they are a hot supply. Cold food is zero-rated as takeaway but standard-rated as a catering supply if the customer eats in, even if the food itself would be zero-rated cold. Standard-rated carve-outs (confectionery, savoury snacks, soft drinks, alcohol, ice cream) are standard-rated even as cold takeaway. See gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091.",
      },
      {
        question: "Can my cafe claim Small Business Rate Relief?",
        answer: "Yes, if your cafe premises is your only business property and has a rateable value of £12,000 or below, you receive 100% Small Business Rate Relief with no rates to pay. The relief tapers from £12,001 to £15,000 and is nil above that. Retail, Hospitality and Leisure relief has ended for new claims from 1 April 2026. Apply through your local billing authority or ask us to prepare the application. See gov.uk/apply-for-business-rate-relief/small-business-rate-relief.",
      },
      {
        question: "Are my part-time baristas employees?",
        answer: "Almost certainly yes. Part-time and casual arrangements do not on their own make a worker self-employed. HMRC's employment status tests look at control, the right of substitution and mutuality of obligation. Misclassifying employed workers as self-employed creates a backdated PAYE and employer National Insurance liability. See gov.uk/employment-status/employee. The National Living Wage of £12.71 per hour applies from 1 April 2026 for workers aged 21 and over.",
      },
      {
        question: "Do I need Making Tax Digital as a sole-trader cafe owner?",
        answer: "If your total income from self-employment and property exceeds £50,000, you must use MTD-compatible software to keep digital records and send quarterly updates to HMRC from 6 April 2026. The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. We set up MTD-compatible bookkeeping ahead of your go-live date. See gov.uk/guidance/sign-up-your-client-for-making-tax-digital-for-income-tax.",
      },
    ],
  },
  {
    slug: "caterers-and-street-food",
    title: "Caterers and Street Food",
    headline: "Accounts, VAT and payroll for event caterers and street food operators",
    metaTitle: "Accountants for Caterers and Street Food | Hospitality Tax",
    metaDescription:
      "Specialist accountants for event caterers and street food operators. Catering VAT, mobile unit capital allowances, employment status, cash basis and payroll for UK caterers.",
    intro:
      "Catering and street food businesses operate differently from fixed-site restaurants: income arrives event by event, staffing is seasonal, equipment travels with the unit, and every supply you make is a standard-rated catering service regardless of what food you serve. Mobile unit capital allowances, pitch and market fees, cash basis versus accruals and the employment status of casual event staff are the questions that come up every year. An accountant who treats a caterer like a retailer will get the VAT wrong from the first return.",
    stats: [
      {
        value: "20%",
        // ponytail: catering always standard-rated, HP 2, gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091
        label: "VAT rate on all catering supplies; caterers cannot zero-rate any supply on the basis that the food itself would be zero-rated in a retail context",
      },
      {
        value: "£1,000,000",
        // ponytail: AIA limit, HP 22, gov.uk/capital-allowances/annual-investment-allowance
        label: "Annual Investment Allowance for qualifying plant and machinery including kitchen equipment and trailers; a 40% First Year Allowance also available from April 2026 on qualifying main-pool additions",
      },
      {
        value: "28 days",
        // ponytail: food business registration, HP 25, gov.uk/food-business-registration
        label: "Minimum notice required to register a food business with the local authority before trading begins; registration is free but failure to register is a criminal offence",
      },
    ],
    challenges: [
      {
        title: "Catering is always standard-rated at 20%",
        body: "Every supply made by a caterer is a catering supply and is standard-rated at 20% regardless of the food involved. This is a material distinction from retail cold food, which is generally zero-rated. A caterer who treats certain food lines as zero-rated because those products would be zero-rated in a shop is misapplying the VAT rules. Recharged staffing, hire equipment and transport that form part of the catering service are part of the same standard-rated supply. See gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091.",
      },
      {
        title: "Event and job costing for margin control",
        body: "A caterer's profitability is measured event by event. Per-event margin depends on ingredient cost, staffing hours billed, equipment hire, travel and pitch or venue fees. Deposits must be accounted for when received for VAT purposes. A caterer relying on year-end accounts rather than per-event job costing cannot identify which bookings are profitable or where waste and over-staffing are eroding margin. Event-margin benchmarks are illustrative guidance only, not authoritative figures.",
      },
      {
        title: "Mobile units, vans and equipment: capital allowances",
        body: "Kitchen trailers, food trucks, portable equipment and refrigeration units are qualifying plant and machinery. The Annual Investment Allowance covers up to £1,000,000 of qualifying spend per year. From April 2026, the main-pool Writing Down Allowance is 14% under Finance Act 2026 s.28, and a 40% First Year Allowance is available for qualifying main-pool additions under FA 2026 s.29. The correct sequencing is AIA first, then FYA on any remaining qualifying main-pool spend, then WDA on the pool balance. Whether a specific vehicle is classified as a van (qualifying for full capital allowances) or a car (restricted treatment) requires a write-time check against HMRC vehicle guidance.",
      },
      {
        title: "Seasonal staff and employment status",
        body: "Many caterers engage casual chefs, waiters and bar staff for individual events, often treating them as self-employed. HMRC's employment status tests focus on control, the right of substitution and mutuality of obligation. Casual and seasonal workers engaged regularly, told how and when to work, and unable to freely substitute someone else are likely to be employees for PAYE and National Insurance purposes regardless of how they are contracted. Misclassification creates backdated PAYE, employer National Insurance at 15% and potential penalties.",
      },
    ],
    howWeHelp: [
      {
        title: "Annual accounts with per-event costing",
        body: "We prepare year-end accounts structured around event income and the costs that flow from each booking: ingredients, casual staff, hire and travel. Corporation Tax is calculated and filed on time. For sole-trader caterers above £50,000 income, we set up Making Tax Digital for Income Tax from 6 April 2026. We also advise on the cash basis versus accruals choice: cash basis is the default for unincorporated businesses from April 2024, but caterers carrying significant stock and equipment may benefit from electing accruals for more accurate period-end profit reporting.",
      },
      {
        title: "VAT returns on catering contracts",
        body: "We prepare quarterly VAT returns applying the correct 20% standard rate to all catering supplies, handle VAT on deposits (due at the point of receipt), advise on the VAT treatment of recharged staffing and equipment hire, and review whether the Flat Rate Scheme catering sector rate of 12.5% is appropriate. Where pitch, market or venue fees carry VAT, we ensure the input tax is reclaimed correctly.",
      },
      {
        title: "Employment compliance, payroll and capital allowances",
        body: "We review the engagement arrangements for your casual event staff and advise on employment status risk. Where staff are treated as employed, we run payroll and handle RTI submissions. We also review all mobile unit, trailer and equipment capital expenditure for available capital allowances, applying the AIA, FA 2026 FYA and WDA in the correct sequence.",
      },
    ],
    faqs: [
      {
        question: "Do caterers always charge VAT at 20%?",
        answer: "Yes, on all catering supplies. Catering is standard-rated regardless of the food involved. The zero-rating that applies to cold food in a retail context does not apply when the supply is a catering service. A market stall caterer selling cold wraps to take away is still making a catering supply and must charge 20% once VAT-registered. See gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091.",
      },
      {
        question: "Can I claim capital allowances on a food truck or trailer?",
        answer: "Yes. Kitchen trailers, portable kitchen equipment and refrigeration units are qualifying plant and machinery. The Annual Investment Allowance covers up to £1,000,000 of qualifying spend per year, and a 40% First Year Allowance is available from April 2026 on qualifying main-pool additions under Finance Act 2026 s.29 (gov.uk/capital-allowances/annual-investment-allowance). Whether a specific vehicle is classified as a van or a car affects the available allowances and requires a check against HMRC vehicle guidance at write time.",
      },
      {
        question: "Are pitch and market fees deductible?",
        answer: "Yes. Pitch fees, market fees and venue hire costs paid by a caterer to trade at an event or market are allowable business expenses deductible from trading profit, provided they are incurred wholly and exclusively for the purposes of the trade. They should be coded consistently as a cost of sale or overhead and are deductible under normal trading expense rules.",
      },
      {
        question: "Should a caterer use cash basis or accruals?",
        answer: "Cash basis has been the default for unincorporated sole traders and partnerships from 6 April 2024 (gov.uk/simpler-income-tax-cash-basis). For caterers with significant stock and equipment held at period end, accruals accounting typically gives a more accurate profit picture because it matches costs to the period in which the related income is earned. Where a caterer takes deposits in advance and carries forward stock or pre-purchased event supplies, an accruals election is worth considering. We advise on which method suits your model.",
      },
    ],
  },
];

export function getHospitalityHub(slug: string): HospitalityHub | undefined {
  return hospitalityHubs.find((h) => h.slug === slug);
}
