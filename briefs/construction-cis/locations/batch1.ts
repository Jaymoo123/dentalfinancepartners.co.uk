// CIS location-page data: batch 1 (London, Manchester, Birmingham, Leeds, Bristol)
// Generated: 2026-06-12
// Projects verified via web search; sources listed in per-city comments below.
// No imports; export a plain array. Paste into construction-cis/web/src/app/locations/[slug]/data.ts CITIES record.
// All figures from house_positions.md (HP-LOCKED 2026-06-12): 20% registered rate, AMAP 55p, ~£2,000 avg refund illustrative.
// No em-dashes or en-dashes anywhere. British English throughout.

import type { CityData } from "@/app/locations/[slug]/data";

// ---------------------------------------------------------------------------
// VERIFIED SOURCES (per city)
// ---------------------------------------------------------------------------
// LONDON
//   HS2 Old Oak Common, SCS JV (Skanska Costain STRABAG), TBMs launched Jan 2026:
//     https://www.newcivilengineer.com/latest/first-tbm-for-hs2-tunnelling-to-central-london-launched-27-01-2026/
//     https://mediacentre.hs2.org.uk/news/next-stop-euston-hs2-begins-tunnelling-to-central-london
//   Brent Cross Town, BAM / Related Argent, 180-acre £8bn scheme, 3 Copper Square completing Sep 2026:
//     https://ukandireland.bam.com/media-centre/news/2024/6/bam-gets-underway-with-first-office-building-at-londons-new-net-zero
//     https://relatedargent.co.uk/2024/06/04/construction-begins-on-the-first-office-building-at-brent-cross-town
//
// MANCHESTER
//   Mayfield, Landsec / Bowmer + Kirkland, Republic office 243,000 sq ft on site; The Poulton + 880 homes starting 2026:
//     https://www.constructionenquirer.com/2025/08/01/green-light-for-first-880-homes-at-manchester-mayfield/
//     https://obiproperty.co.uk/north-wests-first-office-development-of-2025-breaks-ground-as-part-of-major-extension-to-much-loved-mayfield-park/
//   NOMA, 2 Angel Square next phase, Federated Hermes MEPC:
//     https://www.investinmanchester.com/news/noma-gears-up-for-next-phase-of-development-with-new-agents-confirmed/
//
// BIRMINGHAM
//   HS2 Curzon Street, Mace Dragados JV, façade/steelwork/roof 2025-26:
//     https://www.macegroup.com/projects/hs2-birmingham-curzon-street-station/
//     https://mediacentre.hs2.org.uk/news/construction-starts-on-hs2s-birmingham-curzon-street-station
//   Smithfield Birmingham, Lendlease / Crown Estate, £1.9bn, enabling works early 2026:
//     https://www.constructionenquirer.com/2025/07/23/funding-deal-ignites-1-9bn-birmingham-smithfield-rebuild/
//     https://www.lendlease.com/uk/projects/smithfield-birmingham/
//
// LEEDS
//   Aire Park phase 2, Vastint, 502 homes + office, 24-acre South Bank scheme:
//     https://vastint.eu/uk/work-begins-on-second-phase-of-vastint-uks-aire-park-leeds/
//     https://www.placeyorkshire.co.uk/vastint-opens-next-phase-of-aire-park/
//   South Village, Caddick / Homes England £16m grant, £1bn 1,925-home neighbourhood:
//     https://www.placeyorkshire.co.uk/ukreiif-caddick-homes-england-tie-up-deal-to-kickstart-1bn-south-village/
//     https://www.gov.uk/government/news/new-urban-village-with-nearly-2000-homes-another-step-closer-for-leeds-thanks-to-16-million-government-funding-boost
//
// BRISTOL
//   Temple Quarter Enterprise Campus, Sir Robert McAlpine, £500m, completing Sep 2026:
//     https://www.srm.com/projects/temple-quarter-enterprise-campus/
//     https://www.bristol.ac.uk/news/2026/may/tqec-construction-complete.html
//   Temple Island, L&G £350m (Zaha Hadid Architects), 520 homes + offices + hotel, approved Apr 2026:
//     https://www.constructionenquirer.com/2026/04/07/bristol-350m-temple-island-scheme-approved/
//     https://group.legalandgeneral.com/en/newsroom/press-releases/bristol-city-council-secures-350m-investment-from-legal-general-for-bristol-temple-island-regeneration
// ---------------------------------------------------------------------------

export const batch1Cities: CityData[] = [
  // =========================================================================
  // LONDON
  // =========================================================================
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    population: "9,000,000",
    geo: { lat: 51.5074, lng: -0.1278 },
    intro: `<p>London is the UK's single largest construction market by value, with tens of thousands of CIS subcontractors working across civil engineering, commercial fit-out, residential development and infrastructure at any one time. The Construction Industry Scheme applies to virtually every trade on every site in the capital, and the sheer volume of work means deductions accumulate fast. A plumber working on a Canary Wharf commercial fit-out with £44,000 in gross labour income in 2025/26 will have had £8,800 deducted by main contractors at the registered 20% rate before a single expense is counted, and most of that is reclaimable once allowable costs are set against it.</p><p>CIS subcontractors in London also face some of the highest working costs in the country: van parking permits, congestion and ULEZ charges, long travel corridors from outer boroughs and large tool kits are all allowable expenses that cut taxable profit and increase refund entitlement. Getting those expenses claimed correctly is where a specialist CIS accountant earns its keep. We work with London subcontractors remotely across all trades and boroughs, from Barnet to Bromley, Hackney to Hounslow.</p><p>The typical CIS refund for a registered London subcontractor who has had their self-assessment completed by a specialist is around £2,000, though the figure rises significantly for higher earners and those who have not claimed back-year refunds. HMRC allows claims going back four tax years, so first-time clients often receive a combined refund well above that average from their first return.</p>`,
    contractorScene: `<p>London's construction supply chain is dominated by a handful of Tier 1 contractors that take on the largest infrastructure and commercial schemes and then sub-package the specialist trades. On the HS2 Old Oak Common station project, the Skanska Costain STRABAG joint venture (SCS JV) is the principal tunnelling and civils contractor, having launched two tunnel boring machines toward Euston in January and March 2026. The station itself will become the UK's largest new rail interchange, and the surrounding 650-acre regeneration zone is already generating demand for groundwork, drainage, concrete frame, M&E and fit-out subcontractors. At Brent Cross Town in the London Borough of Barnet, BAM is on site delivering the first 14-storey office building at what will become an 180-acre, £8 billion mixed-use neighbourhood, with further residential and commercial plots to follow through to 2030 and beyond.</p><p>Away from the headline schemes, London's ongoing commercial pipeline keeps a steady stream of Tier 2 and Tier 3 subcontractors employed across roofing, drylining, plastering, joinery and mechanical and electrical work. The data centre construction boom in West London (Park Royal, Slough corridor) and the continued build-to-rent pipeline across East London and the outer zones are the most active sectors in 2025 and 2026. Supply-chain corridors for London typically run along the M25 orbital and the A roads into the city: subcontractors based in Essex, Kent, Surrey and Hertfordshire commute in daily, generating significant mileage claims.</p><p>The construction labour market in London is tight by national standards, meaning many subcontractors move between multiple main contractors in a single tax year. That pattern (several CIS300 deduction statements from different contractors) is precisely where errors and missed refunds arise. Many subcontractors on London sites are on the 30% unregistered rate without realising they could have registered for 20%, and some have materials costs deducted at source when they should not be. We audit your deduction statements as the first step in every engagement.</p>`,
    majorProjects: [
      {
        name: "HS2 Old Oak Common station and tunnels",
        detail:
          "The SCS JV (Skanska Costain STRABAG) launched two tunnel boring machines from Old Oak Common toward Euston in January and March 2026, driving a 4.5-mile twin-bore tunnel under central London. The station box excavation is complete and platform construction is under way, supporting over 1,000 direct construction jobs.",
      },
      {
        name: "Brent Cross Town (BAM / Related Argent)",
        detail:
          "BAM is on site delivering 3 Copper Square, a 14-storey, 239,000 sq ft office building within Related Argent and Barnet Council's 180-acre, £8 billion mixed-use development in North London, with practical completion targeted for September 2026 and further residential and commercial phases to follow.",
      },
      {
        name: "East Bank, Stratford",
        detail:
          "The cultural and educational quarter on Queen Elizabeth Olympic Park is in active construction, encompassing the V&A East museum, the BBC studios, a new Sadler's Wells venue and the London Stadium transformation, drawing major civils, M&E and specialist fit-out contractors to E20.",
      },
      {
        name: "Data centre pipeline, West London",
        detail:
          "A surge of hyperscale data centre construction in the Park Royal and Hayes corridors is generating substantial demand for groundwork, steel frame, electrical and mechanical subcontractors, with multiple sites active simultaneously across 2025 and 2026.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "electricians",
      "plumbers",
      "dryliners",
      "plasterers",
      "scaffolders",
      "roofers",
      "painters-decorators",
      "joiners",
      "civil-engineers",
    ],
    localFaqs: [
      {
        question: "Do I need a CIS accountant based in London?",
        answer:
          "No. We act for London subcontractors from an entirely remote service: you send us your CIS300 deduction statements, we do the rest. CIS tax returns are filed online with HMRC and there is no requirement for face-to-face meetings. We cover all London boroughs and the surrounding counties.",
      },
      {
        question:
          "How much CIS refund does a London subcontractor typically get?",
        answer:
          "The illustrative average across registered subcontractors is around £2,000 for a standard year, but London subcontractors often receive more because working costs (van charges, ULEZ, congestion, long-distance mileage, higher tool and PPE costs) increase the allowable expenses that reduce taxable profit. Back-year claims covering up to four prior tax years routinely produce combined refunds significantly above this figure for first-time clients.",
      },
      {
        question: "Can I claim CIS refunds for working on HS2 or other large London sites?",
        answer:
          "Yes. CIS applies to all qualifying construction work on large infrastructure and commercial schemes in the same way as any other site. If a main contractor such as SCS JV or BAM deducted 20% from your labour payments, that deduction feeds into your self-assessment return and can be reclaimed once your expenses and allowances are set against your income.",
      },
      {
        question: "What London-specific expenses can I claim as a CIS subcontractor?",
        answer:
          "Travel mileage at 55p per mile (from 6 April 2026) is the biggest expense for most trades. London-specific costs that are allowable where incurred for work include ULEZ charges, the Congestion Charge if your work site is in the zone, parking permits, public transport fares to and from sites, and any site-specific PPE or tool requirements. We identify every legitimate expense when we prepare your return.",
      },
      {
        question: "I work for several main contractors across London. Does that cause problems?",
        answer:
          "Not for the refund claim itself, but it does require careful reconciliation. Each contractor should issue you a CIS300 payment and deduction statement. We pull all of them together, cross-check the totals, identify any where materials have been wrongly included in the deduction base, and calculate the accurate refund figure before filing.",
      },
      {
        question: "What is the 30% CIS deduction and can I avoid it?",
        answer:
          "Unregistered subcontractors are deducted at 30% rather than 20%. Registration with HMRC for CIS costs nothing and reduces your deduction rate immediately. If you are currently on 30%, call us and we will register you and notify your contractors so they switch to the 20% rate on your next payment.",
      },
    ],
    nearbyAreas: [
      "Croydon",
      "Bromley",
      "Enfield",
      "Barnet",
      "Hounslow",
      "Slough",
      "Watford",
      "Dartford",
    ],
  },

  // =========================================================================
  // MANCHESTER
  // =========================================================================
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    population: "570,000",
    geo: { lat: 53.4808, lng: -2.2426 },
    intro: `<p>Manchester is one of the fastest-growing construction markets outside London, with billions of pounds of mixed-use development, commercial office schemes and residential regeneration currently on site or about to break ground across the city centre and inner suburbs. The CIS scheme underpins every trade on every contract here, and the pace of development in areas like Mayfield, NOMA, Salford and Wythenshawe means that groundworkers, electricians and fit-out trades move between projects constantly. A Manchester electrician with £38,000 in gross CIS labour income in 2025/26 will have had £7,600 deducted at the registered 20% rate; once mileage, tools and other allowable expenses are accounted for, a substantial portion of that is reclaimable.</p><p>Greater Manchester's CIS market extends well beyond the M60: Salford, Trafford, Stockport, Bolton and Oldham all have active construction pipelines and large subcontractor populations. We act for clients across the whole conurbation and serve them remotely, so there is no need to travel to an office. Most refund claims are turned around within eight weeks of us receiving your deduction statements, and we look back four years on every new client engagement to maximise the combined claim.</p>`,
    contractorScene: `<p>The largest live scheme in central Manchester is the Mayfield regeneration project, a 24-acre district around the former Mayfield railway station on the eastern edge of the city centre. Landsec appointed Bowmer and Kirkland as main contractor to build Republic, a 13-storey, 243,000 sq ft office building that broke ground in 2025 as the first net-zero commercial development of its scale in the North West. The second office phase, The Poulton (95,000 sq ft), and a major multi-modal transport hub are scheduled to start on site in 2026, alongside two large residential towers delivering 879 homes designed by Studio Egret West and shedkm. The overall Mayfield partnership involves the Greater Manchester Combined Authority, Transport for Greater Manchester and LCR, creating a public-private supply chain that feeds trades from groundworks and concrete frame through to M&E, fit-out and landscaping.</p><p>The NOMA district, immediately north of Manchester city centre, is in its next development phase following the completion of the Hanover and Dantzic buildings. Federated Hermes MEPC is bringing forward 2 Angel Square as the next major commercial building, and the 20-acre masterplan area continues to generate demand for demolition, civils and commercial fit-out contractors. Further south, Wythenshawe Civic Centre regeneration (on site from 2025) and the former Central Retail Park site (construction expected to begin 2026) add further pipeline for concrete-frame, M&E and finishing trades across South and East Manchester.</p><p>Manchester's subcontractor supply chain is distinctly regional: the M60 and M62 corridors serve as the main logistics arteries, with many trades based in Salford, Trafford, Stockport and the Pennine fringe commuting into city-centre sites daily. That mileage is fully claimable at 55p per mile from 6 April 2026. Fit-out and drylining are in particularly high demand given the volume of office and hotel completions planned for 2026 and 2027.</p>`,
    majorProjects: [
      {
        name: "Mayfield, Republic office and residential phases",
        detail:
          "Landsec and Bowmer and Kirkland are on site building the 13-storey, 243,000 sq ft Republic office building at the 24-acre Mayfield regeneration district. A second office building (The Poulton) and 879 new homes across two residential towers start on site in 2026, with the overall £1.4 billion scheme backed by the Greater Manchester Combined Authority and Transport for Greater Manchester.",
      },
      {
        name: "NOMA, 2 Angel Square (next phase)",
        detail:
          "Federated Hermes MEPC is preparing to bring forward 2 Angel Square as the next major commercial building in the 20-acre NOMA district north of the city centre, continuing a regeneration programme that has been under way since 2012 and which already houses Amazon's first UK office outside London.",
      },
      {
        name: "Wythenshawe Civic Centre regeneration",
        detail:
          "Construction began in 2025 on the Wythenshawe Civic Centre scheme, which will deliver a cultural and creative hub, a new public square and approximately 1,750 new homes in South Manchester, drawing groundwork, concrete frame and fit-out trades to the M23 corridor.",
      },
      {
        name: "Former Central Retail Park, East Manchester",
        detail:
          "Manchester City Council acquired the 10.5-acre former Central Retail Park in 2017 and has programmed construction to begin in 2026, adding another major mixed-use scheme to the city-centre pipeline with residential, commercial and public-realm elements.",
      },
    ],
    tradeMix: [
      "electricians",
      "plumbers",
      "groundworkers",
      "dryliners",
      "joiners",
      "plasterers",
      "builders",
      "scaffolders",
      "painters-decorators",
      "roofers",
    ],
    localFaqs: [
      {
        question: "Do I need a CIS accountant based in Manchester to claim my refund?",
        answer:
          "No. Our service is entirely remote. Manchester subcontractors send us their deduction statements and we handle everything online. CIS self-assessment returns are filed digitally with HMRC and we never need to meet face to face. We cover all Greater Manchester boroughs including Salford, Trafford, Stockport, Bolton, Wigan and Oldham.",
      },
      {
        question:
          "How much CIS refund does a Manchester subcontractor typically get?",
        answer:
          "The illustrative average for a registered subcontractor is around £2,000, but the actual figure depends on your gross labour income, the allowable expenses you can claim and whether you are claiming back years. Subcontractors working on large Manchester schemes such as Mayfield often have higher materials and tool costs, which increases the refund. Back-year claims for up to four prior tax years are common on first engagement.",
      },
      {
        question:
          "I work across Greater Manchester for different contractors. Can you still help?",
        answer:
          "Yes. Working for multiple contractors is common in the Manchester market and the refund process handles it straightforwardly: each contractor issues a CIS300 deduction statement and we pull them all together. The key requirement is that you keep all your deduction statements; if any are missing, we can often help you obtain duplicates from HMRC.",
      },
      {
        question:
          "What expenses can a Manchester CIS subcontractor claim?",
        answer:
          "Mileage at 55p per mile from 6 April 2026 is typically the largest single expense, particularly for trades commuting along the M60 and M62. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. If you operate from a home office you may also claim use-of-home flat rates. We identify every legitimate expense when preparing your return.",
      },
      {
        question:
          "Does CIS apply to work on the Mayfield or NOMA developments?",
        answer:
          "Yes. Both are standard CIS contracts: the main contractors (including Bowmer and Kirkland at Mayfield) verify subcontractors and deduct at 20% or 30% depending on CIS registration status. If you worked on either scheme and had 20% deducted, that feeds directly into your refund claim.",
      },
    ],
    nearbyAreas: [
      "Salford",
      "Trafford",
      "Stockport",
      "Bolton",
      "Oldham",
      "Wigan",
      "Rochdale",
    ],
  },

  // =========================================================================
  // BIRMINGHAM
  // =========================================================================
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    population: "1,150,000",
    geo: { lat: 52.4862, lng: -1.8904 },
    intro: `<p>Birmingham is in the middle of the most intense phase of construction investment in its modern history. HS2 Curzon Street station is rising from its foundations in the city centre, the £1.9 billion Smithfield regeneration is beginning enabling works, and a pipeline of residential and commercial schemes is responding to the city's population growth and post-Commonwealth Games momentum. Every trade on every one of these schemes operates under the Construction Industry Scheme, and the scale of the projects means CIS deductions are accumulating in large volumes. A Birmingham groundworker with £41,000 in gross CIS labour income in 2025/26 will have had £8,200 deducted at the registered 20% rate before expenses reduce the tax bill further, and in most cases a significant refund is owed after self-assessment.</p><p>We act for subcontractors across Birmingham and the wider West Midlands conurbation including Wolverhampton, Coventry, Dudley and Walsall. Our service is entirely remote and most new clients receive their first refund within 8 to 12 weeks of our first contact. Every new engagement includes a check on back-year entitlement covering up to four prior tax years, which for subcontractors who have not previously used a CIS accountant can produce a combined repayment well above the illustrative £2,000 annual average.</p>`,
    contractorScene: `<p>The dominant employer of construction labour in Birmingham right now is HS2. The Mace Dragados joint venture is the principal contractor on the Curzon Street terminus station, which at 500 metres long and 70 metres wide will be the largest new intercity terminus built in the UK since the Victorian era. Piling and foundation works delivered 2,000 concrete piles in 2025; façade works, concourse steelwork and roof construction are progressing through 2025 and 2026 on a programme that will carry through to fit-out completion in 2028. The station supports over 1,000 construction jobs during its main construction phase, drawing civil engineers, steelwork erectors, groundworkers, concrete frame contractors and M&E trades from across the West Midlands supply chain.</p><p>Adjacent to Curzon Street, Birmingham City Council and its partners are progressing the £1.9 billion Smithfield regeneration on 17 hectares of city-centre land formerly occupied by the wholesale markets. Lendlease, in joint venture with The Crown Estate, is the developer and delivery partner; a £173 million grant unlocked in mid-2025 is funding enabling works on the new Bull Ring Markets, 3,000 homes, commercial and cultural space, and two major public squares. Construction is scheduled to begin in earnest in early 2026, extending the demand for groundwork, frame, M&E and finishing trades well into the 2030s.</p><p>Beyond the two headline schemes, Birmingham's residential pipeline is substantial. The city council's 2026 high-rise masterplan proposes significant further development in the Eastside and Digbeth corridors, and the Jewellery Quarter continues to attract residential conversion and new-build schemes served by local bricklaying, plastering and roofing subcontractors. The A38 and M6 corridors function as the main construction supply arteries, with many West Midlands trades commuting from the Black Country and Coventry corridor.</p>`,
    majorProjects: [
      {
        name: "HS2 Birmingham Curzon Street station (Mace Dragados JV)",
        detail:
          "Mace Dragados joint venture, with Keltbray piling and MPB Structures on the substructure, is delivering the 500-metre HS2 terminus. Façade construction and concourse steelwork started in 2025 with the roof and internal fit-out progressing through 2026 to 2028; the project supports over 1,000 construction jobs.",
      },
      {
        name: "Smithfield Birmingham (Lendlease / The Crown Estate)",
        detail:
          "A £173 million grant approved in 2025 unlocked enabling works on the £1.9 billion Smithfield regeneration: 17 hectares of former wholesale market land being redeveloped by Lendlease and The Crown Estate into 3,000 homes, new market buildings, offices, two public squares and a city park, with main construction beginning in early 2026.",
      },
      {
        name: "Eastside and Digbeth residential pipeline",
        detail:
          "The city council's 2026 high-rise masterplan and ongoing conversion activity in Digbeth are generating a steady flow of residential schemes: concrete-frame, bricklaying, internal fit-out and roofing trades are active across multiple simultaneous sites in these inner-city neighbourhoods.",
      },
      {
        name: "West Midlands Metro extension works",
        detail:
          "Ongoing Metro tram network extensions across the West Midlands are generating civils, rail infrastructure and highway reinstatement work for groundworkers, bricklayers and civil engineering subcontractors across the conurbation.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "bricklayers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "scaffolders",
      "roofers",
      "plasterers",
      "builders",
      "demolition-contractors",
    ],
    localFaqs: [
      {
        question:
          "Do I need a CIS accountant in Birmingham to claim my refund?",
        answer:
          "No. We act for Birmingham and West Midlands subcontractors entirely remotely. Your CIS deduction statements and expense records come to us digitally and we file your self-assessment return online. There is no need for a local office visit and we cover the full West Midlands including Wolverhampton, Coventry, Dudley, Walsall and Solihull.",
      },
      {
        question:
          "How much CIS refund does a Birmingham subcontractor typically get?",
        answer:
          "The illustrative average is around £2,000 for a registered subcontractor in a standard year. On large schemes such as HS2 Curzon Street, where materials such as concrete, steel and plant are often contractor-supplied, a higher proportion of earnings may be labour and therefore subject to the 20% deduction, increasing the potential refund once allowable expenses are applied. First-time clients with unclaimed back years often receive substantially more.",
      },
      {
        question:
          "Does working on HS2 Curzon Street or Smithfield mean CIS applies?",
        answer:
          "Yes. Both are standard CIS-qualifying construction contracts. If Mace Dragados or their sub-agents deducted 20% from your labour payments, those deductions count toward your refund calculation via self-assessment. We pull together all the deduction statements from a project, however many contractors were involved.",
      },
      {
        question:
          "What expenses can a Birmingham CIS subcontractor claim?",
        answer:
          "Mileage at 55p per mile from 6 April 2026 is usually the largest expense. Tools, PPE, work clothing and the business proportion of your phone are also allowable. If you commute to Birmingham city-centre sites from the Black Country or Coventry, the daily mileage figure adds up quickly across a full year and increases your refund significantly.",
      },
      {
        question:
          "I have not claimed a CIS refund for three or four years. Is it too late?",
        answer:
          "No. HMRC allows self-assessment refund claims going back four complete tax years. If you are a registered subcontractor who has had 20% deducted and has not filed returns, you may have four years of refunds sitting at HMRC. We handle the catch-up filing as a standard service for new clients.",
      },
    ],
    nearbyAreas: [
      "Wolverhampton",
      "Coventry",
      "Dudley",
      "Walsall",
      "Solihull",
      "Sutton Coldfield",
      "Bromsgrove",
    ],
  },

  // =========================================================================
  // LEEDS
  // =========================================================================
  {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire",
    population: "815,000",
    geo: { lat: 53.8008, lng: -1.5491 },
    intro: `<p>Leeds has one of the most active urban regeneration programmes in England outside London, with the South Bank corridor accounting for over 30 per cent of all construction schemes currently on site in the city. Vastint, Caddick and a pipeline of residential developers are delivering thousands of new homes, offices and public realm improvements between the city centre and the River Aire, and the CIS scheme applies to every subcontractor working on those sites. A Leeds groundworker with £42,000 in gross CIS labour income in 2025/26 will have had £8,400 deducted at the registered 20% rate; after mileage, tools and materials are accounted for, the typical refund is in the range of £2,000 or more for a full year of CIS deductions.</p><p>The Leeds subcontractor base extends across West Yorkshire: Bradford, Wakefield, Huddersfield and Harrogate all feed trades into the city's construction sites, and many operate under CIS for multiple contractors in the same tax year. We act for West Yorkshire subcontractors entirely remotely, and our first engagement always includes a look back at the four prior tax years to check for unclaimed refunds.</p>`,
    contractorScene: `<p>Leeds South Bank is the largest sustained urban regeneration zone in the north of England. Vastint UK, a subsidiary of IKEA's investment arm, is the anchor developer at Aire Park, a 24-acre mixed-use scheme on the former Tetley Brewery land and adjacent brownfield sites. Phase one delivered 190,000 sq ft of office space at 1 and 3 South Brook Street, and a full eight-acre public park opened in July 2025 as the UK's largest new city-centre park. The second phase, currently on site, is delivering 502 homes, 20,000 sq ft of flexible leisure space and a multi-storey car park, with the wider scheme projected to complete by 2032. The project draws groundworkers, concrete-frame contractors, M&E trades and finishing subcontractors from across the Leeds and Bradford corridor.</p><p>Adjacent to Aire Park, Caddick Group secured a £16 million Homes England infrastructure grant in 2025 to unlock South Village, a £1 billion, 10-acre scheme that will deliver up to 1,925 homes (nearly half two and three-bedroom units), 450 hotel beds and 70,000 sq m of commercial space between Meadow Road and the river. Infrastructure works including roads, utilities, cycleways and green space are now on site, with the first residential plots to follow. Caddick Construction, the group's contracting arm, is among the key employers of local subcontractors on Yorkshire residential and commercial schemes.</p><p>Temple Works in Holbeck, the Grade I listed 19th-century flax mill, is undergoing a £35 million restoration to become a new British Library North, adding specialist heritage and structural-repair trades to the South Bank mix. Across Leeds city centre, a crane-count survey in early 2026 recorded six live South Bank schemes delivering over 2,000 homes and 235,000 sq ft of offices simultaneously. Northern Accountants and other regional firms focus their CIS marketing on the Leeds market, making it a competitive geography, but we offer a UK-wide remote service and on-site knowledge of the local project pipeline.</p>`,
    majorProjects: [
      {
        name: "Aire Park phase 2 (Vastint UK)",
        detail:
          "Vastint UK is on site with the second phase of its 24-acre Aire Park development, delivering 502 homes, 20,000 sq ft of leisure space and a multi-storey car park alongside the eight-acre public park that opened in July 2025. The overall scheme will ultimately deliver 1,400 homes, 800,000 sq ft of offices and the UK's largest new city-centre park.",
      },
      {
        name: "South Village (Caddick / Homes England)",
        detail:
          "Caddick Group is delivering infrastructure works on the £1 billion South Village scheme after securing a £16 million Homes England grant in 2025. The 10-acre site adjacent to Meadow Road will deliver 1,925 homes, 450 hotel beds and 70,000 sq m of commercial space, with the first residential plots emerging from 2025 onward.",
      },
      {
        name: "Temple Works (British Library North)",
        detail:
          "The Grade I listed Temple Works flax mill in Holbeck is undergoing a £35 million restoration and conversion into a new British Library North, creating approximately 8,000 sq m of space and requiring specialist heritage masonry, structural steelwork and conservation trades.",
      },
      {
        name: "Leeds city centre residential pipeline",
        detail:
          "A crane-count survey in early 2026 recorded six live South Bank schemes simultaneously delivering over 2,000 homes and 235,000 sq ft of offices, with further city-centre residential approvals in the pipeline through the council's growth-led local plan.",
      },
    ],
    tradeMix: [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "joiners",
      "plasterers",
      "scaffolders",
      "roofers",
      "builders",
      "civil-engineers",
    ],
    localFaqs: [
      {
        question:
          "Do I need a CIS accountant in Leeds to claim my refund?",
        answer:
          "No. We provide a fully remote service for Leeds and West Yorkshire subcontractors. You share your CIS300 deduction statements and expense information with us online and we do everything else, including filing your self-assessment return with HMRC. We cover Bradford, Wakefield, Huddersfield, Harrogate and the surrounding areas as well as Leeds itself.",
      },
      {
        question:
          "How much CIS refund does a Leeds subcontractor typically get?",
        answer:
          "The illustrative average is around £2,000 for a registered subcontractor with a full year of CIS deductions. Groundworkers and civil-engineering trades working on South Bank schemes often have higher materials costs (plant, aggregates, drainage products) which are excluded from the CIS deduction base but can be reclaimed as allowable expenses, potentially increasing the refund. Back-year claims for up to four prior tax years are available and many first-time clients receive a combined figure well above the annual average.",
      },
      {
        question:
          "I worked on Aire Park or South Village. Does CIS apply?",
        answer:
          "Yes. Both are CIS-qualifying construction contracts and main contractors including Vastint UK and Caddick Construction deduct at 20% from registered subcontractors. Every deduction statement you received from those projects feeds into your self-assessment refund calculation.",
      },
      {
        question:
          "What expenses can a Leeds CIS subcontractor claim?",
        answer:
          "Mileage at 55p per mile from 6 April 2026 is usually the single largest expense, especially for trades commuting to city-centre sites from Bradford, Wakefield or Harrogate. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. We identify every legitimate expense before submitting your return.",
      },
      {
        question:
          "Can I still claim CIS refunds if I have not filed self-assessment for several years?",
        answer:
          "Yes. HMRC allows claims for up to four complete prior tax years. If you have been deducted at 20% and have not filed, you may have multiple years of refunds unclaimed. We handle catch-up filings as a standard part of our first-engagement service.",
      },
      {
        question:
          "What is Gross Payment Status and should I apply for it as a Leeds subcontractor?",
        answer:
          "Gross Payment Status (GPS) lets you receive the full value of your invoices with no CIS deduction (0% instead of 20%). To qualify as a sole trader you need at least £30,000 in net annual CIS turnover and a clean compliance record for the past 12 months. If you meet those tests, GPS is highly beneficial for cash flow. Note that the April 2026 Finance Act tightened the GPS regime with a five-year reapplication ban and due-diligence obligations, so it is worth taking specialist advice before applying. We assess GPS eligibility as part of our full-service engagement.",
      },
    ],
    nearbyAreas: [
      "Bradford",
      "Wakefield",
      "Huddersfield",
      "Harrogate",
      "Halifax",
      "Castleford",
      "Wetherby",
    ],
  },

  // =========================================================================
  // BRISTOL
  // =========================================================================
  {
    slug: "bristol",
    name: "Bristol",
    region: "South West England",
    population: "475,000",
    geo: { lat: 51.4545, lng: -2.5879 },
    intro: `<p>Bristol's construction market is in a sustained growth phase, anchored by the £500 million Temple Quarter Enterprise Campus completing in 2026, the just-approved £350 million Temple Island development, and a broader regeneration of the Temple Meads corridor that will ultimately deliver 10,000 new homes and major new public transport infrastructure. The CIS scheme applies across all of this work, and Bristol's relatively compact geography means subcontractors frequently work across multiple sites in the same week. A Bristol plumber on a Temple Quarter residential scheme with £36,000 in gross CIS labour income in 2025/26 will have had £7,200 deducted at the registered 20% rate; after travel costs, tools and materials are set against income, a significant refund is typically owed.</p><p>We act for CIS subcontractors across the Bristol and South West market, including Bath, Weston-super-Mare, Gloucester, Swindon and the surrounding counties, entirely by remote. The South West construction market is often characterised by a higher proportion of smaller specialist subcontractors working for regional Tier 2 contractors rather than national Tier 1 firms, which means CIS registration status and deduction errors are more common and the refund opportunity is proportionally significant.</p>`,
    contractorScene: `<p>The most active single construction site in Bristol in 2025 and 2026 is the Temple Quarter Enterprise Campus, a £500 million project commissioned by the University of Bristol on the site of the former Royal Mail sorting office adjacent to Bristol Temple Meads station. Sir Robert McAlpine is the principal contractor on the 38,350 sq m six-storey academic building, which will accommodate 4,600 students and 650 staff when it opens in September 2026. The project required substantial groundwork and enabling works, concrete frame, curtain-wall glazing, M&E fit-out and landscaping, and Sir Robert McAlpine's subcontract packages have drawn trades from across the Bristol, Bath and South West supply chain. Alongside the main building, a £23 million eastern entrance to Bristol Temple Meads station is under construction, adding further civils and rail infrastructure work to the immediate vicinity.</p><p>Immediately adjacent, Legal and General's £350 million Temple Island development was approved by Bristol City Council in April 2026. Designed by Zaha Hadid Architects, the 2.7-hectare former rail depot site will deliver 520 homes across four residential buildings, two office buildings, flexible workspace and a 164-room hotel with conference facilities. Sanctus is carrying out enabling works and remediation; a main construction contractor is expected to be appointed in 2026 as the scheme progresses from planning into delivery. The combined Temple Island and Temple Quarter Enterprise Campus developments create a concentrated zone of construction activity that will run through to 2030.</p><p>The wider Temple Quarter regeneration framework, with development partner Muse selected by the West of England Combined Authority in January 2026, sets out 10,000 new homes, extensive commercial space and major public realm and connectivity improvements across the St Philip's Marsh corridor. This is a decade-long pipeline that will sustain demand for Bristol-area groundworkers, bricklayers, electricians, plumbers and finishing trades well into the 2030s. The M5 and A4 corridors serve as the main supply routes, with many Bristol subcontractors based in Keynsham, Clevedon, Nailsea and Yate.</p>`,
    majorProjects: [
      {
        name: "Temple Quarter Enterprise Campus (Sir Robert McAlpine)",
        detail:
          "Sir Robert McAlpine completed the 38,350 sq m, £500 million University of Bristol academic building at Temple Quarter in May 2026, ahead of the September 2026 opening. The project has been one of the largest construction contracts in the South West in recent years, employing concrete-frame, M&E and fit-out subcontractors from across Bristol and Bath.",
      },
      {
        name: "Temple Island (Legal and General, £350m)",
        detail:
          "Legal and General's £350 million Temple Island scheme, designed by Zaha Hadid Architects and approved by Bristol City Council in April 2026, will deliver 520 homes, offices and a 164-room hotel on a 2.7-hectare brownfield site adjacent to Temple Meads. Sanctus has begun enabling works and remediation, with main construction expected to follow in 2026.",
      },
      {
        name: "Bristol Temple Meads Eastern Entrance",
        detail:
          "A £23 million new eastern entrance to Bristol Temple Meads station, funded from a £95 million government grant to the Bristol Temple Quarter LLP, is under construction with an opening date aligned with the September 2026 Campus launch, adding civils, structural and fit-out packages to the corridor.",
      },
      {
        name: "Temple Quarter masterplan (Muse, 10,000 homes)",
        detail:
          "West of England Combined Authority appointed Muse as preferred development partner in January 2026 to deliver the broader Temple Quarter regeneration: 10,000 new homes, significant commercial space and major public realm improvements across the St Philip's Marsh corridor, providing a decade-long construction pipeline for Bristol-area trades.",
      },
    ],
    tradeMix: [
      "plumbers",
      "electricians",
      "groundworkers",
      "roofers",
      "builders",
      "joiners",
      "plasterers",
      "bricklayers",
      "scaffolders",
      "gas-engineers",
    ],
    localFaqs: [
      {
        question:
          "Do I need a CIS accountant based in Bristol to claim my refund?",
        answer:
          "No. We act for Bristol and South West subcontractors entirely remotely. There are no local office visits required: you share your deduction statements and expense information with us online and we file your self-assessment return digitally. We cover Bath, Weston-super-Mare, Gloucester, Swindon, Taunton and the wider South West.",
      },
      {
        question:
          "How much CIS refund does a Bristol subcontractor typically get?",
        answer:
          "The illustrative average is around £2,000 for a registered subcontractor with a full year of CIS deductions. Bristol trades working on schemes like Temple Quarter or Temple Island often have significant tool, PPE and travel expenses, all of which reduce taxable profit and increase the refund. Clients who have not claimed for several years are often entitled to a combined figure across up to four prior tax years that is substantially higher.",
      },
      {
        question:
          "Does CIS apply to work on the Temple Quarter or Temple Island projects?",
        answer:
          "Yes. Both are standard CIS-qualifying construction contracts. If Sir Robert McAlpine or a sub-agent deducted 20% from your labour payments on the Temple Quarter campus, or if you receive payments on the Temple Island scheme when it moves into main construction, those deductions count toward your annual refund calculation via self-assessment.",
      },
      {
        question:
          "What expenses can a Bristol CIS subcontractor claim?",
        answer:
          "Mileage at 55p per mile from 6 April 2026 is generally the largest claim for most Bristol trades, particularly those travelling from Keynsham, Yate, Clevedon or Weston-super-Mare to city-centre sites. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. We identify and document every legitimate expense before submitting your return.",
      },
      {
        question:
          "I am a sole trader plumber or electrician in Bristol. Does CIS apply to all my jobs?",
        answer:
          "CIS applies when you are paid by a contractor (not an end-user homeowner directly) for qualifying construction work. If you work on commercial or residential development sites for main contractors or Tier 2 contractors, CIS almost certainly applies and deductions are being made. Private domestic work paid directly by homeowners is outside CIS. If you are unsure whether your work falls within CIS, call us for a free assessment.",
      },
      {
        question:
          "What is the CIS deduction rate and how does the refund work?",
        answer:
          "Registered subcontractors are deducted at 20% on the labour element of their invoices. The materials portion is excluded from the deduction base. At year end you file a self-assessment return that sets your allowable expenses and personal allowance against your gross income, which almost always results in the actual tax owed being less than the total CIS deducted during the year. HMRC repays the difference, typically within 5 to 10 working days of the return being processed. The average illustrative refund is around £2,000 though the actual amount varies by income and expenses.",
      },
    ],
    nearbyAreas: [
      "Bath",
      "Weston-super-Mare",
      "Clevedon",
      "Keynsham",
      "Yate",
      "Nailsea",
      "Portishead",
      "Gloucester",
    ],
  },
];
