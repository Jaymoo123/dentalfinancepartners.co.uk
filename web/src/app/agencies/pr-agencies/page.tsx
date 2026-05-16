import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for PR Agencies | ${siteConfig.name}`,
  description: `Specialist accounting and tax advice for PR and communications agency founders. Salary and dividend planning, incorporation and exit planning for UK and UAE PR agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/pr-agencies` },
  openGraph: {
    title: `Accountants for PR Agencies`,
    description: `Specialist tax and accounting for PR and communications agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/pr-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "What profit margins should a PR agency be achieving?",
    a: "PR agencies typically run net profit margins of 15–25%. People are the primary cost in a PR agency, so gross margin is heavily influenced by how efficiently your team is utilised and priced. Agencies with strong retainer income and disciplined scope management tend to sit at the higher end. If your margins are consistently below 15%, there is usually a pricing or cost structure issue worth diagnosing.",
  },
  {
    q: "Is it worth setting up a holding company for a PR agency?",
    a: "A holding company structure makes sense when you want to accumulate profits from your PR agency without personal tax leakage, whether for reinvestment, acquisition or future disposal. It also provides legal separation between the trading risk of your agency and retained cash. Many PR founders set up a holding company before bringing in co-founders, investors or making acquisitions. We model whether it makes sense for your specific situation.",
  },
  {
    q: "How do PR agencies handle freelancers and IR35?",
    a: "PR agencies commonly use freelance writers, strategists and campaign managers. If your agency is a small business, the IR35 off-payroll determination duty falls on the individual contractor's company rather than on you as the engager. However, you still need to ensure you are not treating self-employed freelancers like employees in practice, as HMRC investigates worker misclassification separately from IR35.",
  },
];

export default function PrAgenciesPage() {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "PR Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for PR agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting and tax advice for PR and communications agency founders, from salary and dividend planning to exit preparation across the UK and UAE.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">PR agency finance: people-heavy, relationship-driven</h2>
          <p className="text-base leading-relaxed text-slate-600">
            PR agencies are among the most people-intensive businesses to run financially. Your margins depend almost entirely on how well your team is utilised and how efficiently you price retainers. Your value at exit depends heavily on client concentration, founder dependency and the stability of your retainer book. And your salary and dividend structure as a founder significantly affects how much of the agency's profit you actually keep. We understand PR agency economics and work with founders at every stage.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Salary, dividends and pension contributions</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Most PR agency founders operating through a limited company take a salary to the National Insurance primary threshold and draw the balance as dividends. For higher-earning founders, employer pension contributions from the company can be significantly more tax-efficient than dividends, reducing corporation tax and NIC while building a pension fund. We model the optimal extraction strategy for your personal position throughout the year, not just at year end.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Management accounts and client profitability</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Understanding which clients are profitable and which are not is essential for a PR agency with a retainer book. We set up management accounts that track gross margin by client, fee income versus contracted scope, and team utilisation, giving you the visibility to have difficult conversations with underperforming clients and focus growth on your most profitable relationships.
          </p>
        </section>
      </div>

      <section className="mt-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-slate-50 border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
            { label: "Creative agencies", href: "/agencies/creative-agencies" },
            { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
            { label: "Digital agencies", href: "/agencies/digital-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your PR agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your current structure, model your profit extraction and discuss your growth and exit goals.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
