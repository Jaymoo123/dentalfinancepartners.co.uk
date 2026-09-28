export interface ContractorType {
  slug: string;
  title: string;
  /** Mid-sentence noun phrase for the audience, used where `title` would
   * otherwise be lowercased into a sentence (same idea as Medical's
   * `displayRoleLower`). Set only where the lowercased title reads wrong
   * (acronym, proper noun, or a situation rather than a cohort). */
  phrase?: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  testimonial?: { quote: string; attribution: string };
}

export const contractorTypes: ContractorType[] = [
  // it-contractors: docs/contractors-ir35/_wave1/it-contractors.json, 2026-09-27, LEADS_250 S4a
  {
    slug: "it-contractors",
    title: "IT Contractors",
    phrase: "IT contractors",
    headline: "Accountants for IT contractors",
    metaTitle: "Accountants for IT Contractors | IR35 and PSC Tax",
    metaDescription:
      "For UK software, data, cloud and infrastructure contractors on day rates. Inside and outside IR35, umbrella or PSC, overseas clients, pensions and VAT.",
    intro:
      "You write software, run data platforms or manage cloud infrastructure, and you invoice a day rate through your own limited company. One engagement is outside IR35, the next is inside on almost identical work, and an agency sits in the middle of both. Some clients are abroad. Some months a side project earns a little. So the questions worth answering are practical ones: who decides your status, what a caught engagement does to your take-home, when an umbrella beats keeping the company open, how VAT behaves with an overseas client, and why an employer pension contribution is usually your largest lever. Contract wording and the way a job actually runs rarely describe the same work, and status turns on the second.",
    stats: [
      { value: "5%", label: "Chapter 8 expenses allowance, and it is gone under Chapter 10" },
      { value: "15%", label: "Employer NIC funded from the assignment rate on an umbrella" },
      { value: "£60,000", label: "Pension annual allowance for 2026/27, plus carry forward" },
      { value: "£90,000", label: "VAT registration threshold, frozen since 1 April 2024" },
    ],
    challenges: [
      {
        title: "Inside on one contract, outside on the next, same skills",
        body:
          "Status is settled engagement by engagement, and the first question is who settles it. Where the end client is medium or large, Chapter 10 applies: the client issues a Status Determination Statement and the fee-payer, usually the agency nearest your company, operates PAYE before paying you. Where the client is small, or wholly overseas with no UK connection, Chapter 8 applies and your company assesses itself. Embedded delivery is where the control test bites: a client setting the stack, the sprint order and the hours is directing how the work is done.",
      },
      {
        title: "What being caught actually costs",
        body:
          "Under Chapter 10 the fee-payer deducts PAYE and employee NIC and pays employer NIC at 15% on top, all from the same assignment rate, and no 5% expenses allowance exists in that calculation. Under Chapter 8 your company computes its own deemed employment payment at the year end, keeping the 5% allowance and employer pension contributions. Home to client travel usually stops being deductible once an engagement is inside. Mechanics: <a href=\"/blog/ir35-status/deemed-employment-payment-explained\">the deemed payment guide</a>.",
      },
      {
        title: "An umbrella rate is the cost of employing you",
        body:
          "The rate quoted on an umbrella assignment is the cost of employing you, not the pay you see. Employer NIC at 15%, the Apprenticeship Levy at 0.5% and the umbrella's margin come out of that figure first, and PAYE and employee NIC then apply to what is left. So a headline rate above a payroll salary can still land lower in your account, and the only fair comparison is net against net. Put your own figures through the <a href=\"/calculators/umbrella-vs-limited-calculator\">umbrella versus limited calculator</a>.",
      },
      {
        title: "Laptops, licences and the research and development question",
        body:
          "Hardware, developer tooling, cloud subscriptions, indemnity cover and accountancy fees are ordinary company costs where incurred wholly and exclusively for the business, equipment usually via capital allowances. Research and development relief is narrower than contractors expect: a client project delivered on a day rate is rarely the company's own qualifying project, and where a client funds the work any claim tends to belong to them. Your own product is the case worth examining.",
      },
      {
        title: "Overseas clients, and where your VAT lands",
        body:
          "Contracting directly for a business abroad changes two things at once. For IR35, a wholly overseas client with no UK connection leaves the assessment with your company under Chapter 8. For VAT, the general rule puts a business-to-business supply where the customer belongs, so those fees fall outside the scope of UK VAT and do not count towards the £90,000 threshold. <a href=\"/blog/mtd-and-compliance/contractor-vat-registration-guide\">The VAT guide</a> covers the flat rate trap.",
      },
      {
        title: "Dividends are no longer the whole answer",
        body:
          "Dividend rates of 10.75%, 35.75% and 39.35% for 2026/27 sit on top of corporation tax already paid, narrowing the gap between extracting profit and leaving it in the company. An employer pension contribution goes in before corporation tax, carries no NIC and is not taxed on you as income, within a £60,000 annual allowance plus up to three years carried forward, and it is not capped by your salary. See <a href=\"/blog/pension-and-dividends/contractor-pension-employer-contributions\">employer contributions</a>.",
      },
    ],
    howWeHelp: [
      {
        title: "Status reviewed before you sign, and again when the job changes",
        body:
          "Both the wording and the working practice are covered: who sets priorities, whether a substitute would be accepted, what happens between contracts. Where a determination from the client looks wrong, the client-led disagreement process is open to you.",
      },
      {
        title: "The company's filings kept straight",
        body:
          "Your accounts, the CT600, the Companies House filings and your self assessment return are prepared together, with the corporation tax position worked through where profits land in the marginal band. Income that arrived already taxed from a fee-payer is tracked so it is not taxed twice.",
      },
      {
        title: "Extraction modelled rather than assumed",
        body:
          "Salary, dividends and pension are set out together for the year ahead on your own figures: whether the Employment Allowance is available, how much personal allowance other income uses, and what a one-off employer contribution would do in a strong year.",
      },
      {
        title: "VAT and overseas invoicing settled once",
        body:
          "The registration question is worked through: whether it is required or worth taking voluntarily, whether the flat rate scheme survives the limited cost trader test at 16.5%, and how invoices to clients outside the UK should be raised and reported.",
      },
    ],
    faqs: [
      {
        question:
          "My agency says the role is outside IR35. Is that the determination?",
        answer:
          "No. Where the end client is medium or large, the Status Determination Statement is the client's to issue and the agency is usually only the fee-payer. An agency view carries none of the reasonable care duty the client owes, so ask for the statement and its reasoning. Where the client is small or wholly overseas, no statement is coming: the assessment sits with your own company.",
      },
      {
        question:
          "Can a developer embedded in a client team ever be outside IR35?",
        answer:
          "It is possible, but embedded delivery is where the control test most often points the other way. If the client sets your hours, assigns your tickets, picks the stack and expects you on their systems at fixed times, the engagement looks like employment whatever the wording says. Real control over delivery, a substitution right the client would honour and gaps between contracts are what count.",
      },
      {
        question:
          "Should I close the limited company if my next contract is inside IR35?",
        answer:
          "Not automatically. For one genuinely inside engagement an umbrella is usually simpler and often no worse financially, since the company adds cost without a tax advantage on that income. Keeping it open suits you if outside work is likely soon, profit is already retained, or you want to carry on making employer pension contributions. The routes are compared in <a href=\"/blog/umbrella-vs-limited-company/limited-company-vs-umbrella-contractor\">limited company versus umbrella</a>.",
      },
      {
        question:
          "I invoice a client in the United States. Do I charge VAT?",
        answer:
          "For services to a business customer the general rule places the supply where the customer belongs, so a fee invoiced to a United States business is outside the scope of UK VAT and no UK VAT is charged. Those sales also sit outside the £90,000 registration threshold test. Voluntary registration can still pay where you carry input VAT on equipment and software.",
      },
      {
        question:
          "What do I do with SaaS or app income alongside my day rate?",
        answer:
          "Run through the same company it is simply more trading income, taxed at corporation tax rates, and it can push profits into the marginal band. Held outside the company it belongs on your self assessment return and interacts with Making Tax Digital for Income Tax. Either way it shifts the salary and dividend split, so raise it early.",
      },
    ],
  },

  {
    slug: "engineering-contractors",
    title: "Engineering Contractors",
    headline: "Specialist accountants for engineering contractors",
    metaTitle: "Accountants for Engineering Contractors | IR35 & Tax Advice",
    metaDescription:
      "Specialist accounting for UK engineering contractors. Civil, mechanical, electrical and structural engineers. IR35 reviews, expenses, PSC tax planning.",
    intro:
      "Engineering contractors span a huge range of specialisms (civil, mechanical, electrical, structural, process) and face specific IR35 and tax challenges that a generalist accountant will not know. Site-based working, public sector engagements and long infrastructure projects all create complexity that needs specialist handling.",
    stats: [
      { value: "£350–£650", label: "Typical day rate range" },
      { value: "Variable", label: "IR35 risk (depends on sector and role)" },
      { value: "24-month", label: "Travel rule (critical for site-based work)" },
    ],
    challenges: [
      {
        title: "Public sector projects and off-payroll since 2017",
        body:
          "Engineering contractors working on public sector infrastructure (Network Rail, Highways England, local authorities, NHS estates) have been subject to client-side IR35 determination since April 2017. Many received inside determinations without proper analysis of their actual working arrangements. If you are in public sector contracting, your status needs regular review as contracts and working practices change.",
      },
      {
        title: "The 24-month travel rule on site",
        body:
          "Site-based engineering work looks straightforward but the 24-month rule creates real complexity. Once a site qualifies as your permanent workplace (either because you have been there over 24 months or because it was expected at the outset that you would be), ordinary commuting costs are no longer allowable. We apply this correctly, including for multi-phase projects where the analysis is less obvious.",
      },
      {
        title: "Substitution in specialist roles",
        body:
          "Specialist engineering skills (particular software expertise, specific sector knowledge, unusual certifications) can create a genuine substitution argument if properly documented. We help you understand whether your specialism supports an outside IR35 position, and what evidence is needed to demonstrate it.",
      },
      {
        title: "Framework and agency arrangements",
        body:
          "Many engineering contractors work through framework agreements with large consultancies or directly with public sector bodies. The fee-payer and SDS arrangements in these structures are often poorly understood. We explain clearly who is responsible for what, and what your rights are if you disagree with a determination.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 status review for engineering contracts",
        body:
          "A specialist reviews your contract against the three key tests, with specific knowledge of how engineering roles typically work in practice. Site-based roles, framework placements and specialist project work each have different risk profiles.",
      },
      {
        title: "Travel and subsistence expense management",
        body:
          "We manage the 24-month rule correctly across your portfolio of site placements, making sure every allowable expense is claimed while nothing is included that would not survive HMRC scrutiny.",
      },
      {
        title: "Annual accounts and corporation tax",
        body:
          "PSC accounts, CT600, Companies House filings and self assessment for you as a director. For engineering contractors with variable income across contracts, we also help with cash flow planning across the tax year.",
      },
    ],
    faqs: [
      {
        question: "I work across multiple sites. How does the 24-month rule apply?",
        answer:
          "Each site is assessed separately. If you work across several sites and no single site accounts for more than 40% of your time, the position is more straightforward. But if you have a primary site and visit others occasionally, the 40% rule applies to the primary site. We map this out properly so you are not missing claims or overclaiming.",
      },
      {
        question: "Does working for a main contractor rather than directly with the client change my IR35 position?",
        answer:
          "Your direct client for IR35 purposes is whoever you contract with (the main contractor or sub-contractor above you). Their size determines whether the off-payroll rules apply. If they are a medium or large business, they are responsible for issuing an SDS. The end client (e.g. the infrastructure owner) is not directly your IR35 counterparty.",
      },
    ],
    testimonial: {
      quote:
        "I had been on the same infrastructure project for 28 months. Nobody had flagged the 24-month rule to me. We corrected the travel claims and restructured the expense approach going forward. Should have spoken to a specialist two years earlier.",
      attribution: "Civil engineering contractor, major infrastructure project",
    },
  },

  {
    slug: "finance-contractors",
    title: "Finance Contractors",
    headline: "Specialist accountants for finance and interim contractors",
    metaTitle: "Accountants for Finance & Interim Contractors | IR35",
    metaDescription:
      "Tax and IR35 advice for UK finance contractors and interim executives. Interim FD, CFO, management accountant and financial analyst PSC planning.",
    intro:
      "Finance contractors (interim FDs, CFOs, management accountants, financial analysts) typically work for large organisations where the off-payroll rules fully apply. Integration into the client's management structure is common, and the control test is regularly triggered. Getting the tax structure right is particularly important at the day rates involved.",
    stats: [
      { value: "£500–£1,200", label: "Typical day rate range" },
      { value: "Higher", label: "IR35 risk (integration risk is significant)" },
      { value: "Large firms", label: "Typical clients (off-payroll rules apply)" },
    ],
    challenges: [
      {
        title: "Management integration and the control test",
        body:
          "Interim finance roles are often indistinguishable from permanent employment in practice. An interim FD who sits on the board, manages the finance team and is directed by the CEO is exercising control in the opposite direction, but the question HMRC asks is whether the client controls how, where and when you work, and whether you are integrated into the organisation. For finance roles, the answer is often yes.",
      },
      {
        title: "Working for large employers",
        body:
          "Virtually all finance contractor roles are with medium or large businesses, meaning the end client is responsible for the IR35 determination. Inside IR35 status for a finance contractor at £700-£1,000/day represents a very significant personal tax cost. Understanding the determination, knowing when to challenge it, and structuring the engagement correctly from the outset all matter.",
      },
      {
        title: "Dividend and salary planning at high day rates",
        body:
          "At the day rates typical in finance contracting, the additional rate of dividend tax (39.35%) becomes relevant. The optimal salary and dividend split, pension contributions via the PSC, and the use of carry-forward pension allowances all require modelling at the individual level. There is no one-size answer.",
      },
      {
        title: "Corporation tax on substantial retained profits",
        body:
          "Finance contractors who retain significant profits in their PSC (whether because the marginal tax rate makes extraction expensive, or because they are building a reserve) need to plan for the corporation tax implications carefully, including the marginal relief band between £50,000 and £250,000 profit.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 review for finance and interim roles",
        body:
          "A specialist reviews the specific nature of your engagement, not just the contract. Interim roles that are genuinely project-based with clear deliverables and limited integration look different from permanent headcount substitution, and the specialist knows which arguments work and which do not.",
      },
      {
        title: "High-rate salary and dividend modelling",
        body:
          "We model the optimal structure for the full picture: salary, dividends, pension contributions from the PSC, and the interaction with any other income. At higher day rates, the annual value of getting this right is significant.",
      },
      {
        title: "Pension strategy for high earners",
        body:
          "PSC employer pension contributions are among the most tax-efficient tools available. For finance contractors with high day rates, maximising contributions (including carry-forward from unused allowance in the previous three tax years) can substantially reduce the overall tax burden.",
      },
    ],
    faqs: [
      {
        question: "As an interim CFO, can I really be outside IR35?",
        answer:
          "It depends on the specifics. An interim CFO who is genuinely delivering a defined project (a finance transformation, a systems implementation, a period of organisational change) and who is not embedded as a permanent executive with line management responsibility has a stronger case than one filling a vacant CFO headcount on an indefinite basis. The nature and duration of the engagement matter. We look at both.",
      },
      {
        question: "My day rate puts me in additional rate dividend tax. Is a limited company still worth it?",
        answer:
          "Almost always yes, for several reasons. Pension contributions from the PSC are employer contributions and are fully deductible against corporation tax. The ability to time income across tax years, retain profits, and use the company structure for planning purposes continues to provide value even at higher tax rates. We model the numbers for your specific position.",
      },
    ],
    testimonial: {
      quote:
        "Switched to a specialist after my generalist accountant missed three years of pension carry-forward. First year with the right advice recovered £22,000 in unnecessary tax.",
      attribution: "Interim CFO, FTSE 250 client engagements",
    },
  },

  {
    slug: "management-consultants",
    title: "Management Consultants",
    headline: "Specialist accountants for independent management consultants",
    metaTitle: "Accountants for Management Consultants | IR35 & PSC Tax",
    metaDescription:
      "Tax and IR35 planning for UK independent management consultants. Strategy, operations and change management specialists. Plain English advice.",
    intro:
      "Independent management consultants typically have a stronger IR35 position than many other contractor types. Engagement-based work, clear deliverables, genuine substitution and multiple clients often support an outside IR35 case. But the position is not automatic and working practice still needs to match the contract.",
    stats: [
      { value: "£600–£1,500", label: "Typical day rate range" },
      { value: "Lower–Medium", label: "IR35 risk (deliverable-based work helps)" },
      { value: "Statement of work", label: "Key document for outside IR35 case" },
    ],
    challenges: [
      {
        title: "Statement of work vs body shopping",
        body:
          "The single most important distinction in management consulting IR35 is whether you are engaged on a specific statement of work with defined deliverables, or whether you are essentially providing your time on demand to fill a capacity gap. The former is a much stronger outside IR35 position. Many consultants operate somewhere between the two, and the contract and working practices need to reflect the genuine nature of the engagement.",
      },
      {
        title: "Multiple clients and portfolio working",
        body:
          "Working for multiple clients simultaneously is one of the clearest indicators of genuine self-employment. If your consulting practice has several active clients at once, this is a significant factor in your favour, provided the engagements are genuine and not simply a single embedded role with a side project.",
      },
      {
        title: "High fees and corporation tax planning",
        body:
          "At the day rates typical in strategy and management consulting, corporation tax planning (including the marginal relief band, pension contributions from the PSC, and the timing of dividend extraction) has a very significant impact on your overall tax position. A generalist accountant without consulting experience will miss the nuances.",
      },
    ],
    howWeHelp: [
      {
        title: "Statement of work and engagement review",
        body:
          "A specialist reviews your engagement letters and statements of work against the IR35 tests. If you are engaged on a deliverables basis, the documentation is checked so it reflects that clearly and consistently.",
      },
      {
        title: "Portfolio structure and multiple client planning",
        body:
          "For consultants with multiple clients, we plan across the portfolio, timing income, allocating expenses, modelling dividends and pension contributions to minimise the overall tax burden across a variable-income year.",
      },
      {
        title: "Annual accounts and self assessment",
        body:
          "PSC accounts, CT600 and self assessment for a management consulting practice, handled accurately and reviewed properly with you before submission.",
      },
    ],
    faqs: [
      {
        question: "My consulting engagement has been with one client for 18 months. Does this affect my IR35 position?",
        answer:
          "Duration alone does not determine IR35 status, but long single-client engagements attract more HMRC scrutiny. The key questions are whether the nature of the work is genuinely project-based (and has evolved as projects have changed), whether you retain genuine autonomy over how the work is done, and whether you have the right to substitute. We review this in context, not just by looking at the calendar.",
      },
      {
        question: "Can I use a day rate contract for management consulting, or do I need a statement of work?",
        answer:
          "A day rate contract is a risk factor but not automatically disqualifying. What matters more is whether the nature of the work is deliverables-based in practice, and whether the other IR35 factors (control, substitution, MOO) point toward self-employment. A statement of work with clear deliverables is stronger and worth the effort to negotiate.",
      },
    ],
  },

  {
    slug: "project-managers",
    title: "Project Managers",
    headline: "Specialist accountants for contract project managers",
    metaTitle: "Accountants for Contract Project Managers | IR35 Tax Advice",
    metaDescription:
      "IR35 and tax advice for UK contract project managers and programme managers. PSC accounting, salary planning and IR35 status reviews.",
    intro:
      "Contract project managers (IT, programme, transformation and PMO leads) face one of the higher IR35 risk profiles in contracting. Client-side direction over priorities, integration into governance structures and long programme engagements all create exposure. Getting the working practice right matters as much as the contract.",
    stats: [
      { value: "£400–£800", label: "Typical day rate range" },
      { value: "Higher", label: "IR35 risk (governance integration is common)" },
      { value: "IT & public sector", label: "Where most project manager roles sit" },
    ],
    challenges: [
      {
        title: "Governance integration and the control test",
        body:
          "Project managers who report into a client's Programme Management Office, attend client steering committees and are managed by a client SRO (Senior Responsible Owner) are operating within the client's control framework. The control test is almost always triggered in these arrangements. Whether other factors (substitution, MOO, financial risk) offset this requires careful analysis.",
      },
      {
        title: "Long programmes and mutuality of obligation",
        body:
          "Multi-year transformation programmes create a pattern of mutual obligation that HMRC examines carefully. If your role as a programme manager on a client's enterprise system implementation has been extended repeatedly and is effectively filling a permanent programme function, the MOO argument is harder to defend.",
      },
      {
        title: "Public sector projects",
        body:
          "A significant proportion of contract project manager work is in the public sector (central government, NHS, local authorities), where client-side IR35 determination has applied since April 2017. Many programme managers received inside determinations at that point and have been on inside IR35 terms since. The question of whether to challenge those determinations or restructure the engagement deserves proper analysis.",
      },
    ],
    howWeHelp: [
      {
        title: "Working practice review alongside contract review",
        body:
          "A specialist looks at both what the contract says and how the role actually operates. For project managers, the practical reality of governance arrangements, reporting lines and how priorities are set is what drives the IR35 analysis.",
      },
      {
        title: "Inside IR35 structure optimisation",
        body:
          "If you are inside IR35, there are still planning opportunities, including pension contributions from the PSC, income timing, and operating alongside other outside IR35 contracts. We make sure the structure is as efficient as possible even where the status cannot be changed.",
      },
      {
        title: "SDS challenge support",
        body:
          "Where a client's status determination appears incorrect, a specialist supports the formal challenge process, reviewing the SDS, preparing the representation, and managing the 45-day response window.",
      },
    ],
    faqs: [
      {
        question: "My role is described as a contract project manager but in practice I manage the client's permanent team. Am I inside IR35?",
        answer:
          "Managing a permanent team is a strong indicator of employment-type integration. If you are directing permanent employees, sitting in line management, and your role would exist as a permanent headcount if you were not there, the inside IR35 position is hard to argue against. We would look at whether there are other factors (genuine substitution, a fixed programme end date, no expectation of continuation) that could offset this.",
      },
    ],
  },

  {
    slug: "nhs-locum-doctors",
    title: "NHS Locum Doctors",
    phrase: "NHS locum doctors",
    headline: "Specialist accountants for locum doctors and NHS contractors",
    metaTitle: "Accountants for Locum Doctors | NHS IR35 & PSC Tax Planning",
    metaDescription:
      "Tax and IR35 advice for locum GPs, hospital consultants and NHS contractor doctors. PSC accounting, pension planning and HMRC compliance.",
    intro:
      "Locum doctors and NHS contractor physicians face the most complex combination of income sources, pension considerations and IR35 exposure in contracting. The NHS pension, the annual allowance tapering at high incomes, and the off-payroll rules that have applied to NHS trusts since 2017 all interact in ways that require specialist planning.",
    stats: [
      { value: "£80–£200/hr", label: "Typical locum doctor rate range" },
      { value: "Higher", label: "IR35 risk (NHS has applied rules since 2017)" },
      { value: "£60k", label: "Annual pension allowance (2024/25)" },
    ],
    challenges: [
      {
        title: "Off-payroll rules in the NHS since April 2017",
        body:
          "NHS trusts and boards have been responsible for IR35 status determinations since April 2017. Many locum doctors were moved to inside IR35 arrangements at that point, either through PAYE or under NHS-framework locum contracts. For those still operating through a personal service company, the status of each engagement needs to be reviewed against the current working arrangements.",
      },
      {
        title: "Annual allowance tapering and the NHS pension",
        body:
          "Locum doctors with higher incomes are subject to the tapered annual allowance, which bites only where threshold income exceeds £200,000 and adjusted income exceeds £260,000, and then cuts the £60,000 annual allowance by £1 for every £2 of adjusted income above £260,000, reaching the £10,000 floor only at £360,000 of adjusted income. This interacts directly with NHS pension accrual. An annual allowance charge can arise from NHS pension growth alone. We model this carefully, including carry-forward from previous years.",
      },
      {
        title: "Multiple income streams and self assessment complexity",
        body:
          "Doctors working across NHS employed, NHS locum and private practice income streams have some of the most complex self assessment positions in the UK. The interaction between PAYE earnings, NHS pension, PSC dividends and private practice income requires careful planning and accurate filing to avoid both under-declaration and overpayment.",
      },
      {
        title: "PSC versus umbrella for locum work",
        body:
          "For locum doctors still operating through a PSC, the comparative analysis against umbrella or direct PAYE must account for the NHS pension implications, not just headline take-home. The pension is often the dominant factor at consultant-level incomes, and the choice of engagement structure affects annual allowance charges significantly.",
      },
    ],
    howWeHelp: [
      {
        title: "Integrated income and pension planning",
        body:
          "We model the full picture (NHS employed income, locum income, pension accrual, PSC dividends and private practice) and plan the most efficient structure. For doctors, this is not separable: the parts interact in ways that only become visible when you model them together.",
      },
      {
        title: "Annual allowance management",
        body:
          "We track your pension annual allowance position each tax year, model whether carry-forward from previous years is available, and set out how to manage pension contributions to avoid unnecessary annual allowance charges.",
      },
      {
        title: "Self assessment for doctors",
        body:
          "Accurate, complete self assessment returns that account for all income sources, including NHS pension annual allowance charges, dividend income and private practice receipts. Filed on time with full records retained.",
      },
    ],
    faqs: [
      {
        question: "Can I still use a limited company for NHS locum work?",
        answer:
          "It depends on the nature of the engagement and the trust's determination. Some NHS locum arrangements remain outside IR35, particularly where the doctor has genuine substitution rights, works across multiple trusts, and is not integrated into the trust's management structure. But the off-payroll rules have applied to NHS trusts since 2017, so the trust makes the determination. We can review your specific arrangements.",
      },
      {
        question: "I have an annual allowance charge. Is this normal?",
        answer:
          "Annual allowance charges have affected many NHS consultants in recent years, particularly those whose pension growth exceeded the tapered allowance. HMRC's Scheme Pays mechanism allows the charge to be paid from the pension itself rather than out of pocket, but it reduces the eventual pension entitlement. We model the charge and the Scheme Pays election each year so you make an informed decision.",
      },
    ],
  },

  {
    slug: "oil-gas-contractors",
    title: "Oil and Gas Contractors",
    headline: "Specialist accountants for oil and gas contractors",
    metaTitle: "Oil and Gas Contractor Accountants | IR35 & Offshore Tax",
    metaDescription:
      "Tax and IR35 advice for UK oil and gas contractors. Offshore engineers, drilling specialists and subsea professionals. PSC planning, expenses and compliance.",
    intro:
      "Oil and gas contracting involves some of the most genuinely self-employed working arrangements in UK contracting, with specialist skills, genuine substitution, multiple clients, and offshore working patterns that naturally demonstrate independence. But the tax position, particularly for those working internationally, is complex and needs specialist handling.",
    stats: [
      { value: "£500–£1,200", label: "Typical day rate range (offshore higher)" },
      { value: "Lower–Variable", label: "IR35 risk (offshore patterns often strong)" },
      { value: "International", label: "Working arrangements add complexity" },
    ],
    challenges: [
      {
        title: "Offshore working and the IR35 position",
        body:
          "Offshore oil and gas work (on platforms, FPSOs, drill ships) often has the strongest self-employment characteristics of any contracting sector. Genuine substitution is common (specialists with equivalent qualifications can fill roles interchangeably), control over how technical work is performed is often limited by professional standards rather than client instruction, and there is rarely the employment-type integration found in onshore corporate roles. We help you document and defend the outside IR35 position properly.",
      },
      {
        title: "International working and double taxation",
        body:
          "Many oil and gas contractors work across multiple jurisdictions, including the North Sea (UK waters), Norway, West Africa, Middle East and Asia Pacific. Whether your income is taxable in the UK, in the host country, or split between them depends on the double taxation agreement in place and your residency position. Getting this wrong creates significant liability. We handle the UK side and refer to appropriate international specialists where needed.",
      },
      {
        title: "Travel and subsistence for offshore rotations",
        body:
          "The travel expense rules for offshore oil and gas are distinct from onshore contracting. Costs of getting to and from offshore installations are generally allowable when the offshore location qualifies as a temporary workplace. The 24-month rule can apply to onshore support roles but offshore rotations typically have a clearer position.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 review for offshore and specialist roles",
        body:
          "A specialist reviews your specific working arrangements and engagement structure. For offshore specialists, the outside IR35 case is often well-supported, and the documentation is checked so it would withstand HMRC scrutiny.",
      },
      {
        title: "International income and UK tax compliance",
        body:
          "UK self assessment that accounts correctly for international working, double taxation treaty relief, and any foreign tax credits. We work with you to ensure the UK position is accurate and efficiently structured.",
      },
      {
        title: "Expense management for rotation-based working",
        body:
          "We apply the travel and subsistence rules correctly for offshore and remote working patterns, making sure every allowable cost is captured and properly documented.",
      },
    ],
    faqs: [
      {
        question: "I work three weeks on, three weeks off on a North Sea platform. Am I inside or outside IR35?",
        answer:
          "Offshore rotation-based work typically has a stronger outside IR35 profile than onshore roles. The key factors (genuine specialist substitution, limited client direction over how technical work is performed, no permanent workplace integration) often point clearly toward self-employment. The engagement with the operator or drilling company and any agency in the chain still needs to be reviewed, and the off-payroll rules apply if your end client is a medium or large business.",
      },
      {
        question: "I work on projects in multiple countries. How does UK tax work?",
        answer:
          "If you are UK resident, your worldwide income is generally subject to UK tax, with relief available for foreign tax paid under double taxation agreements. The specifics depend on which country you are working in, how long you spend there, and whether there is a relevant treaty. We handle the UK filings and the treaty position, referring to local advisers in the host country where needed.",
      },
    ],
  },

  {
    slug: "legal-contractors",
    title: "Legal Contractors",
    headline: "Specialist accountants for locum solicitors and legal contractors",
    metaTitle: "Accountants for Locum Solicitors | Legal Contractor IR35",
    metaDescription:
      "Tax and IR35 advice for locum solicitors, contract lawyers and independent legal contractors. PSC accounting, expenses and compliance for legal professionals.",
    intro:
      "The legal profession has strong self-employment conventions, and locum solicitors and contract lawyers often have a clear outside IR35 position, but clear conventions are not the same as automatic safety. Working practices, the nature of the engagements and the size of the firms involved all affect the analysis.",
    stats: [
      { value: "£300–£800", label: "Typical day rate range" },
      { value: "Lower–Medium", label: "IR35 risk (professional conventions help)" },
      { value: "SRA", label: "Regulatory framework supports self-employment" },
    ],
    challenges: [
      {
        title: "Locum versus employed solicitor arrangements",
        body:
          "Locum solicitors covering periods of absence or working on defined caseloads have a strong self-employment profile. They bring their own professional judgement, bear professional liability, and the engagement is clearly time-limited. The risk increases where a locum is filling a permanent headcount with little distinction from a member of staff in terms of direction, hours and integration.",
      },
      {
        title: "In-house counsel contracting",
        body:
          "Contract in-house counsel roles (particularly longer-term general counsel or deputy GC roles at large organisations) face similar IR35 analysis to finance contractor roles. Integration into the senior team, direction from the CEO or board, and filling what would otherwise be a permanent vacancy all point toward employment. The legal professional context helps but does not override the fundamental IR35 tests.",
      },
      {
        title: "Multiple client working and PII",
        body:
          "Solicitors who operate across multiple client firms simultaneously, maintain their own professional indemnity insurance, and manage their own practice infrastructure have a strong self-employment case. Maintaining PII as a contractor rather than relying on the firm's cover is a meaningful indicator of genuine self-employment.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 status review for legal placements",
        body:
          "A specialist reviews the engagement against the three key tests, with specific reference to how locum and contract legal work operates in practice. The professional conventions and regulatory framework form part of the analysis.",
      },
      {
        title: "PSC accounting for legal professionals",
        body:
          "Annual accounts, CT600, Companies House filings and self assessment. For solicitors with professional conduct obligations around client account handling, we ensure the company structure is correctly maintained.",
      },
      {
        title: "Expense and allowance review",
        body:
          "Travel to firm placements, professional subscriptions (SRA practising certificate, SRA Annual Renewal, law society membership), CPD costs and professional development training are all potentially allowable. We make sure the claims are comprehensive and correctly documented.",
      },
    ],
    faqs: [
      {
        question: "As a locum solicitor, am I automatically outside IR35?",
        answer:
          "No. The legal profession's self-employment conventions are a factor in the analysis but not a safe harbour. Each engagement still needs to satisfy the three tests. Short-term locum placements covering maternity or sickness absence, where you bring your own professional autonomy and bear your own PII, typically have a strong outside position. Longer-term contract roles with employment-type integration do not.",
      },
      {
        question: "Do I need my own professional indemnity insurance as a locum?",
        answer:
          "For IR35 purposes, maintaining your own PII as a contractor (rather than operating under the firm's cover) is a meaningful indicator of genuine self-employment. It demonstrates financial risk and independent professional standing. The SRA also has specific rules about the coverage required for solicitors operating outside a regulated firm. We can confirm the position and help ensure your structure is compliant.",
      },
    ],
  },

  {
    slug: "marketing-contractors",
    title: "Marketing and Creative Contractors",
    headline: "Specialist accountants for marketing and creative contractors",
    metaTitle: "Marketing & Creative Contractor Accountants | IR35 Advice",
    metaDescription:
      "Tax and IR35 advice for freelance marketers, copywriters, designers and creative contractors. Limited company setup, PSC planning and expenses.",
    intro:
      "Marketing and creative contractors (copywriters, designers, digital marketers, brand consultants, social media specialists) often have a more straightforward IR35 position than many other sectors, but there are important exceptions. Client size, the nature of the engagement and how the work is actually performed all matter.",
    stats: [
      { value: "£200–£600", label: "Typical day rate range" },
      { value: "Lower", label: "IR35 risk (often smaller clients, deliverable-based)" },
      { value: "Small company", label: "Many clients exempt (PSC self-assesses)" },
    ],
    challenges: [
      {
        title: "Small company exemption and self-assessment",
        body:
          "Many marketing and creative contractors work with small companies (start-ups, SMEs, boutique agencies) that meet the small company exemption criteria (turnover not more than £15m, balance sheet not more than £7.5m, not more than 50 employees, met for two consecutive financial years beginning on or after 6 April 2025). In these cases, the PSC self-assesses its own IR35 status, which is both an opportunity and a responsibility. A clean outside position is likely for genuinely deliverable-based work.",
      },
      {
        title: "Embedded creative roles in large organisations",
        body:
          "Marketing and creative contractors working for large corporates (as in-house brand managers, head of content on a long-term contract, or embedded social media leads) face a different analysis. Large organisations are within the off-payroll rules, and an embedded creative role with direction from a marketing director and integration into the team looks like employment.",
      },
      {
        title: "Project-based versus retainer arrangements",
        body:
          "Retainer arrangements (where a creative contractor is paid a fixed monthly fee for ongoing availability) tend to look more like employment than project-based engagements with defined deliverables. The distinction matters for IR35 and is worth reviewing if you are on a long-running retainer with a single client.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 position review for creative engagements",
        body:
          "A specialist reviews your client mix, engagement structure and working practices to confirm your IR35 position. For small-client-focused creatives, this is often a relatively quick and straightforward exercise. For those with large corporate clients, the specifics are looked at more carefully.",
      },
      {
        title: "Limited company setup and ongoing accounting",
        body:
          "If you are considering going limited, we help you set up the PSC correctly and take over the ongoing accounting from day one. For those already operating through a PSC, we handle accounts, CT600 and self assessment.",
      },
      {
        title: "Salary and dividend planning for variable income",
        body:
          "Creative income is often variable, with strong months and quiet periods. We plan the salary and dividend structure to account for income variability, managing the cash flow position through the tax year and optimising across the year as a whole.",
      },
    ],
    faqs: [
      {
        question: "I'm a freelance copywriter. Do I need a limited company?",
        answer:
          "You do not have to operate through a limited company, but for many copywriters earning above roughly £30,000-£35,000 a year, the tax efficiency of a PSC versus sole trader is significant. Whether it is worth the administrative overhead depends on your income level, how many clients you work with, and whether your clients require you to operate through a company. We model this for you.",
      },
      {
        question: "I work with a mix of small and large clients. Does each engagement have a separate IR35 status?",
        answer:
          "Yes. IR35 status is assessed engagement by engagement, not globally. Your work for a small agency (which self-assesses, and is likely outside IR35) exists separately from your work for a large corporate (where the client determines status). We review the large-client engagements specifically and give you a clear view of where you stand on each.",
      },
    ],
  },

  {
    slug: "construction-contractors",
    title: "Construction and Architecture Contractors",
    headline: "Specialist accountants for construction and architecture contractors",
    metaTitle: "Accountants for Construction Contractors | IR35 & CIS",
    metaDescription:
      "Tax, IR35 and CIS advice for UK construction contractors, architects and quantity surveyors. PSC planning, site expenses and compliance.",
    intro:
      "Construction and architecture contractors (including architects, quantity surveyors, structural engineers, project managers and site managers) face a combination of CIS (Construction Industry Scheme) considerations, site-based travel expense complexity, and IR35 analysis that together require specialist knowledge. A generalist accountant will typically handle only one of these correctly.",
    stats: [
      { value: "£200–£600", label: "Typical day rate range (architects higher)" },
      { value: "Variable", label: "IR35 risk (project-based often cleaner)" },
      { value: "CIS + IR35", label: "Two separate frameworks (both need attention)" },
    ],
    challenges: [
      {
        title: "CIS does not replace IR35 analysis",
        body:
          "Contractors operating within the Construction Industry Scheme sometimes assume that CIS registration resolves the question of employment status. It does not. CIS is a tax withholding scheme, not an employment status determination. IR35 analysis is entirely separate and applies independently of CIS. Many construction contractors who are CIS-registered have never had a proper IR35 review.",
      },
      {
        title: "Site-based travel and the 24-month rule",
        body:
          "The 24-month rule is particularly relevant in construction, where contractors may work on a single large project for extended periods. Once a site qualifies as a permanent workplace, commuting costs cease to be allowable. For multi-phase projects or where the same development runs for several years, the analysis is not always straightforward and needs to be monitored through the contract.",
      },
      {
        title: "Professional service companies in architecture",
        body:
          "Architects and other RIBA/RICS-registered professionals often have a strong self-employment case, with project-based engagements, professional autonomy over design decisions, own professional indemnity insurance, and working across multiple projects. But roles that are essentially filling a practice's staffing capacity on an ongoing basis face similar integration risk to other embedded contractor roles.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS registration and compliance",
        body:
          "We manage your CIS position correctly, verifying subcontractor status, ensuring the right deduction rate is applied, and making sure CIS deductions are offset correctly against your corporation tax and self assessment liabilities. Many construction contractors overpay because CIS is handled incorrectly.",
      },
      {
        title: "IR35 review for construction and architecture engagements",
        body:
          "A specialist reviews each engagement against the IR35 tests independently of the CIS position. For project-based architects and specialist contractors, the outside IR35 position is often defensible. For site managers in longer-running employment-type roles, the assessment given is an honest one.",
      },
      {
        title: "Site expense management",
        body:
          "Travel, subsistence, PPE, tools and equipment, professional subscriptions. We apply the 24-month rule correctly across your project history and make sure the expense claims are comprehensive and properly documented.",
      },
    ],
    faqs: [
      {
        question: "I'm CIS registered. Do I still need to worry about IR35?",
        answer:
          "Yes. CIS is a separate mechanism. It applies to payments between contractors and subcontractors in the construction sector, and deals with withholding tax at source. IR35 is an entirely independent question about whether your engagement should be treated as employment for tax purposes. The two frameworks overlap in the construction sector but are completely separate analyses.",
      },
      {
        question: "I worked on the same development site for 26 months. Are my travel costs still allowable?",
        answer:
          "Once you have exceeded 24 months at a single workplace (or from the point at which it was clear you would do so), that site becomes a permanent workplace and ordinary commuting costs are no longer allowable. At 26 months, you would need to review from the point the 24-month threshold was reached or the expectation of reaching it arose. We can work through the position based on your specific timeline.",
      },
    ],
  },
  // Wave 1 appends, docs/contractors-ir35/_wave1/*.json, 2026-09-27, LEADS_250 S4a
  {
    slug: "first-contract-outside-ir35",
    title: "First Contract Outside IR35",
    phrase: "a first contract outside IR35",
    headline: "Accountants for your first contract outside IR35",
    metaTitle: "Accountant for First Contract Outside IR35",
    metaDescription:
      "Going limited for a confirmed outside IR35 contract? Company formation, bank, VAT, payroll, first invoice and first dividend, in the right order for 2026/27.",
    intro:
      "You have a signed contract, a start date and a determination that says outside IR35. What you do not yet have is a company, a business bank account, a payroll scheme, or a clear idea of when the first invoice goes out. That is the situation this page is written for: a professional going limited for the first time because a genuine outside IR35 engagement is about to begin. Sequence matters more than most people expect. Incorporation, the bank account, VAT registration, a PAYE scheme and the first dividend each carry their own timing, and taking them out of order costs you either tax or a fortnight of waiting while the agency holds your invoice. This page sets out the order that works, and what has to happen in the week the first invoice falls due.",
    stats: [
      { value: "£90,000", label: "VAT registration threshold, frozen since 1 April 2024" },
      { value: "10.75%", label: "Basic rate dividend tax from 6 April 2026, up from 8.75%" },
      { value: "19% to 25%", label: "Corporation tax on company profits, 2026/27" },
      { value: "£6,708", label: "Lower earnings limit, the common single director salary target for 2026/27" },
    ],
    challenges: [
      {
        title: "Getting the set-up steps in the wrong order",
        body:
          "Incorporation is the quick part. What follows is slower: a business bank account that needs identity checks, a PAYE scheme that takes time to issue references, a VAT number that arrives weeks after you apply, and an agency onboarding pack that will not clear until the company details match. Start the slow items first and the first invoice goes out on time. The running order is set out in our <a href=\"/blog/contractor-accounting-basics/first-contract-outside-ir35-checklist\">first outside IR35 contract setup checklist</a>.",
      },
      {
        title: "Deciding whether to register for VAT at all",
        body:
          "Registration is compulsory once VAT taxable turnover passes £90,000 in any rolling 12 months, or is expected to in the next 30 days, and a full time day rate reaches that quickly. Many first time contractors register voluntarily before then, because a VAT registered end client recovers the VAT charged and your invoice costs them no more. The Flat Rate Scheme looks attractive until the limited cost trader test applies: spend less than 2% of turnover on goods and the rate is 16.5%, which wipes out most of the benefit for a labour only contractor.",
      },
      {
        title: "Taking money out before the company has set tax aside",
        body:
          "The bank balance is not yours. Corporation tax runs at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief in between giving an effective rate of about 26.5%, and VAT collected belongs to HMRC. Dividends can only come from profit after corporation tax. First year contractors routinely draw the full balance, then meet a bill nine months later with nothing left to pay it.",
      },
      {
        title: "Outside on paper, employee in practice",
        body:
          "A determination from the client, or a CEST result, is a useful first screen and worth keeping on file. Neither binds a tribunal, and neither survives working practices that contradict them. If the client sets your hours, directs how the work is done and would never accept a substitute, the wording will not hold the position. Both need checking, at the start and on every renewal.",
      },
    ],
    howWeHelp: [
      {
        title: "Company formation and the tax registrations",
        body:
          "Formation at Companies House, share structure, registered office, the corporation tax registration, a PAYE scheme where you will run payroll, and a VAT application if you are registering. Each registration is tracked until its reference lands, so you know exactly which step is holding up the agency pack. Background on structure is set out in <a href=\"/blog/contractor-accounting-basics/set-up-limited-company-contractor\">how to set up a limited company for contracting</a>.",
      },
      {
        title: "A read of the contract you have already signed",
        body:
          "The signed contract is read against how the job will really be run: control over hours and method, the substitution right and whether the client would honour it, and whether the role fills what would otherwise be a permanent seat. Where paperwork and practice diverge, you get a plain list of what would need to change.",
      },
      {
        title: "Payroll, VAT returns and the first invoice",
        body:
          "Salary set at a level chosen for your circumstances rather than a default, real time information submissions from the first pay run, and the VAT decision modelled both ways before you commit. Sanity check the numbers yourself with the <a href=\"/calculators/outside-ir35-take-home-calculator\">outside IR35 take home calculator</a> before the first invoice goes out.",
      },
      {
        title: "The first dividend, and its paperwork",
        body:
          "Before money moves, the company needs management figures showing distributable profit, a board minute and a dividend voucher. Timing across the 6 April line matters too, because dividend rates for 2026/27 are 10.75% and 35.75% after the £500 allowance. The split between salary and dividend is modelled for the year rather than guessed monthly, and the <a href=\"/calculators/contractor-salary-dividend-calculator\">salary and dividend calculator</a> shows the shape of it.",
      },
    ],
    faqs: [
      {
        question:
          "How long before my start date should I form the company?",
        answer:
          "Four to six weeks is comfortable. Incorporation itself is usually same day, but the business bank account, the PAYE references and a VAT number all run on their own clocks, and agency onboarding will not complete without company and bank details that match. If your start date is next week, the company can still be formed in time to invoice, but expect the bank account and the VAT number to land after you have started work.",
      },
      {
        question:
          "What salary should I pay myself in the first year?",
        answer:
          "For a single director company with no other employees, the Employment Allowance of £10,500 is not available, so the usual range sits between the secondary threshold of £5,000 and the lower earnings limit of £6,708 for 2026/27. The lower earnings limit protects a qualifying National Insurance year. Where the company can claim the allowance, a salary up to £12,570 is often better. Your other income changes the answer, so model it rather than assume.",
      },
      {
        question:
          "When can I take my first dividend?",
        answer:
          "Once the company has distributable profit, meaning profit after corporation tax and after allowing for the VAT and payroll it still owes. In practice that is after the first invoice has been paid and the reserves have been checked. Each dividend needs a board minute and a voucher, and the amount belongs in the tax year the payment is made. Drawing money with no distributable profit creates a director loan, not a dividend.",
      },
      {
        question:
          "My client says they are small, so does the off-payroll regime still apply?",
        answer:
          "If the end client genuinely qualifies as small, the off-payroll rules in Chapter 10 do not apply and responsibility for status stays with your own company under Chapter 8. The small company thresholds rose for financial years beginning on or after 6 April 2025, to turnover of £15m and a balance sheet total of £7.5m, the 50 employee limit unchanged. Because of the two consecutive years rule and the filing lag, the earliest a previously medium client drops out is 6 April 2027. Assume they are still in scope for 2026/27.",
      },
      {
        question:
          "Can I claim travel to the client site?",
        answer:
          "On an outside IR35 engagement, travel to a temporary workplace is generally allowable, but the workplace stops being temporary once you spend, or expect to spend, more than 40% of your working time there over a period exceeding 24 months. The test turns on expectation, so relief stops when you know the engagement will run past 24 months, not at month 24. Mileage in your own car is 55p a mile for the first 10,000 business miles from 6 April 2026.",
      },
    ],
  },
  {
    slug: "ir35-contract-review",
    title: "IR35 Contract Review",
    phrase: "an IR35 contract review",
    headline: "IR35 contract reviews for contractors before they sign",
    metaTitle: "IR35 Contract Review for UK Contractors | 2026/27",
    metaDescription:
      "What an IR35 contract review covers in 2026/27: the status tests, written terms against working practices, and the 45-day disagreement process.",
    intro:
      "You have a new or renewed contract in front of you, or a client has handed you a determination saying inside IR35 and you think it is wrong. Either way the question is the same: do the written terms and the way the work will actually run point to self-employment or to employment? An IR35 contract review answers that. A specialist reads the contract, the upper-level agreement where an agency sits in the chain, and your account of how the work is really directed, then sets both against the status tests and marks the weak points. Where the client is medium or large it decides your status, so the review also covers reasonable care and the 45-day disagreement route.",
    stats: [
      { value: "3", label: "Tests in the irreducible minimum: personal service, control, mutuality" },
      { value: "45 days", label: "Client deadline to respond to a status disagreement (ITEPA s.61T)" },
      { value: "6 Apr 2027", label: "Earliest a previously medium client can leave the off-payroll rules" },
      { value: "[2024] UKSC 29", label: "PGMOL, the Supreme Court's latest word on status" },
    ],
    challenges: [
      {
        title: "The status tests, without the jargon",
        body:
          "There is no statutory definition of employment for tax. Status comes from case law, starting with Ready Mixed Concrete [1968] 2 QB 497: personal service (can you genuinely send a substitute), control (how far the client directs what you do, how, when and where), and mutuality of obligation (an obligation to offer and accept paid work). PGMOL [2024] UKSC 29 confirmed control and mutuality can both be present and still not settle it. What decides it is the whole picture, and whether you are in business on your own account. More in <a href=\"/blog/ir35-status/ir35-status-tests-explained\">the status tests explained</a>.",
      },
      {
        title: "Paperwork is only half of what gets judged",
        body:
          "A clean contract sitting on top of employee-like working practices will not hold. HMRC and the tribunals look at what actually happens: who sets your hours, whether you sit inside the client's line management, whether a substitute would ever be accepted. Expect questions about the day to day, not just the clauses. A substitution clause nobody could use is the clearest case.",
      },
      {
        title: "Who decides your status depends on the client's size",
        body:
          "Two regimes run side by side. Where the end client is medium or large, the off-payroll rules apply: the client must issue a Status Determination Statement, and PAYE is operated before your invoice is paid by the fee payer, normally the agency closest to your company. Where the client is small, or wholly overseas with no UK connection, the original rules stay with your own company. The small-company thresholds rose for financial years beginning on or after 6 April 2025, but with the filing lag and the two consecutive years rule the earliest a previously medium client leaves scope is 6 April 2027. For 2026/27, assume yours is in.",
      },
      {
        title: "When the determination looks wrong",
        body:
          "Under those rules a determination has to carry a conclusion, the reasons behind it and evidence of reasonable care, and it has to reach both you and the next party in the chain. A blanket inside call across a whole category of roles, with no individual assessment, is very likely a failure of reasonable care, which can invalidate the statement and leave the liability with the client. Representations go through the client-led disagreement process, and the client has 45 days to respond. The timetable is in <a href=\"/blog/ir35-status/sds-status-determination-statement\">the guide to determination statements</a>.",
      },
      {
        title: "What a review gives you, and what it does not",
        body:
          "Out of a review comes a reasoned read of your position, the terms and practices pulling the wrong way, wording worth renegotiating before signature, and a dated record you can point to later. No guarantee comes with it, because status is decided on the facts of the engagement as it runs. HMRC's CEST tool shares that limit, which is why a determination resting on it is not the last word either.",
      },
    ],
    howWeHelp: [
      {
        title: "Reading the whole chain, not one document",
        body:
          "A specialist reviews the contract you are being asked to sign and, where an agency sits in between, the upper-level agreement too. Terms in the chain above you can contradict the ones in front of you, which is where clean-looking contracts fall down.",
      },
      {
        title: "Testing the wording against the working practices",
        body:
          "Questions about the real engagement follow the read: who directs the work, what happens if you are unavailable, whether you can turn down extra tasks, whose equipment you use. Those answers meet the tests a tribunal would apply.",
      },
      {
        title: "Preparing the case before you sign",
        body:
          "Where the risk sits in wording that can be changed, a specialist prepares the amendments to put to the agency or client, and flags the working practices that need to change with them.",
      },
      {
        title: "Building the file behind a disagreement",
        body:
          "If a determination is being challenged, a specialist assembles the written representations and the evidence on each test. The step by step route is covered in <a href=\"/blog/ir35-status/challenge-ir35-determination-sds\">how to challenge an inside determination</a>.",
      },
      {
        title: "A first read before you commit",
        body:
          "Ahead of a full review, the <a href=\"/calculators/ir35-status-indicator\">IR35 status indicator</a> walks the same tests and shows which way each one points. Treat it as a screen telling you whether a review is worth arranging, never as a determination.",
      },
    ],
    faqs: [
      {
        question:
          "Can a review guarantee my contract is outside IR35?",
        answer:
          "No, and treat any offer of a guarantee with suspicion. Status is a multi-factorial judgement made on the facts of the engagement as it runs, and only a tribunal settles it finally. What you get instead is a reasoned position and a dated record of it. That record matters if HMRC opens an enquiry years later, because it shows care was taken at the time.",
      },
      {
        question:
          "My client used CEST and it said inside. Is that the end of it?",
        answer:
          "Not necessarily. CEST is a screening tool, and HMRC will stand behind a result where the answers are accurate, consistent with the working practices, in line with the guidance and free of avoidance. It does not bind a tribunal, its handling of mutuality of obligation is narrower than the case law, and a result built on answers that do not match the real engagement is worthless. Where the inputs were wrong, so is the output.",
      },
      {
        question:
          "Who decides my status if my client is a small company?",
        answer:
          "Your own company does. The off-payroll rules shift the decision to the end client only where that client is medium or large, or a public body. Where the client is small under the Companies Act tests, or wholly overseas with no UK connection, the original rules apply and your company assesses its own status. That makes a documented review more important, because no client statement stands behind the position.",
      },
      {
        question:
          "What should I have ready before a review starts?",
        answer:
          "The contract you have been offered, the upper-level agreement if an agency is involved, any statement of work or schedule, the determination and its reasons where one has been issued, and a plain description of how the engagement will run day to day. The <a href=\"/blog/ir35-status/ir35-contract-review-checklist\">contract review checklist</a> lists the clauses that matter most.",
      },
      {
        question:
          "Does a review help if I have already been determined inside?",
        answer:
          "Yes. It establishes whether the determination stands up on the tests and whether it was reached with reasonable care, which is the ground most successful disagreements are argued on. The client must respond to representations within 45 days, confirming with reasons or issuing a new statement. Even where it holds, you finish with a clear view of what would have to change for a future renewal.",
      },
    ],
  },
  {
    slug: "umbrella-to-limited-company",
    title: "Umbrella to Limited Company",
    phrase: "a move from umbrella to a limited company",
    headline: "Moving from umbrella to your own limited company",
    metaTitle: "Umbrella to Limited Company Accountant | Setup Handled",
    metaDescription:
      "Moving from an umbrella to your own limited company for an outside IR35 contract. Formation, PAYE, VAT, first payroll and dividends handled for 2026/27.",
    intro:
      "You are paid through an umbrella, you have an outside IR35 contract in hand or a client willing to engage a personal service company, and you want the switch handled rather than researched. The work splits three ways: ending the umbrella employment cleanly, incorporating and registering for the right taxes, and getting the first payroll and dividend right so the year does not need unpicking later. Most of it is sequencing. Companies House takes a day; the PAYE scheme, the VAT decision and the timing against a running assignment are where people lose weeks. A specialist reviews where you sit in the assignment and what the umbrella has already taxed. Figures here are 2026/27.",
    stats: [
      { value: "£90,000", label: "VAT registration threshold, frozen since 1 April 2024" },
      { value: "15%", label: "Employer NIC above £5,000, funded from your umbrella assignment rate" },
      { value: "16.5%", label: "Flat rate scheme percentage for a limited cost trader" },
      { value: "6 April 2026", label: "Umbrella PAYE joint and several liability starts" },
    ],
    challenges: [
      {
        title: "Timing the switch against a running assignment",
        body:
          "Leaving an umbrella part way through an assignment is a contractual question before it is a tax one. The agency has to agree to contract with a company rather than pay you through a provider on its preferred supplier list, the end client has to accept a personal service company, and the umbrella employment has to end on notice. Get the order wrong and there is a week with nothing payable in the chain. On whether the move is worth making, see <a href=\"/blog/umbrella-vs-limited-company/switching-umbrella-to-limited-company\">when umbrella to limited makes sense</a>.",
      },
      {
        title: "What the umbrella has already taxed",
        body:
          "Your umbrella has run PAYE cumulatively since 6 April, so part of your personal allowance and basic rate band is used, and the final payslip should settle accrued holiday pay. Employer National Insurance at 15%, the Apprenticeship Levy at 0.5% and the provider margin all came out of the assignment rate, which is why an umbrella day rate never matched the company equivalent. From 6 April 2026 the agency that contracts with the end client, or the client where there is no agency, is jointly and severally liable for PAYE the umbrella fails to remit; the umbrella stays the employer. There is a walkthrough in <a href=\"/blog/umbrella-vs-limited-company/umbrella-company-deductions-explained\">reading your umbrella payslip</a>.",
      },
      {
        title: "The VAT decision, and the flat rate scheme",
        body:
          "Registration is compulsory once VAT taxable turnover passes £90,000 in a rolling twelve months; deregistration sits at £88,000, both frozen since 1 April 2024. The flat rate scheme needs care: labour only work almost always meets the limited cost trader test, under 2% of turnover or under £1,000 a year on goods, forcing the 16.5% rate and wiping out most of the benefit. The test applies every period. See <a href=\"/blog/mtd-and-compliance/flat-rate-vat-limited-cost-trader\">the limited cost trader rule</a>.",
      },
      {
        title: "First payroll, and the first dividend",
        body:
          "Where you are the only director and there are no other employees, the £10,500 Employment Allowance is not available, so salary targets usually sit between the £5,000 secondary threshold and the £6,708 lower earnings limit, the latter buying a qualifying National Insurance year for a small slice of employer NIC. With the allowance available, £12,570 is often better, and no single salary is optimal for everyone. Dividends are separate: paid from profit after corporation tax, taxed at 10.75%, 35.75% and 39.35% from 6 April 2026.",
      },
      {
        title: "The expenses that change",
        body:
          "Coming out of an umbrella does not open up travel relief automatically. A client site stops being a temporary workplace once you expect to spend more than 40% of your working time there over a period exceeding 24 months, and relief stops when that expectation forms, not at month 24. Outside IR35 keeps the relief subject to that rule; inside, home to client travel is generally not deductible. Mileage in your own car is 55p for the first 10,000 business miles and 25p after, from 6 April 2026. The bigger lever is an employer pension contribution, free of National Insurance and deductible for the company.",
      },
    ],
    howWeHelp: [
      {
        title: "A review before you give notice",
        body:
          "The contract offered, the working practices behind it and the rate are weighed together, then what the switch changes in cash terms is set out. Run your own numbers first on the <a href=\"/calculators/umbrella-vs-limited-calculator\">umbrella against limited company calculator</a>. Clean wording over employee like working practices will not hold, so both are checked.",
      },
      {
        title: "Formation and the registrations, in order",
        body:
          "Incorporation, the identity verification alongside it, share structure, registered office, the PAYE scheme, the corporation tax record and the VAT choice. Your accountant prepares each registration and tracks the references as they arrive, so the company can invoice without a gap. Steps are in <a href=\"/blog/contractor-accounting-basics/set-up-limited-company-contractor\">setting up a limited company for contracting</a>.",
      },
      {
        title: "The first payroll and the first dividend",
        body:
          "Payroll is prepared and the real time information filed, with the P45 year to date figures carried over so your tax code starts from the right place. Salary is modelled against Employment Allowance eligibility. Once there is distributable profit, the dividend paperwork follows: board minute, voucher, and a record of what stays behind.",
      },
      {
        title: "The first year of filings, planned not chased",
        body:
          "Annual accounts, the CT600, the confirmation statement, VAT returns on the scheme you picked, and self assessment for your salary and dividends. Dates are fixed at the start against the accounting reference date, and the corporation tax position is looked at before the year closes, while a pension contribution can still move it.",
      },
    ],
    faqs: [
      {
        question:
          "Can I switch mid-contract, or wait for a renewal?",
        answer:
          "Both happen. The blocker is rarely tax and usually the chain, and some agencies will move you only at renewal while others novate mid-assignment. Ask before you resign, so the umbrella employment ending and the company contract starting line up.",
      },
      {
        question:
          "What happens to my holiday pay and my P45?",
        answer:
          "Accrued holiday pay is yours and must be paid out rather than retained, so check the final payslip against what you accrued and took. The P45 carries your pay and tax to date, which the company payroll needs so your personal allowance is not given twice.",
      },
      {
        question:
          "Should I register for VAT straight away?",
        answer:
          "Registration becomes compulsory once VAT taxable turnover exceeds £90,000 in a rolling twelve months, or is expected to within thirty days, and most contractors on a normal rate reach that inside a year. Registering voluntarily earlier lets the company reclaim input VAT and costs a VAT registered client nothing, so the decision turns on your rate and start date.",
      },
      {
        question:
          "Is the flat rate scheme worth it?",
        answer:
          "Usually not. Labour only contracting almost always fails the goods test, which forces the 16.5% rate and removes nearly all of the gain. Genuine, regular goods spend changes that, so both methods are modelled on your own figures before either is picked.",
      },
      {
        question:
          "How soon can I take a dividend?",
        answer:
          "Only once there is distributable profit, meaning profit after corporation tax has been provided for, and only with the paperwork behind it. Cash drawn before that is a director's loan, which carries a section 455 charge on the company if still outstanding nine months and one day after the year end.",
      },
      {
        question:
          "What if a later contract turns out to be inside IR35?",
        answer:
          "Keeping the company is often still sensible. It earns its keep where you also hold outside IR35 work, want to retain profit, or use it for employer pension contributions. For a genuinely inside engagement an umbrella is frequently simpler and cheaper, so plenty of contractors run both. The mix of work drives the answer, not a preference for one structure.",
      },
    ],
  },
  {
    slug: "inside-ir35",
    title: "Contractors Inside IR35",
    phrase: "contractors inside IR35",
    headline: "Specialist accountants for contractors caught inside IR35",
    metaTitle: "Inside IR35 Accountants | Keep, Close or Go Umbrella",
    metaDescription:
      "Caught inside IR35? What the determination does to your pay, what your limited company can still do, and whether to keep it, close it or move to an umbrella.",
    intro:
      "Your client has determined the engagement inside IR35, so the fee-payer now runs PAYE and employee National Insurance on the money before it reaches your company, and pays employer National Insurance at 15% on top. The income arrives already taxed. Three routes are open and none is automatically right: keep the company trading for outside work, hold it dormant while you sit inside, or close it and take the reserves out. Which one wins turns on your reserves, what you intend to contract on next, and how long the engagement runs. The determination itself is also worth testing before you commit.",
    stats: [
      { value: "45 days", label: "Your client's deadline to answer a disagreement" },
      { value: "15%", label: "Employer NIC funded from the assignment rate" },
      { value: "0%", label: "Expenses allowance under Chapter 10 (the 5% is gone)" },
      { value: "18%", label: "BADR rate on disposals from 6 April 2026" },
    ],
    challenges: [
      {
        title: "The determination may not have been made with reasonable care",
        body:
          "A client who applies \"inside\" across a whole category of roles, without looking at the engagement itself, has probably failed the reasonable care test. Where that happens the Status Determination Statement is invalid and the client itself becomes the deemed employer for the PAYE and NIC. The same follows where the statement was never passed down the chain. <a href=\"/blog/ir35-status/sds-status-determination-statement\">What a valid statement looks like</a>.",
      },
      {
        title: "Which chapter applies changes the arithmetic",
        body:
          "Medium and large clients sit under Chapter 10: the fee-payer operates PAYE and there is no 5% administrative expenses allowance. Where the client is small, or wholly overseas with no UK connection, responsibility stays with your own company under Chapter 8 and the 5% deduction survives. Two contractors on the same rate can keep different amounts. <a href=\"/blog/ir35-status/deemed-employment-payment-explained\">How the deemed payment works</a>.",
      },
      {
        title: "Expenses you relied on stop being deductible",
        body:
          "Home to client travel is generally not deductible on an inside engagement: each engagement counts as a separate employment, so that site is a permanent workplace for it. Subsistence on the journey goes with it. Outside engagements keep temporary workplace relief, subject to the 24 month and 40% expectation rule.",
      },
      {
        title: "Deciding what the company does next",
        body:
          "A dormant company costs almost nothing to hold and keeps the door open to outside work. Closing is the bigger step: a Members' Voluntary Liquidation can take reserves out as capital, potentially within Business Asset Disposal Relief at 18% from 6 April 2026, but the winding-up TAAR can recharacterise that as an income dividend where you carry on a same or similar trade within two years.",
      },
      {
        title: "Umbrella arrangements are not all the same",
        body:
          "An umbrella becomes your legal employer and takes the admin away, but employer NIC at 15%, the Apprenticeship Levy and the umbrella's margin all come out of the assignment rate, so it is not comparable with a limited company day rate. From 6 April 2026 the agency contracting with the end client is jointly and severally liable for PAYE the umbrella fails to remit.",
      },
    ],
    howWeHelp: [
      {
        title: "Reading the determination against the working practices",
        body:
          "A specialist reads the statement against how the engagement actually runs: control, substitution, mutuality, and whether the reasons given are specific to you or lifted across a role type. Where it looks like a blanket call, the written representations are drafted and the 45 day window tracked. <a href=\"/blog/ir35-status/challenge-ir35-determination-sds\">Challenging a determination</a>.",
      },
      {
        title: "Modelling keep, dormant, close and umbrella together",
        body:
          "The four routes are costed on your own figures: reserves in the company, the tax still to come on extracting them, the cost of holding a dormant company, and what an umbrella leaves after employer NIC, the levy and margin. Start with the <a href=\"/calculators/inside-ir35-take-home-calculator\">inside IR35 take-home calculator</a>.",
      },
      {
        title: "Keeping the company compliant while it earns less",
        body:
          "Trading on, dormant or winding down, the filings continue: accounts, the CT600, confirmation statements, PAYE and VAT deregistration, and your self assessment. Inside-IR35 income is tracked so it is not taxed twice when you draw it.",
      },
      {
        title: "Preparing a closure that survives scrutiny",
        body:
          "If closing is the answer, the reserve position is set out, any director's loan cleared before the section 455 charge falls due, and the four TAAR conditions tested against what you plan next. The two year same or similar trade condition is the trap for anyone who expects to keep contracting. <a href=\"/blog/limited-company-tax/closing-contractor-limited-company\">Closing a contractor company</a>.",
      },
      {
        title: "Planning a year that holds both kinds of engagement",
        body:
          "Many contractors hold one inside and one outside engagement in the same year. That mix moves the salary and dividend position, the expenses still available and the room left for an employer pension contribution, the largest lever open to you.",
      },
    ],
    faqs: [
      {
        question:
          "Should I close my limited company now that I am inside IR35?",
        answer:
          "Not automatically. The determination attaches to one engagement, not to you permanently, and a dormant company is cheap to hold while you look for outside work. Closing earns its keep where reserves are significant and no outside pipeline is realistic. Check the winding-up TAAR first: where you continue a same or similar trade within two years of the distribution, what you took as capital can be taxed as an income dividend.",
      },
      {
        question:
          "Can I still claim travel to the client site?",
        answer:
          "Generally no. Each inside engagement is treated as a separate employment, so the client's site is a permanent workplace for it and the journey is ordinary commuting. Subsistence bought on it goes the same way. Travel to a separate outside engagement can still qualify, provided you have not spent, and do not expect to spend, more than 40% of your working time at that site over a period longer than 24 months.",
      },
      {
        question:
          "How long does my client have to answer if I disagree?",
        answer:
          "Forty five days. Under the client-led disagreement process the end client must consider your written representations and respond within 45 days, either confirming the determination with reasons or issuing a new one. The client still makes the decision, but it cannot ignore you. Where it never took reasonable care over the original statement, or never passed it down the chain, the PAYE liability sits with the client rather than the fee-payer.",
      },
      {
        question:
          "Is an umbrella better than keeping the company inside IR35?",
        answer:
          "Simpler, not necessarily better. The umbrella employs you and removes the filing burden, but employer NIC, the Apprenticeship Levy and the margin come out of the assignment rate, so compare net figures rather than headline rates. Ask for the Key Information Document before signing and treat an unusually high promised take-home as a warning sign. Holding a dormant company alongside umbrella work keeps your route back to outside engagements open.",
      },
      {
        question:
          "Does the raised small-company threshold take my client out of scope?",
        answer:
          "Probably not yet. The thresholds rose to turnover of £15m, a balance sheet total of £7.5m and 50 employees for financial years beginning on or after 6 April 2025, and two of the three must be met. The test looks back to the client's last financial year ending before the tax year, and status normally changes over two consecutive years, so a client that counted as medium is unlikely to leave scope before 6 April 2027.",
      },
      {
        question:
          "Will an inside determination raise questions about my earlier contracts?",
        answer:
          "One determination is not a finding about your history. HMRC can still enquire into earlier years, so the record of each engagement matters: the contract, the working practices, any review taken at the time. Since 6 April 2024 HMRC can set off tax you and the company already paid against a deemed employer's liability, reducing, though not removing, the cost of an earlier outside position that proves wrong.",
      },
    ],
  },
];

export function getContractorType(slug: string): ContractorType | undefined {
  return contractorTypes.find((t) => t.slug === slug);
}
