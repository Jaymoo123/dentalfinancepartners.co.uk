export interface ContractorType {
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
  testimonial?: { quote: string; attribution: string };
}

export const contractorTypes: ContractorType[] = [
  {
    slug: "it-contractors",
    title: "IT Contractors",
    headline: "Specialist accountants for IT contractors",
    metaTitle: "Accountants for IT Contractors | IR35 & Limited Company Tax",
    metaDescription:
      "Specialist contractor accounting for UK IT professionals. IR35 status reviews, PSC tax planning, salary and dividend optimisation. Plain English, fixed fees.",
    intro:
      "IT contracting is the largest sector in UK contracting and carries some of the most complex IR35 exposure. Long-running engagements, client-directed methodologies and the reality of how developers and architects actually work can push an engagement toward inside IR35 even when the contract wording looks clean.",
    stats: [
      { value: "£400–£800", label: "Typical day rate range" },
      { value: "~350k", label: "IT contractors in the UK" },
      { value: "Higher", label: "IR35 risk (control test often triggered)" },
    ],
    challenges: [
      {
        title: "Control test in technology roles",
        body:
          "When a client dictates the technology stack, mandates your hours, requires you to attend daily standups and directs your sprint priorities, they are exercising control, even if your contract says otherwise. HMRC looks at what actually happens, not what the contract states. In software and infrastructure roles, genuine autonomy over how you do the work is the exception, not the rule.",
      },
      {
        title: "Mutuality of obligation in long engagements",
        body:
          "A contract renewal after renewal with the same client (especially if you are filling what would otherwise be a permanent headcount role) builds a picture of mutuality of obligation. The longer you have been with one client, the more important it is that we review the position properly, not just assume the original status still holds.",
      },
      {
        title: "Substitution clauses that are not genuine",
        body:
          "Most IT contractor agreements include a substitution clause, but HMRC is sceptical if a client would never actually accept a substitute, or if the contractor has never used the right. We look at whether substitution is contractually unrestricted and practically realistic, not just whether the clause exists.",
      },
      {
        title: "Inside IR35 via an agency chain",
        body:
          "If your end client is a medium or large business, the off-payroll working rules apply and they are responsible for issuing an SDS. Many IT contractors receive inside determinations, often incorrectly. We help you understand your rights and, where the determination is wrong, support the formal disagreement process.",
      },
    ],
    howWeHelp: [
      {
        title: "IR35 contract review before signing",
        body:
          "Before you sign a new contract, we review both the written terms and discuss how the role will actually work. We identify risk areas and, where possible, recommend changes to wording or working practices that materially improve your position.",
      },
      {
        title: "Limited company tax and annual accounts",
        body:
          "Your PSC accounts, CT600, Companies House filings and self assessment handled cleanly each year. For IT contractors we also model the corporation tax position as rates shift, particularly the marginal relief band between £50,000 and £250,000.",
      },
      {
        title: "Salary and dividend optimisation",
        body:
          "We calculate the optimal director salary and dividend split for your personal circumstances each tax year, accounting for your day rate, expenses, pension contributions and any other income you have.",
      },
    ],
    faqs: [
      {
        question: "My agency says my contract is outside IR35. Do I need to check?",
        answer:
          "Yes. Agencies have a commercial interest in making placements, and their view of IR35 status is not a substitute for proper analysis. The SDS obligation sits with the end client (for medium and large businesses), not the agency. We regularly review contracts that have been loosely described as outside IR35 and find the working practices do not support that position.",
      },
      {
        question: "Can I work outside IR35 if I am a developer embedded in a client team?",
        answer:
          "It depends on the specifics, but embedded roles are where the control test is most frequently triggered. If you attend daily standups directed by the client, cannot choose your own technology approach, and are expected to be at the client's office or on their systems during set hours, the engagement looks like employment. Changes to working practices (not just contract wording) are sometimes needed.",
      },
      {
        question: "Does inside IR35 mean I should close my limited company?",
        answer:
          "Not necessarily. Even inside IR35, a limited company gives you flexibility to work on other contracts that may be outside IR35. There are also legitimate advantages around pension contributions and the employment allowance. We model the full picture before recommending a change of structure.",
      },
    ],
    testimonial: {
      quote:
        "The SDS came back inside IR35. We reviewed the actual working arrangements, made three practical changes, and challenged it through the formal process. The revised determination came back outside. £18,000 difference.",
      attribution: "Senior developer, financial services client (outside IR35 post-challenge)",
    },
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
          "We review your contract against the three key tests with specific knowledge of how engineering roles typically work in practice. Site-based roles, framework placements and specialist project work each have different risk profiles.",
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
          "We review the specific nature of your engagement, not just the contract. Interim roles that are genuinely project-based with clear deliverables and limited integration look different from permanent headcount substitution, and we know which arguments work and which do not.",
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
      "Tax and IR35 planning for UK independent management consultants. Strategy, operations and change management specialists. Fixed fees, plain English advice.",
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
          "We review your engagement letters and statements of work against IR35 criteria. If you are engaged on a deliverables basis, we help you ensure the documentation reflects that clearly and consistently.",
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
          "We look at both what the contract says and how the role actually operates. For project managers, the practical reality of governance arrangements, reporting lines and how priorities are set is what drives the IR35 analysis.",
      },
      {
        title: "Inside IR35 structure optimisation",
        body:
          "If you are inside IR35, there are still planning opportunities, including pension contributions from the PSC, income timing, and operating alongside other outside IR35 contracts. We make sure the structure is as efficient as possible even where the status cannot be changed.",
      },
      {
        title: "SDS challenge support",
        body:
          "Where a client's status determination appears incorrect, we support the formal challenge process, reviewing the SDS, preparing the representation, and managing the 45-day response window.",
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
          "Locum doctors with higher incomes are subject to the tapered annual allowance, which reduces the pension annual allowance from £60,000 down to £10,000 for those with adjusted income above £260,000. This interacts directly with NHS pension accrual. An annual allowance charge can arise from NHS pension growth alone. We model this carefully, including carry-forward from previous years.",
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
          "We track your pension annual allowance position each tax year, model whether carry-forward from previous years is available, and advise on managing pension contributions to avoid unnecessary annual allowance charges.",
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
    metaTitle: "Accountants for Oil and Gas Contractors | IR35 & Offshore Tax",
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
          "Many oil and gas contractors work across multiple jurisdictions, including the North Sea (UK waters), Norway, West Africa, Middle East and Asia Pacific. Whether your income is taxable in the UK, in the host country, or split between them depends on the double taxation agreement in place and your residency position. Getting this wrong creates significant liability. We advise on the UK side and refer to appropriate international specialists where needed.",
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
          "We review your specific working arrangements and engagement structure. For offshore specialists, the outside IR35 case is often well-supported. We help ensure it is documented to withstand HMRC scrutiny.",
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
          "If you are UK resident, your worldwide income is generally subject to UK tax, with relief available for foreign tax paid under double taxation agreements. The specifics depend on which country you are working in, how long you spend there, and whether there is a relevant treaty. We handle the UK filings and advise on the treaty position, referring to local advisers in the host country where needed.",
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
          "We review the engagement against the three key tests with specific reference to how locum and contract legal work operates in practice. The professional conventions and regulatory framework form part of the analysis.",
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
    metaTitle: "Accountants for Marketing & Creative Contractors | IR35 Advice",
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
          "Many marketing and creative contractors work with small companies (start-ups, SMEs, boutique agencies) that meet the small company exemption criteria (turnover not more than £15m, balance sheet not more than £7.5m, fewer than 50 employees, for financial years beginning on or after 6 April 2025). In these cases, the PSC self-assesses its own IR35 status, which is both an opportunity and a responsibility. A clean outside position is likely for genuinely deliverable-based work.",
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
          "We review your client mix, engagement structure and working practices to confirm your IR35 position. For small-client-focused creatives, this is often a relatively quick and straightforward exercise. For those with large corporate clients, we look more carefully at the specifics.",
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
          "We review each engagement against the IR35 tests independently of the CIS position. For project-based architects and specialist contractors, the outside IR35 position is often defensible. For site managers in longer-running employment-type roles, we give an honest assessment.",
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
];

export function getContractorType(slug: string): ContractorType | undefined {
  return contractorTypes.find((t) => t.slug === slug);
}
