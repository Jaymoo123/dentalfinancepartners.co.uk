import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Accountants for Creative Agencies | ${siteConfig.name}`,
  description: `Specialist accounting and tax advice for creative agency founders. Salary and dividend planning, incorporation, R&D credits and exit planning for UK and UAE creative agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/creative-agencies` },
  openGraph: {
    title: `Accountants for Creative Agencies`,
    description: `Specialist tax and accounting for creative agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/creative-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "How are creative agencies valued on sale?",
    a: "Creative agency valuations are typically 4–7x EBITDA. Key value drivers include recurring retainer revenue, low client concentration (no single client over 20–25% of revenue), a team that is not dependent on the founder, and consistent margin improvement. Planning your exit three to five years in advance, not six months, makes a significant difference to the price you achieve.",
  },
  {
    q: "Can creative agencies use alphabet shares?",
    a: "Yes. Alphabet share structures allow a creative agency to issue different share classes to different shareholders, enabling flexible dividend allocation. This is particularly useful for partners at different tax rates or for rewarding senior team members without giving them equal economic rights. The structure must be commercially justified to survive HMRC's settlements legislation scrutiny.",
  },
  {
    q: "What accounting software do creative agencies use?",
    a: "Xero is the most widely used among growing creative agencies. It integrates well with project management and time-tracking tools, and is MTD-compatible for both VAT and the upcoming income tax requirements. QuickBooks is a strong alternative for smaller agencies. The right choice depends on your team size, project complexity and what integrations you need.",
  },
];

export default function CreativeAgenciesPage() {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Creative Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for creative agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting for creative, branding and design agency founders. From salary and dividend planning to exit preparation, built for agencies that sell creative expertise.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Creative agency finances done properly</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Creative agencies operate in a specific financial environment: project-heavy revenue, founder-dependent delivery in the early stages, significant goodwill value tied up in relationships and reputation, and an exit market that rewards recurring retainer income heavily. Getting your finances right means understanding these dynamics rather than applying generic small business accounting principles to a creative studio.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Salary, dividends and profit extraction</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We model the most tax-efficient way to pay yourself from your creative agency each year, whether through salary, dividends, pension contributions, or a combination. For agencies with multiple founders or partners, we advise on alphabet share structures that allow flexible dividend allocation between shareholders at different tax rates, designed to pass HMRC's settlements legislation scrutiny.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Exit planning for creative agency founders</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We work with creative agency founders at every stage of exit planning, from structuring the business three to five years before a sale to preparing financial due diligence documentation for an active process. Key issues include reducing founder dependency, improving EBITDA margins, increasing retainer revenue as a percentage of total revenue, and ensuring your structure is set up to access Business Asset Disposal Relief at the point of sale.
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
            { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
            { label: "PR agencies", href: "/agencies/pr-agencies" },
            { label: "Web design agencies", href: "/agencies/web-design-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your creative agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will look at your current structure, model your profit extraction and discuss your growth and exit goals.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
