export interface HospitalityService {
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

export const hospitalityServices: HospitalityService[] = [
  {
    slug: "tronc-scheme-setup",
    title: "Tronc Scheme Setup",
    headline: "HMRC-compliant tronc schemes for hospitality operators",
    metaTitle: "Tronc Scheme Setup for Restaurants and Hotels | Hospitality Finance Partners",
    metaDescription:
      "Set up a compliant tronc scheme for your restaurant, hotel or pub. Correct NIC treatment, independent troncmaster structure and Tips Act 2023 compliance handled for you.",
    intro:
      "A tronc is a separate pay arrangement run by an independent troncmaster to distribute tips and service charges to staff. Where the troncmaster genuinely controls allocation without any employer involvement, both employer and employee National Insurance contributions are eliminated on those distributions. Getting the independence condition right matters: any employer involvement in deciding who receives what destroys the NIC saving and exposes the business to historic NIC liabilities and HMRC enquiry. Income tax via PAYE still applies on every tronc payment.",
    stats: [
      {
        value: "0%",
        label:
          "Employer and employee NIC on qualifying tronc distributions where the troncmaster is genuinely independent (gov.uk NIM02922)",
      },
      {
        value: "15%",
        label:
          "Employer NIC rate on earnings above £5,000 per year that a compliant tronc avoids on tip distributions (from April 2025, gov.uk)",
      },
      {
        value: "Oct 2024",
        label:
          "Employment (Allocation of Tips) Act 2023 in force: 100% of qualifying tips must reach workers, with a written policy",
      },
    ],
    challenges: [
      {
        title: "Independence is the condition, not a technicality",
        body: "HMRC's National Insurance Manual (NIM02922) is clear: the NIC exemption applies only where the troncmaster genuinely controls who receives what, and the employer plays no part in allocation. Appointing a head chef or manager who follows the owner's instructions destroys the saving. The appointment, the allocation method and the ongoing governance must all hold up under scrutiny.",
      },
      {
        title: "Tips Act 2023 compliance runs alongside the NIC structure",
        body: "The Employment (Allocation of Tips) Act 2023, in force since 1 October 2024, requires operators to pass 100% of qualifying tips to workers without deductions, to allocate them fairly under the statutory Code of Practice, and to hold a written tips policy. A tronc scheme must be designed to satisfy both the HMRC independence requirement and the Tips Act obligations simultaneously.",
      },
      {
        title: "Employer top-ups are not part of the tronc NIC saving",
        body: "Employer top-up payments to supplement tronc distributions are contractual earnings, not tips or gratuities, and are subject to employer and employee NIC in the normal way (NIM02935). A scheme that conflates tronc distributions with employer top-ups will be treated as earnings for NIC purposes.",
      },
      {
        title: "Tips can never count toward the National Living Wage",
        body: "Tips, gratuities and tronc payments of any kind cannot be used to bring workers up to the National Living Wage or National Minimum Wage. The NLW is £12.71 per hour for workers aged 21 and over from 1 April 2026. A business that relies on tips to meet this floor is breaking the law, regardless of how the tronc is structured.",
      },
    ],
    howWeHelp: [
      {
        title: "Scheme design and troncmaster appointment",
        body: "We design a tronc scheme with the correct troncmaster structure, allocation rules and documentation to satisfy HMRC's independence requirement (NIM02922), the Tips Act 2023 statutory Code of Practice, and the written-policy obligation. The scheme is built for long-term scrutiny, not just initial setup.",
      },
      {
        title: "HMRC notification and PAYE registration",
        body: "We handle HMRC notification of the tronc arrangement, advise on the PAYE reporting obligations for tronc distributions and integrate the scheme into your existing payroll process. Income tax on tronc payments is reported via RTI alongside the main pay run.",
      },
      {
        title: "Ongoing troncmaster and payroll support",
        body: "We support the troncmaster with period-by-period allocation records, distribution payslips and reconciliation. For operators who also use our <a href=\"/services/hospitality-payroll\">hospitality payroll service</a>, tronc and main payroll are processed together without duplication.",
      },
    ],
    faqs: [
      {
        question: "What is a tronc and does my business need one?",
        answer:
          "A tronc is a separate pay arrangement run by an independent troncmaster that distributes tips and service charges to staff. Your business needs one if you receive significant card or pooled tips and want to eliminate employer and employee NIC on those distributions. Without a correctly structured tronc, tips paid through the employer are treated as earnings and attract full NIC. See also <a href=\"/services/hospitality-payroll\">hospitality payroll</a> for how tronc payments sit inside your overall pay run.",
      },
      {
        question: "Does a tronc save employee NIC as well as employer NIC?",
        answer:
          "Yes. Where the troncmaster is genuinely independent and the employer has no involvement in deciding who receives what, distributions are free of both employer and employee NIC (gov.uk NIM02922). Income tax via PAYE is still due on every tronc payment; the saving is on NIC, not income tax.",
      },
      {
        question: "Can I (the owner or manager) be the troncmaster?",
        answer:
          "No, if you are involved in the allocation. HMRC requires the troncmaster to control who receives what entirely independently of the employer. An owner or manager who decides or influences the distribution destroys the NIC exemption. The troncmaster must be someone who genuinely operates independently of employer direction.",
      },
      {
        question: "Do tips through a tronc still count toward the minimum wage?",
        answer:
          "No. Tips, tronc payments and gratuities of any kind cannot count toward the National Living Wage or National Minimum Wage (gov.uk). The NLW is £12.71 per hour for workers aged 21 and over from 1 April 2026. Base pay must meet the minimum wage floor before any tip or tronc payment is considered.",
      },
    ],
  },
  {
    slug: "hospitality-payroll",
    title: "Hospitality Payroll",
    headline: "Payroll for hospitality businesses with tips, minimum wage compliance and variable rotas",
    metaTitle: "Hospitality Payroll Service | Tips, NLW and Casual Staff | Hospitality Finance Partners",
    metaDescription:
      "Payroll for restaurants, pubs, hotels and cafes. NLW £12.71 from April 2026, tronc integration, zero-hours staff, RTI submissions and employer NIC handled correctly.",
    intro:
      "Hospitality payroll is harder than most sectors. Variable hours, zero-hours and casual contracts, tronc distributions sitting alongside basic pay, high staff turnover, and the April 2026 cost rises (NLW up to £12.71 and employer NIC at 15% above a £5,000 threshold) all create payroll risks that generic providers routinely miss. Errors result in underpayments, worker complaints, HMRC penalties and, for minimum-wage breaches, public naming. Operators who run <a href=\"/services/tronc-scheme-setup\">a tronc scheme</a> need both services joined up.",
    stats: [
      {
        value: "£12.71",
        label:
          "National Living Wage per hour for workers aged 21 and over from 1 April 2026 (gov.uk). Tips and tronc payments cannot count toward this floor.",
      },
      {
        value: "15% / £5,000",
        label:
          "Employer NIC rate and secondary threshold from April 2025 (gov.uk). Employment Allowance of £10,500 per year offsets this for eligible businesses.",
      },
      {
        value: "Employee",
        label:
          "Default employment status for casual and zero-hours workers. Misclassifying them as self-employed is a recurring HMRC hospitality audit trigger.",
      },
    ],
    challenges: [
      {
        title: "April 2026 cost rises land on already-tight margins",
        body: "From 1 April 2026 the National Living Wage rises to £12.71 for workers aged 21 and over, £10.85 for workers aged 18 to 20, and £8.00 for under-18s and apprentices in their first year (gov.uk). Employer NIC runs at 15% on earnings above the £5,000 secondary threshold. Employment Allowance of £10,500 per year offsets the NIC bill for most small operators, but the combined effect of the wage and NIC changes must be modelled in the rota before they hit.",
      },
      {
        title: "Tips can never count toward the minimum wage",
        body: "Tips, tronc distributions and gratuities of any kind cannot be used to bring workers up to the National Living Wage or National Minimum Wage (gov.uk). Base pay must meet the hourly floor before any tip is counted. HMRC enforcement of NMW in hospitality is active and underpayments identified in inspection carry backdated liability and public naming.",
      },
      {
        title: "Casual and zero-hours workers are almost always employees",
        body: "Zero-hours and casual arrangements do not make a worker self-employed. GOV.UK employment status tests identify workers as likely employees when they are required to work regularly, are told how and when to work, cannot freely substitute someone else, and work under employer control. Misclassifying casual staff as self-employed is a common HMRC hospitality audit focus and carries backdated NIC and income tax liability.",
      },
      {
        title: "Tronc distributions must be correctly separated in the pay run",
        body: "Where a tronc scheme operates, distributions must be processed alongside the main payroll, correctly identified for NIC purposes and reported via RTI. The payslip must distinguish tronc pay from basic pay. Mixing the two in a single payroll line can trigger employer NIC on distributions that should be exempt. See <a href=\"/services/tronc-scheme-setup\">tronc scheme setup</a> for the independence conditions that unlock the saving.",
      },
    ],
    howWeHelp: [
      {
        title: "Weekly or monthly payroll with rota-driven variable hours",
        body: "We run payroll on your chosen frequency, processing variable hours, tronc distributions, deductions and benefits, submitting RTI on time every period and producing payslips that clearly separate tronc from basic pay. We include NMW compliance checks on every pay run.",
      },
      {
        title: "Starters, leavers and casual workers",
        body: "We handle all starter and leaver administration, issue P45s within the correct timescale, manage auto-enrolment assessments for each worker and process casual or seasonal additions mid-period without disrupting the main run.",
      },
      {
        title: "Employer NIC and Employment Allowance optimisation",
        body: "We apply the £10,500 Employment Allowance against your employer NIC bill, model the April 2026 NLW and NIC cost impacts on your rota, and flag any Employment Allowance eligibility conditions that must be met (for example, if your NIC liability was £100,000 or more in the prior year, you are excluded).",
      },
    ],
    faqs: [
      {
        question: "What is the minimum wage in hospitality from April 2026?",
        answer:
          "From 1 April 2026: £12.71 per hour for workers aged 21 and over (National Living Wage); £10.85 for those aged 18 to 20; £8.00 for under-18s and for apprentices under 19, or apprentices aged 19 and over who are in the first year of their apprenticeship (gov.uk). Once an apprentice aged 19 or over completes their first year, they move to their age-appropriate rate.",
      },
      {
        question: "Can tips count toward the minimum wage?",
        answer:
          "No. Tips, tronc payments and gratuities of any kind cannot count toward the National Living Wage or National Minimum Wage (gov.uk). Base hourly pay must meet the legal floor before any tip is considered. A business that uses tips to bridge the gap is underpaying its workers.",
      },
      {
        question: "Are casual and zero-hours workers employees for PAYE?",
        answer:
          "Almost always, yes. Zero-hours arrangements alone do not make a worker self-employed. GOV.UK employment status guidance identifies workers as likely employees when they work under employer direction and control, cannot freely substitute someone else, and are integrated into the employer's operation. Treating casual hospitality workers as self-employed is a recurring HMRC audit trigger.",
      },
      {
        question: "What is the Employment Allowance and do we qualify?",
        answer:
          "The Employment Allowance lets eligible employers reduce their employer NIC bill by up to £10,500 per tax year (gov.uk). Most small hospitality businesses qualify. You cannot claim it if your employer NIC liability in the prior tax year was £100,000 or more, or if you are a sole director with no other employees. For operators with part-time and zero-hours staff, the allowance is particularly valuable because it offsets the 15% employer NIC above the £5,000 secondary threshold.",
      },
    ],
  },
  {
    slug: "hospitality-vat",
    title: "Hospitality VAT",
    headline: "VAT returns, registration and scheme advice for hospitality operators",
    metaTitle: "Hospitality VAT Returns and Schemes | Restaurants, Pubs, Cafes | Hospitality Finance Partners",
    metaDescription:
      "VAT for restaurants, pubs, hotels and cafes. £90,000 threshold, hot vs cold food rules, Flat Rate Scheme category traps and Making Tax Digital compliance handled correctly.",
    intro:
      "Hospitality VAT sits on a web of edge cases that generic accountants miss and that HMRC knows operators get wrong. The £90,000 rolling registration threshold must be monitored monthly, not at year-end. The hot/cold and eat-in/takeaway distinction governs whether you charge 0% or 20% on the same product. And the Flat Rate Scheme category that determines your flat rate is set by your trade description in law, not by what you call yourself: a pub applying the catering rate instead of the licensed-premises rate overpays; a takeaway on the wrong category underpays and faces a correction bill. Getting these right from the start avoids interest, penalties and embarrassing retrospective adjustments.",
    stats: [
      {
        value: "£90,000",
        label:
          "VAT registration threshold on a rolling 12-month basis (gov.uk). Cross it and you must register within 30 days. Monitor monthly, not at year-end.",
      },
      {
        value: "12.5% / 6.5% / 10.5%",
        label:
          "Flat Rate Scheme sector rates for catering (restaurants, cafes, takeaways), pubs, and hotels/accommodation respectively (gov.uk FRS7300). The tradescode governs, not your own label.",
      },
      {
        value: "20% or 0%",
        label:
          "Standard rate on hot food, eat-in meals and alcohol; zero rate on most cold takeaway food. Five tests determine which side a product falls on.",
      },
    ],
    challenges: [
      {
        title: "The hot food rule is five tests, not one",
        body: "Hot takeaway food is standard-rated at 20%; most cold takeaway food is zero-rated. But the dividing line is five specific tests (gov.uk VAT Notice 709/1): whether the food was intentionally heated for consumption, heated to order, kept hot after cooking (for example in a heated cabinet), supplied in heat-retentive packaging, or advertised and marketed as a hot supply. Food that meets any one of these tests is standard-rated. Freshly baked goods that happen to be warm but satisfy none of the five tests may remain zero-rated. Edge cases in the grey zone (rotisserie chicken, toasted sandwiches, pies in a display cabinet) are where errors concentrate.",
      },
      {
        title: "Eat-in always means standard rate, regardless of temperature",
        body: "Anything consumed on the supplier's premises is catering and standard-rated, hot or cold (gov.uk VAT Notice 709/1). A business selling cold sandwiches with a seating area must charge 20% on eat-in sales and 0% on takeaway sales of the same product. Food courts and areas with designated seating are included. Mixed eat-in/takeaway operations must split sales correctly at point of sale.",
      },
      {
        title: "The Flat Rate Scheme category trap",
        body: "The FRS sector rate is determined by the tradescode that best describes the business, not by the business's own label. Catering (restaurants, cafes, takeaways, sandwich shops): 12.5%. Public houses (licensed clubs and pubs): 6.5%. Hotels and accommodation (bed and breakfast, hotels, self-catering): 10.5% (gov.uk FRS7300). A wet-led pub with very low goods spend may also be caught by the limited-cost-trader rate of 16.5% if goods cost less than 2% of FRS turnover or less than £1,000 per year. Operating on the wrong category is accounting incorrectly and creates a liability on discovery.",
      },
      {
        title: "Zero-rating carve-outs that catch operators",
        body: "Even where food is otherwise zero-rated, four categories are always standard-rated: confectionery (including chocolates, sweets and chocolate-covered biscuits), crisps and savoury snacks (including roasted or salted nuts packaged for snacking), soft drinks (carbonated beverages, cordials and squashes), and alcohol (all supplies, in all contexts). Ice cream is also standard-rated. A café or deli that zero-rates a grab-and-go bag of nuts or a bottle of branded juice is under-declaring VAT (gov.uk VAT Notice 701/14).",
      },
    ],
    howWeHelp: [
      {
        title: "VAT rate review and menu categorisation",
        body: "We review your menu, point-of-sale categorisation and FRS sector assignment, identify any misclassification against the five hot tests, the eat-in/takeaway split and the standing carve-outs, and produce a corrected VAT rate schedule ready for your till system. Use our <a href=\"/calculators/food-drink-vat-checker\">food and drink VAT checker</a> for a quick first-pass review.",
      },
      {
        title: "VAT registration and threshold monitoring",
        body: "We monitor your taxable turnover against the £90,000 rolling threshold on a monthly basis, not at year-end, and advise on the correct registration date before you cross it. Late registration carries a penalty calculated on the VAT that should have been accounted for; early advice avoids this.",
      },
      {
        title: "VAT returns, FRS management and Making Tax Digital",
        body: "We prepare and submit quarterly VAT returns through MTD-compatible software, review and update your FRS sector category if your trade mix changes, check whether the limited-cost-trader rate applies, and handle any HMRC correspondence. For operators approaching the threshold, we also advise on scheme selection before registration.",
      },
    ],
    faqs: [
      {
        question: "When does a hospitality business have to register for VAT?",
        answer:
          "VAT registration is compulsory once your rolling 12-month taxable turnover exceeds £90,000 (gov.uk). The trigger is a rolling 12-month test, not your accounting year. A café that crosses the threshold in October must register within 30 days. Hospitality businesses with mixed standard-rated and zero-rated supplies should monitor turnover every month, not just at year-end, because it is easy to cross the threshold without noticing until the liability has already accrued.",
      },
      {
        question: "Is hot food always standard-rated?",
        answer:
          "Standard-rated applies where food meets any one of five tests: intentionally heated for consumption, heated to order, kept hot after cooking, supplied in heat-retentive packaging, or advertised as a hot supply (gov.uk VAT Notice 709/1). Freshly baked goods that happen to be warm but meet none of the five tests may remain zero-rated. The rule is not simply 'hot equals 20%'; the five tests determine it.",
      },
      {
        question: "Is alcohol always standard-rated?",
        answer:
          "Yes. All supplies of alcohol are standard-rated at 20% regardless of context, whether sold for takeaway, with a meal, or as part of a package. Alcohol is one of four standing carve-outs from zero-rating alongside confectionery, crisps and savoury snacks, and soft drinks (gov.uk VAT Notice 701/14).",
      },
      {
        question: "What Flat Rate Scheme category applies to my business?",
        answer:
          "The FRS sector rate is set by the tradescode that best describes the business, not your own label (gov.uk FRS7300). Catering (restaurants, cafes, unlicensed and licensed takeaways, sandwich shops, mobile stands): 12.5%. Public houses and licensed clubs: 6.5%. Hotels and accommodation (bed and breakfast, hotels, self-catering, youth hostels): 10.5%. A business with very low goods spend may be caught by the limited-cost-trader rate of 16.5% if goods cost less than 2% of FRS turnover or less than £1,000 per year. Operating on the wrong rate is an accounting error and will be corrected on HMRC review.",
      },
    ],
  },
  {
    slug: "toms-advice",
    title: "Tour Operators Margin Scheme",
    headline: "TOMS advice for hotels and operators packaging bought-in travel services",
    metaTitle: "Tour Operators Margin Scheme (TOMS) for Hotels and Hospitality | Hospitality Finance Partners",
    metaDescription:
      "TOMS VAT advice for hotels, guest houses and hospitality operators that package bought-in accommodation, transport or travel services. Margin-only VAT, no input VAT recovery.",
    intro:
      "The Tour Operators Margin Scheme is not just for dedicated tour operators. HMRC's guidance confirms it applies to any business that buys in accommodation, transport or other travel services from third parties and sells them as a package to travellers, even where travel is not the operator's main activity. Hotels and guest houses that bundle third-party transfers, tours or experiences with a room stay can fall inside TOMS without realising it. Under TOMS, VAT is charged only on the margin (the difference between the price charged to the customer and the cost of the bought-in elements), and input VAT on those bought-in services cannot be recovered. Both outcomes are mandatory where the scheme applies: there is no opt-out.",
    stats: [
      {
        value: "Margin only",
        label:
          "VAT is charged on the margin between your selling price and the cost of bought-in travel elements, not on the full price charged to the customer (gov.uk Notice 709/5)",
      },
      {
        value: "No input VAT",
        label:
          "Input VAT on bought-in accommodation, transport and other designated travel services cannot be recovered under TOMS. This is a fundamental feature of the scheme.",
      },
      {
        value: "Any operator",
        label:
          "TOMS applies to any business packaging bought-in travel elements, not only dedicated tour operators. Hotels, guest houses and event venues are all in scope if the conditions are met.",
      },
    ],
    challenges: [
      {
        title: "TOMS catches hotels and venues that do not think of themselves as tour operators",
        body: "A hotel that sells its own rooms under normal VAT rules is outside TOMS. But if that hotel buys in third-party transfers, tours or third-party accommodation for overflow and packages them with the stay, those bought-in elements fall inside TOMS. HMRC's Notice 709/5 is explicit: TOMS applies when bought-in travel elements are resold to the traveller, even where travel is not the operator's main activity. The analysis depends on the specific supply chain, not the operator's self-description.",
      },
      {
        title: "In-house and bought-in supplies must be separated",
        body: "TOMS applies only to bought-in travel services. Where a business provides its own services (in-house accommodation, in-house meals, own-operated transport), those supplies fall outside TOMS and follow normal VAT rules. A mixed package that combines in-house and bought-in elements requires careful apportionment: the in-house element is taxed normally and the bought-in element is taxed on the margin only.",
      },
      {
        title: "Input VAT on bought-in elements is not recoverable",
        body: "A fundamental consequence of TOMS is that input VAT on designated bought-in travel services (accommodation, transport and other package elements from third parties) cannot be recovered. This is the trade-off for paying VAT only on the margin rather than on the full selling price. Operators sometimes mistakenly claim input VAT on these costs; HMRC will require repayment with interest.",
      },
      {
        title: "The margin calculation must be done correctly",
        body: "Under TOMS, VAT is calculated on the margin between the price charged to the customer and the cost of the bought-in elements. The calculation is applied to the business's overall TOMS margin, not transaction by transaction in all cases. Errors in identifying the bought-in costs, applying the correct VAT fraction or filing the calculation on the VAT return result in over or underpaid VAT.",
      },
    ],
    howWeHelp: [
      {
        title: "TOMS applicability assessment",
        body: "We analyse your supply chain and business model to determine whether TOMS applies and to which elements of your operation it reaches. The assessment covers your own-supply versus bought-in split, the nature of the package you offer, and whether any elements fall outside the scheme. See also <a href=\"/services/hospitality-vat\">our hospitality VAT service</a> for the broader VAT picture.",
      },
      {
        title: "Margin calculation and VAT return compliance",
        body: "Where TOMS applies, we calculate the margin correctly, ensure the VAT fraction is applied to the right base and file the result on your VAT return. We maintain the records needed to support the calculation on HMRC review, including the breakdown of bought-in costs by reference period.",
      },
      {
        title: "Mixed supply structuring",
        body: "Where your operation combines in-house and bought-in elements, we advise on the correct apportionment, document the split between TOMS and standard VAT supplies, and ensure input VAT is recovered only on the elements that qualify. For operators at <a href=\"/for/hotels-and-guesthouses\">/for/hotels-and-guesthouses</a>, we incorporate TOMS into the full accounts and VAT function.",
      },
    ],
    faqs: [
      {
        question: "Does TOMS apply to my hotel if I am not a tour operator?",
        answer:
          "Possibly, yes. TOMS applies to any business that buys in accommodation, transport or other travel services from third parties and resells them as part of a package to travellers, even where travel is not the main activity (gov.uk Notice 709/5). A hotel that sells only its own rooms is outside TOMS. A hotel that packages third-party transfers, tours or additional accommodation with its own rooms may be inside TOMS for those bought-in elements. The position depends on the specific supply chain and must be assessed rather than assumed.",
      },
      {
        question: "Can I recover input VAT on bought-in travel services under TOMS?",
        answer:
          "No. Input VAT on bought-in accommodation, transport and other designated travel services cannot be recovered under TOMS. This is a fundamental feature of the scheme: the trade-off is that VAT is charged only on your margin rather than on the full selling price, which typically produces a lower overall VAT liability. Recovering input VAT on TOMS-designated costs is an error that HMRC will correct with interest.",
      },
      {
        question: "How is VAT calculated under TOMS?",
        answer:
          "VAT under TOMS is charged on the margin, which is the difference between the price charged to the customer and the cost of the bought-in travel elements. The applicable VAT fraction is applied to the margin, not to the full selling price. The result is declared on the VAT return. The precise calculation method and whether it applies transaction by transaction or on an annual basis depends on the specifics of your operation; we advise on the correct approach after reviewing the supply chain.",
      },
      {
        question: "What counts as a bought-in travel element for TOMS?",
        answer:
          "Bought-in travel elements are accommodation, transport and other travel services purchased from third parties and resold to the traveller as part of a package. Own-supplied services (in-house rooms, in-house meals, transport you operate yourself) are not bought-in elements and fall outside TOMS. Third-party transfers, third-party tours, overflow accommodation sourced from another hotel and packaged with your own room are all potential TOMS elements.",
      },
    ],
  },
  {
    slug: "business-rates-relief",
    title: "Business Rates Relief",
    headline: "Business rates review for hospitality operators after the April 2026 changes",
    metaTitle: "Business Rates for Hospitality: 2026 Multipliers and SBRR | Hospitality Finance Partners",
    metaDescription:
      "Business rates advice for pubs, restaurants, hotels and cafes. RHL relief ended for new claims from April 2026. Revised multipliers, Small Business Rate Relief and rateable value reviews.",
    intro:
      "From 1 April 2026, Retail, Hospitality and Leisure relief is no longer available for new claims. Hospitality operators now calculate their business rates bill using revised rate multipliers set specifically for RHL-category properties. For operators who have been relying on an annual relief application, the 2026-27 bill will look different and must be checked against the correct multiplier for your rateable value. Separately, Small Business Rate Relief continues and many small cafes, takeaways and pubs qualify for 100% relief but have never claimed it.",
    stats: [
      {
        value: "Ended",
        label:
          "Retail, Hospitality and Leisure relief for new claims from 1 April 2026. Revised rate multipliers apply instead (gov.uk).",
      },
      {
        value: "100%",
        label:
          "Small Business Rate Relief available for properties with a rateable value of £12,000 or below, where it is the only property the business uses (gov.uk). Tapers to zero at £15,000.",
      },
      {
        value: "38.2p / 43p",
        label:
          "England 2026-27 multipliers for RHL properties: 38.2p in the pound for rateable values below £51,000; 43p for £51,000 to £499,999 (gov.uk, England only).",
      },
    ],
    challenges: [
      {
        title: "RHL relief has ended for new claims from April 2026",
        body: "GOV.UK is explicit: 'You cannot make a new claim for retail, hospitality and leisure relief. From 1 April 2026, you will need to use rate multipliers to calculate your business rates bill.' The RHL scheme ran at varying percentages and annual cash caps in previous years. Those rates no longer apply for new claims from this date. Operators who see content quoting a live RHL relief percentage for 2026-27 are reading stale information.",
      },
      {
        title: "Revised multipliers apply in 2026-27 (England)",
        body: "In England, RHL-category properties now pay a revised multiplier that sits below the national standard rate. For 2026-27: 38.2p in the pound for rateable values below £51,000; 43p for rateable values from £51,000 to £499,999; properties at £500,000 or above pay 50.8p (gov.uk, checker-verified, England only). Scotland and Wales operate different non-domestic rates regimes; figures for those nations are not stated here. Your 2026-27 rates bill should be checked against the correct multiplier for your rateable value band.",
      },
      {
        title: "Small Business Rate Relief is underclaimed by small operators",
        body: "Properties with a rateable value of £12,000 or below receive 100% Small Business Rate Relief, provided it is the only property the business uses (gov.uk). The relief tapers: 50% at £13,500, 33% at £14,000, zero at £15,000. Many takeaways, small cafes and independent pubs fall into this range and have never applied. SBRR must be claimed from the local authority; it is not applied automatically in all cases.",
      },
      {
        title: "Rateable value accuracy and potential challenges",
        body: "Rateable values are set by the Valuation Office Agency based on hypothetical rental evidence at the antecedent valuation date. A rateable value that does not reflect the true market position means paying too much for the life of the rating list. Hospitality premises that have undergone significant change, are in a declining rental market or were assessed on comparable evidence that no longer holds may have grounds for a check, challenge or appeal. An incorrect rateable value compounds every year it remains in place.",
      },
    ],
    howWeHelp: [
      {
        title: "2026-27 rates bill review and multiplier check",
        body: "We review your business rates bill against the correct 2026-27 multiplier for your rateable value and property category, confirm whether the revised RHL multiplier applies and identify any errors in the bill issued by your local authority. England figures are used as the default; operators in Scotland or Wales are flagged separately to the relevant devolved authority position.",
      },
      {
        title: "Small Business Rate Relief eligibility and application",
        body: "We assess your rateable value and property use against the SBRR eligibility criteria, confirm whether the 100% relief or the taper applies, and assist with the application to your local authority. For <a href=\"/for/cafes-and-coffee-shops\">cafes</a> and <a href=\"/for/takeaways\">takeaways</a> in particular, an unclaimed SBRR entitlement can be significant. See also <a href=\"/services/hospitality-vat\">VAT</a> and <a href=\"/services/hospitality-payroll\">payroll</a> if you are reviewing overall occupancy costs.",
      },
      {
        title: "Rateable value review and appeals signposting",
        body: "We review your rateable value against comparable rental evidence and advise whether a Check, Challenge or Appeal through the Valuation Office Agency process is likely to succeed. We signpost the correct route and timeline, including the obligation to continue paying at the current assessed level while a challenge is live.",
      },
    ],
    faqs: [
      {
        question: "Do I still get Retail, Hospitality and Leisure relief in 2026 to 2027?",
        answer:
          "No, not as a new claim. RHL relief ended for new claims from 1 April 2026. GOV.UK states: 'You cannot make a new claim for retail, hospitality and leisure relief. From 1 April 2026, you will need to use rate multipliers to calculate your business rates bill.' The revised multipliers for RHL-category properties in England are set below the national standard rate for 2026-27.",
      },
      {
        question: "What replaced RHL relief from April 2026?",
        answer:
          "Revised rate multipliers set specifically for Retail, Hospitality and Leisure category properties in England. For 2026-27: 38.2p in the pound for rateable values below £51,000; 43p for rateable values from £51,000 to £499,999; 50.8p for rateable values at £500,000 or above (gov.uk, England only). Scotland and Wales have separate non-domestic rates regimes.",
      },
      {
        question: "What is Small Business Rate Relief and do I qualify?",
        answer:
          "SBRR gives eligible properties 100% relief on business rates where the rateable value is £12,000 or below and the property is the only one the business uses (gov.uk). The relief tapers from £12,001: approximately 50% at £13,500, 33% at £14,000, falling to zero at £15,000. Many small cafes, takeaways and pubs fall in this range. The relief is not automatic in all local authority areas; it must be applied for.",
      },
      {
        question: "Are business rates different in Scotland and Wales?",
        answer:
          "Yes. Scotland operates its own non-domestic rates regime with different multipliers and relief schemes, including the Small Business Bonus Scheme. Wales also has its own system. The figures on this page are for England. Operators in Scotland or Wales should check the relevant devolved authority guidance; we can signpost the correct source.",
      },
    ],
  },
];

export function getHospitalityService(slug: string): HospitalityService | undefined {
  return hospitalityServices.find((s) => s.slug === slug);
}
