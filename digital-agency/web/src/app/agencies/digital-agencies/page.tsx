import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Accountants for Digital Agencies | ${siteConfig.name}`,
  description: `Specialist accounting and tax advice for digital agency founders. R&D tax credits, IR35, salary and dividend planning for UK and UAE digital agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/digital-agencies` },
  openGraph: {
    title: `Accountants for Digital Agencies`,
    description: `Specialist tax and accounting for digital agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/digital-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "Can digital agencies claim R&D tax credits?",
    a: "Yes. Digital agencies developing proprietary software, tools, platforms or AI-driven processes often qualify for R&D tax credits under HMRC's merged scheme. The key test is whether the work advances the field scientifically or technologically, not whether the output is software. We assess eligibility and handle the technical and financial documentation.",
  },
  {
    q: "How do IR35 rules affect digital agencies?",
    a: "Digital agencies typically engage a mix of freelancers and employees. If your agency is a medium or large business (two of: turnover over £10.2m, balance sheet over £5.1m, 50+ employees), you must carry out status determinations for contractors you engage. Smaller agencies are exempt from this duty, but must still ensure their own founder's company is correctly assessed if contracting to large clients.",
  },
  {
    q: "Should a digital agency founder incorporate?",
    a: "If you are consistently generating profit above your personal drawings, typically around £30,000–40,000 retained annually, a limited company is likely more tax-efficient. Digital agency founders often benefit significantly from incorporating early because they can retain profits for reinvestment or future extraction at lower rates. We model this with your actual numbers.",
  },
];

export default function DigitalAgenciesPage() {
  const service = buildService({
    name: "Accountants for digital agencies",
    description: metadata.description as string,
    url: "/agencies/digital-agencies",
    serviceType: "Accountants for digital agencies",
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
          { label: "Digital Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for digital agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting and tax advice for digital agency founders, covering management accounts and R&D credits through to IR35, incorporation and exit planning across the UK and UAE.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Digital agencies and R&D tax credits</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Digital agencies are among the most frequent claimants for R&D tax credits, yet many do not know they qualify. If your agency is building proprietary technology, developing novel software, creating AI-powered tools or solving technically challenging problems that go beyond normal professional practice, you may have a substantial R&D claim. The merged R&D scheme (from April 2024) provides a 20% above-the-line credit that directly reduces your corporation tax liability. We identify qualifying activity and prepare the technical and cost documentation.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">IR35 and contractor structures in digital agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Digital agencies routinely work with freelance developers, designers and strategists. Understanding whether these engagements are inside or outside IR35, and whether your agency carries the off-payroll working determination duty, is essential to avoid unexpected PAYE and NIC liabilities. We review your contractor arrangements, advise on contract structure, and prepare Status Determination Statements where required.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Management accounts for digital agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We produce monthly or quarterly management accounts tailored to digital agency economics, tracking gross margin by client or project, utilisation, revenue per head and cash conversion. For founders approaching an exit, we also help improve the financial story: EBITDA margins, recurring revenue percentage and working capital management all affect your valuation multiple.
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
            { label: "Web design agencies", href: "/agencies/web-design-agencies" },
            { label: "SEO & PPC agencies", href: "/agencies/seo-agencies" },
            { label: "Creative agencies", href: "/agencies/creative-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your digital agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will assess your R&D potential, review your contractor arrangements and model your salary and dividend strategy.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
