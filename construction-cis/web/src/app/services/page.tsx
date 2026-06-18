import type { Metadata } from "next";
import Link from "next/link";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import {
  BadgePoundSterling,
  ShieldCheck,
  FileCheck,
  Building2,
  ClipboardList,
  Receipt,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "CIS Accounting Services | Construction Tax & Compliance" },
  description:
    "CIS accounting for UK construction subcontractors and contractors: CIS refunds, GPS applications, sole trader SA, limited company EPS reclaim and CIS300 returns.",
};

const services = [
  {
    id: "cis-refund",
    title: "CIS tax refund",
    label: "CIS Refunds",
    Icon: BadgePoundSterling,
    body: [
      "The 20% CIS deduction is taken before any expenses or allowances are applied. Most registered sole-trader subcontractors overpay across the year. We calculate the full refund you are owed, account for every allowable expense (mileage at 55p per mile from April 2026, tools, PPE, van costs, professional subscriptions), and submit your Self Assessment return.",
      "We check your deduction slips for the correct deduction base. CIS deductions apply to the labour element only: the cost of materials you supply is excluded. Where a main contractor has been deducting from the full invoice value, we identify the overpayment and recover it.",
      "Most subcontractors receive their refund within 8 to 12 weeks of a correctly filed return. We follow up with HMRC where delays occur.",
    ],
  },
  {
    id: "gross-payment-status",
    title: "Gross payment status application and maintenance",
    label: "GPS",
    Icon: ShieldCheck,
    body: [
      "GPS means no CIS deduction at all: you receive every payment in full and settle the tax yourself. To qualify you must pass three tests: the business test (UK construction work through a bank account), the turnover test (£30,000 net of materials for a sole trader, or £30,000 per director / £100,000 for a company), and the compliance test (12 months clean tax record).",
      "From 6 April 2026, GPS can be revoked immediately without notice where HMRC considers you knew or should have known about fraudulent supply chain connections. A 5-year reapplication ban applies. Director liability under Finance Bill 2026 ss.62A/62B reaches up to 30% of the tax lost. Keeping GPS now requires active due diligence.",
      "We manage the GPS application, assess whether you meet the three tests, and maintain the compliance record. We also guide you through the ongoing due diligence required to protect the status under the April 2026 rules.",
    ],
  },
  {
    id: "sole-trader-sa",
    title: "Sole trader Self Assessment",
    label: "Self Assessment",
    Icon: FileCheck,
    body: [
      "Annual Self Assessment for CIS sole traders, filed correctly and on time. Every allowable expense claimed, including mileage at 55p per mile (from 6 April 2026), tools and equipment via capital allowances, van running costs, PPE and professional subscriptions.",
      "We manage your payment on account position so you are not caught short in January and July. We advise on any reliefs or claims that should be included in your return.",
      "If your gross income exceeds £50,000 from April 2026, you must comply with Making Tax Digital for Income Tax. Note that the threshold is gross income before CIS deductions, not the net amount you receive. A subcontractor receiving £48,000 after 20% deductions on £60,000 gross is tested on the £60,000 figure.",
    ],
  },
  {
    id: "limited-company",
    title: "Limited company CIS accounting and EPS reclaim",
    label: "Limited Company",
    Icon: Building2,
    body: [
      "Limited company CIS subcontractors can reclaim deductions suffered in real time via the Employer Payment Summary (EPS) process, offsetting CIS deducted against PAYE and CIS liabilities each month rather than waiting for the annual Corporation Tax return.",
      "We handle annual statutory accounts, the Corporation Tax return (CT600), Companies House filings, and the monthly EPS submissions that drive real-time CIS reclaims. Corporation tax at 19% applies to profits up to £50,000 (small profits rate), rising through a marginal relief band to 25% on profits over £250,000.",
      "For limited company directors in construction, dividend extraction is also relevant. Dividend tax rates from 6 April 2026 are 10.75% (basic), 35.75% (higher) and 39.35% (additional) following the Finance Act 2026 changes.",
    ],
  },
  {
    id: "cis300-returns",
    title: "CIS300 contractor returns and nil returns",
    label: "Contractor Returns",
    Icon: ClipboardList,
    body: [
      "Main contractors must file a CIS300 monthly return by the 19th of the following tax month, reporting payments to subcontractors and the deductions made. Payment of deducted CIS to HMRC is due by the 22nd (electronic) or 19th (cheque).",
      "From 6 April 2026, nil returns are mandatory for any month in which no payments are made to subcontractors. This obligation was removed in 2015 and reinstated from April 2026. The penalty ladder starts at £100 for one day late, rising to £200 at two months and £300 or 5% of liability at six months.",
      "We file every CIS300 return on time, manage nil returns for inactive months, and verify subcontractor status with HMRC before each payment. We also handle the new due diligence steps required to protect GPS status: subcontractor re-verification, Companies House legitimacy checks and bank account name verification.",
    ],
  },
  {
    id: "vat-mtd",
    title: "VAT domestic reverse charge and MTD ITSA",
    label: "VAT and MTD",
    Icon: Receipt,
  body: [
      "The VAT domestic reverse charge (DRC) applies to CIS services where both supplier and customer are VAT-registered and CIS-registered, and the customer is not the end user. Under the DRC the customer (not the supplier) accounts for the VAT to HMRC. This applies to standard-rated and reduced-rated supplies only: new-build housing is zero-rated and outside the DRC.",
      "The end-user exception is widely misunderstood. Property owners, tenants and developers building for their own use are end users: normal VAT rules apply to supplies made to them. We advise on whether the DRC applies to your specific contracts and help you invoice correctly.",
      "Making Tax Digital for Income Tax requires sole traders and partnerships with gross income over £50,000 to file quarterly digital updates from April 2026 (£30,000 from April 2027). We prepare MTD-compatible records and manage quarterly submissions.",
    ],
  },
  {
    id: "expenses",
    title: "Construction expenses and capital allowances",
    label: "Expenses",
    Icon: Calculator,
    body: [
      "The allowable expenses for CIS subcontractors include mileage at 55p per mile for the first 10,000 miles from 6 April 2026 (25p thereafter), tools and equipment via capital allowances, van running costs (fuel, insurance, road tax, servicing and finance charges), PPE, professional subscriptions and training directly relevant to your trade.",
      "Capital allowances let you deduct the cost of qualifying plant and machinery in the year of purchase. The Annual Investment Allowance provides 100% deduction for up to £1 million of qualifying expenditure per year. This covers tools, equipment and commercial vehicles.",
      "We review your expense position each year to ensure everything you are entitled to claim is included. Many subcontractors filing their own returns leave real money on the table through missed claims.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">What we do</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            CIS accounting services for subcontractors and contractors.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Every service is built around how CIS works in practice. We do not offer general accountancy services to non-construction clients.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.Icon;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-orange-500 transition-all"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-orange-500">
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="section-label">{service.label}</div>
                      <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-3 border-t border-neutral-100 pt-5">
                    {service.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to talk through your CIS position?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Book a free introductory call. We will review your deduction history and tell you plainly what you are owed and how we would handle it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Book a free call
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-orange-500 underline-offset-4 hover:text-neutral-900 transition-colors ${focusRing}`}
            >
              Get in touch
            </Link>
          </div>
          <p className="mt-10 text-sm text-neutral-500">
            We work with all construction trades.{" "}
            <Link href="/for" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              See the trades we cover
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
