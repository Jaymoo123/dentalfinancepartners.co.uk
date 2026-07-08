import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Accountants for Recruitment Agencies | ${siteConfig.name}`,
  description: `Specialist accounting for recruitment agency founders. Salary and dividend planning, management accounts, IR35 and VAT for UK and UAE recruitment agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/recruitment-agencies` },
  openGraph: {
    title: `Accountants for Recruitment Agencies`,
    description: `Specialist tax and accounting for recruitment agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/recruitment-agencies`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl }],
  },
};

const faqs = [
  {
    q: "Is VAT charged on recruitment fees?",
    a: "Yes. Recruitment fees for permanent placements and temporary staffing margins are standard-rated for VAT purposes. If your recruitment agency is VAT registered (or should be), all fees charged to clients carry VAT. If you are supplying temporary workers, the VAT treatment depends on whether you are supplying staff or providing a managed service. The distinction matters for VAT accounting and your effective margin.",
  },
  {
    q: "How do recruitment agencies account for temporary worker payroll?",
    a: "If your recruitment agency employs temporary workers and pays them through your payroll before billing the client, your gross revenue includes the contractor margin plus the worker's pay. This inflates turnover significantly, but your actual gross profit is only the margin. Management accounts must separate these clearly. Many recruitment agencies prefer to use a payroll bureau or umbrella arrangement to remove the worker payroll from their own books.",
  },
  {
    q: "Should a recruitment agency founder incorporate?",
    a: "If you are consistently retaining profit above your personal drawings, typically £30,000–40,000 per year, a limited company is likely worthwhile. Recruitment agency founders sometimes delay incorporation because the gross revenue figures are large, making the business appear very profitable, but the actual net profit retained is modest. We model the break-even with your actual numbers before recommending.",
  },
];

export default function RecruitmentAgenciesPage() {
  const service = buildService({
    name: "Accountants for recruitment agencies",
    description: metadata.description as string,
    url: "/agencies/recruitment-agencies",
    serviceType: "Accountants for recruitment and talent agencies",
    areaServed: "United Kingdom",
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <div className={`${siteContainerLg} py-12`}>
      <JsonLd data={faqPage ? [service, faqPage] : [service]} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Recruitment Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for recruitment agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting for recruitment agency founders, including temporary worker payroll accounting, VAT on placement fees and profit extraction across the UK and UAE.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Recruitment agency accounting: high turnover, thin margins</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Recruitment agencies often have turnover figures that significantly overstate the financial health of the business, particularly those placing temporary workers where the worker's pay passes through the agency's books. Understanding the difference between gross billings and net margin is essential for making sound financial decisions. A recruitment agency turning over £2m but making £200k net margin operates very differently from a marketing agency with the same profit on £600k revenue. We ensure your reporting tells the right story.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">VAT for recruitment agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Permanent placement fees and temporary staffing margins are standard-rated for VAT. If your agency places candidates who later become employees of the client, the fee is subject to VAT at 20%. Temporary staffing arrangements, where your agency employs or engages workers and supplies them to clients, are also VAT rated. Getting VAT right from the start avoids significant liabilities at inspection. We ensure your VAT accounting reflects the nature of each placement type.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Salary, dividends and profit extraction</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We model the optimal way to pay yourself from your recruitment agency each year, factoring in salary, dividends, pension contributions and your marginal tax rate. For recruitment agency founders with multiple shareholders or co-founders, we also advise on alphabet share structures that allow flexible dividend allocation between shareholders at different tax rates.
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
            { label: "Creative agencies", href: "/agencies/creative-agencies" },
            { label: "PR agencies", href: "/agencies/pr-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your recruitment agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your VAT position, payroll structure and profit extraction strategy.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
