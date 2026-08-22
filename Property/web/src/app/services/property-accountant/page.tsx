import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/services/property-accountant";

export const metadata: Metadata = {
  title: "Property Accountant for UK Landlords and Investors",
  description:
    "A property accountant for UK landlords and investors: rental accounts, Self Assessment, SPV company accounts, MTD quarterly filing and year-round tax planning.",
  alternates: {
    canonical: `${siteConfig.url}${PAGE_PATH}`,
    languages: {
      "en-GB": `${siteConfig.url}${PAGE_PATH}`,
      "x-default": `${siteConfig.url}${PAGE_PATH}`,
    },
  },
  openGraph: {
    title: "Property Accountant for UK Landlords and Investors",
    description:
      "Rental accounts, Self Assessment, SPV company accounts, MTD filing and planning, handled by accountants who work on property every day.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Accountant for UK Landlords and Investors",
    description:
      "Rental accounts, Self Assessment, SPV company accounts, MTD filing and planning for UK property.",
  },
};

const scope = [
  {
    title: "Rental accounts and bookkeeping",
    body: "Property-by-property income and expense records, so you can see which flat actually makes money rather than one blended figure for the portfolio. Bank feeds, agent statements and service charge accounts reconciled, with the capital and revenue split done properly at the point of entry rather than guessed at in January.",
  },
  {
    title: "Self Assessment for rental income",
    body: "The property pages of your tax return, prepared with the finance cost restriction applied correctly, allowable expenses claimed in full, and jointly held property split the way your ownership and any Form 17 election actually require. Payments on account checked so you are not overpaying HMRC a year in advance.",
  },
  {
    title: "Company accounts for property SPVs",
    body: "Statutory accounts and CT600 corporation tax returns for buy-to-let limited companies, including directors' loan account tracking, intercompany balances in group structures, and the profit extraction mix that leaves you with the most after tax.",
  },
  {
    title: "Making Tax Digital",
    body: "Quarterly updates under MTD for Income Tax, which applies to qualifying property and self-employment income over £50,000 from April 2026 and over £30,000 from April 2027. Software chosen and set up around how you already record rents, not the other way round.",
  },
  {
    title: "Capital gains and disposals",
    body: "The 60-day CGT return after a residential disposal, base cost reconstructed from purchase and improvement records, private residence and lettings relief where they apply, and disposal timing modelled before you accept an offer rather than after completion.",
  },
  {
    title: "Structure and planning",
    body: "Whether to hold personally or in a company, whether incorporation relief is realistically available, how capital allowances land now that the writing down allowance is 14% with a 40% first year allowance on main pool spend, and what your portfolio does at the point it passes to the next generation.",
  },
];

const audiences = [
  {
    tag: "1 to 3 properties",
    title: "You bought a flat and the return stopped being simple",
    body: "The first return you did yourself. Then a remortgage arrangement fee, a boiler replacement that might be capital, a void period and a tenant deposit dispute all landed in the same year, and the finance cost restriction turned a modest profit into a tax bill you did not expect. This is the point where the fee usually pays for itself in claimed expenses alone.",
  },
  {
    tag: "4 to 15 properties",
    title: "You run a portfolio and need numbers you can act on",
    body: "You want to know yield and net profit per property, which mortgage to fix next, and whether the next purchase should sit personally or in a company. You also want the compliance to be a non-event: quarterly MTD updates filed, the return in well before the deadline, no January panic.",
  },
  {
    tag: "Limited company and SPV",
    title: "You hold property through a company",
    body: "Statutory accounts, corporation tax, Companies House filing, directors' loan account discipline and a profit extraction plan. Dividend rates rose to 10.75%, 35.75% and 39.35% from 6 April 2026, which changes the salary and dividend mix that used to be automatic.",
  },
  {
    tag: "Investor, mixed holdings",
    title: "Property is one part of a wider position",
    body: "Residential, commercial units, a development project, maybe shares and a pension alongside. You need someone who can see the whole tax position, including how a disposal in one part of the portfolio interacts with the annual exempt amount, business asset disposal relief at 18% from 6 April 2026, and the inheritance tax thresholds now frozen to 5 April 2031.",
  },
];

const specialistReasons = [
  {
    title: "The finance cost restriction is a rate change, not a footnote",
    body: "Mortgage interest on residential lettings held personally is relieved as a basic rate tax reducer, currently 20%, rising to 22% from April 2027 alongside the new separate property income rates of 22%, 42% and 47%, which leaves higher-rate landlords no better off. A generalist who deducts interest as an ordinary expense produces a return that is wrong on its face. Getting the calculation right also means spotting the years where the reducer is capped by the profit or income limits and carried forward.",
  },
  {
    title: "Capital versus revenue is where the money sits",
    body: "A new kitchen of a similar standard is usually a repair. An extension is not. Replacing single glazing with double glazing follows the current standard rule. Deciding these correctly, and documenting why, is the difference between a deduction now, a deduction on sale, and an enquiry you cannot support.",
  },
  {
    title: "Property has its own deadlines",
    body: "A 60-day CGT return after a residential disposal. ATED returns each April for company-held residential property above the threshold. The non-resident landlord scheme. Quarterly MTD updates from April 2026. These sit outside the ordinary Self Assessment calendar and are easy to miss if property is not what you look at all day.",
  },
  {
    title: "Structure decisions compound",
    body: "Incorporating, adding a spouse to the title, moving to a group, taking money out as a directors' loan repayment rather than a dividend: each one is cheap to plan and expensive to unwind. A specialist tells you the cost of the option you are about to take before you take it.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Free consultation",
    body: "Tell us what you own, how it is held, and what you want to do next. We say plainly whether you need what we do. If your position is a single property and a simple return you can file yourself, we will tell you that.",
  },
  {
    n: "02",
    title: "A fixed quote and a scope you can read",
    body: "You get a written engagement letter setting out exactly what is included, what is not, and what it costs for the year. No hourly billing, no surprise invoices for a phone call.",
  },
  {
    n: "03",
    title: "Onboarding and clearance",
    body: "Identity checks, HMRC authorisation, and professional clearance from your existing accountant if you have one. We collect prior year returns, computations and capital allowance records so nothing carried forward is lost in the handover.",
  },
  {
    n: "04",
    title: "The year runs",
    body: "Records kept current, quarterly filings where MTD applies, questions answered inside 24 hours, and a planning conversation before your year end rather than after it, while the decisions can still change the outcome.",
  },
];

const faqs = [
  {
    question: "What does a property accountant do?",
    answer:
      "A property accountant handles the accounting and tax for people who own rental or investment property: rental accounts, the property pages of your Self Assessment return, company accounts and corporation tax for buy-to-let SPVs, quarterly MTD filing, the 60-day capital gains return on residential disposals, and planning around structure, purchases and sales. The core difference from a general accountant is that the property rules are the whole job rather than one client type among fifty.",
  },
  {
    question: "Do I need a property accountant for one buy-to-let?",
    answer:
      "Not necessarily. If you have one property, no mortgage complications and straightforward expenses, the return is manageable on your own. The point at which help usually pays for itself is a residential mortgage in your own name at higher rate tax, a refurbishment where the capital and revenue split is unclear, joint ownership, a sale, or the arrival of MTD quarterly filing. Our free consultation is a fair way to find out which side of that line you are on.",
  },
  {
    question: "What is the difference between a property accountant and a regular accountant?",
    answer:
      "Scope and depth. A regular accountant can prepare a compliant tax return. A property accountant works with the finance cost restriction, private residence and lettings relief, incorporation relief under section 162, capital allowances on commercial and communal areas, ATED, the non-resident landlord scheme, and stamp duty surcharges every week rather than occasionally. Property-specific reliefs are usually missed by volume rather than incompetence: nobody claims what they have not seen before.",
  },
  {
    question: "How much does a property accountant cost?",
    answer:
      "It depends on how many properties you hold, whether they sit personally or in a company, whether you need bookkeeping or only a year end return, and whether MTD quarterly filing applies. We quote a fixed annual fee after the consultation so you know the figure before you commit to anything. Our guide to property accountant fees sets out the ranges you should expect across the market.",
  },
  {
    question: "Do I need a property accountant near me?",
    answer:
      "Location matters much less than it used to. Records arrive digitally, HMRC filing is online, and meetings work as well by video as across a desk. What matters is whether the firm actually works on property. We act for landlords across the UK, from single flats to portfolios of forty, and the tax rules are the same in Leeds as they are in London. If you want a face-to-face meeting, we can arrange one.",
  },
  {
    question: "Can you take over from my current accountant mid-year?",
    answer:
      "Yes. We write for professional clearance, collect your prior year accounts, computations and any carried forward losses or capital allowance pools, and pick up from where they stopped. There is no need to wait for a year end, and switching does not restart anything with HMRC. Most handovers complete inside two weeks.",
  },
  {
    question: "Do you handle both personally held property and limited companies?",
    answer:
      "Yes, and the two together is common. A typical portfolio has older properties held personally and newer purchases in an SPV. We prepare the Self Assessment side and the company accounts and corporation tax side, and treat them as one position when planning, because the decision about where the next purchase goes depends on both.",
  },
  {
    question: "Will you tell me whether to incorporate?",
    answer:
      "We will model it and give you a straight answer. Incorporation triggers capital gains tax and stamp duty on the same day, and those upfront costs need recovering out of annual savings. For a higher rate taxpayer with heavy mortgage interest and a long holding horizon it often works. For a basic rate taxpayer, a low-geared portfolio, or a sale within five years, it usually does not. You can model your own position with our incorporation cost calculator first.",
  },
  {
    question: "How does Making Tax Digital change what you do for me?",
    answer:
      "From April 2026, qualifying property and self-employment income over £50,000 moves to quarterly digital updates, with the threshold dropping to £30,000 from April 2027. In practice that means records have to be kept current through the year rather than reconstructed in December, and four submissions plus a final declaration replace one return. We set the software up, keep the records live, and file the quarters.",
  },
  {
    question: "What records do you need from me?",
    answer:
      "Rent received, agent statements, mortgage interest certificates, insurance, repairs and maintenance invoices, service charge and ground rent demands, professional fees, and completion statements for any purchase or sale. For companies, add the bank statements and anything paid personally on the company's behalf. If your records are currently a folder of photographs, that is workable, and getting them into a usable system is part of onboarding.",
  },
  {
    question: "Do you work with non-resident landlords?",
    answer:
      "Yes. Non-resident landlords have their own scheme for tax deducted at source, their own approval process for receiving rent gross, and a capital gains position that catches disposals of UK property regardless of where you live. It is a distinct piece of work, and our non-resident landlord service covers it in detail.",
  },
  {
    question: "What happens if HMRC opens an enquiry?",
    answer:
      "We handle the correspondence, assemble the supporting records, and deal with HMRC directly on your behalf. Most property enquiries turn on the capital and revenue split, the ownership share used on jointly held property, or undeclared rent from earlier years. Where earlier years are the issue, a disclosure through the Let Property Campaign usually produces a far better penalty outcome than waiting to be found.",
  },
];

const feedingPosts = [
  {
    href: "/blog/property-accountant-services/how-to-choose-a-property-accountant",
    label: "How to choose a property accountant",
  },
  {
    href: "/blog/property-accountant-services/how-much-does-a-property-accountant-cost",
    label: "What a property accountant costs",
  },
  {
    href: "/blog/property-accountant-services/change-landlord-accountants",
    label: "Changing accountants without losing anything",
  },
  {
    href: "/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide",
    label: "Finance costs and the interest restriction",
  },
  {
    href: "/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline",
    label: "MTD for landlords from April 2026",
  },
  {
    href: "/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026",
    label: "MTD software compared",
  },
  {
    href: "/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk",
    label: "Buy-to-let limited companies in full",
  },
  {
    href: "/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide",
    label: "Filing a landlord Self Assessment return",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}${PAGE_PATH}#service`,
  name: "Property accountancy for UK landlords and investors",
  serviceType: "Property accountant",
  description:
    "Accounting and tax for UK landlords and property investors: rental accounts, Self Assessment, limited company and SPV accounts, Making Tax Digital filing, capital gains reporting and structure planning.",
  url: `${siteConfig.url}${PAGE_PATH}`,
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: {
    "@type": "Country",
    name: "GB",
  },
  audience: {
    "@type": "Audience",
    audienceType: "UK landlords and property investors",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property accountancy services",
    itemListElement: scope.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.title },
    })),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}${PAGE_PATH}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function PropertyAccountantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property Accountant" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              A property accountant for UK landlords and investors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Rental accounts, Self Assessment, company accounts for property SPVs, quarterly MTD filing and the
              planning that sits behind all of it. Property is the whole of what we do.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a free consultation
              </Link>
              <Link
                href="#what-we-do"
                className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                See what is included
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
            <p>
              Most landlord tax bills are decided long before the return is filed. They are decided by how a
              refurbishment was categorised, whose name the property sits in, whether the mortgage interest was put
              through as a deduction or a tax reducer, and whether anyone modelled the sale before contracts were
              exchanged. By the time a general practice accountant is typing figures into the property pages in
              January, most of those decisions have already been made for you.
            </p>
            <p>
              A specialist property accountant closes that gap. The compliance still has to be right, and it will be,
              but the value sits in the twelve months before it: knowing which costs are deductible when, which
              structure your next purchase belongs in, and what a disposal actually leaves you with after tax.
            </p>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What a property accountant covers
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Six areas of work. Most clients take all of them, some take one.
            </p>
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
              {scope.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              Rates and thresholds change every year, and several change again in April 2026 and April 2027. The
              current position across income tax, stamp duty, capital gains and corporation tax is set out on our{" "}
              <Link href="/property-tax-rates" className="font-semibold text-emerald-700 underline">
                property tax rates page
              </Link>
              , and the mechanics of how the tax itself works are covered in our{" "}
              <Link href="/landlord-tax" className="font-semibold text-emerald-700 underline">
                landlord tax guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Who this is for</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {audiences.map((item) => (
                <div key={item.title} className="border-2 border-slate-200 bg-white p-6 sm:p-8">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-700">{item.tag}</p>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              If your situation is narrower than the general service, we have work built specifically around it:{" "}
              <Link href="/services/landlord-accountant" className="font-semibold text-emerald-700 underline">
                accounts and returns for landlords
              </Link>
              ,{" "}
              <Link href="/services/property-tax-advice" className="font-semibold text-emerald-700 underline">
                standalone property tax advice
              </Link>{" "}
              where you only need a decision modelled, and the{" "}
              <Link href="/services/non-resident-landlord" className="font-semibold text-emerald-700 underline">
                non-resident landlord service
              </Link>{" "}
              if you live outside the UK.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Why a specialist property accountant rather than a general one
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Nothing here is exotic. It is simply what you see when property is the only thing on the desk.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {specialistReasons.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-500 bg-slate-800 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">How working together starts</h2>
            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              {processSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-slate-50 border-l-4 border-emerald-600 p-6 sm:p-8">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-slate-900 flex items-center justify-center text-xl sm:text-2xl font-bold text-white font-mono">
                      {step.n}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What it costs</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
              <p>
                Fees are fixed and quoted for the year, not billed by the hour, and the figure depends on the shape of
                the work rather than a tier you pick off a page. Four things move it: how many properties you hold,
                whether they sit personally, in a company, or both, whether you want bookkeeping through the year or
                only a year end return, and whether MTD quarterly filing applies to you.
              </p>
              <p>
                A single property with clean records and an annual return sits at one end. A ten property portfolio
                split across personal ownership and two SPVs, with quarterly filing and monthly management reporting,
                sits at the other. We quote after the consultation, in writing, before you commit to anything, and the
                quote holds for the year.
              </p>
              <p>
                For an honest picture of what firms across the market charge, and what should and should not be
                included at each level, read our guide to{" "}
                <Link
                  href="/blog/property-accountant-services/how-much-does-a-property-accountant-cost"
                  className="font-semibold text-emerald-700 underline"
                >
                  property accountant fees
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Work out your own numbers first</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Free, no sign-up, and the figures are yours to take to any adviser.
            </p>
            <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
              <Link
                href="/calculators/section-24-calculator"
                className="block border-2 border-slate-200 p-6 transition-all hover:border-emerald-600 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">Section 24 calculator</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  What the finance cost restriction costs you this year, and what it costs from April 2027 when the
                  reducer moves to 22% and property income moves to 22%, 42% and 47%.
                </p>
              </Link>
              <Link
                href="/calculators/mtd-checker"
                className="block border-2 border-slate-200 p-6 transition-all hover:border-emerald-600 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">MTD checker</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Whether quarterly filing catches you from April 2026, April 2027, or not yet.
                </p>
              </Link>
              <Link
                href="/calculators/incorporation-cost-calculator"
                className="block border-2 border-slate-200 p-6 transition-all hover:border-emerald-600 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">Incorporation cost calculator</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Upfront CGT and stamp duty against annual savings, with a break-even year. The full analysis sits on
                  our <span className="font-semibold text-emerald-700">incorporation</span> service.
                </p>
              </Link>
              <Link
                href="/calculators/portfolio-profitability-calculator"
                className="block border-2 border-slate-200 p-6 transition-all hover:border-emerald-600 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">Portfolio profitability calculator</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Net yield and profit per property, so you can see which holdings are actually carrying the portfolio.
                </p>
              </Link>
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              If incorporation is the decision in front of you, our{" "}
              <Link href="/incorporation" className="font-semibold text-emerald-700 underline">
                incorporation feasibility analysis
              </Link>{" "}
              models it properly rather than in outline.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What landlords ask before they engage us</h2>
            <div className="mt-8 sm:mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-2 border-slate-200 bg-white p-5 sm:p-6">
                  <summary className="cursor-pointer list-none text-base sm:text-lg font-bold text-slate-900 marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Related reading</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {feedingPosts.map((post) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="block border-l-4 border-slate-300 bg-slate-50 px-5 py-4 text-sm sm:text-base font-semibold text-slate-800 transition-all hover:border-emerald-600 hover:text-emerald-700"
                  >
                    {post.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk to a property accountant about your portfolio"
        description="A free consultation, a straight answer about whether you need us, and a fixed written quote if you do."
        primaryLabel="Book free consultation"
        secondaryHref="/services"
        secondaryLabel="All services"
      />
    </>
  );
}
