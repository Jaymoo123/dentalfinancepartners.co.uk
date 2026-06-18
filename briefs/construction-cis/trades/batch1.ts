// Construction-CIS trade pages: batch 1
// Trades: carpenters, tilers, glaziers, steel-fixers, ceiling-fixers
// All segment: "trade" | All figures locked per docs/construction-cis/house_positions.md 2026-06-12
// No import required: plain literals matching TradeType exactly.

export const batch1Trades = [
  {
    slug: "carpenters",
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
];
