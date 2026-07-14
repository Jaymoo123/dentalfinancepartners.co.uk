import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  Quote,
  UtensilsCrossed,
  Beer,
  ShoppingBag,
  Hotel,
  Coffee,
  Truck,
  Calculator,
  BadgePoundSterling,
  FileText,
  Users,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { buildFaqJsonLd, buildOrganizationJsonLd } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return {
    title: `Specialist Hospitality Accountants UK | ${siteConfig.name}`,
    description:
      `Specialist accountants for UK restaurants, pubs, hotels, takeaways, cafes and caterers. Tronc and tips compliance, food VAT, hospitality payroll, TOMS and business rates advice.`,
    alternates: { canonical: siteConfig.url },
  };
}

// ponytail: HP-verified figures only; all linked to gov.uk source
const keyStats = [
  {
    value: "£90,000",
    label: "VAT registration threshold (rolling 12 months)",
    href: "https://www.gov.uk/vat-registration/when-to-register",
  },
  {
    value: "£12.71",
    label: "National Living Wage from 1 April 2026 (age 21+)",
    href: "https://www.gov.uk/national-minimum-wage-rates",
  },
  {
    value: "15%",
    label: "Employer NIC rate above the £5,000 secondary threshold",
    href: "https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
  },
  {
    value: "£10,500",
    label: "Employment Allowance offsetting employer NIC",
    href: "https://www.gov.uk/claim-employment-allowance",
  },
];

const subTrades = [
  {
    title: "Restaurants",
    body: "Food VAT hot/cold split, tronc and tips compliance, kitchen capital allowances and corporation tax for independent and multi-site restaurant groups.",
    href: "/for/restaurants",
    Icon: UtensilsCrossed,
  },
  {
    title: "Pubs and bars",
    body: "AWRS due diligence, draught duty rates, licensed premises costs and the distinction between deductible renewal costs and non-deductible first-application licence fees.",
    href: "/for/pubs-and-bars",
    Icon: Beer,
  },
  {
    title: "Takeaways",
    body: "Hot food VAT, food safety registration (required 28 days before trading), NLW compliance for delivery workers and small business rate relief for smaller premises.",
    href: "/for/takeaways",
    Icon: ShoppingBag,
  },
  {
    title: "Hotels and guesthouses",
    body: "TOMS for packaged travel, accommodation FRS sector rate, capital allowances on fit-out, B&B rent-a-room rules and MTD for income tax obligations.",
    href: "/for/hotels-and-guesthouses",
    Icon: Hotel,
  },
  {
    title: "Cafes and coffee shops",
    body: "Eat-in vs takeaway VAT, FRS catering rate, food registration, zero-hours payroll and the cash basis default for sole-trader operators.",
    href: "/for/cafes-and-coffee-shops",
    Icon: Coffee,
  },
  {
    title: "Caterers and street food",
    body: "Mobile food stand VAT, event catering contracts, casual worker payroll, food business registration and AIA for specialist kitchen equipment.",
    href: "/for/caterers-and-street-food",
    Icon: Truck,
  },
];

const services = [
  {
    title: "Tronc scheme setup",
    body: "An independently run tronc removes employer NIC on qualifying tips. We set up the scheme, confirm troncmaster independence and keep the scheme aligned with the Employment (Allocation of Tips) Act 2023.",
    href: "/services/tronc-scheme-setup",
    Icon: Users,
  },
  {
    title: "Hospitality payroll",
    body: "Zero-hours and casual worker payroll, NLW compliance checks, holiday pay, Employment Allowance claims and monthly PAYE submissions for kitchens and front-of-house teams.",
    href: "/services/hospitality-payroll",
    Icon: ClipboardList,
  },
  {
    title: "Hospitality VAT",
    body: "Hot/cold food splits, eat-in vs takeaway VAT, Flat Rate Scheme sector-rate selection, TOMS margin scheme and VAT registration monitoring against the £90,000 rolling threshold.",
    href: "/services/hospitality-vat",
    Icon: BadgePoundSterling,
  },
  {
    title: "TOMS advice",
    body: "If your operation packages bought-in accommodation, transport or other travel elements, TOMS applies and you can only recover VAT on the margin. We structure the accounting correctly from the start.",
    href: "/services/toms-advice",
    Icon: FileText,
  },
  {
    title: "Business rates review",
    body: "RHL relief ended for new claims from 1 April 2026. We review your rateable value, check SBRR eligibility (100% relief up to £12,000 rateable value) and apply the revised 2026-27 multipliers.",
    href: "/services/business-rates-relief",
    Icon: BarChart3,
  },
];

const complianceMoments = [
  {
    title: "The 2026 tips and tronc rules",
    body: (
      <>
        The{" "}
        <a
          href="https://www.legislation.gov.uk/ukpga/2023/13/contents"
          className="underline underline-offset-2"
        >
          Employment (Allocation of Tips) Act 2023
        </a>
        , in force since 1 October 2024, requires 100% of qualifying tips to reach
        workers without deductions. Operators also need a written tips policy and
        allocation records. Tips paid through a genuine independent tronc are{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922"
          className="underline underline-offset-2"
        >
          free of employer and employee NIC
        </a>{" "}
        (PAYE income tax still applies), but any employer involvement in allocation
        destroys the exemption.
      </>
    ),
  },
  {
    title: "Food and drink VAT traps",
    body: (
      <>
        Hot food is{" "}
        <a
          href="https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091"
          className="underline underline-offset-2"
        >
          standard-rated (20%)
        </a>{" "}
        if it meets any one of five tests (heated to order, kept hot, heat-retentive
        packaging and so on). Cold food eaten on the premises is also standard-rated,
        regardless of temperature. Applying the wrong rate is the most common VAT
        error in the sector and can trigger substantial assessments.
      </>
    ),
  },
  {
    title: "Licensed-trade duties and costs",
    body: (
      <>
        Pubs and bars buying alcohol from UK wholesalers must verify AWRS approval
        before each purchase. First-application{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim61405"
          className="underline underline-offset-2"
        >
          premises licence costs are not tax-deductible
        </a>{" "}
        (capital expenditure, per BIM61405); only renewal costs are deductible.
        This distinction catches many operators when they open a new site.
      </>
    ),
  },
  {
    title: "Business rates cliff (from 1 April 2026)",
    body: (
      <>
        Retail, Hospitality and Leisure relief{" "}
        <a
          href="https://www.gov.uk/business-rates-relief/retail-discount"
          className="underline underline-offset-2"
        >
          ended for new claims from 1 April 2026
        </a>
        . From that date, hospitality properties use revised multipliers (38.2p for
        rateable values below £51,000; 43p for £51,000 to £499,999). Operators who
        still qualify for Small Business Rate Relief (100% at or below £12,000
        rateable value) should ensure they are claiming it.
      </>
    ),
  },
];

const testimonials = [
  {
    quote:
      "We had been running our tronc without formal troncmaster independence. Once that was pointed out, we restructured the scheme properly and our employer NIC on tips dropped to zero. The savings in the first year covered the accountancy fee several times over.",
    attribution: "Owner, independent restaurant group, three sites, Midlands",
  },
  {
    quote:
      "Our previous accountant applied one VAT rate to everything. When a specialist reviewed our takeaway menu, we found we had been overclaiming on cold items and underclaiming on dine-in sales. We corrected the position voluntarily and avoided penalties.",
    attribution: "Director, fast-casual takeaway, South East England",
  },
  {
    quote:
      "The tips legislation change caught us completely off guard. Within a week of contacting the team we had a written tips policy, a compliant allocation record and an updated payroll process. We have not had to think about it since.",
    attribution: "Operations manager, pub and bar group, four sites, Yorkshire",
  },
];

const calculatorLinks = [
  { title: "Tronc and tips PAYE and NIC calculator", href: "/calculators/tronc-tips-paye-nic" },
  { title: "Food and drink VAT checker", href: "/calculators/food-drink-vat-checker" },
  { title: "Staff cost and rota margin calculator", href: "/calculators/staff-cost-rota-margin" },
];

const faqs = [
  {
    question: "Do I need a specialist hospitality accountant?",
    answer:
      "Not every operator does, but the sector has a concentration of compliance traps that a general accountant encounters rarely: food and drink VAT splits, tronc and tips rules, AWRS due diligence, TOMS for hotel packages and MTD for income tax. If your business involves any of these, a specialist will identify risks and savings that a generalist is unlikely to catch.",
  },
  {
    question: "What does a hospitality accountant do that a general accountant does not?",
    answer:
      "A hospitality specialist understands the five-test hot-food VAT rule, the NIC treatment of independently run troncs, AWRS buyer obligations, the TOMS margin scheme, draught duty rates and the capital allowances sequencing for kitchen fit-outs. A general accountant handles these infrequently enough that the sector-specific edge cases may not be on their radar.",
  },
  {
    question: "Can you handle a tronc and the 2026 tips rules?",
    answer:
      "Yes. The Employment (Allocation of Tips) Act 2023 has been in force since 1 October 2024. We set up independently run troncs, confirm genuine troncmaster independence (which is required for the NIC exemption to apply), draft written tips policies and ensure allocation records meet the statutory Code of Practice. Tips can never count toward National Minimum Wage or National Living Wage.",
  },
  {
    question: "Do you work with multi-site operators?",
    answer:
      "Yes. Multi-site groups face additional complexity: associated-company rules reduce the corporation tax thresholds, Employment Allowance is available only once across the group, and tronc arrangements must be site-specific to preserve NIC exemptions. We handle consolidated accounts and per-site compliance for groups operating across England.",
  },
  {
    question: "Which hospitality trades do you cover?",
    answer:
      "Restaurants, pubs and bars, takeaways, hotels and guesthouses, cafes and coffee shops, and caterers and street food. Each sub-trade has its own pages with sector-specific detail. We cover all six across England as our default jurisdiction; Scotland and Wales have different licensing and business rates regimes, which we flag explicitly.",
  },
  {
    question: "Can you help with food and drink VAT?",
    answer:
      "Yes. We review menus and sales categories against the five-test hot-food rule, the eat-in vs takeaway split and the four zero-rating carve-outs (confectionery, crisps and snacks, soft drinks and alcohol). We also advise on the VAT Flat Rate Scheme sector rates and whether the limited-cost-trader override at 16.5% applies to your operation.",
  },
  {
    question: "Do you cover Scotland and Wales?",
    answer:
      "Our default jurisdiction is England. Scotland and Wales operate different licensing regimes and business rates frameworks; these are flagged explicitly when they arise. Please tell us which nation your premises are in when you get in touch so we can advise accordingly.",
  },
  {
    question: "How much does a hospitality accountant cost?",
    answer:
      "Fees vary by the size and complexity of the operation. We do not publish standard prices because the right scope depends on the number of sites, whether payroll and tronc are included, and the complexity of your VAT position. Contact us for a no-obligation conversation and we will explain what a typical engagement looks like for an operator of your size.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#3a1a0d]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a1a0d] via-[#b0532f]/70 to-[#2a1208]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-[#b0532f]/30 border border-[#b0532f]/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-200">
              <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Specialist accountants for UK hospitality businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-orange-100 sm:text-xl">
              Tronc and tips compliance, food and drink VAT, licensed-trade duties, TOMS,
              hospitality payroll and business rates. We work exclusively with operators in
              the sector, so every engagement draws on focused hospitality knowledge.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[#b0532f] hover:bg-orange-50 active:bg-orange-100 transition-colors text-center ${focusRing}`}
              >
                Talk to a hospitality accountant
              </Link>
              <Link
                href="/services/tronc-scheme-setup"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                Tronc scheme setup
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-orange-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Restaurants, pubs, hotels, takeaways, cafes and caterers. England default.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures bar */}
      <section className="bg-[#b0532f] py-8 sm:py-10" aria-label="Key hospitality compliance figures">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono hover:text-orange-200 transition-colors"
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            Most hospitality operators are experts in food, service and atmosphere, not in
            tronc legislation, food VAT hot/cold tests or the mechanics of the Tour Operators&apos;
            Margin Scheme. The compliance picture is genuinely complex, and the cost of getting
            it wrong lands on the employer. We handle the tax and accounting so operators
            can run their business.
          </p>
        </div>
      </section>

      {/* Who we help */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Who we work with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Independent operators and multi-site groups across the UK hospitality sector.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Whether you run one site or twenty, the compliance obligations scale with you.
            Multi-site operators face additional complexity: associated-company rules, group
            Employment Allowance restrictions, and per-site tronc independence requirements.
            England is our default jurisdiction. Scotland and Wales have different licensing
            and rates regimes, which we flag explicitly.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Single-site restaurants", href: "/for/restaurants" },
              { label: "Multi-site pub groups", href: "/for/pubs-and-bars" },
              { label: "Hotels and B&Bs", href: "/for/hotels-and-guesthouses" },
              { label: "Takeaways and delivery", href: "/for/takeaways" },
              { label: "Cafes and coffee shops", href: "/for/cafes-and-coffee-shops" },
              { label: "Caterers and street food", href: "/for/caterers-and-street-food" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group block border border-neutral-200 bg-neutral-50 p-4 text-sm font-semibold text-neutral-800 hover:border-[#b0532f] hover:bg-orange-50 transition-all ${focusRing}`}
              >
                {item.label}
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-400 group-hover:text-[#b0532f] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-trade grid */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              Sector pages by trade
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              Each sub-trade has its own compliance picture. Choose your trade for
              sector-specific detail on VAT, payroll, duties and capital allowances.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subTrades.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-[#b0532f] hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-[#b0532f] mb-4 group-hover:bg-[#8f421f] transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#b0532f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-[#b0532f] font-semibold text-sm">
                    See {item.title.toLowerCase()} page
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              Services for hospitality operators
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              Five specialist service areas, each built around the compliance obligations
              that operators in this sector actually face.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block border border-neutral-200 bg-neutral-50 p-6 sm:p-8 transition-all hover:border-[#b0532f] hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-[#b0532f] mb-4 group-hover:bg-[#8f421f] transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#b0532f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-[#b0532f] font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance moments */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The moments that bring operators to us</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The compliance points most hospitality operators hit at some stage.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {complianceMoments.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[#b0532f] bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Key figures strip */}
      <section className="bg-[#3a1a0d] py-10 sm:py-12" aria-label="Hospitality tax figures at a glance">
        <div className={siteContainerLg}>
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-white sm:text-2xl">
              Key figures for hospitality operators (England, 2026-27)
            </h2>
            <p className="mt-2 text-sm text-orange-300">
              Scotland and Wales: licensing and business rates differ. All figures link their
              official source.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base border border-[#b0532f]/40">
              <caption className="sr-only">Key hospitality tax and employment figures for 2026-27</caption>
              <thead>
                <tr className="bg-[#b0532f]/40 text-white">
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Figure</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Value</th>
                  <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider text-xs sm:px-6 sm:py-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    figure: "VAT registration threshold",
                    value: "£90,000 (rolling 12 months)",
                    href: "https://www.gov.uk/vat-registration/when-to-register",
                    label: "GOV.UK",
                  },
                  {
                    figure: "National Living Wage (age 21+, from 1 Apr 2026)",
                    value: "£12.71 per hour",
                    href: "https://www.gov.uk/national-minimum-wage-rates",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Employer NIC rate (above £5,000 secondary threshold)",
                    value: "15%",
                    href: "https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Employment Allowance",
                    value: "£10,500 per tax year",
                    href: "https://www.gov.uk/claim-employment-allowance",
                    label: "GOV.UK",
                  },
                  {
                    figure: "Annual Investment Allowance (kitchen plant)",
                    value: "Up to £1,000,000",
                    href: "https://www.gov.uk/capital-allowances/annual-investment-allowance",
                    label: "GOV.UK",
                  },
                  {
                    figure: "SBRR (rateable value up to £12,000)",
                    value: "100% business rates relief",
                    href: "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief",
                    label: "GOV.UK",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.figure}
                    className={`border-b border-[#b0532f]/30 last:border-0 ${i % 2 === 1 ? "bg-[#b0532f]/10" : "bg-[#b0532f]/5"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-orange-100 sm:px-6 sm:py-4">
                      {row.figure}
                    </th>
                    <td className="px-4 py-3.5 text-white font-mono sm:px-6 sm:py-4">{row.value}</td>
                    <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                      <a
                        href={row.href}
                        className="underline underline-offset-2 text-orange-300 hover:text-white text-xs"
                      >
                        {row.label}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Free tools teaser */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">Free tools</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Calculators built for hospitality operators.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Three free calculators covering the figures operators ask about most: the
                NIC saving from a compliant tronc, the VAT treatment of individual menu
                items, and the true labour cost of a rota including NLW, NIC and holiday.
                No sign-up, no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-center justify-between border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#b0532f] hover:text-[#b0532f] transition-all ${focusRing}`}
                  >
                    {calc.title}
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#b0532f] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-4">Data asset</div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                UK hospitality openings and closures index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                A regularly updated index of UK hospitality company registrations and
                dissolutions, drawn from Companies House SIC 55/56 data (accommodation
                and food service activities). SIC codes are self-reported at incorporation;
                the index carries this caveat prominently. Dissolutions are cross-referenced
                against Insolvency Service statistics.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/hospitality-openings-closures-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#b0532f] hover:text-[#b0532f] transition-all ${focusRing}`}
                >
                  View the hospitality openings and closures index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#b0532f] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles your bookkeeping.{" "}
            <span className="text-[#b0532f]">We handle hospitality-specific accounting.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Tronc independence, food VAT five-test analysis, AWRS due diligence, TOMS margin
            accounting, draught duty rates, BIM61405 licensing costs: a generalist encounters
            these infrequently. We deal with them every week across our hospitality client base.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles typical hospitality accounting areas
              </caption>
              <thead>
                <tr className="bg-[#b0532f] text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Area</th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">Our approach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    area: "Tronc and tips",
                    detail: "Independent tronc setup, troncmaster independence confirmed, written tips policy, allocation records and payroll integration",
                  },
                  {
                    area: "Food and drink VAT",
                    detail: "Menu review against the five hot-food tests and eat-in/takeaway rule, FRS sector-rate selection, registration threshold monitoring",
                  },
                  {
                    area: "Hospitality payroll",
                    detail: "Zero-hours and casual worker payroll, NLW compliance checks, Employment Allowance claims and monthly PAYE submissions",
                  },
                  {
                    area: "Licensed trade",
                    detail: "AWRS due-diligence guidance, licensing cost treatment (first-application vs renewal), Machine Games Duty registration",
                  },
                  {
                    area: "Capital allowances",
                    detail: "AIA sequencing for kitchen fit-out, main-pool WDA at 14% (FA 2026), new 40% FYA on qualifying additions, special-rate plant",
                  },
                  {
                    area: "Business rates",
                    detail: "SBRR eligibility, 2026-27 revised multipliers for RHL properties (RHL relief ended for new claims from 1 April 2026)",
                  },
                  {
                    area: "TOMS",
                    detail: "Margin scheme structuring for operators packaging bought-in accommodation or transport; input VAT recovery position",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What operators say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite accounts based on patterns across our hospitality clients.
              Names and specific figures anonymised. The compliance situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-orange-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-semibold text-neutral-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA with LeadForm */}
      <section className="relative overflow-hidden bg-[#3a1a0d]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b0532f]/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a hospitality accountant
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-orange-100">
                Tell us about your operation. We will explain what your business needs, in
                plain English, with no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Hospitality specialists only", sub: "We do not take general commercial clients" },
                  { title: "24-hour response", sub: "Usually the same working day" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's affairs with another" },
                  { title: "England default", sub: "We flag Scotland and Wales and ask your jurisdiction upfront" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-orange-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#b0532f] text-white font-bold text-xl flex-shrink-0">
                      &#10003;
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-orange-300">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Get in touch
              </h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#b0532f] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[#b0532f] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog footer strip */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Hospitality accounting guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for operators and finance leads.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Articles and guides on tronc and tips compliance, food VAT, licensed trade,
              payroll, capital allowances and business rates. Written for people running
              hospitality businesses, not for accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services/tronc-scheme-setup"
                className="inline-flex items-center gap-2 text-[#b0532f] hover:text-[#8f421f] font-semibold text-sm sm:text-base transition-colors"
              >
                Tronc scheme setup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
