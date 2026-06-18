// Construction-CIS trade pages: business batch 2
// Audiences: civil-engineering-firms, mechanical-electrical-contractors,
//   maintenance-and-fm-companies, plant-hire-companies, multi-trade-building-firms
// All segment: "business" | Director/FD audience | Figures locked per docs/construction-cis/house_positions.md 2026-06-12
// Maintenance/CIS boundary source: CIS 340 (HMRC, updated Dec 2024) -- repairs/making-good = inside CIS;
//   routine maintenance on premises not undergoing construction operations = outside CIS.
// No import required: plain literals matching TradeType exactly.

export const business2Trades = [
  {
    slug: "civil-engineering-firms",
    segment: "business" as const,
    title: "Civil Engineering Firms",
    headline: "CIS accounting and compliance for civil engineering firms",
    metaTitle: "Accountants for Civil Engineering Firms | CIS Specialists",
    metaDescription:
      "CIS compliance, GPS and contractor accounting for civil engineering firms. Framework contracts, retention chains and April 2026 anti-fraud rules covered.",
    intro:
      "Civil engineering firms operate at the complex end of the Construction Industry Scheme. Long-duration framework contracts, multi-tier subcontractor chains, substantial plant and materials supply, and retention periods that can run for years: each of these creates CIS obligations and cash-flow pressure that require proper management at director and finance director level. Since 6 April 2026, the GPS anti-fraud rules under Finance Act 2026 have raised the compliance stakes further. A firm that cannot demonstrate documented due diligence at every payment now risks losing GPS without notice and a five-year ban on reapplication.",
    stats: [
      { value: "£100,000", label: "Per director GPS turnover test (limited company)" },
      { value: "20%", label: "Knowledge-based penalty on qualifying payments under FA 2004 s.62A" },
      { value: "5 years", label: "GPS reapplication ban after revocation on fraud grounds" },
    ],
    challenges: [
      {
        title: "GPS at company scale: the per-director turnover test",
        body:
          "For a limited company to qualify for Gross Payment Status, net annual CIS turnover must reach either £30,000 per director or £100,000 in total, whichever is lower in terms of the test that applies given the company structure. Net turnover excludes VAT and the cost of materials purchased for jobs. On large civil engineering contracts with significant plant hire, concrete, aggregates and geotextile supply, the materials strip-out matters: firms regularly undercount their qualifying CIS turnover by failing to separate labour from materials precisely.",
      },
      {
        title: "April 2026 GPS revocation and the due-diligence duty",
        body:
          "Finance Act 2026 (Royal Assent 18 March 2026) introduced immediate GPS revocation where HMRC determines a contractor knew or should have known about fraudulent activity in its supply chain. The should-have-known standard means that failing to carry out pre-payment due diligence is itself sufficient for revocation, with no proof of intent required. For civil engineering firms working with multi-tier subcontractor chains on infrastructure projects, this is a material risk. The three required due-diligence steps before each payment are: re-verify the subcontractor CIS status with HMRC, run a Companies House legitimacy check, and carry out bank account name verification.",
      },
      {
        title: "Framework contracts and rolling retention periods",
        body:
          "Framework agreements in civil engineering often involve staged release of retention funds, sometimes over 12 to 18 months after practical completion. Each retention release is a CIS payment and must be handled correctly: the deduction rate at the time of the original contract may differ from the rate at the time the retention is released if a subcontractor's GPS status has changed. Firms also need to ensure CIS300 returns are filed for every tax month including nil returns from April 2026, even in months where only retention releases and no new contract payments are made.",
      },
      {
        title: "Public sector contracts and the Regulation 24ZA exemption",
        body:
          "From April 2026, payments made to local authorities and public sector bodies are fully exempt from CIS under new Regulation 24ZA. Contractors working on public sector infrastructure projects no longer apply CIS deductions to those payments and do not include them in their CIS300 returns. Getting the distinction right between public sector body (exempt) and private-sector main contractor on a public-funded project (not exempt) requires care.",
      },
    ],
    howWeHelp: [
      {
        title: "GPS application, maintenance and anti-fraud compliance",
        body:
          "We manage the GPS application and the three qualifying tests for civil engineering limited companies: business test, per-director or total turnover test (using correctly stripped net CIS figures), and the 12-month compliance test. From April 2026 we also implement the documented pre-payment due-diligence workflow required to meet the should-have-known standard under Finance Act 2026.",
      },
      {
        title: "Monthly CIS300 returns and nil-return management",
        body:
          "We prepare and file your CIS300 monthly return by the 19th of each following tax month, handle nil returns in inactive months (mandatory again from 6 April 2026), verify subcontractor status before each payment, and issue compliant payment and deduction statements within the 14-day requirement.",
      },
      {
        title: "EPS reclaim for limited company subcontractor income",
        body:
          "Where your firm also receives CIS deductions as a subcontractor, we configure the Employer Payment Summary mechanism to offset CIS suffered against PAYE/CIS liabilities in real time. This eliminates the 12 to 18 month wait for a Corporation Tax refund and releases cash back into the business monthly.",
      },
    ],
    faqs: [
      {
        question: "Our firm has three directors. What is the GPS turnover test for us?",
        answer:
          "For a limited company the GPS turnover test requires net annual CIS turnover of either £30,000 per director or £100,000 in total. For three directors, £30,000 each totals £90,000, which is below the £100,000 alternative, so the effective threshold is £90,000 net of VAT and materials. Net turnover excludes the cost of materials, plant hire passed on at cost and VAT. We calculate your qualifying figure precisely, which often differs from total invoice value on large civil engineering contracts.",
      },
      {
        question: "What does the April 2026 should-have-known rule mean in practice for a framework contractor?",
        answer:
          "Under Finance Act 2026, HMRC can revoke GPS immediately if it finds a connection between your payments and fraudulent CIS activity and concludes you should have known about it. No proof of intent is required: inadequate due diligence is enough. For each subcontractor payment, you need a documented record of: CIS verification with HMRC, a Companies House legitimacy check, and bank account name verification. On a framework with a large subcontractor pool, we build that workflow into the payment run so the records exist before every payment leaves the firm.",
      },
      {
        question: "Do retention releases count as CIS payments that need to appear on the CIS300 return?",
        answer:
          "Yes. Retention releases are payments under a construction contract and must be included in the CIS300 return for the month in which they are made. The deduction rate to apply is the subcontractor's verified status at the time of the retention release, not at the time of the original contract. If a subcontractor's GPS status has changed in the intervening period, the rate may be different.",
      },
    ],
    testimonial: {
      quote:
        "We had never formalised the due-diligence process on subcontractor payments. After April 2026 that became a real exposure. Getting a documented workflow in place before any HMRC enquiry was important to us.",
      attribution: "Finance director, civil engineering contractor, major infrastructure projects",
    },
  },

  {
    slug: "mechanical-electrical-contractors",
    segment: "business" as const,
    title: "Mechanical and Electrical Contractors",
    headline: "CIS and VAT compliance for mechanical and electrical contractors",
    metaTitle: "Accountants for M&E Contractors | CIS Compliance Specialists",
    metaDescription:
      "CIS compliance, DRC VAT and GPS management for M&E contractors. Mixed labour, plant and materials invoicing, fit-out supply chains, employer NIC 15% planning.",
    intro:
      "Mechanical and electrical contractors operate at the intersection of three overlapping compliance regimes: the Construction Industry Scheme on subcontractor payments, the VAT domestic reverse charge on CIS supplies between registered businesses, and the employer NIC obligations arising from a workforce that typically mixes directly employed engineers with self-employed CIS subcontractors. Getting the boundaries wrong in any of these three creates either a penalty exposure or an unnecessary cash-flow cost. Directors and finance teams need a working understanding of each regime and how they interact.",
    stats: [
      { value: "15%", label: "Employer NIC rate from April 2025 (threshold £5,000)" },
      { value: "20%", label: "CIS deduction on labour-only element of M&E subcontractor invoices" },
      { value: "5%", label: "DRC de minimis: reverse charge ignored where it applies to 5% or less of an invoice" },
    ],
    challenges: [
      {
        title: "Mixed invoices: labour, plant hire and materials under CIS",
        body:
          "M&E invoices frequently combine labour, specialist plant (cable-pulling equipment, pipe-bending machines, testing rigs), and significant materials (cable, conduit, switchgear, pipework, valves). CIS deductions apply only to the labour element. Plant hire passed on at cost and materials supplied for the job are excluded from the deduction base. Correctly splitting a complex M&E invoice and ensuring your subcontractors and your own contractors apply the split accurately requires a clear invoicing protocol.",
      },
      {
        title: "Domestic reverse charge on fit-out supply chains",
        body:
          "The VAT domestic reverse charge applies to M&E services supplied between CIS-registered, VAT-registered businesses where the customer is not the end user and the supply is standard-rated. In an M&E fit-out supply chain, a specialist subcontractor supplying a main M&E contractor will typically be in scope for the DRC: the sub raises a zero-VAT invoice and the main contractor accounts for the VAT. Where the 5% de minimis applies (the DRC element is 5% or less of the invoice value), normal VAT rules apply to the whole invoice. Getting this wrong in either direction creates VAT gaps or unnecessary cash-flow exposure.",
      },
      {
        title: "Employer NIC at 15% on directly employed engineers",
        body:
          "Since April 2025, employer NIC is 15% on earnings above £5,000 per year (previously 13.8% above £9,100). For M&E contractors with directly employed field engineers and site supervisors, the increased rate and lower threshold raise the employment cost per head. This affects the build versus buy decision on any given project: directly employed versus CIS subcontractors versus day-rate contractors through a limited company.",
      },
      {
        title: "GPS protection for the firm and supply-chain due diligence",
        body:
          "M&E contractors holding GPS who pay their own subcontractors must comply with the April 2026 due-diligence requirements under Finance Act 2026. A supply-chain connection to fraudulent CIS activity, even where the M&E firm is not the primary actor, can trigger immediate GPS revocation and a five-year reapplication ban. The should-have-known standard means that an absence of documented due diligence at each payment is itself a ground for revocation.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS return compliance and invoicing protocol",
        body:
          "We set up a consistent invoicing and deduction protocol for your M&E contracts: correct labour/plant/materials split, verified CIS rates applied to the correct base, monthly CIS300 returns filed by the 19th, nil returns handled from April 2026, and payment and deduction statements issued to subcontractors within the 14-day requirement.",
      },
      {
        title: "DRC compliance and VAT chain review",
        body:
          "We review your supply chain and identify where the domestic reverse charge applies, where the end-user exception means it does not, and where the 5% de minimis is relevant. We configure your invoicing and VAT returns accordingly and ensure your subcontractors issue reverse-charge invoices correctly on supplies to you.",
      },
      {
        title: "Employer NIC planning and workforce structure advice",
        body:
          "We model the total employment cost of your current workforce mix under the April 2025 NIC regime and identify whether restructuring the mix of directly employed, CIS and limited-company contractors improves the position on specific project types. We also manage payroll and auto-enrolment for directly employed staff.",
      },
    ],
    faqs: [
      {
        question: "Does the domestic reverse charge apply to all our M&E subcontractor invoices?",
        answer:
          "Not automatically. Five conditions must all be met: the supply is a CIS construction service, both parties are VAT-registered, both are CIS-registered, the customer is not the end user (they will sell the service on), and the supply is standard-rated rather than zero-rated. If your firm is the end user (for example, you are fitting out your own premises), normal VAT applies. Where the DRC would apply to only 5% or less of the invoice value, normal VAT rules apply to the whole invoice.",
      },
      {
        question: "We use CIS subbies and directly employed engineers on the same projects. How does the NIC change affect us?",
        answer:
          "Employer NIC at 15% above £5,000 applies to your directly employed staff from April 2025 onwards. CIS subcontractors are outside the PAYE/NIC system: you deduct CIS at the appropriate rate on the labour element of their invoices but pay no employer NIC. On projects where the work could be delivered either way, the NIC cost difference is a legitimate factor in the resourcing decision. We model the comparison for you at project level.",
      },
      {
        question: "How often do we need to re-verify CIS subcontractors after April 2026?",
        answer:
          "The April 2026 due-diligence rules under Finance Act 2026 require verification before each payment, not just on first engagement. HMRC's should-have-known standard means that a subcontractor whose status has changed since your last verification could expose you to GPS revocation if you continue paying without re-verifying. In practice, we build re-verification into every payment run for the subcontractor pool.",
      },
    ],
  },

  {
    slug: "maintenance-and-fm-companies",
    segment: "business" as const,
    title: "Maintenance and FM Companies",
    headline: "CIS compliance for maintenance and facilities management companies",
    metaTitle: "Accountants for Maintenance & FM Companies | CIS Specialists",
    metaDescription:
      "CIS accountants for maintenance and FM companies. Repairs inside CIS, routine maintenance outside. Get the boundary right and manage deemed contractor exposure.",
    intro:
      "Maintenance and facilities management companies face a CIS question that most contractors never have to answer: which of their activities fall inside the scheme and which do not? The answer determines who must be paid under CIS, who can be paid gross, and whether the company itself is a contractor with monthly return obligations. Getting the boundary wrong in either direction creates problems: failure to operate CIS where it applies carries a penalty; wrongly applying CIS to outside-scope payments adds unnecessary friction. A second, separate question is whether the FM company itself has become a deemed contractor by crossing the £3 million annual construction spend threshold.",
    stats: [
      { value: "£3m", label: "Annual construction spend that triggers deemed contractor status" },
      { value: "19th", label: "Monthly CIS300 filing deadline (following tax month)" },
      { value: "£100", label: "Starting penalty for a late or missing CIS300 return" },
    ],
    challenges: [
      {
        title: "The repair and refurbishment vs routine maintenance boundary",
        body:
          "HMRC's CIS 340 guidance draws the key line here. Repair work -- making good, replacement of defective or damaged parts of a building or structure -- is a construction operation within the scope of CIS. Refurbishment and alteration work is also inside CIS. Routine maintenance on premises that are not undergoing any construction operations is generally outside. In practice, FM companies carry out both: a reactive repairs and dilapidations contract is typically inside CIS; a planned preventative maintenance contract limited to servicing and cleaning of operational equipment is typically outside. Where a single contract covers both types of work, the CIS analysis must be done at task level, not contract level. Source: CIS 340, HMRC (updated December 2024), citing Finance Act 2004 s.74.",
      },
      {
        title: "Deemed contractor status at £3 million",
        body:
          "A business that is not in the construction trade but spends more than £3 million per year on construction operations becomes a deemed contractor and must register for CIS, operate the scheme on qualifying payments, and file monthly CIS300 returns. Large FM groups managing extensive refurbishment programmes, dilapidations works or fit-out projects for clients regularly cross this threshold without realising it. Once crossed, the obligation continues until the firm can demonstrate its rolling 12-month construction spend has fallen below £3 million.",
      },
      {
        title: "Payroll and NIC across a mixed workforce",
        body:
          "FM companies typically employ a large workforce of direct employees (site managers, cleaning staff, helpdesk) alongside CIS subcontractors and specialist trade subbies. Since April 2025, employer NIC is 15% on earnings above £5,000. Managing the correct NIC position for each worker category, maintaining payroll compliance under auto-enrolment and ensuring CIS subbies are not treated as employees (or vice versa) requires sustained attention.",
      },
      {
        title: "CIS300 nil returns from April 2026",
        body:
          "FM companies that have registered as deemed contractors must file a CIS300 nil return for any tax month in which they make no qualifying subcontractor payments. This obligation was reinstated from 6 April 2026 after being removed in 2015. For FM businesses with seasonal contract patterns, months with no CIS-qualifying work still require a return, and missing one starts the penalty clock at £100.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS boundary review across your contract portfolio",
        body:
          "We work through your maintenance and FM contract portfolio and classify each contract and task type by reference to the Finance Act 2004 s.74 definition and the CIS 340 guidance. We produce a clear map of which work streams require CIS treatment, which are outside scope, and how to handle mixed contracts at task level. This protects against both under-compliance (failing to operate CIS) and over-compliance (deducting where not required).",
      },
      {
        title: "Deemed contractor assessment and registration",
        body:
          "We calculate your rolling 12-month construction spend and identify whether you are at or approaching the £3 million deemed contractor threshold. Where registration is required, we handle it. Where you are already registered, we ensure the monthly return and payment obligations are being met correctly.",
      },
      {
        title: "Monthly CIS300 returns and nil-return management",
        body:
          "We prepare and file your CIS300 monthly returns by the 19th, handle nil returns in months with no qualifying payments, verify all subcontractors before the first payment, and issue payment and deduction statements within the 14-day window. From April 2026 nil returns are mandatory again: we manage this for every inactive month.",
      },
    ],
    faqs: [
      {
        question: "We carry out both planned maintenance and reactive repairs on the same buildings. How do we know which payments need CIS?",
        answer:
          "The distinction follows HMRC's CIS 340 guidance (updated December 2024) and Finance Act 2004 s.74. Reactive repairs -- making good defects, replacing damaged structural or building fabric components -- are construction operations and CIS applies to the labour element of payments to subcontractors. Routine planned maintenance on operational equipment (servicing, cleaning, inspection of systems that are not being repaired or altered) is generally outside CIS where the premises are not undergoing any construction operations. Where a single contract bundles both types of work, the analysis must be done at task level. We carry out that classification and produce a written protocol so your payments team can apply it consistently.",
      },
      {
        question: "We are not a construction company. Does the £3 million threshold apply to us?",
        answer:
          "Yes, if your annual spend on construction operations exceeds £3 million, you become a deemed contractor regardless of your primary business. The spend includes refurbishment, fit-out, dilapidations and repair work placed with outside contractors, but excludes routine maintenance that falls outside the CIS construction operations definition. We calculate the correct spend figure, taking care to exclude non-qualifying work, and advise whether registration is required.",
      },
      {
        question: "We registered as a CIS contractor but some months we have no subcontractor payments. Do we still need to file?",
        answer:
          "Yes, from 6 April 2026, nil returns are mandatory for every tax month in which you make no qualifying subcontractor payments. This obligation was removed in 2015 and reinstated under the April 2026 changes. A late or missing nil return carries a penalty starting at £100. You can pre-notify HMRC of inactivity in advance as an alternative to filing a nil return each month.",
      },
    ],
    testimonial: {
      quote:
        "We had assumed our maintenance contracts were entirely outside CIS. The review identified that about a third of our reactive repair spend should have been going through the scheme. Getting that right avoided a significant penalty exposure.",
      attribution: "Operations director, facilities management group, South East England",
    },
  },

  {
    slug: "plant-hire-companies",
    segment: "business" as const,
    title: "Plant Hire Companies",
    headline: "CIS compliance for plant hire companies",
    metaTitle: "Accountants for Plant Hire Companies | CIS Specialists",
    metaDescription:
      "CIS accountants for plant hire companies. With-operator hire inside CIS, dry hire outside. Recover wrongly deducted CIS and manage operator supply chains.",
    intro:
      "Plant hire is the one area of construction where a single decision -- whether an operator goes with the machine -- determines whether CIS applies at all. With-operator hire is a CIS labour supply and the full labour element of the payment is subject to deduction. Dry hire (machine only, no operator) is outside CIS entirely. For plant hire businesses operating both models, the correct classification of each contract determines whether you are a CIS subcontractor, a CIS contractor, both, or neither. Getting it wrong costs money: incorrect CIS deductions on dry hire reduce your cash flow, and failing to operate CIS on with-operator hire creates a penalty exposure.",
    stats: [
      { value: "0%", label: "CIS deduction on dry hire (machine only, no operator)" },
      { value: "20%", label: "CIS deduction on with-operator hire (labour element)" },
      { value: "£30,000", label: "Per-director GPS turnover test (limited company)" },
    ],
    challenges: [
      {
        title: "With-operator vs dry hire: getting the classification right on every contract",
        body:
          "HMRC's position is clear: where plant is hired with an operator, the operator is supplying construction labour and the labour element of the payment falls within CIS. Where plant is hired without an operator (dry hire), the hire charge is for the use of an asset and does not fall within CIS. Many plant hire contracts sit between these poles: an operator who assists with setup and moves the machine between positions but leaves site while the machine is in use, for example. Where there is ambiguity, document the scope of any operator involvement and apply the classification consistently. Mixed contracts -- where part of a hire is operated and part is dry -- require splitting at the invoice level.",
      },
      {
        title: "Incorrectly deducted CIS on dry hire and recovering it",
        body:
          "Construction main contractors occasionally apply CIS deductions to dry hire invoices, either through misunderstanding or administrative error. If your company receives CIS deductions on dry hire payments that should be outside the scheme, you are being under-paid without entitlement. For sole traders and individuals, the overpayment can be recovered through Self Assessment. For limited companies, the EPS mechanism allows real-time recovery of CIS suffered against PAYE/NIC liabilities. We identify incorrect deductions, raise them with the paying contractor and, where correction before year-end is not achieved, ensure the amount is recovered via the correct mechanism.",
      },
      {
        title: "Operator payroll vs CIS subcontractor status",
        body:
          "Plant hire companies that supply operators with machines face an employment status question: are the operators employees (PAYE/NIC), CIS subcontractors, or something more complex? The April 2025 employer NIC increase to 15% above £5,000 raises the cost of direct employment. CIS subcontractor status requires genuine self-employment and the operator having the right to substitute and bearing financial risk. Getting this wrong in the direction of false self-employment creates employer NIC arrears and potential penalties. We review the contracts and working practices for each operator category and advise on the correct treatment.",
      },
      {
        title: "GPS for with-operator hire income and supply-chain due diligence",
        body:
          "Plant hire companies with significant with-operator hire turnover may qualify for GPS on that income stream, receiving payments without CIS deduction. Since April 2026, holding GPS requires documented pre-payment due diligence from any contractor paying you, and your own due diligence on any subcontractors you pay (for example, when you hire in additional operators from a labour provider). Finance Act 2026 makes a single undocumented supply-chain connection to fraud a potential GPS revocation event.",
      },
    ],
    howWeHelp: [
      {
        title: "Contract classification and CIS protocol",
        body:
          "We review your standard hire contract terms and help you establish a clear, documented protocol for classifying each hire as with-operator (CIS in scope) or dry hire (outside CIS), handling mixed contracts at invoice level, and verifying the CIS status of any subcontract operators before payment.",
      },
      {
        title: "Recovery of incorrect CIS deductions on dry hire",
        body:
          "Where main contractors have applied CIS deductions to dry hire invoices, we identify the amounts, communicate the correct position to the paying contractor, and manage recovery through either direct correction, Self Assessment (sole trader/individual operators) or the EPS mechanism (limited company). We also advise on the record-keeping needed to support the recovery claim.",
      },
      {
        title: "GPS application and April 2026 compliance",
        body:
          "We manage the GPS application for plant hire companies qualifying on with-operator hire income, including the net turnover calculation (excluding dry hire income and VAT), the three qualifying tests, and the documented pre-payment due-diligence workflow required from April 2026 under Finance Act 2026.",
      },
    ],
    faqs: [
      {
        question: "We hire plant with and without operators on different contracts. Do we need to operate CIS on all of them?",
        answer:
          "No. CIS applies only to the with-operator hire. Dry hire -- machine only, no operator -- falls outside CIS because it is a hire of an asset, not a supply of construction labour. On contracts that involve both (for example, an operator during setup and then dry hire for the remainder of the engagement), you split the invoice and apply CIS only to the labour element of the with-operator period.",
      },
      {
        question: "A main contractor has deducted CIS from our dry hire invoices. How do we recover it?",
        answer:
          "First, write to the main contractor setting out why the deduction was incorrect (dry hire is outside CIS, no labour element). If they correct it on a future payment, the issue resolves. If they do not, the mechanism for recovery depends on your trading structure. A limited company can offset CIS suffered (including amounts incorrectly deducted) via the EPS against its PAYE/NIC liabilities in real time. A sole trader recovers the amount through Self Assessment at year end. We manage either route and keep a record of the incorrect deductions to support the claim.",
      },
      {
        question: "Can we hold GPS on with-operator hire income even though we also do dry hire?",
        answer:
          "Yes. The GPS turnover test is applied to your net CIS income, which is the labour and construction-services element of with-operator hire. Dry hire income does not form part of the CIS turnover calculation. For a limited company the test requires either £30,000 per director or £100,000 total net CIS turnover. We calculate the qualifying figure using your with-operator hire income only, stripping out materials, dry hire and VAT.",
      },
    ],
  },

  {
    slug: "multi-trade-building-firms",
    segment: "business" as const,
    title: "Multi-Trade Building Firms",
    headline: "CIS, GPS and employer NIC compliance for multi-trade building firms",
    metaTitle: "Accountants for Multi-Trade Building Firms | CIS Specialists",
    metaDescription:
      "CIS compliance, GPS and NIC planning for multi-trade building firms. High-volume verification, CIS300 deadlines and April 2026 anti-fraud rules managed.",
    intro:
      "Multi-trade building firms carry more moving parts than almost any other construction business. A single project may involve bricklayers, plasterers, joiners, roofers, plumbers and electricians, each a separate CIS subcontractor with their own verification status, deduction rate and monthly return entry. At company level, the GPS anti-fraud rules from April 2026 mean the volume of subcontractor payments is now also a volume of due-diligence events. At the same time, the employer NIC increase to 15% from April 2025 has changed the economics of directly employing versus subcontracting for each trade. Directors and finance teams need a system, not a spreadsheet.",
    stats: [
      { value: "19th", label: "Monthly CIS300 deadline: penalties start the day after" },
      { value: "15%", label: "Employer NIC from April 2025, threshold £5,000 pa" },
      { value: "£100,000", label: "GPS total turnover threshold for a multi-director building company" },
    ],
    challenges: [
      {
        title: "High-volume subcontractor verification and the April 2026 due-diligence duty",
        body:
          "Finance Act 2026 (Royal Assent 18 March 2026) requires a contractor to re-verify each subcontractor's CIS status before every payment, run a Companies House legitimacy check, and carry out bank account name verification as part of the should-have-known due-diligence standard. For a multi-trade firm running five to ten trades on a single project and paying weekly or fortnightly, that is a significant process obligation. Failure to carry out and document the checks is, in itself, sufficient for HMRC to revoke GPS under the immediate-revocation power introduced by the same Act.",
      },
      {
        title: "CIS300 returns: deadline, nil months and penalty ladder",
        body:
          "The CIS300 monthly return must be filed by the 19th of the following tax month. From 6 April 2026, a nil return is required in any month where the firm makes no subcontractor payments. Multi-trade firms working on long projects with phased payment schedules often have months where subcontractor payments fall in an awkward pattern: a nil return in the wrong month, or a payment misattributed to the wrong tax month, creates a penalty exposure starting at £100 per late return and escalating at two, six and twelve months.",
      },
      {
        title: "Employer NIC at 15% on directly employed site staff",
        body:
          "For multi-trade firms that employ site managers, labourers and plant operators directly alongside CIS subcontractors, the April 2025 increase in employer NIC to 15% above £5,000 raises the employment cost per head relative to prior years. The interaction with auto-enrolment (minimum 3% employer pension contribution) and any SSP or contractual sick pay obligations makes the total employment cost per directly employed worker higher than it has been since the 2019 reform. We model the comparative cost of direct employment versus CIS for each trade category.",
      },
      {
        title: "GPS at company level and the turnover test under multi-director structures",
        body:
          "For a limited company with multiple directors, GPS requires net annual CIS turnover of £30,000 per director or £100,000 total. On large-scale multi-trade building projects with significant materials procurement (aggregates, bricks, timber, steel, plasterboard), the materials strip-out from the turnover calculation matters. Net CIS turnover excludes VAT and the cost of materials purchased for jobs. Firms frequently understate their qualifying turnover because they start from total invoiced revenue rather than the labour-only net CIS figure.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS300 return management and nil-return compliance",
        body:
          "We prepare and file your CIS300 monthly return on time, verify each subcontractor's status before each payment run, issue compliant payment and deduction statements within 14 days, and handle nil returns for inactive months from April 2026. For firms with a large, fluctuating subcontractor pool across multiple trades, we maintain the verification record that protects you under the April 2026 due-diligence rules.",
      },
      {
        title: "GPS application and anti-fraud due-diligence workflow",
        body:
          "We calculate your net CIS turnover by trade and project, apply the correct per-director threshold for your company structure, and manage the GPS application and three qualifying tests. From April 2026, we implement the pre-payment due-diligence workflow (HMRC re-verification, Companies House check, bank account name verification) and maintain the documentation trail that meets the should-have-known standard under Finance Act 2026.",
      },
      {
        title: "Employer NIC planning across your workforce mix",
        body:
          "We model the total employment cost of your current workforce by category: directly employed, CIS subcontractor, and limited-company contractor. The April 2025 NIC regime changes the relative cost at the margins and the calculation differs by trade, income level and project type. We advise on structuring decisions at the point where they make a genuine difference, not in retrospect.",
      },
    ],
    faqs: [
      {
        question: "We have eight directors. What is our GPS turnover threshold?",
        answer:
          "The test for a limited company requires net annual CIS turnover of £30,000 per director or £100,000 total, whichever threshold is relevant to your structure. Eight directors at £30,000 each would be £240,000, but the £100,000 total cap means the effective threshold is £100,000 net of materials and VAT. Net CIS turnover excludes the cost of materials purchased for jobs and VAT. We calculate your qualifying figure precisely from your labour income across all projects.",
      },
      {
        question: "We pay subcontractors from multiple trades every week. Do we need to re-verify them before every payment under the April 2026 rules?",
        answer:
          "Under Finance Act 2026, the should-have-known standard requires that a contractor take reasonable steps to verify the legitimacy of each subcontractor before each payment. HMRC's due-diligence guidance identifies three steps: CIS verification with HMRC, a Companies House check, and bank account name verification. For a high-frequency, multi-trade payment run, we build this into your payroll and payments process as a systematic pre-payment check rather than a manual one-off, so the records exist for every subcontractor payment without creating an operational bottleneck.",
      },
      {
        question: "We had no subcontractor payments in two months this year. Do we still need to file CIS300 returns for those months?",
        answer:
          "Yes, from 6 April 2026. The nil-return obligation was reinstated for all registered CIS contractors. For any tax month in which you make no subcontractor payments, you must file a CIS300 nil return by the 19th of the following month, or pre-notify HMRC of inactivity. A late or missing nil return carries a penalty starting at £100, escalating at two, six and twelve months. We manage this as part of the monthly return process so inactive months are never missed.",
      },
    ],
    testimonial: {
      quote:
        "We were filing the CIS300 but the nil-return obligation had come back in April and nobody had told us. We had three missing returns before we picked it up. Getting a firm to manage the full monthly process took that risk off the table.",
      attribution: "Director, multi-trade building contractor, Midlands",
    },
  },
];
