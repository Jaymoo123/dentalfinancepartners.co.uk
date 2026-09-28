export interface StartupsHub {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const startupsHubs: StartupsHub[] = [
  {
    slug: "pre-seed-founders",
    title: "Pre-Seed Founders",
    headline: "Tax and compliance for UK pre-seed founders before the first raise",
    metaTitle: "Accountants for Pre-Seed Founders UK",
    metaDescription: "Specialist accountants for UK pre-seed founders. SEIS eligibility, pre-trading expenditure, section 431 elections and formation done right before your first raise.",
    intro: "The decisions you make before your first raise set the structure you will carry through every subsequent funding round. Getting SEIS eligibility right, claiming pre-trading expenditure within the <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">seven-year window</a>, banking trading losses so they are available against future profits, and handling the section 431 election clock on your founder shares are all easier to do correctly now than to unwind after investment lands.",
    stats: [
      { value: "£250k", label: "Maximum SEIS raise for eligible companies: gross assets under £350,000, fewer than 25 FTE, within 3 years of starting to trade" },
      { value: "7 years", label: "Pre-trading expenditure window: costs incurred within 7 years before trade starts are treated as a deduction on the first day of trading" },
      { value: "14 days", label: "Section 431 election deadline: founders and employees acquiring restricted securities must make the joint election within 14 days of acquisition" },
    ],
    challenges: [
      {
        title: "SEIS eligibility is easy to lose before it matters",
        body: "SEIS has strict conditions on <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets, employee headcount, company age and the nature of the trade</a>. Many founders inadvertently breach one of these before they begin investor conversations. The window to check and correct eligibility is before investment, not after. An accidental breach can close the SEIS route entirely.",
      },
      {
        title: "Pre-trading costs are claimable but only within a seven-year window",
        body: "Expenditure incurred before a company formally starts trading is allowable as a deduction if it would have been deductible as a trading expense and falls within <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">seven years before trade began</a>. The window closes whether or not you claim it. Failing to identify these costs before the first accounts are finalised is leaving a real deduction unclaimed.",
      },
      {
        title: "Pre-profit startups should still file to bank their losses",
        body: "A cash-burning startup that does not yet have revenue still needs to file its Corporation Tax return. <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">Trading losses carry forward</a> and set against future trading profits. Failing to file means those losses are not formally recognised, and they cannot reduce the tax bill once profits arrive.",
      },
      {
        title: "The section 431 election is a 14-day clock, not optional advice",
        body: "Where founders or employees acquire restricted securities, a <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> must be made within 14 days of acquisition. Missing it means the unrestricted market value at the point restrictions lift is taxed as employment income. This is one of the most common and expensive formation-stage errors, and it cannot be corrected after the deadline passes.",
      },
    ],
    howWeHelp: [
      {
        title: "SEIS eligibility review before investor conversations",
        body: "We review your company's structure, age, <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets, headcount and trade</a> against the SEIS qualifying conditions and identify any issues before you start approaching investors. Where advance assurance from HMRC is the right step, we support the application.",
      },
      {
        title: "Pre-trading expenditure identification and loss banking",
        body: "We identify the expenditure incurred before your trade started, confirm it falls within the <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">seven-year window</a>, and ensure it is correctly treated in your first accounts. We also file your CT return to bank trading losses even before you have taxable profits, so they are available when you do.",
      },
      {
        title: "Founder share hygiene and section 431 election",
        body: "We advise on share structure at formation, identify whether a <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 election</a> is needed on your shares, and prepare the joint election documentation within the 14-day window. We also bridge to SEIS readiness and, when you are trading, to optimal salary and dividend structuring.",
      },
    ],
    faqs: [
      {
        question: "What makes my company eligible to raise under SEIS?",
        answer: "To raise under SEIS, your company must have <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets of no more than £350,000, fewer than 25 full-time-equivalent employees, and must be within three years of starting to trade</a> at the time of the investment. The total SEIS raise across the company's lifetime cannot exceed £250,000. There are also qualifying trade conditions; speak to us about your specific business model.",
      },
      {
        question: "Can I claim costs I paid before the company started trading?",
        answer: "Yes, if they fall within the rules. <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">Pre-trading expenditure is allowable</a> if it was incurred within seven years before the trade started and would have been deductible as a trading expense had the trade already been running. The costs are treated as incurred on the first day of trading. Personal costs paid before incorporation may need different analysis.",
      },
      {
        question: "What is a section 431 election and when is the 14-day deadline?",
        answer: "A <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> is made by the company and the individual who acquires restricted securities. It means the individual is taxed up front on the unrestricted market value, rather than on the higher value that applies when restrictions lift. The election must be made within 14 days of acquisition. Missing it is not recoverable. This is general guidance; speak to us about your specific position.",
      },
      {
        question: "Should I file a return if my startup made a loss this year?",
        answer: "Yes. Filing your Corporation Tax return banks the <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">trading loss as a carry-forward</a> against future profits. A startup that does not file loses the ability to offset those losses when the company becomes profitable. The loss is real value; it needs to be formally recognised.",
      },
      {
        question: "I am a solo contractor, not a startup founder. Can you help?",
        answer: "For contractor-specific IR35 and off-payroll questions, the right place is our sibling site Contractor Tax Accountants, which is scoped to that audience. If you are building a product or technology company with co-founders, employees or plans to raise, we are the right fit.",
      },
    ],
  },
  {
    slug: "funded-startups",
    title: "Funded Startups",
    headline: "Investor-ready accounts and tax compliance for funded UK startups",
    metaTitle: "Accountants for Funded Startups UK",
    metaDescription: "Specialist accountants for VC-backed UK startups. EMI option pools, R&D merged scheme claims, investor reporting and Corporation Tax as your team scales.",
    intro: "Once investment lands, the compliance obligations change. An EMI option pool needs structuring before you hire, an R&D claim is now material enough to manage actively, the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July ERS return deadline</a> applies from the moment the scheme is in place, and your accounts need to meet the expectations of your board and future investors. A generalist accountant who encounters these situations occasionally is a different thing to a specialist who handles them every month.",
    stats: [
      { value: "£250k", label: "EMI option limit per employee (unexercised value over a rolling 3-year window); company-wide limit is £3m total unexercised options" },
      { value: "20%", label: "Merged R&D scheme above-the-line credit for accounting periods from April 2024, taxable and above the line, replacing the old SME and RDEC schemes" },
      { value: "6 July", label: "Annual ERS return deadline: EMI grants and other share scheme events must be reported by 6 July after the tax year end, including nil returns" },
    ],
    challenges: [
      {
        title: "The EMI option pool needs setting up before the first hire",
        body: "An EMI scheme that is not correctly structured, or where grants are not notified to HMRC by the 6 July deadline, can cause options to lose their qualifying status. The <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July annual ERS return deadline</a> applies to every company with options in place, whether or not any grants were made in the year. Late notification is not recoverable.",
      },
      {
        title: "R&D claims are now large enough to warrant active management",
        body: "Once a funded startup has an engineering team, R&D relief claims are typically material. The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme</a> replaced the old SME and RDEC routes from April 2024. Claims require a technical narrative, a financial analysis of qualifying costs, and an <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a> submitted before the CT600. First-time claimants must also notify HMRC within <a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">6 months of the period end</a>.",
      },
      {
        title: "The section 431 clock runs on new hires receiving restricted shares or options",
        body: "Every time a new employee receives restricted securities, a <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> must be made within 14 days of acquisition. Missing it is a common funded-startup trap, particularly when headcount is scaling quickly. Payroll scaling also raises <a href=\"https://www.gov.uk/national-insurance-rates-letters\">employer NIC</a> at 15% above the £5,000 secondary threshold, with the Employment Allowance available once there is more than one employee paid above the threshold.",
      },
      {
        title: "Investor-ready accounts are a different product to standard accounts",
        body: "Accounts that satisfy statutory requirements are not the same as accounts that investors and future lead investors can rely on quickly. The level of detail in the notes, the quality of the management accounts between annual filings, and the reporting cadence your board expects all affect how your next round is perceived. Standard compliance filings are not designed for this purpose.",
      },
    ],
    howWeHelp: [
      {
        title: "EMI scheme setup and annual ERS returns",
        body: "We structure the EMI option pool, coordinate the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC valuation process</a>, prepare grant documentation, notify HMRC of grants by 6 July following the tax year of grant, and file the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return by 6 July</a> each year. We flag any disqualifying events and advise on the BADR interaction at exit for EMI holders.",
      },
      {
        title: "R&D merged scheme claims with AIF submission",
        body: "We prepare the technical narrative, identify qualifying staff costs and subcontractor spend, calculate the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">above-the-line credit</a>, and submit the <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a> before the CT600. For loss-making companies spending at least 30% of total expenditure on R&D, we assess whether the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">ERIS route</a> applies. We do not overclaim.",
      },
      {
        title: "Investor reporting, management accounts and Corporation Tax",
        body: "We produce board-ready management accounts, advise on the burn and runway reporting your investors expect, and handle Corporation Tax planning as profits arrive. The <a href=\"https://www.gov.uk/corporation-tax-rates\">19% small profits rate applies to profits up to £50,000 and the 25% main rate above £250,000</a>, with marginal relief between. Where a funded startup has subsidiaries or associated companies, those thresholds divide accordingly.",
      },
    ],
    faqs: [
      {
        question: "We just raised. What should we set up first?",
        answer: "The most time-critical items are the EMI option pool (set up before the first option grant, with HMRC valuation agreed before or at grant), the <a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">R&D claim notification</a> if this is your first period with qualifying spend, and section 431 elections for any restricted securities already issued. The <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July ERS return</a> deadline applies from the first year the scheme is in place.",
      },
      {
        question: "How big should our EMI option pool be and how do we grant options?",
        answer: "EMI allows up to <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">£250,000 of unexercised option value per employee (over a rolling three-year window) and £3m across the company</a>. The company must have gross assets of no more than £30m and fewer than 250 FTE. Pool size depends on your dilution model and hiring plan. We structure the pool, agree the valuation with HMRC, and prepare the grant documentation.",
      },
      {
        question: "Can we claim R&D while still loss-making?",
        answer: "Yes. The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme's 20% credit</a> is above the line and taxable, so a loss-making company receives it as a reduction in its tax liability or, subject to the rules, a payable credit. If your company is loss-making and your R&D spend is at least 30% of total expenditure, the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">ERIS route</a> may give a more valuable outcome. Speak to us about your specific position.",
      },
      {
        question: "What is the ERS return deadline?",
        answer: "<a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">Annual ERS returns must be filed online by 6 July</a> following the end of the tax year. This applies to every company with share schemes or options in place, including EMI schemes, and includes nil returns where no events occurred in the year. The same 6 July date now also applies to EMI grant notifications.",
      },
      {
        question: "Do the Corporation Tax thresholds change if we have subsidiaries?",
        answer: "Yes. The <a href=\"https://www.gov.uk/corporation-tax-rates\">£50,000 and £250,000 profit thresholds</a> that determine whether the 19% small profits rate, marginal relief or the 25% main rate applies are divided by the number of associated companies, including subsidiaries. A funded startup with two subsidiaries would have effective thresholds of £16,667 and £83,333. Speak to us about your group structure.",
      },
    ],
  },
  {
    slug: "saas-companies",
    title: "SaaS Companies",
    headline: "Accountants for UK SaaS companies: recurring revenue, VAT place of supply and R&D",
    metaTitle: "Accountants for SaaS Companies UK",
    metaDescription: "Specialist accountants for UK SaaS companies. Recurring revenue accounting, VAT place of supply for overseas B2B, R&D on qualifying software development.",
    intro: "SaaS businesses have a specific compliance profile. Subscription revenue creates timing questions that need consistent treatment across periods. VAT <a href=\"https://www.gov.uk/register-for-vat\">place-of-supply rules</a> mean overseas B2B revenue may sit outside the UK VAT threshold calculation. Software development can qualify for R&D relief where it seeks a genuine advance in science or technology, but <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">routine development does not</a>. These are not exotic issues for a specialist in subscription software businesses. They are the routine work.",
    stats: [
      { value: "20%", label: "Merged R&D scheme above-the-line credit for qualifying software development from April 2024, replacing the old SME super-deduction and RDEC routes" },
      { value: "£90k", label: "VAT registration threshold on rolling 12-month taxable turnover; overseas B2B SaaS supplies may not count toward this figure under place-of-supply rules" },
      { value: "86%", label: "ERIS additional deduction for loss-making SMEs where R&D spend is at least 30% of total expenditure, giving a 14.5% payable credit on the enhanced loss" },
    ],
    challenges: [
      {
        title: "Subscription revenue timing in accounts needs consistent treatment",
        body: "SaaS businesses that bill annually or quarterly upfront receive cash before revenue is earned. The revenue is recognised over the subscription term, not when the invoice is raised. The cash received sits as a deferred-revenue liability on the balance sheet until recognised. Inconsistent treatment between periods distorts both the accounts and the Corporation Tax computation.",
      },
      {
        title: "VAT place of supply for overseas B2B SaaS revenue is genuinely complex",
        body: "For B2B SaaS supplied to business customers outside the UK, the place of supply is typically the customer's country, not the UK. This means those supplies may not count toward the <a href=\"https://www.gov.uk/register-for-vat\">£90,000 VAT registration threshold</a> and UK output VAT is not charged. The rules differ for B2C customers and vary by customer location. Applying UK VAT incorrectly to overseas supplies, or registering based on a wrong threshold calculation, both create problems. The specific position for your supply chain should be verified against <a href=\"https://www.gov.uk/register-for-vat\">Notice 741A</a>.",
      },
      {
        title: "Not all software development qualifies for R&D relief",
        body: "The merged R&D scheme requires a project that <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">seeks an advance in science or technology and faces genuine technical uncertainty</a>. Routine development, rebuilds of existing functionality, and work that applies known techniques without genuine uncertainty does not qualify, even if it is technically demanding from a product perspective. The qualification line is real and matters for claim integrity.",
      },
      {
        title: "The merged scheme replaced the old SME and RDEC routes from April 2024",
        body: "Claims for accounting periods beginning on or after 1 April 2024 use the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme</a>. Claims for earlier periods use the previous rules. A company whose period straddles April 2024 has a transitional position. The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">Enhanced R&D Intensive Support</a> scheme applies separately for qualifying loss-making SMEs.",
      },
    ],
    howWeHelp: [
      {
        title: "Recurring revenue accounting and Corporation Tax timing",
        body: "We advise on revenue recognition consistent with the accounting standard applicable to your company, ensure consistent treatment across periods, and align the Corporation Tax computation with the accounting treatment. Deferred revenue on the balance sheet needs to reconcile correctly to the income statement. We flag where timing of recognition affects your CT position materially.",
      },
      {
        title: "VAT place-of-supply analysis for overseas revenue",
        body: "We assess your SaaS supply chain against <a href=\"https://www.gov.uk/register-for-vat\">Notice 741A</a> and determine which supplies fall outside UK VAT scope, which count toward the <a href=\"https://www.gov.uk/register-for-vat\">£90,000 registration threshold</a>, and when registration becomes mandatory. We advise on the correct output VAT treatment for different customer types and locations, and flag where verification per supply is required.",
      },
      {
        title: "R&D qualifying expenditure identification for software products",
        body: "We review your development projects against the <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">advance-in-science-or-technology test</a>, identify eligible staff costs and subcontractor spend, build the technical narrative, and submit the <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a> before the CT600. We do not include routine development to inflate the claim.",
      },
    ],
    faqs: [
      {
        question: "How should a SaaS company recognise subscription revenue?",
        answer: "Subscription revenue is recognised over the period to which it relates, not when the invoice is raised or cash is received. An annual plan billed upfront creates a deferred-revenue liability on the balance sheet, which reduces month by month as the subscription period is delivered. This is a principles-based accounting treatment; the specific standard applicable to your company depends on your size and reporting framework. Speak to us about your position.",
      },
      {
        question: "Do I charge VAT on SaaS subscriptions sold to overseas business customers?",
        answer: "For B2B supplies to business customers outside the UK, the place of supply is generally the customer's country. UK output VAT is typically not charged, and those supplies may not count toward the <a href=\"https://www.gov.uk/register-for-vat\">£90,000 VAT registration threshold</a>. The rules differ for B2C customers and vary by location. The specific position for your customer base should be verified against Notice 741A.",
      },
      {
        question: "Does building our SaaS product qualify for R&D relief?",
        answer: "It depends on what the development involves. The <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">merged scheme requires a project that seeks an advance in science or technology and involves genuine technical uncertainty</a>. Routine development, re-implementing known approaches, and rebuilding existing functionality do not qualify. We assess your specific projects rather than applying a blanket claim.",
      },
      {
        question: "Are you the right fit for a marketing agency that uses SaaS tools?",
        answer: "No. Creative and marketing agency finance belongs to our estate agency site, which is scoped to that audience. This site is for product SaaS companies and subscription software businesses. If you are building a software product, we are the right fit.",
      },
    ],
  },
  {
    slug: "software-development-companies",
    title: "Software Development Companies",
    headline: "Accountants for UK software development companies and IT consultancies",
    metaTitle: "Accountants for Software Development Companies UK",
    metaDescription: "Specialist accountants for UK software development and IT consultancy firms. R&D boundary honesty, project accounting, EMI for tech talent and Corporation Tax.",
    intro: "Software development and IT consultancy firms face a distinctive compliance picture. R&D claims are often available but require genuine qualification analysis. Project accounting for a consultancy model differs from product or subscription accounting. Tech talent expects EMI options, which need correct structuring and timely HMRC notification. And <a href=\"https://www.gov.uk/corporation-tax-rates\">Corporation Tax planning becomes material once the company is profitable</a>. A specialist who works with software businesses understands these as part of the routine engagement.",
    stats: [
      { value: "20%", label: "Merged R&D above-the-line credit on qualifying development expenditure for periods from April 2024" },
      { value: "£250k", label: "EMI option limit per employee (rolling 3-year unexercised value); company-wide limit is £3m total unexercised options, gross assets under £30m" },
      { value: "25%", label: "Corporation Tax main rate on profits above £250,000; 19% small profits rate up to £50,000, with marginal relief between" },
    ],
    challenges: [
      {
        title: "R&D qualification requires more than just writing software",
        body: "The <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">merged R&D scheme requires genuine technical uncertainty and a project that seeks an advance in science or technology</a>. Software firms that build bespoke systems for clients may qualify where the project involves a genuinely novel technical problem. Work that applies well-established techniques to new business requirements does not qualify, even if it is technically demanding from the client's perspective. The honest boundary is the trust moat versus R&D mills.",
      },
      {
        title: "Project accounting for a consultancy model has its own mechanics",
        body: "Revenue on fixed-fee client engagements is recognised as the work is delivered, not when the invoice is raised or cash is received. Work in progress that has not yet been invoiced sits on the balance sheet. Matching costs to engagements correctly, and applying a consistent revenue recognition approach across projects, affects how accounts look to investors and how Corporation Tax is computed. These are principles-based treatments without a single prescribed figure.",
      },
      {
        title: "Tech talent expects equity. EMI is the most tax-efficient route",
        body: "EMI options let qualifying companies offer equity with significant tax advantages to engineers. The <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">company must meet gross assets and headcount tests</a>, the option agreement must be correctly drafted, and the HMRC grant notification must be filed by 6 July following the tax year of grant. Late notification causes options to lose their qualifying EMI status. The <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return by 6 July</a> applies whether or not any grants occurred in the year.",
      },
      {
        title: "Corporation Tax planning becomes material at profitability",
        body: "Once a software firm is generating consistent profit, the interaction between salary, dividends, pension contributions and the <a href=\"https://www.gov.uk/corporation-tax-rates\">Corporation Tax rate</a> matters. The effective marginal rate in the £50,000 to £250,000 band (where marginal relief tapers) is higher than either the small profits rate or the main rate. Optimising around these thresholds requires a model, not a rule of thumb.",
      },
    ],
    howWeHelp: [
      {
        title: "R&D project-level qualification analysis and AIF submission",
        body: "We review each development project against the <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">qualifying criteria</a> for the merged scheme, identify eligible staff and subcontractor costs, and prepare the technical narrative and <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a>. We advise honestly on what qualifies and do not build claims on a broad interpretation that will not survive a HMRC compliance check.",
      },
      {
        title: "EMI scheme setup and ongoing compliance",
        body: "We structure the option pool, coordinate the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC valuation process</a>, prepare grant documentation, file the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return</a> by 6 July, and notify HMRC of grants by the same 6 July deadline. We flag any disqualifying events and advise on the BADR interaction at exit for EMI holders.",
      },
      {
        title: "Project accounting and Corporation Tax planning",
        body: "We advise on revenue recognition and work-in-progress treatment consistent with your reporting framework, ensure consistent application across periods, and align the Corporation Tax computation with the accounting treatment. We model salary, dividend and pension combinations against the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% CT thresholds and marginal relief band</a> as the company scales.",
      },
    ],
    faqs: [
      {
        question: "Does building bespoke software for clients qualify for R&D?",
        answer: "It can, if the project involves genuine technical uncertainty and <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">seeks an advance in science or technology</a>. Work that applies existing techniques to new business requirements, even if technically demanding, does not qualify. Client-funded routine delivery generally does not meet the standard. The distinction lies in whether the uncertainty is technical (how to achieve it is genuinely unknown) or commercial. We assess projects individually rather than applying a blanket claim.",
      },
      {
        question: "Does client-funded custom development count as R&D?",
        answer: "Generally no. Where the client specifies the outcome and the development applies established techniques, the uncertainty is commercial rather than technical and the work does not qualify. Where the project requires solving a genuinely novel technical problem that a competent professional could not derive from existing knowledge, it may qualify regardless of funding structure. The specific facts of the engagement matter; this is general guidance.",
      },
      {
        question: "Can we give our engineers share options?",
        answer: "Yes. EMI options are the principal route. The <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">company must have gross assets of no more than £30m and fewer than 250 FTE</a>. Each employee can hold up to £250,000 of unexercised option value over a rolling three-year window, with a £3m company-wide limit on total unexercised options. Grant notifications must reach HMRC by 6 July following the tax year of grant; missing this deadline loses the qualifying status.",
      },
      {
        question: "Are you the right accountant for a marketing or creative agency?",
        answer: "No. Creative and marketing agency finance belongs to our estate agency site, which is scoped to that audience. This site is for software development companies and IT consultancies. If you are building software products rather than delivering creative or marketing services, we are the right fit.",
      },
      {
        question: "Do the IR35 off-payroll rules apply to my business?",
        answer: "If your company supplies developers under the direction of an end-client, some arrangements may engage the off-payroll rules. The depth of that analysis belongs to our sibling site, Contractor Tax Accountants. We can confirm the boundary and route you correctly.",
      },
    ],
  },
  {
    slug: "fintech-startups",
    title: "Fintech Startups",
    headline: "Accountants for UK fintech startups: tax and compliance within a clear scope boundary",
    metaTitle: "Accountants for Fintech Startups UK",
    metaDescription: "Specialist accountants for UK fintech founders. SEIS and EIS eligibility, EMI schemes, R&D on qualifying engineering, and Corporation Tax. Tax scope only, no investment advice.",
    intro: "Fintech founders are used to accountants either overreaching into regulated-advice territory or shying away from the sector entirely. We cover the tax and compliance stack: <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">SEIS</a> and <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS</a> to raise, <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI</a> to hire, and <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D relief</a> on genuine technical work. Our scope is general tax and compliance guidance. We do not give investment advice, price views or financial promotions, and we do not solicit investment into any scheme. That boundary is not a disclaimer. For a regulated-adjacent founder, it is a trust signal.",
    stats: [
      { value: "£250k", label: "Maximum SEIS raise for eligible companies; gross assets under £350,000, fewer than 25 FTE, within 3 years of starting to trade" },
      { value: "£5m", label: "EIS raise limit per year (£12m lifetime, higher for knowledge-intensive companies); financial services exclusions apply to some activities" },
      { value: "20%", label: "Merged R&D scheme above-the-line credit where fintech development qualifies under the advance-in-science-or-technology test" },
    ],
    challenges: [
      {
        title: "Our scope stops at tax and compliance. No investment advice, no financial promotions",
        body: "We provide general tax-compliance and company-tax guidance. We do not give investment advice, price views or financial promotions, and we do not solicit investment into any scheme. Outputs are general guidance, not personal advice; complex facts are routed to a direct conversation. For a fintech founder operating in a regulated environment, an accountant who stays within its lane is a feature, not a limitation.",
      },
      {
        title: "EIS financial services exclusions need case-by-case analysis",
        body: "EIS has a list of excluded activities, and financial services activities are on it. Whether your fintech's activities fall within the exclusion depends on what the business actually does, whether it holds FCA authorisation, and the structure of the revenue model. The boundary is not always obvious and needs analysis before investor conversations begin. We assess the <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS qualifying conditions</a> against your specific model; we do not give regulatory authorisation advice.",
      },
      {
        title: "R&D in financial technology has a higher qualification bar",
        body: "Developing a payment algorithm, a fraud detection model or a risk engine may or may not qualify for R&D relief. The <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">merged scheme requires a project that seeks a genuine advance in science or technology and faces technical uncertainty</a>. Applying established machine learning techniques to new datasets typically does not meet the standard. Routine financial-product build does not automatically qualify. The honest assessment is the moat.",
      },
      {
        title: "EMI excluded-activities rules need verifying for some fintech models",
        body: "EMI has its own excluded-activities list, which overlaps with but is not identical to the EIS list. Some financial-services activities affect whether <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI qualifying conditions</a> are met. Whether your specific fintech model is affected depends on the nature of the activities and the proportion of the company's work they represent. We verify the position per company; we do not apply a blanket rule.",
      },
    ],
    howWeHelp: [
      {
        title: "SEIS and EIS eligibility assessment for fintech business models",
        body: "We assess your fintech model against the <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">SEIS</a> and <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS qualifying conditions</a>, including the financial services exclusions, and advise on whether the company is eligible to offer relief-qualifying shares. Where <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">advance assurance</a> from HMRC is the right step before approaching investors, we support the application.",
      },
      {
        title: "R&D technical assessment and merged scheme claims",
        body: "We work through the <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">qualifying test</a> for each fintech development project, distinguish genuine technical advances from the application of existing methods, and prepare the <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a> and technical narrative for qualifying projects. A well-scoped claim is more defensible than a broad one.",
      },
      {
        title: "Corporation Tax, VAT and the full compliance stack as you scale",
        body: "We handle Corporation Tax under the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% structure</a> with marginal relief, advise on VAT place of supply for <a href=\"https://www.gov.uk/register-for-vat\">cross-border digital financial services</a> above the £90,000 threshold, and run the payroll and EMI compliance. For the fractional-CFO side of investor reporting and metrics, we bridge to our fractional-cfo service.",
      },
    ],
    faqs: [
      {
        question: "Do you give investment advice or regulated financial advice?",
        answer: "No. We provide general tax-compliance and company-tax guidance only. We do not give investment advice, price views or financial promotions, and we do not solicit investment into any scheme. For FCA authorisation or regulatory permissions, you need a regulatory specialist, not a tax accountant.",
      },
      {
        question: "Can a fintech raise under SEIS or EIS?",
        answer: "It depends on the business model. SEIS requires <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets under £350,000, fewer than 25 FTE and within 3 years of trading</a>. EIS allows up to <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">£5m per year and £12m lifetime</a>. Financial services activities are an excluded category for EIS. Whether your specific model falls within the exclusion depends on the activities and the revenue structure. We assess the position per company.",
      },
      {
        question: "Does my fintech qualify for EMI given the excluded-activities rules?",
        answer: "It depends on what your company actually does. Some financial-services activities affect <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI qualification</a>. The rules are activity-specific and proportion-based, not a blanket exclusion for all fintech. We verify the position for your company before you issue any options. Do not assume qualification without checking the excluded-activities position.",
      },
      {
        question: "Does building our fintech platform qualify for R&D relief?",
        answer: "Sometimes. The <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">merged scheme requires a project that seeks an advance in science or technology and involves genuine technical uncertainty</a>. Applying established techniques, existing algorithms or known methods to financial data typically does not qualify. Novel methods that a competent professional in the field could not derive from existing knowledge may qualify. The assessment is project by project.",
      },
      {
        question: "How does advance assurance work before a fintech raise?",
        answer: "<a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">Advance assurance</a> is HMRC pre-clearance that a proposed share issue is likely to qualify for SEIS or EIS. It is not a guarantee, but it is the strongest signal available to investors before committing funds. For a fintech with potential excluded-activities questions, getting advance assurance before investor conversations begin is particularly valuable.",
      },
    ],
  },
];

export function getStartupsHub(slug: string): StartupsHub | undefined {
  return startupsHubs.find(h => h.slug === slug);
}
