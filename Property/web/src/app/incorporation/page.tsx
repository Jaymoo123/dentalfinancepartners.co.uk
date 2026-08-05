import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IncorporationCostCalculator } from "@/components/calculators/IncorporationCostCalculator";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Should I Incorporate My Buy-to-Let? | CGT & SDLT Cost Analysis",
  description:
    "Incorporation feasibility for UK landlords: CGT + SDLT upfront costs vs annual tax savings. When it makes sense, when it does not.",
  alternates: { canonical: `${siteConfig.url}/incorporation` },
  openGraph: {
    title: "Buy-to-Let Incorporation Planning | Cost vs. Savings Analysis",
    description: "Full feasibility modelling: CGT, SDLT costs vs. long-term tax savings. For UK landlords only.",
    url: `${siteConfig.url}/incorporation`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy-to-Let Incorporation Planning | Cost vs. Savings Analysis",
    description: "Full feasibility modelling: CGT, SDLT costs vs. long-term tax savings. For UK landlords only.",
  },
};

const whenItMakesSense = [
  {
    title: "You're a higher-rate taxpayer",
    body: "Section 24 hits hardest at 40% and 45%. If your rental profit (after expenses but before mortgage interest) pushes you into higher-rate territory, incorporation can reduce your effective tax rate significantly.",
  },
  {
    title: "You have significant mortgage interest",
    body: "The more mortgage interest you pay, the bigger the Section 24 impact. If mortgage interest represents 40%+ of your rental income, incorporation may be worth the upfront cost.",
  },
  {
    title: "You're holding long-term",
    body: "Incorporation has high upfront costs (CGT + SDLT). If you plan to hold the properties for 10+ years, you have time to recover those costs through annual tax savings. Short-term holds rarely justify incorporation.",
  },
  {
    title: "You're building a portfolio",
    body: "If you're acquiring new properties, buying them in a limited company from the start avoids the CGT/SDLT hit on transfer. Existing properties can stay personal, new ones go into the company.",
  },
];

const whenItDoesNot = [
  {
    title: "Low mortgage levels",
    body: "If you own properties outright or have small mortgages, Section 24 doesn't hurt much. The upfront cost of incorporation (CGT + SDLT) may never be recovered.",
  },
  {
    title: "Planning to sell soon",
    body: "If you're selling within 5 years, the upfront incorporation costs likely exceed any tax savings. Better to stay personal and pay the Section 24 tax.",
  },
  {
    title: "You're a basic-rate taxpayer",
    body: "Section 24 has minimal impact at 20%. Corporation tax (19%) + dividend tax may not save you much, and the upfront costs are the same regardless of tax bracket.",
  },
  {
    title: "You need to extract all profit",
    body: "If you rely on rental income to live, extracting profit as dividends triggers personal tax. The company structure only saves tax if you can leave profit in the company.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Initial feasibility call",
    body: "We discuss your portfolio, income, tax position, and plans. This is a short conversation to understand whether incorporation is even worth modelling.",
  },
  {
    n: "02",
    title: "Full financial modelling",
    body: "We calculate upfront costs (CGT + SDLT), annual tax savings, break-even timeline, and cash flow impact. You get a written report with clear recommendations.",
  },
  {
    n: "03",
    title: "Decision and implementation",
    body: "If you decide to proceed, we coordinate with your solicitor, set up the company, handle the property transfer, and ensure all filings are correct. If you decide not to proceed, that's fine, you have the analysis for future reference.",
  },
];

const incorporationFaqs = [
  {
    question: "Do you pay stamp duty when transferring property to your own limited company?",
    answer:
      "Yes, in almost every case. The transfer is treated as taking place at market value even if no money changes hands, because you and the company are connected. SDLT is charged on that market value, and because a company is buying a residential dwelling the 5% additional-dwelling surcharge applies from the first pound. The only common escape is partnership relief, which requires a genuine partnership rather than a jointly owned portfolio.",
  },
  {
    question: "What is Section 162 incorporation relief and do I qualify?",
    answer:
      "Section 162 TCGA 1992 rolls your Capital Gains Tax charge into the base cost of the shares you receive, so no CGT is payable on the transfer itself. It applies automatically where you transfer a business as a going concern, with all of its assets other than cash, wholly or partly in exchange for shares. The difficulty for landlords is the word business. Simply owning let property is an investment, not a business, unless the activity is substantial enough to count.",
  },
  {
    question: "How many hours a week do I need to spend for my portfolio to count as a business?",
    answer:
      "There is no statutory hours test. The benchmark most advisers work to comes from Ramsay v HMRC, where around 20 hours a week of genuine active management across a 10-flat property was enough to make it a business. Fewer hours, or a portfolio run entirely by a letting agent, makes the case much weaker. What matters is the degree and quality of the activity, evidenced contemporaneously, not a number on its own.",
  },
  {
    question: "Can I get advance clearance from HMRC that Section 162 applies?",
    answer:
      "No. There is no statutory clearance procedure for Section 162 incorporation relief. You can apply for a non-statutory clearance setting out the facts and asking HMRC for its view, but that is not binding in the way a statutory clearance would be, and HMRC often declines to comment on whether an activity amounts to a business. In practice you rely on a documented analysis of your own facts, which is why the evidence you keep before the transfer matters.",
  },
  {
    question: "Does incorporation stamp duty work differently in Scotland and Wales?",
    answer:
      "Yes. Scotland charges LBTT plus the 8% Additional Dwelling Supplement, which applies to the whole price rather than a slice, so the cost of transferring a Scottish portfolio into a company is usually higher than the English equivalent. Wales charges Land Transaction Tax under a separate higher-rates table for additional properties, running from 5% up to 17%, rather than main rates plus a surcharge. The market-value and connected-party rules apply in all three regimes.",
  },
];

export default function IncorporationPage() {
  return (
    <>
      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Incorporation" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Should you incorporate your buy-to-let portfolio?
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Transferring rental property into a limited company can save significant tax, but it triggers Capital
              Gains Tax and Stamp Duty on the same day.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Book incorporation analysis
              </Link>
              <Link href="#calculator" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Try calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When incorporation makes sense</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenItMakesSense.map((item) => (
                <div key={item.title} className="border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When it doesn&apos;t make sense</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenItDoesNot.map((item) => (
                <div key={item.title} className="border-l-4 border-slate-300 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Free tool
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Calculate your incorporation costs
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Get a quick estimate of upfront costs (CGT + SDLT) and break-even timeline.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <IncorporationCostCalculator />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Stamp duty when you incorporate</h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                Stamp duty is the cost landlords underestimate most. When you move a property from your own name into
                your limited company, no money needs to change hands for SDLT to be due. You and the company are
                connected persons, so the transfer is deemed to take place at market value and SDLT is charged on that
                figure. A property you bought for £180,000 and now worth £310,000 is taxed on £310,000, whatever the
                paperwork says the consideration was.
              </p>
              <p>
                On top of that, a company buying a residential dwelling pays the 5% additional-dwelling surcharge, and
                for a company there is no first-property exemption from it. The surcharge rose from 3% to 5% on 31
                October 2024 and the residential nil-rate band returned to £125,000 on 1 April 2025, so the effective
                rate on a mid-sized portfolio transfer is a good deal higher than most landlords remember. Run the
                numbers on the{" "}
                <Link href="/calculators/stamp-duty-calculator" className="text-emerald-700 font-semibold underline">
                  stamp duty calculator
                </Link>{" "}
                property by property, then use the{" "}
                <Link href="/calculators/incorporation-cost-calculator" className="text-emerald-700 font-semibold underline">
                  incorporation cost calculator
                </Link>{" "}
                to set the total against the annual saving.
              </p>
              <p>
                Multiple Dwellings Relief used to soften portfolio transfers, but it was abolished for transactions
                completing on or after 1 June 2024, so it is no longer available to plan around. What survives is the
                six-dwellings rule: where six or more separate dwellings are acquired in a single transaction, or in
                linked transactions, the purchase can be treated as non-residential for SDLT, which brings in the
                non-residential rates and removes the surcharge. That is genuinely useful for a landlord moving a large
                portfolio in one go, and irrelevant to anyone transferring two or three properties.
              </p>
              <p>
                The other route out is partnership relief under Schedule 15 FA 2003, which can reduce the SDLT charge to
                nil where a genuine partnership incorporates. The relief depends on the partners in the old partnership
                and the shareholders in the new company being effectively the same people in the same proportions, and
                on there being a real partnership in the first place: a partnership agreement, a partnership tax return,
                joint working and shared control of the business, not simply a property held in joint names. HMRC looks
                closely at partnerships formed shortly before an incorporation, and anti-avoidance rules can claw the
                relief back if shares are shuffled afterwards.
              </p>
              <p>
                Scotland and Wales have their own regimes and their own arithmetic. Scotland charges LBTT plus the 8%
                Additional Dwelling Supplement, which is levied on the entire purchase price rather than a slice, so
                incorporating a Scottish portfolio is usually the most expensive version of this exercise. Wales charges
                Land Transaction Tax, and additional properties there sit on a separate higher-rates table running from
                5% up to 17% rather than main rates with a surcharge bolted on. The connected-party market-value rule
                applies across all three, so the transfer is valued the same way wherever the property sits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Connected-party and clearance points</h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed text-slate-700">
              <p>
                The Capital Gains Tax side turns on Section 162 TCGA 1992, incorporation relief. Where it applies, the
                gain on the properties is not taxed on transfer. Instead it is rolled into the base cost of the shares
                you receive, so the tax is deferred until you dispose of those shares. The relief is automatic, which
                means you do not claim it, but it also means you cannot rely on HMRC agreeing in advance that the
                conditions were met.
              </p>
              <p>
                Three conditions have to hold. You must transfer a business as a going concern. You must transfer all of
                the assets of that business other than cash. And the transfer must be wholly or partly in exchange for
                shares issued by the company, with only the share element qualifying for relief, so taking a director
                loan account out of the transfer reduces the relief proportionately.
              </p>
              <p>
                The first condition is where most landlord claims fail. Holding property and collecting rent is an
                investment activity, not a business, unless the scale and nature of what you do takes it further. The
                case advisers work from is Ramsay v HMRC, where roughly 20 hours a week of hands-on management across a
                property of 10 flats was accepted as a business. Repairs organised personally, tenant management,
                viewings, maintenance, accounts and dealing with the building day to day all counted. A portfolio run
                entirely through a letting agent, with a few hours a month of oversight, generally does not, however
                large it is. The evidence needs to exist before the transfer, not be reconstructed afterwards.
              </p>
              <p>
                Connected-party rules run alongside all of this. Because you control the company, market value is
                substituted for whatever price you set, for CGT as well as SDLT, so undervaluing the transfer achieves
                nothing except a valuation argument later. Get a defensible valuation at the point of transfer and keep
                it. The same connection is why the mortgage position matters: lenders will normally require the personal
                borrowing to be redeemed and replaced with company buy-to-let lending, which carries its own arrangement
                fees and early repayment charges.
              </p>
              <p>
                There is no statutory clearance for Section 162. You can ask HMRC for a non-statutory clearance on the
                facts, but it is not binding in the way a statutory clearance is, and HMRC will often decline to give a
                view on whether an activity amounts to a business. The practical answer is a documented analysis of your
                own facts prepared before you transfer anything. Where the CGT and SDLT at stake run into five or six
                figures, that analysis is worth paying for: our{" "}
                <Link href="/services/property-tax-advice" className="text-emerald-700 font-semibold underline">
                  property tax advice
                </Link>{" "}
                work covers exactly this ground, and our{" "}
                <Link href="/services/property-accountant" className="text-emerald-700 font-semibold underline">
                  property accountant
                </Link>{" "}
                service picks up the company filings afterwards. If you are still weighing whether the structure is
                right at all, the{" "}
                <Link href="/landlord-tax" className="text-emerald-700 font-semibold underline">
                  landlord tax
                </Link>{" "}
                position in your own name is the right place to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">Our incorporation process</h2>
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
            <div className="bg-slate-900 p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What you get</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Full CGT and SDLT cost calculation based on your actual property values and purchase prices</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Annual tax saving comparison: personal vs. company structure</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Break-even timeline showing when you recover the upfront costs</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Clear recommendation: incorporate now, wait, or don&apos;t incorporate at all</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-emerald-400 font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                  <span>Written report you can share with your solicitor or mortgage broker</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Incorporation questions landlords ask</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {incorporationFaqs.map((faq) => (
                <div key={faq.question} className="border-l-4 border-emerald-600 bg-white p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: incorporationFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <CTASection
        title="Get your incorporation feasibility analysis"
        description="Book a free consultation. We'll discuss your portfolio and give you a clear recommendation."
        primaryLabel="Book free consultation"
      />
    </>
  );
}
