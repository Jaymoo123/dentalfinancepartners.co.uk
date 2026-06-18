import { TradeType } from "../../../construction-cis/web/src/data/trade-types";

export const businessTradeTypes: TradeType[] = [
  {
    slug: "main-contractors",
    segment: "business",
    title: "Main contractors",
    headline: "CIS compliance and contractor accounting for main contractors",
    metaTitle: "Accountants for Main Contractors | CIS Compliance Specialists",
    metaDescription:
      "CIS compliance accounting for main contractors. Monthly CIS300 returns, subcontractor verification at volume, April 2026 due-diligence rules and deduction statement management.",
    intro:
      "Main contractors sit at the centre of every CIS supply chain. You verify subcontractors before the first payment, file CIS300 returns by the 19th every month, issue deduction statements within 14 days and, since 6 April 2026, carry a materially tougher exposure if anything in your supply chain goes wrong. The obligations scale with the number of subcontractors you engage: a contractor paying 20 subbies across three sites in a month has 20 verification records, 20 deduction statements and one CIS300 to file, all on the same deadline. Getting any element wrong creates penalties that compound. We manage the full contractor-side compliance cycle so your directors can focus on building.",
    stats: [
      { value: "19th", label: "Monthly CIS300 filing deadline" },
      { value: "14 days", label: "Deadline to issue each deduction statement" },
      { value: "5 years", label: "GPS reapplication ban on fraud-linked revocation (April 2026)" },
    ],
    challenges: [
      {
        title: "Subcontractor verification at volume",
        body:
          "Every subcontractor must be verified with HMRC before the first payment. HMRC's response sets the deduction rate: 0% (GPS), 20% (registered) or 30% (unregistered). At volume, managing verifications across a rotating pool of subbies, tracking when re-verification is needed and keeping the records that demonstrate you did it is a significant administration burden. Since 6 April 2026, re-verification before each payment is also one of the three core due-diligence steps that protect your business against GPS revocation under Finance Act 2026 (FA 2004 ss.62A/62B).",
      },
      {
        title: "CIS300 monthly cycle and nil returns",
        body:
          "CIS300 returns are due by the 19th of the month following each tax month. From 6 April 2026, nil returns are mandatory in any month where no subcontractor payments are made (the nil-return obligation was removed in 2015 and reinstated this year). Late filing penalties start at £100 on day one and escalate to £300 or 5% of the CIS liability at 6 months, and £300 or 100% of the liability at 12 months. Stop-start project schedules mean many contractors have nil-return obligations they are not aware of.",
      },
      {
        title: "The April 2026 'knew or should have known' standard",
        body:
          "Finance Act 2026 (Royal Assent 18 March 2026) introduced immediate GPS revocation where a contractor knew or should have known of fraudulent connections in the supply chain. The 'should have known' standard is critical: HMRC does not have to prove intent. A failure to carry out pre-payment due diligence (CIS re-verification, Companies House legitimacy check, bank account name verification) is itself enough for revocation and a 5-year reapplication ban. For contractors earning £500,000 a year, losing GPS means roughly £100,000 a year in deductions instead of gross payments.",
      },
      {
        title: "Knowledge-based penalty under FA 2004 ss.62A/62B",
        body:
          "Where a contractor makes a payment knowing (or having reason to know) that a connected party has deliberately failed to comply with CIS obligations, FA 2004 s.62A (inserted by FA 2026) creates a penalty of 20% of the payment. The same 20%-of-sums liability applies to returns made in that knowledge under s.62A/62B. Where deliberate behaviour by a company produces penalties, HMRC can also pursue company officers personally under existing officer-liability rules. Documented pre-payment due diligence is the primary defence.",
      },
    ],
    howWeHelp: [
      {
        title: "Monthly CIS300 return service",
        body:
          "We prepare and file your CIS300 monthly return by the 19th, covering all subcontractor payments made in the preceding tax month. We handle nil returns in inactive months so the mandatory-from-April-2026 obligation is met without your involvement. Payment summaries to HMRC are co-ordinated with your payroll cycle.",
      },
      {
        title: "Subcontractor verification and due-diligence records",
        body:
          "We run HMRC verification for each subcontractor before their first payment, record the result and the deduction rate applied, and maintain the supporting Companies House and bank-name-verification evidence that protects you against the 'should have known' standard. We flag any subcontractor whose GPS or registered status changes between payments.",
      },
      {
        title: "Deduction statement issuance",
        body:
          "Every subcontractor who has a CIS deduction taken is legally entitled to a written deduction statement within 14 days of each payment. We produce and issue compliant statements on your behalf, maintaining the archive that satisfies both your legal obligation and HMRC's audit trail requirements.",
      },
    ],
    faqs: [
      {
        question: "We had no subcontractor payments this month. Do we still need to file a CIS300?",
        answer:
          "Yes, from 6 April 2026 nil returns are mandatory. If you make no subcontractor payments in a tax month, you must either file a CIS300 nil return by the 19th of the following month or pre-notify HMRC of inactivity. The penalty for a late nil return starts at £100 on day one and escalates from there. This obligation was removed in 2015 and reinstated this April, so many contractors are not yet aware of it.",
      },
      {
        question: "What does the April 2026 'should have known' rule actually require us to do?",
        answer:
          "To meet the due-diligence standard introduced by Finance Act 2026, you need three things on file before each subcontractor payment: a current HMRC CIS verification result, a Companies House legitimacy check confirming the subcontractor entity is active and matches what you have been told, and a bank account name verification confirming the account name matches the registered entity. If you cannot show these steps were taken, HMRC can revoke GPS on the basis that you should have known of fraudulent supply-chain connections, even without proving you had actual knowledge.",
      },
      {
        question: "How do deduction statements differ from the CIS300 return?",
        answer:
          "The CIS300 is a monthly return filed with HMRC listing all subcontractor payments and the deductions made. A deduction statement is a separate document issued directly to each subcontractor, setting out the gross payment, the amount liable to deduction, the cost of materials excluded and the net payment made. Both are required. The deduction statement must be issued within 14 days of the relevant payment; there is no grace period.",
      },
    ],
    testimonial: {
      quote:
        "We were filing the monthly returns ourselves but the April 2026 due-diligence rules made us realise we needed a proper system. Having the verification records, Companies House checks and bank confirmations all documented before every payment is something we could not have built quickly in-house.",
      attribution: "Director, regional main contractor, Yorkshire",
    },
  },

  {
    slug: "subcontracting-limited-companies",
    segment: "business",
    title: "Subcontracting limited companies",
    headline: "CIS and company accounting for subcontracting limited companies",
    metaTitle: "Accountants for Subcontracting Ltd Companies | CIS Specialists",
    metaDescription:
      "CIS accounting for limited companies that subcontract in construction. EPS in-year reclaim, GPS per-director test, contractor-side returns and dividend extraction planning.",
    intro:
      "A limited company that operates as a CIS subcontractor sits in one of the most technically complex positions in UK construction tax. The company suffers 20% deductions on its labour income from the contractors above it. If it then pays its own subcontractors, it has a full contractor-side obligation too: monthly CIS300 returns, verification duties and the April 2026 due-diligence requirements. On top of that, the directors need to extract profit tax-efficiently from a company that may carry significant CIS deductions as a cash-flow pressure. Each layer requires specialist handling: the EPS reclaim mechanism for in-year recovery, the per-director GPS turnover test, dividend planning at 2026/27 rates and the monthly contractor-cycle compliance where applicable.",
    stats: [
      { value: "£30,000", label: "GPS turnover test per director (net of materials)" },
      { value: "10.75%", label: "Dividend tax rate, basic rate (2026/27)" },
      { value: "25 days", label: "HMRC EPS/CIS company repayment target (working days)" },
    ],
    challenges: [
      {
        title: "Operating on both sides of CIS at once",
        body:
          "A subcontracting limited company that also pays its own subbies is simultaneously a CIS subcontractor (suffering deductions from above) and a CIS contractor (making deductions below). Managing the HMRC offset position, running the EPS reclaim against the PAYE/CIS liability and filing monthly CIS300 returns for the contractor side requires keeping the two positions clearly separated in your records. A mismatch in either direction creates underpayments or missed reclaims.",
      },
      {
        title: "EPS in-year reclaim: the cash-flow difference",
        body:
          "A limited company suffering CIS deductions can recover them in real time via the Employer Payment Summary, offsetting CIS suffered against the company's PAYE and employer NIC liability each month. Many construction companies do not use this mechanism and instead wait 12 to 18 months for recovery through the Corporation Tax return. The EPS route eliminates the cash-flow gap. The target repayment window once a claim is lodged is 25 working days.",
      },
      {
        title: "GPS: the per-director turnover test",
        body:
          "For a limited company, the GPS turnover test requires net annual CIS turnover of £30,000 per director OR £100,000 in total (whichever is met first). Net turnover excludes VAT and materials, consistent with the labour-only deduction base. A two-director company needs either both directors to hit £30,000 each or the company to reach £100,000 in total. Understanding where your company sits relative to this test determines whether GPS is currently achievable and what the route looks like.",
      },
      {
        title: "Dividend extraction at 2026/27 rates",
        body:
          "Director-shareholders in CIS limited companies typically extract profit through a combination of salary and dividends. For 2026/27, FA 2026 s.4 sets dividend tax rates at 10.75% (basic rate band), 35.75% (higher rate) and 39.35% (additional rate), with a £500 annual allowance. With employer NIC at 15% on earnings above £5,000 and Corporation Tax at 25% (main rate) or 19% (small profits), the extraction model for a CIS limited company needs annual review.",
      },
    ],
    howWeHelp: [
      {
        title: "EPS CIS reclaim setup and monthly operation",
        body:
          "We configure the EPS reclaim mechanism for your payroll software, calculate the monthly CIS deduction suffered to offset against your PAYE/NIC liability, and submit the EPS within the payroll deadline cycle. Where your CIS deductions exceed the monthly PAYE liability, we manage the repayment claim with HMRC within the 25-working-day target window.",
      },
      {
        title: "GPS application and per-director qualification assessment",
        body:
          "We calculate your company's net CIS turnover correctly (excluding VAT and materials) and map it against the per-director and company-total tests. Where your company qualifies, we manage the GPS application across all three tests (business, turnover and compliance) and maintain the documentation record that protects status under the April 2026 anti-fraud rules.",
      },
      {
        title: "Contractor-side CIS returns where applicable",
        body:
          "Where your company pays its own subcontractors, we run the full contractor-side compliance cycle: monthly CIS300 returns by the 19th, nil returns in stop months, subcontractor verification and the April 2026 due-diligence records (CIS re-verification, Companies House check, bank name verification).",
      },
      {
        title: "Director extraction planning",
        body:
          "We model the optimal salary-dividend split for each director at current rates (dividend 10.75% / 35.75% / 39.35%, employer NIC 15% above £5,000, CT 25% / 19%) and produce an extraction plan that is reviewed annually as both the company's profit position and the legislative backdrop change.",
      },
    ],
    faqs: [
      {
        question: "Our company suffers CIS deductions from main contractors. How do we get that money back in-year rather than waiting for year-end?",
        answer:
          "Via the Employer Payment Summary. Each month, your company can offset the CIS deductions it has suffered against its PAYE and employer NIC liability and remit only the net amount to HMRC. If CIS suffered exceeds your PAYE/NIC liability in a given month, you can apply for a repayment and HMRC's target is to process it within 25 working days. We set up the mechanism and run it monthly so you are not carrying unnecessary deductions on your balance sheet.",
      },
      {
        question: "We are a two-director company. What do we each need to earn to qualify for GPS?",
        answer:
          "The limited-company GPS turnover test requires either £30,000 of net CIS turnover per director, OR £100,000 in total for the company. Net turnover excludes VAT and materials. If both directors are actively earning CIS income, each needs to reach £30,000 individually. Alternatively, if the company's total net CIS turnover reaches £100,000, the test is met regardless of how it splits between directors. We calculate your position correctly and tell you which threshold is within reach and over what timeframe.",
      },
      {
        question: "What dividend rate should we be using in our 2026/27 planning?",
        answer:
          "FA 2026 s.4 set the 2026/27 dividend rates at 10.75% (basic), 35.75% (higher) and 39.35% (additional), with a £500 annual allowance. If anyone is using the pre-2026 rates of 8.75%, 33.75% or 38.1%, those are now out of date and your planning figures will be wrong. We use the correct current rates in all extraction modelling.",
      },
    ],
    testimonial: {
      quote:
        "We did not realise we could reclaim CIS deductions in-year rather than waiting for the CT return. Once the EPS mechanism was set up properly, the difference in monthly cash flow was material.",
      attribution: "Director, specialist groundworks limited company, East Midlands",
    },
  },

  {
    slug: "property-developers",
    segment: "business",
    title: "Property developers",
    headline: "CIS compliance and tax accounting for property developers",
    metaTitle: "Accountants for Property Developers | CIS Compliance Specialists",
    metaDescription:
      "CIS accounting for property developers. Deemed contractor threshold, developer vs investor distinction, VAT domestic reverse charge and new-build zero-rating explained.",
    intro:
      "Property developers occupy an unusual position in CIS: many do not think of themselves as construction businesses, yet once their annual construction spend crosses £3 million they become deemed contractors under the scheme and all the same obligations apply. Below that threshold, developers who engage contractors directly still need to understand when those payments are within CIS scope and when they are not. Layer in the VAT domestic reverse charge, new-build zero-rating, and the distinction between development activity (within CIS) and property investment (outside it), and the tax picture for a property development company is genuinely complex.",
    stats: [
      { value: "£3 million", label: "Deemed contractor spend threshold per year" },
      { value: "0%", label: "VAT rate on new-build residential (zero-rated, outside DRC)" },
      { value: "25%", label: "Corporation tax main rate (profits over £250,000)" },
    ],
    challenges: [
      {
        title: "The deemed contractor threshold",
        body:
          "A business that is not in the construction industry but spends £3 million or more on construction operations in any 12-month period is a 'deemed contractor' under CIS. This catches property developers who buy sites, engage construction firms and sell completed units: the construction spend on a single large scheme can cross £3 million easily. Once the threshold is crossed, the developer must register for CIS, verify all subcontractors before payment, file monthly CIS300 returns and deduct at the correct rate from every subcontractor payment. Missing the deemed-contractor trigger is a common and expensive oversight.",
      },
      {
        title: "Developer versus investor: the CIS boundary",
        body:
          "CIS applies to construction operations, which means work on property that is being built or altered for sale or development. It does not apply to property investment businesses whose construction spend relates purely to maintaining or repairing investment properties they hold as landlords. The distinction matters because it determines whether a particular tranche of construction spend triggers CIS obligations. Many businesses straddle both activities and need a clear analysis of which spend sits on which side of the line.",
      },
      {
        title: "VAT domestic reverse charge versus new-build zero-rating",
        body:
          "The VAT domestic reverse charge applies where both supplier and customer are VAT-registered and CIS-registered, and the customer is not the end user. A property developer building for sale is typically the end user for VAT purposes, meaning the reverse charge does not apply and subcontractors charge VAT in the normal way. On new-build residential work, the zero-rate applies to the construction services themselves: the subcontractor charges 0% VAT and the developer does not pay input tax to recover. Confusing these two positions creates both over- and under-declared VAT.",
      },
    ],
    howWeHelp: [
      {
        title: "Deemed contractor assessment and CIS registration",
        body:
          "We assess your annual construction spend across all projects, identify when the £3 million threshold is crossed or at risk of being crossed, and manage CIS registration and the full contractor-side compliance cycle: verification, monthly CIS300 returns, nil returns and deduction statement issuance. We flag the threshold in advance so you are not caught by a retrospective obligation.",
      },
      {
        title: "Developer/investor boundary analysis",
        body:
          "We analyse your construction spend across development activity and investment property maintenance, map it against the CIS boundary, and give you a clear position on which payments are within scope and which are not. Where mixed-activity development companies need both treated separately, we maintain the records that support the distinction.",
      },
      {
        title: "VAT and DRC compliance on development projects",
        body:
          "We advise on the correct VAT treatment for each stream of construction services you receive: end-user developer (normal VAT, subcontractors charge), new-build residential (zero-rated), and any reverse-charge scenarios where they genuinely apply. We review subcontractor invoices for incorrect VAT treatment and correct errors before they reach your VAT return.",
      },
    ],
    faqs: [
      {
        question: "We are not a construction company. Does CIS apply to us?",
        answer:
          "It can. If your business spends £3 million or more on construction operations in any 12-month period, you are a deemed contractor under CIS and the full contractor-side obligations apply: you must register, verify subcontractors before paying them, deduct at the correct rate, file monthly CIS300 returns and issue deduction statements. The deemed-contractor rule exists specifically to capture non-construction businesses, including property developers, that commission significant construction work. We assess your spend position and tell you clearly where you stand.",
      },
      {
        question: "Our subcontractors are sending us invoices with standard 20% VAT. Should they be using the reverse charge?",
        answer:
          "Not necessarily. The domestic reverse charge applies only when all five conditions are met simultaneously: the supply is a specified CIS service, both parties are VAT-registered, both are CIS-registered, the customer is not the end user (they will on-sell the construction services), and the supply is standard- or reduced-rated. If you are a developer building for sale, you are generally the end user for VAT purposes, so the reverse charge does not apply and subcontractors should be charging standard VAT in the normal way. On new-build residential work, the zero rate typically applies instead. We review your supplier base and flag any invoices that are applying the wrong treatment.",
      },
    ],
  },

  {
    slug: "housebuilders",
    segment: "business",
    title: "Housebuilders",
    headline: "CIS compliance at scale for housebuilders",
    metaTitle: "Accountants for Housebuilders | CIS Compliance Specialists",
    metaDescription:
      "CIS compliance for housebuilders with 20 to 50 subcontractors. Monthly CIS300 at volume, nil returns in stop months, due diligence at scale and April 2026 anti-fraud rules.",
    intro:
      "A housebuilder running two or three active sites will typically engage 20 to 50 subcontractors simultaneously across groundworks, brickwork, carpentry, roofing, first fix and second fix. Every one of those subbies must be verified before the first payment. Every month's CIS300 must be filed by the 19th. Every payment triggers a deduction statement obligation. In stop months, nil returns are now mandatory from 6 April 2026. At that volume, the CIS compliance cycle is a full administrative workstream in its own right. The April 2026 anti-fraud rules make the due-diligence requirement at each verification event equally non-negotiable: one poorly documented subcontractor relationship is now enough to trigger GPS revocation.",
    stats: [
      { value: "£100", label: "Penalty on day one for a late CIS300 (including nil returns)" },
      { value: "20%", label: "Knowledge-based penalty on payments under FA 2004 s.62A (April 2026)" },
      { value: "3", label: "Due-diligence steps required before each subcontractor payment" },
    ],
    challenges: [
      {
        title: "Verification at scale across a rotating subcontractor pool",
        body:
          "Housebuilders rarely work with the same subcontractor pool from one site to the next. New groundworkers for a new phase, different bricklayers on a second site, replacement roofers mid-contract: each introduction requires a fresh HMRC verification before the first payment. Managing 30 or 40 live verification records, tracking expiry and change events, and ensuring no payment is made without a current verified status is a compliance load that grows faster than headcount.",
      },
      {
        title: "Nil returns in stop and start months",
        body:
          "Housebuilding is inherently stop-start. A site may be paused between planning consent and groundworks start, or between first-fix completion and second-fix engagement. In any tax month where no subcontractor payments are made, a CIS300 nil return is now mandatory from 6 April 2026. The penalty for missing a nil return is £100 on day one. Many housebuilders have not yet adjusted their monthly compliance calendar to include nil-return months, because the obligation did not exist between 2015 and April 2026.",
      },
      {
        title: "Due diligence at scale under the April 2026 anti-fraud rules",
        body:
          "Finance Act 2026 introduced the 'knew or should have known' standard for GPS revocation and the 20%-of-payment knowledge-based penalty under FA 2004 ss.62A/62B. For a housebuilder paying 40 subcontractors, the due-diligence obligation (CIS re-verification, Companies House legitimacy check, bank account name verification before each payment) must be applied to every subcontractor, every payment cycle. One undocumented payment is not a minor omission under the new regime: it is evidence of failing the 'should have known' standard.",
      },
      {
        title: "Deduction statement volume",
        body:
          "A housebuilder making payments to 40 subbies in a month has 40 deduction statements to issue within 14 days of each payment. Where subbies hold GPS, no statement is required (no deduction is made). Where subbies are registered or unregistered, statements are mandatory. Managing the statement run alongside the CIS300 filing deadline in the same fortnight is a compression problem that manual processes handle poorly.",
      },
    ],
    howWeHelp: [
      {
        title: "Full monthly CIS cycle management",
        body:
          "We run the complete monthly contractor-side compliance cycle for your business: subcontractor verification across your pool, CIS300 preparation and filing by the 19th, nil returns in stop months, and deduction statement issuance within the 14-day window. We maintain the verification record archive and flag status changes between payment cycles.",
      },
      {
        title: "Due-diligence documentation system",
        body:
          "We build and operate the pre-payment due-diligence record for each subcontractor: timestamped HMRC verification result, Companies House active-entity check, and bank account name verification. The record is maintained in a format that HMRC can be shown in the event of a supply-chain fraud investigation, demonstrating that you met the 'should have known' standard under Finance Act 2026.",
      },
      {
        title: "GPS management and protection",
        body:
          "If your business holds GPS, we manage the annual three-test compliance review (business, turnover, compliance) and ensure the due-diligence records that protect GPS from immediate revocation under the April 2026 rules are in place and current. We model the cash-flow cost of GPS loss so you understand what is at stake and why the documentation matters.",
      },
    ],
    faqs: [
      {
        question: "We have a site that is paused for three months. Do we need to do anything with CIS in those months?",
        answer:
          "Yes. From 6 April 2026, a nil return is mandatory for every tax month in which you make no subcontractor payments. You can either file a CIS300 nil return by the 19th of the following month or pre-notify HMRC that you will be inactive for a defined period. A pre-notification covers the quiet period without requiring a monthly return for each individual month. We manage whichever route suits your project schedule.",
      },
      {
        question: "We use a mix of sole traders and limited companies as subbies. Does the due-diligence process differ?",
        answer:
          "Yes. For a sole trader, you verify their name and UTR with HMRC. For a limited company, the Companies House check is particularly important: you are confirming the company is active, its registration matches what you have been told and the bank account name matches the registered company name. The bank account name verification step is critical for limited companies because supply-chain fraud often involves misdirected payments to look-alike entities. Both checks need to be documented per payment cycle under the April 2026 rules.",
      },
      {
        question: "How quickly do we need to issue deduction statements after paying a subcontractor?",
        answer:
          "Within 14 days of each payment where a CIS deduction has been made. There is no grace period. The statement must show the gross payment amount, the materials cost excluded from the deduction base, the amount liable to deduction and the net payment made. If a subcontractor holds GPS, no deduction is made and no statement is required. Where you are paying 30 or 40 subbies a month, the statement run needs to be built into the payment process rather than treated as a separate administrative task.",
      },
    ],
    testimonial: {
      quote:
        "Running three sites with 35 to 40 subbies, the paperwork was a mess. The April 2026 rules made us take it seriously. Having the verification records, Companies House checks and nil returns all handled as a managed service has removed a significant source of director anxiety.",
      attribution: "Director, regional housebuilder, North West",
    },
  },

  {
    slug: "labour-agencies",
    segment: "business",
    title: "Labour agencies",
    headline: "CIS compliance and accounting for construction labour agencies",
    metaTitle: "Accountants for Labour Agencies | CIS Compliance Specialists",
    metaDescription:
      "CIS accounting for construction labour agencies. Agency as the CIS subcontractor, PAYE beneath agency level, GPS for agencies and April 2026 due-diligence obligations.",
    intro:
      "A construction labour agency occupies a specific and often misunderstood position in CIS. Where an agency supplies workers to a contractor and those workers are under the contractor's direction and control, the agency is typically treated as the CIS subcontractor, not the individual workers. The agency receives the labour payment from the contractor (with CIS deducted from the labour element), and separately runs PAYE for the workers it employs. The CIS deduction and the PAYE obligation exist at different levels of the same supply chain: one is the agency's own tax exposure as a subcontractor, the other is the agency's employer obligation to the workers. Getting both right simultaneously, while also managing GPS eligibility, the April 2026 anti-fraud rules and employer NIC at 15% above £5,000, requires specialist support.",
    stats: [
      { value: "15%", label: "Employer NIC rate on earnings above £5,000 (from April 2025)" },
      { value: "£30,000", label: "GPS turnover test per director (limited company agency)" },
      { value: "20%", label: "CIS deducted from agency's labour receipts (if registered, not GPS)" },
    ],
    challenges: [
      {
        title: "Agency as the CIS subcontractor",
        body:
          "Where a labour agency supplies construction workers to a contractor and those workers operate under the contractor's supervision, direction and control, HMRC treats the agency (not the individual workers) as the CIS subcontractor. The contractor deducts 20% (or 0% if GPS) from the labour element of payments to the agency. The workers themselves are employed by the agency and paid through PAYE: CIS does not reach down to their level in this structure. Many agencies are unclear on this boundary and either claim the workers should be under CIS individually (creating a wrong-scheme problem) or do not register as a CIS subcontractor at all (resulting in 30% deductions from contractors).",
      },
      {
        title: "PAYE costs at scale: employer NIC at 15% above £5,000",
        body:
          "A labour agency employing construction workers faces employer NIC at 15% on earnings above £5,000 per employee per year (from April 2025, carried into 2026/27). For an agency paying 20 workers a typical construction salary, the employer NIC bill is substantial and must be factored into margin calculations. The April 2025 rate change from 13.8% above £9,100 increased the per-employee cost meaningfully, particularly for agencies with lower-paid workers who now fall within the NIC threshold at a higher rate.",
      },
      {
        title: "GPS qualification for the agency",
        body:
          "A labour agency that is a limited company can apply for GPS as a CIS subcontractor. The turnover test requires £30,000 of net CIS income per director or £100,000 in total. Net income excludes VAT and materials: for a labour agency, this is effectively the labour-charge element of the agency's receipts from contractors. An agency with GPS receives gross payments from contractors, eliminating the 20% deduction and removing the cash-flow pressure of waiting for CIS to be recovered via EPS or Corporation Tax.",
      },
      {
        title: "April 2026 due-diligence exposure from the agency's own subcontractors",
        body:
          "Where a labour agency itself sub-engages other agencies or labour-supply businesses, it has contractor-side CIS obligations of its own. Under Finance Act 2026, the 'knew or should have known' standard and the FA 2004 ss.62A/62B knowledge-based penalty (20% of the payment) apply to the agency as payer. Labour supply chains are a known vector for CIS fraud. An agency paying another labour business without documented verification, Companies House checks and bank-name confirmation is exposed to GPS revocation and the knowledge-based penalty regime.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS registration and subcontractor-side compliance",
        body:
          "We register your agency as a CIS subcontractor where required, ensure you are correctly set up for 20% deductions from contractors, and manage the EPS reclaim mechanism to recover those deductions in-year against your PAYE/NIC liability. We advise on the correct characterisation of your supply arrangements so contractors apply the right deduction rate to the agency rather than to individual workers.",
      },
      {
        title: "GPS application for the agency",
        body:
          "We calculate your agency's net CIS turnover, assess the per-director and company-total tests, and manage the GPS application across all three qualifying criteria. We maintain the compliance record (no late returns, no overdue tax) that the compliance test requires, and document the due-diligence steps that protect GPS from revocation under the April 2026 anti-fraud rules.",
      },
      {
        title: "PAYE and employer NIC management for agency workers",
        body:
          "We run payroll for your construction workforce at the correct employer NIC rate (15% above £5,000 per employee from April 2025), manage auto-enrolment pension contributions (8% total: 5% employee, 3% employer) and produce the RTI submissions that keep your PAYE scheme compliant. We co-ordinate payroll with the EPS CIS reclaim so the two run from the same data.",
      },
    ],
    faqs: [
      {
        question: "Our contractors are deducting CIS from the individual workers, not from the agency. Is that right?",
        answer:
          "Probably not, if the workers are under the contractor's direction and control. Where a labour agency supplies workers who operate under the supervision and direction of the end contractor, HMRC's position is that the agency is the CIS subcontractor and the deduction should be taken from payments to the agency, not to the workers individually. This is a fundamental structural point: getting it wrong means the wrong entity is suffering the deduction and the recovery route (EPS for the agency, Self Assessment for individuals) is also wrong. We review the arrangements and advise on the correct treatment for your specific supply structure.",
      },
      {
        question: "Can a labour agency hold GPS?",
        answer:
          "Yes, if the agency meets the three qualifying tests. The business test is met if the agency carries out or provides labour for construction work through a bank account. The turnover test for a limited-company agency requires £30,000 net CIS income per director or £100,000 total. The compliance test requires a clean tax record for the past 12 months. GPS eliminates the 20% deduction on the agency's labour receipts from contractors, which at any material revenue level represents a significant annual cash-flow improvement.",
      },
      {
        question: "We sometimes use other labour businesses to fill gaps. Do we have CIS obligations as a contractor towards them?",
        answer:
          "Yes, if those businesses supply construction labour within CIS scope and you pay them for it. You would be acting as a CIS contractor and would need to verify their status, deduct at the correct rate and file monthly CIS300 returns. Under Finance Act 2026, you also need documented due diligence (CIS verification, Companies House check, bank account name verification) before each payment, because labour supply chains are a known fraud vector and HMRC applies the 'should have known' standard to contractors in this space. GPS revocation for inadequate due diligence in a labour supply chain carries a 5-year reapplication ban.",
      },
    ],
  },
];
