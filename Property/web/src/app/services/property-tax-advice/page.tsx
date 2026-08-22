import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/services/property-tax-advice`;

export const metadata: Metadata = {
  title: "Property Tax Advice from Specialist Advisors",
  description:
    "Specialist property tax advice for UK landlords and investors: one-off consultations on structuring, CGT timing, capital allowances and portfolio IHT. Written advice, no ongoing tie-in.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-GB": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax consultations for UK landlords and investors: structuring, CGT timing, capital allowances, portfolio IHT. Written advice you can act on.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Tax Advice from Specialist Advisors",
    description:
      "One-off property tax consultations for UK landlords and investors: structuring, CGT timing, capital allowances, portfolio IHT.",
  },
};

const adviceAreas = [
  {
    title: "Structuring and ownership",
    body: "Whether a property should sit personally, jointly, in a limited company, in a family investment company or under a declaration of trust. The answer moves with your marginal rate, your spouse's rate, your borrowing, and what you plan to do with the property in ten years. We model the options against your actual numbers rather than the general case.",
  },
  {
    title: "Capital gains tax timing and reliefs",
    body: "When to sell, what order to sell in, how to use main residence relief and private residence elections properly, whether a loss can be crystallised in the same tax year, and how the 60-day reporting deadline changes your cash planning. Timing a disposal across two tax years is often worth more than any single relief.",
  },
  {
    title: "Section 24 mitigation",
    body: "The finance cost reducer is 20% now and rises to 22% from April 2027, in step with the new property income rates of 22%, 42% and 47%, so the wedge for a higher-rate landlord stays 20 points. Advice here covers what actually reduces your exposure: pension contributions, spouse allocation, deductible expense discipline, refinancing decisions, and whether incorporation is proportionate to the saving.",
  },
  {
    title: "Capital allowances on commercial and mixed property",
    body: "Embedded plant and machinery in commercial buildings, furnished holiday let history, and fixtures elections on purchase. Writing down allowances fall from 18% to 14%, a new 40% first year allowance applies, and the special rate pool stays at 6%. Most buyers of commercial property never claim what they are entitled to.",
  },
  {
    title: "Inheritance tax and portfolio succession",
    body: "Rental property is investment property, so business relief rarely applies. Thresholds are frozen to 5 April 2031, and the combined 100% business and agricultural relief allowance is capped at £2.5m from April 2026. Advice covers gifting sequences, the seven year clock, freezer share structures and what your executors will face.",
  },
  {
    title: "Non-resident and cross-border positions",
    body: "Living abroad while letting UK property, the non-resident landlord scheme, non-resident CGT reporting, treaty relief, and how a return to the UK changes your position. Getting the residence and reporting sequence wrong keeps HMRC's discovery window open for years.",
  },
];

const scenarios = [
  {
    title: "You are about to buy or sell and want the decision checked first",
    body: "The cheapest advice is the advice you take before you exchange. Ownership name, funding structure, SDLT surcharges and multiple dwellings treatment are all fixed on completion day and expensive to unwind afterwards.",
  },
  {
    title: "Your accountant files your return but never advises",
    body: "Compliance and advice are different jobs. If nobody has modelled your position for three years, you are almost certainly paying tax you did not need to pay, or carrying a risk nobody has priced.",
  },
  {
    title: "You have an HMRC letter, an enquiry or an undisclosed period",
    body: "A nudge letter, a Let Property Campaign disclosure or a formal enquiry needs a considered position before you reply. What you say first shapes the whole enquiry.",
  },
  {
    title: "You are restructuring a portfolio",
    body: "Moving properties between spouses, into a company, into a trust or across a group has capital gains, stamp duty, mortgage and inheritance tax consequences that only make sense modelled together.",
  },
  {
    title: "You have inherited property and do not know what to do with it",
    body: "Probate value sets your base cost, the estate may still be settling, and the choice between selling, letting or transferring changes both your tax bill and the estate's.",
  },
  {
    title: "You want a second opinion on advice you have already been given",
    body: "A scheme, a structure or a plan someone else has proposed, reviewed independently before you commit money to it. We tell you where it holds and where it does not.",
  },
];

const engagementSteps = [
  {
    n: "01",
    title: "Scoping call",
    body: "A short conversation about the decision you are facing, the properties involved and your wider tax position. We tell you whether the question needs a consultation at all, and if it does not, we say so.",
  },
  {
    n: "02",
    title: "Fixed scope and fee",
    body: "You get the question written down, the work required to answer it, the fee, and the turnaround before anything starts. No hourly billing and no open-ended engagement.",
  },
  {
    n: "03",
    title: "Analysis and modelling",
    body: "We work through your figures, model the realistic options, and stress test them against the rules as they stand and as they are legislated to change. Where the answer depends on an assumption, we show you the assumption.",
  },
  {
    n: "04",
    title: "Written advice and a follow-up call",
    body: "You receive a written note setting out the position, the options with numbers attached, the recommendation and the risks. A call follows so you can push back on it. The note is yours to share with your solicitor, broker or existing accountant.",
  },
  {
    n: "05",
    title: "Implementation, only if you want it",
    body: "Some clients take the advice and act on it themselves. Others ask us to run the elections, filings and coordination. Both are fine. The consultation does not commit you to anything ongoing.",
  },
];

const specialistVsGeneralist = [
  {
    generalist: "Treats rental income as a schedule on a tax return",
    specialist: "Treats each property as a position with an acquisition history, a base cost, a relief profile and an exit plan",
  },
  {
    generalist: "Applies the finance cost reducer and moves on",
    specialist: "Models whether the reducer, spouse allocation, pension relief or a change of structure produces the better outcome over the holding period",
  },
  {
    generalist: "Records a commercial purchase at the price paid",
    specialist: "Looks for embedded fixtures, checks the section 198 election on purchase and quantifies the allowances before the opportunity is lost",
  },
  {
    generalist: "Reports a disposal after it happens",
    specialist: "Plans the disposal year, the ownership split and the reporting deadline before contracts are exchanged",
  },
  {
    generalist: "Notes that inheritance tax may be an issue",
    specialist: "Values the portfolio against the frozen thresholds, tests the gifting sequence and shows what the estate pays under each option",
  },
];

const faqs = [
  {
    q: "What is the difference between property tax advice and property accountancy?",
    a: "Accountancy is the recurring work: bookkeeping, rental schedules, Self Assessment, company accounts, quarterly MTD submissions. Advice is a decision-shaped engagement with a defined question, a piece of analysis and a written answer. You can buy advice from us without moving your compliance work, and many people do exactly that. If you want the ongoing service, that sits on our property accountant page.",
  },
  {
    q: "Do I have to switch accountants to get advice from you?",
    a: "No. A consultation is a standalone engagement. Plenty of clients keep their existing accountant for the annual return and come to us for the decisions that fall outside their accountant's experience. We write the advice so it can be handed straight to them for implementation.",
  },
  {
    q: "What does a property tax consultation cost?",
    a: "It depends entirely on the question. A single disposal timing question is a much smaller piece of work than modelling a twelve property restructure across two spouses and a company. You get a fixed fee for a defined scope before any work begins, so you always know the cost in advance. Book a consultation and we will scope it on the call.",
  },
  {
    q: "What should I bring to the first call?",
    a: "A list of the properties with rough values and outstanding mortgages, how each is owned, your and your spouse's approximate income, and the decision you are trying to make. Purchase dates and prices help if you have them. If you do not have all of it, come anyway; we will tell you what else we need.",
  },
  {
    q: "Can you advise on a property I have already bought or sold?",
    a: "Yes, though the options narrow after completion. Before exchange we can influence ownership, funding and structure. After completion we work with reliefs, elections, allocation and disclosure. If a disposal has already happened, the 60-day capital gains reporting deadline usually makes it urgent.",
  },
  {
    q: "Do you give advice on incorporation?",
    a: "Yes, and it is one of the most common questions we are asked. Incorporation is a decision with real upfront cost, so we model the capital gains and stamp duty exposure against the annual saving and the break-even point. Our buy-to-let incorporation analysis covers how that assessment works and includes a calculator you can run yourself first.",
  },
  {
    q: "Is a property tax specialist worth it for a small portfolio?",
    a: "Sometimes not, and we will tell you when the answer is no. With one or two low-geared properties and a basic-rate income, there is often nothing meaningful to plan. The value appears when you are a higher-rate taxpayer, when borrowing is significant, when a disposal or purchase is coming, or when a portfolio is heading for an inheritance tax charge.",
  },
  {
    q: "Do you advise on commercial property as well as residential?",
    a: "Yes. Commercial and mixed use property brings its own questions: capital allowances on embedded fixtures, the option to tax for VAT, different capital gains treatment, and stamp duty at non-residential rates. These are areas where a generalist adviser most often leaves money on the table.",
  },
  {
    q: "Can you help with an HMRC enquiry or an undisclosed rental period?",
    a: "Yes. Unreported rental income is usually handled through the Let Property Campaign, where a considered voluntary disclosure produces a materially better outcome than waiting to be found. If you have already had a letter, get advice before you reply to it.",
  },
  {
    q: "Do you work with landlords outside London?",
    a: "We advise landlords and investors across the UK. The work is done by video call, phone and email, with documents exchanged securely, so where you live makes no difference to the service. Property tax rules are UK-wide, with the devolved differences in Scottish and Welsh land transaction tax handled where they apply.",
  },
  {
    q: "How quickly can I get advice?",
    a: "Scoping calls are usually available within a few days. Turnaround on the written advice depends on the complexity and how quickly we get the figures from you. If there is a hard deadline, a completion date, a 60-day capital gains report or an HMRC response date, tell us on the first call and we will work to it.",
  },
  {
    q: "Will you tell me if I should do nothing?",
    a: "Yes. A recommendation to leave things as they are is a legitimate outcome, and a common one. Advice that only ever concludes with an expensive restructure is not advice.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Property Tax Advice",
  serviceType: "Property tax advisory and consultation",
  description:
    "Specialist property tax advice for UK landlords and investors, delivered as one-off consultations covering ownership structuring, capital gains tax timing, Section 24 mitigation, capital allowances and portfolio inheritance tax planning.",
  url: pageUrl,
  provider: {
    "@type": "Organization",
    name: "Property Tax Partners",
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
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PropertyTaxAdvicePage() {
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

      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Property Tax Advice" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Property tax advice from specialist advisors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              One-off consultations for UK landlords and investors facing a decision worth getting right: how to own a
              property, when to sell it, whether to incorporate, and what your portfolio will cost your family.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              <Link
                href="#faq"
                className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Common questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Advice, not another set of accounts
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
              <p>
                Most property tax is lost at the point of a decision, not at the point of filing. The property went into
                the wrong name. The sale completed in the wrong tax year. The commercial purchase never had its fixtures
                valued. The portfolio grew for twenty years with nobody asking what happens when it passes on. By the
                time a return is prepared, those choices are already made and the return simply reports the consequences.
              </p>
              <p>
                This is a consultation service for that earlier moment. You bring a specific decision, we model it
                against your real figures, and you get written advice with the options costed and a clear recommendation.
                It is a defined piece of work with a fixed fee, not a retainer.
              </p>
              <p>
                If what you actually need is someone to run the annual return, the rental schedules, the company accounts
                and the quarterly Making Tax Digital submissions, that is a different service and it lives on our{" "}
                <Link href="/services/property-accountant" className="text-emerald-700 font-semibold hover:underline">
                  property accountant page
                </Link>
                . Plenty of people use both. Plenty use only one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What the advice covers</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Six areas account for most of what landlords and investors ask us. A consultation can cover one of them or
              several, depending on the decision in front of you.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {adviceAreas.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white border-2 border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Background reading before you book</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                These go deeper on the questions that come up most often in consultations.
              </p>
              <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-700">
                <li>
                  <Link
                    href="/blog/incorporation-and-company-structures/how-to-choose-right-property-company-structure-uk-landlords-2026"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Choosing the right company structure for a property portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/section-24-and-tax-relief/2027-property-tax-rates-section-24-relief-uk-landlords"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    What the 2027 rate changes do to Section 24 relief
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Capital gains tax deferral strategies for property investors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Calculating the capital gains charge on transferring property to a company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Capital allowances for property investors: the full decision framework
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    The business and agricultural relief cap and what it means for property
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/landlord-tax-essentials/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Family investment companies and freezing portfolio value for inheritance tax
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Making Tax Digital software for landlords
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              When a consultation is worth booking
            </h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {scenarios.map((item) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">
              How an engagement works
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {engagementSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
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

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Why a property tax specialist rather than a general adviser
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              A good general practice adviser handles a wide range of clients competently. Property is where breadth
              stops paying. The reliefs are narrow, the elections have deadlines, and the rules have changed repeatedly
              since 2016. The difference shows up in what gets noticed.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold">General adviser</th>
                    <th className="p-4 font-bold">Property tax specialist</th>
                  </tr>
                </thead>
                <tbody>
                  {specialistVsGeneralist.map((row) => (
                    <tr key={row.generalist} className="border-b border-slate-200 align-top">
                      <td className="p-4 text-slate-600">{row.generalist}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.specialist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every client of this practice is a landlord, investor or property business. That is the whole reason the
              second column is routine rather than exceptional.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              The rules your advice has to work around in 2026/27
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Several changes legislated in Finance Act 2026 land within the next two years. Advice given against the old
              position is worse than no advice, because it is confidently wrong.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-bold">Change</th>
                    <th className="p-4 font-bold">Position</th>
                    <th className="p-4 font-bold">From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Rates on property income</td>
                    <td className="p-4 text-slate-700">
                      Separate rates of 22%, 42% and 47% replace 20%, 40% and 45% in England, Wales and Northern
                      Ireland. Scotland is not affected for 2027/28
                    </td>
                    <td className="p-4 text-slate-700">6 April 2027</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Section 24 finance cost reducer</td>
                    <td className="p-4 text-slate-700">
                      Rises from 20% to 22%, tracking the new property basic rate, so the higher-rate wedge stays
                      20 points
                    </td>
                    <td className="p-4 text-slate-700">April 2027</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Making Tax Digital for landlords</td>
                    <td className="p-4 text-slate-700">
                      Qualifying income over £50,000 from April 2026, over £30,000 from April 2027
                    </td>
                    <td className="p-4 text-slate-700">April 2026</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Writing down allowances</td>
                    <td className="p-4 text-slate-700">
                      Main pool falls from 18% to 14%, a new 40% first year allowance applies, special rate pool stays at
                      6%
                    </td>
                    <td className="p-4 text-slate-700">2026/27</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Dividend rates</td>
                    <td className="p-4 text-slate-700">10.75%, 35.75% and 39.35%</td>
                    <td className="p-4 text-slate-700">6 April 2026</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Business asset disposal relief</td>
                    <td className="p-4 text-slate-700">Rate of 18%</td>
                    <td className="p-4 text-slate-700">6 April 2026</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Inheritance tax thresholds</td>
                    <td className="p-4 text-slate-700">Frozen, with the combined business and agricultural relief allowance capped at £2.5m</td>
                    <td className="p-4 text-slate-700">To 5 April 2031</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white align-top">
                    <td className="p-4 font-semibold text-slate-900">Employer national insurance</td>
                    <td className="p-4 text-slate-700">15% with a £5,000 secondary threshold, relevant to company structures with staff</td>
                    <td className="p-4 text-slate-700">Current</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              Our{" "}
              <Link href="/property-tax-rates" className="text-emerald-700 font-semibold hover:underline">
                property tax rates reference
              </Link>{" "}
              carries the full set of thresholds if you want the detail before a call.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Run the numbers yourself first</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Several of the questions people book a consultation for can be sized in a few minutes. If a calculator
              shows the effect is small, you may not need advice at all, and we would rather you found that out for free.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/calculators/section-24-calculator"
                className="block border-l-4 border-emerald-600 bg-slate-50 p-6 hover:bg-emerald-50"
              >
                <h3 className="text-lg font-bold text-slate-900">Section 24 calculator</h3>
                <p className="mt-2 text-sm text-slate-700">See what the finance cost restriction costs you each year.</p>
              </Link>
              <Link
                href="/calculators/incorporation-cost-calculator"
                className="block border-l-4 border-emerald-600 bg-slate-50 p-6 hover:bg-emerald-50"
              >
                <h3 className="text-lg font-bold text-slate-900">Incorporation cost calculator</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Upfront capital gains and stamp duty exposure against the annual saving.
                </p>
              </Link>
              <Link
                href="/calculators/mtd-checker"
                className="block border-l-4 border-emerald-600 bg-slate-50 p-6 hover:bg-emerald-50"
              >
                <h3 className="text-lg font-bold text-slate-900">Making Tax Digital checker</h3>
                <p className="mt-2 text-sm text-slate-700">Find out which April your quarterly reporting starts.</p>
              </Link>
              <Link
                href="/calculators/stamp-duty-calculator"
                className="block border-l-4 border-emerald-600 bg-slate-50 p-6 hover:bg-emerald-50"
              >
                <h3 className="text-lg font-bold text-slate-900">Stamp duty calculator</h3>
                <p className="mt-2 text-sm text-slate-700">Including the additional property surcharge on a purchase.</p>
              </Link>
            </div>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              For the incorporation decision specifically, our{" "}
              <Link href="/incorporation" className="text-emerald-700 font-semibold hover:underline">
                buy-to-let incorporation analysis
              </Link>{" "}
              sets out the full feasibility assessment, and{" "}
              <Link href="/landlord-tax" className="text-emerald-700 font-semibold hover:underline">
                our landlord tax guide
              </Link>{" "}
              covers the annual position most consultations start from.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What you get from a consultation</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>A written note setting out your position and the options, with numbers attached to each</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>A clear recommendation, including a recommendation to do nothing where that is the right answer</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>The assumptions and the risks stated openly, so you can see what the answer depends on</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Deadlines and elections identified, with the dates you have to hit</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>A follow-up call to challenge the advice before you act on it</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>A document you can hand to your solicitor, broker or existing accountant to implement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Questions about a consultation</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {faqs.map((item) => (
                <div key={item.q} className="border-l-4 border-slate-300 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.q}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get specialist property tax advice on the decision in front of you"
        description="Book a consultation. We will scope the question, quote a fixed fee, and tell you up front if you do not need us."
        primaryLabel="Book a consultation"
      />
    </>
  );
}
