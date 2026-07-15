export interface StartupsService {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const startupsServices: StartupsService[] = [
  {
    slug: "rd-tax-claims",
    title: "R&D Tax Claims",
    headline: "R&D tax relief claims for UK software and technology companies",
    metaTitle: "R&D Tax Relief Claims for Software and Tech Companies",
    metaDescription: "Specialist R&D tax claims for UK software and SaaS companies. Merged scheme credit, ERIS for R&D-intensive loss-makers, claim notification and AIF preparation.",
    intro: "For accounting periods beginning on or after 1 April 2024, there is one <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D expenditure credit at 20%</a>: above the line, taxable, and replacing the previous SME super-deduction and separate RDEC. Loss-making SMEs that spend at least 30% of total expenditure on R&D retain access to the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">Enhanced R&D Intensive Support scheme</a>, with an 86% additional deduction and a 14.5% payable credit. Both routes now require a <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">detailed Additional Information Form</a> before the CT600, and first-time claimants must <a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">notify HMRC within 6 months</a> of the accounting period end. The honesty moat on this page is the eligibility test: <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">qualifying R&D must seek a genuine advance in science or technology</a>. Routine software development, applying existing techniques, and re-implementing known systems do not qualify, and over-claiming invites HMRC compliance checks that can unwind prior years.",
    stats: [
      { value: "20%", label: "Merged scheme above-the-line taxable expenditure credit on qualifying R&D spend, for periods beginning on or after 1 April 2024" },
      { value: "86% + 14.5%", label: "ERIS additional deduction and payable credit for loss-making SMEs spending at least 30% of total expenditure on R&D" },
      { value: "6 months", label: "Claim notification deadline after the accounting period end for first-time claimants or those who have not claimed in the prior three years" },
    ],
    challenges: [
      {
        title: "Missing the claim notification window invalidates the claim for that period",
        body: "For accounting periods starting on or after 1 April 2023, companies claiming R&D relief for the first time, or after a gap of more than three years, must <a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">notify HMRC within 6 months of the end of the accounting period</a>. The notification must be in place before the CT600 claim is filed. Miss the window and the claim is unavailable for that period, regardless of how strong the underlying qualifying activity is.",
      },
      {
        title: "A missing or thin Additional Information Form causes HMRC to remove the claim",
        body: "Every R&D claim must be supported by a <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">detailed Additional Information Form</a> submitted to HMRC before or at the same time as the CT600. The AIF requires a technical narrative explaining the advance sought and the uncertainties resolved for each project, plus a financial breakdown. Claims filed without a valid AIF are removed by HMRC. A brief description is not sufficient.",
      },
      {
        title: "Over-claiming routine development attracts compliance checks",
        body: "<a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">Qualifying R&D must seek an advance in science or technology</a> and resolve scientific or technological uncertainty that a competent professional in the field could not easily resolve. Routine software development, applying known frameworks, integrating existing APIs, and re-implementing established techniques do not qualify. Including them broadens the claim, invites a compliance check, and can unwind legitimate qualifying work in prior years.",
      },
      {
        title: "Getting the route wrong means the wrong credit rate and cash outcome",
        body: "The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme</a> applies to profitable companies and those that are loss-making but below the 30% R&D-intensity threshold. The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">ERIS route</a> applies to qualifying loss-making SMEs with R&D spend of at least 30% of total expenditure, and carries materially different rates (86% additional deduction, 14.5% payable credit). Applying the merged-scheme rate to an ERIS-eligible company under-recovers the benefit.",
      },
    ],
    howWeHelp: [
      {
        title: "Honest eligibility assessment scoped to software and technology projects",
        body: "We review each project against the <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">advance-in-science-or-technology test</a> and include only those that resolve genuine technological uncertainty. We tell you which projects qualify and which do not, including why, so the claim is defensible and the AIF technical narrative reflects what actually happened. We do not claim the maximum; we claim the correct amount.",
      },
      {
        title: "Full compliance path: notification, AIF preparation and CT600 filing",
        body: "We handle the <a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">6-month claim notification</a> for first-time claimants, prepare the <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form</a> technical narrative for each qualifying project, and incorporate the credit into the Corporation Tax computation. Where the company is a small first-time claimant, we can also apply for <a href=\"https://www.gov.uk/guidance/research-and-development-tax-relief-advance-assurance\">R&D advance assurance</a> as a trust-building step, though we do not treat advance assurance as a blanket recommendation.",
      },
      {
        title: "Correct route determination and legitimate credit maximisation",
        body: "We determine whether your company sits on the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme</a> or the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">ERIS route</a>, identify all qualifying cost categories including staff costs, subcontractor costs at the 65% cap, and eligible cloud computing spend, and maximise the legitimate credit. We handle HMRC compliance queries and correspondence where HMRC opens a check. For contractors working inside or outside off-payroll rules, we note the IR35 boundary in one line and defer all contractor-side depth to the sibling <a href=\"https://www.gov.uk/guidance/understanding-off-payroll-working-ir35\">Contractor Tax Accountants site</a>.",
      },
    ],
    faqs: [
      {
        question: "Does my SaaS or software project actually qualify for R&D relief?",
        answer: "It depends on whether the project seeks a genuine advance in science or technology and resolves uncertainty that a competent professional could not easily overcome. <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000\">HMRC's guidance</a> is clear that routine development, re-implementing known techniques, and applying existing frameworks do not qualify. A software project building a novel algorithm, solving a genuinely uncertain technical problem at the infrastructure layer, or advancing the state of the art in a domain can qualify. We assess each project honestly rather than assuming software development automatically qualifies.",
      },
      {
        question: "What is the difference between the merged scheme and ERIS, and which applies to my company?",
        answer: "For accounting periods starting on or after 1 April 2024, the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">merged scheme</a> provides a 20% above-the-line taxable expenditure credit and applies to most companies. The <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises\">Enhanced R&D Intensive Support scheme</a> applies to loss-making SMEs whose qualifying R&D spend is at least 30% of their total expenditure, and provides an 86% additional deduction plus a 14.5% payable credit. Whether your company is ERIS-eligible depends on the R&D-intensity test measured against your total expenditure for the period.",
      },
      {
        question: "What happens if we miss the claim notification deadline?",
        answer: "<a href=\"https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief\">HMRC's notification requirement</a> applies to first-time claimants and those who have not claimed in the prior three years. Miss the 6-month window after the accounting period end and the claim is unavailable for that period. The notification itself is separate from the AIF and the CT600; all three steps must happen in the right order.",
      },
      {
        question: "Do we need the Additional Information Form even for a small claim?",
        answer: "Yes. The <a href=\"https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief\">Additional Information Form is mandatory</a> for all R&D claims regardless of size. It must be submitted before or at the same time as the CT600 R&D claim. Claims filed without a valid AIF are removed by HMRC. The form requires a project-level technical narrative and a qualifying-cost breakdown, which means it requires genuine preparation rather than a brief description.",
      },
    ],
  },
  {
    slug: "seis-eis-advance-assurance",
    title: "SEIS and EIS Advance Assurance",
    headline: "SEIS and EIS advance assurance for UK founders raising a round",
    metaTitle: "SEIS EIS Advance Assurance for UK Startup Founders",
    metaDescription: "SEIS and EIS advance assurance for UK startups. Company eligibility assessment, HMRC pre-clearance application and SEIS1/EIS1 compliance statement management after the round.",
    intro: "This is a tax-compliance service only. We give guidance on qualifying for the schemes and obtaining HMRC pre-clearance. We do not give investment advice, price views, or financial promotions, and we do not solicit investment into any scheme. All outputs are general guidance routed to your specific facts via a conversation with us. <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">Advance assurance</a> is HMRC's confirmation, before shares are issued, that the company appears to meet the qualifying conditions. It is not legally binding but is the standard expectation in early-stage UK fundraising: investors want to see it before committing. Getting the application right, with eligibility conditions clearly satisfied, is the substance of the work. Under <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">SEIS</a>, a company can raise up to £250,000 if gross assets are no more than £350,000, the company has fewer than 25 full-time-equivalent employees, and it is within three years of starting to trade. <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS</a> allows up to £5m per year and £12m over the company's lifetime, with higher limits for knowledge-intensive companies, and different qualifying tests apply. After shares are issued, SEIS1 and EIS1 compliance statements must be prepared and filed correctly before investors can claim their relief.",
    stats: [
      { value: "£250,000", label: "Maximum a company can raise under SEIS: gross assets no more than £350,000, under 25 FTE, within 3 years of starting to trade" },
      { value: "£5m / £12m", label: "EIS per-year and lifetime raise limits; higher for knowledge-intensive companies. A company can raise from both SEIS and EIS across successive rounds" },
      { value: "50% / 30%", label: "Income tax relief available to investors: 50% under SEIS on up to £200,000 per year, 30% under EIS on up to £1m per year (£2m for knowledge-intensive company shares)" },
    ],
    challenges: [
      {
        title: "Not knowing whether the company still qualifies before approaching investors",
        body: "SEIS requires the company to have <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets no more than £350,000, fewer than 25 FTE, and to have started trading within the three years before the share issue</a>. EIS has different thresholds and restricts the use of raised funds to qualifying purposes. A company that has grown its gross assets, taken on staff, or passed the trading-age test may no longer qualify, and applying incorrectly wastes investor confidence.",
      },
      {
        title: "Raising without advance assurance and finding the share issue does not qualify after the fact",
        body: "<a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">Advance assurance</a> is HMRC's pre-clearance that a proposed share issue is likely to qualify. Without it, investors who rely on tax relief may find their relief denied, which damages the company's relationship with those investors and its ability to raise a subsequent round. It is not a guarantee, but obtaining it before the round is the standard approach and allows issues to be resolved before shares are issued.",
      },
      {
        title: "Confusing SEIS and EIS raise limits and over-raising past the SEIS cap",
        body: "SEIS is capped at <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">£250,000 in total</a> for the company. EIS allows <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">up to £5m per year and £12m lifetime</a>. A company raising across multiple instruments and rounds in close succession needs to track headroom carefully. The SEIS limit is not per round; it is total across all SEIS rounds the company has raised. Once the cap is hit, the company moves to EIS for subsequent rounds.",
      },
      {
        title: "Missing or mis-filing the SEIS1 and EIS1 compliance statements blocks investor relief",
        body: "After shares are issued, the company must file SEIS1 and EIS1 compliance statements with HMRC. <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">Advance assurance covers the pre-issue period only.</a> Errors or delays in the post-issue compliance process can cause investors to lose part or all of their income tax relief and the three-year CGT disposal exemption. The company must also notify HMRC of any disqualifying event during the qualifying period after the share issue.",
      },
    ],
    howWeHelp: [
      {
        title: "SEIS and EIS company eligibility check before the round",
        body: "We review the company's structure, trade, gross assets, FTE count, trading-age position, and planned use of funds against the <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">SEIS qualifying conditions</a> and the <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS qualifying conditions</a>. We identify any issues before the application is submitted, confirm available headroom, and advise on how to address anything that needs resolving. An application with known eligibility problems does not get advance assurance.",
      },
      {
        title: "Advance assurance application preparation and HMRC submission",
        body: "We prepare the <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">advance assurance application</a> for HMRC, covering the description of the company's activities, the proposed terms of the share issue, the qualifying trade analysis, and any investor-side context that HMRC expects to see. We manage HMRC correspondence through to confirmation and advise on any conditions HMRC attaches to the assurance.",
      },
      {
        title: "SEIS1 and EIS1 compliance statement management after the share issue",
        body: "After shares are issued, we prepare the SEIS1 and EIS1 compliance statements, handle the HMRC submission, and issue certificates to investors so they can claim their <a href=\"https://www.gov.uk/guidance/seed-enterprise-investment-scheme-background\">50% SEIS income tax relief</a> or <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-tax-relief-for-investors\">30% EIS income tax relief</a>. We check the qualifying conditions at the point of issue and monitor the three-year qualifying period for disqualifying events.",
      },
    ],
    faqs: [
      {
        question: "Do we need advance assurance before we raise?",
        answer: "<a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance\">Advance assurance</a> is not legally required, but it is the standard expectation in early-stage UK fundraising. Most investors in SEIS and EIS rounds want to see it before committing. It is HMRC's pre-clearance that the proposed share issue is likely to qualify. It is not a guarantee, and if the facts change before the issue, HMRC can withdraw it, but obtaining it before the round allows issues to be resolved while there is still time.",
      },
      {
        question: "Does our company qualify for SEIS or EIS?",
        answer: "SEIS requires <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">gross assets no more than £350,000, fewer than 25 FTE, and trading within three years of the share issue</a>. EIS has different thresholds: the company's age and gross assets tests differ, and the rules on use of the raised funds are more detailed. Both schemes require the company to carry on a qualifying trade. The right answer depends on the specific facts: we assess your company against the current tests before any application is submitted.",
      },
      {
        question: "How much can we raise under SEIS versus EIS?",
        answer: "Under <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme\">SEIS</a>, the company can raise up to £250,000 in total across all SEIS rounds. Under <a href=\"https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme\">EIS</a>, the company can raise up to £5m per year and up to £12m over its lifetime across the venture-capital schemes, with higher figures for knowledge-intensive companies. Once the SEIS cap is reached, subsequent rounds can use EIS. The limits count toward the overall lifetime cap.",
      },
      {
        question: "What are SEIS1 and EIS1 and when do we file them?",
        answer: "SEIS1 and EIS1 are compliance statements filed with HMRC after the shares have been issued. They confirm that the qualifying conditions were met at the time of issue. After HMRC processes the statements, it issues certificates to investors who then use them to claim their income tax relief. The timing depends on when the shares are issued and when the qualifying trade has been carried on for the minimum period. We manage this process and alert you to any conditions that must be satisfied before the statements can be filed.",
      },
      {
        question: "What happens if we breach an EIS condition after the share issue?",
        answer: "If the company breaches a qualifying condition within the three-year qualifying period after the EIS shares are issued, investors may lose part or all of their income tax relief and the CGT disposal exemption. The company must notify HMRC of any disqualifying event. We monitor the qualifying conditions during the holding period and flag risks as they arise so that the company has time to take advice before a breach occurs.",
      },
    ],
  },
  {
    slug: "emi-scheme-setup",
    title: "EMI Scheme Setup",
    headline: "EMI option scheme setup and HMRC valuation for UK startups",
    metaTitle: "EMI Scheme Setup and HMRC Valuation for UK Startups",
    metaDescription: "Specialist EMI scheme setup for UK startups. Company eligibility assessment, HMRC Shares and Assets Valuation, grant notification and annual ERS returns by 6 July.",
    intro: "Enterprise Management Incentives are the principal equity incentive tool for UK software and technology companies. Under <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI</a>, qualifying employees can be granted options over up to £250,000 of unrestricted market value per person across a rolling three-year window, with the company holding no more than £3m of unexercised options in total. The qualifying company must have gross assets of no more than £30m, fewer than 250 full-time-equivalent employees, no excluded activities, and must meet the independence test. Option holders must meet a working-time requirement. At exit, <a href=\"https://www.gov.uk/business-asset-disposal-relief\">Business Asset Disposal Relief is available at 18% from 6 April 2026</a> on qualifying EMI share disposals under the two-year rule, without needing the 5% personal-company test that applies to other shares. The scheme has a compliance cadence: the option grant valuation should be agreed with <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC Shares and Assets Valuation</a> before or at grant, each grant must be notified to HMRC, and an <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return must be filed by 6 July</a> after the tax year end, including a nil return where no events occurred.",
    stats: [
      { value: "£250,000 / £3m", label: "EMI unexercised option value: up to £250,000 per employee (rolling 3-year window) and no more than £3m across all employees at any one time" },
      { value: "£30m / 250 FTE", label: "Qualifying company ceilings: gross assets no more than £30m, fewer than 250 full-time equivalent employees, no excluded activities" },
      { value: "6 July", label: "Annual ERS return deadline and EMI grant notification deadline after the tax year end; nil returns are still required" },
    ],
    challenges: [
      {
        title: "Granting options before checking the qualifying-company tests",
        body: "A company that issues EMI options while failing the <a href=\"https://www.gov.uk/hmrc-internal-manuals/employee-tax-advantaged-share-scheme-user-manual/etassum52030\">gross assets test</a>, the FTE ceiling, the excluded-activities test, or the independence test issues non-qualifying options. Those holders then face income tax on the difference between market value and exercise price at exercise, rather than CGT at exit. The qualifying tests must be checked before any grant, not after.",
      },
      {
        title: "Setting an option price without agreeing the valuation with HMRC",
        body: "The exercise price of EMI options should be agreed with <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC Shares and Assets Valuation</a> before or at grant. The agreed valuation fixes the amount of unrestricted market value used against the employee's £250,000 rolling limit and underpins the income tax position at exercise. Options granted without an agreed valuation carry uncertainty about whether the price meets the market-value requirement and whether the employee's limit has been correctly measured. Note: the VAL231 form URL previously cited now returns a 404 and should not be relied on; the process is currently routed through the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI guidance pages</a> and the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">ERS manual</a>.",
      },
      {
        title: "Missing the grant notification or ERS return deadline",
        body: "Each EMI option grant must be notified to HMRC by the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July deadline</a> following the tax year in which the grant was made. An annual ERS return, including a nil return where no events occurred, must also be filed by 6 July. Missing either deadline is the most commonly encountered compliance failure in EMI schemes. Automatic penalties apply for late ERS returns.",
      },
      {
        title: "Founders acquiring restricted securities without the 14-day section 431 election",
        body: "Where founders or key employees acquire shares with restrictions (pre-emption rights, drag-along clauses, or other common startup provisions), those shares are restricted securities. A <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> must be made within 14 days of acquisition to be taxed on the unrestricted market value up front. Missing the 14-day window means income tax can arise later if restrictions are lifted, which is a well-documented funded-startup trap.",
      },
    ],
    howWeHelp: [
      {
        title: "Company and employee eligibility assessment and scheme documentation",
        body: "We verify the company meets the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI qualifying tests</a> (gross assets, FTE, excluded activities, independence) and that each proposed option holder meets the working-time requirement. We design the scheme within the £250,000 per-employee and £3m per-company limits and prepare option agreements in a form that reflects the correct terms and conditions.",
      },
      {
        title: "HMRC valuation agreement through Shares and Assets Valuation",
        body: "We prepare the valuation submission to <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC Shares and Assets Valuation</a>, work through the process with HMRC to obtain a confirmed unrestricted market value, and document the agreed valuation basis. We use the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">ERS manual guidance</a> for the process and do not publish or rely on the defunct VAL231 URL.",
      },
      {
        title: "Grant notification, ERS returns and section 431 election management",
        body: "We register the scheme with HMRC, notify each grant by the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July deadline</a>, and file annual ERS returns including nil returns. We maintain a grants register and monitor conditions affecting qualifying status throughout the life of the scheme. Where founders acquire restricted securities at a funding round, we identify the requirement and prepare the <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 election</a> within the 14-day window.",
      },
    ],
    faqs: [
      {
        question: "Does my company qualify to grant EMI options?",
        answer: "The company must have <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">gross assets of no more than £30m</a>, fewer than 250 full-time-equivalent employees, and must not carry on excluded activities. It must also meet the independence test. Employees must spend at least 25 hours per week, or 75% of their working time, working for the company. We verify all of these before any grant is made.",
      },
      {
        question: "How is the EMI option value agreed with HMRC?",
        answer: "The grant valuation should be agreed with <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">HMRC Shares and Assets Valuation</a> before or at the date of grant. This confirms the unrestricted market value that is used to measure the employee's £250,000 rolling limit and to determine the income tax position at exercise. The standalone VAL231 form URL that was previously used to submit valuations returns a 404; the current process routes through HMRC's EMI guidance and the ERS platform. We manage the submission through the current live route.",
      },
      {
        question: "When do we have to notify an EMI grant?",
        answer: "EMI grant notification and the annual ERS return both run to the same <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July deadline</a> after the tax year end. A grant made in May 2026 (2025/26 tax year) must be notified by 6 July 2026. A grant made in June 2026 (2026/27 tax year) must be notified by 6 July 2027. If no grants, exercises, or other events occurred in a tax year, a nil ERS return is still required by 6 July. Automatic penalties apply for late returns.",
      },
      {
        question: "What is a section 431 election and when do we need it?",
        answer: "A <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 election</a> is a joint election between employer and employee to treat restricted securities as unrestricted for income tax purposes. Most startup shares carry restrictions (pre-emption rights, drag-along provisions) that make them restricted securities. Without the election, income tax can arise if the restrictions are later lifted. The election must be made within 14 days of the acquisition. Missing the window is one of the most common and most costly funded-startup tax errors.",
      },
      {
        question: "Do I need to file an ERS return if no grants were made in the year?",
        answer: "Yes. If your company has a registered EMI scheme, an <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return must be filed online by 6 July</a> following the end of the tax year, even if no grants, exercises, lapses, or other events occurred. A nil return is still required. Failure to file on time results in automatic penalties.",
      },
    ],
  },
  {
    slug: "share-schemes",
    title: "Share Schemes",
    headline: "Share scheme advice when EMI does not fit: CSOP, growth shares and unapproved options",
    metaTitle: "Share Schemes UK: CSOP, Growth Shares and Unapproved Options",
    metaDescription: "Share scheme advice for UK startups when EMI limits or qualifying tests are breached. CSOP, growth shares, unapproved options, section 431 elections and ERS compliance.",
    intro: "Not every company qualifies for <a href=\"/services/emi-scheme-setup\">EMI</a>, and not every equity award takes option form. When a company exceeds the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">£30m gross assets or 250-FTE limits</a>, or carries on excluded activities, or an employee breaches the working-time requirement, the EMI route closes. The alternatives each carry different tax treatment and different design constraints. <a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP</a> is the tax-advantaged fallback at up to £60,000 of options per employee: no qualifying-company conditions as strict as EMI, but a lower per-person ceiling. Growth shares and unapproved options fall under <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">general employment-related-securities rules</a>: income tax, and NIC where relevant, on the value acquired above any amount paid. Choosing the right structure depends on the company's stage, the target exit valuation, and the tax consequences for the participants. All of these structures also carry <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS return obligations</a> by 6 July.",
    stats: [
      { value: "£60,000", label: "CSOP options per employee: the tax-advantaged fallback once EMI limits or qualifying tests are breached, with no qualifying-company conditions as strict as EMI" },
      { value: "£250,000 / £3m", label: "EMI per-employee and per-company limits whose breach pushes a company toward CSOP, growth shares or unapproved options" },
      { value: "14 days", label: "Section 431 joint-election window: both employer and employee must sign within 14 days of acquiring restricted securities or income tax risk accumulates" },
    ],
    challenges: [
      {
        title: "Assuming EMI is available when the company has already breached a limit or test",
        body: "Companies that have raised significant funding, grown their team, or moved into adjacent activities may have crossed the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI qualifying thresholds</a> without realising it. A company with gross assets above £30m or more than 250 FTE cannot grant qualifying EMI options. Granting options under the assumption of EMI eligibility when the tests have been breached results in non-qualifying grants, with income tax on exercise rather than CGT at exit.",
      },
      {
        title: "Not knowing that CSOP is the tax-advantaged fallback once EMI is off the table",
        body: "<a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP allows up to £60,000 of options per employee</a> and does not have qualifying-company conditions as restrictive as EMI. It is the standard fallback for companies that have outgrown EMI. CSOP options are granted at market value and, if held for three years, are exercised free of income tax and NIC, with CGT on the disposal. Many scale-ups move from EMI to CSOP without a structured transition.",
      },
      {
        title: "Using growth shares or unapproved options without understanding the ERS tax treatment",
        body: "Growth shares and unapproved options fall under <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">general employment-related-securities rules</a>: income tax, and NIC where relevant, arises on the value acquired above any amount paid. There is no special CGT rate at exercise as there is for EMI. Growth shares set a participation threshold at grant so that value above the threshold is CGT at exit rather than income at grant, but the threshold must be correctly set. Unapproved options create an income tax charge on exercise on the spread between market value and exercise price.",
      },
      {
        title: "Founders acquiring restricted securities without the section 431 election",
        body: "Most startup shares carry restrictions: pre-emption rights, drag-along provisions, vesting schedules. These make shares restricted securities under the ERS rules. A <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> must be made within 14 days of acquiring the shares to be taxed on the unrestricted market value up front and avoid income tax later if restrictions are lifted. Missing this window is one of the most common and most costly errors in funded-startup equity award practice.",
      },
    ],
    howWeHelp: [
      {
        title: "Eligibility diagnosis and alternative structure selection",
        body: "We assess why EMI does not fit (which limit or test is breached) and identify the right alternative: <a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP</a> as the £60,000 tax-advantaged fallback, growth shares designed with the right participation threshold, or unapproved options where no qualifying-company conditions apply. We model the tax consequences of each structure for the participants at realistic exit valuations so the comparison is on substance, not just on the structure name.",
      },
      {
        title: "CSOP and growth-share setup and documentation",
        body: "We set up a <a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP</a> where it is the right fallback, coordinate the valuation with HMRC Shares and Assets Valuation where appropriate, and prepare the option agreement. For growth shares, we advise on the participation threshold, coordinate the valuation, and prepare the documentation for the new share class. We flag the income tax risk if a growth-share threshold is set too low against current market value.",
      },
      {
        title: "Section 431 elections and ERS return management across all scheme types",
        body: "We identify all restricted-securities awards requiring a <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 election</a> and prepare and file the election within the 14-day window. We register all scheme types with HMRC and file <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">annual ERS returns by 6 July</a> for every arrangement, including nil returns where no events occurred.",
      },
    ],
    faqs: [
      {
        question: "What do we use if we cannot grant EMI options?",
        answer: "The right alternative depends on why EMI is unavailable. If the company has crossed the gross-assets or FTE limits, <a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP at £60,000 per employee</a> is the standard tax-advantaged fallback. If the company carries on excluded activities or the employee cannot meet the working-time test, growth shares or unapproved options may be more appropriate. Each has different tax treatment and we assess the right structure against the company's specific facts.",
      },
      {
        question: "How much can each employee get under a CSOP?",
        answer: "<a href=\"https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan\">CSOP allows up to £60,000 of options per employee</a>, measured at the market value at the date of grant. CSOP options granted at market value and held for three years can be exercised free of income tax and NIC. The gain from exercise to disposal is subject to CGT. The £60,000 limit is per employee and is not reduced by any EMI options previously held.",
      },
      {
        question: "How are growth shares and unapproved options taxed?",
        answer: "Both fall under <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">general employment-related-securities rules</a>. For unapproved options, income tax and NIC arise at exercise on the difference between the market value at exercise and the exercise price. For growth shares, the value at grant should be low because the shares only participate in growth above the threshold; any value at grant is an employment income receipt. Gains above the threshold from grant to exit are CGT. There is no special CGT rate comparable to EMI's BADR treatment.",
      },
      {
        question: "When do we need a section 431 election?",
        answer: "Whenever founders or employees acquire shares that are restricted securities, which in practice means most startup shares (pre-emption rights, drag-along, vesting). A <a href=\"https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450\">section 431 joint election</a> must be made within 14 days of acquisition. Without it, income tax can arise later if restrictions are lifted or shares are forfeited and reissued at different values. With the election, tax is charged on the full unrestricted market value at grant but no further income tax arises on subsequent value changes.",
      },
    ],
  },
  {
    slug: "fractional-cfo",
    title: "Fractional CFO",
    headline: "Fractional CFO and management accounts for VC-backed startups",
    metaTitle: "Fractional CFO for VC-Backed and Scaling UK Startups",
    metaDescription: "Fractional CFO for VC-backed UK startups. Monthly board packs, burn and runway modelling, SaaS metrics, investor reporting and fundraise financial support.",
    intro: "Early-stage funded companies need CFO-level financial oversight before they can justify a full-time finance hire. A fractional CFO is not a bookkeeper and not just a statutory accountant: the deliverable is board-ready financial reporting, burn and runway modelling built on real cost assumptions, investor-facing financial narrative, and the SaaS metric tracking (MRR, ARR, gross margin, cohort retention) that a board and lead investor expect to see monthly. The work is distinct from generic SME management accounts, and the audience is distinct: VC-backed and scaling, not a high-street business. For a funded startup, the finance function must also connect to the tax-relief work: the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">20% R&D expenditure credit</a> belongs in the cash-flow and runway model, the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">£250,000 per-employee and £3m company EMI headroom</a> is a headcount-planning input, and <a href=\"https://www.gov.uk/register-for-vat\">VAT registration at £90,000 rolling turnover</a> is a milestone the ARR curve will hit. We join those dots in one finance function rather than treating them as separate engagements.",
    stats: [
      { value: "20%", label: "Merged-scheme R&D expenditure credit modelled into cash-flow and runway planning alongside the operating burn rate" },
      { value: "£250,000 / £3m", label: "EMI option headroom per employee and per company tracked in headcount and option-pool planning as the team scales" },
      { value: "£90,000", label: "VAT registration turnover threshold watched as ARR scales; the point at which the compliance burden and pricing model change" },
    ],
    challenges: [
      {
        title: "No board-ready reporting: founders walking into meetings without a clean pack",
        body: "Monthly management accounts for investor consumption are a different product from annual statutory accounts. They need consistent KPI tracking, a clear narrative on variance against plan, a rolling cash runway view, and the level of detail that allows a non-executive director to ask an informed question. Producing this every month requires a financial process that most early-stage companies do not have in place, and founders running the business as well as managing the board are not well-placed to build it alone.",
      },
      {
        title: "Not knowing true burn and runway, so a raise is left too late",
        body: "Runway calculations based on average monthly burn are less useful than models built on the actual cost structure, the timing of planned hires, and realistic revenue projections. The difference between a 12-month and an 18-month runway matters enormously when planning the timing of a fundraise. A company that discovers its actual runway is shorter than expected has already lost optionality in the process. Scenario modelling that includes a conservative case and a downside, not just a central plan, is what a board and lead investor expect.",
      },
      {
        title: "R&D, EMI and SEIS/EIS decisions made without the finance model",
        body: "The cash timing of an <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D credit</a> affects runway materially for a loss-making company. The <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI pool size and option-grant timing</a> affect headcount capacity. The SEIS/EIS fundraise readiness check affects the timing of the next raise. Making those decisions without the finance model means cash timing surprises and option pool errors that are expensive to fix after the fact.",
      },
      {
        title: "Scaling ARR past the VAT registration point without planning",
        body: "VAT registration is mandatory once rolling 12-month UK taxable turnover reaches <a href=\"https://www.gov.uk/register-for-vat\">£90,000</a>. For a SaaS company, the point at which the threshold is crossed is often in the ARR curve and may arrive faster than expected. The registration requirement changes the pricing model (VAT on B2C sales), the invoicing system, and the returns obligation. Planning for it 3 to 6 months ahead rather than discovering it retrospectively keeps it manageable.",
      },
    ],
    howWeHelp: [
      {
        title: "Monthly board pack, management accounts and investor reporting",
        body: "We prepare monthly management accounts with the KPIs and narrative relevant to your investor base: MRR and ARR movement, gross margin, headcount and burn by department, cash runway, and variance against plan. The board pack financial sections are prepared to the standard a lead investor expects. We work with your bookkeeper or finance administrator to ensure the underlying data is clean and the numbers are consistent month on month.",
      },
      {
        title: "Burn, runway and SaaS-metric modelling",
        body: "We build a financial model on your actual cost structure and revenue assumptions, run scenario analysis including conservative and downside cases, and maintain it as the business evolves. The model tracks MRR and ARR, gross margin, cohort retention, and the cash impact of planned hires and one-off spend. It also incorporates the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D credit cash timing</a> and the <a href=\"https://www.gov.uk/register-for-vat\">VAT registration milestone</a> so the runway view is complete.",
      },
      {
        title: "Joining the tax work to the finance function",
        body: "We fold the specialist tax work into the financial model rather than treating it as a separate engagement. The <a href=\"/services/rd-tax-claims\">R&D claim</a> cash impact lands in the runway model. The <a href=\"/services/emi-scheme-setup\">EMI pool</a> feeds headcount planning. The <a href=\"/services/seis-eis-advance-assurance\">SEIS/EIS raise readiness</a> check connects to the fundraise calendar. For founder extraction, the <a href=\"/calculators/founder-dividend-vs-salary-calculator\">dividend versus salary split</a> is modelled against the company's profit position and the 2026/27 rates. One finance function covers all of these rather than multiple disconnected advisers.",
      },
    ],
    faqs: [
      {
        question: "What does a fractional CFO do that our bookkeeper does not?",
        answer: "A bookkeeper records transactions and keeps the ledger clean. A fractional CFO uses the underlying data to produce board-ready reporting, run scenario analysis on burn and runway, support investor conversations, and connect the finance picture to the operational and fundraising decisions the founder is making. The two roles are complementary: we typically work alongside a bookkeeper or finance administrator rather than replacing them.",
      },
      {
        question: "What is in a monthly board pack?",
        answer: "A typical board pack for a VC-backed startup includes monthly and cumulative revenue (MRR and ARR where relevant), gross margin, operating expenses by department, net cash burn, cash balance and runway projection, headcount, key operational KPIs, and a variance commentary against the board-approved plan. It is not a set of statutory accounts: it is a live management view designed for a board that includes investors who want to track performance against what was promised at the last fundraise.",
      },
      {
        question: "How do you work out burn and runway?",
        answer: "Burn is the monthly net cash outflow: operating expenses less any revenue received in cash in the month. Runway is the number of months of cash remaining at the current or projected burn rate. A useful runway model separates fixed and variable costs, includes the timing of planned hires and one-off spend, models a range of revenue scenarios, and incorporates known cash inflows such as an <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D credit</a>. The central-case figure is less useful than understanding the range.",
      },
      {
        question: "Can you also handle our R&D claim and EMI scheme?",
        answer: "Yes. We run the <a href=\"/services/rd-tax-claims\">R&D claim</a>, set up and maintain the <a href=\"/services/emi-scheme-setup\">EMI scheme</a>, handle <a href=\"/services/seis-eis-advance-assurance\">SEIS and EIS advance assurance</a>, and manage the <a href=\"/services/core-compliance\">core compliance stack</a> in one engagement. The advantage of covering all of this together is that the <a href=\"https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies\">R&D credit</a> timing lands correctly in the model, the <a href=\"https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis\">EMI pool and headroom</a> are tracked alongside headcount, and nothing falls through the gap between advisers.",
      },
    ],
  },
  {
    slug: "core-compliance",
    title: "Core Compliance",
    headline: "Corporation tax, accounts and compliance for UK startups",
    metaTitle: "Startup Accounts and Corporation Tax for UK Founders",
    metaDescription: "Corporation tax returns, statutory accounts, payroll and VAT compliance for UK startups. Pre-profit loss banking, founder extraction, EMI payroll and VAT timing for scaling ARR.",
    intro: "Statutory compliance is the foundation that the R&D, SEIS/EIS and EMI work rests on. For a startup, it is also not generic: the first accounts after a raise, pre-profit losses that need banking before they can be used, founder extraction in a company with little or no profit, payroll scaling alongside an EMI pool, and VAT registration as ARR hits <a href=\"https://www.gov.uk/register-for-vat\">£90,000</a> all have startup-specific dimensions that generic compliance practice misses. <a href=\"https://www.gov.uk/corporation-tax-rates\">Corporation tax</a> is 19% on profits up to £50,000 and 25% on profits of £250,000 or more, with marginal relief between, and the thresholds divide by the number of associated companies. For pre-profit companies, <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">trading losses carry forward</a> and must be captured in a filed return to be banked. <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">Pre-trading expenditure</a> incurred within seven years before trade starts is allowable. For founder extraction, <a href=\"https://www.gov.uk/tax-on-dividends\">dividend rates in 2026/27 are 10.75%, 35.75% and 39.35%</a> with a £500 allowance. Employer NIC is <a href=\"https://www.gov.uk/national-insurance-rates-letters\">15% above a £5,000 secondary threshold</a>; the Employment Allowance is up to £10,500, but a solo-director company whose only employee paid above the threshold is a director is not eligible. Generic corporation tax mechanics, dividend-vs-salary calculators, and VAT explainers are linked to the generalist site rather than repeated here.",
    stats: [
      { value: "19% / 25%", label: "Corporation tax: small profits rate 19% up to £50,000; main rate 25% at £250,000 and above; marginal relief between; limits divide by associated companies" },
      { value: "£90,000", label: "VAT registration threshold: mandatory once rolling 12-month UK taxable turnover reaches £90,000; for SaaS, overseas B2B place-of-supply rules may affect what counts" },
      { value: "£10,500", label: "Employment Allowance ceiling, but a company whose only employee paid above the secondary threshold is a director cannot claim it" },
    ],
    challenges: [
      {
        title: "First post-raise accounts without startup-aware compliance",
        body: "The first accounts after a fundraise involve decisions a generic practice may not flag: the correct treatment of the raise in the balance sheet, the associated-company limit division if the founder group has more than one entity (reducing the <a href=\"https://www.gov.uk/corporation-tax-rates\">£50,000 and £250,000 thresholds</a> proportionally), and the banking of early-year losses in a filed <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">Corporation Tax return</a> so they carry forward against future profits.",
      },
      {
        title: "Solo-director company assuming it can claim the Employment Allowance",
        body: "The <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500</a> is not available to a company whose only employee paid above the <a href=\"https://www.gov.uk/national-insurance-rates-letters\">£5,000 secondary threshold</a> is a director. Many solo-founder companies fall into this exclusion. The employer NIC at 15% on the director's salary above £5,000 is a real cost that cannot be offset by the Employment Allowance, which changes the optimal founder salary calculation.",
      },
      {
        title: "Payroll scaling without connecting it to the EMI pool and ERS deadlines",
        body: "As the team grows, payroll and the <a href=\"/services/emi-scheme-setup\">EMI option pool</a> interact: ERS annual returns covering both payroll-settled equity events and EMI grants must be filed by <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July</a>. Running payroll without awareness of the ERS return obligation, or without tracking whether new hires are being brought in under EMI grants that need notification, creates compliance gaps that accumulate silently.",
      },
      {
        title: "Scaling ARR past the VAT threshold without a plan",
        body: "VAT registration is mandatory once rolling 12-month UK taxable turnover reaches <a href=\"https://www.gov.uk/register-for-vat\">£90,000</a>. For SaaS companies, the <a href=\"/blog/saas-and-tech-finance/vat-for-saas-place-of-supply\">B2B reverse charge and place-of-supply rules</a> mean overseas revenue may not count toward the threshold; the position depends on the specific supplies and should be verified against HMRC's Notice 741A. Missing the registration point and failing to charge VAT retrospectively is a material liability.",
      },
    ],
    howWeHelp: [
      {
        title: "First and ongoing accounts and CT returns with startup-lifecycle awareness",
        body: "We prepare annual statutory accounts to FRS 102 or FRS 105, compute the <a href=\"https://www.gov.uk/corporation-tax-rates\">Corporation Tax liability</a> with all available reliefs, and file the CT600. For pre-profit companies, we bank <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">trading losses</a> in the filed return and identify any <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">pre-trading expenditure</a> allowable under the seven-year window. We apply the associated-company threshold division correctly where the founder group has multiple entities.",
      },
      {
        title: "Founder extraction and payroll done correctly for the startup stage",
        body: "We run payroll and advise on founder extraction scoped to a pre-revenue or low-profit company: employer NIC at <a href=\"https://www.gov.uk/national-insurance-rates-letters\">15% above the £5,000 secondary threshold</a>, the Employment Allowance solo-director exclusion, and <a href=\"https://www.gov.uk/tax-on-dividends\">2026/27 dividend rates</a> of 10.75%, 35.75% and 39.35% with a £500 allowance. Scottish income tax has different bands, which affects the optimal founder salary split for Scottish-resident founders. We connect payroll to the <a href=\"/services/emi-scheme-setup\">EMI pool</a> and flag the <a href=\"https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return\">6 July ERS return</a> obligation alongside the payroll calendar. For a generic dividend-vs-salary comparison, we route to the <a href=\"/calculators/founder-dividend-vs-salary-calculator\">founder calculator</a>.",
      },
      {
        title: "VAT registration timing and SaaS place-of-supply management",
        body: "We monitor the <a href=\"https://www.gov.uk/register-for-vat\">£90,000 registration threshold</a> as ARR scales and plan the registration timing. For SaaS supplies, we assess the B2B reverse-charge and <a href=\"/blog/saas-and-tech-finance/vat-for-saas-place-of-supply\">place-of-supply position</a> against the specific supplies, verifying against Notice 741A before advising on whether overseas B2B revenue counts toward the threshold. IR35 and off-payroll working is a boundary note for this site: for contractor-side depth, the <a href=\"https://www.gov.uk/guidance/understanding-off-payroll-working-ir35\">Contractor Tax Accountants sibling site</a> covers it in full.",
      },
    ],
    faqs: [
      {
        question: "Do we still file a corporation tax return if the company is pre-profit?",
        answer: "Yes. A Corporation Tax return must be filed even where the company has made a loss. Filing the return is how <a href=\"https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss\">trading losses are put on record with HMRC</a> so they can be carried forward against future profits. A company that does not file a loss-year return risks losing or creating uncertainty about the available loss pool, which matters materially once the company becomes profitable.",
      },
      {
        question: "Can our solo-director company claim the Employment Allowance?",
        answer: "No, if the only employee paid above the <a href=\"https://www.gov.uk/national-insurance-rates-letters\">£5,000 secondary threshold</a> is a director. The <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance</a> is excluded for companies in that position. This changes the optimal founder salary calculation: employer NIC at 15% on any salary above £5,000 is a real cost with no allowance to offset it. The calculation for a solo-director company therefore differs from the generic salary-vs-dividend comparison.",
      },
      {
        question: "When does our startup have to register for VAT?",
        answer: "VAT registration is mandatory once rolling 12-month UK taxable turnover reaches <a href=\"https://www.gov.uk/register-for-vat\">£90,000</a>, or when there is a 30-day forward expectation that it will. For SaaS companies, overseas B2B supplies may not count toward the threshold under the B2B reverse-charge and <a href=\"/blog/saas-and-tech-finance/vat-for-saas-place-of-supply\">place-of-supply rules</a>. The position depends on the specific supplies and should be verified against Notice 741A, not assumed. Missing the registration point and failing to account for VAT retrospectively is a material liability.",
      },
      {
        question: "Can we claim costs incurred before we started trading?",
        answer: "Yes, if they were incurred within seven years before the trade started and would have been allowable had the trade already begun. <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351\">HMRC's guidance</a> treats pre-trading expenditure as incurred on the first day of trading in those circumstances. This covers costs that many pre-incorporation or pre-revenue founders assume are lost: development costs, software subscriptions, professional fees, and similar expenditure within the seven-year window.",
      },
    ],
  },
];

export function getStartupsService(slug: string): StartupsService | undefined {
  return startupsServices.find(s => s.slug === slug);
}
