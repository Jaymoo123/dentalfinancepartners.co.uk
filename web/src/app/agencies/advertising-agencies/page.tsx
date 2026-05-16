import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Advertising Agencies | ${siteConfig.name}`,
  description: `Specialist accounting for advertising agency founders. Media buying P&L treatment, VAT on international spend, salary and dividend planning for UK and UAE advertising agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/advertising-agencies` },
  openGraph: {
    title: `Accountants for Advertising Agencies`,
    description: `Specialist tax and accounting for advertising agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/advertising-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "How should media buying appear in an advertising agency's P&L?",
    a: "Media buying that passes through the agency on behalf of clients, where you are acting as an agent rather than a principal, should typically be shown net in the P&L, not gross. Gross presentation inflates revenue and distorts your gross margin. The distinction between agent and principal affects both your accounts presentation and your VAT treatment, so it must be assessed carefully based on your contractual arrangements.",
  },
  {
    q: "Is VAT charged on media bought for clients?",
    a: "It depends on whether you are acting as agent or principal, and whether the media supplier is VAT registered. Media bought in the UK from VAT-registered suppliers carries VAT which you can recover if VAT registered. International digital media (Google, Meta, LinkedIn etc.) may involve reverse charge VAT. The rules are complex and affect your effective agency margin. We ensure your VAT accounting correctly reflects the nature of each transaction.",
  },
  {
    q: "At what revenue level should an advertising agency incorporate?",
    a: "The break-even point for incorporation depends on how much profit you retain in the business rather than extract personally. For advertising agency founders retaining £30,000–40,000 or more annually, a limited company is typically worth the setup and running costs. The key advantage is that corporation tax (19–25%) is lower than personal income tax rates (20–45%), so retained profits grow faster inside a company.",
  },
];

export default function AdvertisingAgenciesPage() {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Advertising Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for advertising agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting for advertising agency founders, including media buying P&L treatment, VAT on international spend, and profit extraction strategies for UK and UAE agencies.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">The accounting complexity of advertising agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Advertising agencies have accounting challenges that most generalist accountants handle incorrectly. The agent versus principal distinction for media buying determines whether gross or net revenue is reported. International digital media spend creates reverse charge VAT obligations. Creative production work may qualify for R&D tax credits. And the revenue mix of production fees, media commissions and retainers requires careful segmentation to understand your true profitability. We understand these nuances because we work with advertising and media agencies regularly.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">VAT for advertising agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Advertising agency VAT is more complex than most sectors. UK media purchases carry standard-rate VAT, which is recoverable if your agency is VAT registered. International media bought from platforms such as Google and Meta involves the reverse charge mechanism, where you account for VAT as both supplier and recipient. Getting this wrong results in either overclaiming or underclaiming input tax, both of which create risk at a VAT inspection. We ensure your VAT accounting is correct and your agency is not leaving money on the table.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Management accounts and profitability reporting</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Monthly management accounts for advertising agencies should separate media pass-through costs from genuine agency revenue and gross margin. This gives you a true picture of your agency's profitability rather than an inflated turnover figure that includes client media budgets. We structure reporting to give you actionable insight into your actual fee income, cost of delivery and net margin per client or campaign type.
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
            { label: "Digital agencies", href: "/agencies/digital-agencies" },
            { label: "PR agencies", href: "/agencies/pr-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your advertising agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your media buying P&L treatment, VAT position and profit extraction strategy.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
