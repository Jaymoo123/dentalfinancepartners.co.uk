import type { TradeType } from "../../../construction-cis/web/src/data/trade-types";

// Batch 2: flooring-contractors, heating-engineers, kitchen-fitters,
//          bathroom-fitters, window-installers
// All segment: "trade"
// House positions: docs/construction-cis/house_positions.md (HP-LOCKED 2026-06-12)
// Key locked figures: labour-only deduction base, AMAP 55p from 6 April 2026,
//   GPS £30,000 net sole trader, ~£2,000 avg refund (illustrative, not guaranteed),
//   FA 2026 enacted (RA 18 March 2026), ss.62A/62B = 20% of payment on payer.
// No em-dashes. UK English. No hype words.

export const batch2Trades: TradeType[] = [
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
];
