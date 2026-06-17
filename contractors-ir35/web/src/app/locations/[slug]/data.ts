// City data for Contractor Tax Accountants location pages.
// Contractor Tax Accountants is a REMOTE, national contractor-accountancy and
// IR35 practice. There is no physical office in any of these cities. Every page
// frames the service as "specialist contractor accountants serving [city]
// contractors remotely / nationwide", never as a local high-street office.
// Each entry describes the city's dominant contractor sectors and the local
// IR35 / off-payroll picture. Body fields are raw HTML strings.
//
// HP-locked 2026/27 facts only (docs/contractors-ir35/house_positions.md):
// off-payroll Chapter 10 applies to medium/large clients; small-company
// thresholds £15m / £7.5m / 50 (financial years from 6 Apr 2025), earliest a
// medium client drops out is 6 April 2027; dividend rates 10.75% / 35.75% /
// 39.35%; employer NIC 15% above £5,000; CT 19% / 25% (marginal 26.5%); VAT
// registration £90,000; AMAP 55p first 10,000 miles; pension annual allowance
// £60,000; umbrella JSL from 6 Apr 2026. No em-dashes. UK English. Faceless.

export type CityData = {
  slug: string;
  name: string;
  region: string;
  /** Optional population string, e.g. "9,000,000". */
  population?: string;
  /** Geo coordinates for LocalBusiness JSON-LD. */
  geo?: { lat: number; lng: number };
  /** Raw HTML paragraph(s) for the city intro (hero section). */
  intro: string;
  /** Raw HTML describing the local contractor sectors and IR35/off-payroll picture. */
  contractorScene: string;
  /** Contractor-heavy industries in this city. */
  keySectors: { name: string; detail: string }[];
  /** /for/* slugs relevant to this city (must exist in data/contractor-types.ts). */
  sectorLinks: string[];
  /** City-specific FAQ pairs, framed for a REMOTE national service. */
  localFaqs: { question: string; answer: string }[];
  /** Nearby towns/cities for areaServed and cross-linking. */
  nearbyAreas: string[];
  /** Optional hero image. */
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
    "intro": "<p>London has the largest concentration of professional contractors in the UK. The City and Canary Wharf run on day-rate interim talent in financial services, while the West End and the Shoreditch-to-King's Cross tech belt absorb thousands of IT, change and consulting contractors at any one time. Almost every one of those engagements is with a medium or large end client, which means the off-payroll working rules (Chapter 10 ITEPA 2003) apply: the client issues the status determination statement and the fee-payer, not your personal service company, operates PAYE on inside-IR35 income.</p><p>We are a specialist contractor-accountancy and IR35 practice serving London contractors remotely. We are not a local high-street office, and you do not need one. Status determinations, contract reviews, limited-company accounts and self assessment are all handled online, wherever in Greater London you work. What London contractors most need is a firm that understands how the capital's biggest engagers apply the rules, because blanket inside-IR35 determinations and recruitment-chain confusion are more common here than anywhere else in the country.</p><p>For 2026/27 the planning backdrop has shifted: dividend rates rose to 10.75% ordinary and 35.75% upper from 6 April 2026, employer National Insurance is 15% above a £5,000 secondary threshold, and the personal allowance and higher-rate threshold stay frozen to 2031, so fiscal drag bites harder on London day rates than ever. Getting the salary, dividend and employer-pension mix right is where the real saving sits.</p>",
    "contractorScene": "<p>London's contractor market is dominated by financial services. The City, Canary Wharf and the insurance market around Lloyd's run large change and transformation programmes (regulatory reporting, payments modernisation, risk and finance systems) that are staffed heavily by day-rate IT, project and business-analysis contractors. Nearly all of these clients are firmly medium or large, so they sit inside Chapter 10: the bank or insurer issues the SDS and the agency closest to your PSC is usually the fee-payer. The raised small-company thresholds (£15m turnover, £7.5m balance sheet, 50 employees, for financial years beginning on or after 6 April 2025) make no practical difference here, because the earliest a previously medium client can drop out of scope is 6 April 2027 and the capital's major engagers are far above the limits in any event.</p><p>Beyond finance, London carries the deepest pools of management consultants and strategy interims (the Big Four and independent boutiques clustered around the City and Southbank), legal interim and contract lawyers covering caseload and project surges in the firms and in-house teams, and a large marketing, design and digital contractor base across Shoreditch, Clerkenwell and King's Cross. The tech corridor running from Old Street to White City sustains a constant flow of software, cloud, data and cyber contractors, many on long multi-renewal engagements where mutuality of obligation and the control test deserve a proper look rather than an assumption that the original outside-IR35 position still holds.</p><p>The defining London problem is the blanket determination. Several large banks, insurers and public bodies in the capital moved whole categories of roles inside IR35 after April 2021 rather than assessing each engagement, which can be a failure of reasonable care and leaves the client as the deemed employer. Where a determination looks wrong, contractors have a client-led disagreement process and the client must respond within 45 days. We review the SDS, the contract and the actual working practices, and support the disagreement process where the inside finding does not stand up. We also model umbrella versus limited company honestly: from 6 April 2026 the agency or end client becomes jointly and severally liable for an umbrella's PAYE, so London contractors should expect tighter preferred-supplier lists and should use a genuinely compliant umbrella.</p>",
    "keySectors": [
      {
        "name": "Banking, insurance and financial services",
        "detail": "The City, Canary Wharf and the Lloyd's insurance market are the UK's largest source of day-rate change, regulatory and technology contractors. These engagers are medium or large without exception, so off-payroll Chapter 10 applies and inside-IR35 determinations (often blanket) are common. We pressure-test the SDS against the real working practices."
      },
      {
        "name": "Management consulting and strategy interim",
        "detail": "London holds the densest concentration of consulting and transformation interims in the country, from Big Four programmes to independent boutiques. Engagements through large clients sit inside Chapter 10, and project-based deliverables can support an outside position where control and substitution are genuine."
      },
      {
        "name": "Technology, software and data",
        "detail": "The Old Street to White City corridor sustains a constant flow of software, cloud, data and cyber contractors. Long multi-renewal engagements raise mutuality-of-obligation and control questions, so a contract and working-practices review at each renewal matters more than the original status."
      },
      {
        "name": "Legal interim and contract lawyers",
        "detail": "Caseload and project surges in the City firms and in-house legal teams drive demand for contract solicitors and paralegals. Status turns on autonomy, substitution and how integrated the lawyer is into the client team, all of which we assess before you sign."
      },
      {
        "name": "Marketing, design and digital",
        "detail": "Shoreditch, Clerkenwell and King's Cross host a large freelance marketing, creative and digital base. Many work for small agencies (where Chapter 8 leaves status with the PSC) as well as large brands (Chapter 10), so the regime can differ engagement to engagement. We map which rule applies to each client."
      }
    ],
    "sectorLinks": [
      "finance-contractors",
      "management-consultants",
      "it-contractors",
      "legal-contractors",
      "marketing-contractors",
      "project-managers"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in London?",
        "answer": "No. We act for London contractors entirely remotely, across the City, Canary Wharf, the West End and every borough. IR35 contract reviews, status determination statement checks, limited-company accounts and self assessment are all handled online with secure document sharing, so there is no need for a local high-street office or face-to-face meetings. What matters is specialist contractor and IR35 expertise, not a London postcode."
      },
      {
        "question": "My City client gave me a blanket inside-IR35 determination. Is that valid?",
        "answer": "Not necessarily. A status determination statement must reach a conclusion with reasons taken with reasonable care for your specific engagement. Several large London banks and insurers applied inside determinations to whole categories of roles after April 2021 without individual assessment, which can be a failure of reasonable care and can leave the client as the deemed employer. You have a client-led disagreement process and the client must respond within 45 days. We review the SDS, your contract and your actual working practices and support the disagreement where the inside finding does not hold up."
      },
      {
        "question": "Do the raised small-company thresholds mean my London client is now out of scope of off-payroll?",
        "answer": "Almost certainly not. From financial years beginning on or after 6 April 2025 the small-company thresholds rose to £15m turnover, £7.5m balance sheet and 50 employees, and a client must meet two of the three in two consecutive years. Because of the relevant-financial-year lag, the earliest a previously medium client can drop out of Chapter 10 scope is 6 April 2027. In practice London's banks, insurers, consultancies and large tech firms are far above the limits regardless, so for 2026/27 you should assume your medium or large London client is still in scope unless they confirm otherwise."
      },
      {
        "question": "Should a London contractor use an umbrella or a limited company in 2026/27?",
        "answer": "It depends on whether your engagements are inside or outside IR35 and on your day rate. For genuinely outside engagements a limited company is usually more tax-efficient even after the April 2026 dividend-rate rise to 10.75% and 35.75%, because the employer-pension route and the salary and dividend mix still beat PAYE. For inside-IR35 or low-margin work an umbrella is often simpler. From 6 April 2026 the agency or end client is jointly and severally liable for an umbrella's PAYE, so use an accredited, transparent umbrella. We model both honestly with your actual figures rather than pushing one route."
      },
      {
        "question": "I move between several London clients in a year. How does that affect IR35?",
        "answer": "Each engagement is assessed on its own facts, so you can be outside IR35 on one contract and inside on another in the same tax year. Working for a small client (or a wholly overseas client with no UK presence) keeps status with your PSC under Chapter 8, while a medium or large client puts you in Chapter 10 with the client deciding. We track which regime applies to each engagement and make sure the inside-IR35 income is not taxed twice when it reaches your company."
      },
      {
        "question": "What expenses can a London contractor still claim under IR35?",
        "answer": "For outside-IR35 work through your limited company the usual business expenses apply: accountancy fees, professional indemnity insurance, equipment, an employer pension contribution (the biggest lever), and business travel to a temporary workplace at 55p per mile for the first 10,000 miles from 6 April 2026, subject to the 24-month rule. For inside-IR35 engagements home-to-client travel is generally not deductible and the 5% expenses allowance is abolished under Chapter 10, so the planning focus shifts to pension contributions. We set the mix correctly for each engagement."
      }
    ],
    "nearbyAreas": [
      "Croydon",
      "Bromley",
      "Watford",
      "Reading",
      "St Albans",
      "Bromsgrove",
      "Slough",
      "Guildford"
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
    "intro": "<p>Manchester is the largest contractor market outside London, and a distinctly different one. MediaCityUK in Salford anchors a national broadcast, production and digital cluster; Spinningfields and the city centre host fast-growing technology, fintech and digital agency scenes; and the relocation of public bodies and corporate back offices to the North West has pulled change, data and consulting contractors with it. Most of these engagers are medium or large, so the off-payroll working rules apply and the end client, not your personal service company, determines your IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 firm serving Greater Manchester contractors remotely. We are not a local office, and you do not need one: status reviews, limited-company accounts and self assessment are handled online wherever you are in the conurbation, from Salford and Trafford to Stockport and Bolton. Manchester's digital and media contractors in particular often work through a mix of small agencies (where status stays with your PSC under Chapter 8) and large brands (where Chapter 10 applies), and knowing which rule governs each engagement is half the battle.</p><p>For 2026/27 the figures that matter are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, and a frozen personal allowance and higher-rate threshold to 2031. On Manchester day rates the employer-pension contribution is usually the single biggest tax-efficient lever, and we build it into the plan from the start.</p>",
    "contractorScene": "<p>Manchester's signature contractor sector is media, broadcast and digital production, centred on MediaCityUK in Salford. The BBC, ITV and a large supplier ecosystem of production companies and post-houses draw freelance editors, producers, developers and digital specialists, many engaged for the run of a project or series. These engagements raise interesting status questions: genuine project-based deliverables with real autonomy can support an outside-IR35 position, but where a contractor is embedded in a client team on rolling renewals, the control and mutuality-of-obligation picture needs a proper review. Where the end client is a large broadcaster, Chapter 10 applies and the client issues the SDS; where the engager is a small production company, status stays with the PSC under Chapter 8 and the 5% expenses allowance is still available.</p><p>The second pillar is technology and fintech. Spinningfields, the Northern Quarter and the Oxford Road corridor host a growing base of software, data, cloud and product contractors, with fintech and e-commerce scale-ups alongside the established corporates. The third is professional services and change: the migration of corporate back offices, plus public-sector and quasi-public bodies in the North West, sustains a steady stream of business-analysis, project and transformation contractors. Both of these pools are dominated by medium and large clients, so off-payroll Chapter 10 is the default and inside-IR35 determinations are common on long programme work.</p><p>Manchester's distinctive issue is the prevalence of small-agency and scale-up engagers in the digital and media space. Because a small end client (meeting two of the £15m turnover, £7.5m balance sheet, 50 employees tests) keeps status with the contractor under Chapter 8, a Manchester digital contractor can genuinely self-assess on some engagements and be subject to a client SDS on others in the same year. We map each client to the correct regime, review contracts and working practices before you sign, and where an inside determination from a large client looks wrong we support the 45-day client-led disagreement process. From 6 April 2026 we also flag the umbrella joint-and-several-liability change, which is pushing North West agencies toward stricter compliant-umbrella lists.</p>",
    "keySectors": [
      {
        "name": "Media, broadcast and digital production",
        "detail": "MediaCityUK in Salford anchors a national broadcast and production cluster (BBC, ITV and a deep supplier base) that engages freelance editors, producers, developers and digital specialists. Project-run deliverables can support an outside-IR35 position; embedded rolling renewals need a control and mutuality review."
      },
      {
        "name": "Technology, fintech and software",
        "detail": "Spinningfields, the Northern Quarter and the Oxford Road corridor host software, data, cloud and product contractors across corporates and scale-ups. Large clients sit inside Chapter 10; small scale-ups can leave status with the PSC under Chapter 8, so the regime varies by engagement."
      },
      {
        "name": "Professional services and change",
        "detail": "Relocated corporate back offices and North West public bodies sustain business-analysis, project and transformation contractors. These programmes are run by medium and large clients, so off-payroll determinations are the norm on long engagements."
      },
      {
        "name": "Digital marketing and creative agencies",
        "detail": "Manchester's agency scene engages freelance marketers, designers and content specialists. Small agencies (Chapter 8) and large brand clients (Chapter 10) both feature, so the same contractor may face different rules across concurrent engagements."
      }
    ],
    "sectorLinks": [
      "it-contractors",
      "marketing-contractors",
      "management-consultants",
      "project-managers",
      "finance-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Manchester?",
        "answer": "No. We serve Manchester and Greater Manchester contractors entirely remotely, covering Salford, Trafford, Stockport, Bolton, Wigan and Oldham. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are all handled online. There is no requirement to visit an office, and a Manchester postcode on your accountant matters far less than genuine contractor and IR35 specialism."
      },
      {
        "question": "I am a freelancer at MediaCityUK. Am I inside or outside IR35?",
        "answer": "It depends on the end client and the working practices. If you are engaged by a large broadcaster such as the BBC or ITV, off-payroll Chapter 10 applies and that client issues a status determination statement. If your engager is a small production company that meets the small-company tests, status stays with your personal service company under Chapter 8 and the 5% expenses allowance is still available. Genuine project-based deliverables with real autonomy point toward outside IR35, but a long embedded engagement on rolling renewals needs a proper control and mutuality-of-obligation review. We assess each engagement on its facts."
      },
      {
        "question": "My Manchester engagements switch between small agencies and large clients. How does that work for IR35?",
        "answer": "Each engagement is judged separately, so you can be outside IR35 on a small-agency contract and inside on a large-client one in the same tax year. A small or wholly overseas client keeps the status decision (and the deemed-payment calculation, including the 5% allowance) with your PSC under Chapter 8. A medium or large client moves it to Chapter 10, where the client decides and the fee-payer operates PAYE. We track which regime applies to each engagement so nothing is taxed twice."
      },
      {
        "question": "Is a limited company still worth it for a Manchester contractor in 2026/27?",
        "answer": "For genuinely outside-IR35 work, usually yes. Even after dividend rates rose to 10.75% and 35.75% on 6 April 2026, a limited company still beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and, crucially, an employer pension contribution, which carries no employer or employee National Insurance and is deductible against corporation tax. For inside-IR35 or low-margin work an umbrella is often simpler. We model both with your real day rate before recommending either."
      },
      {
        "question": "What is changing for umbrella workers in Manchester from April 2026?",
        "answer": "From 6 April 2026 the recruitment agency that contracts with the end client (or the end client where there is no agency) becomes jointly and severally liable with the umbrella for any PAYE and National Insurance the umbrella fails to pay. The umbrella stays your legal employer. The practical effect is that North West agencies are tightening their preferred-supplier lists, so you should use an accredited, transparent umbrella that issues a Key Information Document and pays your holiday pay properly. We can sense-check an umbrella before you sign."
      }
    ],
    "nearbyAreas": [
      "Salford",
      "Trafford",
      "Stockport",
      "Bolton",
      "Oldham",
      "Warrington",
      "Wigan"
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
    "intro": "<p>Birmingham has the largest professional-services and engineering contractor base in the Midlands. The city has become a genuine second financial and professional hub, with major banks, advisory firms and the relocation of large corporate functions to the city centre, while the surrounding region carries deep automotive, manufacturing and engineering supply chains that run on technical and interim contractors. Most of these engagers are medium or large, so the off-payroll working rules apply and the end client, not your personal service company, determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Birmingham and West Midlands contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are, from the city centre to Solihull, Coventry and the Black Country. Engineering and automotive contractors in particular often work for large OEMs and Tier 1 suppliers where Chapter 10 is the default, so getting the status determination and the employer-pension planning right is what makes the difference.</p><p>For 2026/27 the figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, corporation tax of 19% rising to a 26.5% marginal rate between £50,000 and £250,000 of profit, and a frozen personal allowance to 2031. We build the salary, dividend and pension mix around those numbers for your specific position.</p>",
    "contractorScene": "<p>Birmingham's contractor market has two strong centres of gravity. The first is professional and financial services in the city centre: the arrival of major banks, the relocation of large advisory and corporate functions, and a growing fintech and business-services base have created sustained demand for finance, change, project and consulting contractors. These clients are medium or large, so off-payroll Chapter 10 applies, the client issues the SDS and the fee-payer operates PAYE on inside-IR35 income. The second is engineering, automotive and advanced manufacturing across the wider West Midlands: the regional automotive OEMs, their Tier 1 and Tier 2 suppliers, and the aerospace and rail supply chains engage large numbers of design, systems, quality and project engineers on day rates.</p><p>Engineering contracting in the Midlands carries its own status nuances. A genuine outside-IR35 position depends on real autonomy over how the work is done, a genuine right of substitution and being in business on your own account, but technical contractors embedded in an OEM's design or quality function for long, repeatedly renewed engagements can drift toward an inside picture on control and mutuality of obligation. Because the large automotive and aerospace clients are firmly above the small-company thresholds, the raised limits (£15m, £7.5m, 50 employees) do not take them out of scope, and 6 April 2027 is the earliest any previously medium client could drop out in any event.</p><p>Birmingham also has a solid base of management consultants and interim professionals serving the relocated corporate functions, and a growing legal and professional interim market. The practical issues here mirror the rest of the country: inside-IR35 determinations on long programmes, occasional blanket determinations from large engagers, and the need to assess each engagement on its working practices rather than its contract wording. We review contracts before signing, check status determination statements, support the 45-day disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 joint-and-several-liability change for anyone considering umbrella work.</p>",
    "keySectors": [
      {
        "name": "Automotive and advanced manufacturing engineering",
        "detail": "The West Midlands automotive OEMs and their Tier 1 and Tier 2 suppliers engage design, systems, quality and project engineers on day rates. Large clients sit firmly inside Chapter 10; long embedded engagements need a control and mutuality review to support an outside position."
      },
      {
        "name": "Financial and professional services",
        "detail": "Birmingham's growth as a second financial hub (relocated banks, advisory and corporate functions) drives demand for finance, change and consulting contractors. These medium and large engagers issue status determinations under off-payroll Chapter 10."
      },
      {
        "name": "Aerospace, rail and infrastructure engineering",
        "detail": "The regional aerospace and rail supply chains, plus major infrastructure programmes, sustain technical and project-engineering contractors. Status turns on genuine autonomy and substitution, which we assess against the real working practices."
      },
      {
        "name": "Management consulting and interim",
        "detail": "Relocated corporate functions support a base of consultants and interim professionals. Engagements through large clients fall under Chapter 10, and project-based deliverables can support an outside-IR35 conclusion where control is genuinely limited."
      }
    ],
    "sectorLinks": [
      "engineering-contractors",
      "finance-contractors",
      "management-consultants",
      "project-managers",
      "it-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Birmingham?",
        "answer": "No. We act for Birmingham and West Midlands contractors entirely remotely, covering Solihull, Coventry, Wolverhampton, Dudley and the Black Country. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online with secure document sharing, so there is no need for a local office or in-person meetings. Specialist contractor and IR35 expertise matters far more than a Birmingham postcode."
      },
      {
        "question": "I am an engineering contractor at a West Midlands automotive client. Am I inside IR35?",
        "answer": "Probably subject to off-payroll Chapter 10, but inside or outside depends on the facts. The large automotive OEMs and Tier 1 suppliers are medium or large clients, so they issue the status determination statement and the fee-payer operates PAYE if you are inside. Whether you are genuinely outside turns on real autonomy over how you do the engineering work, a genuine right of substitution and being in business on your own account. A long embedded engagement on rolling renewals can drift toward inside on control and mutuality, so we review the contract and working practices before you sign each one."
      },
      {
        "question": "Does the higher small-company threshold take my Birmingham client out of off-payroll scope?",
        "answer": "Not for 2026/27. The thresholds rose to £15m turnover, £7.5m balance sheet and 50 employees for financial years beginning on or after 6 April 2025, and a client must meet two of the three across two consecutive years. Because of the relevant-financial-year lag, the earliest a previously medium client can fall out of Chapter 10 is 6 April 2027. The region's large automotive, aerospace and financial-services clients are well above the limits anyway, so assume they remain in scope unless they tell you otherwise."
      },
      {
        "question": "How much corporation tax will my Birmingham contracting company pay in 2026/27?",
        "answer": "A small contracting company with profits up to £50,000 pays corporation tax at 19%. Between £50,000 and £250,000 the main 25% rate applies with marginal relief, giving an effective rate of about 26.5% on profits in that band, and above £250,000 the full 25% applies. Those limits are divided by the number of associated companies, so if you and a spouse each run a connected company the bands shrink. We factor this into your salary, dividend and pension planning so profit is extracted efficiently."
      },
      {
        "question": "Should an engineering contractor in Birmingham use a limited company or an umbrella?",
        "answer": "For outside-IR35 engineering work a limited company is usually more tax-efficient, even after the April 2026 dividend-rate rise, mainly because the employer pension contribution is a large, National-Insurance-free, corporation-tax-deductible lever that umbrella PAYE cannot match. For inside-IR35 or short engagements an umbrella can be simpler. From 6 April 2026 the agency or end client is jointly and severally liable for an umbrella's PAYE, so choose an accredited umbrella. We compare both with your real day rate before recommending a structure."
      }
    ],
    "nearbyAreas": [
      "Solihull",
      "Coventry",
      "Wolverhampton",
      "Dudley",
      "Walsall",
      "Sutton Coldfield",
      "Redditch"
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
    "intro": "<p>Leeds is the largest financial and professional-services centre outside London, and a major digital one. It is home to a substantial banking, building-society and insurance presence, a fast-growing fintech and health-tech cluster, and the relocated digital and data functions of several large public bodies. That mix makes Leeds a dense market for finance, technology and change contractors, almost all of whom are engaged by medium or large clients, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Leeds and West Yorkshire contractors remotely. We are not a local office, and you do not need one: status reviews, limited-company accounts and self assessment are all handled online, wherever you are in the region, from the city centre to Bradford, Wakefield and Harrogate. Leeds finance and digital contractors typically work for large, well-resourced engagers that issue formal status determinations, so the value we add is in checking those determinations, getting the structure right and maximising the employer-pension lever.</p><p>For 2026/27 the planning figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, and a frozen personal allowance and higher-rate threshold to 2031. On Leeds day rates, fiscal drag pulls more income into higher-rate territory each year, which makes pension and extraction planning more valuable, not less.</p>",
    "contractorScene": "<p>Leeds is defined by financial services. The city hosts a major retail and corporate banking presence, large building societies and insurers, and a growing fintech and payments scene, all of which run change, regulatory, data and technology programmes staffed by day-rate contractors. These engagers are firmly medium or large, so off-payroll Chapter 10 is the default: the bank, society or insurer issues the status determination statement and the agency nearest your PSC is usually the fee-payer. The raised small-company thresholds make no difference to these clients, and the earliest any previously medium client could drop out of scope is 6 April 2027.</p><p>The second major pool is digital, data and technology. Leeds has built a strong health-tech and data cluster (anchored partly by the large public health and data bodies headquartered in the city) alongside a broader software, cloud and analytics contractor base. Many of these engagements are long, programme-style and repeatedly renewed, which is exactly where the control test and mutuality of obligation deserve a careful look rather than an assumption that an original outside-IR35 position still holds. The third pool is professional services and change consulting, serving the financial and public-sector employers concentrated in the city.</p><p>Leeds contractors face the familiar large-engager issues: inside-IR35 determinations on long programmes, occasional blanket determinations, and the need to assess working practices rather than contract wording. Because the public-sector and quasi-public bodies in the city were among the first subject to off-payroll (public-sector rules applied from April 2017), some Leeds contractors have longer inside-IR35 histories and benefit from a review of whether the determination still reflects how they actually work. We review contracts before signing, check SDS validity, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Banking, building societies and insurance",
        "detail": "Leeds is the largest financial-services centre outside London, with major banks, building societies and insurers running change, regulatory and technology programmes. These medium and large clients issue status determinations under off-payroll Chapter 10."
      },
      {
        "name": "Digital, data and health-tech",
        "detail": "A strong data and health-tech cluster, anchored partly by large public bodies in the city, sustains software, cloud and analytics contractors. Long programme-style engagements need a control and mutuality review to support an outside-IR35 position."
      },
      {
        "name": "Fintech and payments",
        "detail": "Leeds has a fast-growing fintech and payments scene engaging product, engineering and change contractors. Large clients sit inside Chapter 10; smaller scale-ups can keep status with the PSC under Chapter 8, so the regime varies by engagement."
      },
      {
        "name": "Professional services and change consulting",
        "detail": "Consulting and interim professionals serve the city's financial and public-sector employers. Engagements through large clients fall under Chapter 10, with genuine project deliverables and autonomy supporting an outside conclusion."
      }
    ],
    "sectorLinks": [
      "finance-contractors",
      "it-contractors",
      "management-consultants",
      "project-managers",
      "marketing-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Leeds?",
        "answer": "No. We serve Leeds and West Yorkshire contractors entirely remotely, covering Bradford, Wakefield, Huddersfield and Harrogate. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online, so there is no need for a local office or face-to-face meetings. Genuine contractor and IR35 specialism matters far more than a Leeds postcode."
      },
      {
        "question": "I contract for a Leeds bank or building society. Who decides my IR35 status?",
        "answer": "The client does. Banks, building societies and insurers in Leeds are medium or large, so off-payroll Chapter 10 applies: the client must issue a status determination statement, taken with reasonable care, and the fee-payer (usually the agency closest to your personal service company) operates PAYE and National Insurance if you are inside. You cannot self-assess your own status for a large client. What you can do is challenge a determination that does not reflect your actual working practices through the client-led disagreement process, which we support."
      },
      {
        "question": "I have been on an inside-IR35 determination for years at a Leeds public body. Should I review it?",
        "answer": "Yes, it is worth a review. Public-sector off-payroll rules have applied since April 2017, so some Leeds contractors have long inside histories that may no longer reflect how they actually work, or that were never properly assessed against the control, substitution and mutuality tests. We review the current contract and working practices, and where the determination looks wrong we support the 45-day client-led disagreement process. A wrong inside determination costs you the tax-efficient extraction you would otherwise have."
      },
      {
        "question": "Is a limited company still worthwhile for a Leeds finance contractor in 2026/27?",
        "answer": "For outside-IR35 engagements, usually yes. Dividend rates rose to 10.75% and 35.75% on 6 April 2026, which narrowed the incorporation advantage, but a limited company still beats umbrella PAYE for most outside work once you use the salary and dividend mix and an employer pension contribution. The pension route carries no employer or employee National Insurance and is deductible against corporation tax, which is a lever umbrella PAYE cannot match. For inside-IR35 work an umbrella is often simpler. We model both with your real figures."
      },
      {
        "question": "How does fiscal drag affect Leeds contractors in 2026/27?",
        "answer": "The personal allowance (£12,570) and the higher-rate threshold (£50,270) are frozen to April 2031, so as day rates rise more of your income is pulled into the 40% band over time. For contractors this makes profit-extraction planning more valuable each year: timing dividends across tax years, using the £500 dividend allowance, managing the £100,000 personal-allowance taper, and above all making employer pension contributions to keep income out of the higher bands. We build this into your annual plan."
      }
    ],
    "nearbyAreas": [
      "Bradford",
      "Wakefield",
      "Huddersfield",
      "Harrogate",
      "Halifax",
      "York",
      "Castleford"
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
    "intro": "<p>Bristol has one of the most distinctive contractor markets in the country, built on aerospace and defence engineering, a deep technology and silicon-design base, and a large creative and media cluster. Filton and the wider Bristol and Bath corridor are a national centre for aerospace, advanced engineering and high-tech electronics, which makes the city unusually rich in technical and engineering contractors. Almost all of these engagements are with medium or large clients, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Bristol and South West contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are, from central Bristol to Bath, Filton and the surrounding towns. Aerospace and engineering contractors here often work for large primes and Tier 1 suppliers on long, security-cleared programmes where Chapter 10 is the default, so disciplined status review and employer-pension planning are where we add the most value.</p><p>For 2026/27 the figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, and a personal allowance frozen to 2031. We build the salary, dividend and pension mix around those numbers for your specific position.</p>",
    "contractorScene": "<p>Bristol's defining contractor sector is aerospace, defence and advanced engineering. The Filton area and the wider Bristol and Bath corridor host major aerospace primes, defence engineering, and a cluster of high-tech electronics and semiconductor design firms, all of which engage large numbers of design, systems, software and project engineers on day rates. These clients are firmly medium or large, so off-payroll Chapter 10 applies: the prime or supplier issues the status determination statement and the fee-payer operates PAYE on inside-IR35 income. Many of these engagements are long, programme-driven and security-conscious, which tends to push working practices toward more client control, so a careful, honest status review at each renewal is essential rather than assuming the original outside-IR35 position survives.</p><p>The second pillar is technology and silicon. Bristol has a nationally significant chip-design and deep-tech scene alongside a broad software, cloud and data contractor base, much of it serving the engineering and aerospace ecosystem. The third is creative, media and digital: Bristol's well-known production and animation cluster, plus a strong digital-agency scene, engages freelance producers, developers, designers and content specialists. As elsewhere, the creative sector mixes small agencies (where status stays with the PSC under Chapter 8 and the 5% expenses allowance survives) and large brand clients (where Chapter 10 applies), so the same contractor can face different rules on concurrent engagements.</p><p>The status issues in Bristol mirror the national pattern but with an engineering tilt: inside-IR35 determinations on long programmes, the control test biting in tightly managed aerospace and defence environments, and the need to look at working practices over contract wording. We review contracts before signing, check status determination statements for validity and reasonable care, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly. We also flag the April 2026 umbrella joint-and-several-liability change, which is tightening preferred-supplier lists across the South West.</p>",
    "keySectors": [
      {
        "name": "Aerospace, defence and advanced engineering",
        "detail": "Filton and the Bristol and Bath corridor are a national centre for aerospace primes, defence engineering and high-tech electronics, engaging design, systems and project engineers on day rates. Large clients sit inside Chapter 10, and tightly managed programmes make the control test a live issue."
      },
      {
        "name": "Technology, software and silicon design",
        "detail": "Bristol has a nationally significant chip-design and deep-tech scene alongside a broad software, cloud and data contractor base. Long programme engagements with large clients fall under off-payroll Chapter 10 and need a control and mutuality review."
      },
      {
        "name": "Creative, media and animation",
        "detail": "Bristol's production, animation and digital-agency cluster engages freelance producers, developers and designers. Small agencies keep status with the PSC under Chapter 8; large brand clients sit inside Chapter 10, so the regime varies by engagement."
      },
      {
        "name": "Engineering and project consultancy",
        "detail": "Consulting and interim engineers and project professionals serve the aerospace and tech ecosystem. Engagements through large clients are governed by Chapter 10, with genuine autonomy and substitution supporting an outside position."
      }
    ],
    "sectorLinks": [
      "engineering-contractors",
      "it-contractors",
      "project-managers",
      "marketing-contractors",
      "management-consultants"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Bristol?",
        "answer": "No. We act for Bristol and South West contractors entirely remotely, covering Bath, Filton, Weston-super-Mare and the surrounding towns. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online with secure document sharing. There is no need for a local office or in-person meetings, and specialist contractor and IR35 expertise matters far more than a Bristol postcode."
      },
      {
        "question": "I am an aerospace engineering contractor at Filton. Am I inside IR35?",
        "answer": "Off-payroll Chapter 10 almost certainly applies, because the aerospace primes and Tier 1 suppliers are large clients that must issue a status determination statement. Whether you are inside or outside turns on the facts: genuine autonomy over how you do the engineering, a real right of substitution and being in business on your own account point outside, but tightly managed, security-conscious programmes often show strong client control, which points inside. Long repeatedly renewed engagements also raise mutuality-of-obligation questions. We review the contract and the actual working practices before you sign and at each renewal."
      },
      {
        "question": "Does the higher small-company threshold affect my Bristol aerospace or tech client?",
        "answer": "No, not in practice. The thresholds rose to £15m turnover, £7.5m balance sheet and 50 employees for financial years beginning on or after 6 April 2025, and the earliest a previously medium client can drop out of Chapter 10 is 6 April 2027 because of the relevant-financial-year lag. Bristol's aerospace primes, defence firms and large tech employers are far above the limits regardless, so assume they remain in scope of off-payroll for 2026/27."
      },
      {
        "question": "I work for a small Bristol creative agency on some jobs and a large brand on others. Which IR35 rules apply?",
        "answer": "Different rules apply to each engagement. A small agency that meets the small-company tests (and a wholly overseas client) keeps the status decision with your personal service company under Chapter 8, where you self-assess and the 5% expenses allowance is still available. A large brand client puts you in Chapter 10, where the client issues the determination and the fee-payer operates PAYE if you are inside. You can genuinely be outside on the agency work and inside on the brand work in the same year. We map each engagement to the correct regime."
      },
      {
        "question": "Should a Bristol engineering contractor use a limited company or an umbrella?",
        "answer": "For outside-IR35 engineering work a limited company is usually more tax-efficient, mainly because the employer pension contribution is a large, National-Insurance-free, corporation-tax-deductible lever, which matters for technical contractors on strong day rates. For inside-IR35 or short engagements an umbrella is often simpler. From 6 April 2026 the agency or end client is jointly and severally liable for an umbrella's PAYE, so use an accredited, transparent umbrella. We compare both routes with your real figures before recommending one."
      }
    ],
    "nearbyAreas": [
      "Bath",
      "Filton",
      "Weston-super-Mare",
      "Portishead",
      "Keynsham",
      "Yate",
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
    "intro": "<p>Glasgow is Scotland's largest contractor market, with a strong financial-services back-office presence, a substantial engineering and energy-services base, and a growing technology and digital scene. Major banks and insurers run large operational and technology centres in the city, the engineering sector spans shipbuilding, manufacturing and the energy supply chain, and the digital cluster around the city centre continues to expand. Most engagers are medium or large, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Glasgow contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are in Greater Glasgow, from the city centre to Paisley and the surrounding towns. One Glasgow-specific point matters: the off-payroll and IR35 rules are UK-wide and identical to England, but Scottish income tax rates and bands apply to your salary and deemed-employment income, so your self assessment must use the correct Scottish bands. We handle that as standard for Scottish clients.</p><p>For 2026/27 the UK-wide figures still apply to dividends and company taxes: dividend rates of 10.75% and 35.75% from 6 April 2026 (dividends are taxed at UK rates, not Scottish rates), corporation tax of 19% rising to a 26.5% marginal rate, and employer National Insurance at 15% above £5,000. We build the salary, dividend and pension mix around your Scottish income-tax position.</p>",
    "contractorScene": "<p>Glasgow's contractor market leans heavily on financial-services operations and technology. Several major banks and insurers run large processing, operations and technology centres in the city, staffing change, data, regulatory and software programmes with day-rate contractors. These clients are medium or large, so off-payroll Chapter 10 applies: the bank or insurer issues the status determination statement and the fee-payer operates PAYE on inside-IR35 income. The raised small-company thresholds (£15m, £7.5m, 50 employees) do not take these large engagers out of scope, and 6 April 2027 is the earliest any previously medium client could drop out in any event.</p><p>The second pillar is engineering and energy services. Glasgow and the surrounding region carry shipbuilding, defence manufacturing, renewables and a broad energy supply chain, all of which engage design, systems, project and commissioning engineers on contract. The third is technology and digital: the city-centre tech cluster sustains software, data and product contractors, with a mix of large corporates (Chapter 10) and smaller scale-ups (where status can stay with the PSC under Chapter 8). As in the rest of the country, long, repeatedly renewed engagements are where the control test and mutuality of obligation most need a proper review.</p><p>The defining Glasgow nuance is the Scottish income-tax position. IR35 and off-payroll status are decided under exactly the same UK rules as in England, and dividends and corporation tax are charged at UK rates, but your salary and any inside-IR35 deemed-employment income are taxed using Scottish income-tax bands and rates. That changes the optimal salary and dividend split compared with an English contractor, so the extraction plan has to be built on the Scottish numbers. We handle the Scottish self assessment, review contracts and status determinations, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Financial services operations and technology",
        "detail": "Major banks and insurers run large operations and technology centres in Glasgow, staffing change, data and regulatory programmes with contractors. These medium and large clients issue status determinations under off-payroll Chapter 10."
      },
      {
        "name": "Engineering, manufacturing and energy services",
        "detail": "Shipbuilding, defence manufacturing, renewables and the energy supply chain engage design, systems, project and commissioning engineers. Large clients sit inside Chapter 10, with genuine autonomy and substitution supporting an outside position."
      },
      {
        "name": "Technology, software and digital",
        "detail": "Glasgow's city-centre tech cluster sustains software, data and product contractors across corporates and scale-ups. Large clients fall under Chapter 10; smaller scale-ups can leave status with the PSC under Chapter 8."
      },
      {
        "name": "Professional services and change",
        "detail": "Consulting and interim professionals serve the financial and engineering employers in the city. Engagements through large clients are governed by Chapter 10, taxed on the Scottish income-tax bands for salary and deemed-employment income."
      }
    ],
    "sectorLinks": [
      "finance-contractors",
      "engineering-contractors",
      "it-contractors",
      "project-managers",
      "management-consultants"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Glasgow?",
        "answer": "No. We act for Glasgow and Greater Glasgow contractors entirely remotely, covering Paisley, East Kilbride, Hamilton and the surrounding towns. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online. There is no need for a local office, and we are fully set up to file Scottish self assessment returns using the correct Scottish income-tax bands."
      },
      {
        "question": "Does IR35 work differently in Scotland?",
        "answer": "The IR35 and off-payroll working rules are UK-wide and identical to England: the small-company test, Chapter 8 versus Chapter 10, the status determination statement and the deemed-employment mechanics are the same. What differs is income tax. Your salary and any inside-IR35 deemed-employment income are taxed at Scottish income-tax rates and bands, while dividends and corporation tax are charged at UK rates. That changes the optimal salary and dividend split, so the extraction plan must be built on the Scottish numbers. We handle this as standard."
      },
      {
        "question": "How does the Scottish income-tax position change my optimal salary and dividends?",
        "answer": "Because salary is taxed at Scottish rates and bands while dividends are taxed at UK rates, the most efficient split for a Glasgow contractor can differ from an English one. The employer-pension contribution remains the biggest lever for everyone, but the precise salary level and the point at which extra dividends tip into higher-rate territory shift with the Scottish bands. There is no single universal optimal salary in any case, so we model your specific position rather than applying an English rule of thumb."
      },
      {
        "question": "I contract for a Glasgow bank. Who decides my IR35 status?",
        "answer": "The bank does. Major banks and insurers in Glasgow are medium or large clients, so off-payroll Chapter 10 applies: the client must issue a status determination statement taken with reasonable care, and the fee-payer operates PAYE and National Insurance if you are inside. You cannot self-assess your own status for a large client. Where a determination does not reflect your actual working practices, you have a client-led disagreement process and the client must respond within 45 days, which we support."
      },
      {
        "question": "Is a limited company still worth it for a Glasgow contractor in 2026/27?",
        "answer": "For outside-IR35 work, usually yes. Dividends are taxed at UK rates (10.75% and 35.75% from 6 April 2026), and even after that rise a limited company beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and an employer pension contribution. The pension route carries no National Insurance and is deductible against corporation tax. We model both the limited-company and umbrella routes on your Scottish income-tax position before recommending a structure."
      }
    ],
    "nearbyAreas": [
      "Paisley",
      "East Kilbride",
      "Hamilton",
      "Motherwell",
      "Clydebank",
      "Cumbernauld",
      "Renfrew"
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
    "intro": "<p>Edinburgh is one of the largest financial centres in the UK and the heart of Scotland's contractor market for finance, fund management and technology. The city is home to major banks, life and pensions companies, asset and fund managers, and a fast-growing fintech and data scene, all of which run change, regulatory and technology programmes staffed by day-rate contractors. Almost all of these engagers are medium or large, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Edinburgh contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are, across Edinburgh and the Lothians. As with all Scottish clients, one point is specific to you: IR35 and off-payroll status are decided under the same UK rules as England, but your salary and any inside-IR35 income are taxed at Scottish income-tax rates, so the extraction plan and self assessment must use the Scottish bands. We handle that as standard.</p><p>For 2026/27 the UK-wide company and dividend figures still apply: dividend rates of 10.75% and 35.75% from 6 April 2026 (charged at UK rates, not Scottish rates), corporation tax of 19% rising to a 26.5% marginal rate, and employer National Insurance at 15% above £5,000. We build the plan around your Scottish income-tax position.</p>",
    "contractorScene": "<p>Edinburgh's contractor market is dominated by financial services to a degree matched only by the City of London. The city hosts major banks, some of the UK's largest life, pensions and investment firms, and a deep asset and fund-management sector, all running regulatory, change, data and technology programmes that rely on day-rate contractors. These clients are firmly medium or large, so off-payroll Chapter 10 is the default: the firm issues the status determination statement and the fee-payer operates PAYE on inside-IR35 income. Blanket inside determinations have appeared among some of the larger Edinburgh financial institutions, so checking whether a determination was taken with reasonable care for your specific role is often worthwhile.</p><p>The second major pool is fintech, data and technology. Edinburgh has a strong fintech and data-science cluster (supported by the city's universities and its financial base), sustaining software, data, cloud and analytics contractors. Many of these engagements are long and programme-style, which is where the control test and mutuality of obligation most need a proper review rather than an assumption that an original outside-IR35 position holds. The third pool is professional services and consulting, serving the financial institutions concentrated in the city.</p><p>The Edinburgh-specific issue, beyond the financial-services blanket-determination risk, is the Scottish income-tax position. Status is decided under UK-wide rules and dividends and corporation tax are charged at UK rates, but salary and inside-IR35 deemed-employment income are taxed at Scottish rates and bands, which changes the optimal salary and dividend split. We file the Scottish self assessment, review contracts and status determinations, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Banking, life, pensions and investment",
        "detail": "Edinburgh is one of the UK's largest financial centres, home to major banks and some of the country's biggest life, pensions and investment firms. These large clients run change and regulatory programmes and issue status determinations under off-payroll Chapter 10."
      },
      {
        "name": "Asset and fund management",
        "detail": "A deep asset and fund-management sector engages change, data and operations contractors. As medium and large clients these firms sit inside Chapter 10, with project deliverables and genuine autonomy supporting an outside-IR35 position."
      },
      {
        "name": "Fintech, data and technology",
        "detail": "Edinburgh's fintech and data-science cluster, supported by its universities, sustains software, data and analytics contractors. Long programme engagements with large clients fall under Chapter 10 and need a control and mutuality review."
      },
      {
        "name": "Professional services and consulting",
        "detail": "Consultants and interim professionals serve the city's financial institutions. Engagements through large clients are governed by Chapter 10, taxed on the Scottish income-tax bands for salary and deemed-employment income."
      }
    ],
    "sectorLinks": [
      "finance-contractors",
      "it-contractors",
      "management-consultants",
      "project-managers",
      "legal-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Edinburgh?",
        "answer": "No. We act for Edinburgh and Lothians contractors entirely remotely. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online with secure document sharing, so there is no need for a local office or face-to-face meetings. We are fully set up to file Scottish self assessment returns using the correct Scottish income-tax bands, which matters for Edinburgh contractors."
      },
      {
        "question": "My Edinburgh financial-services client gave a blanket inside-IR35 determination. Can I challenge it?",
        "answer": "Yes. A status determination statement must reach a conclusion with reasons taken with reasonable care for your specific engagement. Some larger Edinburgh financial institutions applied inside determinations across whole role categories after April 2021 without individual assessment, which can be a failure of reasonable care and can leave the client as the deemed employer. You have a client-led disagreement process and the client must respond within 45 days. We review the SDS, your contract and your actual working practices and support the disagreement where the inside finding does not stand up."
      },
      {
        "question": "Does being in Scotland change my IR35 position in Edinburgh?",
        "answer": "Not the status decision itself. IR35 and off-payroll status are decided under UK-wide rules identical to England, and dividends and corporation tax are charged at UK rates. What changes is income tax: your salary and any inside-IR35 deemed-employment income are taxed at Scottish income-tax rates and bands. That affects the size of your tax bill and the optimal salary and dividend split, so your self assessment and extraction plan must use the Scottish numbers, which we handle as standard."
      },
      {
        "question": "Is a limited company still worthwhile for an Edinburgh finance contractor in 2026/27?",
        "answer": "For outside-IR35 work, usually yes. Even after dividend rates rose to 10.75% and 35.75% on 6 April 2026 (charged at UK rates), a limited company beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and an employer pension contribution. The pension route carries no National Insurance and is corporation-tax-deductible. We model both routes on your Scottish income-tax position before recommending one, because the optimal split differs from an English contractor's."
      },
      {
        "question": "What is changing for Edinburgh umbrella workers from April 2026?",
        "answer": "From 6 April 2026 the recruitment agency that contracts with the end client (or the end client where there is no agency) becomes jointly and severally liable with the umbrella for any PAYE and National Insurance the umbrella fails to pay. The umbrella remains your legal employer. In practice, Edinburgh agencies and the large financial-services engagers are tightening their preferred-supplier lists, so use an accredited, transparent umbrella that issues a Key Information Document and pays holiday pay properly. We can review an umbrella before you sign."
      }
    ],
    "nearbyAreas": [
      "Livingston",
      "Dunfermline",
      "Kirkcaldy",
      "Musselburgh",
      "Dalkeith",
      "Bathgate",
      "Linlithgow"
    ]
  },

  "reading": {
    "slug": "reading",
    "name": "Reading",
    "region": "Berkshire",
    "population": "175,000",
    "geo": {
      "lat": 51.4543,
      "lng": -0.9781
    },
    "intro": "<p>Reading is the commercial heart of the Thames Valley, the UK's densest corridor of technology employment outside London. The town and the surrounding Berkshire and M4 corridor host the UK headquarters and major operations of many of the world's largest technology, software and telecoms companies, which makes it one of the richest markets in the country for IT, software and technology contractors. Almost all of these engagers are large multinational clients, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Reading and Thames Valley contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are along the M4 corridor, from Reading to Bracknell, Slough and Maidenhead. Reading's IT contractors almost universally work for large technology and telecoms clients that issue formal status determinations, so the value we add is in checking those determinations, getting the structure right and maximising the employer-pension lever.</p><p>For 2026/27 the figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, corporation tax of 19% rising to a 26.5% marginal rate, and a personal allowance frozen to 2031. On Thames Valley day rates, fiscal drag and the dividend-rate rise make extraction and pension planning more valuable, not less.</p>",
    "contractorScene": "<p>Reading and the Thames Valley are defined by technology. The M4 corridor hosts the UK headquarters or major operations of a large share of the world's biggest software, hardware, cloud and telecoms companies, which between them engage one of the largest concentrations of IT and technology contractors in the country. Software developers, cloud and infrastructure engineers, data and cyber specialists, and technology project and programme managers all work here in volume. Because these clients are large multinationals, off-payroll Chapter 10 is the default: the client issues the status determination statement and the agency closest to your personal service company is usually the fee-payer. The raised small-company thresholds are irrelevant to engagers of this size.</p><p>Reading's contractor engagements are frequently long and programme-style, which is exactly where the control test and mutuality of obligation deserve a careful review. A technology contractor who has been embedded in one large client's delivery team across multiple renewals, filling what looks like a permanent headcount role and taking direction on sprint priorities and methodology, can present an inside picture even where the contract wording looks clean. HMRC looks at what actually happens, so an honest working-practices assessment matters far more than a tidy substitution clause. Many Thames Valley IT contractors received inside determinations after April 2021, some of them too readily, so a review of whether the determination reflects reality is often worthwhile.</p><p>Beyond core IT, Reading and the wider corridor carry a strong base of technology project and programme managers, business-change consultants and finance contractors serving the large corporate and telecoms employers. The status issues are the standard Chapter 10 ones: inside determinations on long programmes, occasional blanket determinations, and the need to assess working practices over wording. We review contracts before signing, check SDS validity, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Software, cloud and enterprise technology",
        "detail": "The M4 corridor hosts the UK operations of many of the world's largest software, cloud and hardware companies, engaging one of the UK's largest concentrations of IT contractors. These large multinational clients issue status determinations under off-payroll Chapter 10."
      },
      {
        "name": "Telecoms and networks",
        "detail": "Major telecoms and networking employers in the Thames Valley engage infrastructure, network and systems contractors. As large clients they sit inside Chapter 10, and long embedded engagements need a control and mutuality review to support an outside position."
      },
      {
        "name": "Technology project and programme management",
        "detail": "The volume of large technology programmes sustains a strong base of project and programme managers and business-change contractors. Engagements through large clients are governed by Chapter 10, with genuine project deliverables supporting an outside conclusion."
      },
      {
        "name": "Data, cyber and consulting",
        "detail": "Data, cyber-security and technology-consulting contractors serve the corridor's corporate and telecoms base. Large clients fall under Chapter 10, and a careful working-practices review matters more than a substitution clause."
      }
    ],
    "sectorLinks": [
      "it-contractors",
      "project-managers",
      "management-consultants",
      "engineering-contractors",
      "finance-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Reading?",
        "answer": "No. We serve Reading and Thames Valley contractors entirely remotely, covering Bracknell, Slough, Maidenhead, Wokingham and the M4 corridor. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online with secure document sharing. There is no need for a local office or in-person meetings, and specialist IT-contractor and IR35 expertise matters far more than a Reading postcode."
      },
      {
        "question": "I am an IT contractor for a large Thames Valley tech client. Am I inside IR35?",
        "answer": "Off-payroll Chapter 10 applies because the client is a large multinational, so they issue the status determination statement and the fee-payer operates PAYE if you are inside. Whether you are genuinely inside or outside depends on the working practices, not the contract wording. Where a client dictates your methodology, hours, sprint priorities and tooling, the control test points inside, and a long embedded engagement filling a permanent-style role raises mutuality of obligation. A genuine, unfettered right of substitution points outside, but only if it is real. We review the contract and the actual working practices before you sign and at each renewal."
      },
      {
        "question": "My large tech client issued a blanket inside determination after April 2021. Can I challenge it?",
        "answer": "Yes. A status determination statement must be reached with reasonable care for your specific engagement. Many Thames Valley technology clients moved categories of roles inside IR35 after April 2021 without individual assessment, which can be a failure of reasonable care. You have a client-led disagreement process and the client must respond within 45 days, either confirming the determination with reasons or issuing a new one. We review the SDS, your contract and your working practices and support the disagreement where the inside finding does not hold up."
      },
      {
        "question": "Is a limited company still worth it for a Reading IT contractor in 2026/27?",
        "answer": "For genuinely outside-IR35 work, usually yes. Dividend rates rose to 10.75% and 35.75% on 6 April 2026, narrowing the incorporation advantage, but a limited company still beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and an employer pension contribution. The pension route is National-Insurance-free and corporation-tax-deductible, which is a large lever on Thames Valley day rates. For inside-IR35 work an umbrella is often simpler. We model both with your real figures."
      },
      {
        "question": "What expenses can a Reading contractor claim under IR35?",
        "answer": "For outside-IR35 work through your limited company the usual business expenses apply: accountancy fees, professional indemnity insurance, equipment and software, an employer pension contribution (the biggest lever), and business travel to a temporary workplace at 55p per mile for the first 10,000 miles from 6 April 2026, subject to the 24-month rule. For inside-IR35 engagements home-to-client travel is generally not deductible and the 5% expenses allowance is abolished under Chapter 10, so the focus shifts to pension contributions. We set the mix correctly for each engagement."
      }
    ],
    "nearbyAreas": [
      "Bracknell",
      "Slough",
      "Maidenhead",
      "Wokingham",
      "Basingstoke",
      "Newbury",
      "Henley-on-Thames"
    ]
  },

  "cambridge": {
    "slug": "cambridge",
    "name": "Cambridge",
    "region": "Cambridgeshire",
    "population": "145,000",
    "geo": {
      "lat": 52.2053,
      "lng": 0.1218
    },
    "intro": "<p>Cambridge has one of the most specialised contractor markets in the UK, built around the technology, life-sciences and biotech cluster known as Silicon Fen. The city and its science and business parks host a dense concentration of deep-tech, semiconductor, software, pharmaceutical and biotech employers, from global names to fast-growing university spinouts. That mix creates strong demand for technical, scientific and engineering contractors, most of them engaged by medium or large clients, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Cambridge and East of England contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are, across Cambridge, the science parks and the surrounding towns. Cambridge's distinctive feature is the spread of client sizes: alongside the global tech and pharma names sit many smaller spinouts and scale-ups, some of which meet the small-company tests, so the same contractor can face Chapter 10 on one engagement and self-assess under Chapter 8 on another.</p><p>For 2026/27 the figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, corporation tax of 19% rising to a 26.5% marginal rate, and a personal allowance frozen to 2031. We build the salary, dividend and pension mix around those numbers for your position.</p>",
    "contractorScene": "<p>Cambridge's contractor market is anchored by deep technology and life sciences. The Silicon Fen cluster, spread across the Cambridge Science Park, the Biomedical Campus and a network of business and innovation parks, includes global semiconductor and software firms, major pharmaceutical and biotech companies, and a constant stream of university spinouts. This generates demand for highly specialised contractors: chip and hardware engineers, embedded and systems software developers, data scientists, and scientific, clinical and regulatory contractors in the pharma and biotech space. Where the end client is a large global firm or a major pharma company, off-payroll Chapter 10 applies and the client issues the status determination statement.</p><p>The distinctive Cambridge dynamic is the mix of client sizes. Alongside the multinationals sit many genuinely small spinouts and early-stage scale-ups. A small end client (meeting two of the £15m turnover, £7.5m balance sheet and 50 employees tests, and not in scope until 6 April 2027 even if it crosses them) keeps the status decision with the contractor under Chapter 8, where the PSC self-assesses and the 5% expenses allowance is still available. So a Cambridge contractor can genuinely be inside-IR35-determined by a large pharma client on one engagement and self-assessing as outside for a small spinout on another in the same tax year. Getting the regime right for each client is essential, and it is easy to get wrong.</p><p>The technical and scientific nature of Cambridge contracting also affects status. Genuine specialist expertise, autonomy over method, and being engaged for a defined deliverable point toward outside IR35, but long embedded engagements in a large client's R&D or clinical function raise the usual control and mutuality questions. We map each client to the correct regime, review contracts and working practices before you sign, check status determination statements for large clients, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Deep tech, semiconductor and software",
        "detail": "The Silicon Fen cluster hosts global semiconductor and software firms engaging chip, hardware, embedded and systems contractors. Large clients sit inside Chapter 10; smaller spinouts can keep status with the PSC under Chapter 8, so the regime varies by engagement."
      },
      {
        "name": "Pharmaceutical, biotech and life sciences",
        "detail": "The Biomedical Campus and surrounding parks engage scientific, clinical, data and regulatory contractors for major pharma and biotech firms. As large clients these sit inside Chapter 10, with genuine specialist autonomy supporting an outside position."
      },
      {
        "name": "University spinouts and scale-ups",
        "detail": "Cambridge produces a steady stream of early-stage spinouts and scale-ups. Many meet the small-company tests, so status stays with the contractor under Chapter 8 and the 5% expenses allowance is still available on those engagements."
      },
      {
        "name": "Research, data science and engineering",
        "detail": "Data scientists, research engineers and technical project contractors serve the tech and life-sciences base. Long embedded R&D engagements with large clients raise control and mutuality questions that we review before you sign."
      }
    ],
    "sectorLinks": [
      "it-contractors",
      "engineering-contractors",
      "project-managers",
      "management-consultants",
      "finance-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Cambridge?",
        "answer": "No. We act for Cambridge and East of England contractors entirely remotely, covering the science parks, the Biomedical Campus and the surrounding towns. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online. There is no need for a local office, and specialist contractor and IR35 expertise matters far more than a Cambridge postcode."
      },
      {
        "question": "I contract for both a big pharma client and a small spinout. Which IR35 rules apply?",
        "answer": "Different rules apply to each. A major pharma or global tech client is medium or large, so off-payroll Chapter 10 applies: they issue the status determination statement and the fee-payer operates PAYE if you are inside. A genuinely small spinout that meets two of the small-company tests (£15m turnover, £7.5m balance sheet, 50 employees) keeps the status decision with your personal service company under Chapter 8, where you self-assess and the 5% expenses allowance is still available. You can be inside-determined on the pharma work and outside on the spinout work in the same year. We map each engagement to the correct regime."
      },
      {
        "question": "When could a small Cambridge spinout I work for come into off-payroll scope?",
        "answer": "Even if a spinout grows past the small-company thresholds, it does not immediately come into scope. A company must meet the limits in two consecutive financial years, and because of the relevant-financial-year lag the earliest it could be obliged to operate off-payroll Chapter 10 is 6 April 2027. So a fast-growing spinout that crosses the thresholds during 2026/27 will generally still leave status with your PSC under Chapter 8 for now. We track this as the spinout scales so you are not caught out by a change of regime."
      },
      {
        "question": "I am a specialist scientific or engineering contractor. Does that help my IR35 position?",
        "answer": "Genuine specialist expertise, real autonomy over how you do the work, and being engaged for a defined deliverable all point toward outside IR35, and being in business on your own account is a relevant factor. But specialism alone does not put you outside: a long embedded engagement in a large client's R&D or clinical team, taking direction and filling a permanent-style role, can present an inside picture on control and mutuality of obligation. HMRC looks at what actually happens, so we assess the real working practices for each engagement rather than relying on your job title."
      },
      {
        "question": "Is a limited company still worth it for a Cambridge contractor in 2026/27?",
        "answer": "For outside-IR35 work, usually yes. Even after dividend rates rose to 10.75% and 35.75% on 6 April 2026, a limited company beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and an employer pension contribution, which is National-Insurance-free and corporation-tax-deductible. For inside-IR35 work an umbrella is often simpler. From 6 April 2026 the agency or end client is jointly and severally liable for an umbrella's PAYE, so use an accredited umbrella. We model both with your real figures."
      }
    ],
    "nearbyAreas": [
      "Huntingdon",
      "St Neots",
      "Ely",
      "Newmarket",
      "Royston",
      "Saffron Walden",
      "St Ives"
    ]
  },

  "oxford": {
    "slug": "oxford",
    "name": "Oxford",
    "region": "Oxfordshire",
    "population": "165,000",
    "geo": {
      "lat": 51.7520,
      "lng": -1.2577
    },
    "intro": "<p>Oxford has a contractor market shaped by research, biotech and high-technology spinouts. The city and the surrounding Oxfordshire science parks and innovation campuses host a dense cluster of life-sciences, biotech, deep-tech and research-driven companies, many of them university spinouts, alongside major science facilities and a growing space and quantum sector. That creates strong demand for scientific, technical and engineering contractors, most engaged by medium or large clients, so the off-payroll working rules apply and the end client determines IR35 status.</p><p>We are a specialist contractor-accountancy and IR35 practice serving Oxford and Oxfordshire contractors remotely. We are not a local office, and you do not need one: contract reviews, status checks, limited-company accounts and self assessment are handled online wherever you are, across the city, the science parks and the surrounding towns. Like Cambridge, Oxford has a wide spread of client sizes, from global pharma and tech names down to early-stage spinouts that meet the small-company tests, so the same contractor can face Chapter 10 on one engagement and self-assess under Chapter 8 on another.</p><p>For 2026/27 the figures are the same nationwide: dividend rates of 10.75% and 35.75% from 6 April 2026, employer National Insurance at 15% above £5,000, corporation tax of 19% rising to a 26.5% marginal rate, and a personal allowance frozen to 2031. We build the salary, dividend and pension mix around those numbers for your position.</p>",
    "contractorScene": "<p>Oxford's contractor market is anchored by life sciences, biotech and research-driven technology. The science parks, innovation campuses and the major research facilities around the city host pharmaceutical and biotech firms, deep-tech and instrumentation companies, and a strong pipeline of university spinouts in areas such as therapeutics, diagnostics, quantum and space. This generates demand for highly specialised contractors: scientific, clinical and regulatory professionals in pharma and biotech, plus research engineers, data scientists, embedded and systems software developers and technical project managers. Where the end client is a large pharma company or an established technology firm, off-payroll Chapter 10 applies and the client issues the status determination statement.</p><p>As in Cambridge, the defining dynamic is the mix of client sizes. Oxford produces a high volume of early-stage spinouts and scale-ups, many of which genuinely meet the small-company tests (two of £15m turnover, £7.5m balance sheet and 50 employees). A small end client keeps the status decision with the contractor under Chapter 8, where the PSC self-assesses and the 5% expenses allowance survives, and even a fast-growing spinout that crosses the thresholds is not obliged into Chapter 10 until 6 April 2027 at the earliest because of the two-consecutive-years rule and the relevant-financial-year lag. So an Oxford contractor can be inside-determined by a large pharma client and outside (self-assessed) for a small spinout in the same year.</p><p>The technical and scientific character of Oxford contracting cuts both ways on status. Genuine specialist expertise, autonomy over method and engagement for a defined deliverable point toward outside IR35 and being in business on your own account, but long embedded engagements in a large client's research or clinical function raise the standard control and mutuality questions. We map each client to the correct regime, review contracts and working practices before you sign, check status determination statements for large clients, support the 45-day client-led disagreement process where an inside finding looks wrong, and model umbrella versus limited company honestly, flagging the April 2026 umbrella joint-and-several-liability change.</p>",
    "keySectors": [
      {
        "name": "Pharmaceutical, biotech and therapeutics",
        "detail": "Oxford's science parks and research campuses host pharma, biotech and therapeutics firms engaging scientific, clinical, data and regulatory contractors. As large clients these sit inside off-payroll Chapter 10, with genuine specialist autonomy supporting an outside position."
      },
      {
        "name": "University spinouts and deep-tech scale-ups",
        "detail": "Oxford produces a high volume of spinouts in therapeutics, diagnostics, quantum and space. Many meet the small-company tests, so status stays with the contractor under Chapter 8 and the 5% expenses allowance is still available on those engagements."
      },
      {
        "name": "Research, instrumentation and engineering",
        "detail": "Major research facilities and instrumentation firms engage research engineers, embedded software and technical project contractors. Long embedded engagements with large clients raise control and mutuality questions that we review before you sign."
      },
      {
        "name": "Data science and technology",
        "detail": "Data scientists, software developers and technology contractors serve the research and life-sciences base. Large clients fall under Chapter 10; smaller spinouts can keep status with the PSC under Chapter 8, so the regime varies by engagement."
      }
    ],
    "sectorLinks": [
      "engineering-contractors",
      "it-contractors",
      "project-managers",
      "management-consultants",
      "finance-contractors"
    ],
    "localFaqs": [
      {
        "question": "Do I need a contractor accountant based in Oxford?",
        "answer": "No. We act for Oxford and Oxfordshire contractors entirely remotely, covering the science parks, the research campuses and the surrounding towns. IR35 contract reviews, status determination checks, limited-company accounts and self assessment are handled online with secure document sharing. There is no need for a local office or in-person meetings, and specialist contractor and IR35 expertise matters far more than an Oxford postcode."
      },
      {
        "question": "I work for a large pharma client and a small Oxford spinout. Which IR35 rules apply?",
        "answer": "Different rules apply to each engagement. A large pharma or established technology client is medium or large, so off-payroll Chapter 10 applies: they issue the status determination statement and the fee-payer operates PAYE if you are inside. A genuinely small spinout that meets two of the small-company tests keeps the status decision with your personal service company under Chapter 8, where you self-assess and the 5% expenses allowance is still available. You can be inside-determined on the pharma work and outside on the spinout work in the same tax year. We map each client to the correct regime."
      },
      {
        "question": "A spinout I contract for is growing fast. When does it come into off-payroll scope?",
        "answer": "Not immediately. A company must meet the small-company thresholds (£15m turnover, £7.5m balance sheet, 50 employees) in two consecutive financial years before its status changes, and because of the relevant-financial-year lag the earliest it could be obliged to operate Chapter 10 is 6 April 2027. So an Oxford spinout that crosses the thresholds during 2026/27 will generally still leave status with your PSC under Chapter 8 for now. We monitor this as the company scales so a change of regime does not catch you out."
      },
      {
        "question": "Does my specialist scientific or engineering expertise put me outside IR35 in Oxford?",
        "answer": "It helps but does not decide it. Genuine specialist expertise, real autonomy over how you do the work, a genuine right of substitution and being engaged for a defined deliverable all point toward outside IR35 and being in business on your own account. But a long embedded engagement in a large client's research or clinical team, taking direction and filling a permanent-style role, can present an inside picture on control and mutuality of obligation. HMRC assesses what actually happens, so we review the real working practices for each engagement rather than relying on your role."
      },
      {
        "question": "Is a limited company still worth it for an Oxford contractor in 2026/27?",
        "answer": "For outside-IR35 work, usually yes. Even after dividend rates rose to 10.75% and 35.75% on 6 April 2026, a limited company beats umbrella PAYE for most outside engagements once you use the salary and dividend mix and an employer pension contribution, which carries no National Insurance and is deductible against corporation tax. For inside-IR35 work an umbrella is often simpler. From 6 April 2026 the agency or end client is jointly and severally liable for an umbrella's PAYE, so use an accredited umbrella. We model both routes with your real figures."
      }
    ],
    "nearbyAreas": [
      "Abingdon",
      "Bicester",
      "Witney",
      "Didcot",
      "Kidlington",
      "Banbury",
      "Wantage"
    ]
  }
};
