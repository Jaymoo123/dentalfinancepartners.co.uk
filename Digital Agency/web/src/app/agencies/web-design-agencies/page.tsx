import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Accountants for Web Design Agencies | ${siteConfig.name}`,
  description: `Specialist accounting for web design and development agency founders. R&D tax credits, IR35, salary and dividend planning for UK and UAE web agencies.`,
  alternates: { canonical: `${siteConfig.url}/agencies/web-design-agencies` },
  openGraph: {
    title: `Accountants for Web Design Agencies`,
    description: `Specialist tax and accounting for web design and development agency founders across the UK and UAE.`,
    url: `${siteConfig.url}/agencies/web-design-agencies`,
    type: "website",
  },
};

const faqs = [
  {
    q: "Do web design and development agencies qualify for R&D tax credits?",
    a: "Web development agencies that build genuinely novel or technically challenging solutions, not standard CMS builds, often qualify. R&D applies when your team is resolving technical uncertainty: developing new frameworks, building custom APIs, solving integration problems that do not have an obvious solution, or advancing AI capabilities. The work must go beyond applying standard professional techniques. We assess your projects and identify which qualify.",
  },
  {
    q: "How should a web agency account for project-based revenue?",
    a: "Revenue recognition for web design agencies depends on whether contracts are fixed price or time-and-materials. Fixed price project revenue should typically be recognised on a percentage-of-completion basis rather than all at delivery. This affects both your accounts presentation and your tax position. Retainer income is simpler, recognised monthly as earned. Getting this right prevents tax timing surprises.",
  },
  {
    q: "Should web agency founders be concerned about IR35?",
    a: "Web agency founders contracting directly to medium or large clients may be assessed under the off-payroll working rules. If the engagement looks like employment, with exclusive control and no real substitution, there is IR35 risk. Agency founders with multiple clients, genuine business risk and substitution rights are typically outside IR35. We review your engagements and advise on contract structure to support an outside determination.",
  },
];

export default function WebDesignAgenciesPage() {
  const service = buildService({
    name: "Accountants for web design agencies",
    description: metadata.description as string,
    url: "/agencies/web-design-agencies",
    serviceType: "Accountants for web design and development agencies",
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
          { label: "Web Design Agencies" },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Accountants for web design and development agencies
        </h1>
        <p className="text-xl text-slate-600">
          Specialist accounting for web design and development agency founders, including R&D tax credits, IR35 review, revenue recognition and profit extraction across the UK and UAE.
        </p>
      </header>

      <div className="mt-8 space-y-6 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">R&D tax credits for web agencies</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Web development agencies are frequent R&D claimants, and many underestimate the scope of qualifying activity. If your team is building technically novel solutions, solving problems without an obvious off-the-shelf answer, developing custom frameworks or resolving genuine technical uncertainty, that work may qualify for HMRC's R&D scheme. The merged R&D scheme (from April 2024) provides a 20% above-the-line credit. We assess your project portfolio, identify qualifying activity and prepare the technical documentation required for a robust claim.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Revenue recognition and project accounting</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Web agencies often mix fixed-price project work with ongoing retainers, and the accounting treatment differs significantly between the two. Incorrect revenue recognition on fixed-price projects creates tax timing problems and distorts your profit picture. We set up your accounting system to handle both revenue types correctly, giving you an accurate view of project profitability and making your year-end accounts reflect economic reality.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">IR35 and freelance developers</h2>
          <p className="text-base leading-relaxed text-slate-600">
            Web agencies commonly rely on freelance developers for specialist skills or capacity management. Understanding whether these engagements create IR35 obligations, either for your agency as an engager or for the freelancer's personal service company, is essential. We review your contractor arrangements and advise on contract structure that supports an outside-IR35 determination where commercially appropriate.
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
            { label: "SEO & PPC agencies", href: "/agencies/seo-agencies" },
            { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
            { label: "Creative agencies", href: "/agencies/creative-agencies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Get specialist accounting for your web agency</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will assess your R&D potential, review your IR35 exposure and model your salary and dividend strategy.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>
    </div>
  );
}
