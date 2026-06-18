// City data for Trade Tax Specialists location pages.
// Each entry describes the construction contractor landscape in that city.
// Body fields are raw HTML strings.

export type CityData = {
  slug: string;
  name: string;
  region: string;
  /** Raw HTML paragraph(s) for the city intro (hero section). */
  intro: string;
  /** Raw HTML describing the local contractor / construction scene. */
  contractorScene: string;
  /** Major local construction projects (named projects add topicality). */
  majorProjects: { name: string; detail: string }[];
  /** Trade types prominent in this city, e.g. ["Groundworkers", "Electricians"]. */
  tradeMix: string[];
  /** City-specific FAQ pairs for FAQ schema and accordion. */
  localFaqs: { question: string; answer: string }[];
  /** Nearby towns/cities for areaServed and cross-linking. */
  nearbyAreas: string[];
  /** Optional population string, e.g. "330,000". */
  population?: string;
  /** Geo coordinates for LocalBusiness JSON-LD. */
  geo?: { lat: number; lng: number };
  /** Optional hero image (Pexels or similar). */
  heroImage?: {
    url: string;
    alt: string;
    photographer: string;
    photographer_url: string;
    pexels_url: string;
  };
};

export const CITIES: Record<string, CityData> = {
  "london": {
    "slug": "london",
    "name": "London",
    "region": "Greater London",
    "population": "9,000,000",
    "geo": {
      "lat": 51.5074,
      "lng": -0.1278
    },
    "intro": "<p>London is the UK's single largest construction market by value, with tens of thousands of CIS subcontractors working across civil engineering, commercial fit-out, residential development and infrastructure at any one time. The Construction Industry Scheme applies to virtually every trade on every site in the capital, and the sheer volume of work means deductions accumulate fast. A plumber working on a Canary Wharf commercial fit-out with £44,000 in gross labour income in 2025/26 will have had £8,800 deducted by main contractors at the registered 20% rate before a single expense is counted, and most of that is reclaimable once allowable costs are set against it.</p><p>CIS subcontractors in London also face some of the highest working costs in the country: van parking permits, congestion and ULEZ charges, long travel corridors from outer boroughs and large tool kits are all allowable expenses that cut taxable profit and increase refund entitlement. Getting those expenses claimed correctly is where a specialist CIS accountant earns its keep. We work with London subcontractors remotely across all trades and boroughs, from Barnet to Bromley, Hackney to Hounslow.</p><p>The typical CIS refund for a registered London subcontractor who has had their self-assessment completed by a specialist is around £2,000, though the figure rises significantly for higher earners and those who have not claimed back-year refunds. HMRC allows claims going back four tax years, so first-time clients often receive a combined refund well above that average from their first return.</p>",
    "contractorScene": "<p>London's construction supply chain is dominated by a handful of Tier 1 contractors that take on the largest infrastructure and commercial schemes and then sub-package the specialist trades. On the HS2 Old Oak Common station project, the Skanska Costain STRABAG joint venture (SCS JV) is the principal tunnelling and civils contractor, having launched two tunnel boring machines toward Euston in January and March 2026. The station itself will become the UK's largest new rail interchange, and the surrounding 650-acre regeneration zone is already generating demand for groundwork, drainage, concrete frame, M&E and fit-out subcontractors. At Brent Cross Town in the London Borough of Barnet, BAM is on site delivering the first 14-storey office building at what will become an 180-acre, £8 billion mixed-use neighbourhood, with further residential and commercial plots to follow through to 2030 and beyond.</p><p>Away from the headline schemes, London's ongoing commercial pipeline keeps a steady stream of Tier 2 and Tier 3 subcontractors employed across roofing, drylining, plastering, joinery and mechanical and electrical work. The data centre construction boom in West London (Park Royal, Slough corridor) and the continued build-to-rent pipeline across East London and the outer zones are the most active sectors in 2025 and 2026. Supply-chain corridors for London typically run along the M25 orbital and the A roads into the city: subcontractors based in Essex, Kent, Surrey and Hertfordshire commute in daily, generating significant mileage claims.</p><p>The construction labour market in London is tight by national standards, meaning many subcontractors move between multiple main contractors in a single tax year. That pattern (several CIS300 deduction statements from different contractors) is precisely where errors and missed refunds arise. Many subcontractors on London sites are on the 30% unregistered rate without realising they could have registered for 20%, and some have materials costs deducted at source when they should not be. We audit your deduction statements as the first step in every engagement.</p>",
    "majorProjects": [
      {
        "name": "HS2 Old Oak Common station and tunnels",
        "detail": "The SCS JV (Skanska Costain STRABAG) launched two tunnel boring machines from Old Oak Common toward Euston in January and March 2026, driving a 4.5-mile twin-bore tunnel under central London. The station box excavation is complete and platform construction is under way, supporting over 1,000 direct construction jobs."
      },
      {
        "name": "Brent Cross Town (BAM / Related Argent)",
        "detail": "BAM is on site delivering 3 Copper Square, a 14-storey, 239,000 sq ft office building within Related Argent and Barnet Council's 180-acre, £8 billion mixed-use development in North London, with practical completion targeted for September 2026 and further residential and commercial phases to follow."
      },
      {
        "name": "East Bank, Stratford",
        "detail": "The cultural and educational quarter on Queen Elizabeth Olympic Park is largely delivered, with Sadler's Wells East open since January 2025 and the remaining V&A East and BBC studio elements completing, keeping specialist fit-out, M&E and finishing contractors active in E20."
      },
      {
        "name": "Data centre pipeline, West London",
        "detail": "A surge of hyperscale data centre construction in the Park Royal and Hayes corridors is generating substantial demand for groundwork, steel frame, electrical and mechanical subcontractors, with multiple sites active simultaneously across 2025 and 2026."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "electricians",
      "plumbers",
      "dryliners",
      "plasterers",
      "scaffolders",
      "roofers",
      "painters-decorators",
      "joiners",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "Do I need a CIS accountant based in London?",
        "answer": "No. We act for London subcontractors from an entirely remote service: you send us your CIS300 deduction statements, we do the rest. CIS tax returns are filed online with HMRC and there is no requirement for face-to-face meetings. We cover all London boroughs and the surrounding counties."
      },
      {
        "question": "How much CIS refund does a London subcontractor typically get?",
        "answer": "The illustrative average across registered subcontractors is around £2,000 for a standard year, but London subcontractors often receive more because working costs (van charges, ULEZ, congestion, long-distance mileage, higher tool and PPE costs) increase the allowable expenses that reduce taxable profit. Back-year claims covering up to four prior tax years routinely produce combined refunds significantly above this figure for first-time clients."
      },
      {
        "question": "Can I claim CIS refunds for working on HS2 or other large London sites?",
        "answer": "Yes. CIS applies to all qualifying construction work on large infrastructure and commercial schemes in the same way as any other site. If a main contractor such as SCS JV or BAM deducted 20% from your labour payments, that deduction feeds into your self-assessment return and can be reclaimed once your expenses and allowances are set against your income."
      },
      {
        "question": "What London-specific expenses can I claim as a CIS subcontractor?",
        "answer": "Travel mileage at 55p per mile (from 6 April 2026) is the biggest expense for most trades. London-specific costs that are allowable where incurred for work include ULEZ charges, the Congestion Charge if your work site is in the zone, parking permits, public transport fares to and from sites, and any site-specific PPE or tool requirements. We identify every legitimate expense when we prepare your return."
      },
      {
        "question": "I work for several main contractors across London. Does that cause problems?",
        "answer": "Not for the refund claim itself, but it does require careful reconciliation. Each contractor should issue you a CIS300 payment and deduction statement. We pull all of them together, cross-check the totals, identify any where materials have been wrongly included in the deduction base, and calculate the accurate refund figure before filing."
      },
      {
        "question": "What is the 30% CIS deduction and can I avoid it?",
        "answer": "Unregistered subcontractors are deducted at 30% rather than 20%. Registration with HMRC for CIS costs nothing and reduces your deduction rate immediately. If you are currently on 30%, call us and we will register you and notify your contractors so they switch to the 20% rate on your next payment."
      }
    ],
    "nearbyAreas": [
      "Croydon",
      "Bromley",
      "Enfield",
      "Barnet",
      "Hounslow",
      "Slough",
      "Watford",
      "Dartford"
    ]
  },

  "manchester": {
    "slug": "manchester",
    "name": "Manchester",
    "region": "Greater Manchester",
    "population": "570,000",
    "geo": {
      "lat": 53.4808,
      "lng": -2.2426
    },
    "intro": "<p>Manchester is one of the fastest-growing construction markets outside London, with billions of pounds of mixed-use development, commercial office schemes and residential regeneration currently on site or about to break ground across the city centre and inner suburbs. The CIS scheme underpins every trade on every contract here, and the pace of development in areas like Mayfield, NOMA, Salford and Wythenshawe means that groundworkers, electricians and fit-out trades move between projects constantly. A Manchester electrician with £38,000 in gross CIS labour income in 2025/26 will have had £7,600 deducted at the registered 20% rate; once mileage, tools and other allowable expenses are accounted for, a substantial portion of that is reclaimable.</p><p>Greater Manchester's CIS market extends well beyond the M60: Salford, Trafford, Stockport, Bolton and Oldham all have active construction pipelines and large subcontractor populations. We act for clients across the whole conurbation and serve them remotely, so there is no need to travel to an office. Most refund claims are turned around within eight weeks of us receiving your deduction statements, and we look back four years on every new client engagement to maximise the combined claim.</p>",
    "contractorScene": "<p>The largest live scheme in central Manchester is the Mayfield regeneration project, a 24-acre district around the former Mayfield railway station on the eastern edge of the city centre. Landsec appointed Bowmer and Kirkland as main contractor to build Republic, a 13-storey, 243,000 sq ft office building that broke ground in 2025 as the first net-zero commercial development of its scale in the North West. The second office phase, The Poulton (95,000 sq ft), and a major multi-modal transport hub are scheduled to start on site in 2026, alongside two large residential towers delivering 879 homes designed by Studio Egret West and shedkm. The overall Mayfield partnership involves the Greater Manchester Combined Authority, Transport for Greater Manchester and LCR, creating a public-private supply chain that feeds trades from groundworks and concrete frame through to M&E, fit-out and landscaping.</p><p>The NOMA district, immediately north of Manchester city centre, is in its next development phase following the completion of the Hanover and Dantzic buildings. Federated Hermes MEPC is bringing forward 2 Angel Square as the next major commercial building, and the 20-acre masterplan area continues to generate demand for demolition, civils and commercial fit-out contractors. Further south, Wythenshawe Civic Centre regeneration (on site from 2025) and the former Central Retail Park site (construction expected to begin 2026) add further pipeline for concrete-frame, M&E and finishing trades across South and East Manchester.</p><p>Manchester's subcontractor supply chain is distinctly regional: the M60 and M62 corridors serve as the main logistics arteries, with many trades based in Salford, Trafford, Stockport and the Pennine fringe commuting into city-centre sites daily. That mileage is fully claimable at 55p per mile from 6 April 2026. Fit-out and drylining are in particularly high demand given the volume of office and hotel completions planned for 2026 and 2027.</p>",
    "majorProjects": [
      {
        "name": "Mayfield, Republic office and residential phases",
        "detail": "Landsec and Bowmer and Kirkland are on site building the 13-storey, 243,000 sq ft Republic office building at the 24-acre Mayfield regeneration district. A second office building (The Poulton) and 879 new homes across two residential towers start on site in 2026, with the overall £1.4 billion scheme backed by the Greater Manchester Combined Authority and Transport for Greater Manchester."
      },
      {
        "name": "NOMA, 2 Angel Square (next phase)",
        "detail": "Federated Hermes MEPC is preparing to bring forward 2 Angel Square as the next major commercial building in the 20-acre NOMA district north of the city centre, continuing a regeneration programme that has been under way since 2012 and which already houses Amazon's first UK office outside London."
      },
      {
        "name": "Wythenshawe Civic Centre regeneration",
        "detail": "Construction began in 2025 on the Wythenshawe Civic Centre scheme, which will deliver a cultural and creative hub, a new public square and approximately 1,750 new homes in South Manchester, drawing groundwork, concrete frame and fit-out trades to the M23 corridor."
      },
      {
        "name": "Former Central Retail Park, East Manchester",
        "detail": "Manchester City Council acquired the 10.5-acre former Central Retail Park in 2017 and has programmed construction to begin in 2026, adding another major mixed-use scheme to the city-centre pipeline with residential, commercial and public-realm elements."
      }
    ],
    "tradeMix": [
      "electricians",
      "plumbers",
      "groundworkers",
      "dryliners",
      "joiners",
      "plasterers",
      "builders",
      "scaffolders",
      "painters-decorators",
      "roofers"
    ],
    "localFaqs": [
      {
        "question": "Do I need a CIS accountant based in Manchester to claim my refund?",
        "answer": "No. Our service is entirely remote. Manchester subcontractors send us their deduction statements and we handle everything online. CIS self-assessment returns are filed digitally with HMRC and we never need to meet face to face. We cover all Greater Manchester boroughs including Salford, Trafford, Stockport, Bolton, Wigan and Oldham."
      },
      {
        "question": "How much CIS refund does a Manchester subcontractor typically get?",
        "answer": "The illustrative average for a registered subcontractor is around £2,000, but the actual figure depends on your gross labour income, the allowable expenses you can claim and whether you are claiming back years. Subcontractors working on large Manchester schemes such as Mayfield often have higher materials and tool costs, which increases the refund. Back-year claims for up to four prior tax years are common on first engagement."
      },
      {
        "question": "I work across Greater Manchester for different contractors. Can you still help?",
        "answer": "Yes. Working for multiple contractors is common in the Manchester market and the refund process handles it straightforwardly: each contractor issues a CIS300 deduction statement and we pull them all together. The key requirement is that you keep all your deduction statements; if any are missing, we can often help you obtain duplicates from HMRC."
      },
      {
        "question": "What expenses can a Manchester CIS subcontractor claim?",
        "answer": "Mileage at 55p per mile from 6 April 2026 is typically the largest single expense, particularly for trades commuting along the M60 and M62. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. If you operate from a home office you may also claim use-of-home flat rates. We identify every legitimate expense when preparing your return."
      },
      {
        "question": "Does CIS apply to work on the Mayfield or NOMA developments?",
        "answer": "Yes. Both are standard CIS contracts: the main contractors (including Bowmer and Kirkland at Mayfield) verify subcontractors and deduct at 20% or 30% depending on CIS registration status. If you worked on either scheme and had 20% deducted, that feeds directly into your refund claim."
      }
    ],
    "nearbyAreas": [
      "Salford",
      "Trafford",
      "Stockport",
      "Bolton",
      "Oldham",
      "Wigan",
      "Rochdale"
    ]
  },

  "birmingham": {
    "slug": "birmingham",
    "name": "Birmingham",
    "region": "West Midlands",
    "population": "1,150,000",
    "geo": {
      "lat": 52.4862,
      "lng": -1.8904
    },
    "intro": "<p>Birmingham is in the middle of the most intense phase of construction investment in its modern history. HS2 Curzon Street station is rising from its foundations in the city centre, the £1.9 billion Smithfield regeneration is beginning enabling works, and a pipeline of residential and commercial schemes is responding to the city's population growth and post-Commonwealth Games momentum. Every trade on every one of these schemes operates under the Construction Industry Scheme, and the scale of the projects means CIS deductions are accumulating in large volumes. A Birmingham groundworker with £41,000 in gross CIS labour income in 2025/26 will have had £8,200 deducted at the registered 20% rate before expenses reduce the tax bill further, and in most cases a significant refund is owed after self-assessment.</p><p>We act for subcontractors across Birmingham and the wider West Midlands conurbation including Wolverhampton, Coventry, Dudley and Walsall. Our service is entirely remote and most new clients receive their first refund within 8 to 12 weeks of our first contact. Every new engagement includes a check on back-year entitlement covering up to four prior tax years, which for subcontractors who have not previously used a CIS accountant can produce a combined repayment well above the illustrative £2,000 annual average.</p>",
    "contractorScene": "<p>The dominant employer of construction labour in Birmingham right now is HS2. The Mace Dragados joint venture is the principal contractor on the Curzon Street terminus station, which at 500 metres long and 70 metres wide will be the largest new intercity terminus built in the UK since the Victorian era. Piling and foundation works delivered 2,000 concrete piles in 2025; façade works, concourse steelwork and roof construction are progressing through 2025 and 2026 on a programme that will carry through to fit-out completion in 2028. The station supports over 1,000 construction jobs during its main construction phase, drawing civil engineers, steelwork erectors, groundworkers, concrete frame contractors and M&E trades from across the West Midlands supply chain.</p><p>Adjacent to Curzon Street, Birmingham City Council and its partners are progressing the £1.9 billion Smithfield regeneration on 17 hectares of city-centre land formerly occupied by the wholesale markets. Lendlease, in joint venture with The Crown Estate, is the developer and delivery partner; a £173 million grant unlocked in mid-2025 is funding enabling works on the new Bull Ring Markets, up to 3,500 homes, commercial and cultural space, and two major public squares. Construction is scheduled to begin in earnest in early 2026, extending the demand for groundwork, frame, M&E and finishing trades well into the 2030s.</p><p>Beyond the two headline schemes, Birmingham's residential pipeline is substantial. The city council's 2026 high-rise masterplan proposes significant further development in the Eastside and Digbeth corridors, and the Jewellery Quarter continues to attract residential conversion and new-build schemes served by local bricklaying, plastering and roofing subcontractors. The A38 and M6 corridors function as the main construction supply arteries, with many West Midlands trades commuting from the Black Country and Coventry corridor.</p>",
    "majorProjects": [
      {
        "name": "HS2 Birmingham Curzon Street station (Mace Dragados JV)",
        "detail": "Mace Dragados joint venture, with Keltbray piling and MPB Structures on the substructure, is delivering the 500-metre HS2 terminus. Façade construction and concourse steelwork started in 2025 with the roof and internal fit-out progressing through 2026 to 2028; the project supports over 1,000 construction jobs."
      },
      {
        "name": "Smithfield Birmingham (Lendlease / The Crown Estate)",
        "detail": "A £173 million grant approved in 2025 unlocked enabling works on the £1.9 billion Smithfield regeneration: 17 hectares of former wholesale market land being redeveloped by Lendlease and The Crown Estate into up to 3,500 homes, new market buildings, offices, two public squares and a city park, with main construction beginning in early 2026."
      },
      {
        "name": "Eastside and Digbeth residential pipeline",
        "detail": "The city council's 2026 high-rise masterplan and ongoing conversion activity in Digbeth are generating a steady flow of residential schemes: concrete-frame, bricklaying, internal fit-out and roofing trades are active across multiple simultaneous sites in these inner-city neighbourhoods."
      },
      {
        "name": "West Midlands Metro extension works",
        "detail": "Ongoing Metro tram network extensions across the West Midlands are generating civils, rail infrastructure and highway reinstatement work for groundworkers, bricklayers and civil engineering subcontractors across the conurbation."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "scaffolders",
      "roofers",
      "plasterers",
      "builders",
      "demolition-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a CIS accountant in Birmingham to claim my refund?",
        "answer": "No. We act for Birmingham and West Midlands subcontractors entirely remotely. Your CIS deduction statements and expense records come to us digitally and we file your self-assessment return online. There is no need for a local office visit and we cover the full West Midlands including Wolverhampton, Coventry, Dudley, Walsall and Solihull."
      },
      {
        "question": "How much CIS refund does a Birmingham subcontractor typically get?",
        "answer": "The illustrative average is around £2,000 for a registered subcontractor in a standard year. On large schemes such as HS2 Curzon Street, where materials such as concrete, steel and plant are often contractor-supplied, a higher proportion of earnings may be labour and therefore subject to the 20% deduction, increasing the potential refund once allowable expenses are applied. First-time clients with unclaimed back years often receive substantially more."
      },
      {
        "question": "Does working on HS2 Curzon Street or Smithfield mean CIS applies?",
        "answer": "Yes. Both are standard CIS-qualifying construction contracts. If Mace Dragados or their sub-agents deducted 20% from your labour payments, those deductions count toward your refund calculation via self-assessment. We pull together all the deduction statements from a project, however many contractors were involved."
      },
      {
        "question": "What expenses can a Birmingham CIS subcontractor claim?",
        "answer": "Mileage at 55p per mile from 6 April 2026 is usually the largest expense. Tools, PPE, work clothing and the business proportion of your phone are also allowable. If you commute to Birmingham city-centre sites from the Black Country or Coventry, the daily mileage figure adds up quickly across a full year and increases your refund significantly."
      },
      {
        "question": "I have not claimed a CIS refund for three or four years. Is it too late?",
        "answer": "No. HMRC allows self-assessment refund claims going back four complete tax years. If you are a registered subcontractor who has had 20% deducted and has not filed returns, you may have four years of refunds sitting at HMRC. We handle the catch-up filing as a standard service for new clients."
      }
    ],
    "nearbyAreas": [
      "Wolverhampton",
      "Coventry",
      "Dudley",
      "Walsall",
      "Solihull",
      "Sutton Coldfield",
      "Bromsgrove"
    ]
  },

  "leeds": {
    "slug": "leeds",
    "name": "Leeds",
    "region": "West Yorkshire",
    "population": "815,000",
    "geo": {
      "lat": 53.8008,
      "lng": -1.5491
    },
    "intro": "<p>Leeds has one of the most active urban regeneration programmes in England outside London, with the South Bank corridor accounting for over 30 per cent of all construction schemes currently on site in the city. Vastint, Caddick and a pipeline of residential developers are delivering thousands of new homes, offices and public realm improvements between the city centre and the River Aire, and the CIS scheme applies to every subcontractor working on those sites. A Leeds groundworker with £42,000 in gross CIS labour income in 2025/26 will have had £8,400 deducted at the registered 20% rate; after mileage, tools and materials are accounted for, the typical refund is in the range of £2,000 or more for a full year of CIS deductions.</p><p>The Leeds subcontractor base extends across West Yorkshire: Bradford, Wakefield, Huddersfield and Harrogate all feed trades into the city's construction sites, and many operate under CIS for multiple contractors in the same tax year. We act for West Yorkshire subcontractors entirely remotely, and our first engagement always includes a look back at the four prior tax years to check for unclaimed refunds.</p>",
    "contractorScene": "<p>Leeds South Bank is the largest sustained urban regeneration zone in the north of England. Vastint UK, a subsidiary of IKEA's investment arm, is the anchor developer at Aire Park, a 24-acre mixed-use scheme on the former Tetley Brewery land and adjacent brownfield sites. Phase one delivered 190,000 sq ft of office space at 1 and 3 South Brook Street, and a full eight-acre public park opened in July 2025 as the UK's largest new city-centre park. The second phase, currently on site, is delivering 502 homes, 20,000 sq ft of flexible leisure space and a multi-storey car park, with the wider scheme projected to complete by 2032. The project draws groundworkers, concrete-frame contractors, M&E trades and finishing subcontractors from across the Leeds and Bradford corridor.</p><p>Adjacent to Aire Park, Caddick Group secured a £16 million Homes England infrastructure grant in 2025 to unlock South Village, a £1 billion, 10-acre scheme that will deliver up to 1,925 homes (nearly half two and three-bedroom units), 450 hotel beds and 70,000 sq m of commercial space between Meadow Road and the river. Infrastructure works including roads, utilities, cycleways and green space are now on site, with the first residential plots to follow. Caddick Construction, the group's contracting arm, is among the key employers of local subcontractors on Yorkshire residential and commercial schemes.</p><p>Temple Works in Holbeck, the Grade I listed 19th-century flax mill, is undergoing a £35 million restoration to become a new British Library North, adding specialist heritage and structural-repair trades to the South Bank mix. Across Leeds city centre, a crane-count survey in early 2026 recorded six live South Bank schemes delivering over 2,000 homes and 235,000 sq ft of offices simultaneously. Northern Accountants and other regional firms focus their CIS marketing on the Leeds market, making it a competitive geography, but we offer a UK-wide remote service and on-site knowledge of the local project pipeline.</p>",
    "majorProjects": [
      {
        "name": "Aire Park phase 2 (Vastint UK)",
        "detail": "Vastint UK is on site with the second phase of its 24-acre Aire Park development, delivering 502 homes, 20,000 sq ft of leisure space and a multi-storey car park alongside the eight-acre public park that opened in July 2025. The overall scheme will ultimately deliver 1,400 homes, 800,000 sq ft of offices and the UK's largest new city-centre park."
      },
      {
        "name": "South Village (Caddick / Homes England)",
        "detail": "Caddick Group is delivering infrastructure works on the £1 billion South Village scheme after securing a £16 million Homes England grant in 2025. The 10-acre site adjacent to Meadow Road will deliver 1,925 homes, 450 hotel beds and 70,000 sq m of commercial space, with the first residential plots emerging from 2025 onward."
      },
      {
        "name": "Temple Works (British Library North)",
        "detail": "The Grade I listed Temple Works flax mill in Holbeck is undergoing a £35 million restoration and conversion into a new British Library North, creating approximately 8,000 sq m of space and requiring specialist heritage masonry, structural steelwork and conservation trades."
      },
      {
        "name": "Leeds city centre residential pipeline",
        "detail": "A crane-count survey in early 2026 recorded six live South Bank schemes simultaneously delivering over 2,000 homes and 235,000 sq ft of offices, with further city-centre residential approvals in the pipeline through the council's growth-led local plan."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "joiners",
      "plasterers",
      "scaffolders",
      "roofers",
      "builders",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "Do I need a CIS accountant in Leeds to claim my refund?",
        "answer": "No. We provide a fully remote service for Leeds and West Yorkshire subcontractors. You share your CIS300 deduction statements and expense information with us online and we do everything else, including filing your self-assessment return with HMRC. We cover Bradford, Wakefield, Huddersfield, Harrogate and the surrounding areas as well as Leeds itself."
      },
      {
        "question": "How much CIS refund does a Leeds subcontractor typically get?",
        "answer": "The illustrative average is around £2,000 for a registered subcontractor with a full year of CIS deductions. Groundworkers and civil-engineering trades working on South Bank schemes often have higher materials costs (plant, aggregates, drainage products) which are excluded from the CIS deduction base but can be reclaimed as allowable expenses, potentially increasing the refund. Back-year claims for up to four prior tax years are available and many first-time clients receive a combined figure well above the annual average."
      },
      {
        "question": "I worked on Aire Park or South Village. Does CIS apply?",
        "answer": "Yes. Both are CIS-qualifying construction contracts and main contractors including Vastint UK and Caddick Construction deduct at 20% from registered subcontractors. Every deduction statement you received from those projects feeds into your self-assessment refund calculation."
      },
      {
        "question": "What expenses can a Leeds CIS subcontractor claim?",
        "answer": "Mileage at 55p per mile from 6 April 2026 is usually the single largest expense, especially for trades commuting to city-centre sites from Bradford, Wakefield or Harrogate. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. We identify every legitimate expense before submitting your return."
      },
      {
        "question": "Can I still claim CIS refunds if I have not filed self-assessment for several years?",
        "answer": "Yes. HMRC allows claims for up to four complete prior tax years. If you have been deducted at 20% and have not filed, you may have multiple years of refunds unclaimed. We handle catch-up filings as a standard part of our first-engagement service."
      },
      {
        "question": "What is Gross Payment Status and should I apply for it as a Leeds subcontractor?",
        "answer": "Gross Payment Status (GPS) lets you receive the full value of your invoices with no CIS deduction (0% instead of 20%). To qualify as a sole trader you need at least £30,000 in net annual CIS turnover and a clean compliance record for the past 12 months. If you meet those tests, GPS is highly beneficial for cash flow. Note that the April 2026 Finance Act tightened the GPS regime with a five-year reapplication ban and due-diligence obligations, so it is worth taking specialist advice before applying. We assess GPS eligibility as part of our full-service engagement."
      }
    ],
    "nearbyAreas": [
      "Bradford",
      "Wakefield",
      "Huddersfield",
      "Harrogate",
      "Halifax",
      "Castleford",
      "Wetherby"
    ]
  },

  "bristol": {
    "slug": "bristol",
    "name": "Bristol",
    "region": "South West England",
    "population": "475,000",
    "geo": {
      "lat": 51.4545,
      "lng": -2.5879
    },
    "intro": "<p>Bristol's construction market is in a sustained growth phase, anchored by the £500 million Temple Quarter Enterprise Campus completing in 2026, the just-approved £350 million Temple Island development, and a broader regeneration of the Temple Meads corridor that will ultimately deliver 10,000 new homes and major new public transport infrastructure. The CIS scheme applies across all of this work, and Bristol's relatively compact geography means subcontractors frequently work across multiple sites in the same week. A Bristol plumber on a Temple Quarter residential scheme with £36,000 in gross CIS labour income in 2025/26 will have had £7,200 deducted at the registered 20% rate; after travel costs, tools and materials are set against income, a significant refund is typically owed.</p><p>We act for CIS subcontractors across the Bristol and South West market, including Bath, Weston-super-Mare, Gloucester, Swindon and the surrounding counties, entirely by remote. The South West construction market is often characterised by a higher proportion of smaller specialist subcontractors working for regional Tier 2 contractors rather than national Tier 1 firms, which means CIS registration status and deduction errors are more common and the refund opportunity is proportionally significant.</p>",
    "contractorScene": "<p>The most active single construction site in Bristol in 2025 and 2026 is the Temple Quarter Enterprise Campus, a £500 million project commissioned by the University of Bristol on the site of the former Royal Mail sorting office adjacent to Bristol Temple Meads station. Sir Robert McAlpine is the principal contractor on the 38,350 sq m six-storey academic building, which will accommodate 4,600 students and 650 staff when it opens in September 2026. The project required substantial groundwork and enabling works, concrete frame, curtain-wall glazing, M&E fit-out and landscaping, and Sir Robert McAlpine's subcontract packages have drawn trades from across the Bristol, Bath and South West supply chain. Alongside the main building, a £23 million eastern entrance to Bristol Temple Meads station is under construction, adding further civils and rail infrastructure work to the immediate vicinity.</p><p>Immediately adjacent, Legal and General's £350 million Temple Island development was approved by Bristol City Council in April 2026. Designed by Zaha Hadid Architects, the 2.7-hectare former rail depot site will deliver 520 homes across four residential buildings, two office buildings, flexible workspace and a 164-room hotel with conference facilities. Sanctus is carrying out enabling works and remediation; a main construction contractor is expected to be appointed in 2026 as the scheme progresses from planning into delivery. The combined Temple Island and Temple Quarter Enterprise Campus developments create a concentrated zone of construction activity that will run through to 2030.</p><p>The wider Temple Quarter regeneration framework, with development partner Muse selected by the West of England Combined Authority in January 2026, sets out 10,000 new homes, extensive commercial space and major public realm and connectivity improvements across the St Philip's Marsh corridor. This is a decade-long pipeline that will sustain demand for Bristol-area groundworkers, bricklayers, electricians, plumbers and finishing trades well into the 2030s. The M5 and A4 corridors serve as the main supply routes, with many Bristol subcontractors based in Keynsham, Clevedon, Nailsea and Yate.</p>",
    "majorProjects": [
      {
        "name": "Temple Quarter Enterprise Campus (Sir Robert McAlpine)",
        "detail": "Sir Robert McAlpine completed the 38,350 sq m, £500 million University of Bristol academic building at Temple Quarter in May 2026, ahead of the September 2026 opening. The project has been one of the largest construction contracts in the South West in recent years, employing concrete-frame, M&E and fit-out subcontractors from across Bristol and Bath."
      },
      {
        "name": "Temple Island (Legal and General, £350m)",
        "detail": "Legal and General's £350 million Temple Island scheme, designed by Zaha Hadid Architects and approved by Bristol City Council in April 2026, will deliver 520 homes, offices and a 164-room hotel on a 2.7-hectare brownfield site adjacent to Temple Meads. Sanctus has begun enabling works and remediation, with main construction expected to follow in 2026."
      },
      {
        "name": "Bristol Temple Meads Eastern Entrance",
        "detail": "A £23 million new eastern entrance to Bristol Temple Meads station, funded from a £95 million government grant to the Bristol Temple Quarter LLP, is under construction with an opening date aligned with the September 2026 Campus launch, adding civils, structural and fit-out packages to the corridor."
      },
      {
        "name": "Temple Quarter masterplan (Muse, 10,000 homes)",
        "detail": "West of England Combined Authority appointed Muse as preferred development partner in January 2026 to deliver the broader Temple Quarter regeneration: 10,000 new homes, significant commercial space and major public realm improvements across the St Philip's Marsh corridor, providing a decade-long construction pipeline for Bristol-area trades."
      }
    ],
    "tradeMix": [
      "plumbers",
      "electricians",
      "groundworkers",
      "roofers",
      "builders",
      "joiners",
      "plasterers",
      "bricklayers",
      "scaffolders",
      "gas-engineers"
    ],
    "localFaqs": [
      {
        "question": "Do I need a CIS accountant based in Bristol to claim my refund?",
        "answer": "No. We act for Bristol and South West subcontractors entirely remotely. There are no local office visits required: you share your deduction statements and expense information with us online and we file your self-assessment return digitally. We cover Bath, Weston-super-Mare, Gloucester, Swindon, Taunton and the wider South West."
      },
      {
        "question": "How much CIS refund does a Bristol subcontractor typically get?",
        "answer": "The illustrative average is around £2,000 for a registered subcontractor with a full year of CIS deductions. Bristol trades working on schemes like Temple Quarter or Temple Island often have significant tool, PPE and travel expenses, all of which reduce taxable profit and increase the refund. Clients who have not claimed for several years are often entitled to a combined figure across up to four prior tax years that is substantially higher."
      },
      {
        "question": "Does CIS apply to work on the Temple Quarter or Temple Island projects?",
        "answer": "Yes. Both are standard CIS-qualifying construction contracts. If Sir Robert McAlpine or a sub-agent deducted 20% from your labour payments on the Temple Quarter campus, or if you receive payments on the Temple Island scheme when it moves into main construction, those deductions count toward your annual refund calculation via self-assessment."
      },
      {
        "question": "What expenses can a Bristol CIS subcontractor claim?",
        "answer": "Mileage at 55p per mile from 6 April 2026 is generally the largest claim for most Bristol trades, particularly those travelling from Keynsham, Yate, Clevedon or Weston-super-Mare to city-centre sites. Tools, PPE, work clothing, professional subscriptions and the business proportion of your phone are also allowable. We identify and document every legitimate expense before submitting your return."
      },
      {
        "question": "I am a sole trader plumber or electrician in Bristol. Does CIS apply to all my jobs?",
        "answer": "CIS applies when you are paid by a contractor (not an end-user homeowner directly) for qualifying construction work. If you work on commercial or residential development sites for main contractors or Tier 2 contractors, CIS almost certainly applies and deductions are being made. Private domestic work paid directly by homeowners is outside CIS. If you are unsure whether your work falls within CIS, call us for a free assessment."
      },
      {
        "question": "What is the CIS deduction rate and how does the refund work?",
        "answer": "Registered subcontractors are deducted at 20% on the labour element of their invoices. The materials portion is excluded from the deduction base. At year end you file a self-assessment return that sets your allowable expenses and personal allowance against your gross income, which almost always results in the actual tax owed being less than the total CIS deducted during the year. HMRC repays the difference, typically within 5 to 10 working days of the return being processed. The average illustrative refund is around £2,000 though the actual amount varies by income and expenses."
      }
    ],
    "nearbyAreas": [
      "Bath",
      "Weston-super-Mare",
      "Clevedon",
      "Keynsham",
      "Yate",
      "Nailsea",
      "Portishead",
      "Gloucester"
    ]
  },

  "glasgow": {
    "slug": "glasgow",
    "name": "Glasgow",
    "region": "Greater Glasgow",
    "population": "635,000",
    "geo": {
      "lat": 55.8642,
      "lng": -4.2518
    },
    "intro": "<p>Glasgow's construction sector is in the middle of its biggest transformation in a generation, with the £1 billion Glasgow City Region City Deal funding major public realm and infrastructure works across the city centre while large-scale residential schemes reshape the Clyde waterfront. For CIS-registered subcontractors working on these projects, deductions of 20% are taken from the labour element of every payment before the money reaches your account, which means most subcontractors accumulate a refund entitlement across the tax year.</p>\n<p>A Glasgow plasterer earning £38,000 gross from a contractor, with £400 in materials excluded from the deduction base, might have £7,520 deducted under CIS over the year. After claiming allowable expenses (tools, PPE, mileage at 55p per mile from 6 April 2026, use-of-home costs), the actual tax owed is typically far less than the amount deducted, generating a refund that averaged around £2,000 across Trade Tax Specialists' client base. We handle the Self Assessment return and the full reclaim process, from the first year through to the four prior years still open for recovery.</p>\n<p>Note for Glasgow-based subcontractors: the CIS scheme operates identically across the whole of the UK, so your deduction rate, registration process and refund mechanics are the same as anywhere in England or Wales. However, because Scotland has its own Income Tax rate structure, the amount of tax you actually owe on your self-employed profits is calculated using Scottish Income Tax rates when HMRC processes your Self Assessment return. Your accountant must use the correct Scottish bands to compute the final liability, which affects the size of your refund.</p>",
    "contractorScene": "<p>Glasgow's construction labour market operates across three distinct corridors in 2025 and 2026. The city centre Avenues programme, funded through the City Deal, has Rainton Construction on site at George Square (£20.5m contract, on site from May 2025, completing August 2026) alongside concurrent streetscape works on Cowcaddens Road, Duke Street, North Hanover Street and South Portland Street. These civils-heavy schemes draw heavily on groundworkers, civil engineers, bricklayers and landscaping operatives, many working as CIS-registered sole traders through the Avenues supply chain.</p>\n<p>On the Clyde waterfront, Peel Waters' Glasgow Waters regeneration at Yorkhill Quay appointed Advance Construction Scotland in March 2026 on a £3.75m infrastructure contract (roads, utilities, public realm) due to complete December 2026, unlocking land for over 1,100 new homes. Further along the waterfront, GRAHAM Construction holds the Clyde Waterfront and Renfrew Riverside civils contract for Renfrewshire Council, with all sub-contract packages over £10,000 publicly advertised, making it an accessible pipeline for registered subcontractors in groundworks, scaffolding, temporary electrics and drainage.</p>\n<p>The residential pipeline adds a third layer of demand. The Shawlands regeneration Phase 1 (329 apartments, £150m) and the Lancefield Quay area continue to draw joiners, plasterers, dryliners and painters-decorators. The Barbour ABI top-30 list for Glasgow in 2026 includes further student accommodation and build-to-rent schemes that sustain steady year-round demand for fit-out trades. In-demand trades across the city include groundworkers and civil engineers on the public-realm corridor, followed by joiners, dryliners and plasterers on the residential fit-out pipeline. Scaffolders are consistently busy across all project types.</p>",
    "majorProjects": [
      {
        "name": "George Square Transformation (Rainton Construction)",
        "detail": "Rainton Construction is delivering the £20.5m George Square revamp under the Glasgow City Deal Avenues programme, with works on site from May 2025 and the square scheduled to begin reopening from August 2026, with full completion reported for autumn 2026."
      },
      {
        "name": "Yorkhill Quay Infrastructure, Glasgow Waters (Advance Construction Scotland)",
        "detail": "Advance Construction Scotland began a £3.75m roads, utilities and public realm infrastructure contract at Yorkhill Quay in March 2026, completing December 2026, to unlock over 1,100 homes on the Clyde waterfront."
      },
      {
        "name": "Clyde Waterfront and Renfrew Riverside (GRAHAM Construction)",
        "detail": "GRAHAM holds the civils contract for the Clyde Waterfront and Renfrew Riverside project, with all sub-contract packages over £10,000 publicly advertised, creating an active supply-chain pipeline for Scottish subcontractors."
      },
      {
        "name": "Shawlands Regeneration Phase 1 (329 apartments)",
        "detail": "The £150m Shawlands mixed-use scheme, ranked first in Barbour ABI's top-30 Glasgow projects for 2026, is driving sustained demand for fit-out trades across joinery, plastering and decorating."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "scaffolders",
      "joiners",
      "plasterers",
      "dryliners",
      "painters-decorators",
      "electricians",
      "plumbers",
      "bricklayers"
    ],
    "localFaqs": [
      {
        "question": "Do Scottish Income Tax rates affect my CIS refund in Glasgow?",
        "answer": "Yes, but only at the Self Assessment stage. The CIS deduction rate itself (20% on your labour payments, or 30% if unregistered) is the same across the whole UK. The difference is that when HMRC calculates how much tax you actually owe, it applies Scottish Income Tax rates to your self-employed profits rather than the rUK rates. This can change the size of your refund compared with a subcontractor doing identical work in England. We file the correct Scottish Self Assessment return so you receive the right refund."
      },
      {
        "question": "Can I claim a CIS refund even if I worked on multiple Glasgow sites?",
        "answer": "Yes. CIS deductions from every contractor you worked for during the tax year are pooled on your Self Assessment return. We gather the payment and deduction statements from each contractor, total the deductions, offset your allowable expenses, and calculate the net refund due. Working across several Glasgow City Deal sites or the Clyde waterfront simultaneously is common and makes no difference to the reclaim process."
      },
      {
        "question": "How much could a Glasgow subcontractor typically get back?",
        "answer": "The average CIS refund we see is around £2,000, though the actual figure depends on your gross income, the labour-versus-materials split on your invoices, and the expenses you can legitimately claim (tools, PPE, mileage at 55p per mile from April 2026, use of home). We can look back up to four prior tax years if you have not claimed before."
      },
      {
        "question": "Do I need to be based in Glasgow for you to handle my CIS return?",
        "answer": "No. Trade Tax Specialists operates UK-wide. We work with subcontractors in Glasgow and across Scotland entirely remotely, using secure document sharing for your payment and deduction statements. You do not need to visit any office."
      },
      {
        "question": "I am unregistered and have had 30% deducted. Can I still claim back?",
        "answer": "Yes. Unregistered subcontractors pay 30% on the labour element instead of 20%, which typically means a larger refund once expenses and the personal allowance are applied at Self Assessment. We would also register you for CIS at the same time so future payments are deducted at 20%, saving you 10 percentage points on every labour invoice going forward."
      }
    ],
    "nearbyAreas": [
      "Paisley",
      "Motherwell",
      "Hamilton",
      "Clydebank",
      "Dumbarton",
      "Rutherglen",
      "Kirkintilloch"
    ]
  },

  "edinburgh": {
    "slug": "edinburgh",
    "name": "Edinburgh",
    "region": "City of Edinburgh",
    "population": "530,000",
    "geo": {
      "lat": 55.9533,
      "lng": -3.1883
    },
    "intro": "<p>Edinburgh's construction market is sustained by a combination of major public infrastructure projects, a £1.3 billion coastal regeneration programme at Granton Waterfront, and a continuous programme of refurbishment and restoration work on the city's historic built fabric. CIS applies to all construction work in Edinburgh in exactly the same way as anywhere else in the UK: contractors deduct 20% from the labour element of your payment (30% if you are not registered) before you receive it, with materials excluded from the deduction base.</p>\n<p>A typical Edinburgh groundworker or joiner earning £40,000 gross over the tax year might have £8,000 deducted in CIS. After subtracting legitimate expenses such as travel at 55p per mile (the rate from 6 April 2026), tools, PPE and protective clothing, the amount of tax actually owed is usually significantly less than the amount deducted, producing a refund. Our clients typically recover around £2,000 on average, and we can look back four years if you have not filed before.</p>\n<p>Edinburgh subcontractors should be aware that Scottish Income Tax rates apply to the self-employed profits on your Self Assessment return. The CIS deduction rate itself is UK-wide and unchanged, but the final tax liability (and therefore the refund) is calculated using Scottish Income Tax bands, not the rUK bands. Filing the correct Scottish return is essential to getting the right refund, and it is something we handle as standard for all Edinburgh clients.</p>",
    "contractorScene": "<p>Edinburgh's construction activity in 2025 and 2026 is shaped by three concurrent programmes. The most structurally significant is the Granton Waterfront regeneration: the £1.3 billion coastal town project received government funding approval in late 2025, with decontamination, groundwork and enabling works commencing in early 2026 under the City of Edinburgh Council's procurement programme. Phase one alone covers 847 net-zero-ready homes (387 affordable, delivered with Cruden Homes), a new primary school and commercial space, all generating demand for groundworkers, civil engineers, electricians, plumbers and joiners across North Edinburgh over multiple years.</p>\n<p>Running in parallel is the North Bridge refurbishment, where Balfour Beatty is completing a structurally complex £86m overhaul of the Victorian arch bridge. This project has required specialist scaffolding trades, steelwork and corrosion-protection operatives working in confined historic access conditions since its original tender; completion is expected in 2026. The West Edinburgh Link active-travel infrastructure scheme (segregated cycleways, streetscape improvements) represents a further civils and public-realm pipeline on the western approach corridor, drawing groundworkers and surfacing operatives.</p>\n<p>Edinburgh's residential and mixed-use pipeline adds depth to the fit-out trade market. The Leith Waterfront active-travel and public realm improvements (Phase 1A completed December 2025) continue to generate follow-on residential and commercial fit-out work in Leith. Across the city, the density of historic buildings means that joiners, plasterers and painters-decorators with experience in traditional or period properties are consistently in demand in Edinburgh's refurbishment sector. Scaffolders working on restoration projects face Edinburgh's specific topography: steep closes, elevated vantage points and restricted access in the Old Town create bespoke scaffolding requirements that sustain a distinct local demand for specialist scaffolding trades.</p>",
    "majorProjects": [
      {
        "name": "Granton Waterfront Phase 1 (847 homes, Cruden Homes / City of Edinburgh Council)",
        "detail": "The £1.3bn Granton Waterfront regeneration broke ground in early 2026, with phase one delivering 847 net-zero homes and a new primary school on Edinburgh's largest brownfield site, sustaining multi-year demand for groundworkers, civils and fit-out trades."
      },
      {
        "name": "North Bridge Refurbishment (Balfour Beatty)",
        "detail": "Balfour Beatty is completing the £86m structural overhaul of Edinburgh's North Bridge, involving grit blasting, steelwork repairs and cast-iron facade restoration, with full completion expected in 2026."
      },
      {
        "name": "Silverlea Housing (143 net-zero homes)",
        "detail": "A further 143 social and mid-market rent homes at Silverlea form part of the Granton programme and are due for completion in summer 2026, adding to the immediate fit-out pipeline in North Edinburgh."
      },
      {
        "name": "West Edinburgh Link Active Travel Infrastructure",
        "detail": "This segregated cycleway and streetscape scheme on the western approach corridor was under construction through 2025 and into 2026, providing civils and surfacing work for groundworkers and civil engineers."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "joiners",
      "plasterers",
      "scaffolders",
      "electricians",
      "plumbers",
      "painters-decorators",
      "bricklayers",
      "roofers"
    ],
    "localFaqs": [
      {
        "question": "Does CIS work differently in Scotland compared with England?",
        "answer": "The CIS scheme itself is identical throughout the UK. The same deduction rates (20% for registered subcontractors, 30% for unregistered, 0% for those with Gross Payment Status) apply in Edinburgh as they do in London or Manchester. The difference is at Self Assessment: HMRC uses Scottish Income Tax rates to work out how much tax you actually owe on your profits, which can alter the size of the refund. We file the correct Scottish SA return as standard for all Edinburgh clients."
      },
      {
        "question": "Can I claim for mileage travelling to Edinburgh construction sites?",
        "answer": "Yes, if you use your own vehicle for business travel between your home and temporary workplaces (the vast majority of construction sites). The approved mileage rate from 6 April 2026 is 55p per mile for the first 10,000 business miles, up from 45p. Edinburgh's geography means many subcontractors travel from Fife, Midlothian, East Lothian or West Lothian, and this mileage accumulates quickly into a meaningful expense claim that reduces the tax you owe."
      },
      {
        "question": "How do I get my CIS payment and deduction statements from Edinburgh contractors?",
        "answer": "Your contractor must issue a payment and deduction statement for every payment they make to you, showing the gross amount, any materials excluded, the amount subject to deduction, and the deduction taken. If they have not issued these, contact them directly. We can advise you on what to request and work with whatever records you have available."
      },
      {
        "question": "Do I need to be registered for Self Assessment to claim a CIS refund in Edinburgh?",
        "answer": "Yes. CIS refunds for sole-trader subcontractors are processed through the Self Assessment tax return. If you are not yet registered for Self Assessment, we register you as part of our onboarding process. The refund for the last tax year is typically paid within 5 to 10 working days of HMRC processing the online return."
      },
      {
        "question": "Can I recover four years of CIS deductions if I have never filed in Edinburgh?",
        "answer": "Yes. HMRC allows you to amend or file late Self Assessment returns for the four tax years immediately preceding the current one. If you have been working under CIS in Edinburgh for several years without filing, there may be a substantial combined refund available. We handle the full lookback as part of our service."
      }
    ],
    "nearbyAreas": [
      "Livingston",
      "Dunfermline",
      "Kirkcaldy",
      "Musselburgh",
      "Bathgate",
      "Dalkeith",
      "Linlithgow"
    ]
  },

  "sheffield": {
    "slug": "sheffield",
    "name": "Sheffield",
    "region": "South Yorkshire",
    "population": "584,000",
    "geo": {
      "lat": 53.3811,
      "lng": -1.4701
    },
    "intro": "<p>Sheffield's construction sector has its roots in the steel and heavy engineering industries that shaped South Yorkshire, and in 2025 and 2026 those traditions are being channelled into a significant city-centre regeneration programme. The £300 million West Bar Quarter, the £15 million Castlegate riverside park and the wider Gleadless Valley housing programme are all generating sustained demand for trades across civil engineering, structural work, fit-out and groundworks. CIS-registered subcontractors on these projects have 20% deducted from the labour element of every payment before it reaches them, with the cost of materials they supply excluded from the calculation.</p>\n<p>A Sheffield groundworker or electrician earning £36,000 gross in a tax year might have £7,200 deducted in CIS. After allowable expenses including mileage at 55p per mile from April 2026, tools, PPE and any use-of-home costs, the tax actually owed is typically a good deal lower, generating a refund. Our clients' average refund runs to around £2,000, and we can recover up to four years of overpaid deductions for tradespeople who have not filed before. We operate entirely remotely, so there is no need to visit an office in Sheffield or anywhere else.</p>",
    "contractorScene": "<p>Sheffield's construction market in 2025 and 2026 is anchored by three major programmes running simultaneously. The West Bar Quarter, a £300 million brownfield regeneration on Sheffield's Inner Ring Road, completed its Phase 1 build programme under principal contractor Bowmer and Kirkland in April 2025, delivering 100,000 sq ft of grade A office space and 368 build-to-rent apartments. Phase 2 planning and enabling works are progressing alongside the completed Phase 1, sustaining demand in the Kelham Island and West Bar corridor for groundworkers, civils operatives and fit-out trades into 2026 and beyond.</p>\n<p>Across the city centre, the Castlegate Sheaf Field Park project is being delivered by Aureos (formerly Keltbray) under the YORcivil Major Works framework for Sheffield City Council. The £15 million scheme, with main works beginning in August 2024, uncovered a section of the River Sheaf for the first time in over 100 years and is due for completion in spring 2026. The project has required specialist groundworks, retaining-wall and geotechnical engineering, and represents the kind of complex civils contract that draws subcontractors from across South Yorkshire. Meanwhile, the Sheffield Gleadless Valley \"Vision for the Valley\" plan, published in late 2025, maps 12 major projects including around 1,100 new homes and four upgraded parks across the east of the city, providing a forward pipeline for groundworkers, builders and landscaping trades.</p>\n<p>Sheffield's steel heritage persists in its construction supply chain: structural steelwork fabricators and erectors remain active across South Yorkshire, and the city's residential and commercial pipeline draws joiners, electricians and plumbers from a broad catchment taking in Rotherham, Barnsley and Doncaster. The leisure rebuild programme (three leisure centres at Springs, Concord and Hillsborough, £117m combined) is adding further public-sector civils and fit-out work from 2026 onwards.</p>",
    "majorProjects": [
      {
        "name": "West Bar Quarter Phase 1 (Bowmer and Kirkland)",
        "detail": "Bowmer and Kirkland completed the Phase 1 build programme of the £300m West Bar Quarter in April 2025, delivering a 100,000 sq ft grade A office block and 368 BTR apartments; Phase 2 enabling and planning work continues through 2026."
      },
      {
        "name": "Castlegate Sheaf Field Park (Aureos / YORcivil framework)",
        "detail": "Aureos is delivering the £15m Castlegate project for Sheffield City Council, uncovering the River Sheaf for the first time since 1917 and creating a new public park; main works began August 2024 with completion due spring 2026."
      },
      {
        "name": "Fargate Event Central",
        "detail": "Sheffield City Council received £15.8m of government funding for an Event Central on Fargate, with construction beginning summer 2025, bringing entertainment, co-working and cultural space to the pedestrianised city-centre corridor."
      },
      {
        "name": "Gleadless Valley Housing Programme (12 sub-projects)",
        "detail": "The Vision for the Valley plan, published late 2025, sets out 12 major projects including approximately 1,100 new homes and four upgraded parks across east Sheffield, providing a multi-year forward pipeline for housebuilding trades."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "bricklayers",
      "joiners",
      "electricians",
      "plumbers",
      "plasterers",
      "painters-decorators",
      "scaffolders",
      "dryliners"
    ],
    "localFaqs": [
      {
        "question": "Can a Sheffield subcontractor claim a CIS refund if they also work in Rotherham or Barnsley?",
        "answer": "Yes. CIS deductions from every contractor across South Yorkshire and beyond are consolidated on your Self Assessment return. There is no geographic limit: we total the deductions from all your contractors, apply your expenses, and calculate the refund. Many Sheffield-based subcontractors work across a wide radius including Rotherham, Barnsley, Doncaster and Chesterfield, and all those earnings and deductions go into the same return."
      },
      {
        "question": "How much could I realistically get back as a Sheffield CIS subcontractor?",
        "answer": "The average refund across our client base is around £2,000, but the figure varies with your gross income, the share of labour versus materials in your invoices, and the expenses you can claim. A groundworker driving to multiple Sheffield sites daily may accumulate significant mileage at 55p per mile from April 2026, which reduces the taxable profit and increases the refund. We can estimate the figure once we see your payment and deduction statements."
      },
      {
        "question": "Do I need to register for CIS separately if I mainly work on Sheffield City Council contracts?",
        "answer": "The CIS registration process is the same regardless of who the main contractor is. From April 2026, there is a new public sector exemption (Regulation 24ZA) that removes CIS from certain payments made directly to local authorities, but this applies to the local authority as the party receiving payment, not to subcontractors working on council-funded projects in the normal supply chain. As a subcontractor, your position is unchanged."
      },
      {
        "question": "I work in structural steelwork in Sheffield. Does CIS cover my labour?",
        "answer": "Yes. Structural steelwork erection and installation is a specified CIS construction operation when it forms part of a building or structure. If you are a subcontractor erecting steel frames on a Sheffield construction site, your contractor should be deducting 20% from the labour element of your payments (not the materials). We can advise on whether any specific element of your work might fall outside the CIS definition."
      },
      {
        "question": "Can you handle my CIS return if I am based outside Sheffield but work there regularly?",
        "answer": "Yes. Trade Tax Specialists operates UK-wide and entirely remotely. Where you are based does not matter: what matters is that you have been paid under CIS, had deductions made, and want to recover any overpaid tax through Self Assessment. We need your payment and deduction statements, which your contractors must provide."
      }
    ],
    "nearbyAreas": [
      "Rotherham",
      "Barnsley",
      "Doncaster",
      "Chesterfield",
      "Worksop",
      "Stocksbridge",
      "Chapeltown"
    ]
  },

  "liverpool": {
    "slug": "liverpool",
    "name": "Liverpool",
    "region": "Merseyside",
    "population": "498,000",
    "geo": {
      "lat": 53.4084,
      "lng": -2.9916
    },
    "intro": "<p>Liverpool is entering one of the most active construction periods in its recent history. The Central Docks infrastructure programme, the King Edward Triangle waterfront scheme and the approved £100 million Baltic Station rail project are drawing Tier 1 contractors and a broad supply chain of CIS-registered subcontractors to the city. For tradespeople on these projects, the CIS deduction rules are straightforward: 20% is taken from the labour element of your payment (30% if you are unregistered), with the cost of materials you supply separately excluded from the calculation.</p>\n<p>A Liverpool electrician or plumber earning £34,000 gross over the tax year might have £6,800 deducted in CIS. After claiming allowable expenses including mileage at 55p per mile from April 2026, tools, PPE, specialist equipment and any protective clothing, the tax actually owed is typically significantly less than the amount deducted, leaving a refund due through Self Assessment. Our clients across Merseyside typically recover around £2,000 on average, and we can look back up to four prior tax years if you have not claimed before.</p>",
    "contractorScene": "<p>Liverpool's construction market is structured around its waterfront regeneration corridor, which is generating the most significant volume of civils and infrastructure work in 2025 and 2026. GRAHAM Construction holds a £71 million civils contract at Liverpool Waters' Central Docks, designing and constructing roads, underground utilities and 2.1 hectares of public realm (Central Park) to unlock land for approximately 2,350 new homes. The contract was awarded through the Pagabo Civil Engineering and Infrastructure Framework in September 2025, with a spring 2028 target for completion. This project alone sustains a substantial supply chain of groundworkers, civil engineers and drainage operatives in the northern waterfront corridor.</p>\n<p>Further north on the waterfront, the £1 billion King Edward Triangle scheme, promoted by KEIE (part of the TJ Morris group) with Beetham, is advancing detailed planning applications in 2026 for close to 3,000 homes and a five-star hotel in a cluster of high-rise buildings on the northern docks. This scale of residential high-rise development draws specialist formwork, steelwork, drainage and M and E subcontractors at the enabling and structural phases. Morgan Sindall Group has four active Liverpool projects valued at £78 million in the 2026 Barbour ABI pipeline, with Bellway Homes delivering a further £65 million residential scheme.</p>\n<p>Outside the waterfront, the Bootle Strand town centre regeneration in Sefton is advancing through preparation and structural work throughout 2026, and the broader Merseyside pipeline includes steady residential and commercial fit-out demand that draws joiners, dryliners, painters-decorators, electricians and plumbers from across Liverpool, Knowsley, St Helens and Wirral. The approved Liverpool Baltic Station (£100 million, delivery target end of 2027) will add a further civils and groundworks phase to the south of the city centre when construction begins.</p>",
    "majorProjects": [
      {
        "name": "Central Docks Infrastructure (GRAHAM Construction, £71m)",
        "detail": "GRAHAM Construction began a £71m civils contract at Liverpool Waters' Central Docks in September 2025, delivering roads, underground utilities and a 2.1-hectare Central Park to unlock approximately 2,350 new homes, with a spring 2028 completion target."
      },
      {
        "name": "King Edward Triangle Waterfront (KEIE / Beetham, £1bn)",
        "detail": "The £1 billion King Edward Triangle scheme on Liverpool's northern waterfront, progressing detailed planning for close to 3,000 homes and hotel space in 2026, is generating supply-chain interest from structural and M and E subcontractors."
      },
      {
        "name": "Liverpool Baltic Train Station (£100m)",
        "detail": "The Liverpool City Region Combined Authority approved plans for the £100m Liverpool Baltic rail station in 2024, with Mayor Rotheram committing to delivery by end of 2027, adding a major civils and earthworks phase to the south city centre pipeline."
      },
      {
        "name": "Bootle Strand Town Centre Regeneration",
        "detail": "Sefton Council is driving the Bootle Strand regeneration with preparation and structural works continuing throughout 2026, providing steady work for demolition contractors and civils trades in the northern Merseyside corridor."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "joiners",
      "dryliners",
      "painters-decorators",
      "scaffolders",
      "labourers",
      "demolition-contractors"
    ],
    "localFaqs": [
      {
        "question": "Can I claim a CIS refund if I work on Liverpool Waters or the Central Docks project?",
        "answer": "Yes. CIS deductions made by GRAHAM or any other main contractor are treated in exactly the same way as deductions from any other contractor. We collect your payment and deduction statements for the tax year, add up the total deducted, apply your allowable expenses, and file the Self Assessment return to recover the overpayment. Large civils projects like Central Docks typically involve multiple contractor tiers, and your immediate employer (whoever pays you) is responsible for the deduction."
      },
      {
        "question": "Do I need to be registered with HMRC for CIS before working in Liverpool?",
        "answer": "If you are being paid as a subcontractor under CIS you should register with HMRC as soon as possible. An unregistered subcontractor has 30% deducted rather than 20%, a 10-percentage-point extra deduction on every labour invoice. Registration is straightforward and, once confirmed, future contractors deduct at 20%. We can register you as part of our onboarding."
      },
      {
        "question": "I have worked in Liverpool and Wirral for multiple contractors this year. Can I still claim?",
        "answer": "Yes. All CIS deductions across all contractors are pooled on your Self Assessment return regardless of which borough or contractor they came from. You need a payment and deduction statement from each contractor. We compile and check all of them and file a single return covering your full year's construction income."
      },
      {
        "question": "What expenses can a Liverpool subcontractor claim to reduce their CIS tax bill?",
        "answer": "Allowable expenses for CIS sole traders include: mileage at 55p per mile (from 6 April 2026) for business travel in your own vehicle, tools and equipment, PPE and protective clothing, materials you buy for jobs (though these are also excluded from the CIS deduction base), use of a room at home for admin (flat rate: £10 to £26 per month depending on hours), professional fees including our accountancy charge, and phone costs for business use. The more expenses you can legitimately claim, the lower the taxable profit and the larger the refund."
      },
      {
        "question": "How far back can I claim CIS refunds in Liverpool?",
        "answer": "You can file or amend Self Assessment returns for the four tax years immediately before the current one. If you have been working under CIS in Liverpool or across Merseyside for several years without filing, there may be a combined four-year refund available. We handle the full lookback as part of our service."
      }
    ],
    "nearbyAreas": [
      "Birkenhead",
      "Wallasey",
      "Bootle",
      "St Helens",
      "Runcorn",
      "Ellesmere Port",
      "Widnes",
      "Kirkby"
    ]
  },

  "newcastle": {
    "slug": "newcastle",
    "name": "Newcastle upon Tyne",
    "region": "Tyne and Wear",
    "population": "302,000",
    "geo": {
      "lat": 54.9783,
      "lng": -1.6178
    },
    "intro": "<p>Newcastle upon Tyne has a strong and active construction market in 2025 and 2026, anchored by two major programmes: the Pottery Lane build-to-rent scheme at Forth Yards (the city's largest multifamily development, 519 net-zero homes) and the Quayside West regeneration, for which Homes England received a £121.8 million government funding package in August 2025 to fund remediation, groundworks and infrastructure at a site capable of delivering 1,100 homes. For CIS-registered subcontractors working across these and the city's wider pipeline, 20% is deducted from the labour element of every payment (30% if unregistered), with materials excluded from the calculation.</p>\n<p>A Newcastle electrician or plumber earning £32,000 gross in a tax year might have £6,400 deducted in CIS. After allowable expenses including mileage at 55p per mile from April 2026, tools, PPE and protective clothing, the tax actually owed is typically considerably less than the amount deducted, leaving a refund due through Self Assessment. Our clients across Tyne and Wear typically recover around £2,000 on average, and we can recover up to four years of overpaid deductions for tradespeople who have not filed before. We operate entirely remotely and are not limited to local clients.</p>",
    "contractorScene": "<p>Newcastle's construction labour market in 2025 and 2026 is concentrated along two main corridors. The Forth Yards Pottery Lane BTR scheme, developed by Olympian Homes and forward-funded by Hines (with a green loan from HSBC UK), is delivering 519 low-carbon homes across two buildings on Newcastle's last major undeveloped central brownfield site. The first 11-storey block (292 private units) is due for completion in Q4 2026, with the second 227-home block following in 2027. The scheme is an all-electric, geothermally heated development, meaning that M and E subcontractors with low-carbon systems experience are particularly in demand alongside groundworkers, joiners, dryliners and painters-decorators.</p>\n<p>On Northumbria University's city centre campus, Sir Robert McAlpine holds a £30 million contract to demolish the existing Wynne Jones building and construct the North East Space Skills and Technology Centre (NESST), a six-storey facility housing satellite manufacturing clean rooms, advanced prototyping laboratories and a mission operations centre. Steelwork is now under way and completion is expected in autumn 2026. This kind of specialist research facility generates demand for mechanical, electrical and joinery operatives in the fit-out phase alongside the structural civils programme.</p>\n<p>The wider Newcastle and Gateshead pipeline is led by Bowmer and Kirkland, the top construction contractor in the area by active project value in Barbour ABI's 2026 data (three projects at £345m), followed by Taylor Wimpey and Persimmon on the residential housebuilding front. Kier Infrastructure has secured the Regent Centre Metro Interchange refurbishment contract, with construction scheduled to commence in summer 2026. Across the North East, demand from housebuilders running north into Northumberland and south into County Durham keeps groundworkers, bricklayers and gas engineers consistently busy, with many operating as CIS sole traders through regional housebuilder supply chains.</p>",
    "majorProjects": [
      {
        "name": "Pottery Lane BTR, Forth Yards (Olympian Homes / Hines)",
        "detail": "Olympian Homes is delivering 519 net-zero homes across two buildings at Pottery Lane in Newcastle's Forth Yards, with the first 292-unit block due for completion in Q4 2026, forming Newcastle's largest Build to Rent scheme."
      },
      {
        "name": "North East Space Skills and Technology Centre, Northumbria University (Sir Robert McAlpine, £30m)",
        "detail": "Sir Robert McAlpine is building the £30m NESST facility on Northumbria University's city centre campus, with steelwork under way and completion expected autumn 2026, creating demand for M and E and specialist fit-out subcontractors."
      },
      {
        "name": "Quayside West Regeneration (Homes England, £121.8m funding)",
        "detail": "Homes England received £121.8m in August 2025 to fund remediation, groundworks and infrastructure at Quayside West, which has capacity for around 1,100 homes; a development partner is expected to be appointed in October 2026."
      },
      {
        "name": "Regent Centre Metro Interchange Refurbishment (Kier Infrastructure)",
        "detail": "Kier Infrastructure secured the contract for a major refurbishment of Regent Centre Metro Interchange, with construction scheduled to commence in summer 2026, delivering improved accessibility and passenger facilities."
      }
    ],
    "tradeMix": [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "dryliners",
      "gas-engineers",
      "bricklayers",
      "painters-decorators",
      "scaffolders",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "Can I claim a CIS refund if I worked on the Pottery Lane scheme in Newcastle?",
        "answer": "Yes. Deductions made by Olympian Homes or any subcontractor tier on the Pottery Lane project are treated as standard CIS deductions on your payment and deduction statements. We collect the statements, total the deductions, apply your expenses and file the Self Assessment return to recover any overpayment. The fact that the scheme is a large BTR development makes no difference to the refund mechanics."
      },
      {
        "question": "Do you handle CIS returns for subcontractors working across the North East, not just Newcastle?",
        "answer": "Yes. Trade Tax Specialists operates UK-wide and entirely remotely. Many Newcastle-based subcontractors work across Gateshead, Sunderland, County Durham, Middlesbrough and Northumberland. All CIS deductions from all those sites are consolidated on a single Self Assessment return, regardless of where in the country the work was done."
      },
      {
        "question": "I am a gas engineer in Newcastle working in new-build housing. Do CIS rules apply to me?",
        "answer": "Yes, if you are a subcontractor on a construction site (new-build or major refurbishment) and the main contractor is registered under CIS. Gas installation in new-build residential properties is a CIS construction operation when it forms part of the original building works. Your contractor should be deducting at 20% if you are registered, or 30% if not. Routine maintenance or gas safety checks on existing properties are generally outside CIS."
      },
      {
        "question": "How much could I get back as a Newcastle CIS subcontractor?",
        "answer": "Our clients' average refund is around £2,000, though this varies with your gross income, the labour-versus-materials split on your invoices, and the expenses you claim. Mileage is one of the largest expense items for North East subcontractors travelling between sites, and at 55p per mile from April 2026 the deduction adds up quickly. We can estimate your likely refund once we see your payment and deduction statements."
      },
      {
        "question": "Can I get Gross Payment Status so that no CIS is deducted at all?",
        "answer": "Yes, if you meet the three qualifying tests: business test (UK construction work through a bank account), turnover test (at least £30,000 net annual CIS turnover as a sole trader), and compliance test (all tax obligations met on time for the past 12 months). From April 2026, keeping GPS also requires ongoing due diligence: re-verifying every subcontractor you pay, checking Companies House, and confirming bank account names before each payment. We can assess your eligibility and manage the application."
      },
      {
        "question": "Is there a Newcastle office I can visit?",
        "answer": "We do not operate a walk-in office. All our work with Newcastle and North East subcontractors is handled remotely using secure document sharing. This keeps our fees lower and means you are never paying for the overhead of local office space. You simply send us your payment and deduction statements and we do the rest."
      }
    ],
    "nearbyAreas": [
      "Gateshead",
      "Sunderland",
      "Durham",
      "Middlesbrough",
      "Cramlington",
      "Washington",
      "North Shields",
      "Hexham"
    ]
  },

  "belfast": {
    "slug": "belfast",
    "name": "Belfast",
    "region": "Northern Ireland",
    "population": "340,000",
    "geo": {
      "lat": 54.5973,
      "lng": -5.9301
    },
    "intro": "<p>Belfast is in the middle of its largest construction boom in a generation, with a £5 billion city-region pipeline and landmark schemes at Titanic Quarter, the harbour estate and Casement Park all advancing simultaneously. CIS applies fully in Northern Ireland: contractors are required to deduct 20% from the labour element of a registered subcontractor's payment and remit it to HMRC, before any expenses, personal allowance or Class 4 NIC relief is taken into account.</p>\n<p>Consider a Belfast plasterer earning £36,000 gross from CIS contracts in 2025/26. The contractor withholds £7,200 at the 20% registered rate. After allowable expenses including van mileage at 55p per mile (AMAP rate from 6 April 2026), tools, protective equipment and any materials separately invoiced, taxable profit might fall to around £25,000. The income tax and Class 4 NIC on that figure comes to roughly £3,600, producing a refund of approximately £3,600. Four prior tax years can be combined if Self Assessment returns have not previously been filed.</p>\n<p>Trade Tax Specialists works remotely with CIS subcontractors across Belfast and Northern Ireland. There is no need to visit an office and no geographic restriction on who we can help.</p>",
    "contractorScene": "<p>Belfast's construction market is driven by a convergence of large-scale regeneration, housing investment and infrastructure that is creating exceptional demand for trade labour. At Titanic Quarter, the Loft Lines scheme, a 778-apartment development backed by a £150 million Legal and General investment and brought forward by Watkin Jones and Lacuna Developments, was approaching practical completion in spring 2026. The project represents the largest single private-sector housing investment in Northern Ireland's history and employed trades across groundworks, structural frame, cladding, M&amp;E and internal fit-out throughout 2024 and 2025.</p>\n<p>Belfast Harbour has published a 2025 to 2050 masterplan that commits to major new capital works including the city's first land reclamation project in 25 years, creating a new freight terminal at West Bank Road, alongside redevelopment of Stormont Wharf and a berth extension to the container terminal. These harbour infrastructure works, valued at over £1.3 billion across the plan period, provide a long-horizon pipeline for civils, groundwork and marine-adjacent construction trades.</p>\n<p>Casement Park, the long-planned GAA stadium redevelopment in west Belfast, moved into a pre-enabling and site investigation phase in January 2026 following confirmation of a combined £90 million-plus funding package from the UK and Irish governments. Demolition of the existing main stand is under way, with the main construction contract expected to follow once enabling works are complete. At an estimated current cost well above £260 million, the scheme will be one of the largest single sports construction projects in Northern Ireland's history.</p>\n<p>Main contractors active across Belfast include BAM, Graham Construction and McAleer and Rushe, with the supply chain drawing from across the greater Belfast area. Residential schemes in the Titanic Quarter, North Belfast and Outer East Belfast ring routes contribute consistent volume for bricklayers, plasterers and groundworkers alongside the headline commercial programmes.</p>",
    "majorProjects": [
      {
        "name": "Loft Lines, Titanic Quarter",
        "detail": "A 778-apartment scheme backed by £150 million of Legal and General investment, developed by Watkin Jones and Lacuna Developments; the first phase opened in spring 2026, marking the largest private housing investment in Northern Ireland history."
      },
      {
        "name": "Belfast Harbour Masterplan: Horizons of Opportunity",
        "detail": "A 2025 to 2050 infrastructure programme covering the city's first land reclamation in 25 years, Stormont Wharf redevelopment and a container terminal berth extension, representing over £1.3 billion of committed capital works."
      },
      {
        "name": "Casement Park Stadium Redevelopment",
        "detail": "A GAA stadium rebuild in west Belfast with estimated costs above £260 million; pre-enabling and demolition works began in January 2026 following a combined UK and Irish government funding package of over £90 million."
      },
      {
        "name": "Hamilton Dock Hotel, Titanic Quarter",
        "detail": "A 228-bedroom hotel within the Titanic Quarter estate, which began construction in December 2023 and is targeting completion in 2026, employing structural, M&amp;E and fit-out trades."
      }
    ],
    "tradeMix": [
      "bricklayers",
      "plasterers",
      "groundworkers",
      "electricians",
      "plumbers",
      "joiners",
      "scaffolders",
      "roofers",
      "civil-engineers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "Does CIS apply in Northern Ireland?",
        "answer": "Yes. The Construction Industry Scheme covers the whole of the United Kingdom, including Northern Ireland. Contractors in Belfast must deduct from subcontractor payments and file monthly CIS300 returns to HMRC in the same way as contractors in England, Scotland or Wales."
      },
      {
        "question": "I work on sites in Belfast. Can Trade Tax Specialists handle my CIS return?",
        "answer": "Yes. We are a fully remote UK-wide service. Northern Ireland subcontractors are covered in exactly the same way as those on the mainland. We handle CIS registrations, Self Assessment returns and refund claims for Belfast and Northern Ireland trades by email and phone, with no office visit required."
      },
      {
        "question": "How much could I claim back as a Belfast subcontractor?",
        "answer": "The market average for registered CIS subcontractors is around £2,000 per year (illustrative, not guaranteed). A Belfast plasterer earning £36,000 gross might recover £3,000 to £3,600 once van mileage at 55p per mile, tools and other expenses are taken into account. The precise figure comes from your Self Assessment return, which we prepare for you."
      },
      {
        "question": "Can I claim for years when I did not file a return?",
        "answer": "Yes. HMRC allows claims for up to four prior tax years. If you have been working on Belfast sites such as Titanic Quarter or Casement Park for several years without filing returns, we can review all open years and submit claims for each one in a single engagement."
      },
      {
        "question": "I am registered at 20% but my contractor recently mentioned the new GPS rules. Should I be worried?",
        "answer": "The GPS anti-fraud changes introduced by Finance Act 2026 from 6 April 2026 primarily affect subcontractors who hold, or are seeking, Gross Payment Status. If you are deducted at 20% as a standard registered subcontractor, the new rules do not change your deduction rate. They do require your contractor to re-verify your CIS status, run a Companies House check and confirm your bank account name before each payment, so you may receive more verification requests than previously."
      }
    ],
    "nearbyAreas": [
      "Lisburn",
      "Newtownabbey",
      "Bangor",
      "Carrickfergus",
      "Antrim",
      "Holywood",
      "Dunmurry"
    ]
  },

  "bradford": {
    "slug": "bradford",
    "name": "Bradford",
    "region": "West Yorkshire",
    "population": "564,000",
    "geo": {
      "lat": 53.796,
      "lng": -1.7594
    },
    "intro": "<p>Bradford is in the early stages of its largest city-centre construction programme in a generation. The City Village scheme, a 1,000-home residential development on the former Oastler and Kirkgate sites, won planning approval in February 2026. Delivered by ECF (a partnership of Muse, Legal and General and Homes England), phase one demolition and construction is running through 2026 into 2027. Bradford's CIS supply chain is pulling in groundworkers, bricklayers, joiners and M&E trades from across West Yorkshire and beyond.</p>\n<p>A registered Bradford subcontractor on £42,000 of annual CIS labour income has £8,400 taken at source under the 20% deduction rate. With van mileage at 55p per mile, tools and PPE factored in, the actual tax bill is substantially lower. A refund in the range of £2,000 is typical for first-year clients at this income level. We file the Self Assessment return, offset all allowable costs and arrange the repayment directly with HMRC.</p>\n<p>Trade Tax Specialists serves Bradford and the wider West Yorkshire corridor including Keighley, Shipley, Halifax and Huddersfield. Everything runs remotely: no office visit is needed.</p>",
    "contractorScene": "<p>Bradford's construction market has historically been characterised by high volumes of residential refurbishment, private new-build housing and commercial fit-out rather than large city-centre civils. The City Village scheme changes that: the demolition of the Oastler Centre (which began in late 2025, with a seven-month programme) and the start of phase one construction in spring 2026 brings a significant concrete-frame and structural package to the city centre for the first time in years. Kirkgate Shopping Centre closure and demolition follows towards the end of 2026, adding another major enabling works package.</p>\n<p>Beyond City Village, Bradford District benefits from ongoing investment through the West Yorkshire Combined Authority housing programme and the government's confirmed commitment to Northern Powerhouse Rail, which is expected to deliver a new Bradford rail station. Station and rail corridor construction will generate large civils, groundwork and utilities packages when the programme moves into delivery phase. Subcontractors in Bradford currently earning CIS income from housing sites in Keighley, Shipley and Baildon, as well as commercial projects in the city centre, form the core of the local supply chain.</p>\n<p>The West Yorkshire subcontractor market tends to have a high proportion of sole-trader builders, joiners and plasterers who have been working informally without registering for CIS, meaning many are suffering the 30% unregistered rate. For a Bradford joiner on £38,000 of labour income, that costs £3,800 a year compared to the 20% rate. Registration is free and immediate. We register, file and claim back overpayments for up to four prior tax years.</p>",
    "majorProjects": [
      {
        "name": "Bradford City Village",
        "detail": "1,000-home city-centre regeneration scheme delivered by ECF (Muse, Legal and General, Homes England). Planning approved February 2026. Phase one demolition of the Oastler Centre completed ahead of construction starting spring 2026. Kirkgate Shopping Centre demolition follows end of 2026."
      },
      {
        "name": "Bradford City Village Southern Gateway",
        "detail": "Companion masterplan to City Village covering the southern half of the Oastler site and the Chain Street frontage. Includes 33 townhouses, 64 homes on the northern Oastler plots and a further 400 apartments at the Kirkgate site. Infrastructure and enabling works pipeline extending to 2028."
      },
      {
        "name": "Northern Powerhouse Rail (Bradford Station)",
        "detail": "Government confirmed Bradford as central to the £45 billion Northern Powerhouse Rail programme. A decision on the business case for the new Bradford station is expected by summer 2026, with procurement and enabling works to follow. A major civils and infrastructure pipeline for West Yorkshire subcontractors."
      },
      {
        "name": "West Yorkshire Combined Authority Housing Programme",
        "detail": "Ongoing WYCA-funded housing delivery across Bradford District, Keighley corridor and Airedale. Multiple residential schemes generating continuous work for groundworkers, bricklayers, joiners and M&E trades through 2025 and 2026."
      }
    ],
    "tradeMix": [
      "bricklayers",
      "joiners",
      "plasterers",
      "groundworkers",
      "plumbers",
      "electricians",
      "roofers",
      "painters-decorators",
      "scaffolders",
      "labourers"
    ],
    "localFaqs": [
      {
        "question": "Can I use Trade Tax Specialists if I am based in Bradford or the surrounding area?",
        "answer": "Yes. We are a UK-wide remote practice and take on subcontractors from Bradford, Keighley, Shipley, Halifax and across West Yorkshire. You do not need to visit an office. Everything is handled by phone, email and secure online portal."
      },
      {
        "question": "What is the average CIS refund for a Bradford subcontractor?",
        "answer": "The typical refund for a registered subcontractor is around £2,000 in the first year, though the exact figure depends on your gross labour income, expenses and whether you have been deducted at the correct rate. A Bradford joiner earning £40,000 in CIS labour income could see a refund of £1,500 to £2,500 after van mileage at 55p per mile, tools and workwear are accounted for."
      },
      {
        "question": "I have been working as a sole trader in Bradford without registering for CIS. Is it too late to register?",
        "answer": "It is not too late. CIS registration is free and cuts your deduction rate from 30% to 20% immediately. If you have been suffering the higher rate without registering, we can also go back up to four prior tax years to claim a refund of the overpayments already made."
      },
      {
        "question": "How does CIS work when I supply both labour and materials on a Bradford job?",
        "answer": "The CIS deduction applies only to the labour element of your invoice. Materials you supply (timber, blocks, pipe, cable and similar) are excluded from the deduction base. If your contractor is deducting 20% from the full invoice including materials, they are applying the rules incorrectly and you are overpaying. We review every deduction statement and recover any overpayment through Self Assessment."
      },
      {
        "question": "Do I need separate accountants for Bradford and out-of-city work?",
        "answer": "No. CIS applies to all your UK construction income regardless of location. We handle the full picture: Bradford sites, West Yorkshire housing schemes, any work you take in Leeds, Huddersfield or elsewhere. All deductions from all contractors are offset against your annual tax bill in one Self Assessment return."
      },
      {
        "question": "What happens if my Bradford main contractor fails to verify me before paying?",
        "answer": "If a contractor pays you without first verifying your CIS status with HMRC, they are required to deduct at the 30% unregistered rate, even if you are a registered subcontractor. You can recover the difference (the 10-point gap) through Self Assessment. The contractor may face a penalty for failing to verify. We help you identify where this has happened and recover the overpayment."
      }
    ],
    "nearbyAreas": [
      "Leeds",
      "Keighley",
      "Halifax",
      "Shipley",
      "Huddersfield",
      "Bingley",
      "Wakefield"
    ]
  },

  "cardiff": {
    "slug": "cardiff",
    "name": "Cardiff",
    "region": "Wales",
    "population": "370,000",
    "geo": {
      "lat": 51.4816,
      "lng": -3.1791
    },
    "intro": "<p>Cardiff is in the middle of the most ambitious construction phase in its recent history, with projects worth well over £500 million under way or mobilising across Cardiff Bay, the city centre and the Central Quay corridor. CIS applies across Wales in exactly the same way as in England: contractors deduct 20% from the labour element of a subcontractor's payment and pass it directly to HMRC, before a single expense or allowance is considered.</p>\n<p>Take a Cardiff groundworker with £40,000 gross CIS earnings in 2025/26. At the 20% registered rate, £8,000 is withheld. After allowable expenses including van mileage at the current AMAP rate of 55p per mile (from 6 April 2026), tools, PPE and materials separately invoiced, the taxable profit might be £28,000. The actual income tax and Class 4 NIC on that figure is roughly £4,500, producing a refund of approximately £3,500. Four prior years can be added to that calculation where returns have not previously been filed.</p>\n<p>We serve CIS subcontractors and sole-trader builders across Cardiff and South Wales entirely by remote. No office visit needed: send us your deduction statements and we do the rest.</p>",
    "contractorScene": "<p>Cardiff's construction market is benefiting from a concentration of large committed schemes that are generating sustained demand across most trade categories. The most prominent is the new New Cardiff Bay Arena at Atlantic Wharf, a 16,500-capacity indoor venue with an associated Travelodge hotel. Construction began in September 2025 on the £300 million scheme and is expected to deliver in 2028. The arena involves extensive groundworks, RC frame, cladding and M&amp;E packages across a multi-year build, pulling in trades from across South Wales and beyond.</p>\n<p>Immediately adjacent, the Central Quay mixed-use development by Rightacres is one of the largest private-sector regeneration schemes in Wales. The 2.5 million sq ft masterplan runs south from Cardiff Central station along the former SA Brain brewery site, preserving the iconic chimney stack and historic Brewhouse while wrapping around them with residential towers, offices, leisure and retail. Residential buildings are already under construction with facades advancing through 2025. Cardiff Council's cabinet approved the purchase of five Central Quay sites from Rightacres in early 2026 to deliver up to 730 affordable homes, adding a further tranche of civils and residential-fit-out packages to the programme.</p>\n<p>The Cardiff and Vale College Advanced Technology Centre, valued at approximately £65 million, represents substantial educational construction in the Bay area. Main contractors active across Cardiff's pipeline include Kier, Wates, Bowmer and Kirkland and Morgan Sindall. The A4232 link road corridor, the M4 junction at Leckwith and the Bay area access routes mean that trades regularly commute from Newport, Barry and the Valleys, with supply chain geography spanning the entire Cardiff Capital Region.</p>\n<p>Residential new build in suburbs such as St Mellons, Pontprennau and Lisvane adds a separate volume of bricklayer, plasterer and groundworker work outside the headline Bay schemes, keeping sole-trader CIS subcontractors continuously occupied throughout 2025 and 2026.</p>",
    "majorProjects": [
      {
        "name": "New Cardiff Bay Arena, Atlantic Wharf",
        "detail": "A £300 million, 16,500-capacity indoor arena with associated hotel; construction began in September 2025 and is scheduled to open in 2028, generating major groundworks, RC frame and M&amp;E packages."
      },
      {
        "name": "Central Quay Regeneration (Rightacres)",
        "detail": "A 2.5 million sq ft mixed-use scheme on the former SA Brain brewery site, with residential towers under construction in 2025/2026 and Cardiff Council purchasing five plots for up to 730 affordable homes."
      },
      {
        "name": "Cardiff and Vale College Advanced Technology Centre",
        "detail": "A circa £65 million educational construction scheme in Cardiff Bay, contributing significant structural, M&amp;E and fit-out packages to the local supply chain."
      },
      {
        "name": "Channel View Regeneration Phase 1",
        "detail": "An £80 million residential-led regeneration of the Channel View estate delivering new homes, public realm and infrastructure as part of Cardiff's wider housing investment programme."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "scaffolders",
      "plasterers",
      "joiners",
      "roofers",
      "civil-engineers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "Does CIS apply the same way in Wales as in England?",
        "answer": "Yes. The Construction Industry Scheme is a UK-wide scheme administered by HMRC and operates identically in Wales. Welsh rates of income tax currently match the English rates, so the CIS deduction rates (0% GPS, 20% registered, 30% unregistered) and refund mechanics are the same."
      },
      {
        "question": "I am a Cardiff subcontractor. Do I need a local accountant or can Trade Tax Specialists help me remotely?",
        "answer": "We are a fully remote UK-wide service. Cardiff and South Wales subcontractors deal with us entirely by email and phone. We do not need you to visit any office: your CIS deduction statements and expense records are all that is required."
      },
      {
        "question": "How much could I get back as a CIS subcontractor in Cardiff?",
        "answer": "The market average for registered subcontractors is around £2,000 per year (illustrative, not guaranteed). On earnings of £40,000 gross, after typical business expenses, a Cardiff groundworker might see a refund of £3,000 to £3,500. The exact figure depends on your specific income and costs, which we calculate precisely through your Self Assessment return."
      },
      {
        "question": "Can I claim CIS refunds going back several years?",
        "answer": "Yes. You can claim for up to four prior tax years. Many Cardiff subcontractors working on ongoing schemes such as Central Quay have been paying CIS deductions for several years without filing Self Assessment returns, and a multi-year claim can represent a significant lump sum."
      },
      {
        "question": "I sometimes work for both a main contractor and a direct client. How does that affect my CIS position?",
        "answer": "Payments from a CIS-registered contractor attract the deduction; payments from a non-contractor private client (for example an end-user homeowner) do not. You declare all income on your Self Assessment return. We split the income correctly and make sure only the CIS deductions actually suffered are set against your bill."
      }
    ],
    "nearbyAreas": [
      "Newport",
      "Barry",
      "Penarth",
      "Caerphilly",
      "Pontypridd",
      "Bridgend",
      "Cwmbran"
    ]
  },

  "coventry": {
    "slug": "coventry",
    "name": "Coventry",
    "region": "West Midlands",
    "population": "369,000",
    "geo": {
      "lat": 52.4068,
      "lng": -1.5197
    },
    "intro": "<p>Coventry's construction sector is in the middle of its most active period in decades. The £450 million City Centre South scheme, led by The Hill Group and backed by Legal and General, broke ground on its first residential phase in February 2026. The scheme will deliver 1,575 new homes alongside 8,000 sq m of commercial space across a 6.3-hectare city-centre site. Subcontractors across groundworks, concrete, mechanical and electrical, joinery and finishing trades are feeding into its supply chain right now.</p>\n<p>For a registered CIS subcontractor earning £48,000 in labour income from Coventry sites, a 20% deduction means £9,600 taken at source before any expenses are accounted for. After claiming allowable van costs at 55p per mile, tools, PPE and workwear, the actual tax owed is typically far lower. Many Coventry subcontractors are sitting on a refund of around £2,000 or more. We handle the Self Assessment return, recover the overpayment and set your account up correctly so the same mistake does not repeat.</p>\n<p>Trade Tax Specialists is a remote-first UK-wide practice. You do not need to visit a local office: everything runs by phone, email and secure online portal. If you are working on City Centre South, Coventry's brownfield housing programme or any other West Midlands scheme, we can take you on.</p>",
    "contractorScene": "<p>Coventry sits at the intersection of the M6 and M69, making it a staging point for subcontractors covering the wider West Midlands corridor from Bedworth and Nuneaton in the north to Rugby and Leamington Spa in the south. The city's long manufacturing heritage (Jaguar Land Rover, GEC/Alstom, Rolls-Royce aero) means the local trades base skews heavily towards mechanical and electrical work, precision metalwork, and specialist fit-out. Electricians and gas engineers with industrial site experience are particularly active in Coventry, and many transitioned into CIS construction work as manufacturing shrank.</p>\n<p>City Centre South is the headline scheme but it sits alongside a wider brownfield housing push backed by the West Midlands Combined Authority. A £12.24 million WMCA grant has unlocked a further mixed-use regeneration scheme at Well Street and Bishop Street, which has sat in temporary use since the Second World War. Coventry's two universities (Coventry University and the University of Warwick campus) generate a steady pipeline of student accommodation and campus development contracts, keeping groundworkers, bricklayers and drylining teams continuously busy.</p>\n<p>The trade mix in Coventry reflects a city doing a lot of residential-led regeneration: large volumes of bricklaying, drylining and plastering work on the apartment phases; electricians and plumbers fitting out the commercial ground floors; scaffolders tracking the climbing concrete frames. Many subbies here work across multiple main contractors simultaneously, which creates particular complexity around CIS300 verification and deduction statements. If you have been deducted at 30% rather than 20% because a contractor failed to verify you, that gap is recoverable for up to four prior tax years.</p>",
    "majorProjects": [
      {
        "name": "City Centre South",
        "detail": "£450 million residential-led regeneration led by The Hill Group and Legal and General. Phase one delivering 991 homes, 8,000 sq m of commercial space and 17,000 sq m of public realm. First residential construction phase commenced February 2026; first homes expected 2027."
      },
      {
        "name": "Well Street and Bishop Street Regeneration",
        "detail": "Mixed-use scheme unlocked by a £12.24 million West Midlands Combined Authority grant. Delivering 40 apartments and 4,500 sq ft of ground-floor retail and office space on a site fronting the Burges Conservation Area. Planning permission granted 2025."
      },
      {
        "name": "Coventry Brownfield Housing Programme",
        "detail": "West Midlands Combined Authority and Coventry City Council brownfield land release programme targeting hundreds of new homes across multiple city-edge and city-centre sites. Multiple enabling and groundworks packages active across 2025 and 2026."
      },
      {
        "name": "University Campus Development",
        "detail": "Ongoing capital investment at both Coventry University and the University of Warwick. Student accommodation, faculty buildings and campus infrastructure contracts provide a continuous pipeline for civils, M&E and fit-out subcontractors in the area."
      }
    ],
    "tradeMix": [
      "electricians",
      "plumbers",
      "bricklayers",
      "groundworkers",
      "plasterers",
      "dryliners",
      "scaffolders",
      "joiners",
      "gas-engineers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "Do I need to be based in Coventry to use Trade Tax Specialists?",
        "answer": "No. We are a remote-first UK-wide practice. Whether you are based in Coventry, Nuneaton or Leamington Spa and working on City Centre South or any other West Midlands scheme, everything runs by phone, email and secure online portal. Location makes no difference to your refund entitlement."
      },
      {
        "question": "How much could a Coventry subcontractor get back in a CIS refund?",
        "answer": "The typical figure for a registered subcontractor is around £2,000 for the first year, though the exact amount depends on your gross labour income, expenses and tax position. A Coventry electrician earning £50,000 in CIS labour income has £10,000 deducted at 20%. After allowable expenses such as van mileage at 55p per mile, tools and PPE, most subcontractors owe considerably less than the amount deducted, and the difference comes back as a refund."
      },
      {
        "question": "I have been deducted at 30% on some Coventry sites. Can I reclaim the difference?",
        "answer": "Yes. If a contractor applied the 30% unregistered rate when you were already CIS-registered, you have been overdeducted. The difference between the 30% and the correct 20% is recoverable through Self Assessment. We can go back up to four prior tax years to recover overpayments."
      },
      {
        "question": "I work for multiple main contractors across the West Midlands. How does CIS work?",
        "answer": "Each contractor deducts CIS separately, and each must verify your status with HMRC before their first payment. At year end, all your deduction statements are combined and set against the tax you actually owe on your self-employed profit. We collect all your CIS payment and deduction statements, verify the deduction amounts match what HMRC holds, and file a single Self Assessment return that accounts for all of them."
      },
      {
        "question": "Does the City Centre South VAT domestic reverse charge apply to me?",
        "answer": "The VAT domestic reverse charge applies when both the supplier and the customer are VAT-registered and CIS-registered, and the customer is not the end user. If you are a VAT-registered subcontractor supplying construction services to a VAT-registered main contractor on City Centre South, the reverse charge almost certainly applies: you do not charge VAT on your invoice, and the contractor accounts for it. We handle VAT reverse charge compliance as part of our service."
      },
      {
        "question": "What is the Making Tax Digital deadline for Coventry subcontractors?",
        "answer": "If your gross CIS income (before any deductions are taken) is over £50,000 a year, you are in scope for MTD for Income Tax from April 2026. Note that the £50,000 threshold applies to your gross income, not the amount you receive after the 20% deduction. A subcontractor receiving £40,000 after deductions from a £50,000 gross is already in scope. We can set you up with MTD-compatible software and handle quarterly updates."
      }
    ],
    "nearbyAreas": [
      "Nuneaton",
      "Rugby",
      "Leamington Spa",
      "Bedworth",
      "Kenilworth",
      "Warwick",
      "Solihull"
    ]
  },

  "derby": {
    "slug": "derby",
    "name": "Derby",
    "region": "Derbyshire",
    "population": "276,000",
    "geo": {
      "lat": 52.9225,
      "lng": -1.4746
    },
    "intro": "<p>Derby's construction pipeline is anchored by the £200 million Becketwell regeneration programme, delivered by St James Securities with GMI Construction Group as main contractor, and by the enormous A38 Derby Junctions scheme: a £600 million, 10-year highway infrastructure contract covering three major junctions on the A38 corridor (Kingsway, Markeaton and Little Eaton). National Highways is engaging the supply chain ahead of tender publication in December 2026, and localised site surveys are running through to March 2026. When the A38 scheme moves to delivery, it will be one of the most significant civils programmes in the East Midlands.</p>\n<p>For a registered Derby subcontractor earning £46,000 in CIS labour income, £9,200 is deducted at source under the 20% rate. After claiming van mileage at 55p per mile, tools and PPE, many Derby subcontractors are owed around £2,000 at year end. We handle the Self Assessment return, recover the refund and set your records up correctly going forward.</p>\n<p>Trade Tax Specialists covers Derby, Derbyshire and the wider East Midlands corridor, including Burton upon Trent, Belper, Nottingham and Uttoxeter. Everything runs remotely.</p>",
    "contractorScene": "<p>Derby's construction economy has long been shaped by its manufacturing base: Rolls-Royce aero engines, Toyota's Burnaston plant and the East Midlands railway industry have generated a sustained pipeline of industrial and commercial construction work, keeping mechanical and electrical trades and specialist fabricators busy alongside the residential sector. As the manufacturing base has evolved, many trades that originally worked on industrial fit-out have transitioned into commercial refurbishment, data centre build-out and infrastructure work.</p>\n<p>The Becketwell scheme is reshaping central Derby. GMI Construction Group has delivered the Springwell Square public realm and the Becketwell Performance Arena (now Vaillant Live). The Becketwell residential phase and hotel element are progressing through 2026. The Derbion Masterplan adds another layer: the 1,150-home Eagle Quarter (former Eagle Market site) has planning permission and is in procurement, and the Bradshaw Way site adds further residential volume. These schemes together generate ongoing work for groundworkers, structural trades, M&E and finishing contractors.</p>\n<p>Beyond the city centre, Derby sits within a triangle of significant infrastructure investment. The A38 Derby Junctions scheme will involve extensive earthworks, drainage, concrete structures and highways trades across the three affected junctions, generating multi-year subcontracting opportunities for civils and groundworks teams across Derbyshire. Castleward, a long-running mixed-use regeneration area north-east of the city centre, submitted its next phase planning application in October 2025 and will generate further residential construction work from 2026 onwards.</p>",
    "majorProjects": [
      {
        "name": "A38 Derby Junctions Scheme",
        "detail": "£600 million, 10-year National Highways infrastructure programme improving three junctions: Kingsway (A38/A5111), Markeaton (A38/A52) and Little Eaton (A38/A61). Site surveys running to March 2026; tender publication anticipated December 2026; delivery from 2028. A major civils, earthworks and highways supply-chain opportunity for Derby-area subcontractors."
      },
      {
        "name": "Becketwell Regeneration",
        "detail": "£200 million city-centre mixed-use scheme delivered by St James Securities with GMI Construction Group. Includes the completed Springwell Square public realm and Vaillant Live performance arena. Residential phase and hotel progressing through 2026, with further phases of the Becketwell masterplan to follow."
      },
      {
        "name": "Derbion Eagle Quarter",
        "detail": "1,150-home residential scheme on the former Eagle Market site, with planning permission granted and procurement under way. Part of the wider Derbion Masterplan for Derby city centre. Delivering significant work for groundworkers, concrete-frame trades, M&E and fit-out subcontractors from 2026 onwards."
      },
      {
        "name": "Castleward Redevelopment",
        "detail": "Next phase of the long-running Castleward mixed-use regeneration scheme north-east of Derby city centre. Planning application submitted October 2025. Residential-led development generating groundworks, structural and M&E packages for Derbyshire subcontractors."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "bricklayers",
      "joiners",
      "scaffolders",
      "plasterers",
      "gas-engineers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "Do I need to be based in Derby to use Trade Tax Specialists?",
        "answer": "No. We are a UK-wide remote practice and work with subcontractors from Derby, Derbyshire, Burton upon Trent, Nottingham and across the East Midlands. Everything is handled by phone, email and secure online portal with no office visit required."
      },
      {
        "question": "How much could a Derby CIS subcontractor expect to receive as a refund?",
        "answer": "The typical first-year refund for a registered subcontractor is around £2,000, though the exact amount depends on your labour income, expenses and tax position. A Derby groundworker earning £46,000 in CIS labour income has £9,200 taken at 20%. After allowable costs including van mileage at 55p per mile, tools and PPE, most subcontractors owe considerably less than the amount deducted."
      },
      {
        "question": "I am doing groundwork on Derby city-centre schemes and civils work on the A38 corridor. Can I claim for both?",
        "answer": "Yes. All your UK CIS income is consolidated into a single Self Assessment return regardless of which schemes you work on or how many contractors deduct from you. We collect deduction statements from every contractor, verify the figures against HMRC records and file a single return covering all of your CIS income."
      },
      {
        "question": "What is the CIS nil return obligation and does it affect me as a Derby contractor?",
        "answer": "From 6 April 2026, contractors who make no payments to subcontractors in a given tax month must still file a CIS300 nil return (or pre-notify HMRC of inactivity). This obligation was removed in 2015 and has been reinstated. Missing a nil return triggers a £100 penalty, rising to £200 at two months and £300 or 5% of the CIS liability at six months. If you operate as a contractor in Derby and sometimes have quiet months, you need to file nil returns or you will accrue penalties."
      },
      {
        "question": "Can a Derby limited-company subcontractor reclaim CIS deductions during the year rather than waiting for a tax return?",
        "answer": "Yes. Limited-company subcontractors can offset CIS deductions suffered against PAYE and CIS liabilities they owe as an employer via the Employer Payment Summary (EPS). This is the real-time route: instead of waiting up to 18 months for a Self Assessment refund, the company reduces its monthly PAYE payment by the CIS it has suffered. We set this up and manage the EPS submissions."
      },
      {
        "question": "Is the A38 Derby Junctions scheme covered by CIS?",
        "answer": "Yes. The A38 Derby Junctions scheme is a National Highways infrastructure programme and falls within CIS. Subcontractors working on earthworks, drainage, concrete structures and highways packages on the scheme are subject to CIS deductions in the normal way, unless they hold Gross Payment Status. We can check your status and, if you qualify for GPS, handle the application so you receive payments without deduction."
      }
    ],
    "nearbyAreas": [
      "Nottingham",
      "Burton upon Trent",
      "Belper",
      "Ilkeston",
      "Long Eaton",
      "Uttoxeter",
      "Matlock"
    ]
  },

  "hull": {
    "slug": "hull",
    "name": "Hull",
    "region": "East Yorkshire",
    "population": "275,000",
    "geo": {
      "lat": 53.7457,
      "lng": -0.3367
    },
    "intro": "<p>Hull is experiencing the highest level of regeneration activity in decades. The East Bank Urban Village scheme, a partnership between Hull City Council and the English Cities Fund (Muse, Legal and General, Homes England), has submitted planning for its first phase of up to 850 homes, with construction on phase one anticipated from 2027. In parallel, the Albion Square redevelopment (estimated £100 million contract) is in active procurement for a lead development partner, with VINCI Construction already on site carrying out preservation works on the Grade II listed Three Ships mural. The former Debenhams building has been cleared and 178 city-centre apartments are under construction. Hull City Council is also running an £80.5 million engineering and regeneration professional services framework to support its broader infrastructure programme.</p>\n<p>A registered Hull subcontractor earning £43,000 in CIS labour income has £8,600 taken at source under the 20% deduction rate. After van mileage at 55p per mile, tools, PPE and other allowable costs, the actual tax bill is typically well below the amount deducted. A refund of around £2,000 is common for first-year clients at this income level. We file the Self Assessment return and recover the overpayment.</p>\n<p>Trade Tax Specialists works with subcontractors across Hull, East Yorkshire and the Humber corridor including Beverley, Goole, Scunthorpe and Grimsby. Everything runs remotely.</p>",
    "contractorScene": "<p>Hull's construction market is shaped by two forces that operate in parallel: a long-established port and offshore energy supply chain, and an urban regeneration programme that has accelerated significantly since the city's UK City of Culture year in 2017. The Humber estuary is home to the Siemens Gamesa wind turbine blade manufacturing facility at Alexandra Dock and a growing offshore wind operations and maintenance sector. Electrical contractors, civils teams and structural trades with offshore and energy experience are particularly active in and around the port.</p>\n<p>In the city itself, the Fruit Market quarter (delivered by Wykeland Beal) has driven sustained fit-out and commercial work since 2016, and Wykeland Beal continues to develop further plots in the area. The Albion Square scheme adds the largest new mixed-use development opportunity in the city centre. VINCI Construction is currently on site with scaffolding and preservation works as the council progresses its development partner procurement; demolition of the former BHS building is targeted for the end of 2026. The Mytongate, Paragon and Western Docklands areas are also identified in the Hull and East Yorkshire Combined Authority's regeneration prospectus as priority sites for the coming years.</p>\n<p>The Hull supply chain draws from a wide geographic area: subcontractors from Beverley, Cottingham, Brough, Goole and Scunthorpe all work regularly in the city. Roofers and scaffolders are particularly in demand given the volume of residential refurbishment work alongside the new-build pipeline. The port economy also generates regular maintenance, repair and industrial construction packages that sit within CIS for subcontractors doing structural, mechanical or civils work on dock-related infrastructure.</p>",
    "majorProjects": [
      {
        "name": "East Bank Urban Village",
        "detail": "Flagship waterfront regeneration scheme delivered in partnership with the English Cities Fund (Muse, Legal and General, Homes England). First planning submitted April 2026 for 37 townhouses and 78 apartments in phase one, with up to 850 homes across the full scheme. Backed by £9.8 million of Levelling Up Partnership funding. Construction on phase one anticipated 2027."
      },
      {
        "name": "Albion Square Redevelopment",
        "detail": "Major city-centre mixed-use opportunity. Hull City Council commenced procurement for a lead development partner in early 2026, targeting appointment in spring 2026 and demolition of the former BHS building by end of 2026. Estimated contract value £100 million. VINCI Construction currently on site with preservation and scaffolding works on the Grade II listed Three Ships mural."
      },
      {
        "name": "Former Debenhams Building (City Centre Apartments)",
        "detail": "Planning permission granted December 2025. Clearance of the former Debenhams store completed and construction of 178 city-centre apartments under way. Part of a wider £75 million city-centre investment programme announced May 2026."
      },
      {
        "name": "Hull City Council Engineering and Regeneration Framework",
        "detail": "£80.5 million professional services framework (£96 million including VAT) procured by Hull City Council covering bridges and structures, highways, building construction, heritage conservation and decarbonisation assessments. Supports the ongoing infrastructure delivery programme across Hull through to 2030."
      }
    ],
    "tradeMix": [
      "roofers",
      "scaffolders",
      "electricians",
      "plumbers",
      "bricklayers",
      "groundworkers",
      "joiners",
      "painters-decorators",
      "civil-engineers",
      "plasterers"
    ],
    "localFaqs": [
      {
        "question": "Do I need to be based in Hull to use Trade Tax Specialists?",
        "answer": "No. We are a UK-wide remote practice and work with subcontractors from Hull, Beverley, Goole, Scunthorpe and across the Humber area. Everything is handled by phone, email and secure online portal with no office visit required."
      },
      {
        "question": "How much could a Hull CIS subcontractor get back?",
        "answer": "The typical first-year refund for a registered subcontractor is around £2,000, depending on your gross labour income, expenses and tax position. A Hull roofer or scaffolder earning £43,000 in CIS labour income has £8,600 taken at 20%. After allowable costs including van mileage at 55p per mile from East Yorkshire sites, tools and PPE, most subcontractors owe less than the amount deducted, with the difference returned as a refund."
      },
      {
        "question": "I do both onshore construction work and some dock-related maintenance in Hull. Does all of it fall under CIS?",
        "answer": "Structural, civil engineering and mechanical work on dock infrastructure is generally within CIS if it constitutes construction work as defined by HMRC (building, altering, repairing, extending, demolishing or dismantling structures). Straightforward maintenance of operational equipment or plant may be outside CIS. We review the nature of each contract, confirm whether CIS applies and ensure you are neither under-deducting (a contractor liability) nor over-deducting (which costs you money)."
      },
      {
        "question": "Can I claim CIS refunds for up to four years back in Hull?",
        "answer": "Yes. Self Assessment allows you to claim overpaid tax for up to four prior tax years. If you have been working in Hull under CIS for several years without filing a return, or without properly claiming your allowable expenses, the combined refund across all open years can be considerably larger than the single-year figure. We identify the open years, gather the relevant deduction statements and file all outstanding returns."
      },
      {
        "question": "The Albion Square main contractor asked me to provide a CIS verification number. What do I need to do?",
        "answer": "Before the contractor can pay you, they must verify your CIS status with HMRC. HMRC will confirm whether to deduct at 0% (Gross Payment Status), 20% (registered) or 30% (unregistered). You do not supply a verification number yourself: the contractor uses your UTR and name to verify with HMRC directly. If you are not yet CIS-registered, we can register you so the contractor applies the 20% rate rather than 30%."
      },
      {
        "question": "What is Gross Payment Status and can a Hull subcontractor apply for it?",
        "answer": "Gross Payment Status allows you to be paid in full with no CIS deduction. To qualify, your net annual CIS labour turnover must be at least £30,000 (£30,000 per director or £100,000 total for a limited company), you must have a clean compliance record for the past 12 months and a UK business bank account. GPS is open to any UK-registered subcontractor regardless of location. Given the changes introduced by Finance Act 2026, holding GPS now also requires ongoing due diligence on supply-chain partners. We handle the application and maintain the compliance record."
      }
    ],
    "nearbyAreas": [
      "Beverley",
      "Goole",
      "Scunthorpe",
      "Grimsby",
      "Cottingham",
      "Brough",
      "Howden"
    ]
  },

  "leicester": {
    "slug": "leicester",
    "name": "Leicester",
    "region": "East Midlands",
    "population": "370,000",
    "geo": {
      "lat": 52.6369,
      "lng": -1.1398
    },
    "intro": "<p>Leicester has a busy and diversified construction market, driven by large-scale waterside regeneration, university campus investment and a rolling pipeline of residential and commercial schemes across the city. For CIS subcontractors working on those sites, 20% of every labour payment disappears before it reaches your account, taken as an advance towards a tax bill that will almost certainly be lower than the deductions taken once your expenses and personal allowance are applied.</p>\n<p>Consider a Leicester electrician with £42,000 gross CIS income in 2025/26. At the registered 20% rate, the contractor withholds £8,400. After genuine business expenses including van mileage at 55p per mile, tools and equipment, the taxable profit comes down to around £32,000. The income tax and Class 4 NIC bill on that figure is approximately £5,400, leaving a refund of around £3,000. That figure can climb further once up to four prior tax years are added: a subcontractor who has been in CIS since 2022 without ever filing a Self Assessment return may be looking at a combined four-year recovery of over £10,000.</p>\n<p>Trade Tax Specialists works remotely with CIS subcontractors throughout Leicester and Leicestershire. No office visit is needed: we handle registrations, Self Assessment filings and refund claims entirely online and by phone.</p>",
    "contractorScene": "<p>Leicester's construction pipeline in 2025 and 2026 is anchored by several well-funded public-sector and private schemes that have kept the city's trade workforce in consistent demand. The Leicester railway station upgrade, backed by close to £18 million of levelling-up funding, will relocate the main entrance from London Road to Station Street, create a public plaza with rainwater gardens, and carry out structural, M&amp;E and public realm works to Network Rail standards. After an initial tender process produced only one bid and had to be relaunched in May 2025, the contract is under active procurement. Once awarded, the scheme will employ groundworkers, structural joiners, M&amp;E trades and civils teams across a multi-year delivery programme.</p>\n<p>The Waterside regeneration area, a 150-acre former industrial corridor running along the River Soar, is the largest long-term driver of construction work in the city. Keepmoat Homes has delivered phases of residential development there in partnership with Leicester City Council, and further phases of housing and commercial development are planned across the site. The adjacent Pioneer Park enterprise zone continues to attract space-technology and advanced-manufacturing occupiers, generating fit-out and civils work that flows through to local subcontractors.</p>\n<p>University campus investment adds further volume: the University of Leicester has been progressing significant estate works including demolition and rebuild of engineering and science facilities. Morgan Sindall completed a major mixed-use regeneration scheme at Great Central Square, and the firm has an established presence in the city, providing a reliable route for locally based subcontractors to access commercial fit-out packages.</p>\n<p>The M1 and M69 corridors mean Leicester subbies regularly work across the East Midlands, from Coventry and Hinckley in the south-west to Loughborough and Nottingham further north. Many trades operate across multiple contractor relationships simultaneously, which is a classic scenario for CIS over-deduction.</p>",
    "majorProjects": [
      {
        "name": "Leicester Railway Station Upgrade",
        "detail": "A near-£18 million levelling-up funded scheme to relocate the main entrance, create a public plaza, and carry out structural and M&amp;E works to Network Rail standards; retendered in May 2025 after the initial procurement produced a single bid."
      },
      {
        "name": "Leicester Waterside Regeneration",
        "detail": "A 150-acre former industrial corridor along the River Soar, with Keepmoat Homes delivering phases of residential development in partnership with Leicester City Council and further commercial phases planned."
      },
      {
        "name": "Pioneer Park Enterprise Zone",
        "detail": "A Leicester City Council-backed scheme targeting space-technology and advanced-manufacturing occupiers, generating ongoing civils, fit-out and M&amp;E packages for local subcontractors through 2025 and 2026."
      },
      {
        "name": "University of Leicester Campus Redevelopment",
        "detail": "Major estate investment including demolition of existing engineering buildings and construction of new academic facilities, with significant groundworks, structural and M&amp;E activity across the campus."
      }
    ],
    "tradeMix": [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "bricklayers",
      "plasterers",
      "scaffolders",
      "gas-engineers",
      "roofers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "I am a Leicester-based subcontractor. Do I need to visit Trade Tax Specialists in person?",
        "answer": "No. We are a remote service covering all of the UK. Leicester and Leicestershire subcontractors can complete everything by email and phone. We will need your CIS deduction statements, a note of your business expenses and basic details about your trade."
      },
      {
        "question": "What is the typical CIS refund for a subcontractor working in Leicester?",
        "answer": "It depends on your earnings and expenses, but the market average for registered subcontractors is around £2,000 (illustrative, not guaranteed). An electrician earning £42,000 gross in 2025/26, after allowable expenses, might expect a refund in the region of £2,500 to £3,500. The only way to know your figure is to run the numbers through a Self Assessment return, which we do for you."
      },
      {
        "question": "Can I claim CIS refunds for previous years?",
        "answer": "Yes, HMRC allows claims for up to four prior tax years. If you have been working in CIS since 2021/22 and have not filed Self Assessment returns, there may be several years of over-deductions recoverable in one claim. We review all available years when we take on a new client."
      },
      {
        "question": "I work for several contractors at once. Does that complicate my CIS claim?",
        "answer": "Not at all. Your deduction statements from every contractor are totalled on your Self Assessment return. Working for multiple contractors is very common among Leicester trades and makes no material difference to how the refund is calculated."
      },
      {
        "question": "My MTD for Income Tax notice says I need to comply from April 2026. Does my CIS income count?",
        "answer": "Yes. The MTD threshold is tested on your gross CIS income, not the net amount you receive after 20% is deducted. If your gross invoicing exceeds £50,000, you are in scope from April 2026. A subcontractor receiving £42,000 net after 20% deductions actually has gross income of around £52,500, which puts them above the threshold. We can set you up on compatible software and handle the quarterly submissions."
      }
    ],
    "nearbyAreas": [
      "Loughborough",
      "Hinckley",
      "Wigston",
      "Oadby",
      "Coalville",
      "Melton Mowbray",
      "Market Harborough"
    ]
  },

  "nottingham": {
    "slug": "nottingham",
    "name": "Nottingham",
    "region": "East Midlands",
    "population": "330,000",
    "geo": {
      "lat": 52.9548,
      "lng": -1.1581
    },
    "intro": "<p>Nottingham is running one of the most active construction pipelines in the East Midlands, with well over £1 billion of live and committed schemes across the city centre and waterside corridor. Subcontractors working on this programme face the same CIS deduction reality as anywhere in the UK: a contractor must deduct 20% from your labour payments and pass it straight to HMRC, before you have seen a single receipt or allowance.</p>\n<p>Take a Nottingham groundworker earning £38,000 gross from CIS contracts in 2025/26. The contractor withholds £7,600 at the 20% registered rate, leaving £30,400 in the bank. After van costs at 55p per mile (AMAP rate from 6 April 2026), tools, PPE and a modest use-of-home allowance, taxable profit might fall to £26,000. On that figure the actual income tax and Class 4 NIC bill comes to around £4,300, producing a refund of roughly £3,300. You can also claim back four prior tax years, which means the opening conversation with Trade Tax Specialists often covers more than one year of over-deductions at once.</p>\n<p>We work remotely with subcontractors and sole-trader builders across Nottingham and Nottinghamshire. There is no need to visit an office: your payslips, deduction statements and mileage log are all we need to start.</p>",
    "contractorScene": "<p>Nottingham's construction market is anchored by a cluster of major regeneration schemes that have kept groundworkers, bricklayers, scaffolders and fit-out trades continuously busy since 2023. The Waterside Bridge, built by Balfour Beatty for Nottingham City Council with Department for Transport Transforming Cities Fund money, lifted its main span across the River Trent in November 2025 and opened to the public in June 2026. It is the first crossing built over the river in the city since Clifton Bridge in 1958, and the civils and M&amp;E trades that worked on it represent exactly the kind of CIS workforce that tends to have several years of over-deductions sitting unclaimed.</p>\n<p>The Island Quarter, a £1.2 billion mixed-use neighbourhood on a 40-acre canalside site, is progressing through phased construction. Phase 1 Canal Turn received planning approval in late 2024 and work began on site in early 2025, delivering a 2,000 sq m waterfront pavilion with events space. Phase 2B gained full planning permission in December 2025 for a purpose-built student accommodation tower. The scheme is managed by Conygar Nottingham Ltd and is expected to run through the 2030s, providing a long-horizon pipeline for local subbies across virtually every trade.</p>\n<p>Broad Marsh, the stalled former shopping centre site, was acquired by Homes England in March 2025. Active demolition is under way under a formal collaboration agreement with the East Midlands Combined County Authority and Nottingham City Council, and a master development partner is being sought through a process launched at UKREiiF in May 2026. Construction trades are involved in the enabling and demolition phase now, with the residential and commercial rebuild likely to begin from 2028 onward.</p>\n<p>Tier 1 contractors operating in Nottingham include Winvic Construction, Bowmer and Kirkland, and Balfour Beatty. The supply chain draws heavily from the M1 corridor, with subbies regularly commuting from Derby, Mansfield and Hucknall to city-centre sites. Residential new build in the NG1 to NG8 postcodes and the Trent Basin neighbourhood adds further volume for bricklayers, plasterers and groundworkers outside the headline commercial programmes.</p>",
    "majorProjects": [
      {
        "name": "Waterside Bridge, River Trent",
        "detail": "Balfour Beatty completed this pedestrian and cycle bridge for Nottingham City Council, lifting the main span in November 2025; it opened in June 2026 and is the first new Trent crossing since 1958."
      },
      {
        "name": "The Island Quarter",
        "detail": "A £1.2 billion, 40-acre mixed-use neighbourhood by Conygar Nottingham Ltd; Phase 1 Canal Turn began on site in early 2025, with Phase 2B student accommodation approved December 2025."
      },
      {
        "name": "Broad Marsh Regeneration",
        "detail": "Homes England acquired the former Broadmarsh shopping centre site in March 2025 and is carrying out active demolition works with plans for approximately 1,000 homes and 20,000 sq m of commercial space."
      },
      {
        "name": "Trent Basin Waterside Neighbourhood",
        "detail": "A council-backed development framework targets around 2,000 new homes on the former industrial Waterside corridor, with residential phases by Blueprint Regeneration progressing through 2025 and 2026."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "scaffolders",
      "electricians",
      "plumbers",
      "plasterers",
      "joiners",
      "roofers",
      "painters-decorators",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "I work on sites in Nottingham but live outside the city. Can Trade Tax Specialists still help me?",
        "answer": "Yes. We are a remote UK-wide service and your location makes no difference. Whether you live in Hucknall, Beeston or further afield, we handle everything by email and phone. All we need are your CIS deduction statements and a record of your expenses."
      },
      {
        "question": "How much could a typical Nottingham subcontractor get back from HMRC?",
        "answer": "It varies, but a sole-trader groundworker earning around £38,000 gross in 2025/26, after allowable expenses such as van mileage at 55p per mile (the AMAP rate from 6 April 2026), tools and PPE, often ends up with a refund of £2,000 to £3,500. The market average across registered subcontractors is around £2,000, though the actual figure depends on your earnings and expenses. We can give you a realistic estimate at the first call."
      },
      {
        "question": "Can I claim for years before the current tax year?",
        "answer": "Yes. HMRC allows you to claim back over-deductions for up to four prior tax years. For many Nottingham subbies working on schemes like the Island Quarter or Trent Basin, that means potentially combining several years of claims in a single Self Assessment submission."
      },
      {
        "question": "The contractor on my last job deducted 30% instead of 20%. Is that right?",
        "answer": "Only if you are not registered with CIS. Unregistered subcontractors are deducted at 30%; registered subcontractors at 20%. Registering with HMRC as a CIS subcontractor immediately drops your deduction rate to 20% and is one of the simplest steps to protect your take-home pay. We can help you register and then reclaim any excess deducted in earlier years."
      },
      {
        "question": "Do I need to file a Self Assessment return even though tax is already being deducted?",
        "answer": "Yes. CIS deductions are advance payments towards your tax bill, not a final settlement. You still need to file a Self Assessment return so that HMRC can calculate the correct amount, apply your personal allowance of £12,570 and account for your allowable expenses. That is also how your refund is generated."
      },
      {
        "question": "What is the April 2026 GPS anti-fraud change and does it affect me as a subcontractor in Nottingham?",
        "answer": "From 6 April 2026, Finance Act 2026 made it easier for HMRC to revoke Gross Payment Status immediately, without notice, where a contractor knew or should have known about fraud in the supply chain. If you hold GPS, your contractor is now required to re-verify your status, run a Companies House check and confirm bank account details before each payment. As a registered subcontractor without GPS, the change does not affect your 20% deduction rate directly, but it is worth knowing because contractors may ask for additional documentation."
      }
    ],
    "nearbyAreas": [
      "Beeston",
      "Arnold",
      "Hucknall",
      "West Bridgford",
      "Mansfield",
      "Derby",
      "Long Eaton",
      "Ilkeston"
    ]
  },

  "plymouth": {
    "slug": "plymouth",
    "name": "Plymouth",
    "region": "Devon",
    "population": "264,000",
    "geo": {
      "lat": 50.3755,
      "lng": -4.1427
    },
    "intro": "<p>Plymouth is home to Devonport Royal Dockyard, one of the largest naval base complexes in Western Europe, and a city undergoing substantial civil, residential and public-realm regeneration. The Kier BAM joint venture delivering the 10 Dock refurbishment at Devonport, the Morgan Sindall-led £30 million Armada Way transformation, and the ongoing Barne Barton housing regeneration all draw large supply chains of CIS subcontractors across Plymouth and the wider Devon corridor.</p>\n<p>If you are a Plymouth sole trader or limited-company director working under CIS, the 20 per cent deduction on your labour income is taken before you see it. A Plymouth groundworker or civil engineer grossing £45,000 in CIS work typically has £9,000 deducted. After expenses including van mileage at 55p per mile from April 2026, tools and PPE, many Plymouth subcontractors are owed a meaningful refund. The illustrative UK average is around £2,000 (individual outcomes vary); the back-years route lets you recover up to four prior tax years at once.</p>\n<p>Trade Tax Specialists provides CIS tax returns and refund claims for Plymouth subcontractors online. You do not need a Plymouth-based accountant. We handle CIS registration, monthly returns, Self Assessment and GPS applications for sole traders and limited-company directors across the South West.</p>",
    "contractorScene": "<p>Plymouth's construction market is anchored by Devonport Royal Dockyard, where Babcock International manages a multi-decade nuclear submarine maintenance and upgrade programme worth hundreds of millions of pounds. The 10 Dock refurbishment, awarded to the Kier BAM joint venture, involves demolition, civils and new-build construction running through to 2026. Separately, a £560 million programme to modernise nuclear submarine support infrastructure at Devonport, announced in March 2024, sustains a long-run pipeline of specialist civils, mechanical and electrical work, drawing subcontractors from across Plymouth, Cornwall and Somerset.</p>\n<p>Away from the dockyard, Morgan Sindall is delivering the £30 million Armada Way public realm scheme through Plymouth city centre, with completion targeted in summer 2026. The project involves granite paving, stonework, drainage, planting and a cycle route, and has drawn groundworkers, landscape groundworkers and paving specialists from Plymouth and the surrounding area. Morgan Sindall is also the named contractor for the broader Plymouth City Centre Regeneration programme. The Barne Barton housing regeneration in the north of the city, a £68 million project, commenced enabling works in 2025 with first completions expected in spring 2026, adding residential groundwork, bricklaying, roofing and fit-out demand. Plymouth Skills Launchpad opened several major construction sites for public tours in early 2026, reflecting the breadth of live activity across the city. The concentration of dockyard civils, city-centre public realm and residential regeneration makes Plymouth one of the stronger markets for groundworkers, civil engineers, electricians and plumbers in the South West.</p>",
    "majorProjects": [
      {
        "name": "Devonport 10 Dock Refurbishment (Babcock / Kier BAM JV)",
        "detail": "Refurbishment of the 10 Dock submarine facility at Devonport Royal Dockyard. Main works contractor is the Kier BAM joint venture. Construction running through 2026."
      },
      {
        "name": "Devonport Nuclear Submarine Support Infrastructure",
        "detail": "£560 million programme to modernise submarine support facilities at HMNB Devonport, announced March 2024. Long-run civils and M&E pipeline sustaining sub-trade demand well into the late 2020s."
      },
      {
        "name": "Armada Way Public Realm Regeneration (Morgan Sindall)",
        "detail": "£30 million transformation of Plymouth city centre's main boulevard, delivered by Morgan Sindall. Granite paving, stonework, new drainage and cycling infrastructure. Targeted completion summer 2026."
      },
      {
        "name": "Barne Barton Housing Regeneration",
        "detail": "£68 million residential regeneration in north Plymouth, delivering new-build homes across multiple phases. Enabling works 2025; first completions spring 2026."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "civil-engineers",
      "electricians",
      "plumbers",
      "bricklayers",
      "roofers",
      "joiners",
      "scaffolders",
      "painters-decorators",
      "labourers"
    ],
    "localFaqs": [
      {
        "question": "I work on Devonport dockyard contracts. Does CIS apply to dockyard construction work?",
        "answer": "Yes, where the work is construction or civil engineering on the dockyard estate and the main contractor is CIS-registered. Babcock and the Kier BAM joint venture are both substantial CIS contractors. From 6 April 2026, Regulation 24ZA exempts payments to public bodies from CIS, but the exemption relates to the public body as client, not to all contracts placed by or near MOD sites. Your contractor should be deducting 20 per cent (registered) or 30 per cent (unregistered) from the labour portion of your invoices. We handle registration, returns and refund claims."
      },
      {
        "question": "How much of a CIS refund could a Plymouth subcontractor expect?",
        "answer": "The illustrative UK average CIS refund is around £2,000 (for content purposes; individual outcomes vary). Plymouth-based subcontractors driving across Devon and Cornwall can claim 55p per mile for the first 10,000 business miles from 6 April 2026, which adds up on longer runs to Truro, Exeter or Bristol project sites. Tools, PPE and relevant training costs are also deductible. We prepare a full Self Assessment to calculate your exact refund position."
      },
      {
        "question": "Can I claim back CIS deductions from previous years if I was working in Plymouth?",
        "answer": "Yes. HMRC allows refund claims for up to four prior tax years. If you worked on Devonport contracts, Armada Way or other Plymouth projects and did not file a Self Assessment, we can prepare the outstanding returns and recover the over-deducted tax. The combined multi-year refund is often significantly higher than any single year."
      },
      {
        "question": "What is the difference between a sole trader and a limited company for CIS refunds in Plymouth?",
        "answer": "As a sole trader you reclaim CIS deductions via your annual Self Assessment return after the tax year ends. As a limited company director, you can reclaim in real time during the year by offsetting CIS suffered against your PAYE and CIS liabilities on the Employer Payment Summary (EPS), rather than waiting up to 18 months for a corporation tax repayment. We advise Plymouth subcontractors on the right structure and handle both routes."
      },
      {
        "question": "Do I need to be based in Plymouth to use Trade Tax Specialists?",
        "answer": "No. We are a UK-wide remote practice. We act for subcontractors throughout Devon, Cornwall and the wider South West, and across the UK. Everything is handled online: CIS deduction statements, expense records, Self Assessment filing and HMRC correspondence."
      }
    ],
    "nearbyAreas": [
      "Saltash",
      "Tavistock",
      "Ivybridge",
      "Torpoint",
      "Liskeard",
      "Newton Abbot",
      "Exeter"
    ]
  },

  "portsmouth": {
    "slug": "portsmouth",
    "name": "Portsmouth",
    "region": "Hampshire",
    "population": "215,000",
    "geo": {
      "lat": 50.8198,
      "lng": -1.088
    },
    "intro": "<p>Portsmouth is one of the UK's most construction-active coastal cities, with the Royal Navy base driving a sustained pipeline of specialist civils, refurbishment and infrastructure work alongside city-centre regeneration schemes. If you are a CIS subcontractor working on naval estate contracts, housing projects or the former Debenhams site redevelopment, your contractor is deducting 20 per cent from the labour element of every invoice and passing it to HMRC on your behalf.</p>\n<p>That 20 per cent adds up fast. A Portsmouth groundworker or electrician earning £40,000 gross in CIS work across the naval base programme and city regeneration sites typically has £8,000 deducted before seeing a penny. After allowable expenses such as van costs at 55p per mile (from 6 April 2026), tools and PPE, most subcontractors owe significantly less than that to HMRC and are due a refund. The illustrative average across CIS subcontractors nationally is around £2,000 (for content purposes; individual outcomes vary).</p>\n<p>Trade Tax Specialists handles CIS tax returns and refund claims for Portsmouth-area subcontractors entirely online. You do not need a local accountant: we act for sole traders and limited-company directors across the UK, from naval base electricians and groundworkers to roofers and bricklayers on the city's housing regeneration sites.</p>",
    "contractorScene": "<p>Portsmouth's construction market sits at the intersection of defence infrastructure and city regeneration, creating two distinct but complementary pipelines for local subcontractors. The dominant employer is the Royal Navy estate at HMNB Portsmouth, where KBS Maritime (the joint venture between KBR and BAE Systems) manages a six-year building investment programme running over several years. The programme is refurbishing five operationally key buildings including the Grade II-listed Sail Loft, the Cochrane Building and The Wardroom. Works run through to at least December 2026 on RIBA Stages 2 and 3, with design and build contracts to follow. This programme alone draws a steady supply chain of groundworkers, bricklayers, plasterers, joiners and specialist restoration trades from across Hampshire and the wider south coast.</p>\n<p>Away from the base, the Royal Marines Museum at Boathouse 6 in the Historic Dockyard is under active construction, a £9.5 million scheme due to open in summer 2026. Separately, Portsmouth City Council is advancing the City Centre North regeneration, targeting the former Tricorn and Sainsbury's sites with a master developer appointment in progress and first homes expected in late 2026. The former Debenhams site on Commercial Road is also moving towards a 2026 construction start under a national development partner. Both schemes will generate significant sub-trade demand in groundworks, concrete frame, fit-out and finishing trades. Subbies working across these projects often operate informally with multiple main contractors and are among the most likely to be deducted at 30 per cent (the unregistered rate) rather than 20 per cent, underscoring the value of CIS registration and proper accountancy support.</p>",
    "majorProjects": [
      {
        "name": "HMNB Portsmouth Building Investment Programme",
        "detail": "Six-year, £40m to £60m refurbishment of five operational naval base buildings including the Sail Loft, Cochrane Building and Wardroom. Managed by KBS Maritime (KBR/BAE Systems JV). RIBA Stage 2 deadline December 2025, Stage 3 December 2026."
      },
      {
        "name": "Royal Marines Museum, Boathouse 6",
        "detail": "£9.5 million conversion of the former Action Stations site at Portsmouth Historic Dockyard into an immersive Royal Marines Museum. Construction started February 2025, opening targeted summer 2026."
      },
      {
        "name": "City Centre North Regeneration (former Tricorn site)",
        "detail": "Large-scale mixed-use regeneration of the former Tricorn and Sainsbury's sites in Portsmouth city centre. Council selecting a master developer in 2026; first homes targeted late 2026."
      },
      {
        "name": "Former Debenhams Site, Commercial Road",
        "detail": "City-centre mixed-use redevelopment on the former Debenhams footprint. Planning application submitted late 2025 by Darling Associates; construction start targeted 2026."
      }
    ],
    "tradeMix": [
      "electricians",
      "groundworkers",
      "bricklayers",
      "plasterers",
      "joiners",
      "plumbers",
      "painters-decorators",
      "roofers",
      "scaffolders",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "I work on the Royal Navy base in Portsmouth. Does CIS apply to naval estate contracts?",
        "answer": "Yes. Construction work carried out on MOD and naval estate buildings falls within CIS where the main contractor is registered as a CIS contractor. From 6 April 2026, payments to local authorities and public sector bodies are exempt under new Regulation 24ZA, but the exemption covers the public body as client, not every build contract placed by the MOD. Your contractor should be deducting at 20 per cent (registered) or 30 per cent (unregistered) from the labour element of your invoices. We handle CIS registration, returns and refund claims for Portsmouth subcontractors entirely remotely."
      },
      {
        "question": "How much could I get back as a Portsmouth CIS subcontractor?",
        "answer": "The illustrative national average CIS refund is around £2,000 (for content purposes; not guaranteed). Your actual refund depends on your gross CIS income, the deductions suffered, and your allowable expenses. Portsmouth subcontractors driving to Devonport, Southampton or London project sites can claim the approved mileage rate of 55p per mile for the first 10,000 business miles from 6 April 2026. Tools, PPE, specialist clothing and a portion of phone costs are also allowable. We prepare a full Self Assessment return to calculate your exact position."
      },
      {
        "question": "Can I claim CIS refunds from previous tax years while working in Portsmouth?",
        "answer": "Yes. HMRC allows you to claim refunds for up to four prior tax years. If you have been working on CIS projects in Portsmouth or elsewhere and not filed, we can prepare the outstanding returns and recover the over-deducted tax. The combined four-year figure can be substantial."
      },
      {
        "question": "Do I need a Portsmouth-based accountant to make a CIS refund claim?",
        "answer": "No. Trade Tax Specialists operates as a fully remote UK-wide practice. We act for subcontractors across the South Coast, the Solent corridor and throughout England, Wales and Scotland. All work is handled online: we collect your CIS deduction statements and expense records, file your Self Assessment, and track the refund to your account."
      },
      {
        "question": "I am a Portsmouth bricklayer working for multiple contractors. How do I handle CIS with several payors?",
        "answer": "Each contractor you work for must verify your CIS status separately and deduct at the applicable rate on the labour element of your payments. At year end, you report all CIS income from all contractors on a single Self Assessment return and offset all deductions suffered against your actual tax bill. We consolidate all your CIS deduction statements and prepare the return, regardless of how many contractors you work for."
      }
    ],
    "nearbyAreas": [
      "Fareham",
      "Gosport",
      "Havant",
      "Waterlooville",
      "Southampton",
      "Chichester",
      "Petersfield"
    ]
  },

  "reading": {
    "slug": "reading",
    "name": "Reading",
    "region": "Berkshire",
    "population": "230,000",
    "geo": {
      "lat": 51.4543,
      "lng": -0.9781
    },
    "intro": "<p>Reading is one of the fastest-growing commercial and residential construction markets in the South East outside London. The £800 million Station Hill mixed-use development delivered its first office tower in 2025 with further phases under way, while Berkeley Group's Green Park Village residential scheme and the Reading Riverworks development continue to generate sustained sub-trade demand across the M4 corridor. CIS subcontractors on these and other Reading projects face 20 per cent deductions on the labour element of every payment their contractor makes.</p>\n<p>A Reading-based sole-trader electrician or plumber earning £42,000 gross in CIS work typically has £8,400 deducted before it reaches them. After allowable expenses such as van mileage at 55p per mile from 6 April 2026, tools and PPE, the amount they actually owe HMRC is often considerably less, and the difference comes back as a refund. The illustrative UK average across CIS subcontractors is around £2,000 (for content purposes; individual outcomes vary), and up to four prior tax years can be recovered at once for those with outstanding returns.</p>\n<p>Trade Tax Specialists handles CIS tax returns and refund claims for Reading-area subcontractors entirely online. We act for sole traders and limited-company directors across Berkshire, Surrey, Oxfordshire and the wider South East, with no requirement for a local office visit.</p>",
    "contractorScene": "<p>Reading's construction market sits at the centre of a dense M4-corridor pipeline that stretches from Slough in the east to Swindon in the west. The dominant project in 2025 and 2026 is Station Hill, the £800 million mixed-use regeneration directly above Reading Station. The developer is Lincoln MGT and the Phase 2 contractor is Robert McAlpine, who delivered the 17-storey One Station Hill office tower in 2025. The wider scheme will ultimately comprise up to 625,000 sq ft of office space, 1,300 private and affordable homes, 95,000 sq ft of retail and leisure, and a central two-acre piazza, with further phases in design and planning through 2026. The scale of the project has drawn M&E, fit-out, groundwork and finishing trades from across Berkshire and the wider Thames Valley.</p>\n<p>Berkeley Group's Green Park Village development in south Reading is delivering over 1,300 new homes across multiple phases, with Phase 6 reaching completion milestones in 2025 and 2026. Phase 6 generates specialist groundwork and substructure demand for this large residential scheme adjacent to the Green Park business park and the new Green Park railway station (opened 2023). Berkeley Group's Reading Riverworks and Huntley Wharf canalside schemes add residential demand for groundworkers, bricklayers, joiners, electricians and plumbers across the Reading waterfront. Reading's position as a major rail hub, with direct services to London Paddington in under 30 minutes, means subcontractors regularly travel to London and along the M4 and M3 corridors for work, making van mileage one of the most material expense claims in the local CIS market.</p>",
    "majorProjects": [
      {
        "name": "Station Hill (Lincoln MGT / Robert McAlpine)",
        "detail": "£800 million mixed-use regeneration above Reading Station. Phase 2 contractor Robert McAlpine. One Station Hill 17-storey office tower delivered 2025. Wider scheme: up to 625,000 sq ft offices, 1,300 homes, 95,000 sq ft retail and leisure, two-acre piazza. Further phases in planning through 2026."
      },
      {
        "name": "Green Park Village (Berkeley Group)",
        "detail": "1,300-plus-home residential development in south Reading. Multiple phases; Phase 6 completing 2025 and 2026 with sustained groundwork demand. Adjacent to Green Park business park and Green Park Station (opened 2023)."
      },
      {
        "name": "Reading Riverworks (Berkeley Group)",
        "detail": "Residential-led canalside regeneration in Reading, forming part of Berkeley Group's broader Reading waterfront programme. Active construction in 2025 and 2026 delivering apartments and townhouses."
      },
      {
        "name": "Huntley Wharf (Berkeley Group)",
        "detail": "Berkeley Group residential scheme on the Reading waterfront, delivering new-build homes alongside the wider canalside regeneration of the town's former industrial waterfront."
      }
    ],
    "tradeMix": [
      "electricians",
      "plumbers",
      "groundworkers",
      "joiners",
      "bricklayers",
      "plasterers",
      "painters-decorators",
      "roofers",
      "gas-engineers",
      "scaffolders"
    ],
    "localFaqs": [
      {
        "question": "I am an electrician working on the Station Hill development in Reading. How does CIS apply?",
        "answer": "Robert McAlpine and other CIS-registered main contractors on Station Hill must deduct 20 per cent (registered subcontractor) or 30 per cent (unregistered) from the labour element of your invoices before paying you. Materials you supply are excluded from the deduction base. At the end of the tax year you file a Self Assessment return, credit those deductions against your actual tax bill, and receive the overpayment back as a refund. We handle this for Reading-area electricians and other sub-trades."
      },
      {
        "question": "What expenses can a Reading CIS subcontractor claim to reduce their tax bill?",
        "answer": "Reading-based subcontractors often work across the M4 and M3 corridors, travelling regularly to London, Slough, Wokingham, Basingstoke or Oxford. You can claim 55p per mile for the first 10,000 business miles from 6 April 2026 (an increase from 45p), which is material for high-mileage subcontractors. Tools, PPE, specialist workwear, relevant training and a proportion of mobile phone costs are also allowable. We review your expenses thoroughly to make sure nothing is missed."
      },
      {
        "question": "Can I claim CIS refunds for previous years if I worked on Reading projects?",
        "answer": "Yes. HMRC allows you to claim refunds for up to four prior tax years. If you have been working on Station Hill, Green Park Village or other Reading sites and have outstanding Self Assessment returns, we can file those and recover any overpaid CIS for each year. The combined four-year figure can be substantial."
      },
      {
        "question": "Does Making Tax Digital affect me as a Reading CIS subcontractor?",
        "answer": "Possibly, from April 2026. MTD for Income Tax applies to sole traders with gross annual income above £50,000. The key point for CIS subcontractors is that income is measured on your gross receipts before deductions, not on what arrives in your bank. A Reading plumber receiving £41,600 after 20 per cent deductions has gross income of £52,000, which is above the threshold. The threshold drops to £30,000 from April 2027. We advise on MTD compliance and compatible software as part of our CIS accountancy service."
      },
      {
        "question": "Do I need a Reading-based accountant to make a CIS refund claim?",
        "answer": "No. Trade Tax Specialists is a fully remote UK-wide practice. We act for CIS subcontractors across Reading, Slough, Wokingham, Bracknell, Newbury and the wider Berkshire and Thames Valley area entirely online. You send us your CIS deduction statements and expense records; we handle the rest."
      },
      {
        "question": "I work for multiple contractors across Berkshire and London. How do I consolidate my CIS tax position?",
        "answer": "Each contractor deducts independently and issues you a CIS deduction statement. You report all CIS income on a single Self Assessment return, offsetting all deductions together against your tax bill. We collect all your deduction statements, calculate your total income and expenses, and file the consolidated return. This is standard practice for multi-site Reading-area subcontractors."
      }
    ],
    "nearbyAreas": [
      "Wokingham",
      "Bracknell",
      "Newbury",
      "Slough",
      "Maidenhead",
      "Basingstoke",
      "Oxford"
    ]
  },

  "southampton": {
    "slug": "southampton",
    "name": "Southampton",
    "region": "Hampshire",
    "population": "270,000",
    "geo": {
      "lat": 50.9097,
      "lng": -1.4044
    },
    "intro": "<p>Southampton is undergoing its most significant city-centre transformation in decades, with the £132 million Bargate Quarter scheme in construction, a £230 million Town Quay waterfront approval granted in early 2025, and a long-term city renaissance masterplan identifying capacity for 15,000 new homes and over 2 million sq m of commercial floorspace. CIS subcontractors working on these sites face the standard deduction reality: 20% taken from the labour element of every payment before the money reaches their account.</p>\n<p>Take a Southampton bricklayer with £37,000 gross CIS earnings in 2025/26. At the 20% registered rate, the contractor withholds £7,400, leaving £29,600 in the bank. After allowable expenses including van mileage at 55p per mile (AMAP rate from 6 April 2026), tools and PPE, taxable profit might come down to around £26,000. The income tax and Class 4 NIC on that figure is roughly £4,100, generating a refund of approximately £3,300. Four prior tax years can be reviewed for anyone who has not previously filed a Self Assessment return.</p>\n<p>Trade Tax Specialists works remotely with subcontractors and sole-trader builders across Southampton and Hampshire. No office visit is needed, and there is no geographic limit on who we can take on.</p>",
    "contractorScene": "<p>Southampton's construction pipeline has two distinct layers in 2025 and 2026: an active city-centre build programme and a larger strategic pipeline coming through planning. At the Bargate Quarter, Midgard Ltd is the principal contractor delivering the £132 million Bargate Quarter scheme on the former 1980s shopping centre site, comprising 519 homes and 2,500 sq m of commercial space. Work resumed following the administration of the previous contractor and is tracking towards handover in late 2026. This multi-trade residential programme has drawn on groundworkers, bricklayers, scaffolders, electricians and fit-out teams throughout its build phase.</p>\n<p>At the waterfront, a £230 million scheme at Town Quay received planning approval in March 2025. Developed by Nicolas James Group, the proposal covers three 25-storey residential towers, a nine-storey hotel and serviced apartment building with spa, a 300-berth marina, and ground-floor retail and leisure. Contractor mobilisation is expected to follow approval, and when construction begins the scheme will represent one of the largest waterfront civils and high-rise residential programmes on the south coast.</p>\n<p>Morgan Sindall holds a significant delivery position in Southampton, carrying out the Southampton Outdoor Sports Centre upgrade (commenced spring 2025, targeting completion 2026) and leading the heritage refurbishment of Southampton City Art Gallery, supported by a £2.23 million MEND Fund grant. Both schemes demonstrate the breadth of work type available to local trades, from civils and groundworks on the sports centre to specialist joinery and conservation work on the listed gallery building.</p>\n<p>The wider Hampshire supply chain means Southampton subbies regularly work across Eastleigh, Fareham, Gosport and the M27 corridor. Port operations and related industrial development at Eastern Docks add civils and structural steel packages to the market alongside the headline residential programmes.</p>",
    "majorProjects": [
      {
        "name": "Bargate Quarter",
        "detail": "A £132 million mixed-use scheme by Midgard Ltd for Legal and General, delivering 519 homes and commercial space on the former Bargate shopping centre site, with construction active through to late 2026."
      },
      {
        "name": "Town Quay Waterfront Redevelopment",
        "detail": "A £230 million scheme by Nicolas James Group, approved by Southampton City Council in March 2025, comprising three 25-storey residential towers, a hotel and serviced apartments, and a 300-berth marina."
      },
      {
        "name": "Southampton Outdoor Sports Centre Upgrade",
        "detail": "A Morgan Sindall scheme for Southampton City Council, commenced spring 2025 and targeting completion in 2026, delivering a new community hub building and covered court facilities."
      },
      {
        "name": "Southampton City Art Gallery Refurbishment",
        "detail": "A heritage refurbishment led by Morgan Sindall, supported by a £2.23 million MEND Fund grant from the Department for Culture, Media and Sport, with the main and East Wing galleries targeting reopening in early 2026."
      }
    ],
    "tradeMix": [
      "bricklayers",
      "electricians",
      "groundworkers",
      "scaffolders",
      "plumbers",
      "joiners",
      "plasterers",
      "painters-decorators",
      "roofers",
      "civil-engineers"
    ],
    "localFaqs": [
      {
        "question": "I work on Southampton sites but live in Hampshire. Does Trade Tax Specialists cover me?",
        "answer": "Yes. We are a remote UK-wide service. Whether you are based in Southampton, Eastleigh, Fareham or anywhere else in Hampshire, we handle your CIS registration, Self Assessment return and refund claim by email and phone, with no office visit needed."
      },
      {
        "question": "How much could a Southampton subcontractor typically get back from HMRC?",
        "answer": "The market average for registered subcontractors is around £2,000 per year (illustrative, not guaranteed). A Southampton bricklayer on around £37,000 gross might see a refund of £3,000 to £3,500 once expenses such as van mileage at 55p per mile, tools and PPE are correctly claimed. We calculate the precise figure through your Self Assessment return."
      },
      {
        "question": "Can I claim for years I did not file a return?",
        "answer": "Yes. HMRC allows claims for up to four prior tax years. Many Southampton subcontractors who have been working on projects like the Bargate Quarter for several years have not filed Self Assessment returns and may have meaningful sums sitting with HMRC. We review all available years as standard."
      },
      {
        "question": "I work for a main contractor and also take occasional direct jobs from householders. Do both count as CIS income?",
        "answer": "No. CIS deductions only apply to payments made by CIS-registered contractors. A private householder commissioning a direct job is not within the scheme and does not deduct. You still declare all income on your Self Assessment return, but only the deductions actually suffered through CIS count as advance payments towards your bill."
      },
      {
        "question": "My contractor asked me for Companies House and bank account details recently. Is that new?",
        "answer": "Yes. From 6 April 2026, Finance Act 2026 requires contractors to carry out three due-diligence checks before each payment to protect their Gross Payment Status: re-verifying CIS status with HMRC, checking Companies House for the subcontractor, and confirming bank account name. This is new from April 2026 and is why you may be seeing more verification requests from contractors on Southampton sites."
      },
      {
        "question": "What is the nil return obligation contractors keep mentioning?",
        "answer": "From 6 April 2026, contractors must file a CIS300 nil return for any tax month in which they made no payments to subcontractors. This obligation was removed in 2015 and has been reinstated. As a subcontractor it does not directly affect your obligations, but it may affect how your contractor manages their monthly returns and whether they ask you for CIS paperwork even in quieter months."
      }
    ],
    "nearbyAreas": [
      "Eastleigh",
      "Fareham",
      "Totton",
      "Hedge End",
      "Winchester",
      "Gosport",
      "Romsey",
      "Chandler's Ford"
    ]
  },

  "stoke-on-trent": {
    "slug": "stoke-on-trent",
    "name": "Stoke-on-Trent",
    "region": "Staffordshire",
    "population": "260,000",
    "geo": {
      "lat": 53.0027,
      "lng": -2.1794
    },
    "intro": "<p>Stoke-on-Trent has several significant construction programmes running concurrently in 2025 and 2026. The Goods Yard neighbourhood, delivered by Capital and Centric with Bowmer and Kirkland as main contractor, completed its public square construction phase and has residential and commercial phases active into 2026. The much larger Etruscan Square scheme, awarded to Genr8 Kajima Regeneration, enters site preparation in 2026 ahead of construction work in 2027. Both schemes are drawing subcontractors from across the Staffordshire and South Cheshire corridor.</p>\n<p>A registered Stoke subcontractor earning £44,000 in CIS labour income in 2025/26 has £8,800 deducted at 20% before seeing a penny. Against that, a typical allowable-expense claim for van mileage at 55p per mile, tools and PPE reduces the actual tax bill considerably. Many subcontractors in the area receive a refund of around £2,000 at year end. We file the return, recover the overpayment and keep your records in order for HMRC.</p>\n<p>Trade Tax Specialists works with subcontractors and contractors across Stoke-on-Trent, Newcastle-under-Lyme, Crewe and the wider Staffordshire area. Everything is handled remotely.</p>",
    "contractorScene": "<p>Stoke's construction market is built around its ceramic and industrial heritage. The city's six towns (Burslem, Fenton, Hanley, Longton, Stoke, Tunstall) each have distinct brownfield land pipelines, and subcontractors here often cover multiple project sites across the conurbation in a single week. The Ceramic Valley Enterprise Zone (CVEZ) has been the focus of commercial and industrial development over the past decade: the Tunstall Arrow Business Park was fully let by 2025, and attention is now shifting to further CVEZ sites and the major city-centre schemes.</p>\n<p>The Etruscan Square project in Hanley, backed by £20 million of government funding and being taken forward by Genr8 Kajima, is the largest regeneration opportunity in the Midlands city-centre pipeline. Site surveys and preparation works began in 2026 and the scheme will generate substantial groundworks, civils, concrete, drylining and M&E packages when construction moves to full delivery in 2027 onwards. The Goods Yard, meanwhile, has been active for longer: Bowmer and Kirkland built out the public square, and the 174-apartment residential phase and commercial spaces are progressing into 2026.</p>\n<p>The environment agency flood risk management programme completed in 2026 has unlocked three housing developments worth £15 million already under construction across the city, delivering 238 new homes, with six further sites in the planning system with capacity for over 350 homes and a regional AI hub worth £60 million. Groundworkers and civils teams experienced in flood alleviation and earthworks are particularly well placed in the Stoke market.</p>",
    "majorProjects": [
      {
        "name": "The Goods Yard",
        "detail": "Mixed-use neighbourhood delivered by Capital and Centric, with Bowmer and Kirkland as main contractor. Located close to Stoke Railway Station and the Trent and Mersey Canal. Public square construction completed. 174 apartments, enterprise space, bars and eateries progressing into 2026."
      },
      {
        "name": "Etruscan Square",
        "detail": "One of the Midlands' largest city-centre regeneration sites in Hanley, awarded to Genr8 Kajima Regeneration. Backed by £20 million of government funding. Site surveys and preparation works commencing 2026; full construction expected from 2027. Planned for 400 homes, urban sports and commercial space."
      },
      {
        "name": "Flood Risk and Brownfield Housing Programme",
        "detail": "Environment Agency flood risk management works completed 2026, unlocking three housing sites worth £15 million currently under construction (238 homes) plus six further planning-stage sites with capacity for 350-plus homes and a regional AI hub. Civil engineering and groundworks pipeline active across 2025 and 2026."
      },
      {
        "name": "Ceramic Valley Enterprise Zone (CVEZ) Phase 2",
        "detail": "Continuation of industrial and commercial development within the CVEZ following completion of Tunstall Arrow Business Park. Further plots under active development, generating enabling works, structural steel erection and mechanical and electrical packages for local subcontractors."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "plasterers",
      "dryliners",
      "plumbers",
      "electricians",
      "roofers",
      "joiners",
      "civil-engineers",
      "painters-decorators"
    ],
    "localFaqs": [
      {
        "question": "Do I need to be based in Stoke-on-Trent to use Trade Tax Specialists?",
        "answer": "No. We are a UK-wide remote practice and work with subcontractors from Stoke, Newcastle-under-Lyme, Crewe and across Staffordshire. Everything is handled by phone, email and secure online portal."
      },
      {
        "question": "How much can a Stoke-on-Trent CIS subcontractor expect to get back?",
        "answer": "The typical refund for a registered subcontractor is around £2,000, though the exact amount depends on your gross CIS labour income, allowable expenses and tax position. A Stoke groundworker on £45,000 of labour income has £9,000 deducted at 20%. Once van mileage at 55p per mile, tools, PPE and other allowable costs are factored in, most subcontractors owe less than the amount deducted, with the difference returned as a refund."
      },
      {
        "question": "I work across multiple sites in Stoke, Hanley, Burslem and the wider area. Does that affect my CIS claim?",
        "answer": "No. CIS applies consistently across all your UK construction work. All deductions from all contractors are consolidated into a single Self Assessment return at year end. We collect your payment and deduction statements from every contractor, verify the amounts against HMRC records and file a single return covering all of your CIS income."
      },
      {
        "question": "The contractor on my Stoke site deducted 20% from the full invoice including materials. Is that right?",
        "answer": "No. CIS deductions apply only to the labour element of your invoice. Materials you supply are excluded from the deduction base. If your contractor applied the 20% rate to the full invoice including materials, they applied the rules incorrectly. The overpayment is recoverable through Self Assessment and we can go back up to four prior tax years."
      },
      {
        "question": "Can I claim mileage for travelling to different Stoke sites?",
        "answer": "Yes. If you have a fixed base (such as a home or yard) and travel to different construction sites, the mileage from your base to each site is allowable at the AMAP rate of 55p per mile for the first 10,000 business miles and 25p thereafter (from 6 April 2026). Many Stoke subcontractors covering the six-town conurbation and sites out towards Newcastle-under-Lyme, Stone and Crewe accumulate significant mileage that substantially reduces their tax bill."
      },
      {
        "question": "What is Gross Payment Status and can I apply for it in Stoke?",
        "answer": "Gross Payment Status (GPS) allows a registered subcontractor to be paid in full with no CIS deduction. To qualify, you need net annual CIS turnover (labour income excluding materials and VAT) of at least £30,000 for a sole trader, a clean compliance record for the past 12 months, and a UK bank account. GPS is not location-specific: a Stoke subcontractor qualifies on the same basis as anyone else in the UK. We handle the application and ongoing compliance."
      }
    ],
    "nearbyAreas": [
      "Newcastle-under-Lyme",
      "Crewe",
      "Stafford",
      "Stone",
      "Kidsgrove",
      "Leek",
      "Congleton"
    ]
  },

  "sunderland": {
    "slug": "sunderland",
    "name": "Sunderland",
    "region": "Tyne and Wear",
    "population": "275,000",
    "geo": {
      "lat": 54.9069,
      "lng": -1.3838
    },
    "intro": "<p>Sunderland is in the middle of a £2 billion-plus city-wide regeneration programme, with the Riverside Sunderland project on the former Vaux Brewery site, the International Advanced Manufacturing Park (IAMP) expansion and the Crown Works Studios development all generating sustained construction demand across the city and the wider Wearside area. CIS subcontractors working on these schemes, and on the residential sites delivering thousands of new homes across Sunderland, face 20 per cent deductions on every labour payment.</p>\n<p>A registered Sunderland groundworker or bricklayer grossing £38,000 from CIS work typically has £7,600 deducted before expenses. After allowable costs including van mileage at 55p per mile from 6 April 2026, tools, PPE and materials, a meaningful proportion of that sum comes back as a refund. The illustrative average nationally is around £2,000 (individual outcomes vary). We can also look back up to four prior tax years, which is particularly relevant for subcontractors who have been on IAMP or Riverside Sunderland sites since the earlier phases.</p>\n<p>Trade Tax Specialists handles CIS tax returns, Self Assessment and refund claims for Sunderland subcontractors entirely online. We act for sole traders and limited-company directors across the North East, with no requirement to visit a local office.</p>",
    "contractorScene": "<p>Sunderland's construction market is shaped by two dominant forces: the Riverside Sunderland flagship regeneration on the former Vaux Brewery site, and the International Advanced Manufacturing Park (IAMP) on the A19 corridor north of the Nissan plant. Riverside Sunderland is a long-run project targeting 1,000 homes and 1 million square feet of office and workspace across the 33-hectare Vaux site. Multiple residential blocks are at various stages of planning and construction in 2025 and 2026, including the 67-house, 98-apartment scheme approved by councillors in January 2025 and the Igloo Regeneration-delivered 34-home sustainable block also on the Vaux site. The Nile and Villiers development of 75 homes and commercial space is targeting a 2026 completion.</p>\n<p>At IAMP, Esh Group completed a £6.7 million A1290 road dualling in December 2025 through a NEPO-procured contract, improving access to the 150-hectare site and unlocking the next phase of infrastructure work. IAMP is a joint venture between South Tyneside and Sunderland City councils and Henry Boot Developments, targeting 7,000 jobs over ten years. The site sits adjacent to the Nissan manufacturing plant and is expected to attract automotive supply chain and advanced manufacturing occupiers, each requiring fit-out and services trades. In Pallion, the Crown Works Studios development secured Mayor Kim McGuinness's commitment of more than £38 million to accelerate Phase 1a (four sound stages, approximately 360,000 sq ft of production space) towards a July 2026 construction start. Sunderland also delivers consistent residential regeneration work through the West Park neighbourhood, Sheepfolds and Houghton Colliery sites, all of which feed ongoing demand for groundworkers, bricklayers, plasterers and joiners across the Wearside supply chain.</p>",
    "majorProjects": [
      {
        "name": "Riverside Sunderland (former Vaux Brewery site)",
        "detail": "Flagship £2bn+ city regeneration on 33 hectares of former brewery land. Multiple residential and commercial phases in construction or planning in 2025 and 2026, including 67-house/98-apartment scheme approved January 2025 and Igloo Regeneration's 34-home sustainable block."
      },
      {
        "name": "International Advanced Manufacturing Park (IAMP)",
        "detail": "370-acre manufacturing park north of Nissan, delivered by South Tyneside/Sunderland councils and Henry Boot Developments. Esh Group completed £6.7 million A1290 road dualling December 2025 (NEPO contract). Ongoing infrastructure and build-out phases."
      },
      {
        "name": "Crown Works Studios, Pallion",
        "detail": "Planned film and TV studio development in Sunderland's Pallion area. Phase 1a covers four sound stages and approximately 360,000 sq ft of production space. North East Mayor committed more than £38 million; construction start targeted July 2026."
      },
      {
        "name": "Nile and Villiers Housing Development",
        "detail": "75 new homes and 575 sq m of commercial space on the Riverside Sunderland site, targeting 2026 completion as part of the wider Vaux regeneration programme."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "plasterers",
      "joiners",
      "electricians",
      "plumbers",
      "roofers",
      "painters-decorators",
      "scaffolders",
      "labourers"
    ],
    "localFaqs": [
      {
        "question": "I am a Sunderland groundworker on the Riverside Sunderland site. How does CIS affect my pay?",
        "answer": "Your contractor deducts 20 per cent (if you are CIS-registered) or 30 per cent (if unregistered) from the labour element of every payment. Materials you supply are excluded from the deduction base. At the end of the tax year you file a Self Assessment return, offset the deductions against your actual tax liability, and recover any overpayment as a refund. We handle the full process remotely for Sunderland-based subcontractors."
      },
      {
        "question": "What expenses can I claim as a Sunderland CIS subcontractor to reduce my tax bill?",
        "answer": "You can claim the approved mileage rate of 55p per mile for the first 10,000 business miles from 6 April 2026 (up from 45p), which is significant for Sunderland subcontractors travelling to IAMP, Pallion, South Tyneside or further afield. Tools, PPE, specialist clothing, relevant training, a proportion of mobile phone costs and use-of-home costs where you run your business from home are all allowable. We work through your expenses with you to make sure nothing is missed."
      },
      {
        "question": "Can I claim CIS refunds from previous years working on Sunderland projects?",
        "answer": "Yes. HMRC allows claims for up to four prior tax years. If you have worked on Riverside Sunderland, IAMP or other local schemes and have outstanding Self Assessment returns, we can file those and recover the over-deducted CIS from each year. Multi-year recoveries are often considerably larger than a single-year refund."
      },
      {
        "question": "How do CIS deductions work if I have worked for more than one contractor in Sunderland?",
        "answer": "Each contractor deducts independently from your labour income. You declare all income from all contractors on a single Self Assessment return and offset all deductions together. We collect your CIS deduction statements from each contractor and prepare the consolidated return."
      },
      {
        "question": "Do I need a Sunderland or North East accountant to claim my CIS refund?",
        "answer": "No. Trade Tax Specialists is a UK-wide remote service. We act for sole traders and limited-company directors across Sunderland, South Tyneside, Gateshead, Durham and the wider North East, all online. There is no requirement to visit a local office."
      },
      {
        "question": "What is Making Tax Digital and does it affect me as a Sunderland CIS subcontractor?",
        "answer": "MTD for Income Tax (MTD ITSA) requires digital record-keeping and quarterly updates for sole traders with gross income above £50,000 from April 2026. The key point for CIS subcontractors is that income is tested on your gross receipts before CIS deductions, not on what lands in your account. A Sunderland subcontractor receiving £40,000 after 20 per cent deductions may have had £50,000 gross, which puts them within scope. We advise on MTD compliance as part of our CIS service."
      }
    ],
    "nearbyAreas": [
      "Washington",
      "Houghton le Spring",
      "Chester-le-Street",
      "Durham",
      "Gateshead",
      "South Shields",
      "Seaham"
    ]
  },

  "wolverhampton": {
    "slug": "wolverhampton",
    "name": "Wolverhampton",
    "region": "West Midlands",
    "population": "263,000",
    "geo": {
      "lat": 52.586,
      "lng": -2.1285
    },
    "intro": "<p>Wolverhampton is one of the most active regeneration markets in the West Midlands, with the £150 million Canalside South residential scheme, the £83 million Smithgate Bicycle Works first phase and the £40 million New Park Village estate replacement all in active construction simultaneously. CIS subcontractors working across these sites, and on the wider Black Country supply chain, are subject to 20 per cent deductions on the labour element of every invoice.</p>\n<p>A Wolverhampton sole-trader groundworker or bricklayer earning £36,000 gross in CIS work typically has £7,200 withheld before touching it. After allowable expenses such as van costs at 55p per mile from 6 April 2026, tools and PPE, the amount actually owed to HMRC is usually well below that. The illustrative UK-average refund across CIS subcontractors is around £2,000 (for content purposes; individual outcomes vary), and claiming back four prior tax years at once is available to anyone with outstanding Self Assessment returns.</p>\n<p>Trade Tax Specialists provides CIS tax returns, refund claims and ongoing accountancy for Wolverhampton-area subcontractors entirely online, acting for sole traders and limited-company directors across the West Midlands and the UK.</p>",
    "contractorScene": "<p>Wolverhampton's construction market in 2025 and 2026 is dominated by three large regeneration schemes running concurrently, each drawing substantial sub-trade supply chains from across the Black Country. The most advanced is Wavensmere Homes' £150 million Canalside South development on 17.5 acres of former industrial land beside the city-centre canals. Construction started in early 2025 and passed its 12-month milestone in January 2026 with over £20 million invested in land remediation, groundworks and initial build phases. The 533-home scheme runs in three phases west-to-east; the first 153 houses in phase one have been progressing through groundworks, frame and roofing trades through 2025, with completions beginning monthly from June 2026.</p>\n<p>The English Cities Fund (ECF), a partnership of Homes England, Legal and General and Muse, broke ground in early 2026 on Smithgate, Wolverhampton's largest regeneration scheme. The £83 million first phase at Bicycle Works will deliver 331 apartments across three six-storey buildings, with the wider masterplan targeting up to 1,070 homes and 20,000 sq ft of commercial space across 12 acres linking School Street to Market Square. ECF's Smithgate pipeline will run to 2028 and beyond, sustaining demand for groundworkers, concrete frame trades, electricians, plumbers, drylining and finishing trades throughout. The New Park Village estate replacement is the third major site: 205 outdated 1960s maisonettes are being demolished and replaced with 188 new energy-efficient homes across two phases, funded from the council's £40 million Housing Revenue Account capital budget, with construction starting in spring 2026. Wolverhampton also benefits from the wider West Midlands Construction Skills Village in Walsall, which feeds trained subcontractors into the Black Country supply chain.</p>",
    "majorProjects": [
      {
        "name": "Canalside South (Wavensmere Homes)",
        "detail": "£150 million, 533-home brownfield regeneration on 17.5 acres of former industrial land beside Wolverhampton city-centre canals. Construction started early 2025, passed 12-month milestone January 2026. First completions from June 2026; three-phase delivery running to approximately 2028."
      },
      {
        "name": "Smithgate Bicycle Works Phase 1 (English Cities Fund / ECF)",
        "detail": "£83 million first phase of the wider Smithgate masterplan. 331 apartments across three six-storey buildings on 12 acres linking School Street to Market Square. ECF (Homes England, L&G and Muse) broke ground early 2026. Wider scheme targets up to 1,070 homes."
      },
      {
        "name": "New Park Village Estate Regeneration",
        "detail": "£40 million council-funded replacement of 205 outdated 1960s maisonettes with 188 new energy-efficient homes across two phases. Demolition enabling works underway; construction start spring 2026. Funded from Wolverhampton City Council's Housing Revenue Account."
      },
      {
        "name": "Former Marks and Spencer Building Conversion (ALB Group / Prosperity Group)",
        "detail": "Conversion of the landmark former M&S building in Wolverhampton city centre into 71 contemporary apartments and three ground-floor retail units. Planning approval granted January 2026 by the joint venture of ALB Group (Nottingham) and Prosperity Group (Birmingham)."
      }
    ],
    "tradeMix": [
      "groundworkers",
      "bricklayers",
      "electricians",
      "plumbers",
      "joiners",
      "plasterers",
      "dryliners",
      "roofers",
      "painters-decorators",
      "scaffolders"
    ],
    "localFaqs": [
      {
        "question": "I am a groundworker on the Canalside South site in Wolverhampton. How does CIS work for me?",
        "answer": "Wavensmere Homes and its appointed main contractors deduct 20 per cent (registered) or 30 per cent (unregistered) from the labour element of your invoices. Materials you supply are excluded from the deduction. At year end you file a Self Assessment return, offset the deductions against your actual tax bill, and recover the overpayment as a refund. We handle this process remotely for Wolverhampton subcontractors."
      },
      {
        "question": "What expenses can I claim as a Wolverhampton CIS subcontractor?",
        "answer": "You can claim the approved mileage allowance of 55p per mile for the first 10,000 business miles from 6 April 2026. For Wolverhampton subcontractors travelling to Birmingham, Walsall, Dudley or further afield on multi-site contracts, this adds up materially. Tools, PPE, specialist workwear, relevant training and a proportion of mobile costs are also deductible. Use-of-home costs apply if you store materials or run admin from home."
      },
      {
        "question": "Can I claim back CIS tax from previous years if I worked on Wolverhampton schemes?",
        "answer": "Yes. HMRC permits Self Assessment refund claims for up to four prior tax years. If you have worked on Wolverhampton regeneration sites and have unfiled returns, we can file the outstanding years and recover the over-deducted CIS for each. The combined total across four years is often significantly larger than any single year."
      },
      {
        "question": "What is Gross Payment Status and should a Wolverhampton subcontractor apply?",
        "answer": "Gross Payment Status (GPS) lets HMRC pay you at 0 per cent deduction instead of 20 per cent, settling your tax through Self Assessment instead. To qualify you need at least £30,000 net CIS turnover in the past 12 months (if a sole trader), a bank account in the business name, and a clean compliance record for the past 12 months. Finance Act 2026 also tightened the regime from 6 April 2026: HMRC can now revoke GPS without notice where a contractor knew or should have known of supply-chain fraud, and the reapplication ban rose from 1 to 5 years. We advise on GPS eligibility and applications."
      },
      {
        "question": "Do I need to be based in Wolverhampton to use Trade Tax Specialists?",
        "answer": "No. We operate as a UK-wide remote service and act for subcontractors across the West Midlands, Black Country, Staffordshire and the UK. All work is handled online."
      }
    ],
    "nearbyAreas": [
      "Walsall",
      "Dudley",
      "West Bromwich",
      "Bilston",
      "Cannock",
      "Telford",
      "Stourbridge"
    ]
  },
};
