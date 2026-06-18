// CityData entries for batch 3: Nottingham, Leicester, Cardiff, Belfast, Southampton.
// No imports. Paste into CITIES record in construction-cis/web/src/app/locations/[slug]/data.ts.
// heroImage omitted; images added separately.
// All figures from house_positions.md (HP-LOCKED 2026-06-12). UK English. No em/en-dashes.

// No runtime imports. Type annotation below is for IDE inference only; remove if pasting raw.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const batch3Cities: any[] = [
  // ─── NOTTINGHAM ──────────────────────────────────────────────────────────────
  {
    slug: "nottingham",
    name: "Nottingham",
    region: "East Midlands",
    population: "330,000",
    geo: { lat: 52.9548, lng: -1.1581 },

    intro: `<p>Nottingham is running one of the most active construction pipelines in the East Midlands, with well over £1 billion of live and committed schemes across the city centre and waterside corridor. Subcontractors working on this programme face the same CIS deduction reality as anywhere in the UK: a contractor must deduct 20% from your labour payments and pass it straight to HMRC, before you have seen a single receipt or allowance.</p>
<p>Take a Nottingham groundworker earning £38,000 gross from CIS contracts in 2025/26. The contractor withholds £7,600 at the 20% registered rate, leaving £30,400 in the bank. After van costs at 55p per mile (AMAP rate from 6 April 2026), tools, PPE and a modest use-of-home allowance, taxable profit might fall to £26,000. On that figure the actual income tax and Class 4 NIC bill comes to around £4,300, producing a refund of roughly £3,300. You can also claim back four prior tax years, which means the opening conversation with Trade Tax Specialists often covers more than one year of over-deductions at once.</p>
<p>We work remotely with subcontractors and sole-trader builders across Nottingham and Nottinghamshire. There is no need to visit an office: your payslips, deduction statements and mileage log are all we need to start.</p>`,

    contractorScene: `<p>Nottingham's construction market is anchored by a cluster of major regeneration schemes that have kept groundworkers, bricklayers, scaffolders and fit-out trades continuously busy since 2023. The Waterside Bridge, built by Balfour Beatty for Nottingham City Council with Department for Transport Transforming Cities Fund money, lifted its main span across the River Trent in November 2025 and opened to the public in June 2026. It is the first crossing built over the river in the city since Clifton Bridge in 1958, and the civils and M&amp;E trades that worked on it represent exactly the kind of CIS workforce that tends to have several years of over-deductions sitting unclaimed.</p>
<p>The Island Quarter, a £1.2 billion mixed-use neighbourhood on a 40-acre canalside site, is progressing through phased construction. Phase 1 Canal Turn received planning approval in late 2024 and work began on site in early 2025, delivering a 2,000 sq m waterfront pavilion with events space. Phase 2B gained full planning permission in December 2025 for a purpose-built student accommodation tower. The scheme is managed by Conygar Nottingham Ltd and is expected to run through the 2030s, providing a long-horizon pipeline for local subbies across virtually every trade.</p>
<p>Broad Marsh, the stalled former shopping centre site, was acquired by Homes England in March 2025. Active demolition is under way under a formal collaboration agreement with the East Midlands Combined County Authority and Nottingham City Council, and a master development partner is being sought through a process launched at UKREiiF in May 2026. Construction trades are involved in the enabling and demolition phase now, with the residential and commercial rebuild likely to begin from 2028 onward.</p>
<p>Tier 1 contractors operating in Nottingham include Winvic Construction, Bowmer and Kirkland, and Balfour Beatty. The supply chain draws heavily from the M1 corridor, with subbies regularly commuting from Derby, Mansfield and Hucknall to city-centre sites. Residential new build in the NG1 to NG8 postcodes and the Trent Basin neighbourhood adds further volume for bricklayers, plasterers and groundworkers outside the headline commercial programmes.</p>`,

    majorProjects: [
      {
        name: "Waterside Bridge, River Trent",
        detail: "Balfour Beatty completed this pedestrian and cycle bridge for Nottingham City Council, lifting the main span in November 2025; it opened in June 2026 and is the first new Trent crossing since 1958.",
      },
      {
        name: "The Island Quarter",
        detail: "A £1.2 billion, 40-acre mixed-use neighbourhood by Conygar Nottingham Ltd; Phase 1 Canal Turn began on site in early 2025, with Phase 2B student accommodation approved December 2025.",
      },
      {
        name: "Broad Marsh Regeneration",
        detail: "Homes England acquired the former Broadmarsh shopping centre site in March 2025 and is carrying out active demolition works with plans for approximately 1,000 homes and 20,000 sq m of commercial space.",
      },
      {
        name: "Trent Basin Waterside Neighbourhood",
        detail: "A council-backed development framework targets around 2,000 new homes on the former industrial Waterside corridor, with residential phases by Blueprint Regeneration progressing through 2025 and 2026.",
      },
    ],

    tradeMix: [
      "groundworkers",
      "bricklayers",
      "scaffolders",
      "electricians",
      "plumbers",
      "plasterers",
      "joiners",
      "roofers",
      "painters-decorators",
      "civil-engineers",
    ],

    localFaqs: [
      {
        question: "I work on sites in Nottingham but live outside the city. Can Trade Tax Specialists still help me?",
        answer: "Yes. We are a remote UK-wide service and your location makes no difference. Whether you live in Hucknall, Beeston or further afield, we handle everything by email and phone. All we need are your CIS deduction statements and a record of your expenses.",
      },
      {
        question: "How much could a typical Nottingham subcontractor get back from HMRC?",
        answer: "It varies, but a sole-trader groundworker earning around £38,000 gross in 2025/26, after allowable expenses such as van mileage at 55p per mile (the AMAP rate from 6 April 2026), tools and PPE, often ends up with a refund of £2,000 to £3,500. The market average across registered subcontractors is around £2,000, though the actual figure depends on your earnings and expenses. We can give you a realistic estimate at the first call.",
      },
      {
        question: "Can I claim for years before the current tax year?",
        answer: "Yes. HMRC allows you to claim back over-deductions for up to four prior tax years. For many Nottingham subbies working on schemes like the Island Quarter or Trent Basin, that means potentially combining several years of claims in a single Self Assessment submission.",
      },
      {
        question: "The contractor on my last job deducted 30% instead of 20%. Is that right?",
        answer: "Only if you are not registered with CIS. Unregistered subcontractors are deducted at 30%; registered subcontractors at 20%. Registering with HMRC as a CIS subcontractor immediately drops your deduction rate to 20% and is one of the simplest steps to protect your take-home pay. We can help you register and then reclaim any excess deducted in earlier years.",
      },
      {
        question: "Do I need to file a Self Assessment return even though tax is already being deducted?",
        answer: "Yes. CIS deductions are advance payments towards your tax bill, not a final settlement. You still need to file a Self Assessment return so that HMRC can calculate the correct amount, apply your personal allowance of £12,570 and account for your allowable expenses. That is also how your refund is generated.",
      },
      {
        question: "What is the April 2026 GPS anti-fraud change and does it affect me as a subcontractor in Nottingham?",
        answer: "From 6 April 2026, Finance Act 2026 made it easier for HMRC to revoke Gross Payment Status immediately, without notice, where a contractor knew or should have known about fraud in the supply chain. If you hold GPS, your contractor is now required to re-verify your status, run a Companies House check and confirm bank account details before each payment. As a registered subcontractor without GPS, the change does not affect your 20% deduction rate directly, but it is worth knowing because contractors may ask for additional documentation.",
      },
    ],

    nearbyAreas: [
      "Beeston",
      "Arnold",
      "Hucknall",
      "West Bridgford",
      "Mansfield",
      "Derby",
      "Long Eaton",
      "Ilkeston",
    ],
  },

  // ─── LEICESTER ───────────────────────────────────────────────────────────────
  {
    slug: "leicester",
    name: "Leicester",
    region: "East Midlands",
    population: "370,000",
    geo: { lat: 52.6369, lng: -1.1398 },

    intro: `<p>Leicester has a busy and diversified construction market, driven by large-scale waterside regeneration, university campus investment and a rolling pipeline of residential and commercial schemes across the city. For CIS subcontractors working on those sites, 20% of every labour payment disappears before it reaches your account, taken as an advance towards a tax bill that will almost certainly be lower than the deductions taken once your expenses and personal allowance are applied.</p>
<p>Consider a Leicester electrician with £42,000 gross CIS income in 2025/26. At the registered 20% rate, the contractor withholds £8,400. After genuine business expenses including van mileage at 55p per mile, tools and equipment, the taxable profit comes down to around £32,000. The income tax and Class 4 NIC bill on that figure is approximately £5,400, leaving a refund of around £3,000. That figure can climb further once up to four prior tax years are added: a subcontractor who has been in CIS since 2022 without ever filing a Self Assessment return may be looking at a combined four-year recovery of over £10,000.</p>
<p>Trade Tax Specialists works remotely with CIS subcontractors throughout Leicester and Leicestershire. No office visit is needed: we handle registrations, Self Assessment filings and refund claims entirely online and by phone.</p>`,

    contractorScene: `<p>Leicester's construction pipeline in 2025 and 2026 is anchored by several well-funded public-sector and private schemes that have kept the city's trade workforce in consistent demand. The Leicester railway station upgrade, backed by close to £18 million of levelling-up funding, will relocate the main entrance from London Road to Station Street, create a public plaza with rainwater gardens, and carry out structural, M&amp;E and public realm works to Network Rail standards. After an initial tender process produced only one bid and had to be relaunched in May 2025, the contract is under active procurement. Once awarded, the scheme will employ groundworkers, structural joiners, M&amp;E trades and civils teams across a multi-year delivery programme.</p>
<p>The Waterside regeneration area, a 150-acre former industrial corridor running along the River Soar, is the largest long-term driver of construction work in the city. Keepmoat Homes has delivered phases of residential development there in partnership with Leicester City Council, and further phases of housing and commercial development are planned across the site. The adjacent Pioneer Park enterprise zone continues to attract space-technology and advanced-manufacturing occupiers, generating fit-out and civils work that flows through to local subcontractors.</p>
<p>University campus investment adds further volume: the University of Leicester has been progressing significant estate works including demolition and rebuild of engineering and science facilities. Morgan Sindall completed a major £50 million mixed-use regeneration scheme at Great Central Square, and the firm has an established presence in the city, providing a reliable route for locally based subcontractors to access commercial fit-out packages.</p>
<p>The M1 and M69 corridors mean Leicester subbies regularly work across the East Midlands, from Coventry and Hinckley in the south-west to Loughborough and Nottingham further north. Many trades operate across multiple contractor relationships simultaneously, which is a classic scenario for CIS over-deduction.</p>`,

    majorProjects: [
      {
        name: "Leicester Railway Station Upgrade",
        detail: "A near-£18 million levelling-up funded scheme to relocate the main entrance, create a public plaza, and carry out structural and M&amp;E works to Network Rail standards; retendered in May 2025 after the initial procurement produced a single bid.",
      },
      {
        name: "Leicester Waterside Regeneration",
        detail: "A 150-acre former industrial corridor along the River Soar, with Keepmoat Homes delivering phases of residential development in partnership with Leicester City Council and further commercial phases planned.",
      },
      {
        name: "Pioneer Park Enterprise Zone",
        detail: "A Leicester City Council-backed scheme targeting space-technology and advanced-manufacturing occupiers, generating ongoing civils, fit-out and M&amp;E packages for local subcontractors through 2025 and 2026.",
      },
      {
        name: "University of Leicester Campus Redevelopment",
        detail: "Major estate investment including demolition of existing engineering buildings and construction of new academic facilities, with significant groundworks, structural and M&amp;E activity across the campus.",
      },
    ],

    tradeMix: [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "bricklayers",
      "plasterers",
      "scaffolders",
      "gas-engineers",
      "roofers",
      "painters-decorators",
    ],

    localFaqs: [
      {
        question: "I am a Leicester-based subcontractor. Do I need to visit Trade Tax Specialists in person?",
        answer: "No. We are a remote service covering all of the UK. Leicester and Leicestershire subcontractors can complete everything by email and phone. We will need your CIS deduction statements, a note of your business expenses and basic details about your trade.",
      },
      {
        question: "What is the typical CIS refund for a subcontractor working in Leicester?",
        answer: "It depends on your earnings and expenses, but the market average for registered subcontractors is around £2,000 (illustrative, not guaranteed). An electrician earning £42,000 gross in 2025/26, after allowable expenses, might expect a refund in the region of £2,500 to £3,500. The only way to know your figure is to run the numbers through a Self Assessment return, which we do for you.",
      },
      {
        question: "Can I claim CIS refunds for previous years?",
        answer: "Yes, HMRC allows claims for up to four prior tax years. If you have been working in CIS since 2021/22 and have not filed Self Assessment returns, there may be several years of over-deductions recoverable in one claim. We review all available years when we take on a new client.",
      },
      {
        question: "I work for several contractors at once. Does that complicate my CIS claim?",
        answer: "Not at all. Your deduction statements from every contractor are totalled on your Self Assessment return. Working for multiple contractors is very common among Leicester trades and makes no material difference to how the refund is calculated.",
      },
      {
        question: "My MTD for Income Tax notice says I need to comply from April 2026. Does my CIS income count?",
        answer: "Yes. The MTD threshold is tested on your gross CIS income, not the net amount you receive after 20% is deducted. If your gross invoicing exceeds £50,000, you are in scope from April 2026. A subcontractor receiving £42,000 net after 20% deductions actually has gross income of around £52,500, which puts them above the threshold. We can set you up on compatible software and handle the quarterly submissions.",
      },
    ],

    nearbyAreas: [
      "Loughborough",
      "Hinckley",
      "Wigston",
      "Oadby",
      "Coalville",
      "Melton Mowbray",
      "Market Harborough",
    ],
  },

  // ─── CARDIFF ─────────────────────────────────────────────────────────────────
  {
    slug: "cardiff",
    name: "Cardiff",
    region: "Wales",
    population: "370,000",
    geo: { lat: 51.4816, lng: -3.1791 },

    intro: `<p>Cardiff is in the middle of the most ambitious construction phase in its recent history, with projects worth well over £500 million under way or mobilising across Cardiff Bay, the city centre and the Central Quay corridor. CIS applies across Wales in exactly the same way as in England: contractors deduct 20% from the labour element of a subcontractor's payment and pass it directly to HMRC, before a single expense or allowance is considered.</p>
<p>Take a Cardiff groundworker with £40,000 gross CIS earnings in 2025/26. At the 20% registered rate, £8,000 is withheld. After allowable expenses including van mileage at the current AMAP rate of 55p per mile (from 6 April 2026), tools, PPE and materials separately invoiced, the taxable profit might be £28,000. The actual income tax and Class 4 NIC on that figure is roughly £4,500, producing a refund of approximately £3,500. Four prior years can be added to that calculation where returns have not previously been filed.</p>
<p>We serve CIS subcontractors and sole-trader builders across Cardiff and South Wales entirely by remote. No office visit needed: send us your deduction statements and we do the rest.</p>`,

    contractorScene: `<p>Cardiff's construction market is benefiting from a concentration of large committed schemes that are generating sustained demand across most trade categories. The most prominent is the new YTL Arena Cardiff at Atlantic Wharf, a 16,500-capacity indoor venue with an associated Travelodge hotel. Construction began in September 2025 on the £300 million scheme and is expected to deliver in 2028. The arena involves extensive groundworks, RC frame, cladding and M&amp;E packages across a multi-year build, pulling in trades from across South Wales and beyond.</p>
<p>Immediately adjacent, the Central Quay mixed-use development by Rightacres is one of the largest private-sector regeneration schemes in Wales. The 2.5 million sq ft masterplan runs south from Cardiff Central station along the former SA Brain brewery site, preserving the iconic chimney stack and historic Brewhouse while wrapping around them with residential towers, offices, leisure and retail. Residential buildings are already under construction with facades advancing through 2025. Cardiff Council's cabinet approved the purchase of five Central Quay sites from Rightacres in early 2026 to deliver up to 730 affordable homes, adding a further tranche of civils and residential-fit-out packages to the programme.</p>
<p>The Cardiff and Vale College Advanced Technology Centre, valued at approximately £65 million, represents substantial educational construction in the Bay area. Main contractors active across Cardiff's pipeline include Kier, Wates, Bowmer and Kirkland and Morgan Sindall. The A4232 link road corridor, the M4 junction at Leckwith and the Bay area access routes mean that trades regularly commute from Newport, Barry and the Valleys, with supply chain geography spanning the entire Cardiff Capital Region.</p>
<p>Residential new build in suburbs such as St Mellons, Pontprennau and Lisvane adds a separate volume of bricklayer, plasterer and groundworker work outside the headline Bay schemes, keeping sole-trader CIS subcontractors continuously occupied throughout 2025 and 2026.</p>`,

    majorProjects: [
      {
        name: "YTL Arena Cardiff, Atlantic Wharf",
        detail: "A £300 million, 16,500-capacity indoor arena with associated hotel; construction began in September 2025 and is scheduled to open in 2028, generating major groundworks, RC frame and M&amp;E packages.",
      },
      {
        name: "Central Quay Regeneration (Rightacres)",
        detail: "A 2.5 million sq ft mixed-use scheme on the former SA Brain brewery site, with residential towers under construction in 2025/2026 and Cardiff Council purchasing five plots for up to 730 affordable homes.",
      },
      {
        name: "Cardiff and Vale College Advanced Technology Centre",
        detail: "A circa £65 million educational construction scheme in Cardiff Bay, contributing significant structural, M&amp;E and fit-out packages to the local supply chain.",
      },
      {
        name: "Channel View Regeneration Phase 1",
        detail: "An £80 million residential-led regeneration of the Channel View estate delivering new homes, public realm and infrastructure as part of Cardiff's wider housing investment programme.",
      },
    ],

    tradeMix: [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "scaffolders",
      "plasterers",
      "joiners",
      "roofers",
      "civil-engineers",
      "painters-decorators",
    ],

    localFaqs: [
      {
        question: "Does CIS apply the same way in Wales as in England?",
        answer: "Yes. The Construction Industry Scheme is a UK-wide scheme administered by HMRC and operates identically in Wales. Welsh rates of income tax currently match the English rates, so the CIS deduction rates (0% GPS, 20% registered, 30% unregistered) and refund mechanics are the same.",
      },
      {
        question: "I am a Cardiff subcontractor. Do I need a local accountant or can Trade Tax Specialists help me remotely?",
        answer: "We are a fully remote UK-wide service. Cardiff and South Wales subcontractors deal with us entirely by email and phone. We do not need you to visit any office: your CIS deduction statements and expense records are all that is required.",
      },
      {
        question: "How much could I get back as a CIS subcontractor in Cardiff?",
        answer: "The market average for registered subcontractors is around £2,000 per year (illustrative, not guaranteed). On earnings of £40,000 gross, after typical business expenses, a Cardiff groundworker might see a refund of £3,000 to £3,500. The exact figure depends on your specific income and costs, which we calculate precisely through your Self Assessment return.",
      },
      {
        question: "Can I claim CIS refunds going back several years?",
        answer: "Yes. You can claim for up to four prior tax years. Many Cardiff subcontractors working on ongoing schemes such as Central Quay have been paying CIS deductions for several years without filing Self Assessment returns, and a multi-year claim can represent a significant lump sum.",
      },
      {
        question: "I sometimes work for both a main contractor and a direct client. How does that affect my CIS position?",
        answer: "Payments from a CIS-registered contractor attract the deduction; payments from a non-contractor private client (for example an end-user homeowner) do not. You declare all income on your Self Assessment return. We split the income correctly and make sure only the CIS deductions actually suffered are set against your bill.",
      },
    ],

    nearbyAreas: [
      "Newport",
      "Barry",
      "Penarth",
      "Caerphilly",
      "Pontypridd",
      "Bridgend",
      "Cwmbran",
    ],
  },

  // ─── BELFAST ─────────────────────────────────────────────────────────────────
  {
    slug: "belfast",
    name: "Belfast",
    region: "Northern Ireland",
    population: "340,000",
    geo: { lat: 54.5973, lng: -5.9301 },

    intro: `<p>Belfast is in the middle of its largest construction boom in a generation, with a £5 billion city-region pipeline and landmark schemes at Titanic Quarter, the harbour estate and Casement Park all advancing simultaneously. CIS applies fully in Northern Ireland: contractors are required to deduct 20% from the labour element of a registered subcontractor's payment and remit it to HMRC, before any expenses, personal allowance or Class 4 NIC relief is taken into account.</p>
<p>Consider a Belfast plasterer earning £36,000 gross from CIS contracts in 2025/26. The contractor withholds £7,200 at the 20% registered rate. After allowable expenses including van mileage at 55p per mile (AMAP rate from 6 April 2026), tools, protective equipment and any materials separately invoiced, taxable profit might fall to around £25,000. The income tax and Class 4 NIC on that figure comes to roughly £3,600, producing a refund of approximately £3,600. Four prior tax years can be combined if Self Assessment returns have not previously been filed.</p>
<p>Trade Tax Specialists works remotely with CIS subcontractors across Belfast and Northern Ireland. There is no need to visit an office and no geographic restriction on who we can help.</p>`,

    contractorScene: `<p>Belfast's construction market is driven by a convergence of large-scale regeneration, housing investment and infrastructure that is creating exceptional demand for trade labour. At Titanic Quarter, the Loft Lines scheme, a 778-apartment development backed by a £150 million Legal and General investment and brought forward by Watkin Jones and Lacuna Developments, was approaching practical completion in spring 2026. The project represents the largest single private-sector housing investment in Northern Ireland's history and employed trades across groundworks, structural frame, cladding, M&amp;E and internal fit-out throughout 2024 and 2025.</p>
<p>Belfast Harbour has published a 2025 to 2050 masterplan that commits to major new capital works including the city's first land reclamation project in 25 years, creating a new freight terminal at West Bank Road, alongside redevelopment of Stormont Wharf and a berth extension to the container terminal. These harbour infrastructure works, valued at over £1.3 billion across the plan period, provide a long-horizon pipeline for civils, groundwork and marine-adjacent construction trades.</p>
<p>Casement Park, the long-planned GAA stadium redevelopment in west Belfast, moved into a pre-enabling and site investigation phase in January 2026 following confirmation of a combined £90 million-plus funding package from the UK and Irish governments. Demolition of the existing main stand is under way, with the main construction contract expected to follow once enabling works are complete. At an estimated current cost well above £260 million, the scheme will be one of the largest single sports construction projects in Northern Ireland's history.</p>
<p>Main contractors active across Belfast include BAM, Graham Construction and McAleer and Rushe, with the supply chain drawing from across the greater Belfast area. Residential schemes in the Titanic Quarter, North Belfast and Outer East Belfast ring routes contribute consistent volume for bricklayers, plasterers and groundworkers alongside the headline commercial programmes.</p>`,

    majorProjects: [
      {
        name: "Loft Lines, Titanic Quarter",
        detail: "A 778-apartment scheme backed by £150 million of Legal and General investment, developed by Watkin Jones and Lacuna Developments; the first phase opened in spring 2026, marking the largest private housing investment in Northern Ireland history.",
      },
      {
        name: "Belfast Harbour Masterplan: Horizons of Opportunity",
        detail: "A 2025 to 2050 infrastructure programme covering the city's first land reclamation in 25 years, Stormont Wharf redevelopment and a container terminal berth extension, representing over £1.3 billion of committed capital works.",
      },
      {
        name: "Casement Park Stadium Redevelopment",
        detail: "A GAA stadium rebuild in west Belfast with estimated costs above £260 million; pre-enabling and demolition works began in January 2026 following a combined UK and Irish government funding package of over £90 million.",
      },
      {
        name: "Hamilton Dock Hotel, Titanic Quarter",
        detail: "A 228-bedroom hotel within the Titanic Quarter estate, which began construction in December 2023 and is targeting completion in 2026, employing structural, M&amp;E and fit-out trades.",
      },
    ],

    tradeMix: [
      "bricklayers",
      "plasterers",
      "groundworkers",
      "electricians",
      "plumbers",
      "joiners",
      "scaffolders",
      "roofers",
      "civil-engineers",
      "painters-decorators",
    ],

    localFaqs: [
      {
        question: "Does CIS apply in Northern Ireland?",
        answer: "Yes. The Construction Industry Scheme covers the whole of the United Kingdom, including Northern Ireland. Contractors in Belfast must deduct from subcontractor payments and file monthly CIS300 returns to HMRC in the same way as contractors in England, Scotland or Wales.",
      },
      {
        question: "I work on sites in Belfast. Can Trade Tax Specialists handle my CIS return?",
        answer: "Yes. We are a fully remote UK-wide service. Northern Ireland subcontractors are covered in exactly the same way as those on the mainland. We handle CIS registrations, Self Assessment returns and refund claims for Belfast and Northern Ireland trades by email and phone, with no office visit required.",
      },
      {
        question: "How much could I claim back as a Belfast subcontractor?",
        answer: "The market average for registered CIS subcontractors is around £2,000 per year (illustrative, not guaranteed). A Belfast plasterer earning £36,000 gross might recover £3,000 to £3,600 once van mileage at 55p per mile, tools and other expenses are taken into account. The precise figure comes from your Self Assessment return, which we prepare for you.",
      },
      {
        question: "Can I claim for years when I did not file a return?",
        answer: "Yes. HMRC allows claims for up to four prior tax years. If you have been working on Belfast sites such as Titanic Quarter or Casement Park for several years without filing returns, we can review all open years and submit claims for each one in a single engagement.",
      },
      {
        question: "I am registered at 20% but my contractor recently mentioned the new GPS rules. Should I be worried?",
        answer: "The GPS anti-fraud changes introduced by Finance Act 2026 from 6 April 2026 primarily affect subcontractors who hold, or are seeking, Gross Payment Status. If you are deducted at 20% as a standard registered subcontractor, the new rules do not change your deduction rate. They do require your contractor to re-verify your CIS status, run a Companies House check and confirm your bank account name before each payment, so you may receive more verification requests than previously.",
      },
    ],

    nearbyAreas: [
      "Lisburn",
      "Newtownabbey",
      "Bangor",
      "Carrickfergus",
      "Antrim",
      "Holywood",
      "Dunmurry",
    ],
  },

  // ─── SOUTHAMPTON ─────────────────────────────────────────────────────────────
  {
    slug: "southampton",
    name: "Southampton",
    region: "Hampshire",
    population: "270,000",
    geo: { lat: 50.9097, lng: -1.4044 },

    intro: `<p>Southampton is undergoing its most significant city-centre transformation in decades, with the £132 million Bargate Quarter scheme in construction, a £230 million Town Quay waterfront approval granted in early 2025, and a long-term city renaissance masterplan identifying capacity for 15,000 new homes and over 2 million sq m of commercial floorspace. CIS subcontractors working on these sites face the standard deduction reality: 20% taken from the labour element of every payment before the money reaches their account.</p>
<p>Take a Southampton bricklayer with £37,000 gross CIS earnings in 2025/26. At the 20% registered rate, the contractor withholds £7,400, leaving £29,600 in the bank. After allowable expenses including van mileage at 55p per mile (AMAP rate from 6 April 2026), tools and PPE, taxable profit might come down to around £26,000. The income tax and Class 4 NIC on that figure is roughly £4,100, generating a refund of approximately £3,300. Four prior tax years can be reviewed for anyone who has not previously filed a Self Assessment return.</p>
<p>Trade Tax Specialists works remotely with subcontractors and sole-trader builders across Southampton and Hampshire. No office visit is needed, and there is no geographic limit on who we can take on.</p>`,

    contractorScene: `<p>Southampton's construction pipeline has two distinct layers in 2025 and 2026: an active city-centre build programme and a larger strategic pipeline coming through planning. At the Bargate Quarter, Midgard Ltd is the principal contractor delivering a £132 million mixed-use scheme on the former 1980s shopping centre site, comprising 519 homes and 2,500 sq m of commercial space. Work resumed following the administration of the previous contractor and is tracking towards handover in late 2026. This multi-trade residential programme has drawn on groundworkers, bricklayers, scaffolders, electricians and fit-out teams throughout its build phase.</p>
<p>At the waterfront, a £230 million scheme at Town Quay received planning approval in March 2025. Developed by Nicolas James Group, the proposal covers three 25-storey residential towers, a nine-storey hotel and serviced apartment building with spa, a 300-berth marina, and ground-floor retail and leisure. Contractor mobilisation is expected to follow approval, and when construction begins the scheme will represent one of the largest waterfront civils and high-rise residential programmes on the south coast.</p>
<p>Morgan Sindall holds a significant delivery position in Southampton, carrying out the Southampton Outdoor Sports Centre upgrade (commenced spring 2025, targeting completion 2026) and leading the heritage refurbishment of Southampton City Art Gallery, supported by a £2.23 million MEND Fund grant. Both schemes demonstrate the breadth of work type available to local trades, from civils and groundworks on the sports centre to specialist joinery and conservation work on the listed gallery building.</p>
<p>The wider Hampshire supply chain means Southampton subbies regularly work across Eastleigh, Fareham, Gosport and the M27 corridor. Port operations and related industrial development at Eastern Docks add civils and structural steel packages to the market alongside the headline residential programmes.</p>`,

    majorProjects: [
      {
        name: "Bargate Quarter",
        detail: "A £132 million mixed-use scheme by Midgard Ltd for Legal and General, delivering 519 homes and commercial space on the former Bargate shopping centre site, with construction active through to late 2026.",
      },
      {
        name: "Town Quay Waterfront Redevelopment",
        detail: "A £230 million scheme by Nicolas James Group, approved by Southampton City Council in March 2025, comprising three 25-storey residential towers, a hotel and serviced apartments, and a 300-berth marina.",
      },
      {
        name: "Southampton Outdoor Sports Centre Upgrade",
        detail: "A Morgan Sindall scheme for Southampton City Council, commenced spring 2025 and targeting completion in 2026, delivering a new community hub building and covered court facilities.",
      },
      {
        name: "Southampton City Art Gallery Refurbishment",
        detail: "A heritage refurbishment led by Morgan Sindall, supported by a £2.23 million MEND Fund grant from the Department for Culture, Media and Sport, with the main and East Wing galleries targeting reopening in early 2026.",
      },
    ],

    tradeMix: [
      "bricklayers",
      "electricians",
      "groundworkers",
      "scaffolders",
      "plumbers",
      "joiners",
      "plasterers",
      "painters-decorators",
      "roofers",
      "civil-engineers",
    ],

    localFaqs: [
      {
        question: "I work on Southampton sites but live in Hampshire. Does Trade Tax Specialists cover me?",
        answer: "Yes. We are a remote UK-wide service. Whether you are based in Southampton, Eastleigh, Fareham or anywhere else in Hampshire, we handle your CIS registration, Self Assessment return and refund claim by email and phone, with no office visit needed.",
      },
      {
        question: "How much could a Southampton subcontractor typically get back from HMRC?",
        answer: "The market average for registered subcontractors is around £2,000 per year (illustrative, not guaranteed). A Southampton bricklayer on around £37,000 gross might see a refund of £3,000 to £3,500 once expenses such as van mileage at 55p per mile, tools and PPE are correctly claimed. We calculate the precise figure through your Self Assessment return.",
      },
      {
        question: "Can I claim for years I did not file a return?",
        answer: "Yes. HMRC allows claims for up to four prior tax years. Many Southampton subcontractors who have been working on projects like the Bargate Quarter for several years have not filed Self Assessment returns and may have meaningful sums sitting with HMRC. We review all available years as standard.",
      },
      {
        question: "I work for a main contractor and also take occasional direct jobs from householders. Do both count as CIS income?",
        answer: "No. CIS deductions only apply to payments made by CIS-registered contractors. A private householder commissioning a direct job is not within the scheme and does not deduct. You still declare all income on your Self Assessment return, but only the deductions actually suffered through CIS count as advance payments towards your bill.",
      },
      {
        question: "My contractor asked me for Companies House and bank account details recently. Is that new?",
        answer: "Yes. From 6 April 2026, Finance Act 2026 requires contractors to carry out three due-diligence checks before each payment to protect their Gross Payment Status: re-verifying CIS status with HMRC, checking Companies House for the subcontractor, and confirming bank account name. This is new from April 2026 and is why you may be seeing more verification requests from contractors on Southampton sites.",
      },
      {
        question: "What is the nil return obligation contractors keep mentioning?",
        answer: "From 6 April 2026, contractors must file a CIS300 nil return for any tax month in which they made no payments to subcontractors. This obligation was removed in 2015 and has been reinstated. As a subcontractor it does not directly affect your obligations, but it may affect how your contractor manages their monthly returns and whether they ask you for CIS paperwork even in quieter months.",
      },
    ],

    nearbyAreas: [
      "Eastleigh",
      "Fareham",
      "Totton",
      "Hedge End",
      "Winchester",
      "Gosport",
      "Romsey",
      "Chandler's Ford",
    ],
  },
];
