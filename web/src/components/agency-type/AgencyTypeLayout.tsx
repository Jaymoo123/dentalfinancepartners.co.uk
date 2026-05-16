import Link from "next/link";
import type { ReactNode } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export type AgencyTypeProps = {
  slug: string;
  title: string;
  hero: string;
  sections: { heading: string; body: ReactNode }[];
  faqs: { q: string; a: string }[];
  relatedTypes: { label: string; href: string }[];
  ctaHeading?: string;
};

export function AgencyTypeLayout({
  slug,
  title,
  hero,
  sections,
  faqs,
  relatedTypes,
  ctaHeading,
}: AgencyTypeProps) {
  return (
    <div className={`${siteContainerLg} py-12`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Agencies", href: "/agencies" },
          { label: title },
        ]}
      />

      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {title}
        </h1>
        <p className="text-xl text-slate-600">{hero}</p>
      </header>

      <div className="mt-8 space-y-8 max-w-4xl">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{s.heading}</h2>
            <div className="text-base leading-relaxed text-slate-600 space-y-4">{s.body}</div>
          </section>
        ))}
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
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Related agency types</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {relatedTypes.map((link) => (
            <Link key={link.href} href={link.href} className="text-indigo-600 hover:text-indigo-700 font-medium">
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 border-2 border-indigo-600/20 bg-indigo-50 p-8 sm:p-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">
          {ctaHeading || `Get specialist accounting for your ${title.toLowerCase().replace("accountants for ", "")}`}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Book a free call. We will review your current setup and show you where you can save tax and get better visibility of your numbers.
        </p>
        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />
    </div>
  );
}
