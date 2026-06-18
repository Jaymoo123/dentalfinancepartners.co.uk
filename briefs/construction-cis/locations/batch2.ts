// Trade Tax Specialists — location page data, batch 2
// Cities: glasgow, edinburgh, sheffield, liverpool, newcastle
// Written 2026-06-12. No imports. Drop into CITIES record in data.ts.
// Scottish cities (glasgow, edinburgh): refund hooks use 20% labour-only deduction base,
// not rUK income-tax bands. Scottish Income Tax rates apply to the final SA calculation.
// All figures: HP-locked 2026/27 (house_positions.md). No em/en-dashes.
// Paste each object into the CITIES Record in data.ts under its slug key.

const batch2Cities = [
  {
    slug: "glasgow",
    name: "Glasgow",
    region: "Greater Glasgow",
    population: "635,000",
    geo: { lat: 55.8642, lng: -4.2518 },
    intro: `<p>Glasgow's construction sector is in the middle of its biggest transformation in a generation, with the £1 billion Glasgow City Region City Deal funding major public realm and infrastructure works across the city centre while large-scale residential schemes reshape the Clyde waterfront. For CIS-registered subcontractors working on these projects, deductions of 20% are taken from the labour element of every payment before the money reaches your account, which means most subcontractors accumulate a refund entitlement across the tax year.</p>
<p>A Glasgow plasterer earning £38,000 gross from a contractor, with £400 in materials excluded from the deduction base, might have £7,520 deducted under CIS over the year. After claiming allowable expenses (tools, PPE, mileage at 55p per mile from 6 April 2026, use-of-home costs), the actual tax owed is typically far less than the amount deducted, generating a refund that averaged around £2,000 across Trade Tax Specialists' client base. We handle the Self Assessment return and the full reclaim process, from the first year through to the four prior years still open for recovery.</p>
<p>Note for Glasgow-based subcontractors: the CIS scheme operates identically across the whole of the UK, so your deduction rate, registration process and refund mechanics are the same as anywhere in England or Wales. However, because Scotland has its own Income Tax rate structure, the amount of tax you actually owe on your self-employed profits is calculated using Scottish Income Tax rates when HMRC processes your Self Assessment return. Your accountant must use the correct Scottish bands to compute the final liability, which affects the size of your refund.</p>`,
    contractorScene: `<p>Glasgow's construction labour market operates across three distinct corridors in 2025 and 2026. The city centre Avenues programme, funded through the City Deal, has Rainton Construction on site at George Square (£20.5m contract, on site from May 2025, completing August 2026) alongside concurrent streetscape works on Cowcaddens Road, Duke Street, North Hanover Street and South Portland Street. These civils-heavy schemes draw heavily on groundworkers, civil engineers, bricklayers and landscaping operatives, many working as CIS-registered sole traders through the Avenues supply chain.</p>
<p>On the Clyde waterfront, Peel Waters' Glasgow Waters regeneration at Yorkhill Quay appointed Advance Construction Scotland in March 2026 on a £3.75m infrastructure contract (roads, utilities, public realm) due to complete December 2026, unlocking land for over 1,100 new homes. Further along the waterfront, GRAHAM Construction holds the Clyde Waterfront and Renfrew Riverside civils contract for Renfrewshire Council, with all sub-contract packages over £10,000 publicly advertised, making it an accessible pipeline for registered subcontractors in groundworks, scaffolding, temporary electrics and drainage.</p>
<p>The residential pipeline adds a third layer of demand. The Shawlands regeneration Phase 1 (329 apartments, £150m) and the Lancefield Quay area continue to draw joiners, plasterers, dryliners and painters-decorators. The Barbour ABI top-30 list for Glasgow in 2026 includes further student accommodation and build-to-rent schemes that sustain steady year-round demand for fit-out trades. In-demand trades across the city include groundworkers and civil engineers on the public-realm corridor, followed by joiners, dryliners and plasterers on the residential fit-out pipeline. Scaffolders are consistently busy across all project types.</p>`,
    majorProjects: [
      {
        name: "George Square Transformation (Rainton Construction)",
        detail: "Rainton Construction is delivering the £20.5m George Square revamp under the Glasgow City Deal Avenues programme, with works on site from May 2025 and the square scheduled to reopen in August 2026.",
      },
      {
        name: "Yorkhill Quay Infrastructure, Glasgow Waters (Advance Construction Scotland)",
        detail: "Advance Construction Scotland began a £3.75m roads, utilities and public realm infrastructure contract at Yorkhill Quay in March 2026, completing December 2026, to unlock over 1,100 homes on the Clyde waterfront.",
      },
      {
        name: "Clyde Waterfront and Renfrew Riverside (GRAHAM Construction)",
        detail: "GRAHAM holds the civils contract for the Clyde Waterfront and Renfrew Riverside project, with all sub-contract packages over £10,000 publicly advertised, creating an active supply-chain pipeline for Scottish subcontractors.",
      },
      {
        name: "Shawlands Regeneration Phase 1 (329 apartments)",
        detail: "The £150m Shawlands mixed-use scheme, ranked first in Barbour ABI's top-30 Glasgow projects for 2026, is driving sustained demand for fit-out trades across joinery, plastering and decorating.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "scaffolders",
      "joiners",
      "plasterers",
      "dryliners",
      "painters-decorators",
      "electricians",
      "plumbers",
      "bricklayers",
    ],
    localFaqs: [
      {
        question: "Do Scottish Income Tax rates affect my CIS refund in Glasgow?",
        answer: "Yes, but only at the Self Assessment stage. The CIS deduction rate itself (20% on your labour payments, or 30% if unregistered) is the same across the whole UK. The difference is that when HMRC calculates how much tax you actually owe, it applies Scottish Income Tax rates to your self-employed profits rather than the rUK rates. This can change the size of your refund compared with a subcontractor doing identical work in England. We file the correct Scottish Self Assessment return so you receive the right refund.",
      },
      {
        question: "Can I claim a CIS refund even if I worked on multiple Glasgow sites?",
        answer: "Yes. CIS deductions from every contractor you worked for during the tax year are pooled on your Self Assessment return. We gather the payment and deduction statements from each contractor, total the deductions, offset your allowable expenses, and calculate the net refund due. Working across several Glasgow City Deal sites or the Clyde waterfront simultaneously is common and makes no difference to the reclaim process.",
      },
      {
        question: "How much could a Glasgow subcontractor typically get back?",
        answer: "The average CIS refund we see is around £2,000, though the actual figure depends on your gross income, the labour-versus-materials split on your invoices, and the expenses you can legitimately claim (tools, PPE, mileage at 55p per mile from April 2026, use of home). We can look back up to four prior tax years if you have not claimed before.",
      },
      {
        question: "Do I need to be based in Glasgow for you to handle my CIS return?",
        answer: "No. Trade Tax Specialists operates UK-wide. We work with subcontractors in Glasgow and across Scotland entirely remotely, using secure document sharing for your payment and deduction statements. You do not need to visit any office.",
      },
      {
        question: "I am unregistered and have had 30% deducted. Can I still claim back?",
        answer: "Yes. Unregistered subcontractors pay 30% on the labour element instead of 20%, which typically means a larger refund once expenses and the personal allowance are applied at Self Assessment. We would also register you for CIS at the same time so future payments are deducted at 20%, saving you 10 percentage points on every labour invoice going forward.",
      },
    ],
    nearbyAreas: [
      "Paisley",
      "Motherwell",
      "Hamilton",
      "Clydebank",
      "Dumbarton",
      "Rutherglen",
      "Kirkintilloch",
    ],
  },

  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "City of Edinburgh",
    population: "530,000",
    geo: { lat: 55.9533, lng: -3.1883 },
    intro: `<p>Edinburgh's construction market is sustained by a combination of major public infrastructure projects, a £1.3 billion coastal regeneration programme at Granton Waterfront, and a continuous programme of refurbishment and restoration work on the city's historic built fabric. CIS applies to all construction work in Edinburgh in exactly the same way as anywhere else in the UK: contractors deduct 20% from the labour element of your payment (30% if you are not registered) before you receive it, with materials excluded from the deduction base.</p>
<p>A typical Edinburgh groundworker or joiner earning £40,000 gross over the tax year might have £8,000 deducted in CIS. After subtracting legitimate expenses such as travel at 55p per mile (the rate from 6 April 2026), tools, PPE and protective clothing, the amount of tax actually owed is usually significantly less than the amount deducted, producing a refund. Our clients typically recover around £2,000 on average, and we can look back four years if you have not filed before.</p>
<p>Edinburgh subcontractors should be aware that Scottish Income Tax rates apply to the self-employed profits on your Self Assessment return. The CIS deduction rate itself is UK-wide and unchanged, but the final tax liability (and therefore the refund) is calculated using Scottish Income Tax bands, not the rUK bands. Filing the correct Scottish return is essential to getting the right refund, and it is something we handle as standard for all Edinburgh clients.</p>`,
    contractorScene: `<p>Edinburgh's construction activity in 2025 and 2026 is shaped by three concurrent programmes. The most structurally significant is the Granton Waterfront regeneration: the £1.3 billion coastal town project received government funding approval in late 2025, with decontamination, groundwork and enabling works commencing in early 2026 under the City of Edinburgh Council's procurement programme. Phase one alone covers 847 net-zero-ready homes (387 affordable, delivered with Cruden Homes), a new primary school and commercial space, all generating demand for groundworkers, civil engineers, electricians, plumbers and joiners across North Edinburgh over multiple years.</p>
<p>Running in parallel is the North Bridge refurbishment, where Balfour Beatty is completing a structurally complex £86m overhaul of the Victorian arch bridge. This project has required specialist scaffolding trades, steelwork and corrosion-protection operatives working in confined historic access conditions since its original tender; completion is expected in 2026. The West Edinburgh Link active-travel infrastructure scheme (segregated cycleways, streetscape improvements) represents a further civils and public-realm pipeline on the western approach corridor, drawing groundworkers and surfacing operatives.</p>
<p>Edinburgh's residential and mixed-use pipeline adds depth to the fit-out trade market. The Leith Waterfront active-travel and public realm improvements (Phase 1A completed December 2025) continue to generate follow-on residential and commercial fit-out work in Leith. Across the city, the density of historic buildings means that joiners, plasterers and painters-decorators with experience in traditional or period properties are consistently in demand in Edinburgh's refurbishment sector. Scaffolders working on restoration projects face Edinburgh's specific topography: steep closes, elevated vantage points and restricted access in the Old Town create bespoke scaffolding requirements that sustain a distinct local demand for specialist scaffolding trades.</p>`,
    majorProjects: [
      {
        name: "Granton Waterfront Phase 1 (847 homes, Cruden Homes / City of Edinburgh Council)",
        detail: "The £1.3bn Granton Waterfront regeneration broke ground in early 2026, with phase one delivering 847 net-zero homes and a new primary school on Edinburgh's largest brownfield site, sustaining multi-year demand for groundworkers, civils and fit-out trades.",
      },
      {
        name: "North Bridge Refurbishment (Balfour Beatty)",
        detail: "Balfour Beatty is completing the £86m structural overhaul of Edinburgh's North Bridge, involving grit blasting, steelwork repairs and cast-iron facade restoration, with full completion expected in 2026.",
      },
      {
        name: "Silverlea Housing (143 net-zero homes)",
        detail: "A further 143 social and mid-market rent homes at Silverlea form part of the Granton programme and are due for completion in summer 2026, adding to the immediate fit-out pipeline in North Edinburgh.",
      },
      {
        name: "West Edinburgh Link Active Travel Infrastructure",
        detail: "This segregated cycleway and streetscape scheme on the western approach corridor was under construction through 2025 and into 2026, providing civils and surfacing work for groundworkers and civil engineers.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "joiners",
      "plasterers",
      "scaffolders",
      "electricians",
      "plumbers",
      "painters-decorators",
      "bricklayers",
      "roofers",
    ],
    localFaqs: [
      {
        question: "Does CIS work differently in Scotland compared with England?",
        answer: "The CIS scheme itself is identical throughout the UK. The same deduction rates (20% for registered subcontractors, 30% for unregistered, 0% for those with Gross Payment Status) apply in Edinburgh as they do in London or Manchester. The difference is at Self Assessment: HMRC uses Scottish Income Tax rates to work out how much tax you actually owe on your profits, which can alter the size of the refund. We file the correct Scottish SA return as standard for all Edinburgh clients.",
      },
      {
        question: "Can I claim for mileage travelling to Edinburgh construction sites?",
        answer: "Yes, if you use your own vehicle for business travel between your home and temporary workplaces (the vast majority of construction sites). The approved mileage rate from 6 April 2026 is 55p per mile for the first 10,000 business miles, up from 45p. Edinburgh's geography means many subcontractors travel from Fife, Midlothian, East Lothian or West Lothian, and this mileage accumulates quickly into a meaningful expense claim that reduces the tax you owe.",
      },
      {
        question: "How do I get my CIS payment and deduction statements from Edinburgh contractors?",
        answer: "Your contractor must issue a payment and deduction statement for every payment they make to you, showing the gross amount, any materials excluded, the amount subject to deduction, and the deduction taken. If they have not issued these, contact them directly. We can advise you on what to request and work with whatever records you have available.",
      },
      {
        question: "Do I need to be registered for Self Assessment to claim a CIS refund in Edinburgh?",
        answer: "Yes. CIS refunds for sole-trader subcontractors are processed through the Self Assessment tax return. If you are not yet registered for Self Assessment, we register you as part of our onboarding process. The refund for the last tax year is typically paid within 5 to 10 working days of HMRC processing the online return.",
      },
      {
        question: "Can I recover four years of CIS deductions if I have never filed in Edinburgh?",
        answer: "Yes. HMRC allows you to amend or file late Self Assessment returns for the four tax years immediately preceding the current one. If you have been working under CIS in Edinburgh for several years without filing, there may be a substantial combined refund available. We handle the full lookback as part of our service.",
      },
    ],
    nearbyAreas: [
      "Livingston",
      "Dunfermline",
      "Kirkcaldy",
      "Musselburgh",
      "Bathgate",
      "Dalkeith",
      "Linlithgow",
    ],
  },

  {
    slug: "sheffield",
    name: "Sheffield",
    region: "South Yorkshire",
    population: "584,000",
    geo: { lat: 53.3811, lng: -1.4701 },
    intro: `<p>Sheffield's construction sector has its roots in the steel and heavy engineering industries that shaped South Yorkshire, and in 2025 and 2026 those traditions are being channelled into a significant city-centre regeneration programme. The £300 million West Bar Quarter, the £15 million Castlegate riverside park and the wider Gleadless Valley housing programme are all generating sustained demand for trades across civil engineering, structural work, fit-out and groundworks. CIS-registered subcontractors on these projects have 20% deducted from the labour element of every payment before it reaches them, with the cost of materials they supply excluded from the calculation.</p>
<p>A Sheffield groundworker or electrician earning £36,000 gross in a tax year might have £7,200 deducted in CIS. After allowable expenses including mileage at 55p per mile from April 2026, tools, PPE and any use-of-home costs, the tax actually owed is typically a good deal lower, generating a refund. Our clients' average refund runs to around £2,000, and we can recover up to four years of overpaid deductions for tradespeople who have not filed before. We operate entirely remotely, so there is no need to visit an office in Sheffield or anywhere else.</p>`,
    contractorScene: `<p>Sheffield's construction market in 2025 and 2026 is anchored by three major programmes running simultaneously. The West Bar Quarter, a £300 million brownfield regeneration on Sheffield's Inner Ring Road, completed its Phase 1 build programme under principal contractor Bowmer and Kirkland in April 2025, delivering 100,000 sq ft of grade A office space and 368 build-to-rent apartments. Phase 2 planning and enabling works are progressing alongside the completed Phase 1, sustaining demand in the Kelham Island and West Bar corridor for groundworkers, civils operatives and fit-out trades into 2026 and beyond.</p>
<p>Across the city centre, the Castlegate Sheaf Field Park project is being delivered by Aureos (formerly Keltbray) under the YORcivil Major Works framework for Sheffield City Council. The £15 million scheme, with main works beginning in August 2024, uncovered a section of the River Sheaf for the first time in over 100 years and is due for completion in spring 2026. The project has required specialist groundworks, retaining-wall and geotechnical engineering, and represents the kind of complex civils contract that draws subcontractors from across South Yorkshire. Meanwhile, the Sheffield Gleadless Valley "Vision for the Valley" plan, published in late 2025, maps 12 major projects including around 1,100 new homes and four upgraded parks across the east of the city, providing a forward pipeline for groundworkers, builders and landscaping trades.</p>
<p>Sheffield's steel heritage persists in its construction supply chain: structural steelwork fabricators and erectors remain active across South Yorkshire, and the city's residential and commercial pipeline draws joiners, electricians and plumbers from a broad catchment taking in Rotherham, Barnsley and Doncaster. The leisure rebuild programme (three leisure centres at Springs, Concord and Hillsborough, £117m combined) is adding further public-sector civils and fit-out work from 2026 onwards.</p>`,
    majorProjects: [
      {
        name: "West Bar Quarter Phase 1 (Bowmer and Kirkland)",
        detail: "Bowmer and Kirkland completed the Phase 1 build programme of the £300m West Bar Quarter in April 2025, delivering a 100,000 sq ft grade A office block and 368 BTR apartments; Phase 2 enabling and planning work continues through 2026.",
      },
      {
        name: "Castlegate Sheaf Field Park (Aureos / YORcivil framework)",
        detail: "Aureos is delivering the £15m Castlegate project for Sheffield City Council, uncovering the River Sheaf for the first time since 1917 and creating a new public park; main works began August 2024 with completion due spring 2026.",
      },
      {
        name: "Fargate Event Central",
        detail: "Sheffield City Council received £15.8m of government funding for an Event Central on Fargate, with construction beginning summer 2025, bringing entertainment, co-working and cultural space to the pedestrianised city-centre corridor.",
      },
      {
        name: "Gleadless Valley Housing Programme (12 sub-projects)",
        detail: "The Vision for the Valley plan, published late 2025, sets out 12 major projects including approximately 1,100 new homes and four upgraded parks across east Sheffield, providing a multi-year forward pipeline for housebuilding trades.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "bricklayers",
      "joiners",
      "electricians",
      "plumbers",
      "plasterers",
      "painters-decorators",
      "scaffolders",
      "dryliners",
    ],
    localFaqs: [
      {
        question: "Can a Sheffield subcontractor claim a CIS refund if they also work in Rotherham or Barnsley?",
        answer: "Yes. CIS deductions from every contractor across South Yorkshire and beyond are consolidated on your Self Assessment return. There is no geographic limit: we total the deductions from all your contractors, apply your expenses, and calculate the refund. Many Sheffield-based subcontractors work across a wide radius including Rotherham, Barnsley, Doncaster and Chesterfield, and all those earnings and deductions go into the same return.",
      },
      {
        question: "How much could I realistically get back as a Sheffield CIS subcontractor?",
        answer: "The average refund across our client base is around £2,000, but the figure varies with your gross income, the share of labour versus materials in your invoices, and the expenses you can claim. A groundworker driving to multiple Sheffield sites daily may accumulate significant mileage at 55p per mile from April 2026, which reduces the taxable profit and increases the refund. We can estimate the figure once we see your payment and deduction statements.",
      },
      {
        question: "Do I need to register for CIS separately if I mainly work on Sheffield City Council contracts?",
        answer: "The CIS registration process is the same regardless of who the main contractor is. From April 2026, there is a new public sector exemption (Regulation 24ZA) that removes CIS from certain payments made directly to local authorities, but this applies to the local authority as the party receiving payment, not to subcontractors working on council-funded projects in the normal supply chain. As a subcontractor, your position is unchanged.",
      },
      {
        question: "I work in structural steelwork in Sheffield. Does CIS cover my labour?",
        answer: "Yes. Structural steelwork erection and installation is a specified CIS construction operation when it forms part of a building or structure. If you are a subcontractor erecting steel frames on a Sheffield construction site, your contractor should be deducting 20% from the labour element of your payments (not the materials). We can advise on whether any specific element of your work might fall outside the CIS definition.",
      },
      {
        question: "Can you handle my CIS return if I am based outside Sheffield but work there regularly?",
        answer: "Yes. Trade Tax Specialists operates UK-wide and entirely remotely. Where you are based does not matter: what matters is that you have been paid under CIS, had deductions made, and want to recover any overpaid tax through Self Assessment. We need your payment and deduction statements, which your contractors must provide.",
      },
    ],
    nearbyAreas: [
      "Rotherham",
      "Barnsley",
      "Doncaster",
      "Chesterfield",
      "Worksop",
      "Stocksbridge",
      "Chapeltown",
    ],
  },

  {
    slug: "liverpool",
    name: "Liverpool",
    region: "Merseyside",
    population: "498,000",
    geo: { lat: 53.4084, lng: -2.9916 },
    intro: `<p>Liverpool is entering one of the most active construction periods in its recent history. The Central Docks infrastructure programme, the King Edward Triangle waterfront scheme and the approved £100 million Baltic Station rail project are drawing Tier 1 contractors and a broad supply chain of CIS-registered subcontractors to the city. For tradespeople on these projects, the CIS deduction rules are straightforward: 20% is taken from the labour element of your payment (30% if you are unregistered), with the cost of materials you supply separately excluded from the calculation.</p>
<p>A Liverpool electrician or plumber earning £34,000 gross over the tax year might have £6,800 deducted in CIS. After claiming allowable expenses including mileage at 55p per mile from April 2026, tools, PPE, specialist equipment and any protective clothing, the tax actually owed is typically significantly less than the amount deducted, leaving a refund due through Self Assessment. Our clients across Merseyside typically recover around £2,000 on average, and we can look back up to four prior tax years if you have not claimed before.</p>`,
    contractorScene: `<p>Liverpool's construction market is structured around its waterfront regeneration corridor, which is generating the most significant volume of civils and infrastructure work in 2025 and 2026. GRAHAM Construction holds a £71 million civils contract at Liverpool Waters' Central Docks, designing and constructing roads, underground utilities and 2.1 hectares of public realm (Central Park) to unlock land for approximately 2,350 new homes. The contract was awarded through the Pagabo Civil Engineering and Infrastructure Framework in September 2025, with a spring 2028 target for completion. This project alone sustains a substantial supply chain of groundworkers, civil engineers and drainage operatives in the northern waterfront corridor.</p>
<p>Further north on the waterfront, the £1 billion King Edward Triangle scheme, promoted by KEIE (part of the TJ Morris group) with Beetham, is advancing detailed planning applications in 2026 for close to 3,000 homes and a five-star hotel in a cluster of high-rise buildings on the northern docks. This scale of residential high-rise development draws specialist formwork, steelwork, drainage and M and E subcontractors at the enabling and structural phases. Morgan Sindall Group has four active Liverpool projects valued at £78 million in the 2026 Barbour ABI pipeline, with Bellway Homes delivering a further £65 million residential scheme.</p>
<p>Outside the waterfront, the Bootle Strand town centre regeneration in Sefton is advancing through preparation and structural work throughout 2026, and the broader Merseyside pipeline includes steady residential and commercial fit-out demand that draws joiners, dryliners, painters-decorators, electricians and plumbers from across Liverpool, Knowsley, St Helens and Wirral. The approved Liverpool Baltic Station (£100 million, delivery target end of 2027) will add a further civils and groundworks phase to the south of the city centre when construction begins.</p>`,
    majorProjects: [
      {
        name: "Central Docks Infrastructure (GRAHAM Construction, £71m)",
        detail: "GRAHAM Construction began a £71m civils contract at Liverpool Waters' Central Docks in September 2025, delivering roads, underground utilities and a 2.1-hectare Central Park to unlock approximately 2,350 new homes, with a spring 2028 completion target.",
      },
      {
        name: "King Edward Triangle Waterfront (KEIE / Beetham, £1bn)",
        detail: "The £1 billion King Edward Triangle scheme on Liverpool's northern waterfront, progressing detailed planning for close to 3,000 homes and hotel space in 2026, is generating supply-chain interest from structural and M and E subcontractors.",
      },
      {
        name: "Liverpool Baltic Train Station (£100m)",
        detail: "The Liverpool City Region Combined Authority approved plans for the £100m Liverpool Baltic rail station in 2024, with Mayor Rotheram committing to delivery by end of 2027, adding a major civils and earthworks phase to the south city centre pipeline.",
      },
      {
        name: "Bootle Strand Town Centre Regeneration",
        detail: "Sefton Council is driving the Bootle Strand regeneration with preparation and structural works continuing throughout 2026, providing steady work for demolition contractors and civils trades in the northern Merseyside corridor.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "joiners",
      "dryliners",
      "painters-decorators",
      "scaffolders",
      "labourers",
      "demolition-contractors",
    ],
    localFaqs: [
      {
        question: "Can I claim a CIS refund if I work on Liverpool Waters or the Central Docks project?",
        answer: "Yes. CIS deductions made by GRAHAM or any other main contractor are treated in exactly the same way as deductions from any other contractor. We collect your payment and deduction statements for the tax year, add up the total deducted, apply your allowable expenses, and file the Self Assessment return to recover the overpayment. Large civils projects like Central Docks typically involve multiple contractor tiers, and your immediate employer (whoever pays you) is responsible for the deduction.",
      },
      {
        question: "Do I need to be registered with HMRC for CIS before working in Liverpool?",
        answer: "If you are being paid as a subcontractor under CIS you should register with HMRC as soon as possible. An unregistered subcontractor has 30% deducted rather than 20%, a 10-percentage-point extra deduction on every labour invoice. Registration is straightforward and, once confirmed, future contractors deduct at 20%. We can register you as part of our onboarding.",
      },
      {
        question: "I have worked in Liverpool and Wirral for multiple contractors this year. Can I still claim?",
        answer: "Yes. All CIS deductions across all contractors are pooled on your Self Assessment return regardless of which borough or contractor they came from. You need a payment and deduction statement from each contractor. We compile and check all of them and file a single return covering your full year's construction income.",
      },
      {
        question: "What expenses can a Liverpool subcontractor claim to reduce their CIS tax bill?",
        answer: "Allowable expenses for CIS sole traders include: mileage at 55p per mile (from 6 April 2026) for business travel in your own vehicle, tools and equipment, PPE and protective clothing, materials you buy for jobs (though these are also excluded from the CIS deduction base), use of a room at home for admin (flat rate: £10 to £26 per month depending on hours), professional fees including our accountancy charge, and phone costs for business use. The more expenses you can legitimately claim, the lower the taxable profit and the larger the refund.",
      },
      {
        question: "How far back can I claim CIS refunds in Liverpool?",
        answer: "You can file or amend Self Assessment returns for the four tax years immediately before the current one. If you have been working under CIS in Liverpool or across Merseyside for several years without filing, there may be a combined four-year refund available. We handle the full lookback as part of our service.",
      },
    ],
    nearbyAreas: [
      "Birkenhead",
      "Wallasey",
      "Bootle",
      "St Helens",
      "Runcorn",
      "Ellesmere Port",
      "Widnes",
      "Kirkby",
    ],
  },

  {
    slug: "newcastle",
    name: "Newcastle upon Tyne",
    region: "Tyne and Wear",
    population: "302,000",
    geo: { lat: 54.9783, lng: -1.6178 },
    intro: `<p>Newcastle upon Tyne has a strong and active construction market in 2025 and 2026, anchored by two major programmes: the Pottery Lane build-to-rent scheme at Forth Yards (the city's largest multifamily development, 519 net-zero homes) and the Quayside West regeneration, for which Homes England received a £121.8 million government funding package in August 2025 to fund remediation, groundworks and infrastructure at a site capable of delivering 1,100 homes. For CIS-registered subcontractors working across these and the city's wider pipeline, 20% is deducted from the labour element of every payment (30% if unregistered), with materials excluded from the calculation.</p>
<p>A Newcastle electrician or plumber earning £32,000 gross in a tax year might have £6,400 deducted in CIS. After allowable expenses including mileage at 55p per mile from April 2026, tools, PPE and protective clothing, the tax actually owed is typically considerably less than the amount deducted, leaving a refund due through Self Assessment. Our clients across Tyne and Wear typically recover around £2,000 on average, and we can recover up to four years of overpaid deductions for tradespeople who have not filed before. We operate entirely remotely and are not limited to local clients.</p>`,
    contractorScene: `<p>Newcastle's construction labour market in 2025 and 2026 is concentrated along two main corridors. The Forth Yards Pottery Lane BTR scheme, developed by Olympian Homes and forward-funded by Hines (with a green loan from HSBC UK), is delivering 519 low-carbon homes across two buildings on Newcastle's last major undeveloped central brownfield site. The first 11-storey block (292 private units) is due for completion in Q4 2026, with the second 227-home block following in 2027. The scheme is an all-electric, geothermally heated development, meaning that M and E subcontractors with low-carbon systems experience are particularly in demand alongside groundworkers, joiners, dryliners and painters-decorators.</p>
<p>On Northumbria University's city centre campus, Sir Robert McAlpine holds a £30 million contract to demolish the existing Wynne Jones building and construct the North East Space Skills and Technology Centre (NESST), a six-storey facility housing satellite manufacturing clean rooms, advanced prototyping laboratories and a mission operations centre. Steelwork is now under way and completion is expected in autumn 2026. Castle Building Services holds the MEP subcontract. This kind of specialist research facility generates demand for mechanical, electrical and joinery operatives in the fit-out phase alongside the structural civils programme.</p>
<p>The wider Newcastle and Gateshead pipeline is led by Bowmer and Kirkland, the top construction contractor in the area by active project value in Barbour ABI's 2026 data (three projects at £345m), followed by Taylor Wimpey and Persimmon on the residential housebuilding front. Kier Infrastructure has secured the Regent Centre Metro Interchange refurbishment contract, with construction scheduled to commence in summer 2026. Across the North East, demand from housebuilders running north into Northumberland and south into County Durham keeps groundworkers, bricklayers and gas engineers consistently busy, with many operating as CIS sole traders through regional housebuilder supply chains.</p>`,
    majorProjects: [
      {
        name: "Pottery Lane BTR, Forth Yards (Olympian Homes / Hines)",
        detail: "Olympian Homes is delivering 519 net-zero homes across two buildings at Pottery Lane in Newcastle's Forth Yards, with the first 292-unit block due for completion in Q4 2026, forming Newcastle's largest Build to Rent scheme.",
      },
      {
        name: "North East Space Skills and Technology Centre, Northumbria University (Sir Robert McAlpine, £30m)",
        detail: "Sir Robert McAlpine is building the £30m NESST facility on Northumbria University's city centre campus, with steelwork under way and completion expected autumn 2026, creating demand for M and E and specialist fit-out subcontractors.",
      },
      {
        name: "Quayside West Regeneration (Homes England, £121.8m funding)",
        detail: "Homes England received £121.8m in August 2025 to fund remediation, groundworks and infrastructure at Quayside West, which has capacity for around 1,100 homes; a development partner is expected to be appointed in October 2026.",
      },
      {
        name: "Regent Centre Metro Interchange Refurbishment (Kier Infrastructure)",
        detail: "Kier Infrastructure secured the contract for a major refurbishment of Regent Centre Metro Interchange, with construction scheduled to commence in summer 2026, delivering improved accessibility and passenger facilities.",
      },
    ],
    tradeMix: [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "dryliners",
      "gas-engineers",
      "bricklayers",
      "painters-decorators",
      "scaffolders",
      "civil-engineers",
    ],
    localFaqs: [
      {
        question: "Can I claim a CIS refund if I worked on the Pottery Lane scheme in Newcastle?",
        answer: "Yes. Deductions made by Olympian Homes or any subcontractor tier on the Pottery Lane project are treated as standard CIS deductions on your payment and deduction statements. We collect the statements, total the deductions, apply your expenses and file the Self Assessment return to recover any overpayment. The fact that the scheme is a large BTR development makes no difference to the refund mechanics.",
      },
      {
        question: "Do you handle CIS returns for subcontractors working across the North East, not just Newcastle?",
        answer: "Yes. Trade Tax Specialists operates UK-wide and entirely remotely. Many Newcastle-based subcontractors work across Gateshead, Sunderland, County Durham, Middlesbrough and Northumberland. All CIS deductions from all those sites are consolidated on a single Self Assessment return, regardless of where in the country the work was done.",
      },
      {
        question: "I am a gas engineer in Newcastle working in new-build housing. Do CIS rules apply to me?",
        answer: "Yes, if you are a subcontractor on a construction site (new-build or major refurbishment) and the main contractor is registered under CIS. Gas installation in new-build residential properties is a CIS construction operation when it forms part of the original building works. Your contractor should be deducting at 20% if you are registered, or 30% if not. Routine maintenance or gas safety checks on existing properties are generally outside CIS.",
      },
      {
        question: "How much could I get back as a Newcastle CIS subcontractor?",
        answer: "Our clients' average refund is around £2,000, though this varies with your gross income, the labour-versus-materials split on your invoices, and the expenses you claim. Mileage is one of the largest expense items for North East subcontractors travelling between sites, and at 55p per mile from April 2026 the deduction adds up quickly. We can estimate your likely refund once we see your payment and deduction statements.",
      },
      {
        question: "Can I get Gross Payment Status so that no CIS is deducted at all?",
        answer: "Yes, if you meet the three qualifying tests: business test (UK construction work through a bank account), turnover test (at least £30,000 net annual CIS turnover as a sole trader), and compliance test (all tax obligations met on time for the past 12 months). From April 2026, keeping GPS also requires ongoing due diligence: re-verifying every subcontractor you pay, checking Companies House, and confirming bank account names before each payment. We can assess your eligibility and manage the application.",
      },
      {
        question: "Is there a Newcastle office I can visit?",
        answer: "We do not operate a walk-in office. All our work with Newcastle and North East subcontractors is handled remotely using secure document sharing. This keeps our fees lower and means you are never paying for the overhead of local office space. You simply send us your payment and deduction statements and we do the rest.",
      },
    ],
    nearbyAreas: [
      "Gateshead",
      "Sunderland",
      "Durham",
      "Middlesbrough",
      "Cramlington",
      "Washington",
      "North Shields",
      "Hexham",
    ],
  },
];
