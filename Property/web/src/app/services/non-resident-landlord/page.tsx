import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/services/non-resident-landlord`;

export const metadata: Metadata = {
  title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
  description:
    "Specialist UK tax service for non-resident landlords: NRL scheme registration, receiving rent gross, Self Assessment from abroad, treaties and 60-day CGT reporting.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
    description:
      "NRL scheme registration, gross payment approval, Self Assessment from abroad, double tax treaties and non-resident CGT, handled by UK property tax specialists.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Non-Resident Landlord Accountant | UK Tax for Overseas Landlords",
    description:
      "NRL scheme registration, gross payment approval, Self Assessment from abroad, treaties and non-resident CGT for overseas landlords.",
  },
};

const included = [
  {
    title: "NRL scheme registration and gross payment approval",
    body: "We prepare and submit your application to receive rent without the 20% deduction: NRL1 if you own personally, NRL2 for a non-resident company, NRL3 for trustees. We deal with HMRC on the queries that follow, and we make sure your agent is told once approval lands so the deductions actually stop.",
  },
  {
    title: "UK Self Assessment while you live abroad",
    body: "Your UK rental profit stays within UK tax whatever your residence status. We prepare the return, claim the tax already deducted at source, handle the residence pages, and check whether the disregarded income rules or your personal allowance entitlement leave you better off. Filing deadline is 31 January after the tax year ends, with payments on account by 31 January and 31 July where the previous year's liability was over £1,000.",
  },
  {
    title: "Recovering over-deducted tax",
    body: "Agents deduct 20% from rent after allowable expenses they know about, which usually ignores mortgage interest, insurance, letting fees you paid directly and repairs. Most non-resident landlords with a mortgage are owed money back. We reconcile the NRL6 certificates against the real accounts and reclaim the difference.",
  },
  {
    title: "Double tax treaty positions",
    body: "The UK taxes UK rental profit first because the property sits here. Your country of residence usually taxes the same income again and gives credit for the UK tax. We work out the credit position, the timing mismatch between tax years, and whether a treaty article changes anything on interest, dividends or gains flowing between the two countries.",
  },
  {
    title: "Capital gains and 60-day reporting",
    body: "Non-residents pay UK CGT on disposals of UK land, and on indirect disposals of shares in property-rich entities. A return is due within 60 days of completion on every disposal, including no-gain and loss disposals, and the payment is due on the same date. We handle the rebasing choice, the computation and the filing.",
  },
  {
    title: "Company and structure questions",
    body: "Non-UK-resident companies holding UK property have paid corporation tax rather than income tax on their rental profit since April 2020, which brings the loan relationship and corporate interest restriction rules with it. If you hold through an offshore company, we cover the filings and tell you plainly whether the structure still earns its cost.",
  },
];

const scenarios = [
  {
    title: "You have just moved abroad and kept the flat",
    body: "The most common trigger. Your usual place of abode moves outside the UK, your letting agent starts withholding 20%, and nobody tells you that gross approval exists. We register you, reset the agent, and pick up the Self Assessment.",
  },
  {
    title: "You live overseas and let directly to tenants",
    body: "With no UK letting agent, a tenant paying you more than £100 a week has the deduction obligation themselves. Most tenants have no idea. Gross approval removes the problem for both of you.",
  },
  {
    title: "You are a returning expat with years of unfiled returns",
    body: "Rental income received abroad and never declared is still UK taxable. We quantify the exposure, use the right disclosure route, and negotiate the penalty position rather than letting HMRC open it first.",
  },
  {
    title: "You are selling a UK property from overseas",
    body: "The 60-day clock starts at completion, not when your solicitor gets round to it, and the penalty for missing it applies even when no tax is due. We work the computation alongside the conveyance so the return goes in on time.",
  },
  {
    title: "You are planning the move and still own the portfolio",
    body: "The year you leave is the year most of the planning value sits. Split-year treatment, the timing of a disposal, mortgage restructuring and the agent arrangements all read differently before departure than after.",
  },
  {
    title: "You are a non-resident with a UK company or trust holding property",
    body: "Corporate and trustee landlords have their own forms, their own filing regime and, for higher-value residential holdings, an annual ATED return. We handle the full stack rather than the rental accounts alone.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Position review",
    body: "A short call covering where you live, what you own, who collects the rent, what has been filed and what has not. You leave that call knowing whether you are non-resident for these purposes and what is actually outstanding.",
  },
  {
    n: "02",
    title: "Registration and clean-up",
    body: "Gross payment application, Self Assessment registration, agent instructions, and any back years brought up to date. Where tax has been over-deducted, we reclaim it in the same pass.",
  },
  {
    n: "03",
    title: "Annual cycle",
    body: "Rental accounts, the return, the treaty credit position for your home country, quarterly updates once Making Tax Digital applies to you, and a reminder well before each deadline rather than the week of it.",
  },
  {
    n: "04",
    title: "Event work when it happens",
    body: "Selling, refinancing, moving country again, buying another property, or inheriting one. These are the moments where the decision is worth more than the compliance, and they are covered by the same relationship.",
  },
];

const faqs = [
  {
    question: "What is the non-resident landlord scheme?",
    answer:
      "It is HMRC's system for collecting tax at source on rent from UK property paid to a landlord whose usual place of abode is outside the UK. Your UK letting agent, or the tenant where there is no agent, deducts basic rate tax at 20% from the rent after certain expenses and pays it to HMRC each quarter. It is not a separate tax. The 20% is credited against the tax you actually owe when your Self Assessment return is worked out, so it can leave you overpaid.",
  },
  {
    question: "Am I a non-resident landlord if I am only abroad for a year?",
    answer:
      "Possibly. The scheme uses a usual place of abode test, not the statutory residence test, and HMRC treats an absence of six months or more as putting your usual place of abode outside the UK. That means you can be UK resident for income tax and still fall inside the scheme. If you are going abroad for a defined posting, tell your agent and get the position confirmed before the deductions start.",
  },
  {
    question: "How do I stop the 20% being deducted from my rent?",
    answer:
      "Apply to HMRC for approval to receive rent gross. Individuals use form NRL1, non-resident companies use NRL2, and trustees use NRL3. Approval is given where your UK tax affairs are up to date, or where you have never had a UK tax obligation, and it takes effect from the start of the quarter in which HMRC accepts it. Approval changes the timing of the tax, not the amount: you still report the income and pay through Self Assessment.",
  },
  {
    question: "Do I still have to file a UK tax return if my agent deducts the tax?",
    answer:
      "In almost all cases yes. The deduction is a payment on account, not a settlement. Because agents deduct before mortgage interest and most direct costs, landlords with borrowing are frequently owed a refund that only comes back through the return. Even where the numbers happen to net out, HMRC can still require the return, and the failure-to-notify position is worse than filing.",
  },
  {
    question: "Do non-resident landlords get the UK personal allowance?",
    answer:
      "Some do. UK and Irish nationals, nationals of EEA states, and residents of countries whose double tax treaty with the UK grants it are generally entitled. Others are not, and for them the whole rental profit is taxed from the first pound. This single point often decides whether it is worth claiming the allowance or relying on the disregarded income rules instead, and the answer depends on the mix of your UK income.",
  },
  {
    question: "Will I be taxed twice on my UK rental income?",
    answer:
      "Usually not, but you will often be reported twice. The UK taxes rent from UK property as the source country. Your country of residence typically taxes your worldwide income and gives credit for the UK tax paid. The problems are practical rather than legal: mismatched tax years, differing rules on what counts as a deductible expense, and credit that is capped at the local tax on the same income. Get both filings prepared with each other in mind.",
  },
  {
    question: "What tax do I pay when I sell UK property as a non-resident?",
    answer:
      "Non-residents pay UK capital gains tax on disposals of UK residential and commercial land, and on indirect disposals of shares in entities that derive at least 75% of their value from UK land where you hold a 25% interest. Residential gains are charged at 18% and 24% depending on where the gain sits against the basic rate band, with the annual exempt amount at £3,000. There are rebasing options for property held before the regime applied to your type of disposal, and the choice between them can move the result materially.",
  },
  {
    question: "What is the 60-day rule for non-resident CGT?",
    answer:
      "You must file a UK property disposal return within 60 days of completion and pay the tax due by the same date. For non-residents the return is required on every disposal of UK land, including disposals at a loss and disposals covered by private residence relief, which is stricter than the rule for UK residents. Missing it triggers penalties even where the tax is nil.",
  },
  {
    question: "Does Making Tax Digital apply to landlords living abroad?",
    answer:
      "Yes, on the same thresholds. Landlords with qualifying income over £50,000 come in from April 2026 and over £30,000 from April 2027, with quarterly updates through compatible software as well as the year-end return. Being overseas does not exempt you, and using a letting agent does not shift the obligation onto them. Our MTD checker gives you the date that applies to you.",
  },
  {
    question: "I have not declared UK rental income for several years. What now?",
    answer:
      "Come forward before HMRC does. It has automatic access to overseas account and residency information through international exchange agreements, and to Land Registry and letting agent data domestically, so undeclared rent surfaces eventually. Voluntary disclosure carries substantially lower penalties than a discovery assessment, and the number of years HMRC can go back depends on whether the failure is treated as careless or deliberate. We work out the exposure first, then choose the route.",
  },
  {
    question: "Should I hold UK property through an offshore company instead?",
    answer:
      "Rarely, on tax grounds alone, and less often than the marketing suggests. Non-resident companies pay corporation tax on UK rental profit, higher-value residential holdings face an annual ATED charge unless a relief applies, mortgage options narrow, and the UK inheritance tax exposure that companies were once used to avoid was closed for residential property. It can still be right where there are multiple owners or genuine commercial reasons. It should be a modelled decision, not a default.",
  },
  {
    question: "What does this cost?",
    answer:
      "It depends on how many properties you hold, how many back years need clearing, whether a company or trust is involved, and whether a disposal is in progress. We quote a fixed annual fee for the recurring work and a separate fixed fee for anything one-off, both agreed before we start. Book a consultation and you will get the number with the scope attached.",
  },
];

const whySpecialist = [
  "Most high street accountants see one or two non-resident landlords a year. The gross approval process, the NRL6 reconciliation and the disregarded income calculation are the parts they get wrong most often.",
  "The 60-day disposal return sits outside the normal Self Assessment cycle, which is why it is the single most missed deadline for overseas owners.",
  "Treaty credit only works if both filings are prepared with knowledge of the other. We work with your overseas adviser rather than around them.",
  "Section 24 still restricts mortgage interest relief to a basic rate reduction, currently 20% and rising to 22% from April 2027, when property income also moves to separate rates of 22%, 42% and 47%. Where the personal allowance is not available, the interaction pushes effective rates higher than most people expect.",
];

export default function NonResidentLandlordPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Non-resident landlord tax service",
      serviceType: "UK tax compliance and advice for non-resident and overseas landlords",
      description:
        "UK tax service for non-resident landlords: non-resident landlord scheme registration, approval to receive rent gross, Self Assessment from abroad, double tax treaty relief and non-resident capital gains tax reporting.",
      url: pageUrl,
      areaServed: { "@type": "Country", name: "GB" },
      audience: { "@type": "Audience", audienceType: "Non-resident and overseas landlords of UK property" },
      provider: {
        "@type": "Organization",
        name: "Property Tax Partners",
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property let by an overseas owner"
          fill
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
                { label: "Non-resident landlord" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Non-resident landlord accountant
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Live abroad and let UK property, and your agent has to deduct 20% from your rent until HMRC says
              otherwise. We get you paid gross, file the UK returns from wherever you are, and keep the 60-day
              disposal deadline off your back.
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
                Read the common questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How the non-resident landlord scheme catches you
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Moving abroad does not move your rental income out of UK tax. UK property income is taxed here whoever
                owns it and wherever they live. What changes when you leave is how the tax gets collected. Once your
                usual place of abode is outside the UK, the non-resident landlord scheme requires your UK letting agent
                to deduct basic rate tax at <strong>20%</strong> from your rent before paying you across, and to send
                that money to HMRC quarterly. Where there is no UK agent, the obligation lands on any tenant paying you
                more than <strong>£100 a week</strong>.
              </p>
              <p>
                The test is not the statutory residence test. It is a usual place of abode test, and HMRC treats an
                absence from the UK of six months or more as meeting it. You can be UK resident for income tax purposes
                and still be a non-resident landlord for this scheme, which is exactly the trap that catches people on
                fixed-term overseas postings.
              </p>
              <p>
                Deductions are not the end of it. The agent works out the 20% on rent less the expenses they happen to
                know about, which typically means their own fees and repairs they arranged. Mortgage interest,
                insurance, ground rent, accountancy and anything you paid directly do not feature. Landlords with
                borrowing therefore have far too much taken and only get it back through a UK return. For the mechanics
                of what the agent does and when, see our guides to{" "}
                <Link href="/blog/non-resident-landlord-tax/nrl-withholding-tax-20-percent-basic-rate-deduction" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  the 20% withholding calculation
                </Link>{" "}
                and{" "}
                <Link href="/blog/non-resident-landlord-tax/nrl-scheme-letting-agents-quarterly-returns-mechanics" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  the agent quarterly return cycle
                </Link>
                .
              </p>
              <p>
                The fix is approval to receive rent gross. It does not reduce the tax due. It stops the cash being taken
                a year early from a figure that was never right in the first place. Our{" "}
                <Link href="/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  full guide to the scheme
                </Link>{" "}
                sets out the statutory framework, and the{" "}
                <Link href="/blog/non-resident-landlord-tax/nrl-approval-receive-rent-gross-hmrc-guide" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  NRL1 application walkthrough
                </Link>{" "}
                covers the form itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What the service covers</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {included.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-slate-700">
              If you are UK resident and letting UK property, the standard{" "}
              <Link href="/services/landlord-accountant" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                landlord accounting service
              </Link>{" "}
              is the right starting point instead, and{" "}
              <Link href="/landlord-tax" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                our landlord tax overview
              </Link>{" "}
              explains the rules that apply to everyone regardless of where they live.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Who we work with</h2>
            <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2">
              {scenarios.map((item) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Self Assessment when you live overseas
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Your UK return still runs on UK dates. Online filing and payment are due by{" "}
                <strong>31 January</strong> following the end of the tax year, with payments on account on 31 January
                and 31 July where the previous year&apos;s liability was more than £1,000. Being nine time zones away
                does not extend anything, and HMRC will not accept a foreign filing season as a reasonable excuse.
              </p>
              <p>
                Two points decide most non-resident returns. The first is whether you get the UK personal allowance.
                UK and Irish nationals, nationals of EEA states and residents of certain treaty countries generally do.
                Everyone else is taxed from the first pound of profit. The second is the disregarded income election,
                which can let you exclude some UK investment income from the calculation at the cost of the allowance.
                Which is better depends on the mix of your UK income, and it is worth recomputing each year rather than
                assuming last year&apos;s answer holds. The{" "}
                <Link href="/blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  filing requirements guide
                </Link>{" "}
                works through both.
              </p>
              <p>
                Mortgage interest relief is the other item that bites. Since Section 24 finished phasing in, interest is
                not deductible from rental profit at all. It gives a basic rate tax reduction instead, currently{" "}
                <strong>20%</strong> and rising to <strong>22% from April 2027</strong>, when property income itself
                is taxed at <strong>22%, 42% and 47%</strong>. Where you have no personal
                allowance and a geared portfolio, the effective rate on your UK rent can be higher than a landlord at
                home would pay on the same property. Our{" "}
                <Link href="/calculators/section-24-calculator" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  Section 24 calculator
                </Link>{" "}
                shows the size of the effect on your figures.
              </p>
              <p>
                Making Tax Digital arrives on the same timetable for you as for everyone else: qualifying income over
                £50,000 from April 2026 and over £30,000 from April 2027, with quarterly updates in compatible software
                on top of the year-end return. Living abroad is not an exemption and neither is using an agent. Check
                your date with the{" "}
                <Link href="/calculators/mtd-checker" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  MTD checker
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Double tax treaties: what they do and what they do not
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Nearly every UK treaty gives the country where the land sits the first right to tax income from that
                land. So the UK taxes your rent, whatever the treaty says, and whatever your country of residence
                thinks. What the treaty does is oblige your country of residence to relieve the double charge, normally
                by crediting the UK tax against its own tax on the same income.
              </p>
              <p>
                That relief is capped at the local tax on that income. If your home country charges less than the UK,
                the credit is wasted and the UK rate is what you effectively pay. If it charges more, you top up
                locally. Timing is the other friction: the UK tax year ends on 5 April and almost nowhere else does, so
                the income and the credit can land in different local years and need reconciling by hand.
              </p>
              <p>
                Treaties also carry a residence tie-breaker for the years you are arguably resident in both countries,
                which is the usual battleground in the year you move. Our introduction to{" "}
                <Link href="/blog/non-resident-landlord-tax/dont-pay-twice-an-introduction-to-tax-treaties" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  how tax treaties work
                </Link>{" "}
                covers the structure, and the{" "}
                <Link href="/blog/non-resident-landlord-tax/dta-tie-breaker-test-dual-residence-property-owners" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  tie-breaker test guide
                </Link>{" "}
                deals with dual residence. If you are heading somewhere specific, the country pathways for{" "}
                <Link href="/blog/non-resident-landlord-tax/moving-to-dubai-uk-rental-property-tax-pathway" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  Dubai
                </Link>{" "}
                and{" "}
                <Link href="/blog/non-resident-landlord-tax/moving-to-australia-uk-rental-property-tax-pathway" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  Australia
                </Link>{" "}
                show how differently the same UK position plays out.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Selling from abroad: the 60-day rule
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Non-residents are within UK capital gains tax on disposals of UK residential and commercial land, and on
                indirect disposals of shares in entities deriving at least <strong>75%</strong> of their value from UK
                land where you hold at least a <strong>25%</strong> interest. Residential gains are charged at{" "}
                <strong>18%</strong> and <strong>24%</strong> depending on where the gain falls against the basic rate
                band, and the annual exempt amount is <strong>£3,000</strong>.
              </p>
              <p>
                The reporting rule is stricter for you than for a UK resident. A UK property disposal return is due
                within <strong>60 days of completion</strong> on every disposal of UK land, including ones producing a
                loss and ones fully covered by private residence relief, with the tax payable on the same date. Late
                filing penalties apply even where no tax is due, and conveyancers routinely fail to mention it.
              </p>
              <p>
                The computation itself usually turns on rebasing. Depending on the type of property and when the regime
                started applying to it, you may be able to use the market value at April 2015 or April 2019 instead of
                original cost, or elect for straight-line time apportionment, and the difference between the options can
                be large. See our guides to{" "}
                <Link href="/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  non-resident CGT rates and reporting
                </Link>{" "}
                and{" "}
                <Link href="/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  selling UK property from overseas
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Moving abroad with a UK portfolio
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The twelve months either side of departure carry most of the planning value, and almost all of it
                expires once you have gone. Split-year treatment determines which side of the line your income and
                gains fall. The date you exchange on a sale can decide whether a disposal is taxed as a resident or a
                non-resident. Mortgage lenders treat expat borrowers differently, so refinancing before you go is often
                cheaper than refinancing after.
              </p>
              <p>
                Register for the scheme before the first rent payment goes through rather than after, notify HMRC that
                you are leaving, and get the agent instructions in writing. Our{" "}
                <Link href="/blog/non-resident-landlord-tax/leaving-uk-landlord-12-month-pre-departure-checklist" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  pre-departure checklist
                </Link>{" "}
                sequences the whole thing, and{" "}
                <Link href="/blog/property-finance/expat-non-resident-landlord-mortgages" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  expat landlord mortgages
                </Link>{" "}
                covers the finance side.
              </p>
              <p>
                Inheritance tax deserves a look while you are at it. UK land is within the charge whoever owns it and
                wherever they live, and holding it through an offshore company no longer avoids that for residential
                property. Thresholds are frozen to 5 April 2031, so a portfolio that grows in value grows its exposure.
                Our note on{" "}
                <Link href="/blog/non-resident-landlord-tax/non-resident-landlords-uk-inheritance-tax-exposure" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  non-resident inheritance tax exposure
                </Link>{" "}
                sets out the position, and if you own through a company,{" "}
                <Link href="/blog/non-resident-landlord-tax/changes-nrl-companies" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  the corporation tax changes for non-resident companies
                </Link>{" "}
                explain what changed in April 2020.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">
              How working with us runs
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
            <p className="mt-8 text-base leading-relaxed text-slate-700">
              Everything runs remotely. Documents go through a secure portal, calls happen at a time that works in your
              zone, and you never need to be in the UK for any of it. Fees depend on the number of properties, the
              number of back years and whether a company, trust or disposal is involved, so we quote once we have seen
              the position, and the figure is fixed before any work starts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Where non-resident cases go wrong in general practice
              </h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                {whySpecialist.map((item) => (
                  <li key={item} className="flex items-start gap-3 sm:gap-4">
                    <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Non-resident landlord questions we get asked
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group bg-white border-l-4 border-emerald-600 p-6">
                  <summary className="cursor-pointer text-base sm:text-lg font-bold text-slate-900 marker:text-emerald-600">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-slate-700">
              More detail on every one of these sits in our{" "}
              <Link href="/blog/non-resident-landlord-tax" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                non-resident landlord tax guides
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your non-resident landlord position sorted"
        description="Book a consultation. We will tell you whether you can be paid gross, what is outstanding, and what it will cost to put right."
        primaryLabel="Book a consultation"
      />
    </>
  );
}
