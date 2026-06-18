// Construction-CIS trade pages: batch 4
// Trades: plant-operators, drainage-contractors, cladding-installers, paving-contractors, welder-fabricators
// All segment: "trade" | All figures locked per docs/construction-cis/house_positions.md 2026-06-12
// Scope boundaries verified against s.74 Finance Act 2004 and CIS 340 (GOV.UK, 2026-06-12).
// No import required: plain literals matching TradeType exactly.

export const batch4Trades = [
  {
    slug: "plant-operators",
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
    segment: "trade" as const,
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
];
