import type { TradeType } from "../../../construction-cis/web/src/data/trade-types";

export const batch3Trades: TradeType[] = [
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
          "Shopfitting contracts often combine CIS-subject construction operations (joinery installation, partitioning, flooring, electrical first-fix) with the supply of manufactured units, bespoke furniture and equipment that is not itself a construction operation. Where a contract mixes these elements, the CIS deduction applies only to the labour on the construction operations part. Manufactured units supplied as goods rather than installed as construction do not attract a CIS deduction at all. Many main contractors apply the deduction to the full contract value. We review your contracts and deduction slips to identify the correct base.",
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
          "The HMRC CIS 340 guide (para A.21) draws the line explicitly: tree planting and landscaping carried out in the course of forestry or estate management are NOT construction operations. Tree planting and landscaping as part of a new housing development ARE construction operations. Finance Act 2004 s.74 includes landscaping within construction only where it is preparatory to or forms an integral part of a wider construction operation. Routine grounds maintenance, ongoing gardening, mowing, hedge-trimming and seasonal upkeep of existing grounds are outside CIS in all cases. A landscaper who works on new-build housing sites, commercial developments and construction project soft-landscaping is in CIS for those contracts. A landscaper who does only ongoing maintenance for existing property owners is not in CIS at all. Many landscapers work across both types and need their contract mix assessed.",
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
          "It depends on the nature of the work, not just the label. HMRC's CIS 340 guide (para A.21) states that tree planting and landscaping as part of a new housing development are construction operations and therefore within CIS. Tree planting and landscaping in the course of forestry or estate management are not construction operations. Routine grounds maintenance, gardening and seasonal upkeep are outside CIS in all cases. If you work on new-build sites or commercial construction projects, those contracts are likely within CIS. If you work only on ongoing maintenance for existing property owners, CIS does not apply.",
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
];
