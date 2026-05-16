export type CityData = {
  slug: string;
  name: string;
  region: string;
  postcodeFocus: string;
  agencyHubs: string[];
  intro: string;
  whyHere: string;
  agencyScene: string;
  geo: { latitude: number; longitude: number };
};

export const CITIES: Record<string, CityData> = {
  london: {
    slug: "london",
    name: "London",
    region: "Greater London",
    postcodeFocus: "EC, WC, W1, N1, SE1",
    agencyHubs: ["Shoreditch", "Soho", "Clerkenwell", "King's Cross", "Old Street"],
    intro: "London is the heart of the UK agency industry. From global advertising holding companies in Soho to independent creative studios in Shoreditch, the city contains the largest concentration of agencies in Europe.",
    whyHere: "We work with London agency founders across every sector: marketing, creative, digital, PR, web, recruitment and beyond. Most engagements are fully remote with in-person available on request for strategy sessions, valuation discussions and exit planning conversations.",
    agencyScene: "London's agency clusters each have a distinct character. Shoreditch and Old Street are dense with digital and creative shops. Soho and Fitzrovia hold the advertising and post-production scene. Clerkenwell and King's Cross have shifted toward design and tech-led agencies. Each cluster brings its own clients, talent pool, rents and overhead profiles. We adapt our advice accordingly.",
    geo: { latitude: 51.5074, longitude: -0.1278 },
  },
  manchester: {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    postcodeFocus: "M1, M2, M3, M4",
    agencyHubs: ["Northern Quarter", "Ancoats", "Spinningfields", "Castlefield"],
    intro: "Manchester is the UK's second-largest agency city, with a strong concentration of digital, creative and performance marketing agencies clustered around the Northern Quarter and Ancoats.",
    whyHere: "We work with Manchester-based agency founders across digital, performance, content and creative disciplines. Engagements are remote-first; we travel to Manchester for client visits and strategy sessions on request.",
    agencyScene: "The Northern Quarter has been the city's creative core for over a decade, with agencies sitting alongside the city's hospitality, music and fashion scene. Ancoats and Spinningfields have absorbed the overflow as agencies grow. Manchester benefits from significantly lower overheads than London while drawing on Manchester Met and Salford talent pipelines.",
    geo: { latitude: 53.4808, longitude: -2.2426 },
  },
  birmingham: {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    postcodeFocus: "B1, B2, B3, B5",
    agencyHubs: ["Jewellery Quarter", "Digbeth", "Colmore Row"],
    intro: "Birmingham hosts the largest agency cluster in the Midlands, with the Jewellery Quarter and Digbeth driving a fast-growing creative and digital scene supported by major employer relocations.",
    whyHere: "We work with Birmingham agency founders across creative, digital, marketing, branding and content production. Remote-first engagements with in-person available on request.",
    agencyScene: "The Jewellery Quarter has shifted from manufacturing to creative work over the past decade, becoming the city's branding and design hub. Digbeth's industrial spaces have attracted production, post and music-adjacent agencies. Birmingham's lower overheads and HS2 connection to London make it attractive for founders escaping the capital while keeping client access.",
    geo: { latitude: 52.4862, longitude: -1.8904 },
  },
  leeds: {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire",
    postcodeFocus: "LS1, LS2, LS6",
    agencyHubs: ["Northern Quarter", "Holbeck", "Leeds Dock", "Wellington Place"],
    intro: "Leeds is the largest agency cluster in Yorkshire, with a particularly strong digital, performance marketing and SaaS-adjacent agency scene driven by the city's tech-finance ecosystem and a steady pipeline of Russell Group graduates.",
    whyHere: "We work with Leeds-based agency founders across digital, performance, content and creative disciplines. Engagements are remote-first; we travel to Leeds for client visits and quarterly strategy sessions on request.",
    agencyScene: "Leeds has emerged as one of the UK's most cost-effective agency hubs. The Holbeck and Leeds Dock area has attracted digital and SaaS-adjacent agencies serving fintech and channel-marketing clients across the M62 corridor. Lower overheads than Manchester or London combined with a strong talent pool from Leeds and Leeds Beckett universities make it commercially attractive for founders.",
    geo: { latitude: 53.8008, longitude: -1.5491 },
  },
  bristol: {
    slug: "bristol",
    name: "Bristol",
    region: "South West England",
    postcodeFocus: "BS1, BS2, BS8",
    agencyHubs: ["Harbourside", "Stokes Croft", "Clifton", "Temple Quay"],
    intro: "Bristol holds the densest creative and tech agency cluster outside London per capita, with Harbourside, Stokes Croft and Temple Quay supporting a strong mix of creative, digital, product and animation agencies.",
    whyHere: "We work with Bristol agency founders across creative, digital, animation, branding and tech-adjacent disciplines. Remote-first with in-person available on request.",
    agencyScene: "Bristol's creative agency scene is unusually deep — the city has historically been home to animation (Aardman), digital production studios and game development. The Harbourside has become the city's creative agency core with Stokes Croft offering lower-rent space for younger studios. Bristol's quality-of-life pull attracts senior agency talent leaving London.",
    geo: { latitude: 51.4545, longitude: -2.5879 },
  },
  edinburgh: {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "Scotland",
    postcodeFocus: "EH1, EH2, EH3, EH6",
    agencyHubs: ["Old Town", "Leith", "New Town", "Quartermile"],
    intro: "Edinburgh is the largest agency hub in Scotland, with a strong concentration of creative, digital, financial services and tech-adjacent agencies clustered around the Old Town, Leith and the Quartermile.",
    whyHere: "We work with Edinburgh-based agency founders across creative, digital, fintech-adjacent and content disciplines. Remote-first engagements with travel to Edinburgh on request. We understand the Scottish-tax-vs-UK-tax interaction where it applies.",
    agencyScene: "Edinburgh's agency scene benefits from proximity to financial services (Lloyds, RBS, Standard Life), the festival economy and a strong design heritage. Leith has shifted from industrial use to creative space over the past decade. The Quartermile attracts more corporate and consultancy-style agencies. Edinburgh founders often serve London and US clients while operating from a lower-cost base.",
    geo: { latitude: 55.9533, longitude: -3.1883 },
  },
  glasgow: {
    slug: "glasgow",
    name: "Glasgow",
    region: "Scotland",
    postcodeFocus: "G1, G2, G3, G4",
    agencyHubs: ["Merchant City", "Finnieston", "City Centre", "Pacific Quay"],
    intro: "Glasgow is Scotland's largest creative city, with a dense agency scene built around the Merchant City, Finnieston and the BBC and STV broadcasting cluster at Pacific Quay.",
    whyHere: "We work with Glasgow agency founders across creative, broadcast, digital, production and content disciplines. Remote-first engagements with travel for strategy sessions on request.",
    agencyScene: "Glasgow has historically been Scotland's creative capital, with broadcasting (Pacific Quay), music and design schools driving a deep talent pool. Finnieston and the Merchant City have become the city's primary creative agency hubs. Glasgow's lower property costs and design-school graduate pipeline (GSA, Strathclyde) make it commercially attractive for production-heavy agencies.",
    geo: { latitude: 55.8642, longitude: -4.2518 },
  },
};
