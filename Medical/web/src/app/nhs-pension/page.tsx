import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { CTASection } from "@/components/ui/CTASection";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildServicePageSchema, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "NHS Additional Pension and AVCs | NHS Pension Advice",
  description:
    "NHS additional pension, AVCs, ill health retirement and deferred benefits for doctors. How buying extra pension moves your 2026/27 annual allowance, with the arithmetic shown.",
  alternates: { canonical: `${siteConfig.url}/nhs-pension` },
  openGraph: {
    title: "NHS Additional Pension and AVCs | NHS Pension Advice for Doctors",
    description: "Added Pension or a Money Purchase AVC, and what each does to your annual allowance. Specialist NHS pension advice for UK doctors.",
    url: `${siteConfig.url}/nhs-pension`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("NHS Additional Pension and AVCs | NHS Pension Advice")}`, width: 1200, height: 630, alt: "NHS Additional Pension and AVCs | NHS Pension Advice" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NHS Additional Pension and AVCs | NHS Pension Advice",
    description: "Added Pension or a Money Purchase AVC, and what each does to your annual allowance. Specialist NHS pension advice for UK doctors.",
  },
};

// The two products the market calls by one word. Rendered as the comparison
// table under H2 one; this is the disambiguation no competitor page makes.
const routeComparison = [
  {
    q: "What you are buying",
    added: "Extra defined benefit accrual inside the scheme, quoted as a fixed amount of annual pension.",
    avc: "Units in a separate defined contribution fund held by the scheme's AVC provider.",
  },
  {
    q: "Who carries the investment risk",
    added: "The scheme. The extra pension is promised in pounds and rises with the scheme's own increases.",
    avc: "You. The pot is worth whatever the investments are worth when you draw it.",
  },
  {
    q: "Income tax relief",
    added: "Yes, at your marginal rate, because contributions come out of pensionable pay before tax.",
    avc: "Yes, at your marginal rate, on the same basis.",
  },
  {
    q: "Does it count against the annual allowance",
    added: "Yes. It raises your pension input amount, the growth measured against the £60,000 allowance for 2026/27.",
    avc: "Yes. Money paid in counts as pension input in the year it is paid.",
  },
  {
    q: "Can you move it if you leave",
    added: "No. Defined benefit accrual stays in the scheme and is drawn with the rest of your service.",
    avc: "Yes. The pot can be transferred independently of your main scheme benefits.",
  },
  {
    q: "Is there a published cost",
    added: "Cost per £250 of extra annual pension is set by NHSBSA and GAD factors and is re-priced, so confirm it in the current tables.",
    avc: "You choose the amount. There is no purchase price to look up.",
  },
];

const whenYouNeedHelp = [
  {
    title: "You are a higher earner with threshold income above £200,000",
    body: "If your threshold income exceeds £200,000 and your adjusted income exceeds £260,000, your annual allowance tapers from £60,000 towards a £10,000 floor for 2026/27. The floor is reached at adjusted income of £360,000. This catches hospital consultants and GP partners who never think of themselves as high earners.",
  },
  {
    title: "You have significant NHS pension growth",
    body: "The scheme is defined benefit, so what is measured is pension growth, the capitalised increase in your entitlement over the year, not the contributions taken from your pay. Growth above your allowance is taxed at your marginal rate, 40% or 45% for 2026/27.",
  },
  {
    title: "You are thinking about buying additional pension or paying AVCs",
    body: "Additional pension contributions and Money Purchase AVCs both raise your pension input amount, which raises adjusted income, which can tighten the taper. The tax relief and the allowance cost need modelling together before you commit to a purchase you cannot easily unwind.",
  },
  {
    title: "You are considering reducing NHS commitments",
    body: "Opting out stops 2015 section accrual at 1/54th of pensionable earnings and gives up death in service and ill health cover with it. Partial retirement from age 55 is usually the better understood alternative, and the two are rarely compared properly.",
  },
  {
    title: "You have received an annual allowance charge",
    body: "A charge needs a cause before it needs a payment method. Scheme Pays settles it from the pension itself, but the mandatory route has conditions and a deadline, and the voluntary route is a different decision.",
  },
];

const commonMistakes = [
  {
    title: "Treating NHS pension contributions as the thing being taxed",
    body: "Tiered member contributions are set by your pensionable pay band, and paying less into a defined benefit scheme is not an option. An annual allowance problem is therefore solved by understanding the pension input amount rather than by adjusting the contribution line on a payslip.",
  },
  {
    title: "Waiting for the pension savings statement",
    body: "NHSBSA issues a statement when growth exceeds the standard allowance, but not routinely to everyone caught by the taper. By the time a statement arrives the year is closed. Statements also arrive late and get revised, which moves your Scheme Pays deadline.",
  },
  {
    title: "Not using carry forward",
    body: "Unused annual allowance from the previous three tax years can be carried forward, current year first, provided you were a member of a registered pension scheme in each of those years. Carry forward is assessed across every scheme you hold, not the NHS scheme alone.",
  },
  {
    title: "Confusing threshold income with adjusted income",
    body: "Threshold income is broadly total taxable income less your own member contributions. Adjusted income adds back the pension input amount. The taper needs both tests met, and mixing them up produces a forecast that is wrong in either direction.",
  },
  {
    title: "Assuming private income builds NHS pension",
    body: "Private practice and company income are not NHS pensionable at all. A doctor's ordinary personal service company cannot hold a GMS or PMS contract, and for a hospital consultant only the NHS employment is pensionable. Private income still counts towards threshold and adjusted income, so it tightens the taper while adding nothing to the pension.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Annual allowance review",
    body: "Your income across every source, your pension input amount for the year, and any carry forward left from the previous three years are pulled together into an expected allowance for 2026/27, produced before the year closes rather than after it.",
  },
  {
    n: "02",
    title: "Additional pension and AVC modelling",
    body: "If Added Pension or an NHS pension AVC is on the table, the tax relief gets modelled against the effect on the input amount and the taper. The purchase decision is then made with the allowance cost visible rather than discovered a year later.",
  },
  {
    n: "03",
    title: "Ongoing review through the year",
    body: "Pensionable pay moves, private income moves, and the scheme's own figures get revised. The position is reviewed through the year rather than once at the end, and any Scheme Pays deadline that a revised statement has moved gets re-checked.",
  },
];

const whatYouGet = [
  "A full annual allowance calculation for 2026/27, with threshold income and adjusted income worked separately",
  "Tapered allowance modelling for hospital consultants and GP partners with private practice income",
  "An additional pension and AVC comparison costed against your own input amount, not a generic illustration",
  "Carry forward analysis across the previous three tax years and every registered scheme you hold",
  "A Scheme Pays review, mandatory and voluntary limbs distinguished, with the election deadline stated",
  "A written report you can act on, with the arithmetic shown rather than asserted",
];

const faqs = [
  {
    q: "Can you pay AVCs into the NHS pension?",
    a: "Yes. Money Purchase AVCs sit alongside the main scheme as a separate defined contribution pot with the NHS Pensions AVC provider, and they are a different product from Added Pension. Contributions attract income tax relief at your marginal rate and count towards your annual allowance in the year they are paid. The £60,000 allowance for 2026/27 covers everything together, so an AVC uses the same headroom as your NHS pension growth.",
  },
  {
    q: "How much additional pension can an NHS member buy?",
    a: "The additional pension NHS members buy is priced in units of extra annual pension, paid for either by a lump sum or by regular additional pension contributions deducted from pay, up to an annual cap set in the scheme regulations. The price per unit comes from NHSBSA and GAD factors that are re-set periodically, so confirm the current cost and cap in the NHS Pensions additional pension calculator before committing. The purchase is not easily reversed.",
  },
  {
    q: "Does an NHS AVC or added pension get tax relief?",
    a: "Both do, at your marginal rate for 2026/27, because contributions leave pensionable pay before income tax. That is the attraction, and it is also the trap for a doctor near the taper: relief at 45% is worth little if the extra growth pushes adjusted income up and cuts the allowance by more than the relief saves. Model the two together.",
  },
  {
    q: "What is a deferred NHS pension?",
    a: "It is the entitlement you keep after leaving NHS employment without drawing benefits. A deferred NHS pension is increased each year under the Pensions (Increase) Act 1971 rather than by the CPI plus 1.5% revaluation that applies to active 2015 section members, so the two grow at different rates. Deferred members are also assessed differently for ill health, which is a genuinely obscure corner worth advice.",
  },
  {
    q: "What is adult dependant pension?",
    a: "It is the ongoing pension paid to a surviving spouse, civil partner or qualifying partner after a member dies, and it is separate from any lump sum death benefit. The lump sum side is measured against the Lump Sum and Death Benefit Allowance of £1,073,100 for 2026/27, which replaced the lifetime allowance from 6 April 2024. Entitlement depends on service length and on when death occurs, so check the position at NHSBSA.",
  },
  {
    q: "Do NHS pension changes affect what you already built up?",
    a: "The 1995 and 2008 sections closed to future accrual and every active member has built up in the 2015 section since 1 April 2022, but legacy service is not lost. Under the McCloud remedy, service between 1 April 2015 and 31 March 2022 was rolled back into the legacy section from 1 October 2023. The choice between legacy and 2015 terms for that period is made at retirement rather than now.",
  },
];

export default function NHSPensionPage() {
  const servicePageSchema = buildServicePageSchema({
    name: "NHS Pension Advice for Doctors",
    description:
      "Specialist NHS pension advice for GPs and hospital consultants covering the whole scheme: Added Pension and Money Purchase AVCs, the £60,000 annual allowance for 2026/27 and its taper, ill health retirement, deferred benefits and dependants' pensions, and Scheme Pays.",
    path: "/nhs-pension",
    breadcrumbLabel: "NHS Pension",
    serviceType: "NHS pension and tax planning",
    offerItems: [
      "NHS additional pension and Added Pension review",
      "Money Purchase AVC comparison and annual allowance costing",
      "NHS pension annual allowance calculation for 2026/27",
      "Scheme Pays election review, mandatory and voluntary",
      "Ill health, deferred benefit and dependants' pension guidance",
    ],
  });
  const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      {/* BreadcrumbList + Service JSON-LD so AI answer engines and search
          resolve this as the firm's whole-scheme NHS pension service.
          Provider resolves to the canonical Organization @id. FAQPage uses
          the shared builder; do not hand-roll one. */}
      <JsonLd data={faqSchema ? [...servicePageSchema, faqSchema] : servicePageSchema} />
      <section className="relative h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2000&q=85"
          alt="Medical professionals in NHS hospital"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              suppressJsonLd
              items={[
                { label: "Home", href: "/" },
                { label: "NHS Pension" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              NHS Pension Help for Doctors: NHS Additional Pension, AVCs and Tax
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white">
              Two routes add to an NHS pension: Added Pension, which buys extra defined benefit accrual inside the scheme, and Money Purchase AVCs, a separate defined contribution pot. Both attract income tax relief, and both count towards your £60,000 annual allowance for 2026/27. For a hospital consultant or GP partner already inside the taper, buying more can cost more than it saves.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={`${btnPrimary} bg-[var(--copper)] border-[var(--copper-strong)] text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 text-center`}>
                Book pension planning review
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What is NHS additional pension, and how is it different from an NHS AVC?
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              They are two products and the market uses one word for both. Added Pension buys a fixed amount of extra annual pension inside the defined benefit scheme. A Money Purchase AVC (NHS pension scheme members often call it an MPAVC) is a separate investment pot. Search for NHS pension AVCs and most guidance answers about Added Pension instead, which is why doctors buy the wrong one.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              The NHS AVC pension pot is a defined contribution fund, so its value is whatever the investments are worth. An NHS pension AVC therefore carries investment risk that Added Pension does not, and in exchange it is portable if you leave. Both are bought on top of the 2015 section, in which every active member has accrued at 1/54th of pensionable earnings since 1 April 2022.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <caption className="caption-top pb-3 text-left text-sm text-slate-600">
                  NHS pension: additional pension compared with Money Purchase AVCs, 2026/27
                </caption>
                <thead>
                  <tr className="bg-[var(--navy)] text-white text-left">
                    <th scope="col" className="p-3 font-bold">Question</th>
                    <th scope="col" className="p-3 font-bold">Added Pension</th>
                    <th scope="col" className="p-3 font-bold">Money Purchase AVC</th>
                  </tr>
                </thead>
                <tbody>
                  {routeComparison.map((row) => (
                    <tr key={row.q} className="border-b border-slate-200 align-top">
                      <th scope="row" className="p-3 text-left font-semibold text-slate-900">{row.q}</th>
                      <td className="p-3 text-slate-700">{row.added}</td>
                      <td className="p-3 text-slate-700">{row.avc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
              Added years and a bigger lump sum purchase are two further routes that are closed or restricted for most members now, and ERRBO lets a 2015 section member buy out part of the reduction for retiring before state pension age. For how a benefit is worked out in each section, see our{" "}
              <Link href="/medical-guides/nhs-pension-annual-allowance" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                guide to how the NHS pension is calculated and increased
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Does additional pension count towards the annual allowance?
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              Yes, and this is where the purchase decision is won or lost. Additional pension contributions increase your pension input amount, the capitalised growth in your entitlement over the year. That input amount is also the figure added back to threshold income to reach adjusted income. So buying more pension raises the measure that triggers the taper, at the same time as it raises the growth being measured against a smaller allowance.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              For 2026/27 the standard allowance is £60,000. It reduces by £1 for every £2 of adjusted income above £260,000, but only where threshold income also exceeds £200,000, and it stops falling at £10,000. Both tests have to be met. The floor is reached at adjusted income of 260,000 plus 2 x (60,000 minus 10,000), which is £360,000.
            </p>
            <div className="mt-8 border-l-4 border-[var(--copper)] bg-white p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                How buying £10,000 of extra pension input can create a £4,500 excess
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                Take Dr A, an illustrative hospital consultant with threshold income of £215,000 in 2026/27 and an NHS pension input amount of £48,000. Adjusted income is 215,000 + 48,000 = £263,000, so the taper bites by 3,000 / 2 = £1,500 and the allowance is 60,000 - 1,500 = £58,500. Input of £48,000 sits £10,500 below it, so there is no charge.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                Dr A now buys Added Pension that lifts the input amount by £10,000, to £58,000. Adjusted income becomes 215,000 + 58,000 = £273,000, the reduction becomes 13,000 / 2 = £6,500, and the allowance falls to 60,000 - 6,500 = £53,500. The excess is 58,000 - 53,500 = £4,500, taxed at the additional rate of 45%, which is a charge of £2,025. The £10,000 fitted inside the old headroom, but the headroom moved. Carry forward from the previous three years is what usually changes this answer.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                One simplification is deliberate, and it matters. Threshold income is held at £215,000 on both sides so that the effect of the input amount alone is visible. Added Pension bought by deduction from pensionable pay comes out before tax, so in a real case the contributions paid reduce threshold and adjusted income at the same time as the extra accrual raises the input amount, which pulls the taper back and can remove the charge shown here entirely. That is why the purchase price of the units never answers the question on its own: the price, the resulting input amount and both income measures have to be modelled together.
              </p>
            </div>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
              Where a charge does arise, Scheme Pays can settle it from the pension itself, subject to a mandatory test that turns on the size of the charge and the size of the NHS input amount, and to an election deadline that a revised pension savings statement can move. The{" "}
              <Link href="/calculators/nhs-pension-scheme-pays" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                Scheme Pays calculator
              </Link>{" "}
              sets out both tests and both deadline limbs, the{" "}
              <Link href="/blog/nhs-pension-scheme-pays-doctors-deadlines" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                Scheme Pays deadlines article
              </Link>{" "}
              works through the dates, and{" "}
              <Link href="/blog/nhs-pension-tax-charges-how-to-minimize" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                minimising NHS pension tax charges
              </Link>{" "}
              covers opting out, refunds of contributions and redundancy.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">When do you need specialist NHS pension advice?</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {whenYouNeedHelp.map((item) => (
                <div key={item.title} className="border-l-4 border-[var(--navy)] bg-slate-50 p-6 sm:p-8">
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Common NHS pension mistakes</h2>
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
              {commonMistakes.map((item) => (
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
            <div className="inline-block bg-[var(--navy)] px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Free tool
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Check your annual allowance before buying additional pension
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              An NHS additional pension calculator tells you the purchase price. It does not tell you the tax cost. Price the units in the NHS pension additional pension calculator at NHSBSA, then put the resulting increase in pension growth into the tool below to see what it does to your tapered allowance and any charge.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              For how many members this actually catches, our{" "}
              <Link href="/research/annual-allowance-pension-tax-index" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                Annual Allowance Pension Tax Index
              </Link>{" "}
              tracks annual allowance charges across UK registered schemes from HMRC and NHSBSA open data.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <CalculatorClient slug="nhs-pension-annual-allowance" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What happens to your pension if you retire on ill health grounds?
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              NHS pension ill health retirement runs in two tiers, and the medical criteria for each are assessed by NHS Pensions rather than by an accountant. The part that belongs with an accountant is the tax and allowance consequence, which is also the part nobody explains. An ill health award crystallises benefits earlier than planned, so the year of award can carry an unusually large pension input amount, and once all your benefits are in payment there is no Scheme Pays election left to make.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              NHS Pensions publishes the application process and the tier criteria for ill health retirement in full on the member hub, and a deferred member is assessed on a different basis from an active one. NHS Pensions ill health retirement decisions can also be appealed, which extends the timetable across tax years. If you are mid application, get the allowance position modelled before the award lands rather than after.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What is a deferred NHS pension, and what is an adult dependant pension?
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              A deferred NHS pension is what you keep if you leave NHS employment without drawing benefits. The NHS deferred pension is increased under the Pensions (Increase) Act 1971 rather than by active revaluation, so it moves at a different rate from a serving member's accrual. Nothing is forfeited by deferring, but the growth mechanism changes, and so does the ill health basis.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              An adult dependant pension is the ongoing payment to a surviving spouse, civil partner or qualifying partner, and it sits alongside any lump sum death benefit. The lump sum side is tested against the Lump Sum and Death Benefit Allowance of £1,073,100 for 2026/27, the framework that replaced the lifetime allowance from 6 April 2024. Entitlement turns on service length and on whether death happens in service, in deferment or after retirement, so read the scheme's own scenario guidance before assuming a figure.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              Partial retirement is the option most often missed here, because it lets you draw between 20% and 100% of accrued benefits from age 55 while continuing to work and re-accrue, provided pensionable pay or commitment falls by at least 10% for twelve months. Our{" "}
              <Link href="/blog/nhs-pension-partial-retirement-doctors-guide" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                partial retirement guide
              </Link>{" "}
              sets out the conditions, and the{" "}
              <Link href="/blog/mccloud-remedy-nhs-pension-doctors-explained" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                McCloud remedy explainer
              </Link>{" "}
              covers the legacy choice made at retirement.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How do you sort out NHS pension contact details when your record is wrong?
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              Route the question by who holds the record rather than by searching for a number. NHSBSA administers member records and benefits, so NHS pension contact details for statements, awards and scheme rules start at the NHSBSA member hub. Primary Care Support England, the body that administers GP pension records and payments in England, holds the record for GP practitioners; in Wales that is the local health board, and Scotland and Northern Ireland have their own administrators. Your employer or practice manager holds officer records. NHS Pensions contact details are deliberately not republished here, because they change and a stale number on an accountant's site is worse than none at all.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              The part nobody joins up is the consequence. NHS pension complaints and corrections take months, and a missing or revised pension savings statement moves your Scheme Pays deadline rather than excusing it. An NHS pension overpayment or a wrong contribution tier can also sit in the record for years before it surfaces. If your certified profit or your contribution tier looks wrong, our{" "}
              <Link href="/blog/gp-practice-income-pcse-statement-reconciliation" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                PCSE statement reconciliation guide
              </Link>{" "}
              sets out how to evidence a correction, and the{" "}
              <Link href="/resources/nhs-pension" className="text-[var(--navy)] underline decoration-[var(--copper)] decoration-2 underline-offset-4">
                open NHS pension research resource
              </Link>{" "}
              gives the longer explanatory treatment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl mb-8 sm:mb-10">How an NHS pension planning review runs</h2>
            <div className="space-y-6 sm:space-y-8">
              {processSteps.map((step) => (
                <div key={step.n} className="flex gap-4 sm:gap-6 bg-slate-50 border-l-4 border-[var(--navy)] p-6 sm:p-8">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[var(--navy)] flex items-center justify-center text-xl sm:text-2xl font-bold text-white font-mono">
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
            <div className="bg-[var(--navy)] p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">What an NHS pension review gives you</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-200">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3 sm:gap-4">
                    <span className="text-[var(--copper)] font-bold flex-shrink-0 text-xl sm:text-2xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">NHS pension questions doctors ask</h2>
            <dl className="mt-8 space-y-5 sm:space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-l-4 border-slate-300 bg-slate-50 p-6 sm:p-8">
                  <dt className="text-lg sm:text-xl font-bold text-slate-900">{f.q}</dt>
                  <dd className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your NHS pension review"
        description="Book a free consultation. We'll review your pension position and give you clear guidance on managing annual allowance."
        primaryLabel="Book free consultation"
      />
    </>
  );
}
