import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { careHubs } from "@/data/care-hubs";
import { careServices } from "@/data/care-services";

// ponytail: two inline SVGs instead of pulling lucide-react (not a declared dep of
// this workspace). Swap for the icon lib only if the icon set grows.
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: { absolute: `Care home accountants | UK care sector specialists` },
  description:
    "Care sector accountants for UK care homes, domiciliary agencies and supported living. VAT exemption, sleep-in NMW, CQC viability and LA fee negotiation.",
  alternates: { canonical: siteConfig.url },
};

const calculatorLinks = [
  {
    title: "True cost of a care hour",
    body: "Estimate the true delivered cost of a care hour for your service.",
    href: "/calculators/true-cost-care-hour-calculator",
  },
  {
    title: "Sleep-in shift NMW compliance",
    body: "Check the national minimum wage position on sleep-in shifts.",
    href: "/calculators/sleep-in-shift-nmw-compliance-calculator",
  },
  {
    title: "Care home staffing margin",
    body: "Model staffing cost against fee income for a care home.",
    href: "/calculators/care-staffing-cost-margin-calculator",
  },
  {
    title: "Funded nursing care fee mix",
    body: "Model the mix of fee income across funding sources.",
    href: "/calculators/funded-nursing-care-fee-mix-calculator",
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
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />

      {/* Hero */}
      <section className="relative flex items-center min-h-[440px] sm:min-h-[560px] overflow-hidden bg-[#3d3452]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d3452] via-[#5a4d75]/70 to-[#2b2540]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Accountants for UK care providers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[#3d3452] hover:bg-white/90 transition-colors text-center ${focusRing}`}
              >
                Speak to a care sector specialist
              </Link>
              <Link
                href="/services"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                Our services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            A care sector accountant handles the finance work that is specific to regulated care:
            the{" "}
            <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012" className="underline underline-offset-2 hover:text-[#7d6b9e]">
              VAT exemption that locks input tax into your costs
            </a>
            , sleep-in and travel-time{" "}
            <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid" className="underline underline-offset-2 hover:text-[#7d6b9e]">
              National Minimum Wage
            </a>{" "}
            compliance, the{" "}
            <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template" className="underline underline-offset-2 hover:text-[#7d6b9e]">
              CQC financial viability statement
            </a>
            , and the funding-mix accounting that separates self-funder, local authority,{" "}
            <a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost" className="underline underline-offset-2 hover:text-[#7d6b9e]">
              NHS-funded nursing care
            </a>{" "}
            and NHS continuing healthcare income. A generalist firm handles none of these by default.
          </p>
        </div>
      </section>

      {/* Provider types (hubs) */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Who we work with.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            We work with care home owners, registered managers, domiciliary agency directors and supported-living providers across England. Each sub-sector carries its own finance risks; select yours for the detail that applies to your service.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/for/${hub.slug}`}
                className={`group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-[#7d6b9e] hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#7d6b9e] transition-colors">
                  {hub.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">{hub.headline}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-[#7d6b9e] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold text-neutral-900 sm:text-4xl">
            Specialist services for care providers.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group block border border-neutral-200 bg-white p-6 sm:p-7 transition-all hover:border-[#7d6b9e] hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#7d6b9e] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">{service.headline}</p>
                <div className="mt-4 flex items-center text-[#7d6b9e] font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finance moments */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The finance moments that bring operators here.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Most care operators come to a sector specialist at one of five points. Each one involves money that a generalist accountant is unlikely to handle correctly without sector-specific knowledge.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">VAT welfare exemption</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  CQC-registered providers are VAT-exempt under Group 7 of Schedule 9 VATA 1994.
                </a>{" "}
                Exemption is a cost, not a perk: you cannot recover input VAT on consumables, equipment, building works or professional fees used to make exempt supplies. That irrecoverable VAT is a permanent overhead that must be built into your fee model and budget.{" "}
                <Link href="/services/care-vat-review" className="font-semibold text-[#7d6b9e] hover:underline">VAT review service &rarr;</Link>
              </p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">Sleep-in and travel-time NMW</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                For sleep-in shifts,{" "}
                <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  only time awake for the purposes of working counts for NMW
                </a>{" "}
                (Royal Mencap Society v Tomlinson-Blake [2021]). For domiciliary care, inter-call travel is working time and must be paid at or above the applicable rate. Rota models that pay only for face-to-face contact time create unlawful pay shortfalls.{" "}
                <Link href="/services/care-payroll" className="font-semibold text-[#7d6b9e] hover:underline">Care payroll service &rarr;</Link>
              </p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">CQC financial viability statement</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                New providers must submit a{" "}
                <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  financial viability statement using CQC's own template
                </a>{" "}
                as part of registration. Trading before registration is a criminal offence under the Health and Social Care Act 2008. The statement is normally prepared or signed by an accountant.{" "}
                <Link href="/services/cqc-financial-viability-statement" className="font-semibold text-[#7d6b9e] hover:underline">CQC financial viability service &rarr;</Link>
              </p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">Local authority fee negotiation</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Local authorities have a statutory duty to pay fees that reflect the actual cost of care.{" "}
                <a href="https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  The Care Act statutory guidance and the fair-cost-of-care framework
                </a>{" "}
                are the provider's negotiating tools. Below-cost LA rates are a material revenue risk; challenging them requires accurate cost evidence.
              </p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">Buying or selling a care business</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Acquisitions involve capital allowances structuring: Annual Investment Allowance covers up to{" "}
                <a href="https://www.gov.uk/capital-allowances/annual-investment-allowance" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  £1,000,000 of qualifying plant and machinery
                </a>{" "}
                per year. Disposals are subject to{" "}
                <a href="https://www.gov.uk/business-asset-disposal-relief" className="underline underline-offset-2 hover:text-[#7d6b9e]">
                  Business Asset Disposal Relief at 18% from 6 April 2026
                </a>{" "}
                (down from 24% standard CGT rate), with conditions that propco/opco structures can break.{" "}
                <Link href="/services/buying-a-care-home" className="font-semibold text-[#7d6b9e] hover:underline">Buying a care home &rarr;</Link>
              </p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-base font-bold text-neutral-900">Overseas workforce and sponsorship</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Employers sponsoring overseas care workers must hold a Home Office sponsor licence and maintain ongoing HR compliance records. The immigration skills charge per sponsored worker per year is a cost-per-head that must be built into care fee models. Salary-floor requirements move regularly; content must be dated.
              </p>
            </div>
          </div>

          {/* Funding mix strip */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-neutral-900">Who pays the fees: the four funding sources</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 max-w-2xl">
              Care providers must account for fee income separately by source. Each carries different VAT, income-recognition and negotiation rules.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200">
                <thead>
                  <tr className="bg-neutral-100 text-left">
                    <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">Funding source</th>
                    <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">Who pays</th>
                    <th className="px-4 py-3 font-semibold text-neutral-800 border-b border-neutral-200">Key finance risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="px-4 py-3 font-medium text-neutral-900">Self-funder</td>
                    <td className="px-4 py-3 text-neutral-600">Resident or family</td>
                    <td className="px-4 py-3 text-neutral-600">Debtors, fee review timing, top-up arrangements</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-neutral-900">Local authority</td>
                    <td className="px-4 py-3 text-neutral-600">Council social services</td>
                    <td className="px-4 py-3 text-neutral-600">Below-cost rates; challenge via <a href="https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" className="underline underline-offset-2 hover:text-[#7d6b9e]">Care Act fair-cost-of-care framework</a></td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="px-4 py-3 font-medium text-neutral-900">NHS-funded nursing care (FNC)</td>
                    <td className="px-4 py-3 text-neutral-600">NHS to nursing home direct</td>
                    <td className="px-4 py-3 text-neutral-600"><a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost" className="underline underline-offset-2 hover:text-[#7d6b9e]">£267.68 standard / £368.24 higher weekly from 1 April 2026</a>; must be accounted separately</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">NHS continuing healthcare (CHC)</td>
                    <td className="px-4 py-3 text-neutral-600">NHS funds full package</td>
                    <td className="px-4 py-3 text-neutral-600">Different VAT analysis; supply is to NHS, not individual; do not conflate with FNC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why a sector specialist */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Why a sector specialist, not a generalist accountant?
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-600">
                <p>
                  A generalist accountant will prepare your accounts and file your returns. They will not, by default, know that your VAT exemption means you bear irrecoverable input tax as a permanent overhead, or that your sleep-in rota may have a latent NMW liability, or that your CQC registration requires a financial viability statement prepared to a specific template.
                </p>
                <p>
                  These are not edge cases. VAT, workforce pay compliance and CQC financial paperwork are the three highest-frequency finance issues across the sector. Getting any one of them wrong creates a cost or a liability that appears on no standard accounts template.
                </p>
                <p>
                  Sector-specialist accounting means the fee model, the payroll design, the CQC paperwork and the tax structure are all built around the regulatory environment your business operates in, not bolted onto a general-practice framework after the fact.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">The situations that typically bring operators to a specialist</h3>
              <div className="mt-5 space-y-4">
                {[
                  { title: "A CQC registration deadline", body: "The financial viability statement has to be prepared on CQC's own template, and a generalist accountant may never have produced one. Registration timetables leave little room to learn on the job." },
                  { title: "A latent NMW liability", body: "Inter-call travel time in domiciliary care is working time for minimum-wage purposes. Agencies that pay contact hours only can build up back-pay exposure for years before anyone flags it." },
                  { title: "VAT exemption treated as a perk", body: "Welfare exemption means irrecoverable input VAT on every refurbishment, equipment purchase and professional fee. Budgets built as if that VAT comes back are systematically wrong." },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-[#7d6b9e] pl-5 py-1">
                    <p className="text-sm font-semibold text-neutral-800">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Common questions from care operators.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                q: "Do care homes need a specialist accountant?",
                a: "Not legally, but practically the finance work is specialist. VAT welfare exemption, sleep-in NMW, CQC financial viability statements and funding-mix accounting are all sector-specific. A generalist firm will handle standard accounts and tax; they are unlikely to handle these without additional research.",
              },
              {
                q: "Why is VAT a cost for a care provider rather than something we reclaim?",
                a: "Because CQC-registered providers make VAT-exempt supplies under Group 7 of Schedule 9 VATA 1994. Exempt means no VAT is charged on your fees, but it also means you cannot recover the input VAT you pay on purchases. That input tax becomes a permanent overhead. See the full position at gov.uk.",
              },
              {
                q: "Do you work with domiciliary agencies as well as care homes?",
                a: "Yes. Domiciliary care agencies have specific NMW issues (inter-call travel, zero-hours holiday accrual), employer cost modelling requirements, and the same CQC registration financial paperwork if they are seeking registration. We have a dedicated section for domiciliary agencies.",
              },
              {
                q: "Can you prepare a CQC financial viability statement?",
                a: "Yes. CQC requires new providers to submit a financial viability statement using its own template as part of the registration process. This is a productised engagement. See our CQC financial viability service page for the scope.",
              },
              {
                q: "Do you handle care payroll including sleep-ins and travel time?",
                a: "Yes. Sleep-in NMW (the Mencap ruling means only time awake for work counts) and inter-call travel-time NMW are the two most common payroll compliance issues in care. Both require payroll design that reflects the regulatory position, not just a standard payroll run.",
              },
              {
                q: "Do you cover Scotland, Wales and Northern Ireland?",
                a: "Our default jurisdiction is England, where CQC registration, NHS funding rates and business rates apply. Scotland, Wales and Northern Ireland operate different regulatory and funding regimes. We flag devolved-nation differences where relevant; we do not mix them silently.",
              },
            ].map((faq, i) => (
              <div key={i} className="border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-sm font-bold text-neutral-900">{faq.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators + research */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Free care sector calculators.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">
                Scenario and compliance tools built for care operators. No sign-up, no data stored. Run a true-cost model, check a sleep-in rota&apos;s NMW position, or model your funded-nursing-care fee mix.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-start justify-between gap-4 border border-neutral-200 bg-white px-5 py-4 transition-all hover:border-[#7d6b9e] ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[#7d6b9e] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#7d6b9e] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Care Provider Business Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Sector data for UK care operators: Companies House SIC 87/88 provider counts, workforce figures from the{" "}
                <a href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx" className="underline underline-offset-2 hover:text-[#7d6b9e]">Skills for Care state-of-the-sector report</a>
                , and the finance benchmarks that operators and commissioners use.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/care-provider-business-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#7d6b9e] hover:text-[#7d6b9e] transition-all ${focusRing}`}
                >
                  View the Care Provider Business Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#7d6b9e] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with LeadForm */}
      <section className="relative overflow-hidden bg-[#3d3452]">
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a care sector specialist
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-white/80">
                Tell us about your care service: the type of provision, your CQC registration status and approximate headcount. We will come back within one working day with no obligation.
              </p>
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

      {/* Blog footer strip */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English guidance for UK care providers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English guides covering VAT welfare exemption edge cases, sleep-in and travel-time NMW, CQC financial compliance, the fair-cost-of-care framework, capital allowances on care-home fit-out, and Making Tax Digital for sole-trader operators.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
