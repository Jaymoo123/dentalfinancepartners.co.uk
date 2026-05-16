import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for SEO and PPC Agencies | ${siteConfig.name}`,
  description: `Specialist accounting for SEO and PPC agency founders. Salary and dividend planning, management accounts and incorporation advice for UK and UAE search marketing agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/seo-agencies` },
  openGraph: {
    title: `Accountants for SEO and PPC Agencies`,
    description: `Specialist tax and accounting for SEO and PPC agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/seo-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "How should PPC agencies account for client ad spend?",
    a: "If your PPC agency manages client ad spend directly through your own accounts, paying platforms and charging the client, you need to determine whether you are acting as agent or principal. Acting as agent means showing only your management fee as revenue (net presentation). Acting as principal means showing the full ad spend as revenue and cost. The distinction has significant VAT and accounts presentation implications, and depends on who bears the commercial risk of the spend.",
  },
  {
    q: "Do SEO agencies qualify for R&D tax credits?",
    a: "SEO agencies developing proprietary tools, algorithms or technology, rather than providing standard SEO service delivery, may qualify for R&D tax credits. Pure campaign management and link building does not qualify, but building novel ranking tools, crawlers, content analysis platforms or AI-driven SEO software may. If your agency has a technology development component, we will assess it.",
  },
  {
    q: "What is the most tax-efficient way to pay myself as an SEO agency founder?",
    a: "The standard approach for limited company founders is a salary to the National Insurance primary threshold (£12,570 in 2025/26) and dividends for the remainder. Employer pension contributions from the company are often more efficient for higher earners. The exact optimal split depends on your total income, other sources of income, and any pension contributions. We model this individually each year.",
  },
];

export default function SeoAgenciesPage() {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "SEO & PPC Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for SEO and PPC agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting for SEO, PPC and search marketing agency founders, including ad spend accounting, R&D credits and profit extraction across the UK and UAE.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">SEO and PPC agency accounting done properly</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Search marketing agencies have accounting nuances that generalists handle incorrectly. The treatment of client ad spend, whether gross or net in the P&L, affects your revenue, VAT position and margin presentation. SEO agencies with technology development components may have R&D tax credit opportunities. And the typical retainer-plus-ad-management model creates a mix of revenue types that needs careful accounting to show you a true picture of profitability.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ad spend pass-through accounting</h2>
          <p className="text-base leading-relaxed text-slate-600">
            The agent versus principal question for PPC agencies handling client ad budgets is one of the most common accounting issues we see. Where you are acting as agent, managing spend on behalf of the client with no commercial risk, the ad spend should not appear as your revenue. Where you are acting as principal, buying media and reselling it, it does. Getting this wrong inflates your turnover artificially and can create VAT complications. We ensure your accounts correctly reflect your role in each client relationship.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Management accounts for search agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Monthly management accounts for SEO and PPC agencies should show net fee revenue (excluding pass-through ad spend), gross margin by client, team utilisation and cash flow. This gives you a clear view of your actual agency economics, and is also what a buyer will want to see in due diligence if you are ever considering a sale. We set up the right reporting from the start.
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
            { label: "Digital agencies", href: "/agencies/digital-agencies" },
            { label: "Web design agencies", href: "/agencies/web-design-agencies" },
            { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your SEO or PPC agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your ad spend accounting, assess R&D potential and model your salary and dividend strategy.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
