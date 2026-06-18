// CityData entries for batch 5: Portsmouth, Plymouth, Sunderland, Wolverhampton, Reading.
// No imports required. Append each entry to the CITIES record in data.ts.
// All figures cite house_positions.md. Projects verified by web search June 2026.
// UK English throughout. No em/en-dashes.

import type { CityData } from "../../app/locations/[slug]/data";

export const batch5Cities: CityData[] = [
  {
    slug: "portsmouth",
    name: "Portsmouth",
    region: "Hampshire",
    population: "215,000",
    geo: { lat: 50.8198, lng: -1.0880 },
    intro: `<p>Portsmouth is one of the UK's most construction-active coastal cities, with the Royal Navy base driving a sustained pipeline of specialist civils, refurbishment and infrastructure work alongside city-centre regeneration schemes. If you are a CIS subcontractor working on naval estate contracts, housing projects or the former Debenhams site redevelopment, your contractor is deducting 20 per cent from the labour element of every invoice and passing it to HMRC on your behalf.</p>
<p>That 20 per cent adds up fast. A Portsmouth groundworker or electrician earning £40,000 gross in CIS work across the naval base programme and city regeneration sites typically has £8,000 deducted before seeing a penny. After allowable expenses such as van costs at 55p per mile (from 6 April 2026), tools and PPE, most subcontractors owe significantly less than that to HMRC and are due a refund. The illustrative average across CIS subcontractors nationally is around £2,000 (for content purposes; individual outcomes vary).</p>
<p>Trade Tax Specialists handles CIS tax returns and refund claims for Portsmouth-area subcontractors entirely online. You do not need a local accountant: we act for sole traders and limited-company directors across the UK, from naval base electricians and groundworkers to roofers and bricklayers on the city's housing regeneration sites.</p>`,
    contractorScene: `<p>Portsmouth's construction market sits at the intersection of defence infrastructure and city regeneration, creating two distinct but complementary pipelines for local subcontractors. The dominant employer is the Royal Navy estate at HMNB Portsmouth, where KBS Maritime (the joint venture between KBR and BAE Systems) manages a six-year building investment programme worth an estimated £40 million to £60 million. The programme is refurbishing five operationally key buildings including the Grade II-listed Sail Loft, the Cochrane Building and The Wardroom. Works run through to at least December 2026 on RIBA Stages 2 and 3, with design and build contracts to follow. This programme alone draws a steady supply chain of groundworkers, bricklayers, plasterers, joiners and specialist restoration trades from across Hampshire and the wider south coast.</p>
<p>Away from the base, the Royal Marines Museum at Boathouse 6 in the Historic Dockyard is under active construction, a £9.5 million scheme due to open in summer 2026. Separately, Portsmouth City Council is advancing the City Centre North regeneration, targeting the former Tricorn and Sainsbury's sites with a master developer appointment in progress and first homes expected in late 2026. The former Debenhams site on Commercial Road is also moving towards a 2026 construction start under a national development partner. Both schemes will generate significant sub-trade demand in groundworks, concrete frame, fit-out and finishing trades. Subbies working across these projects often operate informally with multiple main contractors and are among the most likely to be deducted at 30 per cent (the unregistered rate) rather than 20 per cent, underscoring the value of CIS registration and proper accountancy support.</p>`,
    majorProjects: [
      {
        name: "HMNB Portsmouth Building Investment Programme",
        detail: "Six-year, £40m to £60m refurbishment of five operational naval base buildings including the Sail Loft, Cochrane Building and Wardroom. Managed by KBS Maritime (KBR/BAE Systems JV). RIBA Stage 2 deadline December 2025, Stage 3 December 2026.",
      },
      {
        name: "Royal Marines Museum, Boathouse 6",
        detail: "£9.5 million conversion of the former Action Stations site at Portsmouth Historic Dockyard into an immersive Royal Marines Museum. Construction started February 2025, opening targeted summer 2026.",
      },
      {
        name: "City Centre North Regeneration (former Tricorn site)",
        detail: "Large-scale mixed-use regeneration of the former Tricorn and Sainsbury's sites in Portsmouth city centre. Council selecting a master developer in 2026; first homes targeted late 2026.",
      },
      {
        name: "Former Debenhams Site, Commercial Road",
        detail: "City-centre mixed-use redevelopment on the former Debenhams footprint. Planning application submitted late 2025 by Darling Associates; construction start targeted 2026.",
      },
    ],
    tradeMix: [
      "electricians",
      "groundworkers",
      "bricklayers",
      "plasterers",
      "joiners",
      "plumbers",
      "painters-decorators",
      "roofers",
      "scaffolders",
      "civil-engineers",
    ],
    localFaqs: [
      {
        question: "I work on the Royal Navy base in Portsmouth. Does CIS apply to naval estate contracts?",
        answer: "Yes. Construction work carried out on MOD and naval estate buildings falls within CIS where the main contractor is registered as a CIS contractor. From 6 April 2026, payments to local authorities and public sector bodies are exempt under new Regulation 24ZA, but the exemption covers the public body as client, not every build contract placed by the MOD. Your contractor should be deducting at 20 per cent (registered) or 30 per cent (unregistered) from the labour element of your invoices. We handle CIS registration, returns and refund claims for Portsmouth subcontractors entirely remotely.",
      },
      {
        question: "How much could I get back as a Portsmouth CIS subcontractor?",
        answer: "The illustrative national average CIS refund is around £2,000 (for content purposes; not guaranteed). Your actual refund depends on your gross CIS income, the deductions suffered, and your allowable expenses. Portsmouth subcontractors driving to Devonport, Southampton or London project sites can claim the approved mileage rate of 55p per mile for the first 10,000 business miles from 6 April 2026. Tools, PPE, specialist clothing and a portion of phone costs are also allowable. We prepare a full Self Assessment return to calculate your exact position.",
      },
      {
        question: "Can I claim CIS refunds from previous tax years while working in Portsmouth?",
        answer: "Yes. HMRC allows you to claim refunds for up to four prior tax years. If you have been working on CIS projects in Portsmouth or elsewhere and not filed, we can prepare the outstanding returns and recover the over-deducted tax. The combined four-year figure can be substantial.",
      },
      {
        question: "Do I need a Portsmouth-based accountant to make a CIS refund claim?",
        answer: "No. Trade Tax Specialists operates as a fully remote UK-wide practice. We act for subcontractors across the South Coast, the Solent corridor and throughout England, Wales and Scotland. All work is handled online: we collect your CIS deduction statements and expense records, file your Self Assessment, and track the refund to your account.",
      },
      {
        question: "I am a Portsmouth bricklayer working for multiple contractors. How do I handle CIS with several payors?",
        answer: "Each contractor you work for must verify your CIS status separately and deduct at the applicable rate on the labour element of your payments. At year end, you report all CIS income from all contractors on a single Self Assessment return and offset all deductions suffered against your actual tax bill. We consolidate all your CIS deduction statements and prepare the return, regardless of how many contractors you work for.",
      },
    ],
    nearbyAreas: [
      "Fareham",
      "Gosport",
      "Havant",
      "Waterlooville",
      "Southampton",
      "Chichester",
      "Petersfield",
    ],
  },

  {
    slug: "plymouth",
    name: "Plymouth",
    region: "Devon",
    population: "264,000",
    geo: { lat: 50.3755, lng: -4.1427 },
    intro: `<p>Plymouth is home to Devonport Royal Dockyard, one of the largest naval base complexes in Western Europe, and a city undergoing substantial civil, residential and public-realm regeneration. The Kier BAM joint venture delivering the 10 Dock refurbishment at Devonport, the Morgan Sindall-led £30 million Armada Way transformation, and the ongoing Barne Barton housing regeneration all draw large supply chains of CIS subcontractors across Plymouth and the wider Devon corridor.</p>
<p>If you are a Plymouth sole trader or limited-company director working under CIS, the 20 per cent deduction on your labour income is taken before you see it. A Plymouth groundworker or civil engineer grossing £45,000 in CIS work typically has £9,000 deducted. After expenses including van mileage at 55p per mile from April 2026, tools and PPE, many Plymouth subcontractors are owed a meaningful refund. The illustrative UK average is around £2,000 (individual outcomes vary); the back-years route lets you recover up to four prior tax years at once.</p>
<p>Trade Tax Specialists provides CIS tax returns and refund claims for Plymouth subcontractors online. You do not need a Plymouth-based accountant. We handle CIS registration, monthly returns, Self Assessment and GPS applications for sole traders and limited-company directors across the South West.</p>`,
    contractorScene: `<p>Plymouth's construction market is anchored by Devonport Royal Dockyard, where Babcock International manages a multi-decade nuclear submarine maintenance and upgrade programme worth hundreds of millions of pounds. The 10 Dock refurbishment, awarded to the Kier BAM joint venture with delivery partners Costain and Mott MacDonald, involves demolition, civils and new-build construction running through to 2026. Separately, a £560 million programme to modernise nuclear submarine support infrastructure at Devonport, announced in March 2024, sustains a long-run pipeline of specialist civils, mechanical and electrical work, drawing subcontractors from across Plymouth, Cornwall and Somerset.</p>
<p>Away from the dockyard, Morgan Sindall is delivering the £30 million Armada Way public realm scheme through Plymouth city centre, with completion targeted in summer 2026. The project involves granite paving, stonework, drainage, planting and a cycle route, and has drawn groundworkers, landscape groundworkers and paving specialists from Plymouth and the surrounding area. Morgan Sindall is also the named contractor for the broader Plymouth City Centre Regeneration programme. The Barne Barton housing regeneration in the north of the city, a £68 million project, commenced enabling works in 2025 with first completions expected in spring 2026, adding residential groundwork, bricklaying, roofing and fit-out demand. Plymouth Skills Launchpad opened several major construction sites for public tours in early 2026, reflecting the breadth of live activity across the city. The concentration of dockyard civils, city-centre public realm and residential regeneration makes Plymouth one of the stronger markets for groundworkers, civil engineers, electricians and plumbers in the South West.</p>`,
    majorProjects: [
      {
        name: "Devonport 10 Dock Refurbishment (Babcock / Kier BAM JV)",
        detail: "Refurbishment of the 10 Dock submarine facility at Devonport Royal Dockyard. Main works contractor is the Kier BAM joint venture; delivery partners include Costain and Mott MacDonald. Construction running through 2026.",
      },
      {
        name: "Devonport Nuclear Submarine Support Infrastructure",
        detail: "£560 million programme to modernise submarine support facilities at HMNB Devonport, announced March 2024. Long-run civils and M&E pipeline sustaining sub-trade demand well into the late 2020s.",
      },
      {
        name: "Armada Way Public Realm Regeneration (Morgan Sindall)",
        detail: "£30 million transformation of Plymouth city centre's main boulevard, delivered by Morgan Sindall. Granite paving, stonework, new drainage and cycling infrastructure. Targeted completion summer 2026.",
      },
      {
        name: "Barne Barton Housing Regeneration",
        detail: "£68 million residential regeneration in north Plymouth, delivering new-build homes across multiple phases. Enabling works 2025; first completions spring 2026.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "bricklayers",
      "roofers",
      "joiners",
      "scaffolders",
      "painters-decorators",
      "labourers",
    ],
    localFaqs: [
      {
        question: "I work on Devonport dockyard contracts. Does CIS apply to dockyard construction work?",
        answer: "Yes, where the work is construction or civil engineering on the dockyard estate and the main contractor is CIS-registered. Babcock and the Kier BAM joint venture are both substantial CIS contractors. From 6 April 2026, Regulation 24ZA exempts payments to public bodies from CIS, but the exemption relates to the public body as client, not to all contracts placed by or near MOD sites. Your contractor should be deducting 20 per cent (registered) or 30 per cent (unregistered) from the labour portion of your invoices. We handle registration, returns and refund claims.",
      },
      {
        question: "How much of a CIS refund could a Plymouth subcontractor expect?",
        answer: "The illustrative UK average CIS refund is around £2,000 (for content purposes; individual outcomes vary). Plymouth-based subcontractors driving across Devon and Cornwall can claim 55p per mile for the first 10,000 business miles from 6 April 2026, which adds up on longer runs to Truro, Exeter or Bristol project sites. Tools, PPE and relevant training costs are also deductible. We prepare a full Self Assessment to calculate your exact refund position.",
      },
      {
        question: "Can I claim back CIS deductions from previous years if I was working in Plymouth?",
        answer: "Yes. HMRC allows refund claims for up to four prior tax years. If you worked on Devonport contracts, Armada Way or other Plymouth projects and did not file a Self Assessment, we can prepare the outstanding returns and recover the over-deducted tax. The combined multi-year refund is often significantly higher than any single year.",
      },
      {
        question: "What is the difference between a sole trader and a limited company for CIS refunds in Plymouth?",
        answer: "As a sole trader you reclaim CIS deductions via your annual Self Assessment return after the tax year ends. As a limited company director, you can reclaim in real time during the year by offsetting CIS suffered against your PAYE and CIS liabilities on the Employer Payment Summary (EPS), rather than waiting up to 18 months for a corporation tax repayment. We advise Plymouth subcontractors on the right structure and handle both routes.",
      },
      {
        question: "Do I need to be based in Plymouth to use Trade Tax Specialists?",
        answer: "No. We are a UK-wide remote practice. We act for subcontractors throughout Devon, Cornwall and the wider South West, and across the UK. Everything is handled online: CIS deduction statements, expense records, Self Assessment filing and HMRC correspondence.",
      },
    ],
    nearbyAreas: [
      "Saltash",
      "Tavistock",
      "Ivybridge",
      "Torpoint",
      "Liskeard",
      "Newton Abbot",
      "Exeter",
    ],
  },

  {
    slug: "sunderland",
    name: "Sunderland",
    region: "Tyne and Wear",
    population: "275,000",
    geo: { lat: 54.9069, lng: -1.3838 },
    intro: `<p>Sunderland is in the middle of a £2 billion-plus city-wide regeneration programme, with the Riverside Sunderland project on the former Vaux Brewery site, the International Advanced Manufacturing Park (IAMP) expansion and the Crown Works Studios development all generating sustained construction demand across the city and the wider Wearside area. CIS subcontractors working on these schemes, and on the residential sites delivering thousands of new homes across Sunderland, face 20 per cent deductions on every labour payment.</p>
<p>A registered Sunderland groundworker or bricklayer grossing £38,000 from CIS work typically has £7,600 deducted before expenses. After allowable costs including van mileage at 55p per mile from 6 April 2026, tools, PPE and materials, a meaningful proportion of that sum comes back as a refund. The illustrative average nationally is around £2,000 (individual outcomes vary). We can also look back up to four prior tax years, which is particularly relevant for subcontractors who have been on IAMP or Riverside Sunderland sites since the earlier phases.</p>
<p>Trade Tax Specialists handles CIS tax returns, Self Assessment and refund claims for Sunderland subcontractors entirely online. We act for sole traders and limited-company directors across the North East, with no requirement to visit a local office.</p>`,
    contractorScene: `<p>Sunderland's construction market is shaped by two dominant forces: the Riverside Sunderland flagship regeneration on the former Vaux Brewery site, and the International Advanced Manufacturing Park (IAMP) on the A19 corridor north of the Nissan plant. Riverside Sunderland is a long-run project targeting 1,000 homes and 1 million square feet of office and workspace across the 33-hectare Vaux site. Multiple residential blocks are at various stages of planning and construction in 2025 and 2026, including the 67-house, 98-apartment scheme approved by councillors in January 2025 and the Igloo Regeneration-delivered 34-home sustainable block also on the Vaux site. The Nile and Villiers development of 75 homes and commercial space is targeting a 2026 completion.</p>
<p>At IAMP, Esh Group completed a £6.7 million A1290 road dualling in December 2025 through a NEPO-procured contract, improving access to the 150-hectare site and unlocking the next phase of infrastructure work. IAMP is a joint venture between South Tyneside and Sunderland City councils and Henry Boot Developments, targeting 7,000 jobs over ten years. The site sits adjacent to the Nissan manufacturing plant and is expected to attract automotive supply chain and advanced manufacturing occupiers, each requiring fit-out and services trades. In Pallion, the Crown Works Studios development secured Mayor Kim McGuinness's commitment of more than £38 million to accelerate Phase 1a (four sound stages, approximately 230,000 sq ft of production space) towards a July 2026 construction start. Sunderland also delivers consistent residential regeneration work through the West Park neighbourhood, Sheepfolds and Houghton Colliery sites, all of which feed ongoing demand for groundworkers, bricklayers, plasterers and joiners across the Wearside supply chain.</p>`,
    majorProjects: [
      {
        name: "Riverside Sunderland (former Vaux Brewery site)",
        detail: "Flagship £2bn+ city regeneration on 33 hectares of former brewery land. Multiple residential and commercial phases in construction or planning in 2025 and 2026, including 67-house/98-apartment scheme approved January 2025 and Igloo Regeneration's 34-home sustainable block.",
      },
      {
        name: "International Advanced Manufacturing Park (IAMP)",
        detail: "370-acre manufacturing park north of Nissan, delivered by South Tyneside/Sunderland councils and Henry Boot Developments. Esh Group completed £6.7 million A1290 road dualling December 2025 (NEPO contract). Ongoing infrastructure and build-out phases.",
      },
      {
        name: "Crown Works Studios, Pallion",
        detail: "Planned film and TV studio development in Sunderland's Pallion area. Phase 1a covers four sound stages and approximately 230,000 sq ft of production space. North East Mayor committed more than £38 million; construction start targeted July 2026.",
      },
      {
        name: "Nile and Villiers Housing Development",
        detail: "75 new homes and 575 sq m of commercial space on the Riverside Sunderland site, targeting 2026 completion as part of the wider Vaux regeneration programme.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "bricklayers",
      "plasterers",
      "joiners",
      "electricians",
      "plumbers",
      "roofers",
      "painters-decorators",
      "scaffolders",
      "labourers",
    ],
    localFaqs: [
      {
        question: "I am a Sunderland groundworker on the Riverside Sunderland site. How does CIS affect my pay?",
        answer: "Your contractor deducts 20 per cent (if you are CIS-registered) or 30 per cent (if unregistered) from the labour element of every payment. Materials you supply are excluded from the deduction base. At the end of the tax year you file a Self Assessment return, offset the deductions against your actual tax liability, and recover any overpayment as a refund. We handle the full process remotely for Sunderland-based subcontractors.",
      },
      {
        question: "What expenses can I claim as a Sunderland CIS subcontractor to reduce my tax bill?",
        answer: "You can claim the approved mileage rate of 55p per mile for the first 10,000 business miles from 6 April 2026 (up from 45p), which is significant for Sunderland subcontractors travelling to IAMP, Pallion, South Tyneside or further afield. Tools, PPE, specialist clothing, relevant training, a proportion of mobile phone costs and use-of-home costs where you run your business from home are all allowable. We work through your expenses with you to make sure nothing is missed.",
      },
      {
        question: "Can I claim CIS refunds from previous years working on Sunderland projects?",
        answer: "Yes. HMRC allows claims for up to four prior tax years. If you have worked on Riverside Sunderland, IAMP or other local schemes and have outstanding Self Assessment returns, we can file those and recover the over-deducted CIS from each year. Multi-year recoveries are often considerably larger than a single-year refund.",
      },
      {
        question: "How do CIS deductions work if I have worked for more than one contractor in Sunderland?",
        answer: "Each contractor deducts independently from your labour income. You declare all income from all contractors on a single Self Assessment return and offset all deductions together. We collect your CIS deduction statements from each contractor and prepare the consolidated return.",
      },
      {
        question: "Do I need a Sunderland or North East accountant to claim my CIS refund?",
        answer: "No. Trade Tax Specialists is a UK-wide remote service. We act for sole traders and limited-company directors across Sunderland, South Tyneside, Gateshead, Durham and the wider North East, all online. There is no requirement to visit a local office.",
      },
      {
        question: "What is Making Tax Digital and does it affect me as a Sunderland CIS subcontractor?",
        answer: "MTD for Income Tax (MTD ITSA) requires digital record-keeping and quarterly updates for sole traders with gross income above £50,000 from April 2026. The key point for CIS subcontractors is that income is tested on your gross receipts before CIS deductions, not on what lands in your account. A Sunderland subcontractor receiving £40,000 after 20 per cent deductions may have had £50,000 gross, which puts them within scope. We advise on MTD compliance as part of our CIS service.",
      },
    ],
    nearbyAreas: [
      "Washington",
      "Houghton le Spring",
      "Chester-le-Street",
      "Durham",
      "Gateshead",
      "South Shields",
      "Seaham",
    ],
  },

  {
    slug: "wolverhampton",
    name: "Wolverhampton",
    region: "West Midlands",
    population: "263,000",
    geo: { lat: 52.5860, lng: -2.1285 },
    intro: `<p>Wolverhampton is one of the most active regeneration markets in the West Midlands, with the £150 million Canalside South residential scheme, the £83 million Smithgate Bicycle Works first phase and the £40 million New Park Village estate replacement all in active construction simultaneously. CIS subcontractors working across these sites, and on the wider Black Country supply chain, are subject to 20 per cent deductions on the labour element of every invoice.</p>
<p>A Wolverhampton sole-trader groundworker or bricklayer earning £36,000 gross in CIS work typically has £7,200 withheld before touching it. After allowable expenses such as van costs at 55p per mile from 6 April 2026, tools and PPE, the amount actually owed to HMRC is usually well below that. The illustrative UK-average refund across CIS subcontractors is around £2,000 (for content purposes; individual outcomes vary), and claiming back four prior tax years at once is available to anyone with outstanding Self Assessment returns.</p>
<p>Trade Tax Specialists provides CIS tax returns, refund claims and ongoing accountancy for Wolverhampton-area subcontractors entirely online, acting for sole traders and limited-company directors across the West Midlands and the UK.</p>`,
    contractorScene: `<p>Wolverhampton's construction market in 2025 and 2026 is dominated by three large regeneration schemes running concurrently, each drawing substantial sub-trade supply chains from across the Black Country. The most advanced is Wavensmere Homes' £150 million Canalside South development on 17.5 acres of former industrial land beside the city-centre canals. Construction started in early 2025 and passed its 12-month milestone in January 2026 with over £20 million invested in land remediation, groundworks and initial build phases. The 533-home scheme runs in three phases west-to-east; the first 153 houses in phase one have been progressing through groundworks, frame and roofing trades through 2025, with completions beginning monthly from June 2026.</p>
<p>The English Cities Fund (ECF), a partnership of Homes England, Legal and General and Muse, broke ground in early 2026 on Smithgate, Wolverhampton's largest regeneration scheme. The £83 million first phase at Bicycle Works will deliver 331 apartments across three six-storey buildings, with the wider masterplan targeting up to 1,070 homes and 20,000 sq ft of commercial space across 12 acres linking School Street to Market Square. ECF's Smithgate pipeline will run to 2028 and beyond, sustaining demand for groundworkers, concrete frame trades, electricians, plumbers, drylining and finishing trades throughout. The New Park Village estate replacement is the third major site: 205 outdated 1960s maisonettes are being demolished and replaced with 188 new energy-efficient homes across two phases, funded from the council's £40 million Housing Revenue Account capital budget, with construction starting in spring 2026. Wolverhampton also benefits from the wider West Midlands Construction Skills Village in Walsall, which feeds trained subcontractors into the Black Country supply chain.</p>`,
    majorProjects: [
      {
        name: "Canalside South (Wavensmere Homes)",
        detail: "£150 million, 533-home brownfield regeneration on 17.5 acres of former industrial land beside Wolverhampton city-centre canals. Construction started early 2025, passed 12-month milestone January 2026. First completions from June 2026; three-phase delivery running to approximately 2028.",
      },
      {
        name: "Smithgate Bicycle Works Phase 1 (English Cities Fund / ECF)",
        detail: "£83 million first phase of the wider Smithgate masterplan. 331 apartments across three six-storey buildings on 12 acres linking School Street to Market Square. ECF (Homes England, L&G and Muse) broke ground early 2026. Wider scheme targets up to 1,070 homes.",
      },
      {
        name: "New Park Village Estate Regeneration",
        detail: "£40 million council-funded replacement of 205 outdated 1960s maisonettes with 188 new energy-efficient homes across two phases. Demolition enabling works underway; construction start spring 2026. Funded from Wolverhampton City Council's Housing Revenue Account.",
      },
      {
        name: "Former Marks and Spencer Building Conversion (ALB Group / Prosperity Group)",
        detail: "Conversion of the landmark former M&S building in Wolverhampton city centre into 71 contemporary apartments and three ground-floor retail units. Planning approval granted January 2026 by the joint venture of ALB Group (Nottingham) and Prosperity Group (Birmingham).",
      },
    ],
    tradeMix: [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "joiners",
      "plasterers",
      "dryliners",
      "roofers",
      "painters-decorators",
      "scaffolders",
    ],
    localFaqs: [
      {
        question: "I am a groundworker on the Canalside South site in Wolverhampton. How does CIS work for me?",
        answer: "Wavensmere Homes and its appointed main contractors deduct 20 per cent (registered) or 30 per cent (unregistered) from the labour element of your invoices. Materials you supply are excluded from the deduction. At year end you file a Self Assessment return, offset the deductions against your actual tax bill, and recover the overpayment as a refund. We handle this process remotely for Wolverhampton subcontractors.",
      },
      {
        question: "What expenses can I claim as a Wolverhampton CIS subcontractor?",
        answer: "You can claim the approved mileage allowance of 55p per mile for the first 10,000 business miles from 6 April 2026. For Wolverhampton subcontractors travelling to Birmingham, Walsall, Dudley or further afield on multi-site contracts, this adds up materially. Tools, PPE, specialist workwear, relevant training and a proportion of mobile costs are also deductible. Use-of-home costs apply if you store materials or run admin from home.",
      },
      {
        question: "Can I claim back CIS tax from previous years if I worked on Wolverhampton schemes?",
        answer: "Yes. HMRC permits Self Assessment refund claims for up to four prior tax years. If you have worked on Wolverhampton regeneration sites and have unfiled returns, we can file the outstanding years and recover the over-deducted CIS for each. The combined total across four years is often significantly larger than any single year.",
      },
      {
        question: "What is Gross Payment Status and should a Wolverhampton subcontractor apply?",
        answer: "Gross Payment Status (GPS) lets HMRC pay you at 0 per cent deduction instead of 20 per cent, settling your tax through Self Assessment instead. To qualify you need at least £30,000 net CIS turnover in the past 12 months (if a sole trader), a bank account in the business name, and a clean compliance record for the past 12 months. Finance Act 2026 also tightened the regime from 6 April 2026: HMRC can now revoke GPS without notice where a contractor knew or should have known of supply-chain fraud, and the reapplication ban rose from 1 to 5 years. We advise on GPS eligibility and applications.",
      },
      {
        question: "Do I need to be based in Wolverhampton to use Trade Tax Specialists?",
        answer: "No. We operate as a UK-wide remote service and act for subcontractors across the West Midlands, Black Country, Staffordshire and the UK. All work is handled online.",
      },
    ],
    nearbyAreas: [
      "Walsall",
      "Dudley",
      "West Bromwich",
      "Bilston",
      "Cannock",
      "Telford",
      "Stourbridge",
    ],
  },

  {
    slug: "reading",
    name: "Reading",
    region: "Berkshire",
    population: "230,000",
    geo: { lat: 51.4543, lng: -0.9781 },
    intro: `<p>Reading is one of the fastest-growing commercial and residential construction markets in the South East outside London. The £800 million Station Hill mixed-use development delivered its first office tower in 2025 with further phases under way, while Berkeley Group's Green Park Village residential scheme and the Reading Riverworks development continue to generate sustained sub-trade demand across the M4 corridor. CIS subcontractors on these and other Reading projects face 20 per cent deductions on the labour element of every payment their contractor makes.</p>
<p>A Reading-based sole-trader electrician or plumber earning £42,000 gross in CIS work typically has £8,400 deducted before it reaches them. After allowable expenses such as van mileage at 55p per mile from 6 April 2026, tools and PPE, the amount they actually owe HMRC is often considerably less, and the difference comes back as a refund. The illustrative UK average across CIS subcontractors is around £2,000 (for content purposes; individual outcomes vary), and up to four prior tax years can be recovered at once for those with outstanding returns.</p>
<p>Trade Tax Specialists handles CIS tax returns and refund claims for Reading-area subcontractors entirely online. We act for sole traders and limited-company directors across Berkshire, Surrey, Oxfordshire and the wider South East, with no requirement for a local office visit.</p>`,
    contractorScene: `<p>Reading's construction market sits at the centre of a dense M4-corridor pipeline that stretches from Slough in the east to Swindon in the west. The dominant project in 2025 and 2026 is Station Hill, the £800 million mixed-use regeneration directly above Reading Station. The developer is Lincoln MGT and the Phase 2 contractor is Robert McAlpine, who delivered the 18-storey One Station Hill office tower in 2025. The wider scheme will ultimately comprise up to 625,000 sq ft of office space, 1,300 private and affordable homes, 95,000 sq ft of retail and leisure, and a central two-acre piazza, with further phases in design and planning through 2026. The scale of the project has drawn M&E, fit-out, groundwork and finishing trades from across Berkshire and the wider Thames Valley.</p>
<p>Berkeley Group's Green Park Village development in south Reading is delivering over 1,300 new homes across multiple phases, with Phase 6 reaching completion milestones in 2025 and 2026. Foundation Developments is listed as a Phase 6 contractor, reflecting the specialist groundwork and substructure demand generated by this large residential scheme adjacent to the Green Park business park and the new Green Park railway station (opened 2023). Berkeley Group's Reading Riverworks and Huntley Wharf canalside schemes add residential demand for groundworkers, bricklayers, joiners, electricians and plumbers across the Reading waterfront. Reading's position as a major rail hub, with direct services to London Paddington in under 30 minutes, means subcontractors regularly travel to London and along the M4 and M3 corridors for work, making van mileage one of the most material expense claims in the local CIS market.</p>`,
    majorProjects: [
      {
        name: "Station Hill (Lincoln MGT / Robert McAlpine)",
        detail: "£800 million mixed-use regeneration above Reading Station. Phase 2 contractor Robert McAlpine. One Station Hill 18-storey office tower delivered 2025. Wider scheme: up to 625,000 sq ft offices, 1,300 homes, 95,000 sq ft retail and leisure, two-acre piazza. Further phases in planning through 2026.",
      },
      {
        name: "Green Park Village (Berkeley Group)",
        detail: "1,300-plus-home residential development in south Reading. Multiple phases; Phase 6 completing 2025 and 2026 with Foundation Developments as groundwork contractor. Adjacent to Green Park business park and Green Park Station (opened 2023).",
      },
      {
        name: "Reading Riverworks (Berkeley Group)",
        detail: "Residential-led canalside regeneration in Reading, forming part of Berkeley Group's broader Reading waterfront programme. Active construction in 2025 and 2026 delivering apartments and townhouses.",
      },
      {
        name: "Huntley Wharf (Berkeley Group)",
        detail: "Berkeley Group residential scheme on the Reading waterfront, delivering new-build homes alongside the wider canalside regeneration of the town's former industrial waterfront.",
      },
    ],
    tradeMix: [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "bricklayers",
      "plasterers",
      "painters-decorators",
      "roofers",
      "gas-engineers",
      "scaffolders",
    ],
    localFaqs: [
      {
        question: "I am an electrician working on the Station Hill development in Reading. How does CIS apply?",
        answer: "Robert McAlpine and other CIS-registered main contractors on Station Hill must deduct 20 per cent (registered subcontractor) or 30 per cent (unregistered) from the labour element of your invoices before paying you. Materials you supply are excluded from the deduction base. At the end of the tax year you file a Self Assessment return, credit those deductions against your actual tax bill, and receive the overpayment back as a refund. We handle this for Reading-area electricians and other sub-trades.",
      },
      {
        question: "What expenses can a Reading CIS subcontractor claim to reduce their tax bill?",
        answer: "Reading-based subcontractors often work across the M4 and M3 corridors, travelling regularly to London, Slough, Wokingham, Basingstoke or Oxford. You can claim 55p per mile for the first 10,000 business miles from 6 April 2026 (an increase from 45p), which is material for high-mileage subcontractors. Tools, PPE, specialist workwear, relevant training and a proportion of mobile phone costs are also allowable. We review your expenses thoroughly to make sure nothing is missed.",
      },
      {
        question: "Can I claim CIS refunds for previous years if I worked on Reading projects?",
        answer: "Yes. HMRC allows you to claim refunds for up to four prior tax years. If you have been working on Station Hill, Green Park Village or other Reading sites and have outstanding Self Assessment returns, we can file those and recover any overpaid CIS for each year. The combined four-year figure can be substantial.",
      },
      {
        question: "Does Making Tax Digital affect me as a Reading CIS subcontractor?",
        answer: "Possibly, from April 2026. MTD for Income Tax applies to sole traders with gross annual income above £50,000. The key point for CIS subcontractors is that income is measured on your gross receipts before deductions, not on what arrives in your bank. A Reading plumber receiving £41,600 after 20 per cent deductions has gross income of £52,000, which is above the threshold. The threshold drops to £30,000 from April 2027. We advise on MTD compliance and compatible software as part of our CIS accountancy service.",
      },
      {
        question: "Do I need a Reading-based accountant to make a CIS refund claim?",
        answer: "No. Trade Tax Specialists is a fully remote UK-wide practice. We act for CIS subcontractors across Reading, Slough, Wokingham, Bracknell, Newbury and the wider Berkshire and Thames Valley area entirely online. You send us your CIS deduction statements and expense records; we handle the rest.",
      },
      {
        question: "I work for multiple contractors across Berkshire and London. How do I consolidate my CIS tax position?",
        answer: "Each contractor deducts independently and issues you a CIS deduction statement. You report all CIS income on a single Self Assessment return, offsetting all deductions together against your tax bill. We collect all your deduction statements, calculate your total income and expenses, and file the consolidated return. This is standard practice for multi-site Reading-area subcontractors.",
      },
    ],
    nearbyAreas: [
      "Wokingham",
      "Bracknell",
      "Newbury",
      "Slough",
      "Maidenhead",
      "Basingstoke",
      "Oxford",
    ],
  },
];
