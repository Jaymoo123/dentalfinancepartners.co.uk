import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Marketing Agencies | ${siteConfig.name}`,
  description: `Specialist accounting and tax advice for marketing agency founders. Salary and dividend planning, management accounts, IR35 and incorporation for UK and UAE marketing agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/marketing-agencies` },
  openGraph: {
    title: `Accountants for Marketing Agencies`,
    description: `Specialist tax and accounting for marketing agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/marketing-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "Do marketing agencies qualify for R&D tax credits?",
    a: "Some do. If your agency is developing proprietary marketing technology, AI-driven tools, or software that advances the field beyond what is publicly available, that work may qualify under HMRC's R&D scheme. Pure campaign work does not qualify, but technology development within an agency does.",
  },
  {
    q: "What is the optimal salary and dividend split for a marketing agency director?",
    a: "Most limited company marketing agency founders take a salary up to the NI primary threshold (£12,570 in 2025/26) and draw the remainder as dividends. The optimal split depends on your total income, other sources, pension contributions and whether you have a spouse with shares. We model this individually for each client.",
  },
  {
    q: "Should I incorporate my marketing agency?",
    a: "If you are generating consistent profit above your personal living costs, typically £30,000–40,000 retained annually, incorporation is usually worthwhile. The exact break-even depends on your profit level, personal tax position and how quickly you can use the retained tax advantage. We model this with real numbers.",
  },
];

export default function MarketingAgenciesPage() {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Marketing Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for marketing agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist tax, accounts and financial advice for marketing agency founders across the UK and UAE. We understand retainer models, contractor structures and the specific decisions that marketing agency founders face.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Marketing agency accounting that understands your business</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Marketing agencies have a specific financial profile: retainer income mixed with project work, contractor-heavy delivery models, media buying that passes through the P&L, and founders often caught between sole trader and limited company status as the business grows. A generalist accountant handles these issues once a year. We handle them every day across a client base of marketing and agency founders.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Salary, dividends and tax planning</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We model the optimal salary and dividend split for your personal situation each year, factoring in your income, pension contributions, dividend allowance and marginal rates. We also assess whether employer pension contributions from your marketing agency could be more efficient than dividends for higher earners, and identify any R&D tax credit opportunities for agencies developing proprietary marketing technology or AI-driven tools.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Management accounts for marketing agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Monthly or quarterly management accounts that track gross margin by client, revenue per head, retainer versus project revenue mix and forward cash flow. These are the metrics that matter for running a profitable marketing agency. We also model incorporation feasibility for sole trader founders with real numbers rather than generic break-even rules.
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
            { label: "Digital agencies", href: "/agencies/digital-agencies" },
            { label: "Creative agencies", href: "/agencies/creative-agencies" },
            { label: "PR agencies", href: "/agencies/pr-agencies" },
            { label: "SEO & PPC agencies", href: "/agencies/seo-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your marketing agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your current setup and show you where you can save tax and get better visibility of your numbers.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
