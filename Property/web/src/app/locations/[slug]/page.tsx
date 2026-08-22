import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type Props = { params: Promise<{ slug: string }> };

/**
 * City-level AccountingService JSON-LD. Built inline (rather than via the shared
 * legacy buildLocalBusinessJsonLd shim) so we can omit the telephone/contactPoint
 * and any street address: no public phone or office is advertised, enquiries are
 * handled via the on-site /contact form. areaServed is the city only, so the
 * markup makes no NAP claim we cannot stand behind.
 */
function buildCityLocalBusinessJsonLd(config: {
  name: string;
  legalName: string;
  description: string;
  url: string;
  logo: string;
  city: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: `${config.name} - ${config.city}`,
    legalName: config.legalName,
    description: config.description,
    url: config.url,
    logo: config.logo,
    image: config.logo,
    areaServed: {
      "@type": "City",
      name: config.city,
      containedInPlace: { "@type": "Country", name: "United Kingdom" },
    },
  });
}

export function generateStaticParams() {
  return siteConfig.locations.map((l) => ({ slug: l.slug }));
}

type Section = { h2: string; paras?: string[]; bullets?: string[] };
type Faq = { q: string; a: string };

const cityContent: Record<string, {
  metaDescription: string;
  intro: string;
  areas: string;
  whyLocal: string;
  services: { title: string; desc: string }[];
  sections: Section[];
  faqs: Faq[];
}> = {
  london: {
    metaDescription:
      "Specialist property accountants for London landlords: Section 24, the 5% SDLT surcharge, ATED on company-held flats, MTD for Income Tax, CGT and incorporation.",
    intro:
      "London buy-to-let is the most heavily taxed corner of the UK residential market. High values push every purchase into the 5% additional-dwellings stamp duty surcharge, low gross yields mean mortgage interest swallows a large share of rent just as Section 24 removes the deduction, and company-held flats over £500,000 fall inside the ATED regime. We work with landlords and investors across the capital on the decisions that actually move those numbers.",
    areas:
      "We work with landlords across all London boroughs, from Central London (Westminster, the City, Camden) to the north (Barnet, Enfield), south (Croydon, Bromley), east (Tower Hamlets, Newham) and west (Ealing, Hounslow).",
    whyLocal:
      "Tax law is national. The way it lands in London is local. An entry-level Zone 3 one-bed at around £400,000 attracts the additional-dwellings surcharge from the first pound. Central London gross yields of 3.5% to 4.5% on a 75% LTV mortgage mean the interest line is a huge fraction of rent, and Section 24 now puts that line above the taxable-profit line. A ten-year-held Zone 2 flat carrying a £200,000 gain is routine, and the CGT annual exempt amount is only £3,000.",
    services: [
      {
        title: "Section 24 modelling and the incorporation decision",
        desc: "London landlords are hit hardest by Section 24 because of high values and high gearing. We model your post-Section-24 personal position against a limited company across three scenarios (retain and reinvest, draw all profits, a mixed strategy) with the transfer costs included.",
      },
      {
        title: "Pre-purchase SDLT and completion timing",
        desc: "Six standard bands interacting with the 5% additional-dwellings surcharge and the 2% non-resident surcharge. On a purchase above £1m the difference between two completion dates can run into five figures.",
      },
      {
        title: "ATED relief returns",
        desc: "Company-held residential property over £500,000 sits inside ATED. Most genuine buy-to-let companies qualify for relief, but relief is not automatic: the declaration return is due by 30 April each year, and missing it creates the full charge.",
      },
      {
        title: "60-day CGT filings",
        desc: "London disposals routinely exceed £100,000 of gain, so the 60-day window is the most-missed deadline we see. We draft the computation from the exchange paperwork and file in parallel with the post-completion legal work.",
      },
      {
        title: "MTD for Income Tax",
        desc: "Quarterly digital reporting has applied since 6 April 2026 above £50,000 of qualifying income. We set up compatible software, map each property's rent account to the right categories, and handle the submissions.",
      },
    ],
    sections: [
      {
        h2: "Section 24 in a London portfolio: a worked example",
        paras: [
          "Take a higher-rate taxpayer on PAYE of £85,000 with three flats in Wandsworth. Gross rent across the three is £72,000, mortgage interest at 75% LTV is around £35,000, and other allowable costs are £9,000.",
          "Under the pre-2017 rules, taxable rental profit would have been £28,000 and the tax at 40% would have been £11,200. Under the current rules interest is not deducted, so taxable profit is £63,000, tax at 40% is £25,200, and the Section 24 basic-rate credit of 20% on £35,000 gives £7,000 back. Net tax on the rental is £18,200.",
          "The same cash position now produces £7,000 more income tax. The higher headline profit also drags the taxpayer further over the £100,000 personal allowance taper, costing more again on the employment income. That gap is the trigger for most London incorporation conversations, though it is not automatically the right answer.",
        ],
      },
      {
        h2: "Stamp duty on a London buy-to-let purchase",
        paras: [
          "The additional-dwellings surcharge has been 5% since 31 October 2024, up from 3%. It sits on top of the standard residential rates, and from 1 April 2025 the 0% band ceiling reverted to £125,000.",
        ],
        bullets: [
          "£0 to £125,000: 0% standard, 5% with the surcharge",
          "£125,001 to £250,000: 2% standard, 7% with the surcharge",
          "£250,001 to £925,000: 5% standard, 10% with the surcharge",
          "£925,001 to £1,500,000: 10% standard, 15% with the surcharge",
          "Above £1,500,000: 12% standard, 17% with the surcharge",
          "Non-UK resident purchasers add a further 2% on the whole price",
        ],
      },
      {
        h2: "ATED on company-held London property",
        paras: [
          "Annual Tax on Enveloped Dwellings applies to residential property worth more than £500,000 held by a company, a partnership with corporate members, or a collective investment scheme. Central London flat values cross that line routinely, so a lot of London buy-to-let companies are inside the regime.",
          "The charge runs in six bands, indexed each April, starting around £4,600 for the £500,001 to £1m band and rising to roughly £303,000 above £20m. Most genuine buy-to-let companies escape the charge through relief, which requires the property to be let on commercial terms to an unconnected tenant throughout the chargeable period. Relief has to be claimed on a declaration return filed by 30 April each year even where no tax is due.",
        ],
      },
      {
        h2: "Borough-level licensing and how it is taxed",
        paras: [
          "Most inner and central London boroughs run additional or selective licensing schemes. Tower Hamlets, Newham, Brent, Hackney, Waltham Forest, Croydon and parts of Lewisham and Southwark all operate wide-area designations, and mandatory licensing applies to every HMO of five or more occupants forming two or more households.",
          "Licence fees are revenue expenses, deductible in the year paid or spread under accruals where the licence covers several years. Fines for letting without a required licence are not deductible, and neither are the legal costs of defending an enforcement action, so the compliance check belongs before exchange rather than after.",
        ],
      },
      {
        h2: "Non-resident landlords with London property",
        paras: [
          "A significant share of central London buy-to-let is held by non-UK residents. Under the Non-Resident Landlord Scheme, either the letting agent withholds basic-rate tax from net rents and pays it to HMRC, or you register (form NRL1 for individuals, NRL2 for companies) and receive rents gross with the tax settled through Self Assessment.",
          "UK rental profits are taxed at UK rates regardless of residency. Non-residents pay the extra 2% SDLT surcharge on purchase and must report any UK residential disposal within 60 days, even where no UK income tax return would otherwise be due.",
        ],
      },
      {
        h2: "Inheritance tax on a London portfolio",
        paras: [
          "A central London portfolio is often the largest asset a family owns and it is fully exposed to inheritance tax. Residential letting is treated as an investment rather than a trade, so Business Property Relief is not available and the portfolio sits in the estate at full market value.",
          "The levers are long-term: lifetime gifting (which can trigger an immediate CGT charge on the deemed disposal, so the CGT and IHT positions have to be weighed together), trusts, and gifting shares where the portfolio already sits in a company. None is a default answer, which is why succession belongs in the same conversation as the incorporation modelling rather than being bolted on later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I offset mortgage interest against my London rental income?",
        a: "Not directly. Since 6 April 2020 individual landlords cannot deduct mortgage interest from rental income. Section 24 gives a 20% basic-rate tax credit on finance costs instead, so a landlord with £40,000 of interest receives an £8,000 credit whether they are a basic-rate, higher-rate or additional-rate taxpayer. Limited companies are outside Section 24 and continue to deduct interest in full.",
      },
      {
        q: "What is the SDLT surcharge on a London buy-to-let in 2026/27?",
        a: "5%, in force since 31 October 2024. On a £600,000 flat the total is £50,000: £20,000 of standard SDLT plus £30,000 of surcharge. A non-resident buyer adds a further 2% on the whole price, taking the bill to £62,000.",
      },
      {
        q: "When does it make sense for a London landlord to incorporate?",
        a: "Most often for higher-rate or additional-rate landlords with mortgaged portfolios who intend to retain profits for reinvestment rather than draw them, and who expect to hold for at least five to seven years. The decision has to weigh the SDLT on transferring existing properties in (a transfer to your own company is treated as taking place at market value), the CGT on the deemed disposal, and the cost of refinancing residential buy-to-let loans into company products, which typically price higher.",
      },
      {
        q: "What expenses can I claim as a London landlord?",
        a: "Letting agent fees, repairs and maintenance (not improvements), buildings and contents insurance, ground rent and service charges, gas safety and EICR certification, accountancy fees, advertising for tenants, replacement of domestic items on a like-for-like basis, and travel for property management. Improvements are capital and are added to the base cost for CGT instead. Mortgage interest is not deductible but generates the 20% credit.",
      },
      {
        q: "Does ATED apply to my company-held London flat?",
        a: "If the property is worth more than £500,000 and is held by a company, ATED applies unless relief is claimed. Most genuine buy-to-let companies qualify for relief because the property is let on arm's-length terms to an unconnected tenant, but the relief declaration return still has to be filed by 30 April each year. Missing that filing creates a charge even where relief would have applied.",
      },
      {
        q: "How does MTD for Income Tax affect London landlords?",
        a: "It has applied since 6 April 2026 to sole-trader landlords with qualifying income above £50,000, falling to £30,000 from April 2027 and £20,000 from April 2028. London landlords are disproportionately affected because Zone 1 to 3 rents push most multi-property portfolios over £50,000 quickly. You keep digital records, submit quarterly updates through compatible software, and file a Final Declaration by the following 31 January. Limited companies are outside the regime.",
      },
      {
        q: "What CGT rate applies when I sell a London buy-to-let?",
        a: "18% on the part of the gain falling in your remaining basic-rate band and 24% above it, with a £3,000 annual exempt amount for 2026/27. The disposal must be reported and the tax paid within 60 days of completion through HMRC's UK Property service, separately from the Self Assessment return.",
      },
      {
        q: "Do I need a London-based accountant for my London property?",
        a: "Not strictly. Tax legislation is national, so what matters is property specialism rather than postcode. The London-specific value sits in three places: knowledge of borough-level licensing, which varies sharply between boroughs, familiarity with the leasehold and service-charge structures of the big central developments, and benchmarks calibrated to the London letting market.",
      },
      {
        q: "How did the abolition of the furnished holiday lettings regime affect London short lets?",
        a: "The regime ended on 6 April 2025. Former FHL properties are now treated as ordinary residential lettings: no capital allowances on furnishings, no pensionable trading income, no business asset disposal relief on sale, and Section 24 applies to the mortgage interest. Many short-let operators in Zones 1 and 2 were affected.",
      },
      {
        q: "Do borough licensing costs affect my tax position?",
        a: "Yes, in your favour on the fee itself. Licence fees are revenue expenses deductible against rental income. What is not deductible is any fine or penalty for letting without a required licence, or the legal cost of defending the enforcement action, and a rent repayment order can run to two years of rent.",
      },
      {
        q: "When should I switch property accountants?",
        a: "If nobody has modelled your post-Section-24 personal position against a company, if MTD registration was never raised with you, if your adviser still refers to a 3% SDLT surcharge or a £6,000 CGT annual exempt amount, or if your portfolio is being treated as several separate tax returns rather than one planning unit.",
      },
      {
        q: "What is the difference between a property accountant and a general accountant?",
        a: "A generalist may still treat mortgage interest as a deductible expense, may miss the 60-day CGT reporting window, and rarely models incorporation. A property specialist gets all three right by default because rental income, disposals, ATED, the Non-Resident Landlord Scheme and the ownership-structure question are the core of the work rather than an occasional sideline.",
      },
    ],
  },
  manchester: {
    metaDescription:
      "Specialist property accountants for Manchester landlords: selective licensing wards, south Manchester Article 4, Section 24, incorporation, MTD and CGT.",
    intro:
      "Greater Manchester is one of the most active private rental markets outside London, and it is unusually segmented. City centre and waterside apartments around Ancoats, New Islington, Deansgate and Salford Quays are largely held for capital growth. The student belt across Fallowfield, Withington and Rusholme runs on HMOs. Suburban family lets across Didsbury, Chorlton, Sale and Stockport are lower-yield but lower-churn. Each behaves differently under Section 24, incorporation, CGT and MTD.",
    areas:
      "We work with landlords across Manchester city centre, Salford and Salford Quays, Trafford, Stockport, Tameside, Oldham, Rochdale, Bury, Bolton and Wigan.",
    whyLocal:
      "On top of the national framework, Manchester carries two significant local overlays: selective licensing in named inner wards, and Article 4 directions across the south Manchester student areas that remove the usual permitted development right to create small HMOs. Neither is an income tax rule in itself, but both change the economics of a property and the deductible compliance cost attached to it.",
    services: [
      {
        title: "Section 24 modelling on your actual figures",
        desc: "The more geared the portfolio, the wider the wedge between the relief you get and the rate you pay. We run the calculation on your real rents, mortgages and tax band rather than a rule of thumb, including the personal allowance taper and child benefit charge interactions.",
      },
      {
        title: "Incorporation comparison",
        desc: "Companies deduct interest in full before corporation tax, which is why this is the most common question higher-rate Manchester landlords bring. We model both routes side by side, including company mortgage pricing, dividend tax on extraction, and the SDLT and CGT cost of moving an existing portfolio in.",
      },
      {
        title: "HMO and licensing cost treatment",
        desc: "Licence fees and the cost of meeting licence conditions are revenue deductions. The capital works to reach HMO standard are not, they enter the CGT base cost. Getting that split right is worth real money on a student portfolio.",
      },
      {
        title: "MTD for Income Tax",
        desc: "Digital records, quarterly updates and a final declaration through compatible software. We handle software selection, bank feeds and a dry-run quarter rather than leaving it until the deadline.",
      },
      {
        title: "Portfolio reporting",
        desc: "Profitability tracked property by property, so you can see which parts of a Greater Manchester portfolio are carrying the rest.",
      },
    ],
    sections: [
      {
        h2: "Section 24: a worked example for a Manchester landlord",
        paras: [
          "Consider a higher-rate taxpayer with three buy-to-lets across Chorlton and Levenshulme: £42,000 of rental income, £6,000 of allowable running costs including letting, repairs, safety certificates and selective licence fees, and £18,000 of mortgage interest.",
          "Under the old rules taxable rental profit would have been £18,000, taxed at 40% for £7,200 of tax. Under Section 24 the interest is not deducted, so taxable profit is £36,000, tax at 40% is £14,400, and the 20% credit on £18,000 of interest gives £3,600 back. The bill is £10,800.",
          "That is £3,600 more tax on the same economic profit, and £18,000 of extra reported income in the computation, which is what drags landlords toward the £100,000 personal allowance taper or the High Income Child Benefit Charge.",
        ],
      },
      {
        h2: "Selective licensing, HMO licensing and Article 4",
        paras: [
          "Manchester City Council operates selective licensing in defined wards under Part 3 of the Housing Act 2004. Designations have covered areas including Gorton and Abbey Hey, Harpurhey, Clayton and Openshaw, Levenshulme, Moss Side and Whalley Range, Rusholme, The Royals and Longsight, and from 24 May 2025 parts of Cheetham, Crumpsall, Harpurhey, Longsight, Miles Platting and Newton Heath, and Moss Side. Boundaries are set by the council and reviewed periodically, so the specific address should be checked against the licensing map before purchase.",
          "Any HMO with five or more occupants forming two or more households needs a mandatory licence under Part 2, regardless of ward, and additional licensing applies to smaller HMOs in designated areas.",
          "Across the student-heavy south Manchester wards, including Fallowfield, Withington, Rusholme, Moss Side, Hulme, Ardwick and parts of Longsight, Article 4 directions remove the permitted development right that normally allows a standard house (C3) to become a small HMO (C4) for three to six sharers. Full planning permission is required, and local concentration policies can refuse it where HMO density nearby is already high. A property advertised as a conversion candidate may not be one, so the tax model has to assume planning risk.",
        ],
      },
      {
        h2: "Capital gains tax on a Manchester disposal",
        paras: [
          "Suppose a Withington HMO bought for £240,000 and improved with £20,000 of qualifying capital works is sold for £360,000 with £6,000 of buying and selling costs. The gain is £94,000. After the £3,000 annual exempt amount, £91,000 is chargeable, and for a higher-rate taxpayer with no basic-rate band spare the whole £91,000 is taxed at 24%, giving £21,840.",
          "Joint owners each use a separate annual exempt amount and any spare basic-rate band at 18%, which usually reduces the combined bill. The disposal is reported and paid through HMRC's UK property service within 60 days of completion, with the gain also reported on Self Assessment.",
        ],
      },
      {
        h2: "Stamp duty, and buying across the border",
        paras: [
          "Most Manchester rental purchases fall under SDLT with the 5% additional-dwellings surcharge on top of the standard bands. Companies acquiring residential property are also within the additional-rates regime, and very high-value single-dwelling company purchases can fall within a separate flat 17% charge, which is one more reason incorporation has to be modelled rather than assumed.",
          "If your portfolio crosses into Scotland you are in Land and Buildings Transaction Tax plus the Additional Dwelling Supplement. In Wales it is Land Transaction Tax with its own higher residential rates. The transaction tax, the surcharge mechanics and the reporting all differ from the English position.",
        ],
      },
      {
        h2: "The 2027 property income rates",
        paras: [
          "Finance Act 2026 (Royal Assent 18 March 2026) enacted separate property income tax rates of 22% basic, 42% higher and 47% additional from 6 April 2027 for property income in England and Northern Ireland. For 2026/27 the standard 20%, 40% and 45% rates still apply.",
          "From 6 April 2027 the Section 24 reducer is given at the new 22% property basic rate rather than 20%. A basic-rate landlord sees no new wedge because relief keeps pace with the rate. A higher-rate landlord's relief rises from 20% to 22% but still sits well below their 42% rate. Any multi-year incorporation or disposal model should be built on the enacted 2027 rates rather than the current year alone.",
        ],
      },
      {
        h2: "What to look for in a Manchester property accountant",
        bullets: [
          "A real Manchester landlord client base. Ask what proportion of clients hold residential lettings rather than trading businesses.",
          "Local compliance fluency: which wards the council licenses, and which south Manchester areas carry Article 4 restrictions.",
          "Section 24 and incorporation modelling with worked examples on your numbers, not a promise to handle Section 24.",
          "MTD readiness, with clients already on compatible software and dry-run quarters behind them.",
          "Forward planning rather than filing. The value sits in the decisions taken before a purchase or sale.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a specialist if I only own one Manchester rental property?",
        a: "Often yes, particularly where Section 24 is meaningfully reducing post-tax cash, where MTD for Income Tax now applies, or where the property sits in a selective licensing ward or an Article 4 area that creates compliance overhead a generalist may miss. For first-time landlords, clean digital records from the start prevent a catch-up exercise that usually costs more than setting up properly.",
      },
      {
        q: "Does Manchester operate selective licensing?",
        a: "Yes, in defined wards under Part 3 of the Housing Act 2004, with designations covering areas including Gorton and Abbey Hey, Harpurhey, Clayton and Openshaw, Levenshulme, Moss Side and Whalley Range, Rusholme, The Royals and Longsight, and from 24 May 2025 parts of Cheetham, Crumpsall, Harpurhey, Longsight, Miles Platting and Newton Heath, and Moss Side. Street-level boundaries are set by the council and reviewed periodically. The licence fee and the cost of meeting the conditions are deductible against rental profit.",
      },
      {
        q: "How do Article 4 directions affect Manchester HMO landlords?",
        a: "In the covered south Manchester wards the permitted development right to convert a standard house to a small HMO for three to six sharers is removed, so full planning permission is required and local concentration policies can refuse it. This is a planning overlay rather than an income tax rule, but it decides whether an HMO conversion is viable at all, so it belongs in the model before purchase.",
      },
      {
        q: "What records do Manchester landlords need for Making Tax Digital?",
        a: "Digital records in compatible software, quarterly updates to HMRC, and a final declaration through the same software, for sole-trader landlords with gross qualifying income above £50,000 since 6 April 2026. The threshold falls to £30,000 from April 2027 and £20,000 from April 2028. Joint owners test against their share of gross income, not the property total. Paper records and standalone spreadsheets are no longer compliant, and limited companies sit outside the regime entirely.",
      },
      {
        q: "Should Manchester landlords incorporate?",
        a: "It depends on rental profit, gearing and marginal rate. A higher-rate landlord with substantial interest across several properties often sees a meaningful annual differential, but that is offset by higher company mortgage pricing, extra compliance, dividend tax on extraction, and SDLT plus CGT on transferring existing property in. The only reliable answer comes from modelling both routes on your real numbers.",
      },
      {
        q: "Are city centre apartments taxed differently from suburban family lets?",
        a: "The framework is the same, the planning differs. Apartment landlords around Ancoats, New Islington and Deansgate often carry high service charges and ground rent (both deductible) and hold for capital appreciation, which puts the focus on CGT planning at exit. Family lets across Didsbury, Chorlton, Sale and Stockport shift the emphasis toward steady Section 24 management and longer-term incorporation or succession planning.",
      },
      {
        q: "How are Manchester student HMOs taxed?",
        a: "As property income in the normal way, with running costs including letting, repairs, safety certification, licence fees and management deductible against it. Furniture in a residential dwelling cannot be capital-allowanced, but replacement of domestic items relief covers like-for-like replacement of existing furnishings. The HMO-specific cost is compliance rather than tax, and that cost is deductible.",
      },
      {
        q: "I am a first-time or accidental landlord. Where do I start?",
        a: "Three things: confirm whether MTD applies to you, check whether the property sits in a selective licensing ward or an Article 4 area, and set up digital record-keeping from day one rather than reconstructing it later. From there the ownership-structure question can be modelled properly.",
      },
      {
        q: "Can you help landlords across Greater Manchester, not just the city?",
        a: "Yes, including Salford and Salford Quays, Trafford, Stockport, Tameside, Oldham, Rochdale, Bury, Bolton and Wigan alongside the central wards. The tax framework is national, but which council operates selective licensing, which areas carry Article 4 restrictions, and the typical yield and tenant profile all differ across the conurbation.",
      },
      {
        q: "How do the April 2027 property income rates affect Manchester landlords?",
        a: "From 6 April 2027 property income in England and Northern Ireland is taxed at 22% basic, 42% higher and 47% additional, and the Section 24 reducer is given at 22% rather than 20%. A basic-rate landlord sees no new wedge. A higher-rate landlord's relief rises to 22% but stays well below their 42% rate. We factor the enacted rates into any multi-year model.",
      },
      {
        q: "When is the right time to talk about restructuring?",
        a: "Twelve to eighteen months before a planned acquisition, a likely tax-band change, or a sale. Incorporation analysis takes several weeks end to end, and the SDLT and CGT cost of transferring property in usually pushes breakeven out by a few years, so it rewards early planning. MTD readiness follows the same logic.",
      },
    ],
  },
  birmingham: {
    metaDescription:
      "Specialist property accountants for Birmingham landlords: selective licensing, Article 4 HMO conversions, Section 24, incorporation, MTD and CGT planning.",
    intro:
      "Birmingham's lettings market sits at the intersection of strong rental demand from a large professional workforce and three established universities, a tax regime that has tightened sharply since 2017, and a local overlay of selective licensing, Article 4 directions on HMO conversions, and mandatory HMO licensing. A general practice can file your return. A specialist models the Section 24 hit on your current structure, runs the incorporation comparison on your actual numbers, and surfaces the local compliance overhead before you buy something you cannot unwind.",
    areas:
      "We work with landlords across Birmingham city centre, Edgbaston, Harborne, Selly Oak, Kings Heath, Moseley, Hall Green, Bournville, Solihull, Sutton Coldfield and the wider West Midlands.",
    whyLocal:
      "The spread between gross and net yield is wider than many Birmingham landlords assume, because Section 24, HMO and selective licensing costs, mortgage rates above the 2017 to 2021 trough, and the CGT regime on disposal have all eroded what is retained. Two portfolios with the same headline rent can produce very different post-tax returns depending on ownership structure, financing, expense discipline and exit planning.",
    services: [
      {
        title: "Section 24 modelling",
        desc: "The finance cost restriction replaced full interest deduction with a flat 20% basic-rate credit. The credit is capped at the lower of 20% of finance costs, 20% of rental profit before finance costs, or 20% of total income above the personal allowance, with any restricted amount carried forward. We work it through on your figures.",
      },
      {
        title: "Incorporation analysis",
        desc: "A geared multi-property portfolio held by a higher-rate taxpayer who intends to reinvest usually performs better in a company. A single low-geared property held by a basic-rate taxpayer usually does not. Mixed positions sometimes suit a hybrid, with new acquisitions going into a company and existing holdings staying outside.",
      },
      {
        title: "HMO, Article 4 and licensing checks",
        desc: "Mandatory licensing for five or more occupants, additional licensing for smaller HMOs in designated areas, selective licensing across all private lets in some wards, and Article 4 removing permitted development rights on C3 to C4 conversions. We price the compliance position before exchange.",
      },
      {
        title: "Allowable expense capture",
        desc: "Where landlords lose money quietly: the repairs versus improvements line, replacement of domestic items relief, mileage at 55p for the first 10,000 business miles, and the deductibility of licensing fees.",
      },
      {
        title: "MTD for Income Tax",
        desc: "Software selection, digital record-keeping, and quarterly submissions. Qualifying income is measured gross, so a portfolio with heavy expenses and modest net profit can still be caught.",
      },
    ],
    sections: [
      {
        h2: "Birmingham's buy-to-let sub-markets and where the tax pressure sits",
        bullets: [
          "Student stock around Selly Oak, Harborne and Edgbaston, driven by the University of Birmingham, Birmingham City University and Aston University. Mostly HMO multi-occupancy, with higher cleaning, repairs and turnover costs but materially higher rent per square foot.",
          "Family lets across Kings Heath, Moseley, Hall Green and Bournville. Single-household tenancies with lower management overhead and lower per-room yield, and steadier capital growth than HMO stock.",
          "City centre and inner-suburb new build in the Jewellery Quarter, Digbeth and Eastside. Usually leasehold, so service charge mechanics, ground rent and the capital versus revenue line on leasehold improvements need careful treatment.",
          "Inner-ward selective licensing zones, where a licence is required to let at all. The fee and compliance cost are deductible, but the operational overhead is real and the boundaries change periodically.",
        ],
      },
      {
        h2: "Worked example: Section 24 on a Birmingham portfolio",
        paras: [
          "Take a higher-rate landlord with three properties across Kings Heath, Selly Oak and Edgbaston bought for £640,000 in total at 75% LTV, combined gross rents of £39,600, allowable non-finance expenses of £7,920 including licensing on the Selly Oak HMO, mortgage interest of £25,200, and PAYE income of £62,000.",
          "Rental profit before finance costs is £31,680, which takes total income to £93,680. After the personal allowance, tax is £7,540 at basic rate and £17,364 at higher rate, giving £24,904 before the Section 24 credit of £5,040. Income tax due is £19,864.",
          "Under the pre-Section-24 mechanic, taxable rental profit would have been £6,480 and the rental slice of tax roughly £2,592. The recurring wedge on this portfolio runs to about £10,000 a year, and that is the gap that drives the incorporation conversation.",
          "The same portfolio inside a company sidesteps Section 24 entirely: profit after all expenses including full interest is £6,480, taxed at the 19% small profits rate for £1,231. The offsetting costs, higher company mortgage pricing, dividend tax on extraction, SDLT and CGT on transferring the properties in, and extra compliance, have to be modelled against that recurring saving to find breakeven.",
        ],
      },
      {
        h2: "Allowable expenses for Birmingham landlords",
        paras: [
          "The Section 24 restriction applies only to finance costs. Everything below is deductible against rental income subject to the wholly and exclusively rule.",
        ],
        bullets: [
          "Letting agent fees and management charges, typically 10% to 15% of rent",
          "Repairs and maintenance on a like-for-like basis. A replacement boiler is a repair, an upgraded kitchen is capital",
          "Buildings and contents insurance including landlord liability cover",
          "Utility bills where the landlord pays, common in HMOs with bills-included rents",
          "Council tax during void periods only",
          "Ground rent and service charges on leasehold property, common on Jewellery Quarter and city centre flats",
          "Legal and professional fees for tenancy agreements, evictions and ongoing property advice",
          "Accountancy fees attributable to the rental business",
          "HMO, additional and selective licensing fees",
          "Gas safety certificates annually, EICRs every five years, and EPCs every ten years",
          "Replacement of domestic items relief on like-for-like replacement of beds, sofas, white goods and similar. Initial furnishing of a newly-furnished let is not covered",
          "Travel for property visits, repairs supervision and viewings, at 55p per mile for the first 10,000 business miles and 25p thereafter",
          "Property management software subscriptions, which matter more now that compatible software is mandatory under MTD",
        ],
      },
      {
        h2: "Stamp duty on a Birmingham purchase",
        paras: [
          "Standard SDLT bands apply with the 5% additional dwellings surcharge on most buy-to-let purchases: 5% up to £125,000, 7% to £250,000, 10% to £925,000, 15% to £1.5m and 17% above that.",
          "The surcharge rose from 3% to 5% on 31 October 2024 and the nil-rate band returned to £125,000 on 1 April 2025. Multiple Dwellings Relief was abolished for transactions completing on or after 1 June 2024. Where six or more separate dwellings are acquired in one transaction or in linked transactions, the six-dwellings rule treats them as non-residential for SDLT with no surcharge, which is relevant to genuine bulk acquisitions but not to adding one property at a time.",
        ],
      },
      {
        h2: "Capital gains tax planning on a Birmingham disposal",
        bullets: [
          "Inter-spouse transfer before sale. A no-gain no-loss transfer to a lower-income spouse can move part of the gain into a lower band and use both annual exempt amounts.",
          "Private Residence Relief where the property was the owner's main residence for part of the ownership period, with the final nine months always counted as deemed occupation.",
          "Disposal timing. Where retirement or rental cessation is expected to drop you from higher rate to basic rate in a later year, deferring can move more of the gain into the 18% slice.",
        ],
      },
      {
        h2: "Signs a generalist accountant is leaving money on the table",
        bullets: [
          "Your Section 24 modelling has never been done. Showing you the gap between the current bill and the company alternative is advising; anything less is filing.",
          "Incorporation has been dismissed without numbers. It is not worth it is an opinion, not an analysis.",
          "The April 2027 rate change has never been raised, even though it moves the incorporation breakeven point.",
          "MTD preparation is not on the agenda despite your income being above the threshold.",
          "Replacement of domestic items relief is being missed on HMOs and furnished lets.",
          "Mileage and home-office claims are absent.",
          "HMO and selective licensing costs are not being claimed, or capital works to meet licence conditions are being treated as revenue.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a specialist if I only own one Birmingham rental property?",
        a: "Often yes, particularly where Section 24 is materially reducing post-tax cash, where MTD now applies, or where the property sits in a selective licensing or Article 4 area that creates compliance overhead a generalist may miss. Establishing good systems from the start prevents a catch-up that usually costs more than setting up properly.",
      },
      {
        q: "How much could incorporation save a Birmingham landlord with several properties?",
        a: "It depends on rental profit, leverage and marginal rate. A higher-rate landlord with substantial interest across a multi-property portfolio typically sees a meaningful annual differential between personal ownership and company ownership, offset by higher company mortgage pricing, extra compliance, dividend tax on extraction, and SDLT plus CGT on transferring existing property in. We model both routes side by side before recommending either.",
      },
      {
        q: "What records do Birmingham landlords need for Making Tax Digital?",
        a: "Digital records in compatible software, quarterly updates, and a final declaration through the same software, for sole-trader landlords with gross qualifying income above £50,000. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. Joint owners test against their share of gross income. Paper records and unlinked spreadsheets are no longer compliant, and companies are outside the regime.",
      },
      {
        q: "What Birmingham-specific issues should I know about?",
        a: "Three overlays sit on top of the national regime: selective licensing in designated inner wards, Article 4 directions removing permitted development rights for converting standard houses into small HMOs, and mandatory HMO licensing for five or more occupants forming two or more households. Each carries operational cost that is deductible against rental profit, but the planning risk has to be checked before purchase.",
      },
      {
        q: "When should I consider incorporating my Birmingham property business?",
        a: "When your rental profit sits in the higher or additional rate band, when gearing is high enough that Section 24 is materially eroding post-tax cash, when you plan to retain and reinvest rather than draw profits, or when passing value to the next generation is in scope. For existing portfolios the SDLT and CGT cost of transferring in usually pushes breakeven out by three to five years.",
      },
      {
        q: "How early should I prepare for MTD?",
        a: "Setting up compatible software, establishing digital record-keeping and running a dry-run quarter takes roughly six months end to end. If you are above the threshold and have not started, start now. Landlords approaching the £30,000 and £20,000 thresholds in 2027 and 2028 should apply the same six-month window.",
      },
      {
        q: "Does Birmingham operate selective licensing, and what does compliance cost?",
        a: "The council operates selective licensing in defined wards under Part 3 of the Housing Act 2004, mandatory licensing under Part 2 for any HMO with five or more occupants, and additional discretionary HMO licensing in further designated areas. Licence fees and the cost of meeting the conditions, including fire safety upgrades, gas safety certification, electrical condition reports and extra management arrangements, are fully deductible against rental profit.",
      },
      {
        q: "How do the April 2027 property income rates affect Birmingham landlords?",
        a: "Separate rates of 22% basic, 42% higher and 47% additional take effect from 6 April 2027 for property income in England and Northern Ireland, announced at the Autumn Budget 2025 and enacted in Finance Act 2026. For 2026/27 the standard rates continue. From April 2027 the Section 24 reducer is given at 22% rather than 20%, so a basic-rate landlord sees no new wedge while a higher-rate landlord's relief rises to 22% against a 42% rate.",
      },
      {
        q: "What CGT will I pay when selling a Birmingham buy-to-let?",
        a: "18% on the gain falling within the basic-rate band and 24% above it, with a £3,000 annual exempt amount for 2026/27. Joint owners each use their own allowance. The disposal is reported through HMRC's UK property service within 60 days of completion where tax is due, and again on the Self Assessment return. Private Residence Relief is available time-apportioned where the property was at some point your main residence.",
      },
      {
        q: "Can I claim mortgage arrangement fees?",
        a: "Yes. Arrangement fees, broker fees and valuation fees on a buy-to-let mortgage are finance costs, so for individuals they fall under the Section 24 restriction and generate the 20% credit rather than a full deduction. For companies they are fully deductible before corporation tax. Legal fees on the purchase itself are capital and go into the CGT base cost, a distinction generalists often miss.",
      },
      {
        q: "Can you take over from my current accountant mid-year?",
        a: "Yes. A professional clearance letter goes to the outgoing accountant, they release the records, HMRC's 64-8 authority is updated, and the new accountant picks up the partial-year position. Most switches complete within two to three weeks and no HMRC penalty arises from changing accountant.",
      },
      {
        q: "Do you work with non-resident landlords who own Birmingham property?",
        a: "Yes. Under the Non-Resident Landlord Scheme letting agents deduct basic-rate tax from rent unless the landlord holds approval to receive it gross, and annual UK returns are still required. Non-resident CGT applies on disposal with mandatory 60-day reporting for every UK land disposal, whether or not tax is due, which is stricter than the UK-resident position.",
      },
    ],
  },
  leeds: {
    metaDescription:
      "Specialist property accountants for Leeds landlords: the Headingley Article 4 direction, selective licensing, Section 24, incorporation, MTD and CGT.",
    intro:
      "Leeds is one of the UK's largest buy-to-let markets, with two universities producing roughly 60,000 students between them, a strong professional employment base centred on the city's financial and legal sector, and one of the oldest Article 4 directions on HMO conversions in England. That combination means real scope for HMO yield, strong family let demand in the affluent suburbs, and a planning landscape that needs care before you commit.",
    areas:
      "We work with landlords across Leeds city centre, Headingley, Hyde Park, Burley, Woodhouse, Chapel Allerton, Roundhay, Horsforth, Adel, Alwoodley, Beeston, Harehills, Holbeck, Armley and the wider West Yorkshire area.",
    whyLocal:
      "The Article 4 boundary is the most important pre-purchase question for anyone considering an HMO conversion in Leeds. Inside it, a C3 to C4 conversion needs full planning permission, which typically runs eight to thirteen weeks and is not guaranteed. Outside it, the conversion generally falls under permitted development. That line is the difference between a six to twelve week project and a four to seven month one.",
    services: [
      {
        title: "Section 24 modelling for geared HMO portfolios",
        desc: "On heavily geared Leeds student portfolios, effective tax rates above half of pre-interest profit are common. We quantify the wedge on your figures and show what the same portfolio would produce inside a company.",
      },
      {
        title: "Incorporation analysis",
        desc: "Student HMO portfolios often reach the incorporation breakeven faster than single lets because gearing is higher relative to rental income. We model both routes on your actual rents, mortgages and tax band, including the cost of transferring existing property in.",
      },
      {
        title: "Article 4 and licensing checks before exchange",
        desc: "Whether the property sits inside the Article 4 zone, whether mandatory, additional or selective licensing applies, and how the resulting costs split between revenue deductions and CGT base cost.",
      },
      {
        title: "MTD for Income Tax",
        desc: "Digital records, quarterly submissions and the final declaration through compatible software, with the audit trail from source to submission kept unbroken.",
      },
      {
        title: "Portfolio and disposal planning",
        desc: "Property-level profitability reporting, and CGT planning ahead of a sale rather than after completion when the 60-day clock is already running.",
      },
    ],
    sections: [
      {
        h2: "The Leeds rental market in four segments",
        bullets: [
          "Student HMOs in Headingley, Hyde Park, Burley and Woodhouse. High yield through four to six bed conversions, but inside the Article 4 zone, so new C3 to C4 conversions need full planning consent. Existing HMOs are grandfathered.",
          "Family lets in Roundhay, Chapel Allerton, Horsforth, Adel and Alwoodley. Lower management overhead, stronger capital growth potential, standard buy-to-let treatment.",
          "City centre and young professional flats around Holbeck Urban Village and Hunslet. Growing demand from the financial services and legal cluster, often new-build leasehold with service charge considerations.",
          "Affordable single lets in Beeston, Harehills, parts of Holbeck and Armley. Lower entry prices, and often within selective licensing zones depending on ward.",
        ],
      },
      {
        h2: "The Headingley Article 4 direction",
        paras: [
          "Leeds City Council introduced one of the UK's earliest major Article 4 directions in 2012, covering Headingley, Hyde Park, Burley and parts of Woodhouse, and it has been expanded since. Inside the zone, converting a standard family home (C3 use class) into a small HMO for three to six occupants (C4) requires full planning permission rather than happening under permitted development rights.",
          "Outside the zone the conversion itself generally does not need consent, but you still need HMO licensing where the property meets the threshold, building regulations sign-off for structural changes, and compliance with fire safety standards. Boundaries have moved over time, so check the current line on the council's planning portal before exchange rather than relying on a listing description.",
        ],
      },
      {
        h2: "Licensing across Leeds",
        paras: [
          "Mandatory HMO licensing applies nationally to any HMO with five or more occupants forming two or more households. Leeds City Council also runs additional licensing for smaller HMOs in defined wards, and selective licensing in specific areas including parts of Beeston, Harehills and Holbeck.",
          "All licensing fees are deductible against rental income as revenue expenses under the wholly and exclusively rule. Under the cash basis, which is the default for landlords with gross income below £150,000, you deduct the fee in the year of payment. Under accruals you spread it across the licence period. Schemes are reviewed periodically and boundaries can change, so confirm the current scope with the council before letting.",
        ],
      },
      {
        h2: "Worked example: Section 24 on a Leeds student HMO",
        paras: [
          "A five-bed student HMO in Headingley, already operating and grandfathered through Article 4, bought for £400,000 with a 75% LTV mortgage at 5.5%, so £16,500 of annual interest. Five rooms let at £600 a month gives £36,000 of gross rent, against £11,500 of allowable non-finance expenses covering management, licensing, bills-included utilities, repairs and accountancy.",
          "Held personally by a higher-rate taxpayer: rental profit before the interest restriction is £24,500, income tax at 40% is £9,800, the Section 24 credit of 20% on £16,500 is £3,300, so net income tax is £6,500 and the cash position after interest is £1,500.",
          "Held in a company: profit after all expenses including full interest is £8,000, corporation tax at the 19% small profits rate is £1,520, and the retained profit is £6,480.",
          "The structural difference is roughly £4,980 a year on a single property. Across a three or four HMO portfolio at similar gearing that becomes a five-figure annual gap, which generally clears a reasonable incorporation cost analysis within two to three years.",
        ],
      },
      {
        h2: "What changes in April 2027",
        paras: [
          "Separate property income tax rates of 22% basic, 42% higher and 47% additional take effect from 6 April 2027, two percentage points above the equivalent general income tax bands, applied to rental profit after Section 24. For a higher-rate Leeds landlord with £35,000 of rental profit, the rate change alone adds roughly £700 to the annual bill before any behavioural response.",
          "The Section 24 reducer is given at the new 22% property basic rate from the same date, so basic-rate landlords see no new wedge while higher-rate landlords gain two points of relief against a rate that has also risen two points. For geared portfolios the change strengthens the case for looking at incorporation properly.",
        ],
      },
      {
        h2: "Signs your current accountant is costing you money",
        bullets: [
          "Your Section 24 modelling has never been done.",
          "Incorporation has been dismissed without numbers.",
          "The April 2027 rate change has never been raised with you.",
          "MTD preparation is not on the agenda despite your income being above the threshold.",
          "Replacement of domestic items relief is being missed, which matters on high-turnover student lets.",
          "Article 4 implications have not been flagged on an intended HMO purchase.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the Headingley Article 4 direction and how does it affect Leeds landlords?",
        a: "Leeds City Council introduced one of the UK's earliest major Article 4 directions in 2012, covering Headingley, Hyde Park, Burley and parts of Woodhouse. It removes permitted development rights for converting a standard family home into a small HMO, so inside the zone the conversion needs a full planning application, typically eight to thirteen weeks and not guaranteed to succeed. The direction has been expanded over time, so always check the current boundary before committing to a property intended for conversion.",
      },
      {
        q: "Does Leeds operate HMO licensing or selective licensing?",
        a: "Both. Mandatory HMO licensing applies nationally to any HMO with five or more occupants forming two or more households. The council also operates additional licensing for smaller HMOs in defined wards, and selective licensing in areas including parts of Beeston, Harehills and Holbeck. All licensing fees are deductible against rental income.",
      },
      {
        q: "What are typical buy-to-let yields in Leeds?",
        a: "Leeds typically delivers 5% to 8% gross. Student HMOs in Headingley, Hyde Park and Burley can push 7% to 9% through four to six bed conversions where Article 4 permits. Family lets in Roundhay, Chapel Allerton, Horsforth and Adel typically sit at 5% to 6%. Two large universities and the professional employment base around the city centre keep occupancy strong year-round.",
      },
      {
        q: "Which Leeds areas are favoured by buy-to-let landlords?",
        a: "The university belt of Headingley, Hyde Park, Burley and Woodhouse for student HMOs subject to Article 4 consent; Roundhay and Chapel Allerton for family lets at higher entry prices with stronger capital growth; Horsforth and Adel for established family lets; Beeston and Harehills for affordable single-let stock, often within selective licensing zones; and the city centre around Hunslet and Holbeck Urban Village for young professional flats.",
      },
      {
        q: "Should I hold my Leeds property in a limited company or personally?",
        a: "It depends on your marginal rate, gearing and intentions. A single property held by a basic-rate taxpayer often still works personally. A portfolio of three or more held by a higher-rate or additional-rate taxpayer almost always warrants the company analysis, particularly with the April 2027 property income rates approaching. Student HMO portfolios often hit breakeven faster because gearing is higher relative to rental income.",
      },
      {
        q: "What changes for Leeds landlords in April 2027?",
        a: "Separate property income tax rates of 22% basic, 42% higher and 47% additional take effect from 6 April 2027, applied to rental profit after Section 24. For a higher-rate landlord with £35,000 of rental profit the rate change alone adds roughly £700 a year.",
      },
      {
        q: "Is MTD for Income Tax mandatory for Leeds landlords?",
        a: "For landlords whose combined gross property and self-employment income is above £50,000, yes. The mandate went live on 6 April 2026 for sole-trader landlords above that threshold, dropping to £30,000 from April 2027 and £20,000 from April 2028. Companies and partnerships are not in scope.",
      },
      {
        q: "Are HMO and selective licensing fees deductible for Leeds landlords?",
        a: "Yes. Mandatory HMO fees, additional licensing fees, selective licensing fees and the associated professional costs are all revenue expenses deductible against rental income. Under the cash basis you deduct the fee in the year of payment; under accruals you spread it over the licence period.",
      },
      {
        q: "What if I buy a Leeds property for HMO conversion outside the Article 4 zone?",
        a: "Outside the zone, conversion from a standard house to a small HMO of three to six occupants generally falls under permitted development rights, so no planning consent is needed for the conversion itself. You still need HMO licensing where the property meets the threshold, building regulations sign-off for structural changes, and fire safety compliance.",
      },
      {
        q: "Do I need a Leeds-based accountant, or can a specialist work remotely?",
        a: "For buy-to-let tax work, location matters far less than property specialism. The rules are national, the software is cloud-based, and consultations run remotely or in person. Local knowledge of Article 4 zones, council licensing schemes and area-specific yields is useful context, but it is not what determines the tax outcome.",
      },
      {
        q: "What records should I keep as a Leeds landlord?",
        a: "Per property: rental income with dates and amounts, mortgage interest statements, allowable expense receipts, capital expenditure invoices for improvements (these affect the CGT base cost), licensing certificates and renewal notices, gas safety and EICR certificates with expiry dates, deposit protection records, and bank statements for the rental account. HMRC expects five-year retention, and under MTD the records must be digital with an unbroken audit trail from source to submission.",
      },
    ],
  },
  bristol: {
    metaDescription:
      "Specialist property accountants for Bristol landlords: the citywide Article 4 direction, HMO licensing, Section 24, incorporation, MTD and CGT planning.",
    intro:
      "Bristol's lettings market sits at the intersection of strong rental demand from a large professional workforce, two universities and continued harbourside regeneration, a tax regime that has tightened sharply since 2017, and a local overlay that is more restrictive than most: a citywide Article 4 direction on HMO conversions, alongside mandatory HMO licensing and additional and selective licensing in defined areas.",
    areas:
      "We work with landlords across Bristol city centre and the harbourside, Clifton, Redland, Cotham, Bishopston, Henleaze, Westbury-on-Trym, Horfield, Southville, Bedminster, Easton, Fishponds, St George and the wider South West.",
    whyLocal:
      "Bristol's Article 4 direction covers the whole city, which is materially more restrictive than cities that apply it only in named student wards. The C3 to C4 conversion route that underpins much of the shared-house market is no longer automatic anywhere in Bristol, so the planning risk on an HMO acquisition has to be priced in before exchange rather than discovered afterwards.",
    services: [
      {
        title: "Section 24 modelling",
        desc: "The finance cost restriction gives a flat 20% basic-rate credit, capped at the lower of 20% of finance costs, 20% of rental profit before finance costs, or 20% of total income above the personal allowance, with any restricted amount carried forward. We work the real number out on your figures.",
      },
      {
        title: "Incorporation comparison",
        desc: "Both routes modelled side by side on your actual rents, mortgages and tax band, including company mortgage pricing, dividend tax on extraction, and the SDLT and CGT cost of transferring existing property in.",
      },
      {
        title: "Article 4 and HMO compliance costing",
        desc: "Licence fees and ongoing compliance are revenue deductions. Capital works to meet HMO standards, and the professional fees on a planning application, are capital and enter the CGT base cost. Getting that split wrong overstates the current-year deduction.",
      },
      {
        title: "Repairs versus improvements discipline",
        desc: "On Bristol's older Bedminster, Easton and Bishopston conversion stock this is the highest-value expense judgment there is, because revenue repairs reduce tax now while capital improvements only reduce CGT on eventual sale.",
      },
      {
        title: "MTD for Income Tax",
        desc: "Software selection, digital records and quarterly submissions, with a dry-run quarter well ahead of the relevant April rather than weeks before.",
      },
    ],
    sections: [
      {
        h2: "Bristol's buy-to-let sub-markets",
        bullets: [
          "Student stock around Redland, Cotham, Bishopston and Stokes Croft, driven by the University of Bristol and UWE. Mostly HMO multi-occupancy with higher cleaning, repairs and turnover costs but materially higher rent per room, and much of it relies on the C3 to C4 conversion that Article 4 now brings into the planning system.",
          "Family lets across Clifton, Henleaze, Westbury-on-Trym, Bishopston and Horfield. Lower management overhead and lower per-room yield, with Clifton period housing in particular carrying higher base values that feed straight into the CGT calculation on disposal.",
          "City centre and harbourside new build at Harbourside, Temple Quay, Wapping Wharf and Finzels Reach. Usually leasehold, so service charges, ground rent and the capital versus revenue line on leasehold improvements need careful treatment.",
          "Regeneration and value-add areas including Bedminster, Southville, Easton, St Pauls, Fishponds and St George, where renovation spend is common and the repairs versus improvement line does the most work.",
        ],
      },
      {
        h2: "The citywide Article 4 direction and HMO licensing",
        paras: [
          "Three licensing frameworks apply. Mandatory HMO licensing covers any HMO with five or more occupants forming two or more households who share a kitchen, bathroom or toilet. Additional HMO licensing can be designated for smaller HMOs in defined areas. Selective licensing can cover all private rented lettings, not just HMOs, in defined areas. Bristol City Council operates instances of these, and designations are reviewed periodically, so the current position should be verified before purchase.",
          "On top of that, Bristol operates a citywide Article 4 direction removing permitted development rights for converting a standard family home into a small HMO for three to six unrelated occupants. Across the whole city that conversion requires a full planning application.",
          "The tax treatment splits two ways. Licence fees and ongoing compliance costs are revenue expenses. The capital works needed to meet HMO standards, such as additional bathrooms and fire safety upgrades, along with the professional fees on the planning application, are capital expenditure that enters the CGT base cost.",
        ],
      },
      {
        h2: "Worked example: Section 24 on a Bristol portfolio",
        paras: [
          "Take a higher-rate landlord with three properties across Bishopston, Redland and Bedminster bought for £660,000 in total at 75% LTV, combined gross rents of £40,800, allowable non-finance expenses of £8,160 including HMO licensing on the Redland student let, mortgage interest of £25,990, and PAYE income of £62,000.",
          "Rental profit before finance costs is £32,640, taking total income to £94,640. After the personal allowance, tax is £7,540 at basic rate and £17,748 at higher rate, giving £25,288 before the Section 24 credit of £5,198. Income tax due is £20,090.",
          "The rental-attributable slice is roughly £7,858. Under the pre-Section-24 mechanic taxable rental profit would have been £6,650 and the rental slice of tax £2,660, so the recurring wedge is about £5,198 a year, which is simply 20% of the interest that no longer attracts higher-rate relief.",
          "The same portfolio in a company sidesteps Section 24: profit after all expenses including full interest is £6,650, taxed at the 19% small profits rate for £1,264. The offsetting costs have to be modelled against that recurring saving to find breakeven.",
        ],
      },
      {
        h2: "Allowable expenses for Bristol landlords",
        paras: [
          "The Section 24 restriction applies only to finance costs. Everything below is deductible against rental income subject to the wholly and exclusively rule.",
        ],
        bullets: [
          "Letting agent fees and management charges",
          "Repairs and maintenance on a like-for-like basis. A replacement boiler is a repair, an upgraded kitchen is capital",
          "Buildings and contents insurance including landlord liability cover",
          "Utility bills where the landlord pays, common in HMOs with bills-included rents",
          "Council tax during void periods only",
          "Ground rent and service charges on leasehold property, common on Harbourside and city centre flats",
          "Legal and professional fees for tenancy agreements, evictions and ongoing property advice",
          "Accountancy fees attributable to the rental business",
          "HMO, additional and selective licensing fees",
          "Gas safety certificates annually, EICRs every five years, and EPCs every ten years",
          "Replacement of domestic items relief on like-for-like replacement of beds, sofas, white goods and similar. Initial furnishing of a newly-furnished let is not covered",
          "Travel for property visits, repairs supervision and viewings, at 55p per mile for the first 10,000 business miles and 25p thereafter",
          "Property management software subscriptions, now that compatible software is mandatory under MTD",
        ],
      },
      {
        h2: "Stamp duty on a Bristol purchase",
        paras: [
          "Standard SDLT bands apply with the 5% additional dwellings surcharge on most buy-to-let purchases: 5% up to £125,000, 7% to £250,000, 10% to £925,000, 15% to £1.5m and 17% above that. The surcharge rose from 3% to 5% on 31 October 2024 and the nil-rate band returned to £125,000 on 1 April 2025.",
          "Multiple Dwellings Relief was abolished for transactions completing on or after 1 June 2024. Bristol is in England so SDLT applies, but landlords expanding into Wales pay Land Transaction Tax and those buying in Scotland pay LBTT plus the Additional Dwelling Supplement, both of which work differently from the table above.",
        ],
      },
      {
        h2: "Capital gains tax on a Bristol disposal",
        paras: [
          "Bristol's long-run capital growth, particularly in Clifton, Redland and around the harbourside, means CGT is often the largest single tax event in a landlord's ownership of a property. Rates are 18% within the basic-rate band and 24% above it, with a £3,000 annual exempt amount, reported within 60 days of completion.",
        ],
        bullets: [
          "Inter-spouse transfer before sale, moving part of the gain into a lower band and using both annual exempt amounts.",
          "Private Residence Relief where the property was previously your main residence, with the final nine months always counted as deemed occupation. This comes up often on Clifton and Cotham houses that were lived in before being let.",
          "Disposal timing, where a drop from higher rate to basic rate in a later year moves more of the gain into the 18% slice.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a specialist if I only own one Bristol rental property?",
        a: "Often yes, particularly where Section 24 is materially reducing post-tax cash, where MTD now applies, or where the property sits inside the citywide Article 4 direction or an HMO licensing area that creates compliance overhead a generalist may miss. Good systems from the start prevent a catch-up that usually costs more than setting up properly.",
      },
      {
        q: "Does Bristol operate selective and HMO licensing?",
        a: "Yes. Mandatory HMO licensing applies to any HMO with five or more occupants forming two or more households, and the council also operates additional HMO licensing and selective licensing in defined areas. Scope and boundaries are reviewed periodically, so check before purchase. Licence fees and the cost of meeting the conditions are fully deductible against rental profit.",
      },
      {
        q: "What is the Bristol Article 4 direction and why does it matter?",
        a: "Bristol has a citywide Article 4 direction removing permitted development rights for converting a standard family home into a small HMO for three to six unrelated occupants. Inside the direction, and that means everywhere in the city, the conversion needs a full planning application. Much of Bristol's student-let economics depends on that conversion, so the planning risk has to be priced into an acquisition before exchange. The professional fees on the application are capital, while ongoing HMO compliance costs are revenue deductions.",
      },
      {
        q: "How much could incorporation save a Bristol landlord with several properties?",
        a: "It depends on rental profit, leverage and marginal rate. A higher-rate landlord with substantial interest across a multi-property portfolio typically sees a meaningful annual differential, offset by higher company mortgage pricing, extra compliance, dividend tax on extraction, and SDLT plus CGT on transferring existing property in. We model both routes side by side before recommending either.",
      },
      {
        q: "What records do Bristol landlords need for Making Tax Digital?",
        a: "Digital records in compatible software, quarterly updates, and a final declaration through the same software, for sole-trader landlords with gross qualifying income above £50,000. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. Joint owners test against their share of gross income. Paper records and unlinked spreadsheets are no longer compliant, and companies are outside the regime.",
      },
      {
        q: "When should I consider incorporating my Bristol property business?",
        a: "When your rental profit sits in the higher or additional rate band, when gearing is high enough that Section 24 is materially eroding post-tax cash, when retention and reinvestment rather than extraction is the plan, or when intergenerational transfer is in scope. For existing portfolios the SDLT and CGT cost of transferring in usually pushes breakeven out by three to five years.",
      },
      {
        q: "How early should I prepare for MTD?",
        a: "Setting up compatible software, establishing digital record-keeping and running a dry-run quarter takes roughly six months end to end. Landlords approaching the £30,000 and £20,000 thresholds in 2027 and 2028 should apply the same six-month window.",
      },
      {
        q: "How do the April 2027 property income rates affect Bristol landlords?",
        a: "Separate rates of 22% basic, 42% higher and 47% additional take effect from 6 April 2027 for property income in England and Northern Ireland, announced at the Autumn Budget 2025 and enacted in Finance Act 2026. For 2026/27 the standard rates continue. From April 2027 the Section 24 reducer is given at 22% rather than 20%, so a basic-rate landlord sees no new wedge while a higher-rate landlord's relief rises to 22% against a 42% rate. The change pulls the incorporation breakeven point forward.",
      },
      {
        q: "What CGT will I pay when selling a Bristol buy-to-let?",
        a: "18% on the gain falling within the basic-rate band and 24% above it, with a £3,000 annual exempt amount for 2026/27. Joint owners each use their own allowance. The disposal is reported through HMRC's UK property service within 60 days of completion where tax is due, and again on Self Assessment. Private Residence Relief is available time-apportioned where the property was at some point your main residence.",
      },
      {
        q: "Can I claim mortgage arrangement fees?",
        a: "Yes. Arrangement fees, broker fees and valuation fees on a buy-to-let mortgage are finance costs, so for individuals they fall under the Section 24 restriction rather than being fully deducted. For companies they are fully deductible before corporation tax. Legal fees on the purchase itself are capital and enter the CGT base cost.",
      },
      {
        q: "Are furnished student lets in Bristol treated differently?",
        a: "The furnished holiday lettings regime ended on 6 April 2025, so a furnished student let is taxed as an ordinary UK property business. There is no capital allowances treatment for furniture inside a dwelling, but replacement of domestic items relief covers like-for-like replacement once the property is furnished. The initial cost of furnishing is not covered. Capital allowances can still apply to qualifying plant in the communal areas of larger HMOs, which is worth checking on student portfolios.",
      },
      {
        q: "Can you take over from my current accountant mid-year?",
        a: "Yes. A professional clearance letter goes to the outgoing accountant, they release the records, HMRC's 64-8 authority is updated, and the new accountant picks up the partial-year position. Most switches complete within two to three weeks.",
      },
      {
        q: "Do you work with non-resident landlords who own Bristol property?",
        a: "Yes. Under the Non-Resident Landlord Scheme letting agents deduct basic-rate tax from rent unless the landlord holds approval to receive it gross, and annual UK returns are still required. Non-resident CGT applies on disposal with mandatory 60-day reporting for every UK land disposal whether or not tax is due, which is stricter than the UK-resident position.",
      },
    ],
  },
};

const cityName = (slug: string) => slug.charAt(0).toUpperCase() + slug.slice(1);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  const content = cityContent[slug];
  if (!loc || !content) {
    return {};
  }
  const city = cityName(slug);
  const canonical = `${siteConfig.url}/locations/${loc.slug}`;
  const title = `Property Accountant in ${city} | Landlord Tax Specialists`;
  return {
    title,
    description: content.metaDescription,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title,
      description: content.metaDescription,
      url: canonical,
      type: "website",
      images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.metaDescription,
      images: [siteConfig.publisherLogoUrl],
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = siteConfig.locations.find((l) => l.slug === slug);
  if (!loc) {
    notFound();
  }

  const content = cityContent[slug];
  if (!content) {
    notFound();
  }

  const city = cityName(slug);
  const cityLower = city.toLowerCase();
  const indexablePosts = getAllPosts().filter((p) => !p.noindex);
  const cityPosts = indexablePosts.filter(
    (p) =>
      p.title.toLowerCase().includes(cityLower) ||
      p.slug.toLowerCase().includes(slug) ||
      getCategorySlug(p).includes(slug),
  );
  const fallbackPosts = indexablePosts.filter(
    (p) => getCategorySlug(p) === "landlord-tax-essentials",
  );
  const posts = [...cityPosts, ...fallbackPosts.filter((p) => !cityPosts.includes(p))].slice(0, 5);

  const localBusinessSchema = buildCityLocalBusinessJsonLd({
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: content.intro,
    url: `${siteConfig.url}/locations/${slug}`,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    city,
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85"
          alt={`${city} property`}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: city },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Property accountant {city}
            </h1>
            <p className="mt-4 text-xl text-white">
              Specialist property accountants serving landlords across {city}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-slate-700">
              {content.intro}
            </p>

            <h2 className="mt-12 text-3xl font-bold text-slate-900">
              Specialist property accounting services in {city}
            </h2>
            <div className="mt-8 space-y-6">
              {content.services.map((service) => (
                <div key={service.title} className="border-l-4 border-emerald-600 bg-slate-50 p-8">
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{service.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 text-3xl font-bold text-slate-900">
              Why choose a specialist for {city} property?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {content.whyLocal}
            </p>

            {content.sections.map((section) => (
              <div key={section.h2}>
                <h2 className="mt-16 text-3xl font-bold text-slate-900">{section.h2}</h2>
                {section.paras?.map((p) => (
                  <p key={p} className="mt-4 text-base leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <h2 className="mt-16 text-3xl font-bold text-slate-900">
              Areas we serve in and around {city}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {content.areas}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              We work with landlords across the UK, and we understand the specific dynamics of the {city} property
              market. Remote support with local market knowledge.
            </p>

            <h2 className="mt-16 text-3xl font-bold text-slate-900">
              {city} landlord tax questions
            </h2>
            <div className="mt-8 space-y-6">
              {content.faqs.map((faq) => (
                <div key={faq.q} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                  <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-emerald-50 border-l-4 border-emerald-600 p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                How to get started
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Book a free consultation to discuss your property tax situation. We&apos;ll give you clear
                recommendations, with no obligation and no hard sell. What it costs depends on the size and structure
                of your portfolio, so we will talk that through rather than quote blind.
              </p>
              <div className="mt-6">
                <Link href="/contact" className={`${btnPrimary} inline-flex text-base px-8 py-3.5`}>
                  Book your free consultation
                </Link>
              </div>
            </div>

            {posts.length > 0 && (
              <>
                <h2 className="mt-16 text-3xl font-bold text-slate-900">Related articles</h2>
                <ul className="mt-8 space-y-4">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${getCategorySlug(p)}/${p.slug}`}
                        className="block border-l-4 border-slate-300 bg-slate-50 p-6 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
                      >
                        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{p.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <CTASection
            title={`Speak to a property accountant for your ${city} portfolio`}
            description="Tell us about your portfolio and we'll explain how we can help with Section 24, MTD, and incorporation planning."
          />
        </div>
      </section>
    </>
  );
}
