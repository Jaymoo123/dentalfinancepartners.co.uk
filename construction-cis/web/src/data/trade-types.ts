export interface TradeType {
  slug: string;
  segment: "trade" | "business";
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

export const tradeTypes: TradeType[] = [
  {
    slug: "plumbers",
    segment: "trade",
    title: "Plumbers",
    headline: "Specialist accountants for plumbers",
    metaTitle: "Accountants for Plumbers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed plumbers. CIS tax refunds, gross payment status, sole trader and limited company accounting. Most plumbers are owed money back.",
    intro:
      "Self-employed plumbers are among the most consistently overpaid workers in CIS. The 20% deduction on labour income adds up fast across a full year of jobs, and materials costs (pipework, fittings, boiler parts) are excluded from the deduction base entirely. The result: most plumbing subcontractors have a significant CIS refund sitting unclaimed at HMRC.",
    stats: [
      { value: "20%", label: "Deducted on labour by main contractors" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "0%", label: "Deducted on materials costs" },
    ],
    challenges: [
      {
        title: "Materials deducted incorrectly",
        body:
          "CIS deductions apply only to the labour element of an invoice. The cost of materials you supply for a job is excluded from the deduction base. Many main contractors apply the 20% rate to the full invoice value rather than splitting out materials. If yours do, you are overpaying on every job. We review your deduction slips and identify overpayment.",
      },
      {
        title: "Mileage and van expenses going unclaimed",
        body:
          "Self-employed plumbers drive significant mileage between jobs. From 6 April 2026, the AMAP rate for cars and vans is 55p per mile for the first 10,000 miles. Tools, PPE, trade subscriptions and your phone bill are also allowable. Many plumbers claim only a fraction of what they are entitled to, leaving real money on the table.",
      },
      {
        title: "Sole trader vs limited company decision",
        body:
          "At higher income levels, operating through a CIS-registered limited company can be significantly more tax-efficient than sole trader. The company reclaims CIS deductions in real time via EPS rather than waiting for the annual Self Assessment return. We model both structures for your income level and show you the numbers.",
      },
      {
        title: "CIS registration status",
        body:
          "Unregistered subcontractors suffer 30% deductions instead of 20%. If you registered for CIS but your contractor cannot verify you, you may be on the higher rate unnecessarily. We check your registration status and fix any verification issues with HMRC.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim",
        body:
          "We calculate the full CIS refund you are owed, account for allowable expenses (mileage at 55p, tools, materials, van costs, PPE), and submit your Self Assessment return to claim it back. Most plumbers receive their refund within 8 to 12 weeks of submission.",
      },
      {
        title: "Ongoing CIS compliance",
        body:
          "Annual Self Assessment, CIS records management, quarterly updates if you are in scope for Making Tax Digital from April 2026. We handle it so you do not have to.",
      },
      {
        title: "Gross payment status application",
        body:
          "If you earn over £30,000 net of materials per year, you may qualify for gross payment status, meaning no deductions at all. We handle the application and the ongoing compliance that keeps it in place. See our GPS service for full details.",
      },
    ],
    faqs: [
      {
        question: "My contractor deducts CIS from my full invoice including materials. Is that right?",
        answer:
          "No. CIS deductions apply only to the labour element of the invoice. If you supply materials for a job, those costs should be excluded from the deduction base. Overpayment because of incorrect deductions is very common among plumbers and is recoverable via Self Assessment.",
      },
      {
        question: "How much is the mileage rate for a self-employed plumber?",
        answer:
          "From 6 April 2026, the AMAP rate for cars and vans is 55p per mile for the first 10,000 miles (25p after). If you use your vehicle for work, you can claim this rate against your taxable income. Keep a record of business journeys and we will make sure the claim is correct.",
      },
    ],
    testimonial: {
      quote:
        "I had no idea my contractor was taking the 20% off the full invoice. Once we split out the materials properly and claimed the mileage, the refund was considerably larger than expected.",
      attribution: "Self-employed plumber, South East England",
    },
  },

  {
    slug: "electricians",
    segment: "trade",
    title: "Electricians",
    headline: "Specialist accountants for electricians",
    metaTitle: "Accountants for Electricians | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS tax accountants for self-employed electricians. CIS refunds, gross payment status, sole trader and limited company tax. Most electricians are owed money back.",
    intro:
      "Self-employed electricians working under CIS have 20% taken from their labour payments every month. Add up materials (cable, consumer units, accessories) that should be excluded from the deduction base, and many electricians are overpaying by several thousand pounds a year. That money is recoverable.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "55p", label: "Mileage rate per mile from April 2026" },
    ],
    challenges: [
      {
        title: "Separating materials from labour on invoices",
        body:
          "CIS deductions apply only to the labour element of an invoice. Cable, consumer units, light fittings and other materials you supply are excluded. If your main contractor does not distinguish between the two on your deduction slips, you may be overpaying on every job. We review your statements and ensure the deduction base is correct.",
      },
      {
        title: "Tools and equipment allowances",
        body:
          "Electricians carry significant tool costs: testers, drills, cable pullers, ladders. Capital allowances let you deduct the cost of tools and equipment against your taxable income. The Annual Investment Allowance covers up to £1 million of qualifying expenditure per year at 100%.",
      },
      {
        title: "Registration and verification issues",
        body:
          "If a main contractor cannot verify your CIS status with HMRC, they are required to deduct at 30% rather than 20%. This often happens when electricians change trading name, address or UTR without updating HMRC. We identify and fix verification problems quickly.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund calculation and claim",
        body:
          "We calculate your full refund entitlement including all allowable expenses, check your deduction slips for incorrect base amounts, and submit your Self Assessment return. Most electricians receive their refund within 8 to 12 weeks.",
      },
      {
        title: "Capital allowances on tools and equipment",
        body:
          "We claim the correct capital allowances on tools, test equipment, ladders and vehicles. For larger equipment purchases, we ensure you are using the Annual Investment Allowance correctly.",
      },
      {
        title: "CIS compliance and MTD",
        body:
          "Ongoing Self Assessment, CIS records management, and Making Tax Digital preparation if your gross income exceeds £50,000 from April 2026.",
      },
    ],
    faqs: [
      {
        question: "I buy my own cable and accessories. Can I exclude these from CIS deductions?",
        answer:
          "Yes. The cost of materials you supply for a job is excluded from the CIS deduction base. Only the labour element is subject to the 20% deduction. If your contractor is taking the deduction from the full invoice value, you are overpaying and this is recoverable through Self Assessment.",
      },
      {
        question: "Do I need to register for VAT as a self-employed electrician?",
        answer:
          "You must register for VAT if your taxable turnover exceeds £90,000 in any 12-month period. On domestic work, standard 20% VAT applies. On new-build residential work, the zero rate applies. The domestic reverse charge applies when you supply construction services to another VAT-registered contractor who is not the end user.",
      },
    ],
  },

  {
    slug: "joiners",
    segment: "trade",
    title: "Joiners and Carpenters",
    headline: "Specialist accountants for joiners and carpenters",
    metaTitle: "Accountants for Joiners & Carpenters | CIS Tax Specialists",
    metaDescription:
      "CIS accountants for self-employed joiners and carpenters. CIS refunds, gross payment status, sole trader and limited company accounting.",
    intro:
      "Joiners and carpenters working under CIS typically supply both labour and significant materials (timber, sheet materials, fixings, hardware). Getting the split right on every job is critical to avoiding overpayment. Combined with mileage, tools and PPE, the allowable expenses available to a self-employed joiner or carpenter are considerable.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "0%", label: "Deducted on materials" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
    ],
    challenges: [
      {
        title: "Materials excluded from CIS deduction base",
        body:
          "Timber, sheet materials, ironmongery and fixings you supply for a job are all excluded from CIS deductions. The 20% rate applies only to the labour element. Many main contractors either do not separate the two, or use a rough estimate rather than the actual materials cost. We review your deduction slips and identify where overpayment has occurred.",
      },
      {
        title: "Tools and workshop equipment",
        body:
          "Joiners and carpenters typically have substantial tool and equipment costs: table saws, routers, planers, chisels, clamps, vans. Capital allowances let you claim the cost of tools and equipment against your taxable income. We ensure every qualifying item is included.",
      },
      {
        title: "Van costs and mileage",
        body:
          "A joiner's van is essential and expensive. You can claim the actual running costs (fuel, insurance, repairs, road tax, finance interest) or use the mileage rate of 55p per mile from April 2026. We model which approach produces the larger deduction for your specific usage.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim",
        body:
          "We calculate your full refund, verify the deduction base on your monthly statements, account for all allowable expenses, and submit your Self Assessment return. We handle any follow-up with HMRC.",
      },
      {
        title: "Gross payment status",
        body:
          "Once your annual CIS turnover exceeds £30,000 net of materials, you may qualify for GPS and receive payments without any deduction. We handle the application and maintain the compliance record that keeps it in place.",
      },
      {
        title: "Ongoing self-employment accounts",
        body:
          "Annual Self Assessment, income and expense records, and Making Tax Digital preparation from April 2026 if your gross income exceeds the threshold.",
      },
    ],
    faqs: [
      {
        question: "I supply all the timber and fixings myself. Does this reduce my CIS deductions?",
        answer:
          "Yes, it should. Materials costs are excluded from the CIS deduction base. If you supply timber, sheet materials and fixings, the cost of those materials should be deducted from the invoice value before the 20% CIS deduction is applied. If your contractor is not doing this, you are overpaying.",
      },
      {
        question: "Can I claim my workshop equipment against my CIS income?",
        answer:
          "Yes. Capital allowances apply to plant and machinery used in your trade, including workshop equipment such as table saws, routers and planers. The Annual Investment Allowance allows 100% deduction in the year of purchase up to £1 million.",
      },
    ],
  },

  {
    slug: "groundworkers",
    segment: "trade",
    title: "Groundworkers",
    headline: "Specialist accountants for groundworkers",
    metaTitle: "Accountants for Groundworkers | CIS Tax & Refund Service",
    metaDescription:
      "CIS accountants for self-employed groundworkers. CIS tax refunds, gross payment status, sole trader and limited company tax. Specialist construction accounting.",
    intro:
      "Groundworkers are among the most reliably CIS-taxed workers in construction. Foundations, drainage, earthworks, utilities installation: these are almost always CIS-registered contracts with a main contractor deducting 20% from every labour payment. The refund opportunity is significant, particularly because groundwork often involves substantial plant hire and materials costs that should be excluded from the deduction base.",
    stats: [
      { value: "20%", label: "Deducted on labour by main contractors" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "55p", label: "Van and car mileage rate from April 2026" },
    ],
    challenges: [
      {
        title: "Plant hire costs and deduction base",
        body:
          "When you hire plant (excavators, dumpers, rollers) for a specific job and pass the cost on to the main contractor, that hire cost should be excluded from the CIS deduction base. Similarly, materials (aggregates, concrete, drainage pipes) you supply are excluded. In practice, many main contractors apply the deduction to the full invoice. We check and correct this.",
      },
      {
        title: "Diesel and running costs for heavy vehicles",
        body:
          "If you own or run a tipping lorry, tipper truck or other commercial vehicle, the running costs are allowable expenses against your CIS income. Fuel, insurance, road tax, servicing and finance charges on a commercial vehicle are all deductible. We ensure these are correctly captured.",
      },
      {
        title: "PPE and safety equipment",
        body:
          "Steel-toe boots, hard hats, hi-vis vests, gloves, safety harnesses. PPE required for your work is an allowable expense. Many groundworkers underreport these costs. We include everything that qualifies.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund from start to finish",
        body:
          "We review your CIS deduction statements, check the deduction base, calculate all allowable expenses, and submit your Self Assessment claim. For most groundworkers, the refund covers our fee many times over in the first year.",
      },
      {
        title: "Gross payment status application",
        body:
          "If you earn over £30,000 net of materials and plant hire per year, you may qualify for GPS. No more 20% deductions at all. We manage the application and the compliance record.",
      },
      {
        title: "Limited company structure advice",
        body:
          "At higher income levels, a CIS-registered limited company can reclaim deductions in real time via EPS rather than waiting for the annual Self Assessment return. We model the comparison for your situation.",
      },
    ],
    faqs: [
      {
        question: "I hire a plant for specific jobs and charge it on to my client. Is that excluded from CIS?",
        answer:
          "Generally yes, if the plant hire is a direct cost passed on at cost (not marked up). The key is that it appears on your invoice as a separately identified item and represents the actual hire cost. If the main contractor is applying the 20% deduction to the full invoice including plant hire, they are incorrectly calculating your deduction.",
      },
      {
        question: "Do I need to file quarterly MTD reports?",
        answer:
          "If your gross self-employment income exceeds £50,000 from April 2026, you must use MTD-compatible software and file quarterly digital updates. The threshold drops to £30,000 from April 2027. Importantly, the threshold is based on your gross income before CIS deductions, not the net you receive.",
      },
    ],
  },

  {
    slug: "roofers",
    segment: "trade",
    title: "Roofers",
    headline: "Specialist accountants for roofers",
    metaTitle: "Accountants for Roofers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed roofers. CIS refunds, gross payment status, sole trader and limited company accounting. Specialist roofing trade accounting.",
    intro:
      "Roofing subcontractors work almost exclusively under CIS contracts, making the tax refund position particularly relevant. Tiles, slates, felt, battens, lead, guttering: materials costs are a significant proportion of roofing work and should all be excluded from the CIS deduction base. If your main contractor is not splitting this correctly, you are overpaying.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "£30,000", label: "GPS turnover threshold (net of materials)" },
    ],
    challenges: [
      {
        title: "High materials costs excluded from CIS",
        body:
          "Roofing involves significant materials supply: tiles, slates, felt, battens, ridge tiles, lead, guttering, fixings. All of these are excluded from the CIS deduction base. If a main contractor applies the 20% rate to your full invoice rather than just the labour element, the overpayment can be substantial across a full year's work.",
      },
      {
        title: "Working at height: PPE and equipment",
        body:
          "Scaffolding hire charges passed on to the main contractor should be excluded from the deduction base. PPE (helmets, harnesses, safety boots) and working-at-height equipment you purchase for your own use are allowable expenses against your income.",
      },
      {
        title: "Seasonal income patterns and cash flow",
        body:
          "Roofing income is often seasonal, with stronger earnings in summer months and gaps in winter. We plan around these patterns, ensuring your CIS refund claim is timed correctly and your payment on account obligations are managed to avoid large January tax bills.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim",
        body:
          "We review every deduction statement, check the materials split, account for all allowable expenses including scaffolding hire, PPE and van costs, and submit your Self Assessment claim.",
      },
      {
        title: "Gross payment status",
        body:
          "Roofers with over £30,000 of net CIS turnover can apply for GPS and receive gross payments. We manage the application and the quarterly compliance checks that keep the status active.",
      },
      {
        title: "Annual accounts and compliance",
        body:
          "Annual Self Assessment, income and expense records, Making Tax Digital preparation. We handle all your compliance obligations so you can focus on the work.",
      },
    ],
    faqs: [
      {
        question: "I supply all the materials for roofing jobs. My contractor takes 20% off the full invoice. What can I do?",
        answer:
          "Your contractor should be splitting the invoice into materials and labour before applying the deduction. The 20% rate applies only to the labour element. You can raise this with your contractor directly. Even if they do not correct it going forward, any overpayment from previous jobs is recoverable through your Self Assessment return.",
      },
      {
        question: "How long does it take to receive a CIS refund?",
        answer:
          "HMRC typically processes a CIS refund within 8 to 12 weeks of receiving a correctly filed Self Assessment return. Complex cases or amended returns can take longer. We submit accurately and follow up with HMRC if there are delays.",
      },
    ],
    testimonial: {
      quote:
        "Three years of filing my own returns and I never got the materials split right. First year with a proper CIS accountant and the refund was four times what I had been getting.",
      attribution: "Self-employed roofer, Midlands",
    },
  },

  {
    slug: "builders",
    segment: "trade",
    title: "Builders",
    headline: "Specialist accountants for builders",
    metaTitle: "Accountants for Builders | CIS Tax & Self-Assessment",
    metaDescription:
      "CIS accountants for self-employed builders and general contractors. CIS refunds, gross payment status, sole trader and limited company tax accounting.",
    intro:
      "General builders and multi-trade sole traders often have the most complex CIS position of any construction worker. Multiple contractors, varied work types, significant materials supply and the need to manage both CIS subcontractor income and any contractor-side obligations make getting the accounts right genuinely important.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "19th", label: "Monthly CIS return deadline for contractors" },
    ],
    challenges: [
      {
        title: "Working as both subcontractor and contractor",
        body:
          "Many builders both receive CIS deductions as a subcontractor and make deductions as a main contractor when paying their own subbies. Managing the HMRC offset position, filing CIS300 monthly returns correctly and keeping the two positions separate requires careful attention. A mistake in either direction creates problems.",
      },
      {
        title: "Multiple contractors and varied deduction rates",
        body:
          "Builders often work for several main contractors simultaneously or sequentially. Each uses their own deduction slips and may handle the labour/materials split differently. We consolidate all your CIS statements across the year to build the complete picture.",
      },
      {
        title: "CIS nil returns from April 2026",
        body:
          "If you operate as a main contractor (i.e. you pay subcontractors), you must now file a CIS300 nil return for any month in which you make no subcontractor payments. This obligation was reinstated from 6 April 2026. Failure to file on time carries penalties starting at £100.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and Self Assessment",
        body:
          "We consolidate all your CIS statements, account for all allowable expenses, and submit your Self Assessment return to claim the full refund you are owed.",
      },
      {
        title: "Monthly CIS returns for contractor builders",
        body:
          "If you pay subcontractors, we file your CIS300 monthly returns on time, verify subcontractor status before each payment, and manage nil returns in inactive months.",
      },
      {
        title: "Gross payment status application",
        body:
          "Builders with net CIS turnover over £30,000 can apply for GPS. We handle the application, the three-test compliance assessment, and the ongoing record-keeping.",
      },
    ],
    faqs: [
      {
        question: "I pay two subcontractors. Do I need to file monthly CIS returns?",
        answer:
          "Yes. If you are registered as a CIS contractor (because you make payments to subcontractors for construction work), you must file a CIS300 monthly return by the 19th of each month following the tax month in which payments were made. From April 2026 you must also file nil returns in months with no payments.",
      },
      {
        question: "Can I offset the CIS deductions I receive against the CIS deductions I pay?",
        answer:
          "As a sole trader, you recover CIS deductions you have suffered through your Self Assessment return. If you also operate as a contractor, you have a separate obligation to pay over the deductions you make from your subcontractors. The two positions do not offset directly but we manage both to ensure you are neither underpaying nor overpaying.",
      },
    ],
  },

  {
    slug: "gas-engineers",
    segment: "trade",
    title: "Gas Engineers",
    headline: "Specialist accountants for gas engineers",
    metaTitle: "Accountants for Gas Engineers | CIS & Gas Safe Tax Advice",
    metaDescription:
      "CIS accountants for self-employed gas engineers and Gas Safe registered engineers. CIS refunds, gross payment status, Gas Safe registration costs and tax planning.",
    intro:
      "Gas engineers working under CIS face a specific combination of professional registration costs (Gas Safe is a significant annual expense), materials supply that is often excluded from the deduction base, and the same 20% deduction on labour income as every other CIS trade. The professional compliance costs are entirely allowable and often underchimed.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "100%", label: "Gas Safe registration: allowable expense" },
    ],
    challenges: [
      {
        title: "Gas Safe registration and annual fees",
        body:
          "Gas Safe registration is a mandatory professional cost for gas engineers and is fully allowable as a business expense. Annual renewal, card fees and any inspection costs all qualify. Many gas engineers do not claim these correctly, partly because they are paid personally rather than through a business account.",
      },
      {
        title: "Boilers, cylinders and heating components",
        body:
          "Where you supply parts (gas valves, boiler controls, thermostats, cylinders), the cost of those materials is excluded from the CIS deduction base. If your contractor is applying the 20% rate to the full invoice rather than the labour element only, you are overpaying on every job that involves materials supply.",
      },
      {
        title: "Van costs and tool allowances",
        body:
          "The van is your workshop. Fuel, insurance, road tax, MOT, servicing and finance charges on a van used for work are all allowable. From April 2026, the AMAP rate for a car or van is 55p per mile. Gas analysers, leak detection equipment and hand tools are all eligible for capital allowances.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund including professional costs",
        body:
          "We include Gas Safe fees, tool costs, van expenses and all other allowable deductions in your Self Assessment return to maximise your refund. Most gas engineers receive more than they expect when the full expense picture is captured.",
      },
      {
        title: "Gross payment status",
        body:
          "Gas engineers with net CIS income over £30,000 can qualify for GPS and receive gross payments from main contractors. We manage the application and the compliance record.",
      },
      {
        title: "Ongoing compliance and MTD",
        body:
          "Annual Self Assessment, quarterly MTD updates if required from April 2026, and proactive advice as your earnings grow.",
      },
    ],
    faqs: [
      {
        question: "Is my Gas Safe registration tax deductible?",
        answer:
          "Yes, fully. Gas Safe registration is a mandatory professional cost for your trade and is 100% allowable as a business expense. Annual renewal fees, card fees and associated costs all qualify.",
      },
      {
        question: "I fit boilers and supply the parts. Is the cost of boilers deducted from CIS?",
        answer:
          "The cost of a boiler or other components you supply should be excluded from the CIS deduction base. Only the labour element of the invoice is subject to deduction. If your contractor applies the 20% rate to the full invoice value including the boiler cost, they are incorrectly calculating your deduction.",
      },
    ],
  },

  {
    slug: "painters-decorators",
    segment: "trade",
    title: "Painters and Decorators",
    headline: "Specialist accountants for painters and decorators",
    metaTitle: "Accountants for Painters & Decorators | CIS Tax Advice",
    metaDescription:
      "CIS accountants for self-employed painters and decorators. CIS tax refunds, gross payment status, sole trader accounting and expenses.",
    intro:
      "Painters and decorators working under CIS on commercial or new-build residential projects have 20% taken from their labour payments. The materials split matters here too: paint, filler, tape, dust sheets, brushes and rollers you supply should be excluded from the deduction base. Over a full year, the recoverable overpayment adds up.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "55p", label: "AMAP mileage rate from April 2026" },
    ],
    challenges: [
      {
        title: "Paint and materials excluded from deductions",
        body:
          "If you supply paint, filler, primer, masking tape and other materials for a job, those costs are excluded from the CIS deduction base. Many decorating contracts on new-build or commercial sites involve significant materials supply. If the main contractor is not splitting these out, you are overpaying.",
      },
      {
        title: "Ladders, platforms and access equipment",
        body:
          "Extending ladders, platform towers, hop-ups and similar access equipment are capital expenditure allowable through capital allowances. If you hire access equipment for specific jobs and pass the cost on, that hire charge should also be excluded from the deduction base.",
      },
      {
        title: "Travel between sites",
        body:
          "Decorating contracts often require travel between multiple sites or clients in a day. Mileage at 55p per mile (from April 2026) is allowable for business travel. Keeping a journey log throughout the year is the best way to ensure the full claim is captured.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim",
        body:
          "We review your deduction statements, check the materials split, account for all allowable expenses and submit your Self Assessment return. Most painters and decorators receive a refund within 8 to 12 weeks.",
      },
      {
        title: "Gross payment status",
        body:
          "If your net CIS turnover exceeds £30,000, we handle the GPS application and maintain the compliance record.",
      },
      {
        title: "Ongoing sole trader accounts",
        body:
          "Annual Self Assessment, income and expense records, Making Tax Digital preparation if needed from April 2026.",
      },
    ],
    faqs: [
      {
        question: "I work for a main contractor on new-build sites and buy all my own paint. Should they deduct CIS from the full invoice?",
        answer:
          "No. The cost of paint and other materials you supply should be excluded from the CIS deduction base before the 20% rate is applied. Only the labour element is subject to deduction. If your contractor is deducting from the full invoice, you are overpaying and the difference is recoverable through Self Assessment.",
      },
      {
        question: "Do painters and decorators have to register for CIS?",
        answer:
          "Registration is optional but practically essential. Unregistered subcontractors are deducted at 30% rather than 20%. If you regularly work as a subcontractor on construction sites, registering for CIS and staying verified reduces your deduction rate immediately.",
      },
    ],
  },

  {
    slug: "scaffolders",
    segment: "trade",
    title: "Scaffolders",
    headline: "Specialist accountants for scaffolders",
    metaTitle: "Accountants for Scaffolders | CIS Tax & Refund Service",
    metaDescription:
      "CIS accountants for self-employed scaffolders. CIS refunds, gross payment status, sole trader and limited company scaffolding tax accounting.",
    intro:
      "Scaffolding subcontractors working under CIS operate in one of the more specialised construction trades. The capital cost of scaffold equipment, significant materials supply (tubes, boards, fittings, base plates) and the specialist nature of the work create a distinct tax picture. Most scaffolding subbies have a meaningful CIS refund available.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "£30,000", label: "GPS qualification threshold (net)" },
    ],
    challenges: [
      {
        title: "Equipment and capital allowances",
        body:
          "Scaffold tubes, boards, couplers, base plates, staircase units and other equipment are plant and machinery eligible for capital allowances. Where you have significant equipment costs in a year, the Annual Investment Allowance provides 100% deduction. Many scaffolders overlook the capital allowance position when building up their kit.",
      },
      {
        title: "Materials supplied on jobs",
        body:
          "When you supply scaffold components (tubes, boards, fittings) as part of a contract and these are consumed or left on site, the materials cost should be excluded from the CIS deduction base. If the main contractor is not doing this split, you may be overpaying.",
      },
      {
        title: "CISRS cards and training costs",
        body:
          "CISRS (Construction Industry Scaffolders Record Scheme) cards are a professional requirement for scaffolders. Card fees and renewal costs are fully allowable expenses. Training costs directly related to maintaining your CISRS card qualification also qualify.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim",
        body:
          "We calculate your full refund, check deduction statements for correct materials splitting, claim capital allowances on equipment purchases, and submit your Self Assessment return.",
      },
      {
        title: "Capital allowances review",
        body:
          "We review your equipment acquisitions and ensure you are claiming the correct capital allowances. For scaffolders investing in their own kit, this can significantly reduce the tax bill in the year of purchase.",
      },
      {
        title: "Gross payment status",
        body:
          "If your net CIS turnover exceeds £30,000, we manage the GPS application and ongoing compliance.",
      },
    ],
    faqs: [
      {
        question: "I bought a full set of scaffold equipment this year. Can I claim the full cost?",
        answer:
          "Yes, in most cases. The Annual Investment Allowance provides 100% first-year deduction for qualifying plant and machinery up to £1 million per year. Scaffold tubes, boards, fittings and base plates are qualifying plant and machinery. The full cost can be deducted in the year of purchase.",
      },
      {
        question: "What is CISRS and is the card fee allowable?",
        answer:
          "CISRS stands for Construction Industry Scaffolders Record Scheme. It is the primary professional certification for scaffolders and is widely required on construction sites. The annual card fee and renewal costs are fully allowable business expenses.",
      },
    ],
  },

  {
    slug: "civil-engineers",
    segment: "trade",
    title: "Civil Engineers",
    headline: "Specialist accountants for civil engineers",
    metaTitle: "Accountants for Civil Engineers | CIS & Construction Tax",
    metaDescription:
      "CIS and tax accounting for self-employed civil engineers and structural contractors. CIS refunds, gross payment status and construction accounting specialists.",
    intro:
      "Civil and structural engineers working as self-employed subcontractors in construction operate in one of the most technically demanding corners of the CIS scheme. Heavy civil works, infrastructure contracts, plant hire and materials supply all create a complex deduction picture. Getting it right matters more as earnings grow.",
    stats: [
      { value: "20%", label: "Deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "£30,000", label: "GPS qualification threshold (net of materials)" },
    ],
    challenges: [
      {
        title: "Plant hire and large materials costs",
        body:
          "Civil engineering work often involves significant plant hire costs (excavators, dumpers, piling rigs) and materials (aggregates, concrete, steel, geotextiles). Both are excluded from the CIS deduction base when passed on to the main contractor. Verifying the deduction base is correct requires careful review of each deduction statement.",
      },
      {
        title: "Public sector infrastructure contracts",
        body:
          "Much civil engineering work is on public sector infrastructure projects: roads, drainage, utilities, flood defences. These are typically subject to CIS in the usual way. Main contractors on public sector projects are often large organisations with complex verification and payment processes. Staying registered, verified and compliant with your CIS return obligations is especially important at this scale.",
      },
      {
        title: "Professional body fees and CPD",
        body:
          "ICE, CIOB or other professional body membership fees, CPD training costs and professional indemnity insurance are all allowable expenses. Civil engineers with professional qualifications often have significant annual professional costs that are underchimed.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and Self Assessment",
        body:
          "We review your deduction statements, verify the deduction base including plant hire and materials, claim all professional and expense allowances, and submit your Self Assessment return.",
      },
      {
        title: "GPS application for civil engineering contractors",
        body:
          "Civil engineering contractors with net CIS turnover over £30,000 can apply for GPS. We manage the application and the three compliance tests: business, turnover and compliance.",
      },
      {
        title: "Limited company structure for higher earners",
        body:
          "For civil engineers earning at higher income levels, a CIS-registered limited company allows real-time reclaim of deductions via EPS submissions. We model the comparison for your specific situation.",
      },
    ],
    faqs: [
      {
        question: "I hire plant and supply aggregates on civil engineering contracts. Are these excluded from CIS?",
        answer:
          "Yes, both should be excluded from the CIS deduction base. Plant hire costs passed on at cost and materials (including aggregates, concrete and other bulk materials) supplied for a job are excluded. Only the labour element of your invoice is subject to the 20% deduction.",
      },
      {
        question: "I work through a limited company on infrastructure contracts. Do I still need to deal with CIS?",
        answer:
          "Yes. CIS applies to companies as well as individuals. Your company must register with HMRC as a CIS subcontractor, and main contractors deduct 20% from the labour element of payments to your company. Your company recovers those deductions via EPS monthly submissions or through the annual Corporation Tax return.",
      },
    ],
    testimonial: {
      quote:
        "I had been filing my own returns for years. Nobody had told me I could exclude plant hire from the deduction base or that my professional fees were allowable. The catch-up refund was significant.",
      attribution: "Self-employed civil engineering contractor, major infrastructure project",
    },
  },

  {
    slug: "bricklayers",
    segment: "trade",
    title: "Bricklayers",
    headline: "Specialist CIS accountants for bricklayers",
    metaTitle: "CIS Accountants for Bricklayers | Tax Refunds & GPS",
    metaDescription:
      "CIS accounting for bricklayers. Most bricklaying subcontractors overpay tax because deductions are taken before materials and expenses. We reclaim what you are owed.",
    intro:
      "Bricklaying is one of the most consistently cited trades in HMRC's own CIS worked examples, and with good reason. The split between labour and materials on a bricklayer's invoice is specific and easy to get wrong, with most errors costing subcontractors money rather than the contractor.",
    stats: [
      { value: "20%", label: "CIS deducted on labour" },
      { value: "~£2,000", label: "Average annual overpayment" },
      { value: "0%", label: "Deducted with Gross Payment Status" },
    ],
    challenges: [
      {
        title: "Labour and materials split",
        body:
          "HMRC deductions apply to your labour only, not to materials such as bricks, mortar, sand and cement. If a contractor applies the 20% rate to the full invoice value rather than the labour element, you lose money on every job.",
      },
      {
        title: "High volume of small contractor relationships",
        body:
          "Bricklayers frequently work across several contractors simultaneously or in sequence. Each must verify your status and issue a payment and deduction statement. Missing statements make it harder to reconcile your annual refund.",
      },
      {
        title: "Unregistered status penalties",
        body:
          "Working without CIS registration means contractors deduct 30% from your labour income rather than 20%. That gap compounds over a full year and significantly reduces your take-home pay until you register.",
      },
      {
        title: "Self Assessment complexity",
        body:
          "Bricklayers who use plant, vehicles, specialist tools and multiple materials face a more complex allowable expenses calculation than trades with simpler cost profiles. Every misclassified expense reduces your refund.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and Self Assessment",
        body:
          "We calculate your correct labour income, apply all allowable expenses including materials, tools, mileage at 55p per mile and protective clothing, and file your Self Assessment return to recover the maximum refund.",
      },
      {
        title: "CIS deduction base review",
        body:
          "We check your payment and deduction statements to confirm contractors are deducting only from the labour element. Where errors are found, we pursue corrections before your year-end filing.",
      },
      {
        title: "Gross Payment Status application",
        body:
          "If your net annual CIS turnover exceeds £30,000 and your compliance record is clean, we manage the GPS application and the ongoing maintenance to keep the 0% deduction rate in place.",
      },
    ],
    faqs: [
      {
        question: "Can I claim for mortar, bricks and cement as expenses?",
        answer:
          "Materials you supply as part of a job are excluded from the CIS deduction base, which means they reduce the amount deducted at source. You can also claim them as expenses in your Self Assessment return if they are costs you have personally borne. Keep receipts for every materials purchase.",
      },
      {
        question: "What if my contractor deducted CIS from the full invoice, not just labour?",
        answer:
          "This is a common error. If you can evidence the materials split (receipts, invoices to your contractor), the overpaid deduction can be corrected either within the contractor's CIS return or at year-end via your Self Assessment. We can review your statements and identify whether an overclaim has occurred.",
      },
    ],
  },

  {
    slug: "plasterers",
    segment: "trade",
    title: "Plasterers",
    headline: "Specialist CIS accountants for plasterers",
    metaTitle: "CIS Accountants for Plasterers | Tax Refunds & GPS",
    metaDescription:
      "CIS accounting for plasterers. Deductions on plasterwork take no account of your materials, tools or personal allowance. A specialist review typically identifies an overpayment.",
    intro:
      "Plasterers operate across some of the most materials-intensive work in construction. Plaster, plasterboard, bonding compounds, skimming materials and specialist tools all add up to a cost base that CIS deductions completely ignore. Most plastering subcontractors are owed a refund at the end of each tax year.",
    stats: [
      { value: "20%", label: "CIS deducted on labour" },
      { value: "~£2,000", label: "Typical annual overpayment" },
      { value: "6%", label: "Class 4 NI on profits up to £50,270" },
    ],
    challenges: [
      {
        title: "Materials-heavy cost profile",
        body:
          "Plaster, bonding, beading, screws and plasterboard are consumable costs on every job but CIS deductions take no account of them. They must be correctly excluded from the deduction base and separately claimed as expenses.",
      },
      {
        title: "Mixed sole trader and limited company work",
        body:
          "Some plasterers operate via a limited company to reduce their overall tax exposure. The CIS reclaim mechanism differs completely between the two structures, and errors in filing can delay refunds by months.",
      },
      {
        title: "Tools and equipment claims",
        body:
          "Trowels, floats, gauging equipment, scaffolding boards and access equipment are legitimate deductions but are frequently under-claimed. A review of your receipts typically identifies missed expense claims.",
      },
      {
        title: "Gross Payment Status eligibility",
        body:
          "Plasterers with stable contractor relationships and consistent turnover above £30,000 net may qualify for GPS, eliminating the 20% deduction entirely. Many do not apply because they are unaware of the threshold or the process.",
      },
    ],
    howWeHelp: [
      {
        title: "Full Self Assessment and refund claim",
        body:
          "We work through your deduction statements, materials costs, tools, van expenses and mileage at 55p per mile to calculate the maximum refund and file your Self Assessment return accurately.",
      },
      {
        title: "Deduction base audit",
        body:
          "We confirm that contractors have applied the 20% or 30% rate only to your labour income, not to materials you have supplied. Overclaimed deductions are identified and pursued.",
      },
      {
        title: "GPS application and maintenance",
        body:
          "We assess your GPS eligibility, handle the application and monitor your ongoing compliance to protect the status under the April 2026 anti-fraud rules.",
      },
    ],
    faqs: [
      {
        question: "Can I claim for plaster and other materials I buy for jobs?",
        answer:
          "Yes. Materials you supply are excluded from the CIS deduction base, meaning the contractor should not deduct CIS from that portion of your invoice. You can also claim materials as business expenses in your Self Assessment return. Keep all receipts and a log of which materials went to which job.",
      },
      {
        question: "I work for several contractors. Do I need a statement from each one?",
        answer:
          "Yes. Each contractor who makes a CIS deduction is legally required to give you a written payment and deduction statement every time they make a payment with a deduction. You need all of them to reconcile your year-end Self Assessment. If a contractor has not issued one, they are in breach and you should request it in writing.",
      },
    ],
  },

  {
    slug: "labourers",
    segment: "trade",
    title: "Labourers and General Operatives",
    headline: "CIS tax refunds for labourers and general operatives",
    metaTitle: "CIS Tax Refunds for Labourers | Trade Tax Specialists",
    metaDescription:
      "CIS accounting for construction labourers and general operatives. If you work under CIS and have deductions taken from your pay, you are likely owed money back at the end of the tax year.",
    intro:
      "Labourers and general operatives are the largest single group of CIS-registered workers in the UK. Because labouring work is almost entirely labour with very few materials, the deduction base is the full labour payment. Many labourers are unregistered and suffering the 30% rate without knowing that registration costs nothing and immediately cuts their deduction to 20%.",
    stats: [
      { value: "30%", label: "Deducted if unregistered" },
      { value: "20%", label: "Deducted once CIS registered" },
      { value: "0%", label: "Deducted with Gross Payment Status" },
    ],
    challenges: [
      {
        title: "Unregistered status",
        body:
          "Many labourers have never registered for CIS, meaning contractors deduct 30% from every labour payment rather than 20%. The 10% gap on £30,000 of annual earnings costs £3,000 a year in unnecessary deductions. Registration is free and immediate.",
      },
      {
        title: "Frequent contractor changes",
        body:
          "General operatives often move between different contractors and sites across the year. Each new contractor must re-verify your status before making the first payment. Gaps in verification can lead to incorrect deduction rates being applied.",
      },
      {
        title: "No materials deduction",
        body:
          "Unlike trades that supply materials, labourers' income is almost entirely labour-based. That means the full labour payment is the CIS deduction base. Keeping mileage records, protective clothing receipts and tool purchases is important for reducing the Self Assessment tax bill.",
      },
      {
        title: "Missing deduction statements",
        body:
          "Contractors are required to issue a written deduction statement for every payment with a CIS deduction. Many labourers, particularly those on short-term engagements, never receive them and struggle to reconcile their year-end filing.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS registration and immediate rate reduction",
        body:
          "We handle CIS registration where it has not been completed, immediately changing your deduction rate from 30% to 20% for all future payments.",
      },
      {
        title: "Self Assessment and refund claim",
        body:
          "We gather your deduction statements, calculate your allowable expenses including mileage at 55p per mile, tools and protective clothing, and file your Self Assessment return to recover your annual overpayment.",
      },
      {
        title: "Route to Gross Payment Status",
        body:
          "If your net CIS turnover has exceeded £30,000 over the past 12 months and your tax record is clean, we assess and manage your GPS application to eliminate deductions entirely.",
      },
    ],
    faqs: [
      {
        question: "I have never registered for CIS. Can I still claim back what I have overpaid?",
        answer:
          "Yes. You can register for CIS at any time and claim back overpaid deductions through Self Assessment going back up to four tax years. If contractors have been deducting 30% because you were unregistered, you can reclaim the difference between what was deducted and your actual tax liability for each open year.",
      },
      {
        question: "My contractors have never given me a deduction statement. What do I do?",
        answer:
          "Every contractor who deducts CIS from your payment is legally required to give you a written statement. If they have not, contact them and request all outstanding statements in writing. If they refuse, HMRC's CIS helpline (0300 200 3210) can assist. Without statements you cannot accurately verify the deductions on your Self Assessment return.",
      },
    ],
  },

  {
    slug: "demolition-contractors",
    segment: "trade",
    title: "Demolition Contractors",
    headline: "Specialist CIS accountants for demolition contractors",
    metaTitle: "CIS Accountants for Demolition Contractors | GPS & Compliance",
    metaDescription:
      "CIS accounting for demolition contractors and subcontractors. Demolition work falls squarely within CIS, and the April 2026 GPS anti-fraud rules make specialist compliance support more important than ever.",
    intro:
      "Demolition is a capital-intensive trade with large contracts, specialist plant and a significant proportion of limited company operators. Most demolition subcontractors are either already on Gross Payment Status or should be applying for it. The April 2026 CIS anti-fraud changes, including immediate GPS revocation and director liability, make proper compliance management essential.",
    stats: [
      { value: "£30,000", label: "Turnover test for GPS (sole trader)" },
      { value: "0%", label: "CIS deduction with GPS" },
      { value: "30%", label: "Director liability under April 2026 rules" },
    ],
    challenges: [
      {
        title: "GPS revocation risk under April 2026 rules",
        body:
          "From 6 April 2026, HMRC can revoke GPS immediately and without advance notice if a contractor is found to have connections with fraud in the supply chain, on a 'knew or should have known' standard. Paying a connected party you knew, or had reason to know, was deliberately breaking CIS rules now carries a penalty of 20% of the payment under Finance Act 2026. Demolition contractors working with multiple subcontractors carry real exposure here.",
      },
      {
        title: "Due diligence as a contractor",
        body:
          "Demolition contractors who pay their own subcontractors must verify CIS status before the first payment, carry out Companies House checks and verify bank account names. Failing to do so no longer simply results in paying the wrong deduction rate; under April 2026 rules it can cost GPS status and trigger director penalties.",
      },
      {
        title: "Plant, equipment and materials complexity",
        body:
          "Demolition invoices often involve significant plant hire, fuel, disposal fees and salvage materials alongside labour. Correctly identifying which elements are subject to CIS deduction and which are not requires specialist knowledge.",
      },
      {
        title: "Limited company EPS reclaim timing",
        body:
          "Demolition companies operating as limited companies that suffer CIS deductions can reclaim them in real time via the Employer Payment Summary, rather than waiting months. Many do not use this mechanism and carry unnecessary cash-flow pressure as a result.",
      },
    ],
    howWeHelp: [
      {
        title: "GPS application, maintenance and April 2026 compliance",
        body:
          "We manage the GPS application, monitor the three qualifying tests annually, and implement the due-diligence documentation required under the April 2026 anti-fraud rules so your GPS is protected.",
      },
      {
        title: "Limited company EPS reclaim",
        body:
          "We configure the EPS reclaim mechanism for limited company demolition contractors, recovering CIS deductions against PAYE in real time and eliminating the 12 to 18 month wait.",
      },
      {
        title: "Contractor CIS returns",
        body:
          "We prepare and file your monthly CIS300 returns, including nil returns from April 2026, verify all subcontractors before their first payment, and issue compliant payment and deduction statements within the 14-day requirement.",
      },
    ],
    faqs: [
      {
        question: "Does demolition work fall under CIS?",
        answer:
          "Yes. Demolition is specifically listed as construction operations within the scope of CIS under the Income Tax (Construction Industry Scheme) Regulations 2005. All payments from contractors to subcontractors for demolition labour are subject to CIS deduction unless the subcontractor holds Gross Payment Status.",
      },
      {
        question: "What does the April 2026 GPS fraud rule mean for us as a contractor?",
        answer:
          "From 6 April 2026, if HMRC determines that your business had a connection with fraudulent CIS activity and that you knew or should have known about it, GPS can be revoked immediately with no advance notice and a five-year ban on reapplication. Payments made in the knowledge of a connected party's deliberate CIS failures also carry a penalty of 20% of the payment under Finance Act 2026, and HMRC can pursue company officers personally where deliberate behaviour is involved. To protect against this, you need documented pre-payment due diligence: CIS verification, Companies House checks and bank account name verification for every subcontractor.",
      },
    ],
  },

  {
    slug: "dryliners",
    segment: "trade",
    title: "Dryliners",
    headline: "Specialist CIS accountants for dryliners",
    metaTitle: "CIS Accountants for Dryliners | Tax Refunds & GPS",
    metaDescription:
      "CIS accounting for dryliners and partition installers. Most drylining subcontractors are sole traders with a strong GPS case once their turnover is assessed correctly.",
    intro:
      "Drylining and partition installation sits squarely within CIS as specified construction operations. Dryliners typically work as sole-trader subcontractors with high materials costs (plasterboard, metal framework, fixings) and a strong GPS eligibility case once their turnover picture is accurately assessed.",
    stats: [
      { value: "20%", label: "CIS deducted on labour" },
      { value: "£30,000", label: "Turnover test for GPS" },
      { value: "~£2,000", label: "Typical annual overpayment" },
    ],
    challenges: [
      {
        title: "High materials costs excluded from GPS turnover",
        body:
          "The GPS turnover test is applied to net CIS income, meaning materials are excluded. Dryliners with high plasterboard and framework costs may find their qualifying CIS turnover is significantly lower than their total invoice value, affecting eligibility.",
      },
      {
        title: "Labour and materials split on invoices",
        body:
          "Dryliners supply significant quantities of plasterboard, metal studs, track, fixings and insulation. Contractors should apply CIS deduction only to the labour element. Where the full invoice is deducted, money is lost on every job.",
      },
      {
        title: "Multiple trade overlaps",
        body:
          "Dryliners frequently carry out associated work including taping, jointing, skimming and ceiling fixing. Correctly identifying which elements fall within CIS-specified operations and which might not requires care at invoice and Self Assessment level.",
      },
      {
        title: "Tool and equipment depreciation",
        body:
          "Drylining requires a significant toolkit including screw guns, track cutters, board lifters and levels. These are legitimate capital allowance or expense claims but are frequently overlooked in self-filed returns.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and Self Assessment",
        body:
          "We identify all allowable expenses for drylining work, including materials, tools, mileage at 55p per mile, protective equipment and use-of-home where applicable, and file your Self Assessment to recover the maximum refund.",
      },
      {
        title: "GPS eligibility assessment and application",
        body:
          "We calculate your net CIS turnover correctly, assess all three GPS qualifying tests and manage the application to eliminate the 20% deduction if you qualify.",
      },
      {
        title: "Deduction base review",
        body:
          "We audit your payment and deduction statements to confirm the 20% rate is applied only to your labour income. Materials that contractors have incorrectly included in the deduction base are identified and corrected.",
      },
    ],
    faqs: [
      {
        question: "Does drylining and partition installation fall under CIS?",
        answer:
          "Yes. Installation of partition walls, plasterboard systems and associated internal structural work is a specified CIS construction operation. Payments from contractors to drylining subcontractors are subject to CIS deduction unless the subcontractor holds Gross Payment Status.",
      },
      {
        question: "My materials costs are high. Does that affect my GPS application?",
        answer:
          "It can. The GPS turnover test uses your net CIS income, which excludes materials. If your plasterboard, framework and fixings costs are high relative to your total invoiced amount, your qualifying turnover will be lower. We calculate the correct net figure as part of any GPS assessment to determine whether you meet the £30,000 sole-trader threshold.",
      },
    ],
  },
  // ---- batch1 ----
  {
    slug: "carpenters",
    segment: "trade",
    title: "Carpenters",
    headline: "Specialist accountants for carpenters",
    metaTitle: "Accountants for Carpenters | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed carpenters. CIS tax refunds, gross payment status, sole trader and limited company accounting. Most carpenters are owed money back.",
    intro:
      "Self-employed carpenters working under CIS supply both skilled labour and significant quantities of materials on most jobs: timber, sheet goods such as OSB and MDF, ironmongery, fixings and sealants. The CIS deduction applies only to the labour element of your invoice, not to the materials you supply, so every job where your contractor deducts from the full invoice total is a job where you are overpaying. Recovering that overpayment, combined with mileage, tools and workshop costs, typically produces a meaningful refund at year end.",
    stats: [
      { value: "20%", label: "Deducted on labour payments only" },
      { value: "0%", label: "Deducted on materials (timber, sheet goods, ironmongery)" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "Labour and materials split on every job",
        body:
          "CIS deductions apply only to the labour element of a carpentry invoice. Timber, sheet materials (OSB, MDF, plywood), ironmongery and fixings you supply are excluded from the deduction base. In practice, many main contractors apply the 20% rate to the full invoice rather than separating materials from labour. If your deduction slips do not reflect a correct split, you are overpaying on every job and that overpayment is recoverable through Self Assessment.",
      },
      {
        title: "Workshop and hand-tool capital allowances",
        body:
          "Carpenters often carry a substantial tool inventory: routers, jigsaws, circular saws, chisels, planes, clamps and site boxes. These are plant and machinery eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying tool and equipment expenditure up to £1 million per year. Many carpenters claim only a fraction of what they are entitled to, treating tools as minor costs rather than a significant capital allowance claim.",
      },
      {
        title: "Van costs: actual versus mileage rate",
        body:
          "Carpenters typically run a loaded van between jobs, carrying timber, sheet materials and tools. You can claim the actual running costs of the van (fuel, insurance, road tax, servicing, finance interest) or the AMAP rate of 55p per mile for cars and vans from 6 April 2026. For high-mileage tradespeople the actual-cost route often produces the larger deduction. We calculate both and use whichever is correct for your situation.",
      },
      {
        title: "Unregistered status and the 30% rate",
        body:
          "A self-employed carpenter who is not registered for CIS will have 30% deducted from their labour income rather than 20%. On £40,000 of annual labour income, that gap costs £4,000 a year. CIS registration is free and cuts the deduction rate immediately. We check your registration status and fix any verification issues with HMRC that might cause a contractor to apply the higher rate.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund calculation and claim",
        body:
          "We review your payment and deduction statements, verify the labour/materials split on each job, account for all allowable expenses including tools, van costs and mileage at 55p per mile, and submit your Self Assessment return to recover the full refund. Most carpenters receive their refund within 8 to 12 weeks of a correctly filed return.",
      },
      {
        title: "Capital allowances review on tools and equipment",
        body:
          "We identify every qualifying tool and item of equipment and claim the correct capital allowance. For a carpenter who has invested in a new tool set, workshop equipment or site machinery in the year, this can significantly reduce the Self Assessment tax bill.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour income, excluding materials and VAT) exceeds £30,000, you may qualify for GPS and receive payments with no deduction at all. We handle the application, the three qualifying tests and the compliance record that keeps GPS in place.",
      },
    ],
    faqs: [
      {
        question: "I buy all my own timber and sheet materials. Should my contractor deduct CIS from those costs?",
        answer:
          "No. The cost of materials you supply for a job is excluded from the CIS deduction base. Only the labour element of your invoice should attract the 20% deduction. If your contractor is applying the rate to the full invoice value including materials, you are overpaying. Keep your materials receipts and we will make sure the correct split is reflected in your Self Assessment return.",
      },
      {
        question: "Can I claim capital allowances on my carpentry tools?",
        answer:
          "Yes. Hand tools, power tools and workshop equipment used in your trade are plant and machinery for capital allowance purposes. The Annual Investment Allowance provides a 100% deduction in the year of purchase on qualifying expenditure up to £1 million. Tools costing under £200 per item can also be claimed as a revenue expense in the year of purchase rather than through capital allowances.",
      },
      {
        question: "From 6 April 2026, what is the mileage rate for a self-employed carpenter?",
        answer:
          "The AMAP rate for cars and vans from 6 April 2026 is 55p per mile for the first 10,000 business miles, then 25p per mile after that. If you are driving between jobs, to timber merchants or to tool suppliers, keep a record of those journeys. We make sure the full mileage claim is included in your return.",
      },
    ],
    testimonial: {
      quote:
        "I had been splitting out materials on my invoices but my contractor was still deducting from the full amount. Once the statements were reviewed and corrected at year end, the refund was considerably more than I had budgeted for.",
      attribution: "Self-employed carpenter, East Midlands",
    },
  },

  {
    slug: "tilers",
    segment: "trade",
    title: "Tilers",
    headline: "Specialist accountants for tilers",
    metaTitle: "Accountants for Tilers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed tilers. CIS tax refunds, gross payment status, tiles and adhesive excluded from deductions. Most tilers are owed money back.",
    intro:
      "Self-employed tilers working under CIS on commercial or new-build residential projects have 20% taken from their labour payments. Tiles, adhesive, grout, primers and waterproofing membranes you supply for a job are excluded from the CIS deduction base entirely. Because tiling work is often materials-intensive, with tile costs sometimes exceeding labour on high-specification finishes, correctly separating materials from labour on every invoice matters considerably to your year-end refund position.",
    stats: [
      { value: "20%", label: "Deducted on labour payments only" },
      { value: "0%", label: "Deducted on tiles, adhesive and grout" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "High materials costs excluded from CIS deduction base",
        body:
          "On high-specification projects, the cost of tiles, adhesive, grout, primers and waterproofing membranes can exceed the labour element on a single job. All of these materials are excluded from the CIS deduction base. If your main contractor applies the 20% rate to the full invoice rather than the labour portion only, you lose money on every materials-heavy job. We review your deduction statements and identify where the split has been applied incorrectly.",
      },
      {
        title: "Tile cutters, wet saws and specialist tools",
        body:
          "Tilers typically invest in wet saws, angle grinders, suction lifters and a range of specialist hand tools. These are plant and machinery eligible for capital allowances under the Annual Investment Allowance, which provides a 100% first-year deduction on qualifying expenditure. If you have bought new cutting equipment or a powered tile saw during the year, that cost should be in your return.",
      },
      {
        title: "Scope of CIS: installation versus repair and maintenance",
        body:
          "CIS applies to construction operations, which includes new tile installations in construction settings. Repair and maintenance tiling on domestic properties for private clients is generally outside CIS. However, repair and maintenance work on commercial properties, or work forming part of a larger construction project, may still be within scope. If you carry out a mix of work types, correctly identifying which payments are subject to CIS deduction affects both your deduction rate and your Self Assessment position.",
      },
      {
        title: "Mileage and travel between sites",
        body:
          "Tiling contracts frequently require travel across multiple sites or to specialist tile suppliers. From 6 April 2026 the AMAP rate for cars and vans is 55p per mile for the first 10,000 business miles. Maintaining a mileage log throughout the year is the simplest way to ensure the full claim is captured.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim with correct materials split",
        body:
          "We review every payment and deduction statement, verify that the deduction base excludes tiles, adhesive and other materials, account for allowable expenses including mileage at 55p per mile and specialist tools, and submit your Self Assessment return. Most tilers receive their refund within 8 to 12 weeks.",
      },
      {
        title: "Capital allowances on cutting and specialist equipment",
        body:
          "We identify wet saws, tile cutters, angle grinders and other capital items and claim the Annual Investment Allowance in the year of purchase. For tilers who have invested in new equipment, this can substantially reduce the tax bill for that year.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net CIS turnover (labour income, excluding tiles, adhesive, grout and VAT) exceeds £30,000, you may qualify for GPS and receive gross payments with no CIS deduction. We manage the application and the ongoing compliance required to keep the status in place.",
      },
    ],
    faqs: [
      {
        question: "I supply all the tiles, adhesive and grout myself. Should my contractor deduct CIS from the full invoice?",
        answer:
          "No. The cost of materials you supply, including tiles, adhesive, grout and primers, is excluded from the CIS deduction base. Only the labour element of your invoice should attract the 20% deduction. If your contractor deducts from the full invoice value, you are overpaying, and that difference is recoverable through your Self Assessment return.",
      },
      {
        question: "I do some private domestic tiling repair work alongside my CIS jobs. Does CIS apply to both?",
        answer:
          "CIS applies to payments from contractors to subcontractors for construction operations. Private domestic repair and maintenance work where you invoice the homeowner directly is generally outside CIS. However, if the repair work forms part of a larger construction project, or if the domestic client is actually a contractor, CIS may still apply. We review your income across the year to make sure each income stream is treated correctly.",
      },
    ],
    testimonial: {
      quote:
        "On larger commercial jobs the tile cost is bigger than my day rate. I had no idea that the deduction should only be on labour. Getting that corrected made a real difference to what I got back.",
      attribution: "Self-employed tiler, West Midlands",
    },
  },

  {
    slug: "glaziers",
    segment: "trade",
    title: "Glaziers",
    headline: "Specialist accountants for glaziers",
    metaTitle: "Accountants for Glaziers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed glaziers. CIS tax refunds, glass units and sealants excluded from deductions, gross payment status and sole trader accounting.",
    intro:
      "Self-employed glaziers working on construction projects operate in one of the more technically specific CIS trades. Glass units, double-glazing sealed units, structural glazing components, aluminium frames, sealants and gaskets you supply are excluded from the CIS deduction base, yet glazing materials can represent a large proportion of a single contract value. The labour-only deduction rule, if applied correctly, significantly reduces the overpayment that most glazing subcontractors carry into each Self Assessment year.",
    stats: [
      { value: "20%", label: "Deducted on labour payments only" },
      { value: "0%", label: "Deducted on glass units, frames and sealants" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "High-value glass units excluded from the deduction base",
        body:
          "Double-glazed sealed units, structural glass, curtain walling components and specialist glazing systems can carry significant unit costs. These materials are excluded from the CIS deduction base. If your main contractor applies the 20% deduction to the full contract value rather than the labour portion only, the overpayment on a single contract can run to hundreds of pounds. Over a year's work, it accumulates quickly. We check your deduction statements and identify every job where the split was not applied correctly.",
      },
      {
        title: "Glazing installation versus repair: CIS scope",
        body:
          "CIS applies to construction operations. Glazing installation as part of a new build or fit-out project is clearly within CIS. Straightforward glass repair and replacement carried out on a domestic property for a private homeowner is typically outside CIS. However, glass repair on a commercial building, or replacement forming part of a larger refurbishment contract, may still be within scope. The distinction matters because it determines whether a deduction should be made at all. If you carry out a mix of installation and repair across different contract types, we ensure each is classified correctly.",
      },
      {
        title: "Specialist tools and glazing equipment",
        body:
          "Suction lifters, glass cutters, frame sealant guns, drilling equipment and safety equipment for working with large glass panes all qualify as plant and machinery for capital allowance purposes. The Annual Investment Allowance provides a 100% first-year deduction on qualifying expenditure. Safety gloves, goggles and PPE required for glazing work are also allowable expenses.",
      },
      {
        title: "Verification and the 30% rate",
        body:
          "Glaziers who are not registered for CIS, or whose registration cannot be verified by a contractor, will have 30% deducted from labour income rather than 20%. If you have recently changed your trading name, address or UTR without notifying HMRC, verification may fail and the higher rate may be applied unnecessarily. We identify and resolve verification issues quickly.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund with correct materials exclusion",
        body:
          "We review your deduction statements job by job, verify that glass, frames, sealants and gaskets are excluded from the deduction base, account for all allowable expenses, and submit your Self Assessment return. For glaziers with high glass costs on site, correctly applying the materials exclusion often produces a substantially larger refund than self-filed returns.",
      },
      {
        title: "CIS scope review across contract types",
        body:
          "If you carry out a mix of new installation work and repair or maintenance glazing, we review each income stream and ensure that CIS deductions are applied where they should be and not applied where they should not. Incorrectly treated income streams create errors in either direction on the Self Assessment return.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour income, excluding glass, frames, sealants and VAT) exceeds £30,000, you may qualify for GPS and receive payments in full with no deduction. We handle the three qualifying tests, the application and the ongoing compliance.",
      },
    ],
    faqs: [
      {
        question: "I supply the glass units and frames on every job. Should CIS be deducted from the full contract price?",
        answer:
          "No. The cost of materials you supply, including double-glazed units, frames, sealants and gaskets, is excluded from the CIS deduction base. Only the labour element of the contract should attract the 20% deduction. If your contractor applies the deduction to the full contract value, you are overpaying on every job and that amount is recoverable through Self Assessment.",
      },
      {
        question: "I replace broken windows in domestic properties for private clients. Do I need to register for CIS?",
        answer:
          "Probably not for that work specifically. CIS applies to payments made by contractors to subcontractors for construction operations. Where you invoice the homeowner directly for a straightforward glass repair or replacement on their domestic property, that transaction is generally outside CIS. CIS becomes relevant when you work as a subcontractor under a main contractor on a construction, refurbishment or commercial glazing project. If you carry out both types of work, the CIS-scope work and the non-CIS work need to be treated separately in your return.",
      },
    ],
  },

  {
    slug: "steel-fixers",
    segment: "trade",
    title: "Steel Fixers",
    headline: "Specialist accountants for steel fixers",
    metaTitle: "Accountants for Steel Fixers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed steel fixers. Labour-only invoices mean the full payment is the CIS deduction base. GPS and sole trader accounting specialists.",
    intro:
      "Steel fixers are one of the most labour-intensive trades in construction. On most contracts, the rebar and reinforcement materials are supplied by the main contractor, meaning a steel fixer's invoice is almost entirely labour. That matters for CIS because the 20% deduction applies to the full labour payment with very little materials offset to reduce the base, making the deduction rate more impactful than for trades that supply significant materials. It also means that allowable expenses, correct registration and GPS eligibility become the main tools for reducing the annual tax burden.",
    stats: [
      { value: "20%", label: "Deducted on labour (often the full invoice)" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
      { value: "£30,000", label: "GPS turnover threshold (net of materials)" },
    ],
    challenges: [
      {
        title: "Predominantly labour invoices and full deduction exposure",
        body:
          "Because rebar and reinforcement steel are typically supplied by the main contractor rather than by the steel fixer, most steel-fixer invoices consist almost entirely of labour. That means the CIS deduction base is close to the full invoice value on most jobs. There is little materials exclusion to reduce the overpayment. As a result, registration status, correct expenses and GPS eligibility matter more to a steel fixer's annual tax position than they do for trades with higher materials supply.",
      },
      {
        title: "Where steel fixers do supply materials",
        body:
          "On some smaller contracts or self-managed jobs, a steel fixer may supply binding wire, tying tools or bar spacers. These materials are excluded from the CIS deduction base even when the amounts are modest. Where you supply materials, they should be itemised on your invoice and excluded from the deduction calculation. We check your statements and identify any jobs where a materials exclusion applies.",
      },
      {
        title: "Tools, PPE and site expenses",
        body:
          "Bar benders, rebar tyers, bolt cutters, angle grinders and safety equipment are all allowable expenses or capital allowance items. Steel fixers also commonly require steel-toe boots, gloves, hard hats, hi-vis and cut-resistant PPE. These costs are fully allowable against your CIS income. Many self-filed returns miss a significant proportion of these claims.",
      },
      {
        title: "GPS as the most effective tax reduction route",
        body:
          "Because most steel-fixer income is labour, and the deduction therefore applies to almost the full invoice, reaching GPS eliminates the 20% deduction entirely. Once your net CIS turnover exceeds £30,000, GPS becomes the most valuable outcome we can achieve for you. The compliance record requirement for GPS makes staying on top of returns and payment obligations important from day one.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and Self Assessment",
        body:
          "We calculate your full refund entitlement by accounting for all allowable expenses including tools, PPE, mileage at 55p per mile from April 2026, and any materials you supply. We submit your Self Assessment return to recover the overpayment. Most steel fixers receive their refund within 8 to 12 weeks of a correctly filed return.",
      },
      {
        title: "Gross payment status application and compliance",
        body:
          "We assess your GPS eligibility, apply all three qualifying tests, and manage the application. Because steel-fixer turnover is largely labour with minimal materials deduction from the net figure, the £30,000 threshold is often reached earlier than expected. We also maintain the compliance record that protects GPS status once it is granted.",
      },
      {
        title: "Limited company structure for higher earners",
        body:
          "At higher income levels, operating through a CIS-registered limited company allows deductions to be reclaimed in real time via the Employer Payment Summary rather than waiting for the annual Self Assessment return. We model the comparison between sole trader and limited company for your income level and show you the numbers.",
      },
    ],
    faqs: [
      {
        question: "My contractor supplies all the rebar. Does that mean the full invoice is subject to CIS?",
        answer:
          "Yes, in that scenario. CIS deductions apply to the labour element of an invoice. If no materials are being supplied by you, the full invoice is labour and the 20% deduction applies to the total. This is why GPS is particularly valuable for steel fixers: eliminating the deduction entirely is more impactful when the deduction base is the full invoice rather than just a portion of it.",
      },
      {
        question: "I sometimes supply binding wire and bar spacers. Can I exclude those from CIS?",
        answer:
          "Yes. Materials you supply, including binding wire, bar spacers and tying accessories, are excluded from the CIS deduction base even where the amounts are small. They should be itemised on your invoice and excluded from the deduction calculation by your contractor. If your contractor deducts from the full invoice including these materials, the overpayment is recoverable through Self Assessment.",
      },
      {
        question: "How does Getting GPS help a steel fixer more than other trades?",
        answer:
          "Because most steel-fixer invoices are primarily labour with minimal materials supply, the CIS deduction base is typically close to the full invoice value. GPS eliminates the 20% deduction entirely on that full labour amount. For a steel fixer on £60,000 of annual labour income, GPS saves approximately £12,000 in upfront deductions compared to the registered rate, which represents a substantial cash-flow and tax-timing advantage.",
      },
    ],
  },

  {
    slug: "ceiling-fixers",
    segment: "trade",
    title: "Ceiling Fixers",
    headline: "Specialist accountants for ceiling fixers",
    metaTitle: "Accountants for Ceiling Fixers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed ceiling fixers. MF grid systems and board excluded from deductions. CIS refunds, GPS and sole trader accounting specialists.",
    intro:
      "Ceiling fixers installing MF ceiling systems, suspended grid ceilings, acoustic panels and fire-rated board systems work almost entirely under CIS on commercial fit-out and new-build projects. The materials involved in ceiling fixing, including MF grid components, suspension wire, perimeter channel, ceiling tiles and fire-rated board, are excluded from the CIS deduction base. Because commercial ceiling projects can involve significant quantities of grid and board, getting the materials split right on every invoice can make a material difference to the annual refund.",
    stats: [
      { value: "20%", label: "Deducted on labour payments only" },
      { value: "0%", label: "Deducted on MF grid, board and acoustic tiles" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "MF grid systems and board excluded from the deduction base",
        body:
          "Metal framework (MF) ceiling components, suspension rods and wires, perimeter channel, acoustic ceiling tiles and fire-rated plasterboard you supply for a contract are excluded from the CIS deduction base. Only the labour element of your invoice should attract the 20% deduction. On a large commercial ceiling contract, the grid and board costs can be substantial, so a contractor applying the deduction to the full invoice value causes a significant overpayment on that job alone.",
      },
      {
        title: "Overlap with drylining and partition work",
        body:
          "Ceiling fixers on commercial sites frequently carry out associated drylining, partitioning or bulkhead work alongside the ceiling systems. All of these operations fall within CIS as specified construction operations. If you invoice for a combined scope that includes ceiling fixing and partition work, both elements are within CIS but the materials split across both must be handled correctly. We review combined invoices to ensure the deduction base on each element is accurate.",
      },
      {
        title: "Specialist tools and access equipment",
        body:
          "Ceiling fixers work at height and require specialist tools: screw guns, track cutters, laser levels and board-handling equipment. In commercial settings, access is often provided by the main contractor, but where you hire your own access equipment (push-along scaffolds, podium steps) and pass the cost on, those hire charges should also be excluded from the deduction base. Purchased tools and equipment are eligible for capital allowances under the Annual Investment Allowance.",
      },
      {
        title: "Compliance record for GPS eligibility",
        body:
          "Ceiling fixers on regular commercial contracts often have stable, consistent CIS turnover, making GPS eligibility a realistic target once net turnover exceeds £30,000. GPS requires a clean compliance record for the preceding 12 months: no late Self Assessment returns, no overdue tax, no PAYE defaults. Staying on top of obligations from the start of each tax year protects the eligibility window.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund with MF grid and board exclusions applied",
        body:
          "We review your payment and deduction statements, verify that MF grid, suspension components, ceiling tiles and plasterboard are excluded from the deduction base, account for all allowable expenses including mileage at 55p per mile from April 2026, tools and PPE, and submit your Self Assessment return. Most ceiling fixers receive their refund within 8 to 12 weeks of a correctly filed return.",
      },
      {
        title: "Multi-scope invoice review",
        body:
          "Where your work combines ceiling fixing with drylining, partitioning or bulkheads, we review the invoices across the full scope to ensure the labour and materials split is correctly applied to each element. Errors in combined-scope invoices are common and often result in overpayment on the materials-heavy portions.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour income, excluding MF grid, board, tiles and VAT) exceeds £30,000, we assess all three GPS qualifying tests, manage the application and maintain the compliance record. GPS eliminates the 20% deduction on every future labour payment, improving cash flow through the year rather than waiting for the annual Self Assessment refund.",
      },
    ],
    faqs: [
      {
        question: "I supply the MF grid system and all the ceiling board myself. Should CIS be deducted from the full contract amount?",
        answer:
          "No. The cost of materials you supply, including MF grid components, suspension wire, perimeter channel, acoustic tiles and fire-rated plasterboard, is excluded from the CIS deduction base. Only the labour element of the contract should attract the 20% deduction. If your contractor applies the deduction to the full contract value, you are overpaying and the excess is recoverable through Self Assessment.",
      },
      {
        question: "I also do drylining and partition work on the same contracts. Does CIS cover all of that?",
        answer:
          "Yes. Ceiling fixing, drylining and partition installation are all specified construction operations within CIS. If your invoice covers a combined scope, the entire labour element across all operations is subject to CIS deduction, and the materials you supply across all operations are excluded from the deduction base. The key is ensuring your invoices clearly itemise each element so your contractor can apply the split correctly.",
      },
      {
        question: "Does the MTD income test use gross or net income for a ceiling fixer?",
        answer:
          "The MTD for Income Tax threshold is based on gross income, meaning your total turnover before expenses and before any CIS deductions are applied. If your invoiced turnover exceeds £50,000 from April 2026, you are in scope for MTD even if the amount you actually receive after the 20% CIS deduction is lower. The threshold drops to £30,000 from April 2027. This catches many subcontractors who look at their bank receipts and assume they are below the threshold.",
      },
    ],
    testimonial: {
      quote:
        "On commercial contracts the grid and tile costs are significant. My contractor had been deducting from the full job value for two years. Sorting the split correctly and claiming back the overpayment was more than I expected.",
      attribution: "Self-employed ceiling fixer, Greater Manchester",
    },
  },
  // ---- batch2 ----
  // ─── 1. FLOORING CONTRACTORS ─────────────────────────────────────────────
  {
    slug: "flooring-contractors",
    segment: "trade",
    title: "Flooring Contractors",
    headline: "Specialist accountants for flooring contractors",
    metaTitle: "Accountants for Flooring Contractors | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed flooring contractors. CIS tax refunds, gross payment status, sole trader and limited company accounting. Materials costs excluded from deductions.",
    intro:
      "Flooring contractors working under CIS carry some of the highest materials costs of any finishing trade. Engineered boards, solid hardwood, luxury vinyl tile, screed, adhesives, underlay and grippers are consumed on every job. Those materials costs are excluded from the CIS deduction base entirely, meaning the 20% deduction applies only to the labour element of each invoice. Many main contractors do not split correctly, and the overpayment compounds quickly across a full year of jobs.",
    stats: [
      { value: "20%", label: "Deducted on labour only (materials excluded)" },
      { value: "~£2,000", label: "Illustrative first-year CIS refund" },
      { value: "55p", label: "AMAP mileage rate per mile from 6 April 2026" },
    ],
    challenges: [
      {
        title: "High materials share creates a large overpayment risk",
        body:
          "Flooring jobs are materials-intensive. Engineered boards, hardwood, LVT, carpet, screed compound, adhesives and underlay can represent 50% or more of an invoice value on larger contracts. CIS deductions should apply only to the labour element, never to materials you supply. If your main contractor deducts 20% from the full invoice, the overpayment on a materials-heavy job is significant. We review every deduction statement and identify where the split has been applied incorrectly.",
      },
      {
        title: "Screed and subfloor preparation: scope uncertainty",
        body:
          "Screed laying, subfloor levelling and damp-proofing membrane installation are all CIS-specified construction operations. Surface finishing and decorative floor laying in a domestic private home sits outside CIS when the client is a homeowner rather than a contractor. Flooring contractors who work across both commercial or new-build sites (CIS) and direct private clients (outside CIS) must keep two separate sets of records. Mixing the income streams or claiming expenses against the wrong income type causes errors at Self Assessment.",
      },
      {
        title: "Specialist tools and machinery",
        body:
          "Power floaters, screed pumps, floor grinders, parquet nailers, underfloor-heating sensors and moisture meters are legitimate capital expenditure. The Annual Investment Allowance provides a 100% first-year deduction for qualifying plant and machinery up to £1 million a year. Many flooring contractors undervalue their tool costs at year end or fail to claim capital allowances at all.",
      },
      {
        title: "Van and site travel costs",
        body:
          "Flooring contractors typically load a van with boards, adhesives and tools for every job. From 6 April 2026, the AMAP rate for cars and vans is 55p per mile for the first 10,000 business miles. If you claim actual vehicle costs instead (fuel, insurance, road tax, servicing, finance charges), we model which method produces the larger deduction for your annual mileage.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund calculation and claim",
        body:
          "We review your deduction slips, verify the labour/materials split on each invoice, account for all allowable expenses including tools, van costs and mileage at 55p per mile, and submit your Self Assessment return. Most flooring contractors receive their refund within 8 to 12 weeks of an accurate submission.",
      },
      {
        title: "Private vs CIS work: record-keeping structure",
        body:
          "We set up a clear records structure that separates your CIS subcontract income from direct private-client income. This prevents the two streams from contaminating each other at Self Assessment and ensures your expense claims are allocated correctly.",
      },
      {
        title: "Gross Payment Status application",
        body:
          "If your net annual CIS turnover (labour element only, excluding materials) exceeds £30,000, you may qualify for GPS and receive payments without any deduction. We handle the application and the ongoing compliance record that keeps it in place.",
      },
    ],
    faqs: [
      {
        question: "My contractor deducts CIS from the full invoice including the cost of boards and adhesives. Is that correct?",
        answer:
          "No. CIS deductions apply only to the labour element of an invoice. The cost of materials you supply for a job, including flooring boards, adhesives, screed compound and underlay, is excluded from the deduction base. If your contractor is applying the 20% rate to the full invoice value, you are overpaying on every job that involves materials supply. The overpayment is recoverable through your Self Assessment return.",
      },
      {
        question: "I do some jobs for homeowners directly and some for main contractors on sites. Which jobs fall under CIS?",
        answer:
          "Work for a main contractor on a new-build or commercial development is almost always within CIS. Work done directly for a homeowner as the end client is generally outside CIS, because private householders are not contractors for CIS purposes. The boundary matters because income from outside-CIS jobs is not subject to CIS deduction at source, though it is still taxable income you must report. Keeping the two sets of records separate from the start avoids complications at year end.",
      },
      {
        question: "How much is the mileage allowance for a flooring contractor's van?",
        answer:
          "From 6 April 2026, the AMAP rate for cars and vans used for business travel is 55p per mile for the first 10,000 miles (25p after that). If you use your van to travel between jobs and carry materials, keeping a journey log means you can claim the full mileage allowance against your taxable income.",
      },
    ],
    testimonial: {
      quote:
        "The materials on my bigger jobs came to nearly half the invoice. My contractor was taking the 20% off everything. Once we corrected the split across the whole year, the refund was much more than I had been expecting.",
      attribution: "Self-employed flooring contractor, East Midlands",
    },
  },

  // ─── 2. HEATING ENGINEERS ────────────────────────────────────────────────
  {
    slug: "heating-engineers",
    segment: "trade",
    title: "Heating Engineers",
    headline: "Specialist accountants for heating engineers",
    metaTitle: "Accountants for Heating Engineers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed heating engineers. CIS tax refunds, gross payment status, Gas Safe registration as an allowable expense, sole trader and limited company tax.",
    intro:
      "Heating engineers working under CIS on new-build and commercial contracts supply both skilled labour and significant materials: boilers, cylinders, radiators, pipework, controls and system components. CIS deductions apply to the labour element only. The cost of materials you supply is excluded from the deduction base. On a boiler installation or full heating system contract, getting this split right can mean the difference between a modest refund and a substantial one.",
    stats: [
      { value: "20%", label: "Deducted on labour (materials excluded)" },
      { value: "~£2,000", label: "Illustrative first-year CIS refund" },
      { value: "100%", label: "Gas Safe registration: allowable business expense" },
    ],
    challenges: [
      {
        title: "Boilers, cylinders and system components excluded from CIS base",
        body:
          "When you supply a boiler, unvented cylinder, radiators, expansion vessel or any other component as part of a contract, the cost of those materials should be excluded from the CIS deduction base. Only the labour element is subject to the 20% deduction. On a high-value boiler installation or a full heating system for a new-build development, the materials figure can be substantial. If your main contractor applies the deduction to the full invoice, the overpayment is significant and it is recoverable.",
      },
      {
        title: "Gas Safe registration and annual professional costs",
        body:
          "Gas Safe registration is a mandatory professional requirement for heating engineers working on gas appliances. The annual registration fee, individual card costs and any Gas Safe assessment fees are fully allowable business expenses. Many heating engineers pay these from a personal account and then fail to claim them, because the expense does not feel like a trade cost. It is, and it reduces your taxable income pound for pound.",
      },
      {
        title: "Specialist equipment and diagnostic tools",
        body:
          "Flue gas analysers, combustion analysers, leak detection equipment, pressure gauges, pipe bending machines and hand tools all represent capital expenditure eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction for qualifying plant and machinery up to £1 million. Heating engineers who invest in quality diagnostic equipment often underclaim because they expense it informally rather than through a formal allowance claim.",
      },
      {
        title: "Van costs and mileage",
        body:
          "A fully stocked van is essential for heating work. From 6 April 2026, the AMAP rate for cars and vans is 55p per mile for the first 10,000 business miles. Actual running costs (fuel, insurance, road tax, MOT, servicing, finance charges) are the alternative. We compare both for your mileage pattern and apply whichever produces the larger deduction.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund including professional registration costs",
        body:
          "We calculate your full refund entitlement, verify the labour/materials split on every deduction statement, include Gas Safe registration fees, tool costs and van expenses, and submit your Self Assessment return. Most heating engineers receive considerably more than they expect when the full expense picture is captured.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net CIS income (labour element, excluding materials) exceeds £30,000 per year, you may qualify for GPS and receive gross payments from main contractors with no deduction at all. We manage the application across all three qualifying tests and maintain the compliance record that keeps GPS in place.",
      },
      {
        title: "Ongoing compliance and MTD preparation",
        body:
          "Annual Self Assessment, CIS records management, and Making Tax Digital preparation if your gross income exceeds the relevant threshold. We handle the compliance so you can focus on the work.",
      },
    ],
    faqs: [
      {
        question: "I supply and fit the boiler on site. Should my contractor deduct CIS from the full invoice?",
        answer:
          "No. The cost of the boiler and any other components you supply is excluded from the CIS deduction base. Only the labour element of the invoice is subject to the 20% deduction. If your contractor is applying the rate to the full invoice including the boiler cost, you are overpaying on every installation. The overpayment is recoverable through your Self Assessment return.",
      },
      {
        question: "Is my Gas Safe registration fee tax deductible?",
        answer:
          "Yes, fully. Gas Safe registration is a mandatory professional cost for your trade and is 100% allowable as a business expense. Annual renewal fees, individual card costs and any associated assessment fees all qualify. They should be included in your Self Assessment expense claim every year.",
      },
      {
        question: "Do I have to file quarterly MTD updates if I work under CIS?",
        answer:
          "If your gross self-employment income exceeds £50,000 from April 2026, you must use MTD-compatible software and file quarterly digital updates. The threshold drops to £30,000 from April 2027. Importantly, the threshold is based on your gross income before CIS deductions, not the net amount you receive. A subcontractor earning £60,000 gross who receives £48,000 after deductions is tested on the £60,000 figure and is in scope from April 2026.",
      },
    ],
  },

  // ─── 3. KITCHEN FITTERS ──────────────────────────────────────────────────
  {
    slug: "kitchen-fitters",
    segment: "trade",
    title: "Kitchen Fitters",
    headline: "Specialist accountants for kitchen fitters",
    metaTitle: "Accountants for Kitchen Fitters | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed kitchen fitters. CIS tax refunds, gross payment status, materials exclusion from deductions, private vs site work record-keeping.",
    intro:
      "Kitchen fitting sits at the junction of construction site work and private domestic installation. On new-build developments and commercial fit-outs, kitchen fitters work under CIS contracts and have 20% deducted from their labour payments. The materials share on kitchen contracts is typically very high: units, worktops, appliances, sinks and fixings can account for the majority of an invoice value, yet those costs are excluded from the CIS deduction base. When a main contractor deducts on the full invoice, the overpayment is one of the largest of any finishing trade.",
    stats: [
      { value: "20%", label: "Deducted on labour only, never on materials" },
      { value: "~£2,000", label: "Illustrative first-year CIS refund" },
      { value: "£30,000", label: "GPS turnover threshold (net of materials)" },
    ],
    challenges: [
      {
        title: "Very high materials share creates over-deduction exposure",
        body:
          "Kitchen contracts involve some of the highest materials values of any CIS finishing trade. Kitchen units, carcasses, worktops, appliances, sinks, taps and fixings can represent 60% or more of a contract invoice. CIS deductions apply to the labour element only. If a main contractor applies the 20% rate to the full invoice rather than splitting out the materials, the overpayment per job is substantial and it compounds across a full year of site contracts.",
      },
      {
        title: "Domestic private work is outside CIS: record-keeping is critical",
        body:
          "Many kitchen fitters work on new-build site contracts (inside CIS) and direct private customer installations in existing homes (outside CIS). Work done for a private homeowner is not subject to CIS deduction because the homeowner is not a contractor. The two income streams must be kept strictly separate: expenses must be allocated to the right income type, and private income must still be reported on your Self Assessment return even though no deduction was taken at source. Mixing the two is one of the most common errors we see in kitchen fitters' accounts.",
      },
      {
        title: "Appliance costs: supplied vs client-supplied",
        body:
          "Where you source and supply the appliances yourself, those costs should be excluded from the CIS deduction base. Where the client or main contractor supplies the appliances and you fit only, the labour element is the full deduction base. The distinction matters for every job. Keeping a clear note of who supplied what, and at what cost, ensures the deduction base is accurate and defensible.",
      },
      {
        title: "Tools, power tools and installation equipment",
        body:
          "Jigsaws, routers, drills, biscuit jointers, impact drivers and measuring equipment represent capital expenditure eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction for qualifying plant and machinery up to £1 million. Kitchen fitters who invest regularly in tools often recover less than they are entitled to because informal expense tracking misses items.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund with correct materials exclusion",
        body:
          "We review your deduction statements, identify where the full invoice rather than the labour element has been used as the deduction base, and calculate the correct refund including all allowable expenses. For kitchen fitters with high materials costs, the refund can be considerably larger than a self-filed return produces.",
      },
      {
        title: "Separating CIS and private-client income",
        body:
          "We structure your records to keep CIS site income and private domestic income clearly separated. Each income stream carries its own allowable expenses, and the structure ensures your Self Assessment return is accurate and your expense claims defensible.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour element, excluding materials) exceeds £30,000, you may qualify for GPS. We calculate the correct net figure, assess all three qualifying tests and manage the application.",
      },
    ],
    faqs: [
      {
        question: "I supply all the kitchen units and appliances and then fit them on site for a main contractor. Should CIS apply to the full invoice?",
        answer:
          "No. The cost of kitchen units, appliances and other materials you supply should be excluded from the CIS deduction base. Only the labour element of the invoice is subject to the 20% deduction. If your contractor is deducting from the full invoice value, you are overpaying on every contract that involves materials supply. The overpayment is recoverable through your Self Assessment return.",
      },
      {
        question: "I also fit kitchens for private customers at home. Does CIS apply to those jobs?",
        answer:
          "No. Work carried out directly for a private homeowner is outside CIS because private householders are not contractors for CIS purposes. No deduction should be taken at source on those jobs. However, the income is still taxable and must be included on your Self Assessment return. Keeping your CIS site income and private customer income in separate records is important, as the two streams have different expense allocations.",
      },
      {
        question: "How does the GPS turnover test work if most of my invoice value is materials?",
        answer:
          "The GPS turnover test uses your net CIS income, which excludes materials costs. If kitchen units and appliances make up a large proportion of your invoiced amounts, your qualifying net turnover will be lower than your total invoiced value. We calculate the correct net figure as part of any GPS assessment to determine whether you meet the £30,000 sole-trader threshold.",
      },
    ],
    testimonial: {
      quote:
        "I had no idea there was a difference between what I charged for units and what should be in the CIS deduction. Every contractor had been taking 20% off the whole lot. The back-refund was eye-opening.",
      attribution: "Self-employed kitchen fitter, West Midlands",
    },
  },

  // ─── 4. BATHROOM FITTERS ─────────────────────────────────────────────────
  {
    slug: "bathroom-fitters",
    segment: "trade",
    title: "Bathroom Fitters",
    headline: "Specialist accountants for bathroom fitters",
    metaTitle: "Accountants for Bathroom Fitters | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed bathroom fitters. CIS tax refunds, materials exclusion from deductions, private vs CIS site work, gross payment status.",
    intro:
      "Bathroom fitting on new-build developments and commercial fit-outs falls squarely within CIS. Self-employed bathroom fitters have 20% deducted from their labour payments, but the significant cost of materials they supply (sanitaryware, baths, showers, enclosures, tiles, tanking materials and fittings) is excluded from the deduction base entirely. When a contractor fails to apply the split and deducts from the full invoice, the overpayment on a fully supplied bathroom installation is among the highest in the fit-out trades.",
    stats: [
      { value: "20%", label: "Deducted on labour (sanitaryware and materials excluded)" },
      { value: "~£2,000", label: "Illustrative first-year CIS refund" },
      { value: "55p", label: "AMAP mileage rate per mile from 6 April 2026" },
    ],
    challenges: [
      {
        title: "Sanitaryware and materials excluded from the deduction base",
        body:
          "A fully supplied bathroom installation can involve baths, basins, WC suites, shower enclosures, trays, taps, radiators, tiles, tanking membrane, adhesive and grout. All of these are materials that you supply for the job, and all of them should be excluded from the CIS deduction base. If your main contractor applies the 20% rate to the full invoice, the overpayment is substantial on every supplied installation. We review your deduction statements and identify where this error has occurred.",
      },
      {
        title: "Private domestic work sits outside CIS",
        body:
          "Many bathroom fitters combine CIS site contracts (new-build, commercial fit-out, main-contractor jobs) with direct private refurbishment work for homeowners. Work for a private homeowner is outside CIS because householders are not contractors. No deduction should be taken on those jobs, but the income is still taxable. Keeping the two income streams in separate records prevents errors at Self Assessment and ensures expenses are allocated to the right income type.",
      },
      {
        title: "Tanking and waterproofing: confirming CIS scope",
        body:
          "Tanking, shower tray installation, floor-to-wall waterproofing and structural alterations to bathroom spaces (such as removing or repositioning walls) are CIS-specified operations. Purely decorative tiling in a domestic private setting is a less clear area. Bathroom fitters who move between structural work and decorative finishing need to understand which part of each job is in scope to invoice and record correctly.",
      },
      {
        title: "Tile cutting, specialist tools and equipment costs",
        body:
          "Wet-cut tile saws, grout removal tools, tanking application equipment and power drills are capital expenditure eligible for capital allowances. Consumables such as cutting discs and blades are revenue expenses. We ensure every qualifying item is captured and claimed in the correct way.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund with correct materials exclusion",
        body:
          "We review every deduction statement, check whether sanitaryware and materials have been correctly excluded from the deduction base, account for all allowable expenses, and submit your Self Assessment return. Bathroom fitters with high materials costs typically recover considerably more than a self-filed return produces.",
      },
      {
        title: "Private and CIS income separation",
        body:
          "We structure your records so CIS site income and private domestic income are clearly separated, each with its own expense allocation. This ensures your Self Assessment return accurately reflects both income streams and that your expense claims are correct.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net CIS income (labour element, excluding materials) exceeds £30,000 per year, you may qualify for GPS. We calculate the correct net figure to account for the materials exclusion and manage the GPS application through all three qualifying tests.",
      },
    ],
    faqs: [
      {
        question: "I supply the full bathroom suite and fittings and then install everything. Should CIS apply to the whole invoice?",
        answer:
          "No. The cost of materials you supply, including baths, WC suites, basins, shower enclosures, taps, tiles and tanking materials, is excluded from the CIS deduction base. Only the labour element of the invoice is subject to the 20% deduction. If your contractor is deducting from the full invoice value, you are overpaying and the difference is recoverable through Self Assessment.",
      },
      {
        question: "I fit bathrooms for homeowners as well as on new-build sites. What is the difference for tax?",
        answer:
          "Work for a private homeowner is outside CIS because private householders are not contractors for CIS purposes. No CIS deduction should be taken on those jobs. However, the income is still taxable and must be included on your Self Assessment return. Your CIS site income and private income need to be recorded separately so that expenses are matched to the right source and your tax return reflects both correctly.",
      },
      {
        question: "The GPS turnover test: does the materials I supply reduce my qualifying turnover?",
        answer:
          "Yes. The GPS turnover test uses net CIS income, which excludes materials. If your sanitaryware and fittings costs are high relative to your total invoiced amount, your qualifying net turnover will be lower than your gross invoiced figure. We calculate the correct net figure as part of any GPS assessment, because understating or overstating materials costs produces the wrong GPS eligibility picture.",
      },
    ],
  },

  // ─── 5. WINDOW INSTALLERS ────────────────────────────────────────────────
  {
    slug: "window-installers",
    segment: "trade",
    title: "Window Installers",
    headline: "Specialist accountants for window installers",
    metaTitle: "Accountants for Window Installers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for self-employed window and door installers. CIS tax refunds, materials exclusion, FENSA registration as allowable expense, gross payment status.",
    intro:
      "Window and door installers working on new-build developments, commercial buildings and main-contractor refurbishment projects operate within CIS. The 20% deduction applies to the labour element of each payment only. Window and door frames, glazing units, sealed units, hardware and sealants that you supply for the job are excluded from the deduction base. On contracts where you supply and fit, the materials proportion of the invoice can be significant, making the correct materials split one of the most valuable things we check.",
    stats: [
      { value: "20%", label: "Deducted on labour only (frames and glazing units excluded)" },
      { value: "~£2,000", label: "Illustrative first-year CIS refund" },
      { value: "100%", label: "FENSA registration: allowable business expense" },
    ],
    challenges: [
      {
        title: "Frames and glazing units excluded from the deduction base",
        body:
          "Window and door installations are materials-intensive. uPVC or aluminium frames, double or triple-glazed sealed units, glass panels, composite door slabs, ironmongery and sealants all represent materials costs that should be excluded from the CIS deduction base. Only the labour element is subject to the 20% deduction. On a block of new-build properties where you are supplying and fitting throughout, the materials figure is large. If your main contractor deducts from the full invoice, the overpayment is substantial and it is recoverable.",
      },
      {
        title: "FENSA registration: an allowable expense that is often missed",
        body:
          "FENSA registration is a practical requirement for window and door installers working on replacement glazing in domestic properties, providing Building Regulations self-certification. The annual FENSA membership fee and any associated registration costs are fully allowable business expenses against your taxable income. Many window installers pay FENSA fees personally and do not include them in their expense claims. They should be.",
      },
      {
        title: "Domestic replacement work vs new-build site work: CIS scope",
        body:
          "New-build residential, commercial glazing and main-contractor refurbishment contracts are within CIS. Replacement window or door installation carried out directly for a private homeowner, with no main contractor in the chain, is outside CIS. Window installers who work across both types must keep the income streams separate. Private domestic income is still taxable and must appear on your Self Assessment return, but no CIS deduction should have been taken at source.",
      },
      {
        title: "Specialist installation equipment and vehicle costs",
        body:
          "Frame-carrying cradles, glass suction lifters, power saws, drill sets, sealant guns and access equipment are capital expenditure eligible for capital allowances. Van running costs (fuel, insurance, road tax, servicing) or the 55p-per-mile AMAP rate from 6 April 2026 are both claimable routes for vehicle expenses. We compare both for your usage and apply the more beneficial option.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund with correct materials exclusion",
        body:
          "We review your deduction statements, verify that frames, glazing units and other materials have been excluded from the deduction base, include FENSA fees and all other allowable expenses, and submit your Self Assessment return. Window installers with high materials costs recover considerably more than a self-filed return typically produces.",
      },
      {
        title: "Private and CIS income record-keeping",
        body:
          "We structure your records to separate CIS site income from private domestic installations. Each income stream is allocated its own expenses, ensuring your Self Assessment return is accurate across both types of work.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net CIS income (labour element, excluding materials) exceeds £30,000 per year, you may qualify for GPS and receive gross payments from main contractors with no deduction. We calculate the correct net figure (which can be significantly lower than gross invoiced value on supply-and-fit contracts), assess all three qualifying tests and manage the application.",
      },
    ],
    faqs: [
      {
        question: "I supply the frames and glazed units and fit them on new-build sites. Should the contractor deduct CIS from the full invoice?",
        answer:
          "No. The cost of window and door frames, sealed glazing units, glass panels and other materials you supply is excluded from the CIS deduction base. Only the labour element of the invoice is subject to the 20% deduction. If your contractor is applying the rate to the full invoice including the cost of frames and units, you are overpaying on every supply-and-fit contract. The difference is recoverable through your Self Assessment return.",
      },
      {
        question: "Is FENSA registration tax deductible?",
        answer:
          "Yes. FENSA registration is a professional and regulatory cost directly related to your trade as a window and door installer. The annual membership fee and any registration costs are fully allowable as a business expense and should be included in your Self Assessment expense claim each year.",
      },
      {
        question: "I also install replacement windows for private homeowners directly. Do those jobs fall under CIS?",
        answer:
          "No. Work carried out directly for a private homeowner without a main contractor in the chain is outside CIS because homeowners are not contractors for CIS purposes. No CIS deduction should be taken on those jobs. The income is still taxable, however, and must be included on your Self Assessment return. Keeping private domestic income and CIS site income in separate records prevents errors at year end.",
      },
      {
        question: "How does the GPS turnover threshold work for a supply-and-fit window installer?",
        answer:
          "The GPS turnover test uses net CIS income, which excludes materials costs. If frames and glazing units account for a large proportion of your total invoiced amount, your qualifying net turnover will be considerably lower than your gross invoice figure. We calculate the correct net amount as part of any GPS eligibility assessment, because supply-and-fit window installers often have a misleadingly high gross figure that overstates their qualifying turnover.",
      },
    ],
    testimonial: {
      quote:
        "Nobody had ever separated the frame cost from my labour. Three years of returns and the deduction had been on everything. Getting that corrected made a meaningful difference.",
      attribution: "Self-employed window installer, South West England",
    },
  },
  // ---- batch3 ----
  {
    slug: "insulation-installers",
    segment: "trade",
    title: "Insulation Installers",
    headline: "Specialist accountants for insulation installers",
    metaTitle: "Accountants for Insulation Installers | CIS Specialists",
    metaDescription:
      "CIS accountants for insulation installers. CIS refunds, gross payment status, sole trader and limited company tax. ECO4 retrofit and new-build specialists.",
    intro:
      "Insulation installers working on new-build sites or retrofit schemes typically work under CIS because they are subcontractors to a main contractor. ECO4 and other government-backed retrofit programmes route work through approved main contractors, meaning self-employed installers receive CIS-deducted payments whether or not they realise it. The materials content of insulation work (rigid board, mineral wool, spray foam, membranes) is significant and should be excluded from the deduction base on every job.",
    stats: [
      { value: "20%", label: "CIS deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "0%", label: "Deducted on materials supplied" },
    ],
    challenges: [
      {
        title: "ECO4 and retrofit work: CIS applies even if the chain is unclear",
        body:
          "Government-backed retrofit programmes (ECO4, SHDF, LAD) deliver work through approved main contractors. Self-employed installers engaged by those contractors are CIS subcontractors, even if the ultimate client is a housing association or local authority. Many installers are unaware of this and either miss the refund or suffer the higher 30% unregistered rate because they never registered for CIS.",
      },
      {
        title: "High materials content excluded from deductions",
        body:
          "Insulation materials (rigid board, mineral wool, spray foam, breather membranes, vapour barriers) represent a large proportion of a typical insulation invoice. CIS deductions apply to the labour element only. If your main contractor is applying the 20% rate to the full invoice value rather than the labour split, you are overpaying on every job. We review your deduction slips and identify the gap.",
      },
      {
        title: "PPE, scaffolding and access equipment",
        body:
          "Working in loft spaces, on external walls and in roof voids requires specialist PPE (dust masks rated for mineral fibre, disposable overalls, eye protection) and sometimes hired access equipment. These costs are allowable. Scaffolding hire charged through to the main contractor should also be excluded from the deduction base where it is separately identified on your invoice.",
      },
      {
        title: "Sole trader vs limited company at higher turnover",
        body:
          "Retrofit programme volumes can push a sole-trader installer above the gross payment status threshold (£30,000 net CIS turnover per year) relatively quickly. A limited company structure allows real-time reclaim of CIS deductions via the Employer Payment Summary rather than waiting for the annual Self Assessment return. We model both structures for your income level.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund claim including materials split review",
        body:
          "We review every deduction statement, verify the labour and materials split, identify any overpayment where the deduction base included materials, and submit your Self Assessment return. Most insulation installers receive their refund within 8 to 12 weeks of a correctly filed return.",
      },
      {
        title: "CIS registration and GPS application",
        body:
          "If you are not yet registered for CIS, we register you immediately (cutting your rate from 30% to 20%). Once your net CIS turnover exceeds £30,000, we manage the GPS application so that main contractors pay you in full with no deduction at all.",
      },
      {
        title: "Ongoing compliance and MTD",
        body:
          "Annual Self Assessment, income and expense records, and Making Tax Digital quarterly updates if your gross income exceeds the applicable threshold. From April 2026 the MTD threshold is £50,000 gross (not net after deductions).",
      },
    ],
    faqs: [
      {
        question: "I work on ECO4 jobs. Does CIS apply to me?",
        answer:
          "In most cases yes. ECO4 and similar retrofit programmes route work through approved main contractors. If you are engaged by that main contractor as a self-employed installer, you are a CIS subcontractor and the main contractor should be deducting 20% from your labour payments (or 30% if you are not CIS-registered). The CIS refund position is the same as for any other construction trade.",
      },
      {
        question: "My contractor takes 20% off the whole invoice including the insulation materials. Is that right?",
        answer:
          "No. CIS deductions apply to the labour element of the invoice only. The cost of insulation materials you supply (rigid board, mineral wool, spray foam, membranes) should be excluded from the deduction base before the 20% is applied. If your contractor is not doing this split, you are overpaying on every job and the difference is recoverable through Self Assessment.",
      },
      {
        question: "How far back can I claim a CIS refund?",
        answer:
          "You can claim back overpaid CIS deductions through Self Assessment for up to four prior tax years. If you have never filed a return or have filed but not claimed the correct expenses, the open years are worth reviewing.",
      },
    ],
    testimonial: {
      quote:
        "I had been on ECO4 jobs for two years and had no idea CIS applied. Once we got registered and the materials were split out properly, the refund covered two full years of overpayment.",
      attribution: "Self-employed insulation installer, Yorkshire",
    },
  },

  {
    slug: "steel-erectors",
    segment: "trade",
    title: "Steel Erectors",
    headline: "Specialist accountants for steel erectors",
    metaTitle: "Accountants for Steel Erectors | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for steel erectors. Labour-only gangs face full 20% CIS exposure. CIS refunds, GPS applications and working-at-height allowances claimed.",
    intro:
      "Steel erection is predominantly a labour-only trade. Most steel erector subcontractors supply their own labour and specialist working-at-height equipment but not the structural steelwork itself, which is designed and supplied by the main contractor or steel fabricator. That labour-only position means the full payment is within the CIS deduction base, making registration, expenses and gross payment status critical to managing the tax position correctly.",
    stats: [
      { value: "20%", label: "CIS deducted on labour payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "£30,000", label: "GPS qualification threshold (net CIS turnover)" },
    ],
    challenges: [
      {
        title: "Labour-only position: the full payment is the deduction base",
        body:
          "Because steel erectors typically do not supply the steel (that comes from the fabricator), there is no materials element to exclude from the CIS deduction base. The 20% applies to the full labour payment. This makes registration essential (the gap between the 20% registered rate and the 30% unregistered rate is the difference between a manageable cash-flow position and a serious overpayment problem) and makes expenses claims more important than in materials-heavy trades.",
      },
      {
        title: "Working-at-height kit: allowable capital expenditure",
        body:
          "Steel erectors invest significantly in working-at-height equipment: harnesses, lanyards, fall-arrest systems, safety helmets, high-visibility clothing and specialist tools. These are allowable either as revenue expenses (consumables, PPE) or as capital allowances (reusable equipment). The Annual Investment Allowance provides 100% first-year deduction on qualifying plant and machinery up to £1 million. Many steel erectors substantially underclaim here.",
      },
      {
        title: "Unregistered rate hits harder on a labour-only base",
        body:
          "The 30%-vs-20% gap on a pure labour invoice costs more in cash terms than on a mixed labour-and-materials invoice of the same value. A steel erector earning £50,000 a year in labour income who is unregistered loses £5,000 a year to unnecessary deductions compared with a registered counterpart, before any allowable expenses are counted.",
      },
      {
        title: "Gross payment status: the right target for high earners",
        body:
          "Steel erection contracts are often high-value and concentrated on large commercial or industrial builds. Erectors with net CIS turnover over £30,000 a year (sole trader) may qualify for GPS and receive labour payments in full with no deduction. The GPS compliance test requires a clean tax record for the past 12 months. We assess eligibility and manage the application.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS registration and immediate rate reduction",
        body:
          "We register unregistered steel erectors for CIS, immediately reducing the deduction rate from 30% to 20% for all future payments. For those already registered, we check that main contractors are verifying correctly.",
      },
      {
        title: "CIS refund and expenses claim",
        body:
          "We calculate your full refund entitlement including all allowable expenses: working-at-height equipment, harnesses, PPE, mileage at 55p per mile from April 2026, van costs and any professional training. We submit your Self Assessment return and follow up with HMRC on timing.",
      },
      {
        title: "GPS application for established erectors",
        body:
          "Once your net CIS turnover exceeds £30,000, we assess the three GPS qualifying tests, manage the application and maintain the compliance record that keeps gross payment status in place.",
      },
    ],
    faqs: [
      {
        question: "I supply only labour on steel erection contracts. Is my full payment subject to CIS deduction?",
        answer:
          "Yes. Where you supply labour only and not the steelwork, the entire payment is the CIS deduction base because there are no materials costs to exclude. That is why CIS registration (to avoid the 30% unregistered rate) and a thorough expenses claim are especially important for labour-only steel erectors.",
      },
      {
        question: "Can I claim my safety harnesses and fall-arrest equipment against tax?",
        answer:
          "Yes. Working-at-height equipment you use in your trade is either an allowable expense (if it is consumable PPE) or qualifying plant and machinery eligible for capital allowances (if it is a durable item). The Annual Investment Allowance gives 100% first-year deduction on qualifying items up to £1 million per year.",
      },
      {
        question: "Do steel erectors qualify for gross payment status?",
        answer:
          "Yes, provided you pass the three GPS tests: business test (UK construction work through a bank account), turnover test (net CIS turnover of at least £30,000 for a sole trader in the last 12 months) and compliance test (all tax obligations met on time for the past 12 months). Steel erection work is clearly within CIS so the business test is straightforward. Many experienced steel erectors meet all three.",
      },
    ],
  },

  {
    slug: "shopfitters",
    segment: "trade",
    title: "Shopfitters",
    headline: "Specialist accountants for shopfitters",
    metaTitle: "Accountants for Shopfitters | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for shopfitters. Fit-out is within CIS. CIS refunds, mixed supply contract reviews, domestic reverse charge advice and GPS applications.",
    intro:
      "Shopfitting sits within CIS as a specified construction operation. Internal fit-out, fixtures, joinery, flooring and the installation of power and data cabling as part of a commercial fit-out project all fall within the scheme. The complication for shopfitters is the mixed supply contract: jobs often blend elements that are clearly CIS-subject with supply-only elements (manufactured units, furniture, equipment) that may not be. Getting the deduction base right on every job requires attention.",
    stats: [
      { value: "20%", label: "CIS deducted on labour element of fit-out payments" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "0%", label: "Deducted on qualifying materials costs" },
    ],
    challenges: [
      {
        title: "Mixed supply contracts and the CIS deduction base",
        body:
          "Shopfitting contracts often combine CIS-subject construction operations (joinery installation, partitioning, flooring, electrical first-fix) with the supply of manufactured units, bespoke furniture and equipment that is not itself a construction operation. Where a contract mixes these elements, the CIS deduction applies only to the labour on the construction operations part. Manufactured units supplied as goods rather than installedruction do not attract a CIS deduction at all. Many main contractors apply the deduction to the full contract value. We review your contracts and deduction slips to identify the correct base.",
      },
      {
        title: "Fit-out materials and the labour split",
        body:
          "Even on the portions of a shopfitting contract that are clearly CIS, the materials you supply (timber, sheet materials, ironmongery, flooring, fixings) are excluded from the deduction base. Separating labour from materials on a shopfitting invoice, particularly on a lump-sum contract, requires care. If the split is not documented, main contractors tend to apply the deduction to the whole amount.",
      },
      {
        title: "Domestic reverse charge on fit-out invoices",
        body:
          "If you are VAT-registered and invoicing another VAT-registered contractor (not the end-user client) for CIS-specified construction services, the domestic reverse charge applies. You do not charge VAT on those invoices; the main contractor accounts for it instead. Getting this wrong in either direction creates VAT exposure. Many shopfitters do not apply the reverse charge correctly because fit-out can blur the line between supply and installation.",
      },
      {
        title: "Tool costs and workshop equipment",
        body:
          "Shopfitters carry significant tools (routers, sanders, jigsaws, nailers) and may run a workshop for producing bespoke joinery items. Capital allowances and the Annual Investment Allowance cover qualifying plant and machinery. Workshop equipment used in the preparation of CIS-contract work is qualifying expenditure.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS deduction base review and refund claim",
        body:
          "We review your contracts and deduction statements to identify where the deduction base has been applied too broadly (for example to supply-only elements or to materials). We calculate the correct refund including all allowable expenses and file your Self Assessment return.",
      },
      {
        title: "VAT domestic reverse charge advice",
        body:
          "We confirm which of your invoices are subject to the domestic reverse charge and which are not, ensure your invoices carry the correct wording, and review your VAT returns for any past errors.",
      },
      {
        title: "Gross payment status application",
        body:
          "Once your net CIS turnover from construction operations exceeds £30,000, we assess GPS eligibility, manage the application and maintain the compliance record. GPS eliminates the 20% deduction on your CIS-subject work entirely.",
      },
    ],
    faqs: [
      {
        question: "Is shopfitting work within CIS?",
        answer:
          "Yes. Internal fit-out, partition installation, joinery installation, flooring and associated first-fix electrical and data cabling are specified construction operations under CIS. Where you are engaged by a main contractor to carry out any of these as a subcontractor, CIS deductions apply to the labour element of the payment.",
      },
      {
        question: "I supply bespoke furniture units and install them. Does CIS apply to the whole contract?",
        answer:
          "Not necessarily. The supply of manufactured goods (furniture, equipment) is not itself a construction operation. If your contract blends supply of goods with installation labour, only the labour on the construction operations part is subject to CIS. The supply element may fall outside the deduction base. We review mixed contracts to identify the correct split rather than leaving that determination to the main contractor.",
      },
      {
        question: "Do I need to apply the domestic reverse charge on my shopfitting invoices?",
        answer:
          "If you are VAT-registered, your customer is VAT-registered, both of you are CIS-registered and your customer is not the end user, the domestic reverse charge applies to the construction services portion of your invoice. You write 'reverse charge: customer to account for VAT' rather than adding 20% VAT. If you are supplying to the end-user occupier directly, normal VAT rules apply.",
      },
    ],
    testimonial: {
      quote:
        "Our contracts are always a mix of supply and installation and nobody had ever separated the two for CIS. Once the deduction base was corrected, we were getting back considerably more than we had been claiming.",
      attribution: "Self-employed shopfitter, North West England",
    },
  },

  {
    slug: "fencing-contractors",
    segment: "trade",
    title: "Fencing Contractors",
    headline: "Specialist accountants for fencing contractors",
    metaTitle: "Accountants for Fencing Contractors | CIS Specialists",
    metaDescription:
      "CIS accountants for fencing contractors. Site fencing is inside CIS; agricultural fencing is outside. We clarify your position and recover any CIS overpayment.",
    intro:
      "Fencing contractors face a genuine scope question before CIS even enters the picture: is the work they are carrying out a construction operation at all? The answer depends on context, not just on the fact that fencing is involved. Construction-site fencing (security hoardings, boundary fencing on a development, permanent fencing forming part of a built structure) is within CIS. Agricultural fencing on farmland that has no connection to a building project is generally outside it. Getting that boundary wrong, in either direction, has real consequences.",
    stats: [
      { value: "20%", label: "CIS deducted on qualifying fencing contracts" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "0%", label: "Deducted on materials (posts, rails, wire, panels)" },
    ],
    challenges: [
      {
        title: "Inside or outside CIS? The context test for fencing",
        body:
          "The HMRC CIS 340 guide and Finance Act 2004 s.74 establish that what matters is whether work is part of a construction project, not whether the activity could abstractly be called construction. Fencing on a housing development, a commercial site, or as part of a planning condition on a build is a construction operation and the payments to a fencing subcontractor are subject to CIS deduction. Agricultural fencing on a farm that is not connected to a building project is not a construction operation. A fencing contractor who works across both types of site may find that some contracts are within CIS and others are not. Misclassifying a CIS contract as outside the scheme (and therefore not registering or reclaiming) costs money. Misclassifying an agricultural contract as CIS (and accepting deductions that should not be made) also costs money.",
      },
      {
        title: "Materials make up a large part of fencing invoices",
        body:
          "Posts, rails, chain-link, timber panels, wire, concrete spurs and aggregate for post foundations all form part of a fencing invoice. On contracts that are within CIS, these materials costs are excluded from the deduction base. Only the labour element is subject to the 20% deduction. If your main contractor is applying the deduction to the full invoice, you are overpaying on every job.",
      },
      {
        title: "Plant and machinery: post-drivers and transport",
        body:
          "Fencing contractors typically run a van or flatbed and use post-drivers, compactors and sometimes mini-excavators. Running costs on a van used for work are allowable. Post-driving equipment and other plant are eligible for capital allowances. From April 2026 the AMAP rate for a car or van is 55p per mile for the first 10,000 business miles.",
      },
      {
        title: "Unregistered rate on construction contracts",
        body:
          "A fencing contractor who carries out construction-site fencing but is not CIS-registered will have 30% deducted rather than 20%. On contracts of any size, that 10-point gap adds up quickly. Registration is free and immediate.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS scope review: clarifying which contracts are inside the scheme",
        body:
          "We review your contract mix to determine which jobs are CIS construction operations and which are not. For the CIS contracts, we check that the deduction base (labour only, not materials) is being applied correctly. For the non-CIS contracts, we confirm that no deduction should be made.",
      },
      {
        title: "CIS refund claim and materials split review",
        body:
          "We identify overpayments where main contractors have applied the deduction to materials, calculate all allowable expenses (mileage, van costs, plant, PPE) and file your Self Assessment return. Most fencing contractors in CIS contracts receive a meaningful refund.",
      },
      {
        title: "GPS application for established contractors",
        body:
          "If your net CIS turnover from qualifying construction contracts exceeds £30,000, we assess GPS eligibility and manage the application. Note that the GPS turnover test is based on CIS income only; agricultural fencing income outside CIS does not count towards the threshold.",
      },
    ],
    faqs: [
      {
        question: "Is agricultural fencing inside or outside CIS?",
        answer:
          "Agricultural fencing on farmland that has no connection to a building or construction project is generally outside CIS. It is not a construction operation under Finance Act 2004 s.74 in that context. Fencing on a construction site or as part of a development (even if it borders agricultural land) is a different matter: where the fencing is part of a construction project it is within the scheme. The key is whether the fencing work forms part of a broader construction operation. We review your contract mix and clarify the position for each type of work.",
      },
      {
        question: "I do both site fencing and agricultural fencing. Do I need to register for CIS?",
        answer:
          "If any part of your work is construction-site fencing paid for by a main contractor, yes. CIS registration (cutting your rate from 30% to 20%) is practically essential for the construction-site work. The agricultural fencing falls outside CIS and those payments will not have CIS deducted regardless of your registration status. We help you track the two income streams separately.",
      },
      {
        question: "My contractor takes CIS from the full invoice including posts and rails. Can I recover the overpayment?",
        answer:
          "Yes. Materials (posts, rails, panels, wire, concrete, aggregate) are excluded from the CIS deduction base. If your contractor has been applying the 20% rate to the full invoice, the overpayment on the materials portion is recoverable through Self Assessment. We review your deduction statements and calculate the correct refund.",
      },
    ],
  },

  {
    slug: "landscapers",
    segment: "trade",
    title: "Landscapers",
    headline: "Specialist accountants for landscapers",
    metaTitle: "Accountants for Landscapers | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for landscapers. New-build landscaping is inside CIS; grounds maintenance is outside. We establish your position and recover the overpayment.",
    intro:
      "Landscapers face a more important CIS scope question than almost any other trade: not every landscaping job is a construction operation, and HMRC draws the line in a specific place. Routine grounds maintenance, gardening and estate upkeep are outside CIS. Landscaping that forms part of a new-build development, a site clearance or a construction contract is inside it. That boundary determines whether a main contractor is right to deduct from your payments at all, and whether you have a refund sitting unclaimed with HMRC.",
    stats: [
      { value: "20%", label: "CIS deducted on qualifying construction landscaping" },
      { value: "~£2,000", label: "Average first-year CIS refund" },
      { value: "0%", label: "Deducted on materials (turf, plants, aggregates, topsoil)" },
    ],
    challenges: [
      {
        title: "The critical scope boundary: construction landscaping vs maintenance",
        body:
          "HMRC's CIS 340 scope guidance draws the line explicitly: tree planting and landscaping carried out in the course of forestry or estate management are NOT construction operations. Tree planting and landscaping as part of a new housing development ARE construction operations. Finance Act 2004 s.74 includes landscaping within construction only where it is preparatory to or forms an integral part of a wider construction operation. Routine grounds maintenance, ongoing gardening, mowing, hedge-trimming and seasonal upkeep of existing grounds are outside CIS in all cases. A landscaper who works on new-build housing sites, commercial developments and construction project soft-landscaping is in CIS for those contracts. A landscaper who does only ongoing maintenance for existing property owners is not in CIS at all. Many landscapers work across both types and need their contract mix assessed.",
      },
      {
        title: "Main contractors deducting incorrectly on non-CIS maintenance work",
        body:
          "Where a landscaper is primarily a maintenance contractor and a main contractor or managing agent applies CIS deductions to their payments, those deductions may be wrong. A landscaper whose work does not meet the construction-operation test should not have CIS deducted at all. Recovering incorrectly deducted CIS requires a Self Assessment return and evidence that the work was outside the scheme.",
      },
      {
        title: "High materials content on construction-landscaping contracts",
        body:
          "Construction landscaping (soft landscaping on a new housing estate, hard landscaping as part of a commercial development) typically involves significant materials: topsoil, turf, shrubs, trees, bark, aggregates, paving, edging and irrigation components. On contracts that are within CIS, all of these materials are excluded from the deduction base. The 20% applies to labour only. Many landscapers have a larger overpayment than they expect once the materials split is applied correctly.",
      },
      {
        title: "Plant, machinery and transport",
        body:
          "Landscapers typically run a van or trailer, and often own or hire compact excavators, rotavators, rollers and turf cutters. On CIS contracts, plant hired for a specific job and charged on at cost is excluded from the deduction base. Plant you own is eligible for capital allowances. Mileage at 55p per mile from April 2026 applies to business travel. These costs are regularly underclaimed in self-filed returns.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS scope assessment: which of your contracts are inside the scheme",
        body:
          "We review your contract mix to distinguish construction landscaping (within CIS) from maintenance and estate management work (outside CIS). Where main contractors are deducting incorrectly on maintenance contracts, we identify the overpayment and assist with recovery. Where your construction-landscaping work is within CIS, we ensure the deduction base (labour only) is being applied correctly.",
      },
      {
        title: "CIS refund claim and materials review",
        body:
          "For the CIS-subject contracts, we identify all materials costs that should be excluded from the deduction base (topsoil, turf, plants, aggregates, hard landscaping materials), calculate all allowable expenses including plant hire, mileage and PPE, and file your Self Assessment return. The refund position can be significant where materials form a large part of the work.",
      },
      {
        title: "GPS application for construction landscapers",
        body:
          "If your net CIS turnover from qualifying construction-landscaping contracts exceeds £30,000, you may qualify for gross payment status and receive those payments with no deduction. Note that maintenance income outside CIS does not contribute to the GPS turnover test. We assess eligibility and manage the application.",
      },
    ],
    faqs: [
      {
        question: "Is my landscaping work inside or outside CIS?",
        answer:
          "It depends on the nature of the work, not just the label. HMRC's CIS 340 scope guidance states that tree planting and landscaping as part of a new housing development are construction operations and therefore within CIS. Tree planting and landscaping in the course of forestry or estate management are not construction operations. Routine grounds maintenance, gardening and seasonal upkeep are outside CIS in all cases. If you work on new-build sites or commercial construction projects, those contracts are likely within CIS. If you work only on ongoing maintenance for existing property owners, CIS does not apply.",
      },
      {
        question: "A main contractor is deducting 20% from my maintenance contract payments. Is that right?",
        answer:
          "Possibly not. If the work is ongoing grounds maintenance rather than landscaping forming part of a construction project, it is outside CIS and no deduction should be made. You would need to establish the nature of the work and, if it is genuinely outside the scheme, recover the incorrectly deducted amounts through Self Assessment. We can review the contracts and advise on the recovery route.",
      },
      {
        question: "I do both new-build soft landscaping and ongoing maintenance. How do I handle CIS?",
        answer:
          "The two income streams are treated separately. Income from construction-project landscaping is within CIS and subject to the standard deduction rules. Income from maintenance contracts is outside CIS and should not have any deduction applied. You need to register for CIS if you are not already, to ensure you receive the 20% rate (not 30%) on the CIS contracts, while keeping the two income types clearly separated in your records for Self Assessment.",
      },
      {
        question: "Can I exclude topsoil, turf and plants from my CIS deductions?",
        answer:
          "Yes, on contracts that are within CIS. Materials you supply for a construction-landscaping job (topsoil, turf, shrubs, trees, bark, aggregates, paving materials) are excluded from the CIS deduction base. Only the labour element is subject to the 20% deduction. If your main contractor is applying the deduction to the full invoice value, you are overpaying on every CIS job and the difference is recoverable.",
      },
    ],
    testimonial: {
      quote:
        "I had assumed all my work was outside CIS because I was doing gardens. Once we separated out the new-build site contracts, there were three years of overpayments to recover. The maintenance work was correctly outside the scheme but the development contracts had been deducted at 30% because I was not registered.",
      attribution: "Self-employed landscaper, South East England",
    },
  },
  // ---- batch4 ----
  {
    slug: "plant-operators",
    segment: "trade",
    title: "Plant Operators",
    headline: "Specialist accountants for plant operators",
    metaTitle: "Accountants for Plant Operators | CIS Tax & Refund Specialists",
    metaDescription:
      "CIS accountants for plant operators. Refunds, GPS and advice on the with-operator versus dry-hire CIS boundary. CPCS costs claimed. Most are owed money back.",
    intro:
      "Self-employed plant operators working under CIS sit in a trade where the scope rules matter as much as the numbers. When you are engaged to operate a machine on a contractor's site, the payment for your labour is within CIS and the 20% deduction applies. The picture changes when you supply the plant as well as the operator: the hire element of the contract can be excluded from the deduction base, reducing what is taken at source. CPCS and NPORS card costs, fuel, servicing and site travel all add to the allowable expenses pool. Most plant operators are overpaying across the year and have a refund to recover.",
    stats: [
      { value: "20%", label: "Deducted on labour element of CIS payments" },
      { value: "0%", label: "Deducted on plant hire costs (passed on at cost)" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "With-operator versus without-operator: a critical scope boundary",
        body:
          "When you supply yourself as an operator together with your own machine, the contract has two elements: your labour (within CIS under s.74(2) Finance Act 2004, as earth-moving, excavation and civil engineering operations are listed construction operations) and the plant element. The plant hire portion can be excluded from the deduction base because CIS deductions apply to labour only. If you operate on a dry-hire basis, providing only the machine without an operator, that is in essence a plant hire arrangement and falls outside CIS entirely under s.74(3). Getting the split documented correctly on your invoices protects against your contractor applying the 20% rate to the full contract value.",
      },
      {
        title: "CPCS and NPORS card costs going unclaimed",
        body:
          "Construction Plant Competence Scheme (CPCS) and National Plant Operators Registration Scheme (NPORS) cards are the industry standard qualifications for plant operators. Card fees, test fees and renewal costs are fully allowable business expenses. Many plant operators pay these personally without recording them as business costs, understating their allowable expense pool by several hundred pounds a year.",
      },
      {
        title: "Plant running costs: fuel, servicing and finance",
        body:
          "If you own your machine, the running costs are allowable: fuel, servicing, repairs, insurance, road tax for road-registered plant, and finance interest on a hire-purchase or finance agreement. Capital allowances apply to the machine itself. The Annual Investment Allowance provides a 100% first-year deduction on qualifying plant and machinery up to £1 million. Many operators capitalise the machine correctly but miss ongoing finance and running costs in their annual return.",
      },
      {
        title: "CIS registration and the 30% rate",
        body:
          "An unregistered plant operator suffers 30% deductions rather than 20%. On £50,000 of annual labour income, that gap costs £5,000 a year. CIS registration is free and immediate. If you are registered but a new contractor cannot verify your status, they are required to apply the 30% rate until they can. We check your registration, resolve any verification issues with HMRC, and ensure every contractor you work for can verify you correctly.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund including plant hire exclusion",
        body:
          "We review your deduction statements, ensure the plant hire element is correctly excluded from the deduction base, and account for CPCS/NPORS fees, machine running costs, mileage at 55p per mile from April 2026, and capital allowances on equipment. We then submit your Self Assessment return to recover the full refund owed.",
      },
      {
        title: "Invoice structure and deduction base advice",
        body:
          "We advise on how to structure your invoices to correctly separate the labour and plant hire elements, so that your contractors apply the 20% deduction only to the labour portion. Getting this right from the outset avoids overpayment on every job.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour income, excluding plant hire and VAT) exceeds £30,000, you may qualify for GPS and receive payments with no deduction at all. We handle the application, the three qualifying tests and the compliance record that keeps GPS in place.",
      },
    ],
    faqs: [
      {
        question: "I supply my own excavator and operate it on site. Does CIS apply to the whole payment?",
        answer:
          "No. The payment has two elements: your labour as the operator (which is a CIS construction operation under s.74(2) Finance Act 2004) and the hire of the machine (which falls outside the CIS deduction base). The 20% deduction should be applied only to the labour element. The plant hire element can be treated as a materials/cost exclusion provided it is clearly identified on your invoice at the actual hire cost. If your contractor is applying the 20% rate to the full payment, they are overstating the deduction base and you are overpaying.",
      },
      {
        question: "If I hire out my machine without operating it myself, is that within CIS?",
        answer:
          "No. Hiring out plant without an operator is essentially a plant hire arrangement and the manufacture, supply and delivery of plant is excluded from CIS construction operations under s.74(3) Finance Act 2004. No CIS deduction applies to a pure dry-hire contract. The position changes if you also supply yourself as the operator: the labour element of a combined operator-plus-plant contract is within CIS.",
      },
      {
        question: "Are my CPCS card renewal fees tax deductible?",
        answer:
          "Yes. CPCS and NPORS card fees, test fees and renewal costs are mandatory professional costs for plant operators working on regulated sites and are fully allowable business expenses. They are deductible against your CIS income on your Self Assessment return.",
      },
      {
        question: "Can I claim the capital cost of buying my excavator or telehandler?",
        answer:
          "Yes. Your machine is plant and machinery and qualifies for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying plant and machinery purchases up to £1 million per year. If you have bought your machine outright, the full cost can be deducted in the year of purchase. Finance interest on a hire-purchase agreement is also allowable each year.",
      },
    ],
    testimonial: {
      quote:
        "I had been having 20% taken off the full contract value for years, including the plant hire element. Once that was split out and my CPCS fees and machine costs were included, the refund was significantly larger than I expected.",
      attribution: "Self-employed plant operator, civil engineering sector",
    },
  },

  {
    slug: "drainage-contractors",
    segment: "trade",
    title: "Drainage Contractors",
    headline: "Specialist accountants for drainage contractors",
    metaTitle: "Accountants for Drainage Contractors | CIS Tax Specialists",
    metaDescription:
      "CIS accountants for drainage contractors. Refunds, GPS and capital allowances on CCTV survey kit. Drainage installation is a listed CIS construction operation.",
    intro:
      "Drainage contractors work across one of the most clearly defined areas of CIS. Installation, repair and maintenance of drainage systems are listed construction operations under s.74(2) Finance Act 2004. Whether you are laying new drainage on a housing development, carrying out CCTV surveys ahead of remediation, or undertaking utilities-adjacent pipework, the CIS deduction applies to your labour income. The allowable expense pool is substantial: drainage pipe, chambers and materials should be excluded from the deduction base, and the capital cost of CCTV survey equipment, jetting vehicles and specialist plant qualifies for capital allowances.",
    stats: [
      { value: "20%", label: "Deducted on labour by main contractors" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
      { value: "£30,000", label: "GPS turnover threshold (net of materials)" },
    ],
    challenges: [
      {
        title: "Drainage pipes, chambers and materials excluded from deductions",
        body:
          "CIS deductions apply only to the labour element of a drainage invoice. Drainage pipes, inspection chambers, gullies, backfill aggregate, geotextile and other materials you supply are excluded from the deduction base. Drainage work is typically highly materials-intensive, so the split between labour and materials can be significant. If your main contractor applies the 20% rate to the full invoice value rather than the labour element, the overpayment compounds across a full year of contracts.",
      },
      {
        title: "CCTV survey and jetting equipment: capital allowances opportunity",
        body:
          "CCTV drainage inspection cameras, push-rod and crawler units, recording equipment and jetting vehicles are plant and machinery eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying equipment purchases up to £1 million. These are significant capital costs for a drainage contractor and are frequently under-claimed, particularly when the equipment is purchased through a finance agreement rather than outright.",
      },
      {
        title: "Utilities work: scope nuances",
        body:
          "Drainage work close to or within utility easements can sit across a boundary. Work on private drainage systems within the boundary of a building or structure is squarely within CIS. Work on public sewer or water main infrastructure as a utility sub-contractor may be subject to different contracting arrangements. If your contracts include utilities work, we review the nature of each engagement to confirm the correct CIS treatment.",
      },
      {
        title: "GPS qualification with materials-heavy turnover",
        body:
          "The Gross Payment Status turnover test uses your net CIS income, excluding materials and VAT. Drainage contractors with high materials costs may find that their qualifying CIS turnover is significantly lower than their total invoice value. We calculate the correct net figure as part of any GPS assessment to confirm whether you meet the £30,000 sole-trader threshold.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund and deduction base review",
        body:
          "We review your payment and deduction statements, confirm the materials split is correctly applied on each contract, account for all allowable expenses including CCTV equipment costs, vehicle running costs and mileage at 55p per mile from April 2026, and submit your Self Assessment return.",
      },
      {
        title: "Capital allowances on specialist equipment",
        body:
          "We identify your qualifying capital expenditure on CCTV survey equipment, jetting vehicles and other specialist plant, and claim the correct capital allowances in the year of purchase. For a drainage contractor investing in survey equipment, this can significantly reduce the Self Assessment tax bill in the year of purchase.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover exceeds £30,000, we handle the GPS application, calculate the correct qualifying turnover figure (net of materials) and manage the compliance record.",
      },
    ],
    faqs: [
      {
        question: "Is drainage work within CIS?",
        answer:
          "Yes. Installation and repair of drainage systems is a listed construction operation under s.74(2)(c) Finance Act 2004, which explicitly includes installation of systems of drainage and sanitation. Payments from contractors to drainage subcontractors for this work are subject to CIS deduction unless the subcontractor holds Gross Payment Status.",
      },
      {
        question: "I supply all the drainage pipe and chambers myself. Should my contractor deduct CIS from the full invoice?",
        answer:
          "No. The cost of pipes, chambers, backfill aggregate and other materials you supply should be excluded from the CIS deduction base before the 20% rate is applied. Only the labour element of your invoice is subject to deduction. If your contractor is applying the 20% rate to the full invoice value, you are overpaying and the difference is recoverable through Self Assessment.",
      },
      {
        question: "Can I claim capital allowances on my CCTV drainage inspection camera?",
        answer:
          "Yes. CCTV drainage inspection cameras, push-rod and crawler units and related survey equipment are plant and machinery and qualify for capital allowances. The Annual Investment Allowance provides 100% first-year deduction on qualifying plant and machinery up to £1 million. If you bought the camera outright, the full cost is deductible in the year of purchase.",
      },
    ],
  },

  {
    slug: "cladding-installers",
    segment: "trade",
    title: "Cladding Installers",
    headline: "Specialist accountants for cladding installers",
    metaTitle: "Accountants for Cladding Installers | CIS Tax Specialists",
    metaDescription:
      "CIS accountants for cladding installers. Refunds, GPS, IPAF and PASMA costs claimed, and specialist support for post-Grenfell remediation contracts.",
    intro:
      "Cladding installers work across one of the most active and technically demanding sectors of UK construction. Post-Grenfell remediation programmes have driven substantial volumes of recladding work on existing buildings, and fire-rated cladding systems now make up a significant share of new-build facade contracts. Cladding installation is an alteration to a building and falls squarely within CIS as a construction operation under s.74(2) Finance Act 2004. The allowable expense picture is strong: cladding panels, fixings, rails and insulation boards should be excluded from the deduction base, while working-at-height equipment and training costs add to the expense pool.",
    stats: [
      { value: "20%", label: "Deducted on labour by main contractors" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
      { value: "55p", label: "Mileage rate per mile from April 2026" },
    ],
    challenges: [
      {
        title: "Cladding materials excluded from the deduction base",
        body:
          "CIS deductions apply only to the labour element of a cladding invoice. Panels, rails, brackets, fixings, fire-rated insulation boards and membranes you supply are excluded from the deduction base. Fire-rated cladding systems in particular carry substantial materials costs relative to the labour content of the contract. If your main contractor applies the 20% deduction to the full invoice, the overpayment on a high-specification fire-rated contract can be considerable.",
      },
      {
        title: "Working-at-height costs",
        body:
          "Cladding work frequently requires working at significant height. IPAF (powered access) and PASMA (mobile scaffold towers) card costs are mandatory professional costs for working at height and are fully allowable business expenses. Harness, lanyard and PPE costs are allowable, and scaffolding or MEWP hire charges passed through to the main contractor at cost should be excluded from the deduction base.",
      },
      {
        title: "Fire-rated materials: remediation contracts",
        body:
          "Post-Grenfell remediation programmes often involve large contracts replacing non-compliant cladding systems with fire-rated alternatives. These contracts typically involve a high proportion of materials cost (ACM removal, fire-rated panel systems, insulation replacement) relative to labour. Getting the labour/materials split right on remediation contracts, where invoices may run to large sums, is especially important.",
      },
      {
        title: "Registration and verification on large contracts",
        body:
          "Large remediation and new-build facade contracts are typically with major contractors who have formal CIS compliance processes. If you are not registered or your status cannot be verified, you will be deducted at 30% rather than 20% on every payment. We ensure your CIS registration is current and that any verification issues are resolved before the first payment on a new contract.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS refund including materials split review",
        body:
          "We review your deduction statements, confirm that panels, rails, fixings and other materials are correctly excluded from the deduction base, account for IPAF/PASMA fees, PPE, vehicle costs and mileage at 55p per mile from April 2026, and submit your Self Assessment return to recover the full refund owed.",
      },
      {
        title: "Working-at-height and training cost claims",
        body:
          "We include IPAF and PASMA card fees, harness inspection costs, safety training and PPE in your allowable expenses. These are frequently overlooked in self-filed returns by cladding installers who treat them as incidental costs rather than legitimate deductions.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover (labour income, excluding materials and VAT) exceeds £30,000, you may qualify for GPS. We manage the application, the three qualifying tests and the ongoing compliance record that keeps GPS in place.",
      },
    ],
    faqs: [
      {
        question: "Is cladding installation within CIS?",
        answer:
          "Yes. Installing or replacing cladding on a building is an alteration or repair to a building or structure and is a construction operation under s.74(2)(a) Finance Act 2004. All payments from contractors to cladding subcontractors for this work are subject to CIS deduction unless the subcontractor holds Gross Payment Status.",
      },
      {
        question: "I supply fire-rated panels and rail systems. Should my contractor deduct CIS from the materials element?",
        answer:
          "No. The cost of panels, rails, brackets, fire-rated insulation boards and fixings you supply is excluded from the CIS deduction base. Only the labour element of your invoice is subject to the 20% deduction. On fire-rated and remediation contracts, where materials costs can be a large proportion of the contract value, this exclusion is particularly significant. If your contractor is deducting from the full invoice, you are overpaying.",
      },
      {
        question: "Are my IPAF and PASMA card fees tax deductible?",
        answer:
          "Yes. IPAF (powered access) and PASMA (mobile scaffold towers) card fees and renewal costs are mandatory professional costs for cladding installers working at height and are fully allowable business expenses. They are deductible against your CIS income on your Self Assessment return.",
      },
      {
        question: "I work on post-Grenfell remediation contracts. Do the same CIS rules apply?",
        answer:
          "Yes. Remediation contracts replacing non-compliant cladding are construction operations in the same way as new-build facade work. The same CIS deduction rules apply, the same labour-only deduction base, and the same GPS qualifying tests. The main difference in practice is the higher proportion of materials cost relative to labour, which makes correct deduction base splitting especially important on these contracts.",
      },
    ],
    testimonial: {
      quote:
        "The remediation contracts have a lot of materials in them and nobody had told me the contractor should only be taking the 20% from the labour side. The first properly filed return made a real difference.",
      attribution: "Self-employed cladding installer, South East England",
    },
  },

  {
    slug: "paving-contractors",
    segment: "trade",
    title: "Paving Contractors",
    headline: "Specialist accountants for paving contractors",
    metaTitle: "Accountants for Paving Contractors | CIS Tax Specialists",
    metaDescription:
      "CIS accountants for paving contractors. Refunds, GPS and expert help separating domestic driveway work (outside CIS) from commercial site paving (inside CIS).",
    intro:
      "Paving contractors face a scope question that many accountants miss. Commercial and site paving work (car parks, estate roads, pedestrian areas on development sites) is within CIS as civil engineering work or alteration to a structure. Domestic driveway work for a private homeowner is outside CIS, because CIS applies only where the payer is a contractor, not an end-user household. If you work across both types of contract, keeping clear records of which income is CIS and which is not is essential. Combined with the materials excluded from the deduction base (flags, block pavers, sub-base aggregate, edging kerbs) and mileage on a travel-heavy trade, most paving subcontractors are overpaying under CIS.",
    stats: [
      { value: "20%", label: "Deducted on labour on CIS contracts" },
      { value: "0%", label: "Deducted on materials (aggregate, pavers, edgings)" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "Domestic driveways versus commercial and site paving: the split that matters",
        body:
          "CIS applies where a contractor pays a subcontractor for construction work. A paving contractor working directly for a private homeowner on a domestic driveway is not in a CIS contract: the homeowner is the end user, not a contractor. The same paving contractor working as a subcontractor on a housing development, car park or commercial site is squarely within CIS. If you work across both, your annual income needs to be split correctly between CIS-liable and non-CIS income. Mixing the two on a single Self Assessment return without distinguishing them creates compliance risk.",
      },
      {
        title: "Materials excluded from the deduction base",
        body:
          "Block pavers, natural stone flags, tarmac, sub-base aggregate (MOT Type 1), sharp sand, edging kerbs and other materials you supply for CIS contracts are excluded from the CIS deduction base. Only the labour element of your invoice is subject to the 20% deduction. Many main contractors either estimate the split or apply the deduction to the full invoice. We review your deduction statements and identify where overpayment has occurred.",
      },
      {
        title: "Mileage and site travel",
        body:
          "Paving contractors typically travel significant distances between sites, particularly on commercial contracts. From 6 April 2026, the AMAP rate for cars and vans is 55p per mile for the first 10,000 business miles. Keeping an accurate mileage log throughout the year is the most straightforward way to capture the full claim. Many paving contractors claim nothing for travel and leave a meaningful deduction unclaimed.",
      },
      {
        title: "Plant and equipment capital allowances",
        body:
          "Plate compactors, block-laying equipment, laser levels, wacker plates and other tools and equipment are plant and machinery eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying equipment up to £1 million. Larger plant, such as mini excavators used for preparatory groundwork before laying, may have been capitalised incorrectly or not claimed at all.",
      },
    ],
    howWeHelp: [
      {
        title: "CIS and non-CIS income split",
        body:
          "We review your contracts and invoice records to correctly separate domestic (non-CIS) income from commercial and site (CIS) income. Getting this split right is the foundation of an accurate Self Assessment return and avoids both overpayment and compliance risk.",
      },
      {
        title: "CIS refund and materials deduction review",
        body:
          "We check your deduction statements, confirm the materials split on CIS contracts, account for all allowable expenses including mileage at 55p per mile, equipment costs and PPE, and submit your Self Assessment return to recover the full refund owed.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net CIS turnover (on commercial and site contracts, net of materials and VAT) exceeds £30,000, you may qualify for GPS. We handle the application and the compliance record.",
      },
    ],
    faqs: [
      {
        question: "I lay driveways for homeowners. Do I need to be registered for CIS?",
        answer:
          "Not for driveway work done directly for private homeowners. CIS applies where a contractor pays a subcontractor for construction work, and a private homeowner is not a contractor. If all your work is domestic driveway paving for end-user householders, CIS does not apply to those contracts. If you also do commercial or development-site paving as a subcontractor for a main contractor, that element is within CIS and you should register to avoid the 30% unregistered rate on the CIS income.",
      },
      {
        question: "I supply block pavers and sub-base aggregate on commercial contracts. Should my contractor deduct CIS from the full invoice?",
        answer:
          "No. Block pavers, aggregate, sand, edging kerbs and other materials you supply are excluded from the CIS deduction base. The 20% deduction should be applied only to the labour element of your invoice. If your contractor is applying the rate to the full invoice value, you are overpaying on every CIS job and the difference is recoverable through Self Assessment.",
      },
      {
        question: "How do I keep records of which work is domestic and which is commercial?",
        answer:
          "The simplest approach is to record the type of client on each job: private homeowner (non-CIS) or contractor/developer (CIS). Keep your invoices, any CIS deduction statements from contractors, and a brief note of the site address and client type for each job. We can help you set up a simple record-keeping system at the start of the year that makes the year-end split straightforward.",
      },
    ],
  },

  {
    slug: "welder-fabricators",
    segment: "trade",
    title: "Welders and Fabricators",
    headline: "Specialist accountants for welders and fabricators",
    metaTitle: "Accountants for Welder-Fabricators | CIS Tax Specialists",
    metaDescription:
      "CIS accountants for welders and fabricators. Off-site workshop fabrication is outside CIS. Site installation and fixing is inside. Refunds and GPS.",
    intro:
      "Welders and fabricators working in construction face a scope boundary that is genuinely important and commonly misunderstood. Off-site fabrication of structural components in a workshop, standing alone, is excluded from CIS under s.74(3) Finance Act 2004, which removes the manufacture of engineering components from the definition of construction operations. The position changes when you move to the site and install or fix the fabricated components: structural installation and fixing is an alteration or addition to a building or structure and is within CIS under s.74(2). If your work spans both fabrication and installation, the income needs to be correctly split and the CIS deduction applied only to the site element. Getting this wrong costs money on every contract.",
    stats: [
      { value: "20%", label: "Deducted on site installation and fixing (CIS)" },
      { value: "0%", label: "CIS deduction on pure off-site workshop fabrication" },
      { value: "~£2,000", label: "Average first-year CIS refund (illustrative)" },
    ],
    challenges: [
      {
        title: "Workshop fabrication versus site installation: the boundary that defines your CIS liability",
        body:
          "Under s.74(3) Finance Act 2004, the manufacture of building or engineering components is explicitly excluded from CIS construction operations. A welder-fabricator who fabricates structural steel sections, balustrades or architectural metalwork in their own workshop, and delivers the finished components to site, is carrying out manufacturing work that is outside CIS. The payment for that work is not subject to CIS deduction. When the same fabricator goes to site to install, weld in position, or fix those components to the structure, that installation work is within CIS as an alteration or addition to a building or structure under s.74(2)(a). On a combined fabricate-and-fix contract, the deduction should apply only to the site installation element.",
      },
      {
        title: "Materials in fabrication and installation work",
        body:
          "Steel sections, plates, box section, angle iron, welding rod, primer and protective coatings are materials costs excluded from the CIS deduction base on the portion of work that is within CIS. Where the full contract value includes both workshop fabrication (outside CIS) and site installation (within CIS), we review the contract split and ensure the deduction base is restricted to the labour on the installation element only.",
      },
      {
        title: "Equipment and workshop capital allowances",
        body:
          "MIG and TIG welding sets, plasma cutters, angle grinders, drilling machines, fabrication tables and workshop equipment are plant and machinery eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying equipment up to £1 million. Many fabricators capitalise workshop equipment correctly but miss the ongoing depreciation and repair costs in their annual return.",
      },
      {
        title: "CIS registration status when doing both fabrication and installation",
        body:
          "If any part of your work involves on-site installation or fixing under a CIS contract, you should be registered as a CIS subcontractor. An unregistered welder-fabricator doing on-site installation will be deducted at 30% rather than 20% on the CIS-applicable element. Registration is free and immediate. Staying registered protects your rate even when you move between fabrication-only and fabricate-and-fix contracts across the year.",
      },
    ],
    howWeHelp: [
      {
        title: "Workshop versus site income analysis",
        body:
          "We review your contracts and determine the correct CIS treatment for each element: pure workshop fabrication (outside CIS), delivery (outside CIS), and site installation or fixing (within CIS). We ensure the deduction base on CIS-applicable payments reflects the installation labour only, not the full contract value.",
      },
      {
        title: "CIS refund and Self Assessment filing",
        body:
          "We account for all allowable expenses including steel, consumables, workshop equipment costs, mileage at 55p per mile from April 2026, and capital allowances on welding sets and fabrication equipment. We submit your Self Assessment return to recover the full refund on CIS-deducted income.",
      },
      {
        title: "Gross payment status application",
        body:
          "If your net annual CIS turnover on the site installation element exceeds £30,000, you may qualify for GPS and receive those payments with no deduction. We handle the application, the three qualifying tests and the compliance record.",
      },
    ],
    faqs: [
      {
        question: "I fabricate structural steelwork in my workshop and deliver it to site. Is that within CIS?",
        answer:
          "No. The manufacture of engineering or building components is explicitly excluded from CIS construction operations under s.74(3) Finance Act 2004. Workshop fabrication and delivery of finished structural components to site does not attract a CIS deduction. The payment for that work is not a contract payment for CIS purposes. The position changes if you also go to site to install, weld in position or fix the components: the on-site installation element is within CIS.",
      },
      {
        question: "I fabricate balustrades in my workshop and then go to site to install them. How is CIS applied?",
        answer:
          "The contract has two elements. The workshop fabrication element is outside CIS under s.74(3) Finance Act 2004. The on-site installation element is within CIS as an alteration to a building or structure under s.74(2)(a). The 20% CIS deduction should be applied only to the labour on the installation element. If your contractor is applying the deduction to the full contract value (including the workshop fabrication), they are overstating the deduction base and you are overpaying.",
      },
      {
        question: "Are my welding sets and fabrication equipment tax deductible?",
        answer:
          "Yes. MIG and TIG welding sets, plasma cutters, angle grinders, fabrication tables and other workshop equipment are plant and machinery eligible for capital allowances. The Annual Investment Allowance provides a 100% first-year deduction on qualifying equipment up to £1 million per year. If you bought new welding equipment this year, the full cost can be deducted against your CIS income.",
      },
      {
        question: "Do I need to be CIS registered if most of my work is workshop fabrication?",
        answer:
          "If any part of your work involves on-site installation or fixing under a CIS contract, you should register as a CIS subcontractor to avoid the 30% unregistered deduction rate being applied to the CIS-applicable portion. If genuinely all your work is workshop fabrication and delivery with no on-site installation, CIS does not apply. In practice many fabricators carry out some site work and registration is therefore the safer default.",
      },
    ],
    testimonial: {
      quote:
        "Nobody had explained that the workshop fabrication work was outside CIS. My contractor had been deducting 20% from the full contract value for two years. Once we split the fabrication from the installation element, the refund was substantial.",
      attribution: "Self-employed welder-fabricator, structural steelwork sector",
    },
  },
  // ---- business1 ----
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
      "Property developers occupy an unusual position in CIS: many do not think of themselvesruction businesses, yet once their annual construction spend crosses £3 million they become deemed contractors under the scheme and all the same obligations apply. Below that threshold, developers who engage contractors directly still need to understand when those payments are within CIS scope and when they are not. Layer in the VAT domestic reverse charge, new-build zero-rating, and the distinction between development activity (within CIS) and property investment (outside it), and the tax picture for a property development company is genuinely complex.",
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
  // ---- business2 ----
  {
    slug: "civil-engineering-firms",
    segment: "business",
    title: "Civil Engineering Firms",
    headline: "CIS accounting and compliance for civil engineering firms",
    metaTitle: "Accountants for Civil Engineering Firms | CIS Specialists",
    metaDescription:
      "CIS compliance, GPS and contractor accounting for civil engineering firms. Framework contracts, retention chains and April 2026 anti-fraud rules covered.",
    intro:
      "Civil engineering firms operate at the complex end of the Construction Industry Scheme. Long-duration framework contracts, multi-tier subcontractor chains, substantial plant and materials supply, and retention periods that can run for years: each of these creates CIS obligations and cash-flow pressure that require proper management at director and finance director level. Since 6 April 2026, the GPS anti-fraud rules under Finance Act 2026 have raised the compliance stakes further. A firm that cannot demonstrate documented due diligence at every payment now risks losing GPS without notice and a five-year ban on reapplication.",
    stats: [
      { value: "£100,000", label: "Whole-company GPS turnover test (or £30,000 per director)" },
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
    segment: "business",
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
    segment: "business",
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
    segment: "business",
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
    segment: "business",
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
  }
];

export function getTradeType(slug: string): TradeType | undefined {
  return tradeTypes.find((t) => t.slug === slug);
}
