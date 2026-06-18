// Construction-CIS location pages: batch 4
// Cities: Coventry, Bradford, Stoke-on-Trent, Derby, Hull
// All figures locked per docs/construction-cis/house_positions.md 2026-06-12
// No imports required: plain CityData literals.
// heroImage omitted (images sourced separately).

export const batch4Locations = [
  {
    slug: "coventry",
    name: "Coventry",
    region: "West Midlands",
    population: "369,000",
    geo: { lat: 52.4068, lng: -1.5197 },
    intro: `<p>Coventry's construction sector is in the middle of its most active period in decades. The £450 million City Centre South scheme, led by The Hill Group and backed by Legal and General, broke ground on its first residential phase in February 2026. The scheme will deliver 1,575 new homes alongside 8,000 sq m of commercial space across a 6.3-hectare city-centre site. Subcontractors across groundworks, concrete, mechanical and electrical, joinery and finishing trades are feeding into its supply chain right now.</p>
<p>For a registered CIS subcontractor earning £48,000 in labour income from Coventry sites, a 20% deduction means £9,600 taken at source before any expenses are accounted for. After claiming allowable van costs at 55p per mile, tools, PPE and workwear, the actual tax owed is typically far lower. Many Coventry subcontractors are sitting on a refund of around £2,000 or more. We handle the Self Assessment return, recover the overpayment and set your account up correctly so the same mistake does not repeat.</p>
<p>Trade Tax Specialists is a remote-first UK-wide practice. You do not need to visit a local office: everything runs by phone, email and secure online portal. If you are working on City Centre South, Coventry's brownfield housing programme or any other West Midlands scheme, we can take you on.</p>`,
    contractorScene: `<p>Coventry sits at the intersection of the M6 and M69, making it a staging point for subcontractors covering the wider West Midlands corridor from Bedworth and Nuneaton in the north to Rugby and Leamington Spa in the south. The city's long manufacturing heritage (Jaguar Land Rover, GEC/Alstom, Rolls-Royce aero) means the local trades base skews heavily towards mechanical and electrical work, precision metalwork, and specialist fit-out. Electricians and gas engineers with industrial site experience are particularly active in Coventry, and many transitioned into CIS construction work as manufacturing shrank.</p>
<p>City Centre South is the headline scheme but it sits alongside a wider brownfield housing push backed by the West Midlands Combined Authority. A £12.24 million WMCA grant has unlocked a further mixed-use regeneration scheme at Well Street and Bishop Street, which has sat in temporary use since the Second World War. Coventry's two universities (Coventry University and the University of Warwick campus) generate a steady pipeline of student accommodation and campus development contracts, keeping groundworkers, bricklayers and drylining teams continuously busy.</p>
<p>The trade mix in Coventry reflects a city doing a lot of residential-led regeneration: large volumes of bricklaying, drylining and plastering work on the apartment phases; electricians and plumbers fitting out the commercial ground floors; scaffolders tracking the climbing concrete frames. Many subbies here work across multiple main contractors simultaneously, which creates particular complexity around CIS300 verification and deduction statements. If you have been deducted at 30% rather than 20% because a contractor failed to verify you, that gap is recoverable for up to four prior tax years.</p>`,
    majorProjects: [
      {
        name: "City Centre South",
        detail: "£450 million residential-led regeneration led by The Hill Group and Legal and General. Phase one delivering 991 homes, 8,000 sq m of commercial space and 17,000 sq m of public realm. First residential construction phase commenced February 2026; first homes expected 2027.",
      },
      {
        name: "Well Street and Bishop Street Regeneration",
        detail: "Mixed-use scheme unlocked by a £12.24 million West Midlands Combined Authority grant. Delivering 40 apartments and 4,500 sq ft of ground-floor retail and office space on a site fronting the Burges Conservation Area. Planning permission granted 2025.",
      },
      {
        name: "Coventry Brownfield Housing Programme",
        detail: "West Midlands Combined Authority and Coventry City Council brownfield land release programme targeting hundreds of new homes across multiple city-edge and city-centre sites. Multiple enabling and groundworks packages active across 2025 and 2026.",
      },
      {
        name: "University Campus Development",
        detail: "Ongoing capital investment at both Coventry University and the University of Warwick. Student accommodation, faculty buildings and campus infrastructure contracts provide a continuous pipeline for civils, M&E and fit-out subcontractors in the area.",
      },
    ],
    tradeMix: [
      "electricians",
      "plumbers",
      "bricklayers",
      "groundworkers",
      "plasterers",
      "dryliners",
      "scaffolders",
      "joiners",
      "gas-engineers",
      "painters-decorators",
    ],
    localFaqs: [
      {
        question: "Do I need to be based in Coventry to use Trade Tax Specialists?",
        answer: "No. We are a remote-first UK-wide practice. Whether you are based in Coventry, Nuneaton or Leamington Spa and working on City Centre South or any other West Midlands scheme, everything runs by phone, email and secure online portal. Location makes no difference to your refund entitlement.",
      },
      {
        question: "How much could a Coventry subcontractor get back in a CIS refund?",
        answer: "The typical figure for a registered subcontractor is around £2,000 for the first year, though the exact amount depends on your gross labour income, expenses and tax position. A Coventry electrician earning £50,000 in CIS labour income has £10,000 deducted at 20%. After allowable expenses such as van mileage at 55p per mile, tools and PPE, most subcontractors owe considerably less than the amount deducted, and the difference comes back as a refund.",
      },
      {
        question: "I have been deducted at 30% on some Coventry sites. Can I reclaim the difference?",
        answer: "Yes. If a contractor applied the 30% unregistered rate when you were already CIS-registered, you have been overdeducted. The difference between the 30% and the correct 20% is recoverable through Self Assessment. We can go back up to four prior tax years to recover overpayments.",
      },
      {
        question: "I work for multiple main contractors across the West Midlands. How does CIS work?",
        answer: "Each contractor deducts CIS separately, and each must verify your status with HMRC before their first payment. At year end, all your deduction statements are combined and set against the tax you actually owe on your self-employed profit. We collect all your CIS payment and deduction statements, verify the deduction amounts match what HMRC holds, and file a single Self Assessment return that accounts for all of them.",
      },
      {
        question: "Does the City Centre South VAT domestic reverse charge apply to me?",
        answer: "The VAT domestic reverse charge applies when both the supplier and the customer are VAT-registered and CIS-registered, and the customer is not the end user. If you are a VAT-registered subcontractor supplying construction services to a VAT-registered main contractor on City Centre South, the reverse charge almost certainly applies: you do not charge VAT on your invoice, and the contractor accounts for it. We handle VAT reverse charge compliance as part of our service.",
      },
      {
        question: "What is the Making Tax Digital deadline for Coventry subcontractors?",
        answer: "If your gross CIS income (before any deductions are taken) is over £50,000 a year, you are in scope for MTD for Income Tax from April 2026. Note that the £50,000 threshold applies to your gross income, not the amount you receive after the 20% deduction. A subcontractor receiving £40,000 after deductions from a £50,000 gross is already in scope. We can set you up with MTD-compatible software and handle quarterly updates.",
      },
    ],
    nearbyAreas: ["Nuneaton", "Rugby", "Leamington Spa", "Bedworth", "Kenilworth", "Warwick", "Solihull"],
  },

  {
    slug: "bradford",
    name: "Bradford",
    region: "West Yorkshire",
    population: "564,000",
    geo: { lat: 53.7960, lng: -1.7594 },
    intro: `<p>Bradford is in the early stages of its largest city-centre construction programme in a generation. The City Village scheme, a 1,000-home residential development on the former Oastler and Kirkgate sites, won planning approval in February 2026. Delivered by ECF (a partnership of Muse, Legal and General and Homes England), phase one demolition and construction is running through 2026 into 2027. Bradford's CIS supply chain is pulling in groundworkers, bricklayers, joiners and M&E trades from across West Yorkshire and beyond.</p>
<p>A registered Bradford subcontractor on £42,000 of annual CIS labour income has £8,400 taken at source under the 20% deduction rate. With van mileage at 55p per mile, tools and PPE factored in, the actual tax bill is substantially lower. A refund in the range of £2,000 is typical for first-year clients at this income level. We file the Self Assessment return, offset all allowable costs and arrange the repayment directly with HMRC.</p>
<p>Trade Tax Specialists serves Bradford and the wider West Yorkshire corridor including Keighley, Shipley, Halifax and Huddersfield. Everything runs remotely: no office visit is needed.</p>`,
    contractorScene: `<p>Bradford's construction market has historically been characterised by high volumes of residential refurbishment, private new-build housing and commercial fit-out rather than large city-centre civils. The City Village scheme changes that: the demolition of the Oastler Centre (which began in late 2025, with a seven-month programme) and the start of phase one construction in spring 2026 brings a significant concrete-frame and structural package to the city centre for the first time in years. Kirkgate Shopping Centre closure and demolition follows towards the end of 2026, adding another major enabling works package.</p>
<p>Beyond City Village, Bradford District benefits from ongoing investment through the West Yorkshire Combined Authority housing programme and the government's confirmed commitment to Northern Powerhouse Rail, which is expected to deliver a new Bradford rail station. Station and rail corridor construction will generate large civils, groundwork and utilities packages when the programme moves into delivery phase. Subcontractors in Bradford currently earning CIS income from housing sites in Keighley, Shipley and Baildon, as well as commercial projects in the city centre, form the core of the local supply chain.</p>
<p>The West Yorkshire subcontractor market tends to have a high proportion of sole-trader builders, joiners and plasterers who have been working informally without registering for CIS, meaning many are suffering the 30% unregistered rate. For a Bradford joiner on £38,000 of labour income, that costs £3,800 a year compared to the 20% rate. Registration is free and immediate. We register, file and claim back overpayments for up to four prior tax years.</p>`,
    majorProjects: [
      {
        name: "Bradford City Village",
        detail: "1,000-home city-centre regeneration scheme delivered by ECF (Muse, Legal and General, Homes England). Planning approved February 2026. Phase one demolition of the Oastler Centre completed ahead of construction starting spring 2026. Kirkgate Shopping Centre demolition follows end of 2026.",
      },
      {
        name: "Bradford City Village Southern Gateway",
        detail: "Companion masterplan to City Village covering the southern half of the Oastler site and the Chain Street frontage. Includes 33 townhouses, 64 homes on the northern Oastler plots and a further 400 apartments at the Kirkgate site. Infrastructure and enabling works pipeline extending to 2028.",
      },
      {
        name: "Northern Powerhouse Rail (Bradford Station)",
        detail: "Government confirmed Bradford as central to the £45 billion Northern Powerhouse Rail programme. A decision on the business case for the new Bradford station is expected by summer 2026, with procurement and enabling works to follow. A major civils and infrastructure pipeline for West Yorkshire subcontractors.",
      },
      {
        name: "West Yorkshire Combined Authority Housing Programme",
        detail: "Ongoing WYCA-funded housing delivery across Bradford District, Keighley corridor and Airedale. Multiple residential schemes generating continuous work for groundworkers, bricklayers, joiners and M&E trades through 2025 and 2026.",
      },
    ],
    tradeMix: [
      "bricklayers",
      "joiners",
      "plasterers",
      "groundworkers",
      "plumbers",
      "electricians",
      "roofers",
      "painters-decorators",
      "scaffolders",
      "labourers",
    ],
    localFaqs: [
      {
        question: "Can I use Trade Tax Specialists if I am based in Bradford or the surrounding area?",
        answer: "Yes. We are a UK-wide remote practice and take on subcontractors from Bradford, Keighley, Shipley, Halifax and across West Yorkshire. You do not need to visit an office. Everything is handled by phone, email and secure online portal.",
      },
      {
        question: "What is the average CIS refund for a Bradford subcontractor?",
        answer: "The typical refund for a registered subcontractor is around £2,000 in the first year, though the exact figure depends on your gross labour income, expenses and whether you have been deducted at the correct rate. A Bradford joiner earning £40,000 in CIS labour income could see a refund of £1,500 to £2,500 after van mileage at 55p per mile, tools and workwear are accounted for.",
      },
      {
        question: "I have been working as a sole trader in Bradford without registering for CIS. Is it too late to register?",
        answer: "It is not too late. CIS registration is free and cuts your deduction rate from 30% to 20% immediately. If you have been suffering the higher rate without registering, we can also go back up to four prior tax years to claim a refund of the overpayments already made.",
      },
      {
        question: "How does CIS work when I supply both labour and materials on a Bradford job?",
        answer: "The CIS deduction applies only to the labour element of your invoice. Materials you supply (timber, blocks, pipe, cable and similar) are excluded from the deduction base. If your contractor is deducting 20% from the full invoice including materials, they are applying the rules incorrectly and you are overpaying. We review every deduction statement and recover any overpayment through Self Assessment.",
      },
      {
        question: "Do I need separate accountants for Bradford and out-of-city work?",
        answer: "No. CIS applies to all your UK construction income regardless of location. We handle the full picture: Bradford sites, West Yorkshire housing schemes, any work you take in Leeds, Huddersfield or elsewhere. All deductions from all contractors are offset against your annual tax bill in one Self Assessment return.",
      },
      {
        question: "What happens if my Bradford main contractor fails to verify me before paying?",
        answer: "If a contractor pays you without first verifying your CIS status with HMRC, they are required to deduct at the 30% unregistered rate, even if you are a registered subcontractor. You can recover the difference (the 10-point gap) through Self Assessment. The contractor may face a penalty for failing to verify. We help you identify where this has happened and recover the overpayment.",
      },
    ],
    nearbyAreas: ["Leeds", "Keighley", "Halifax", "Shipley", "Huddersfield", "Bingley", "Wakefield"],
  },

  {
    slug: "stoke-on-trent",
    name: "Stoke-on-Trent",
    region: "Staffordshire",
    population: "260,000",
    geo: { lat: 53.0027, lng: -2.1794 },
    intro: `<p>Stoke-on-Trent has several significant construction programmes running concurrently in 2025 and 2026. The Goods Yard neighbourhood, delivered by Capital and Centric with Bowmer and Kirkland as main contractor, completed its public square construction phase and has residential and commercial phases active into 2026. The much larger Etruscan Square scheme, awarded to Genr8 Kajima Regeneration, enters site preparation in 2026 ahead of construction work in 2027. Both schemes are drawing subcontractors from across the Staffordshire and South Cheshire corridor.</p>
<p>A registered Stoke subcontractor earning £44,000 in CIS labour income in 2025/26 has £8,800 deducted at 20% before seeing a penny. Against that, a typical allowable-expense claim for van mileage at 55p per mile, tools and PPE reduces the actual tax bill considerably. Many subcontractors in the area receive a refund of around £2,000 at year end. We file the return, recover the overpayment and keep your records in order for HMRC.</p>
<p>Trade Tax Specialists works with subcontractors and contractors across Stoke-on-Trent, Newcastle-under-Lyme, Crewe and the wider Staffordshire area. Everything is handled remotely.</p>`,
    contractorScene: `<p>Stoke's construction market is built around its ceramic and industrial heritage. The city's six towns (Burslem, Fenton, Hanley, Longton, Stoke, Tunstall) each have distinct brownfield land pipelines, and subcontractors here often cover multiple project sites across the conurbation in a single week. The Ceramic Valley Enterprise Zone (CVEZ) has been the focus of commercial and industrial development over the past decade: the Tunstall Arrow Business Park was fully let by 2025, and attention is now shifting to further CVEZ sites and the major city-centre schemes.</p>
<p>The Etruscan Square project in Hanley, backed by £20 million of government funding and being taken forward by Genr8 Kajima, is the largest regeneration opportunity in the Midlands city-centre pipeline. Site surveys and preparation works began in 2026 and the scheme will generate substantial groundworks, civils, concrete, drylining and M&E packages when construction moves to full delivery in 2027 onwards. The Goods Yard, meanwhile, has been active for longer: Bowmer and Kirkland built out the public square, and the 174-apartment residential phase and commercial spaces are progressing into 2026.</p>
<p>The environment agency flood risk management programme completed in 2026 has unlocked three housing developments worth £15 million already under construction across the city, delivering 238 new homes, with six further sites in the planning system with capacity for over 350 homes and a regional AI hub worth £60 million. Groundworkers and civils teams experienced in flood alleviation and earthworks are particularly well placed in the Stoke market.</p>`,
    majorProjects: [
      {
        name: "The Goods Yard",
        detail: "Mixed-use neighbourhood delivered by Capital and Centric, with Bowmer and Kirkland as main contractor. Located close to Stoke Railway Station and the Trent and Mersey Canal. Public square construction completed. 174 apartments, enterprise space, bars and eateries progressing into 2026.",
      },
      {
        name: "Etruscan Square",
        detail: "One of the Midlands' largest city-centre regeneration sites in Hanley, awarded to Genr8 Kajima Regeneration. Backed by £20 million of government funding. Site surveys and preparation works commencing 2026; full construction expected from 2027. Planned for 400 homes, urban sports and commercial space.",
      },
      {
        name: "Flood Risk and Brownfield Housing Programme",
        detail: "Environment Agency flood risk management works completed 2026, unlocking three housing sites worth £15 million currently under construction (238 homes) plus six further planning-stage sites with capacity for 350-plus homes and a regional AI hub. Civil engineering and groundworks pipeline active across 2025 and 2026.",
      },
      {
        name: "Ceramic Valley Enterprise Zone (CVEZ) Phase 2",
        detail: "Continuation of industrial and commercial development within the CVEZ following completion of Tunstall Arrow Business Park. Further plots under active development, generating enabling works, structural steel erection and mechanical and electrical packages for local subcontractors.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "bricklayers",
      "plasterers",
      "dryliners",
      "plumbers",
      "electricians",
      "roofers",
      "joiners",
      "civil-engineers",
      "painters-decorators",
    ],
    localFaqs: [
      {
        question: "Do I need to be based in Stoke-on-Trent to use Trade Tax Specialists?",
        answer: "No. We are a UK-wide remote practice and work with subcontractors from Stoke, Newcastle-under-Lyme, Crewe and across Staffordshire. Everything is handled by phone, email and secure online portal.",
      },
      {
        question: "How much can a Stoke-on-Trent CIS subcontractor expect to get back?",
        answer: "The typical refund for a registered subcontractor is around £2,000, though the exact amount depends on your gross CIS labour income, allowable expenses and tax position. A Stoke groundworker on £45,000 of labour income has £9,000 deducted at 20%. Once van mileage at 55p per mile, tools, PPE and other allowable costs are factored in, most subcontractors owe less than the amount deducted, with the difference returned as a refund.",
      },
      {
        question: "I work across multiple sites in Stoke, Hanley, Burslem and the wider area. Does that affect my CIS claim?",
        answer: "No. CIS applies consistently across all your UK construction work. All deductions from all contractors are consolidated into a single Self Assessment return at year end. We collect your payment and deduction statements from every contractor, verify the amounts against HMRC records and file a single return covering all of your CIS income.",
      },
      {
        question: "The contractor on my Stoke site deducted 20% from the full invoice including materials. Is that right?",
        answer: "No. CIS deductions apply only to the labour element of your invoice. Materials you supply are excluded from the deduction base. If your contractor applied the 20% rate to the full invoice including materials, they applied the rules incorrectly. The overpayment is recoverable through Self Assessment and we can go back up to four prior tax years.",
      },
      {
        question: "Can I claim mileage for travelling to different Stoke sites?",
        answer: "Yes. If you have a fixed base (such as a home or yard) and travel to different construction sites, the mileage from your base to each site is allowable at the AMAP rate of 55p per mile for the first 10,000 business miles and 25p thereafter (from 6 April 2026). Many Stoke subcontractors covering the six-town conurbation and sites out towards Newcastle-under-Lyme, Stone and Crewe accumulate significant mileage that substantially reduces their tax bill.",
      },
      {
        question: "What is Gross Payment Status and can I apply for it in Stoke?",
        answer: "Gross Payment Status (GPS) allows a registered subcontractor to be paid in full with no CIS deduction. To qualify, you need net annual CIS turnover (labour income excluding materials and VAT) of at least £30,000 for a sole trader, a clean compliance record for the past 12 months, and a UK bank account. GPS is not location-specific: a Stoke subcontractor qualifies on the same basis as anyone else in the UK. We handle the application and ongoing compliance.",
      },
    ],
    nearbyAreas: ["Newcastle-under-Lyme", "Crewe", "Stafford", "Stone", "Kidsgrove", "Leek", "Congleton"],
  },

  {
    slug: "derby",
    name: "Derby",
    region: "Derbyshire",
    population: "276,000",
    geo: { lat: 52.9225, lng: -1.4746 },
    intro: `<p>Derby's construction pipeline is anchored by the £200 million Becketwell regeneration programme, delivered by St James Securities with GMI Construction Group as main contractor, and by the enormous A38 Derby Junctions scheme: a £600 million, 10-year highway infrastructure contract covering three major junctions on the A38 corridor (Kingsway, Markeaton and Little Eaton). National Highways is engaging the supply chain ahead of tender publication in December 2026, and localised site surveys are running through to March 2026. When the A38 scheme moves to delivery, it will be one of the most significant civils programmes in the East Midlands.</p>
<p>For a registered Derby subcontractor earning £46,000 in CIS labour income, £9,200 is deducted at source under the 20% rate. After claiming van mileage at 55p per mile, tools and PPE, many Derby subcontractors are owed around £2,000 at year end. We handle the Self Assessment return, recover the refund and set your records up correctly going forward.</p>
<p>Trade Tax Specialists covers Derby, Derbyshire and the wider East Midlands corridor, including Burton upon Trent, Belper, Nottingham and Uttoxeter. Everything runs remotely.</p>`,
    contractorScene: `<p>Derby's construction economy has long been shaped by its manufacturing base: Rolls-Royce aero engines, Toyota's Burnaston plant and the East Midlands railway industry have generated a sustained pipeline of industrial and commercial construction work, keeping mechanical and electrical trades and specialist fabricators busy alongside the residential sector. As the manufacturing base has evolved, many trades that originally worked on industrial fit-out have transitioned into commercial refurbishment, data centre build-out and infrastructure work.</p>
<p>The Becketwell scheme is reshaping central Derby. GMI Construction Group has delivered the Springwell Square public realm and the Becketwell Performance Arena (now Valliant Live). The Becketwell residential phase and hotel element are progressing through 2026. The Derbion Masterplan adds another layer: the 1,150-home Eagle Quarter (former Eagle Market site) has planning permission and is in procurement, and the Bradshaw Way site adds further residential volume. These schemes together generate ongoing work for groundworkers, structural trades, M&E and finishing contractors.</p>
<p>Beyond the city centre, Derby sits within a triangle of significant infrastructure investment. The A38 Derby Junctions scheme will involve extensive earthworks, drainage, concrete structures and highways trades across the three affected junctions, generating multi-year subcontracting opportunities for civils and groundworks teams across Derbyshire. Castleward, a long-running mixed-use regeneration area north-east of the city centre, submitted its next phase planning application in October 2025 and will generate further residential construction work from 2026 onwards.</p>`,
    majorProjects: [
      {
        name: "A38 Derby Junctions Scheme",
        detail: "£600 million, 10-year National Highways infrastructure programme improving three junctions: Kingsway (A38/A5111), Markeaton (A38/A52) and Little Eaton (A38/A61). Site surveys running to March 2026; tender publication anticipated December 2026; delivery from 2028. A major civils, earthworks and highways supply-chain opportunity for Derby-area subcontractors.",
      },
      {
        name: "Becketwell Regeneration",
        detail: "£200 million city-centre mixed-use scheme delivered by St James Securities with GMI Construction Group. Includes the completed Springwell Square public realm and Valliant Live performance arena. Residential phase and hotel progressing through 2026, with further phases of the Becketwell masterplan to follow.",
      },
      {
        name: "Derbion Eagle Quarter",
        detail: "1,150-home residential scheme on the former Eagle Market site, with planning permission granted and procurement under way. Part of the wider Derbion Masterplan for Derby city centre. Delivering significant work for groundworkers, concrete-frame trades, M&E and fit-out subcontractors from 2026 onwards.",
      },
      {
        name: "Castleward Redevelopment",
        detail: "Next phase of the long-running Castleward mixed-use regeneration scheme north-east of Derby city centre. Planning application submitted October 2025. Residential-led development generating groundworks, structural and M&E packages for Derbyshire subcontractors.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "bricklayers",
      "joiners",
      "scaffolders",
      "plasterers",
      "gas-engineers",
      "painters-decorators",
    ],
    localFaqs: [
      {
        question: "Do I need to be based in Derby to use Trade Tax Specialists?",
        answer: "No. We are a UK-wide remote practice and work with subcontractors from Derby, Derbyshire, Burton upon Trent, Nottingham and across the East Midlands. Everything is handled by phone, email and secure online portal with no office visit required.",
      },
      {
        question: "How much could a Derby CIS subcontractor expect to receive as a refund?",
        answer: "The typical first-year refund for a registered subcontractor is around £2,000, though the exact amount depends on your labour income, expenses and tax position. A Derby groundworker earning £46,000 in CIS labour income has £9,200 taken at 20%. After allowable costs including van mileage at 55p per mile, tools and PPE, most subcontractors owe considerably less than the amount deducted.",
      },
      {
        question: "I am doing groundwork on Derby city-centre schemes and civils work on the A38 corridor. Can I claim for both?",
        answer: "Yes. All your UK CIS income is consolidated into a single Self Assessment return regardless of which schemes you work on or how many contractors deduct from you. We collect deduction statements from every contractor, verify the figures against HMRC records and file a single return covering all of your CIS income.",
      },
      {
        question: "What is the CIS nil return obligation and does it affect me as a Derby contractor?",
        answer: "From 6 April 2026, contractors who make no payments to subcontractors in a given tax month must still file a CIS300 nil return (or pre-notify HMRC of inactivity). This obligation was removed in 2015 and has been reinstated. Missing a nil return triggers a £100 penalty, rising to £200 at two months and £300 or 5% of the CIS liability at six months. If you operate as a contractor in Derby and sometimes have quiet months, you need to file nil returns or you will accrue penalties.",
      },
      {
        question: "Can a Derby limited-company subcontractor reclaim CIS deductions during the year rather than waiting for a tax return?",
        answer: "Yes. Limited-company subcontractors can offset CIS deductions suffered against PAYE and CIS liabilities they owe as an employer via the Employer Payment Summary (EPS). This is the real-time route: instead of waiting up to 18 months for a Self Assessment refund, the company reduces its monthly PAYE payment by the CIS it has suffered. We set this up and manage the EPS submissions.",
      },
      {
        question: "Is the A38 Derby Junctions scheme covered by CIS?",
        answer: "Yes. The A38 Derby Junctions scheme is a National Highways infrastructure programme and falls within CIS. Subcontractors working on earthworks, drainage, concrete structures and highways packages on the scheme are subject to CIS deductions in the normal way, unless they hold Gross Payment Status. We can check your status and, if you qualify for GPS, handle the application so you receive payments without deduction.",
      },
    ],
    nearbyAreas: ["Nottingham", "Burton upon Trent", "Belper", "Ilkeston", "Long Eaton", "Uttoxeter", "Matlock"],
  },

  {
    slug: "hull",
    name: "Hull",
    region: "East Yorkshire",
    population: "275,000",
    geo: { lat: 53.7457, lng: -0.3367 },
    intro: `<p>Hull is experiencing the highest level of regeneration activity in decades. The East Bank Urban Village scheme, a partnership between Hull City Council and the English Cities Fund (Muse, Legal and General, Homes England), has submitted planning for its first phase of up to 850 homes, with construction on phase one anticipated from 2027. In parallel, the Albion Square redevelopment (estimated £100 million contract) is in active procurement for a lead development partner, with VINCI Construction already on site carrying out preservation works on the Grade II listed Three Ships mural. The former Debenhams building has been cleared and 178 city-centre apartments are under construction. Hull City Council is also running an £80.5 million engineering and regeneration professional services framework to support its broader infrastructure programme.</p>
<p>A registered Hull subcontractor earning £43,000 in CIS labour income has £8,600 taken at source under the 20% deduction rate. After van mileage at 55p per mile, tools, PPE and other allowable costs, the actual tax bill is typically well below the amount deducted. A refund of around £2,000 is common for first-year clients at this income level. We file the Self Assessment return and recover the overpayment.</p>
<p>Trade Tax Specialists works with subcontractors across Hull, East Yorkshire and the Humber corridor including Beverley, Goole, Scunthorpe and Grimsby. Everything runs remotely.</p>`,
    contractorScene: `<p>Hull's construction market is shaped by two forces that operate in parallel: a long-established port and offshore energy supply chain, and an urban regeneration programme that has accelerated significantly since the city's UK City of Culture year in 2017. The Humber estuary is home to the Siemens Gamesa wind turbine blade manufacturing facility at Alexandra Dock and a growing offshore wind operations and maintenance sector. Electrical contractors, civils teams and structural trades with offshore and energy experience are particularly active in and around the port.</p>
<p>In the city itself, the Fruit Market quarter (delivered by Wykeland Beal) has driven sustained fit-out and commercial work since 2016, and Wykeland Beal continues to develop further plots in the area. The Albion Square scheme adds the largest new mixed-use development opportunity in the city centre. VINCI Construction is currently on site with scaffolding and preservation works as the council progresses its development partner procurement; demolition of the former BHS building is targeted for the end of 2026. The Mytongate, Paragon and Western Docklands areas are also identified in the Hull and East Yorkshire Combined Authority's regeneration prospectus as priority sites for the coming years.</p>
<p>The Hull supply chain draws from a wide geographic area: subcontractors from Beverley, Cottingham, Brough, Goole and Scunthorpe all work regularly in the city. Roofers and scaffolders are particularly in demand given the volume of residential refurbishment work alongside the new-build pipeline. The port economy also generates regular maintenance, repair and industrial construction packages that sit within CIS for subcontractors doing structural, mechanical or civils work on dock-related infrastructure.</p>`,
    majorProjects: [
      {
        name: "East Bank Urban Village",
        detail: "Flagship waterfront regeneration scheme delivered in partnership with the English Cities Fund (Muse, Legal and General, Homes England). First planning submitted April 2026 for 37 townhouses and 78 apartments in phase one, with up to 850 homes across the full scheme. Backed by £9.8 million of Levelling Up Partnership funding. Construction on phase one anticipated 2027.",
      },
      {
        name: "Albion Square Redevelopment",
        detail: "Major city-centre mixed-use opportunity. Hull City Council commenced procurement for a lead development partner in early 2026, targeting appointment in spring 2026 and demolition of the former BHS building by end of 2026. Estimated contract value £100 million. VINCI Construction currently on site with preservation and scaffolding works on the Grade II listed Three Ships mural.",
      },
      {
        name: "Former Debenhams Building (City Centre Apartments)",
        detail: "Planning permission granted December 2025. Clearance of the former Debenhams store completed and construction of 178 city-centre apartments under way. Part of a wider £75 million city-centre investment programme announced May 2026.",
      },
      {
        name: "Hull City Council Engineering and Regeneration Framework",
        detail: "£80.5 million professional services framework (£96 million including VAT) procured by Hull City Council covering bridges and structures, highways, building construction, heritage conservation and decarbonisation assessments. Supports the ongoing infrastructure delivery programme across Hull through to 2030.",
      },
    ],
    tradeMix: [
      "roofers",
      "scaffolders",
      "electricians",
      "plumbers",
      "bricklayers",
      "groundworkers",
      "joiners",
      "painters-decorators",
      "civil-engineers",
      "plasterers",
    ],
    localFaqs: [
      {
        question: "Do I need to be based in Hull to use Trade Tax Specialists?",
        answer: "No. We are a UK-wide remote practice and work with subcontractors from Hull, Beverley, Goole, Scunthorpe and across the Humber area. Everything is handled by phone, email and secure online portal with no office visit required.",
      },
      {
        question: "How much could a Hull CIS subcontractor get back?",
        answer: "The typical first-year refund for a registered subcontractor is around £2,000, depending on your gross labour income, expenses and tax position. A Hull roofer or scaffolder earning £43,000 in CIS labour income has £8,600 taken at 20%. After allowable costs including van mileage at 55p per mile from East Yorkshire sites, tools and PPE, most subcontractors owe less than the amount deducted, with the difference returned as a refund.",
      },
      {
        question: "I do both onshore construction work and some dock-related maintenance in Hull. Does all of it fall under CIS?",
        answer: "Structural, civil engineering and mechanical work on dock infrastructure is generally within CIS if it constitutes construction work as defined by HMRC (building, altering, repairing, extending, demolishing or dismantling structures). Straightforward maintenance of operational equipment or plant may be outside CIS. We review the nature of each contract, confirm whether CIS applies and ensure you are neither under-deducting (a contractor liability) nor over-deducting (which costs you money).",
      },
      {
        question: "Can I claim CIS refunds for up to four years back in Hull?",
        answer: "Yes. Self Assessment allows you to claim overpaid tax for up to four prior tax years. If you have been working in Hull under CIS for several years without filing a return, or without properly claiming your allowable expenses, the combined refund across all open years can be considerably larger than the single-year figure. We identify the open years, gather the relevant deduction statements and file all outstanding returns.",
      },
      {
        question: "The Albion Square main contractor asked me to provide a CIS verification number. What do I need to do?",
        answer: "Before the contractor can pay you, they must verify your CIS status with HMRC. HMRC will confirm whether to deduct at 0% (Gross Payment Status), 20% (registered) or 30% (unregistered). You do not supply a verification number yourself: the contractor uses your UTR and name to verify with HMRC directly. If you are not yet CIS-registered, we can register you so the contractor applies the 20% rate rather than 30%.",
      },
      {
        question: "What is Gross Payment Status and can a Hull subcontractor apply for it?",
        answer: "Gross Payment Status allows you to be paid in full with no CIS deduction. To qualify, your net annual CIS labour turnover must be at least £30,000 (£30,000 per director or £100,000 total for a limited company), you must have a clean compliance record for the past 12 months and a UK business bank account. GPS is open to any UK-registered subcontractor regardless of location. Given the changes introduced by Finance Act 2026, holding GPS now also requires ongoing due diligence on supply-chain partners. We handle the application and maintain the compliance record.",
      },
    ],
    nearbyAreas: ["Beverley", "Goole", "Scunthorpe", "Grimsby", "Cottingham", "Brough", "Howden"],
  },
];
