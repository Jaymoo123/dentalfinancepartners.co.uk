import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BadgeCheck, ClipboardCheck, Compass } from "lucide-react";
import { siteContainerLg, btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";

export type RelocationDestination = {
  slug: string;
  country: string;
  shortName: string; // e.g. "Portugal", "Cyprus"
  heroImage: string; // remote URL
  heroAlt: string;
  intro: string; // 1-2 sentence intro
  badges: string[]; // e.g. ["NHR 2.0", "Non-dom status", "EU resident"]
  stats: { value: string; label: string }[]; // 4 stats
  subcategories: { icon: LucideIcon; title: string; body: string }[]; // 6 subcategory cards
  consultation: { title: string; instructionHint: string }; // CTA text
  faqs: { q: string; a: string }[];
};

type Props = {
  data: RelocationDestination;
};

export function RelocationLayout({ data }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `UK to ${data.country} Relocation Financial Planning for Agency Founders`,
    provider: {
      "@type": "Organization",
      name: "Agency Founder Finance",
    },
    serviceType: "Cross-border tax and financial advisory",
    description: `Specialist UK and ${data.country} financial planning for agency founders relocating from the UK.`,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: data.country },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqJsonLd]) }} />

      <section className="relative h-[480px] sm:h-[540px] overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-end pb-12 sm:pb-16`}>
          <div className="max-w-3xl">
            <Breadcrumb
              variant="light"
              items={[
                { label: "Home", href: "/" },
                { label: `${data.shortName} Relocation` },
              ]}
            />
            <div className="mt-6 inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Compass className="h-3.5 w-3.5" />
              UK + {data.shortName} specialist
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              UK agency founder <span className="text-indigo-400">relocating to {data.country}?</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-2xl">{data.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <Link href="#consultation" className={`${btnPrimary} text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4`}>
                Book a relocation consultation
              </Link>
              <Link href="/blog/international-agencies" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4`}>
                Read the articles
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {data.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1 text-slate-200">
                  <BadgeCheck className="h-3 w-3 text-indigo-300" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-700 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{s.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we cover</h2>
              <p className="mt-4 text-lg text-slate-600">
                Six areas where a UK agency founder relocating to {data.country} needs joined-up, specialist advice.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.subcategories.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="bg-slate-50 border border-slate-200 p-6 sm:p-7 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all">
                    <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 border-2 border-indigo-600/20 p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Free 90-min relocation consultation
                </div>
                <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">{data.consultation.title}</h2>
                <p className="mt-3 text-base sm:text-lg text-slate-700">
                  90 minutes with an ICAEW qualified accountant. We map your UK exit position, your {data.shortName} setup options, and your agency's structure. You leave with a written plan. No obligation.
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Book my relocation consultation" />
              <p className="mt-4 text-xs text-slate-500 text-center">{data.consultation.instructionHint}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {data.faqs.map((f) => (
                <div key={f.q} className="bg-white border-l-4 border-slate-300 hover:border-indigo-600 transition-all p-6">
                  <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                  <p className="mt-3 text-base text-slate-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto text-center">
            <BadgeCheck className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Want the full picture first?
            </h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
              We are building a library of articles on every facet of UK relocation for agency founders.
            </p>
            <Link
              href="/blog/international-agencies"
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 font-bold transition-colors"
            >
              Browse the articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
