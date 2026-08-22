import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const PAGE_PATH = "/services/landlord-accountant";
const PAGE_URL = `${siteConfig.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
  description:
    "Landlord accountant for UK rental income: Section 24, MTD quarterly filing, rental portfolios, property investors and letting agents. Book a consultation.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-GB": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
    description:
      "Specialist accountants for landlords: rental accounts, Section 24, MTD, portfolios, investors and letting agents.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landlord Accountant | Accountants for Landlords & Buy to Let",
    description:
      "Specialist accountants for landlords: rental accounts, Section 24, MTD, portfolios, investors and letting agents.",
  },
};

const included = [
  {
    title: "Rental accounts and Self Assessment",
    body: "Property-by-property income and expense schedules, the property pages of your tax return, and the finance cost restriction applied correctly rather than deducted as if it were still 2016.",
  },
  {
    title: "Section 24 planning",
    body: "The basic rate reducer is 20% of finance costs now and rises to 22% from April 2027, when property income also moves to its own rates of 22%, 42% and 47%, so higher-rate landlords pay more overall rather than less. Where that pushes you into a higher band, we model the alternatives before you commit to any of them.",
  },
  {
    title: "Making Tax Digital",
    body: "Quarterly updates start from April 2026 if your combined self-employment and property income is over £50,000, and from April 2027 over £30,000. We check which year catches you, get the software feeding cleanly, and file the quarterly updates.",
  },
  {
    title: "Capital allowances and repairs",
    body: "Splitting capital from revenue on refurbishments, claiming plant and machinery where it genuinely qualifies, and using the writing down allowance at 14% and the 40% first year allowance where they apply. Residential lets are restricted, so the answer is often the repairs deduction, not an allowance.",
  },
  {
    title: "Company accounts and corporation tax",
    body: "Statutory accounts, corporation tax returns, director loan accounts and profit extraction for property companies, including how salary and dividends interact now dividend rates are 10.75%, 35.75% and 39.35%.",
  },
  {
    title: "Disposals and inheritance planning",
    body: "Capital gains calculations and the 60 day reporting deadline on residential disposals, plus how a portfolio sits inside an estate while the inheritance tax thresholds stay frozen to 5 April 2031.",
  },
];

const scenarios = [
  {
    title: "One flat, first tax return",
    body: "You let out a property you used to live in, income is modest, and you want the return filed correctly with the reliefs you are entitled to. This is a small job and it should be priced like one.",
  },
  {
    title: "Four to ten properties, mixed ownership",
    body: "Some held personally, some jointly with a spouse, one in a company. The work is keeping the ownership splits, the finance costs and the company filings straight so nothing gets taxed twice or missed.",
  },
  {
    title: "Rapid acquisition phase",
    body: "You are buying two or three a year, refinancing, and the structure decision matters more than the return itself. Advice comes before the purchase, not after completion.",
  },
  {
    title: "Undeclared rental income",
    body: "You did not realise the income was reportable, or you stopped filing. The Let Property Campaign is a route back with far lower penalties than waiting for HMRC to open an enquiry.",
  },
  {
    title: "Living abroad, letting in the UK",
    body: "Rent from a UK property stays UK taxable wherever you live. The non-resident landlord scheme decides whether your agent or tenant deducts tax at source before you see it.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Consultation",
    body: "A conversation about what you own, how it is held, where the income sits and what you are planning. No charge, and no obligation to go further.",
  },
  {
    n: "02",
    title: "Scope and fixed quote",
    body: "You get a written scope with a fixed annual fee covering the compliance work and any one off advisory piece separately. What the work costs depends on the number of properties, how they are held and how tidy the records are, which is why we quote after the consultation rather than before it.",
  },
  {
    n: "03",
    title: "Handover and setup",
    body: "We handle the professional clearance letter to your current accountant, HMRC agent authorisation, and getting your bookkeeping into a form that survives quarterly reporting.",
  },
  {
    n: "04",
    title: "The year, not just the deadline",
    body: "Quarterly updates where MTD applies, a tax position you can see before January rather than after it, and a real answer when you ring about a property you are about to buy.",
  },
];

const faqs = [
  {
    question: "What does a landlord accountant do?",
    answer:
      "A landlord accountant prepares your rental accounts, files the property pages of your Self Assessment or your company's accounts and corporation tax return, applies the finance cost restriction and the reliefs you qualify for, and advises on the structure you hold property in. The compliance side is the visible part. The part that changes your tax bill is usually the advice about ownership, timing and expenditure.",
  },
  {
    question: "Do I need an accountant for one rental property?",
    answer:
      "Not necessarily. If you own one property, have a mortgage and simple expenses, the return is manageable on your own. It becomes worth paying for when the finance cost restriction starts moving you between tax bands, when you own jointly and the split is not the default, when you sell, or when quarterly reporting under Making Tax Digital applies to you.",
  },
  {
    question: "How much does a landlord accountant cost?",
    answer:
      "It depends on how many properties you own, whether they are held personally, jointly or through a company, and the state of the records. A single property personal return is a different job from a ten property portfolio with a company and quarterly filing. We quote a fixed annual fee in writing after the consultation so you are not agreeing to an open ended hourly rate.",
  },
  {
    question: "What is the difference between a landlord tax accountant and a general accountant?",
    answer:
      "A general practice handles rental income as one line among many. A landlord tax accountant deals with the property specific rules daily: Section 24, the repairs and capital divide on refurbishments, replacement of domestic items, stamp duty surcharges on incorporation, the 60 day capital gains reporting deadline, the non-resident landlord scheme and business property relief on a let portfolio. The risk with a generalist is not incompetence, it is that property rules change constantly and the exposure sits with you.",
  },
  {
    question: "Can you help if I have not declared rental income?",
    answer:
      "Yes. The Let Property Campaign lets you disclose undeclared rental income voluntarily, and the penalty position is significantly better than being found. We work out how many years are in scope, calculate the tax and interest, and make the disclosure. Approaching HMRC before HMRC approaches you is the whole point of the route.",
  },
  {
    question: "Should I own property personally or through a limited company?",
    answer:
      "It depends on your income level, how much mortgage interest you pay, whether you need to draw the profits out, and how long you plan to hold. A company avoids the finance cost restriction but transferring existing property triggers capital gains tax and stamp duty on the same day, and extracting profits is taxed again. New purchases are a different question from existing ones. We model both before you decide.",
  },
  {
    question: "Do I have to file quarterly under Making Tax Digital?",
    answer:
      "If your combined self-employment and property income is over £50,000, quarterly updates begin from April 2026. Over £30,000, from April 2027. The threshold looks at gross income before expenses, not profit, so plenty of landlords who make very little are caught by it. Jointly owned property is split by your share.",
  },
  {
    question: "Do you work with landlords outside your local area?",
    answer:
      "Yes, throughout the UK, including landlords living abroad who let property here. Records, questions and signatures move electronically and calls are booked when they suit you, so nothing about the work depends on where either of us sits.",
  },
  {
    question: "Is there a bad time of year to switch accountants?",
    answer:
      "Only the fortnight before a filing deadline, when a handover competes with the filing itself. Otherwise any point in the year works. Clearance, records, the last filed return and the HMRC authorisation all move across without waiting for a year end, and nothing about changing firm triggers a penalty or restarts anything with HMRC.",
  },
  {
    question: "Do you act for letting agents and managing agents?",
    answer:
      "Yes. Agency work is a different job from landlord work: client money handling and the reconciliations your accounts rules require, commission recognised in the right period, VAT on fees, and the deductions and reporting the non-resident landlord scheme puts on you as the agent. We also cover the agency's own accounts, payroll and corporation tax.",
  },
  {
    question: "What paperwork do I need to hand over?",
    answer:
      "Rental statements or your agent's year end summary, mortgage interest certificates, invoices for repairs and improvements kept separately, purchase and sale completion statements, and any correspondence from HMRC. If you are heading into quarterly reporting, digital records with bank feeds save a great deal of time later.",
  },
  {
    question: "Do you advise on inheritance tax for a portfolio?",
    answer:
      "Yes. A straightforward let portfolio is usually an investment rather than a trading business, so business property relief generally does not apply to it. With the nil rate bands frozen to 5 April 2031 and property values where they are, planning tends to focus on ownership structure, lifetime transfers and how any relief that does apply interacts with the combined £2.5m allowance for the reliefs that survive.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Landlord accountant",
    serviceType: "Accountancy and tax services for landlords",
    description:
      "Accountancy and tax services for UK landlords: rental accounts, Self Assessment, Section 24 planning, Making Tax Digital quarterly filing, property company accounts, and support for property investors, letting agents and managing agents.",
    url: PAGE_URL,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "GB" },
    audience: { "@type": "Audience", audienceType: "UK landlords and property investors" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function LandlordAccountantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential rental property"
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
                { label: "Landlord accountant" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Landlord accountant for UK rental income
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Accountants for landlords, buy to let owners, portfolio investors and letting agents. Rental accounts,
              Section 24, quarterly reporting and the structure decisions that actually change what you pay.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`${btnPrimary} bg-emerald-600 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Book a consultation
              </Link>
              <Link
                href="#faqs"
                className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}
              >
                Read the FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What a landlord accountant covers
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Rental income is taxed under rules that have moved almost every year since 2015, and most of the money is
              won or lost before the return is filed. The mortgage interest you pay is no longer a deduction, the
              refurbishment you treated as a repair may not be one, and the quarterly filing regime lands on a gross
              income threshold rather than profit. Every item below is part of the standard service, not an extra.
            </p>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {included.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              For the mechanics behind the finance cost restriction, see our guide to{" "}
              <Link
                href="/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide"
                className="text-emerald-700 font-semibold underline"
              >
                Section 24 and finance costs
              </Link>
              , and the{" "}
              <Link href="/calculators/section-24-calculator" className="text-emerald-700 font-semibold underline">
                Section 24 calculator
              </Link>{" "}
              if you want a figure before you speak to anyone. Broader reading sits on our{" "}
              <Link href="/landlord-tax" className="text-emerald-700 font-semibold underline">
                landlord tax
              </Link>{" "}
              guide.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Buy to let landlords
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              A geared buy to let is where the finance cost restriction bites hardest. Your taxable profit is calculated
              before mortgage interest, then a basic rate credit is given back. At 20% now, and 22% from April 2027 when
              property income itself is taxed at 22%, 42% and 47%, the gap between the interest you pay and the relief
              you receive is real cash, and it can drag total
              income across a threshold you were nowhere near on a cash basis.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              A buy to let accountant should be doing three things beyond the return. Checking whether your income is
              being taxed at a rate you could legitimately avoid by changing how the property is held. Making sure the
              ownership split between spouses reflects reality and is documented before the income arises rather than
              after. And keeping repairs and improvements apart, because the two are relieved at different times and
              the wrong call either loses you a deduction now or inflates a gain later.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Where a limited company looks attractive, the arithmetic has to include the exit as well as the entry.
              Transferring existing property is a disposal at market value for capital gains tax and a purchase for
              stamp duty on the same day. Our{" "}
              <Link
                href="/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk"
                className="text-emerald-700 font-semibold underline"
              >
                buy to let limited company guide
              </Link>{" "}
              covers the structure, and the{" "}
              <Link href="/incorporation" className="text-emerald-700 font-semibold underline">
                incorporation analysis
              </Link>{" "}
              puts numbers against your own portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Rental portfolios and multiple properties
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Once you hold more than a handful of properties, the accounting problem stops being the tax return and
              starts being the record. UK residential lets are pooled into a single property business, so profits and
              losses across those properties are netted before tax, but you still need property level figures to know
              which ones are earning and which are quietly funded by the others. Furnished holiday lets no longer sit in
              their own regime, and overseas property is a separate business from UK property, which matters for losses
              and for quarterly reporting.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              As a rental property accountant we produce property by property profit and loss alongside the tax figures,
              track refinancing and the interest that follows the money rather than the security, and flag the year a
              disposal should happen rather than the year it happened to. Portfolio reporting is also what makes
              quarterly filing survivable: four submissions a year against a shoebox of receipts is a different
              experience from four submissions against a live ledger.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Useful background:{" "}
              <Link
                href="/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk"
                className="text-emerald-700 font-semibold underline"
              >
                capital versus revenue expenditure
              </Link>
              ,{" "}
              <Link href="/blog/landlord-tax-essentials/jointly-owned-property" className="text-emerald-700 font-semibold underline">
                jointly owned property
              </Link>{" "}
              and{" "}
              <Link
                href="/blog/property-finance/portfolio-landlord-mortgages-guide"
                className="text-emerald-700 font-semibold underline"
              >
                portfolio landlord mortgages
              </Link>
              . The{" "}
              <Link
                href="/calculators/portfolio-profitability-calculator"
                className="text-emerald-700 font-semibold underline"
              >
                portfolio profitability calculator
              </Link>{" "}
              gives you a per property view in a few minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Property investors
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Investing is a different job from letting. If you are buying to add value and sell, refurbishing and
              refinancing, or mixing residential with commercial, the first question is whether HMRC would treat your
              activity as trading rather than investment. That single distinction changes the rate, the reliefs and
              whether the property is stock or a capital asset. Buying with the intention to sell at a profit looks like
              a trade regardless of what you call it.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              As an accountant for property investors, the work covers structure across multiple vehicles, joint
              ventures and profit shares, group companies where separate projects need to be ring fenced, capital
              allowances on commercial holdings where the writing down allowance is 14% and the 40% first year allowance
              may apply, and stamp duty analysis on acquisition including mixed use and multiple dwellings positions.
              Disposals are planned with the annual exempt amount, timing across tax years and the 60 day residential
              reporting deadline in view, not discovered afterwards.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              See our walkthrough on{" "}
              <Link
                href="/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step"
                className="text-emerald-700 font-semibold underline"
              >
                calculating capital gains tax on a sale
              </Link>{" "}
              and, for anything strategic, our{" "}
              <Link href="/services/property-tax-advice" className="text-emerald-700 font-semibold underline">
                property tax advice
              </Link>{" "}
              service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Letting agents and managing agents
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              An agency has two sets of books: its own, and other people&apos;s money. Client money handling carries
              reconciliation and reporting obligations that do not apply to an ordinary trading company, and getting the
              client account reconciliations wrong is a regulatory problem before it is a tax one.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Accounting for property management covers the client account alongside the agency accounts, commission and
              management fees recognised in the period they are earned rather than when the rent clears, VAT on fees
              including where a fee is disbursed on behalf of a landlord, payroll for negotiators and property managers
              including commission and the employer National Insurance position at 15% above the £5,000 secondary
              threshold, and the non-resident landlord scheme where you hold the obligation to deduct and report on
              overseas landlords you act for.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Quarterly reporting also raises a question agents get asked constantly, which is who files what when a
              portfolio is managed. Our guide on{" "}
              <Link
                href="/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly"
                className="text-emerald-700 font-semibold underline"
              >
                agent managed portfolios and quarterly filing
              </Link>{" "}
              sets out the split of responsibility, and{" "}
              <Link
                href="/blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide"
                className="text-emerald-700 font-semibold underline"
              >
                registering for MTD
              </Link>{" "}
              covers the sign up itself. The{" "}
              <Link href="/calculators/mtd-checker" className="text-emerald-700 font-semibold underline">
                MTD checker
              </Link>{" "}
              tells a landlord which year catches them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Who we work with</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {scenarios.map((item) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700">
              If undeclared income is the issue, read how{" "}
              <Link
                href="/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026"
                className="text-emerald-700 font-semibold underline"
              >
                a Let Property Campaign disclosure works
              </Link>{" "}
              before you contact HMRC directly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Why a landlord tax accountant rather than a general practice
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Most high street firms are perfectly competent and see rental income a few times a year. The problem is
              volume of change. Since 2015 the sector has absorbed the finance cost restriction phasing in and now
              increasing, the 3% and subsequent surcharges on additional dwellings, the replacement of domestic items
              relief, the 60 day capital gains reporting window, the end of the furnished holiday lettings regime, and
              quarterly reporting arriving in two waves. Each one has a trap in it, and the exposure sits with you
              rather than with whoever filed the return.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              The practical difference shows up in three places. Advice arrives before a transaction rather than after
              completion, when the structure can still be changed. Expenditure is classified when the invoice comes in
              rather than reconstructed years later from a bank statement. And the conversation about a limited company
              is a model with your own figures in it, not a rule of thumb about higher rate taxpayers.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              We act for landlords only. That is the entire practice, which means the questions you would have to
              explain elsewhere are the ones we answer daily. If you are weighing up a move, our note on{" "}
              <Link
                href="/blog/property-accountant-services/change-landlord-accountants"
                className="text-emerald-700 font-semibold underline"
              >
                changing landlord accountants
              </Link>{" "}
              covers the process, and{" "}
              <Link
                href="/blog/property-accountant-services/buy-to-let-accountants-near-me-guide"
                className="text-emerald-700 font-semibold underline"
              >
                choosing a buy to let accountant
              </Link>{" "}
              covers what to ask before you sign anything.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">
              From first call to first filing
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {processSteps.map((step) => (
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
              Looking for a landlord accountant near you
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Property tax is national. The rules that decide your bill are the same in Manchester as in London, and
              nothing about a rental return needs a meeting in a room. Searching locally usually surfaces whoever is
              closest rather than whoever knows the sector, which is a poor trade when the specialism is what saves the
              money. Scotland and Wales differ on the transaction tax on purchase, and we handle those where they apply.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              We act for landlords throughout the UK, and for landlords living abroad who let property here. Records
              come in electronically, questions get answered on a call booked when it suits you, and you deal with
              people who have seen your situation before.
            </p>
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Landlord accountant questions
            </h2>
            <div className="mt-8 sm:mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group bg-white border-l-4 border-emerald-600 p-6 sm:p-8">
                  <summary className="cursor-pointer list-none text-lg sm:text-xl font-bold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Speak to an accountant who only works with landlords"
        description="Book a free consultation. We will look at what you own, how it is held and what it is costing you, then quote a fixed fee in writing."
        primaryLabel="Book free consultation"
        secondaryHref="/services"
        secondaryLabel="All services"
      />
    </>
  );
}
