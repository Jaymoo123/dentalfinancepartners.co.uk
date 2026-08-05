import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

export const metadata: Metadata = {
  title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27 | Property Tax Partners",
  description:
    "What tax you pay as a UK landlord in 2026/27: income tax on rental profit, the Section 24 restriction, allowable expenses, CGT, the SDLT surcharge and IHT, with worked examples.",
  alternates: { canonical: `${siteConfig.url}/landlord-tax` },
  openGraph: {
    title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27",
    description:
      "Income tax on rental profit, Section 24, allowable expenses, CGT, stamp duty and inheritance tax, explained with 2026/27 figures and worked examples.",
    url: `${siteConfig.url}/landlord-tax`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landlord Tax Explained: What UK Landlords Pay in 2026/27",
    description:
      "Income tax on rental profit, Section 24, allowable expenses, CGT, stamp duty and inheritance tax, explained with 2026/27 figures.",
  },
};

const faqs = [
  {
    question: "How much tax do I pay on rental income?",
    answer:
      "You pay income tax at your normal rate on your rental profit, which is rent received less allowable expenses. There is no separate landlord tax rate. For 2026/27 that means 20% within the basic-rate band, 40% between £50,270 and £125,140, and 45% above that, after your £12,570 personal allowance. Mortgage interest is not an expense: it is relieved separately as a 20% tax credit, rising to 22% from April 2027, so your effective rate on cash profit can be far higher than your headline band.",
  },
  {
    question: "Do I have to declare rental income under £1,000?",
    answer:
      "No. The £1,000 property allowance covers gross rental income up to that amount, and if that is your only property income you do not need to report it. Above £1,000 you either deduct the allowance instead of your actual expenses or claim actual expenses, whichever gives the lower profit. You cannot do both.",
  },
  {
    question: "Is mortgage interest tax deductible for landlords?",
    answer:
      "Not as a deduction. Individual landlords cannot deduct mortgage interest from rental income. Instead you get a basic-rate tax reducer worth 20% of the finance costs for 2026/27, rising to 22% from 6 April 2027. The restriction, known as Section 24, applies to interest, arrangement fees and the interest element of most finance. Limited companies are outside it and deduct finance costs in full.",
  },
  {
    question: "How much landlord tax do I pay if I am a higher-rate taxpayer?",
    answer:
      "Your rental profit is taxed at 40%, and because mortgage interest only attracts a 20% credit for 2026/27 you effectively pay tax on income you never keep. A higher-rate landlord with £20,000 of profit before finance costs and £9,000 of mortgage interest keeps £11,000 in cash and pays about £5,146 in tax on it, an effective rate near 47%. The gap narrows slightly when the reducer rises to 22% in April 2027.",
  },
  {
    question: "What expenses can landlords claim?",
    answer:
      "Costs incurred wholly and exclusively for the letting: letting agent and management fees, landlord insurance, ground rent and service charges, repairs and maintenance (not improvements), safety certificates, accountancy fees, advertising for tenants, council tax and utilities during void periods, and mileage at 55p per mile for the first 10,000 business miles from 6 April 2026. Replacement of domestic items relief covers like-for-like replacement of furniture and appliances in a let residential property.",
  },
  {
    question: "Do I pay capital gains tax when I sell a rental property?",
    answer:
      "Yes, on the gain rather than the sale price. For 2026/27 residential property gains are taxed at 18% within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount. You must report the disposal and pay the tax within 60 days of completion, separately from your tax return.",
  },
  {
    question: "How much stamp duty do landlords pay?",
    answer:
      "In England and Northern Ireland a buy-to-let or additional dwelling pays the standard SDLT bands plus a 5% surcharge on the whole purchase price. Scotland charges LBTT with an 8% Additional Dwelling Supplement, and Wales applies a separate higher-rates LTT table. Companies pay the surcharge too, and residential purchases over £500,000 by a company can fall into the 17% flat charge unless a relief such as property rental business relief applies.",
  },
  {
    question: "Should I own rental property personally or through a limited company?",
    answer:
      "It depends on your marginal rate, how geared the portfolio is, and whether you need to draw the profit. Companies deduct mortgage interest in full and pay 19% corporation tax up to £50,000 of profit, which suits geared higher-rate landlords who reinvest. Extracting profit adds dividend tax at 10.75%, 35.75% or 39.35% from 6 April 2026, and moving existing property in triggers CGT and SDLT on the same day.",
  },
  {
    question: "When do landlords have to use Making Tax Digital?",
    answer:
      "From April 2026 if your combined self-employment and property income is above £50,000, and from April 2027 if it is above £30,000. You then keep digital records and send quarterly updates plus a year-end final declaration, rather than one annual return.",
  },
  {
    question: "What happens to my rental portfolio when I die?",
    answer:
      "It forms part of your estate for inheritance tax at 40% above the available nil-rate bands, which are frozen until 5 April 2031. Residential letting is treated as an investment business, so business relief almost never applies, and the residence nil-rate band only covers a home you lived in. Mortgages reduce the taxable value, which is why gearing and ownership structure matter to the eventual bill.",
  },
  {
    question: "What are the penalties for filing a landlord tax return late?",
    answer:
      "An automatic £100 penalty applies the day after the 31 January deadline, even if no tax is due. After three months daily penalties of £10 accrue for up to 90 days, then further penalties at six and twelve months based on the tax outstanding, plus late-payment penalties and interest on the tax itself.",
  },
  {
    question: "Do I need an accountant as a landlord?",
    answer:
      "One property with a simple mortgage and a full-time job usually does not need one. The value appears when there is a structure question, a portfolio, a disposal, joint ownership, a company, non-resident status, or a Making Tax Digital obligation, because those are the situations where the difference between a competent return and an optimised one runs into thousands.",
  },
];

const changes = [
  {
    item: "Section 24 finance cost reducer",
    now: "20% basic-rate credit",
    next: "22% from 6 April 2027",
  },
  {
    item: "Making Tax Digital for Income Tax",
    now: "Mandatory above £50,000 from April 2026",
    next: "Above £30,000 from April 2027",
  },
  {
    item: "Writing down allowance (main pool)",
    now: "14%, reduced from 18%",
    next: "14%, with a 40% first-year allowance on qualifying main-pool spend",
  },
  {
    item: "Dividend tax rates",
    now: "10.75% / 35.75% / 39.35% from 6 April 2026",
    next: "Unchanged",
  },
  {
    item: "Mileage for property business travel",
    now: "55p per mile for the first 10,000 miles",
    next: "Unchanged",
  },
  {
    item: "Inheritance tax thresholds",
    now: "Frozen",
    next: "Frozen until 5 April 2031",
  },
];

function Section({
  id,
  title,
  children,
  links,
}: {
  id: string;
  title: string;
  children: ReactNode;
  links?: { href: string; label: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
      {links && links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-emerald-700 hover:text-emerald-800">
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function LandlordTaxPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Landlord tax explained: what UK landlords pay in 2026/27",
    description:
      "How UK landlords are taxed in 2026/27: income tax on rental profit, the Section 24 finance cost restriction, allowable expenses, capital gains tax, the stamp duty surcharge and inheritance tax.",
    inLanguage: "en-GB",
    datePublished: "2026-08-05",
    dateModified: "2026-08-05",
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/landlord-tax` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Landlord tax", item: `${siteConfig.url}/landlord-tax` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Landlord tax" }]} />
          <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Landlord tax explained: what you pay on UK rental property in 2026/27
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Rental profit is taxed at your normal income tax rate, but mortgage interest is not deductible, so a
            geared higher-rate landlord can pay close to half of the cash they keep. Here is every tax that touches
            a let property, what changes next April, and where the money actually goes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className={`${btnPrimary} bg-emerald-600 border-emerald-800 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Book a landlord tax review
            </Link>
            <Link
              href="/calculators/rental-income-tax-calculator"
              className={`${btnSecondary} border-white bg-white/10 px-6 py-3 text-center text-sm text-white hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Work out your rental tax
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <Section id="what-tax" title="What tax do UK landlords pay?">
              <p>
                Five taxes touch a let residential property, and they arrive at different points in the life of the
                investment.
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>Stamp duty on the way in.</strong> An additional-dwelling surcharge on top of the normal
                  rate, paid within 14 days of completion.
                </li>
                <li>
                  <strong>Income tax every year</strong> on your rental profit, at 20%, 40% or 45%, with mortgage
                  interest relieved separately at the basic rate only.
                </li>
                <li>
                  <strong>Capital gains tax on the way out</strong>, at 18% or 24% on residential property, reported
                  and paid within 60 days of completion.
                </li>
                <li>
                  <strong>Inheritance tax at 40%</strong> on the net value of the portfolio in your estate, with no
                  business relief because letting counts as investment.
                </li>
                <li>
                  <strong>Corporation tax and dividend tax</strong> instead of income tax if you hold through a
                  limited company, at 19% to 25% on profits and then 10.75% to 39.35% on what you extract.
                </li>
              </ul>
              <p>
                There is no single landlord tax rate to look up. What you pay is driven by your other income, how
                geared the property is, whose name it is in, and how long you hold it.
              </p>
              <p>
                For the current bands and thresholds in table form, see our{" "}
                <Link href="/property-tax-rates" className="font-semibold text-emerald-700 hover:text-emerald-800">
                  UK property tax rates reference
                </Link>
                .
              </p>
            </Section>

            <Section
              id="rental-income"
              title="How is rental income taxed?"
              links={[
                { href: "/calculators/rental-income-tax-calculator", label: "Rental income tax calculator" },
                {
                  href: "/blog/landlord-tax-essentials/landlord-tax-return-complete-guide-2026",
                  label: "How to file a landlord tax return",
                },
              ]}
            >
              <p>
                You are taxed on <strong>profit, not rent</strong>. Add up the rent received across all your UK
                properties, deduct allowable expenses, and the balance is added to your other income and taxed at
                your marginal rate. All your UK residential lettings are pooled into one property business, so a loss
                on one flat reduces the profit on another.
              </p>
              <p>For 2026/27 the rates that apply to that profit are:</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left">
                      <th className="py-2 pr-4 font-bold text-slate-900">Band</th>
                      <th className="py-2 pr-4 font-bold text-slate-900">Taxable income</th>
                      <th className="py-2 font-bold text-slate-900">Rate on rental profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Personal allowance</td>
                      <td className="py-2 pr-4 text-slate-700">Up to £12,570</td>
                      <td className="py-2 font-semibold text-slate-900">0%</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Basic rate</td>
                      <td className="py-2 pr-4 text-slate-700">£12,571 to £50,270</td>
                      <td className="py-2 font-semibold text-slate-900">20%</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Higher rate</td>
                      <td className="py-2 pr-4 text-slate-700">£50,271 to £125,140</td>
                      <td className="py-2 font-semibold text-slate-900">40%</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Additional rate</td>
                      <td className="py-2 pr-4 text-slate-700">Over £125,140</td>
                      <td className="py-2 font-semibold text-slate-900">45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Rental profit sits on top of your salary or self-employed income, so it is taxed at the highest rate
                you reach. If a salary of £45,000 leaves £5,270 of basic-rate band spare, the first £5,270 of rental
                profit is taxed at 20% and everything above it at 40%. Rental income also counts towards the
                £100,000 point where the personal allowance starts to taper away at £1 for every £2 of income, an
                effective 60% band that catches more landlords than expected.
              </p>
              <p>
                National Insurance does not apply to ordinary rental income, because letting property is investment
                income rather than trading. That changes if the level of service you provide takes the activity into
                a trade, which is a live question for serviced accommodation.
              </p>
              <p>
                If your gross rental income is £1,000 or less, the property allowance covers it and there is nothing
                to report. Above that you choose between the £1,000 allowance and your actual expenses, and you
                cannot claim both.
              </p>
            </Section>

            <Section
              id="section-24"
              title="What is Section 24 and how much mortgage interest relief do you get?"
              links={[
                { href: "/calculators/section-24-calculator", label: "Section 24 calculator" },
                {
                  href: "/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide",
                  label: "Landlord tax changes for 2026",
                },
              ]}
            >
              <p>
                Section 24 removed mortgage interest from the list of deductible expenses for individual landlords.
                You now declare the profit before finance costs, then receive a tax reducer worth{" "}
                <strong>20% of the interest for 2026/27, rising to 22% from 6 April 2027</strong>. The reducer is
                capped at the lower of your finance costs, your property profits, and your total income above the
                personal allowance.
              </p>
              <p>
                For a basic-rate taxpayer, 20% relief against 20% tax is roughly neutral. Two things still bite. The
                declared profit is higher than the cash you receive, which can push you into the higher-rate band,
                trigger the High Income Child Benefit Charge from £60,000, or start the personal allowance taper.
                For anyone already at 40% or 45%, the shortfall is real: tax at 40% on income that only attracts 20%
                relief.
              </p>
              <p>
                The restriction covers mortgage interest, interest on loans to buy furnishings, overdrafts and
                arrangement or broker fees. It does not apply to companies, to furnished holiday lets before the
                regime ended, or to commercial property. The 2027 rise to 22% softens the gap slightly, and it is the
                first movement in the reducer since the phase-in completed.
              </p>
            </Section>

            <Section id="worked-example" title="How much landlord tax do I pay? A worked example">
              <p>
                Take a landlord with a £45,000 salary and one let flat in 2026/27. Rent is £24,000, running costs
                are £4,000 and mortgage interest is £9,000.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Rent received</td>
                      <td className="py-2 text-right font-semibold text-slate-900">£24,000</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Less allowable expenses</td>
                      <td className="py-2 text-right font-semibold text-slate-900">(£4,000)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Taxable property profit (before finance costs)</td>
                      <td className="py-2 text-right font-semibold text-slate-900">£20,000</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Total taxable income with salary</td>
                      <td className="py-2 text-right font-semibold text-slate-900">£52,430</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Income tax before the reducer</td>
                      <td className="py-2 text-right font-semibold text-slate-900">£13,432</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Section 24 reducer (20% of £9,000)</td>
                      <td className="py-2 text-right font-semibold text-slate-900">(£1,800)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">Income tax due</td>
                      <td className="py-2 text-right font-semibold text-slate-900">£11,632</td>
                    </tr>
                    <tr className="border-b-2 border-slate-300">
                      <td className="py-2 pr-4 font-semibold text-slate-900">Tax attributable to the property</td>
                      <td className="py-2 text-right font-bold text-slate-900">£5,146</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The cash left after the mortgage is £11,000, so £5,146 of tax is an effective rate of about{" "}
                <strong>47% on money actually received</strong>, against a headline higher rate of 40%. That gap is
                Section 24 in one number.
              </p>
              <p>
                Run the same figures under the 22% reducer that applies from April 2027 and the credit rises to
                £1,980, cutting the tax to £4,966 on the same profit, assuming thresholds are unchanged. Useful,
                but not a solution on its own.
              </p>
              <p>
                Push the mortgage interest to £15,000 and the picture turns: profit before finance costs is still
                £20,000, cash retained falls to £5,000, and the tax bill barely moves. That is the point at which
                gearing, ownership structure and pension contributions stop being optional considerations.
              </p>
            </Section>

            <Section
              id="expenses"
              title="Which expenses can landlords deduct?"
              links={[
                {
                  href: "/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list",
                  label: "Full list of landlord tax deductions",
                },
              ]}
            >
              <p>
                Anything incurred wholly and exclusively for the letting business is deductible. The usual claims
                are letting agent and management fees, landlord insurance, ground rent and service charges, gas
                safety and EICR certificates, accountancy fees, advertising for tenants, legal fees on short leases,
                and council tax, utilities and cleaning during void periods.
              </p>
              <p>
                Travel to inspect or maintain a property is allowable at{" "}
                <strong>55p per mile for the first 10,000 business miles</strong> from 6 April 2026, then 25p.
                Replacement of domestic items relief covers like-for-like replacement of furniture, appliances and
                soft furnishings in a let residential property, though not the initial purchase.
              </p>
              <p>
                The dividing line that causes most enquiries is <strong>repair versus improvement</strong>. Restoring
                something to its original condition is a repair and deductible now. Making it better than it was is
                capital, disallowed against rental income, but added to the base cost and relieved against capital
                gains tax on eventual sale. Replacing a worn kitchen with a comparable one is generally a repair;
                extending it is not.
              </p>
              <p>
                Losses in a property business cannot be set against your salary. They carry forward against future
                profits of the same business indefinitely, which is worth tracking properly, because forgotten losses
                are the most common piece of free relief left unclaimed.
              </p>
            </Section>

            <Section id="buying" title="What tax do you pay when you buy a rental property?">
              <p>
                Stamp duty, and more of it than an owner-occupier. In England and Northern Ireland an additional
                dwelling attracts a <strong>5% surcharge on the whole purchase price</strong> on top of the standard
                SDLT bands, payable within 14 days of completion. Scotland applies an 8% Additional Dwelling
                Supplement to LBTT and Wales has a separate higher-rates LTT table.
              </p>
              <p>
                Companies pay the surcharge from the first pound, with no zero band. A company buying a single
                residential dwelling for more than £500,000 can also fall into the 17% flat charge unless a relief
                applies, and property rental business relief usually does apply to a genuine letting business. The
                relief is claimed, not automatic, and it can be withdrawn if the property is later occupied by a
                connected person.
              </p>
              <p>
                Mixed-use and multiple-dwellings positions are worth checking before exchange rather than after. A
                purchase that includes commercial elements is taxed under the non-residential table, which is
                frequently cheaper, and it is far easier to get right at the outset than to reclaim later.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators/stamp-duty-calculator" className="text-emerald-700 hover:text-emerald-800">
                  Stamp duty calculator →
                </Link>
              </div>
            </Section>

            <Section id="selling" title="What tax do you pay when you sell?">
              <p>
                Capital gains tax on the increase in value, not the sale price. Deduct the original purchase price,
                stamp duty and legal fees on acquisition, capital improvements, and selling costs. The remaining gain
                is reduced by the <strong>£3,000 annual exempt amount</strong> and taxed at{" "}
                <strong>18% within your unused basic-rate band and 24% above it</strong> for residential property.
              </p>
              <p>
                The deadline catches people out: a UK residential disposal must be reported and the tax paid within{" "}
                <strong>60 days of completion</strong>, through a separate CGT on UK property account, with the gain
                also going on your tax return afterwards. Late filing attracts penalties even where the tax has been
                paid.
              </p>
              <p>
                If the property was ever your main home, private residence relief covers the period of occupation
                plus the final nine months of ownership, and lettings relief may apply where you shared occupancy
                with a tenant. Transfers between spouses and civil partners happen at no gain no loss, which is the
                simplest way to use two annual exempt amounts and two basic-rate bands on a sale, provided the
                transfer is made and documented before contracts are exchanged.
              </p>
            </Section>

            <Section id="inheritance-tax" title="What happens to your portfolio for inheritance tax?">
              <p>
                Rental property counts in full in your estate at market value less the outstanding mortgage, and
                anything above the available nil-rate bands is taxed at 40%. The nil-rate band, residence nil-rate
                band and the £2m taper threshold are all{" "}
                <strong>frozen until 5 April 2031</strong>, so rising property values push more estates over the line
                every year.
              </p>
              <p>
                Do not count on business relief. Letting residential property is treated as holding investments
                rather than trading, so the combined £2.5m 100% relief allowance introduced from April 2026 does
                nothing for a standard buy-to-let portfolio. Furnished holiday lets rarely qualify either without a
                genuinely exceptional level of service.
              </p>
              <p>
                The residence nil-rate band applies to a home you actually lived in that passes to direct
                descendants, not to rental property, and it tapers away once the estate exceeds £2m. A portfolio can
                therefore cost you relief on your own home as well as attracting tax in its own right. Planning here
                is slow-moving and structural, which is exactly why it needs to start early.
              </p>
            </Section>

            <Section
              id="changes"
              title="What changes for landlords in 2026/27 and 2027/28?"
              links={[
                {
                  href: "/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide",
                  label: "Every 2026 landlord tax change",
                },
                { href: "/calculators/mtd-checker", label: "Check your MTD start date" },
              ]}
            >
              <p>
                Two changes matter more than the rest: Making Tax Digital arriving for landlords, and the Section 24
                reducer moving for the first time in years.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left">
                      <th className="py-2 pr-4 font-bold text-slate-900">Item</th>
                      <th className="py-2 pr-4 font-bold text-slate-900">2026/27</th>
                      <th className="py-2 font-bold text-slate-900">From 2027/28</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changes.map((c) => (
                      <tr key={c.item} className="border-b border-slate-200">
                        <td className="py-2 pr-4 text-slate-700">{c.item}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{c.now}</td>
                        <td className="py-2 font-semibold text-slate-900">{c.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Making Tax Digital for Income Tax applies from April 2026 where combined self-employment and
                property income exceeds £50,000, and from April 2027 above £30,000. The threshold looks at gross
                income, not profit, so a portfolio with thin margins can be caught while producing very little
                taxable income. Quarterly updates and digital records replace the single annual return, and
                spreadsheets only work if bridged by compatible software.
              </p>
              <p>
                Capital allowances also moved: the main-pool writing down allowance fell from 18% to 14%, the special
                rate pool stays at 6%, and a new 40% first-year allowance applies to qualifying main-pool
                expenditure. These matter for commercial property and communal plant rather than for the fabric of a
                standard residential let.
              </p>
            </Section>

            <Section
              id="structure"
              title="Should you hold rental property personally or in a company?"
              links={[
                { href: "/incorporation", label: "Incorporation feasibility analysis" },
                {
                  href: "/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know",
                  label: "First-time landlord tax guide",
                },
              ]}
            >
              <p>
                A company deducts mortgage interest in full and pays corporation tax at 19% up to £50,000 of profit,
                25% from £250,000, with marginal relief between. On the worked example above, a company would pay
                19% on £11,000, roughly £2,090, against £5,146 personally. That comparison is what drives most
                incorporation enquiries.
              </p>
              <p>
                It is not the whole picture. Extracting the money costs dividend tax at 10.75%, 35.75% or 39.35%
                from 6 April 2026 above a £500 allowance, so the advantage largely disappears if you need every pound
                of the profit to live on. Moving existing property into a company is a disposal at market value: CGT
                on the gain and SDLT with the surcharge on the same day, unless incorporation relief or partnership
                treatment applies. Buy-to-let lending to companies is also priced higher.
              </p>
              <p>
                The rough rule: companies suit geared higher-rate landlords who are building a portfolio and can
                leave profit in the business. Personal ownership suits lower gearing, basic-rate taxpayers, and
                anyone who needs the income now or expects to sell within a few years.
              </p>
            </Section>

            <Section
              id="deadlines"
              title="What are the deadlines and penalties?"
              links={[
                {
                  href: "/blog/landlord-tax-essentials/landlord-tax-calendar-2026-27-key-dates",
                  label: "Landlord tax calendar 2026/27",
                },
                {
                  href: "/blog/landlord-tax-essentials/hmrc-penalties-late-landlord-tax-returns-2026",
                  label: "HMRC penalties for late returns",
                },
              ]}
            >
              <p>
                Register for Self Assessment by 5 October following the tax year in which you first had rental
                income. The online return and any balancing payment are due by 31 January, with payments on account
                on 31 January and 31 July where the previous bill exceeded £1,000. A property sale has its own
                60-day clock that runs regardless of where you are in the tax year.
              </p>
              <p>
                Miss 31 January and a £100 penalty applies immediately, even if no tax is owed. Three months late
                adds £10 a day for up to 90 days, then further penalties at six and twelve months based on the tax
                outstanding, with late-payment penalties and interest running alongside. If you have unreported
                rental income from earlier years, the Let Property Campaign remains the cheapest route to put it
                right, with materially lower penalties than waiting for an enquiry.
              </p>
            </Section>

            <Section id="specialist" title="When is a property specialist worth it?">
              <p>
                A single flat, one mortgage, a PAYE job and nothing unusual is a return you can file yourself. The
                decisions that repay a specialist several times over are the structural ones: whether to incorporate,
                how to split ownership between spouses, when to sell and across which tax years, how to treat a
                refinance, whether a refurbishment is repair or capital, and how the portfolio is going to pass on.
              </p>
              <p>
                A generalist accountant files what you give them accurately. The property-specific work is knowing
                that a declaration of trust needed a Form 17 to follow it, that a mixed-use purchase was taxed on the
                wrong table, that a loss from three years ago is still available, or that a disposal should have
                straddled two tax years. Those points are worth more than the compliance fee, and they are only
                visible to someone who looks at rental portfolios every week.
              </p>
              <p>
                What that costs depends on the size of the portfolio and how much of it is structuring rather than
                filing. It is a conversation, not a price list, and the first one is free.
              </p>
            </Section>

            <div className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Landlord tax questions</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your landlord tax position reviewed"
        description="Book a free consultation. We will look at your properties, your structure and your marginal rate, and tell you what is actually costing you money."
        primaryLabel="Book free consultation"
      />
    </>
  );
}
