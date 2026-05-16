import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BadgeCheck, ClipboardCheck } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";

export type AudienceStage = {
  slug: string;
  stage: string;          // "new-founders", "growth-stage", "pre-exit"
  displayStage: string;   // "New founders", "Growth-stage founders", etc.
  badge: string;          // "Pre-incorporation to first year", etc.
  heroImage: string;
  heroAlt: string;
  intro: string;
  stats: { value: string; label: string }[];
  concerns: { icon: LucideIcon; title: string; body: string }[];
  services: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

type Props = { data: AudienceStage };

export function AudienceStageLayout({ data }: Props) {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative h-[440px] sm:h-[500px] overflow-hidden">
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
                { label: `For ${data.displayStage.toLowerCase()}` },
              ]}
            />
            <div className="mt-6 inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              {data.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              For <span className="text-indigo-400">{data.displayStage.toLowerCase()}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-2xl">{data.intro}</p>
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
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What we hear from {data.displayStage.toLowerCase()}</h2>
              <p className="mt-4 text-lg text-slate-600">
                The questions and concerns that come up most often in the first conversation.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.concerns.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="bg-slate-50 border border-slate-200 p-6 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all">
                    <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-8">
              How we work with {data.displayStage.toLowerCase()}
            </h2>
            <div className="space-y-6">
              {data.services.map((s, i) => (
                <div key={s.title} className="flex gap-5 bg-white border-l-4 border-indigo-600 p-6">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 text-white font-mono font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-base text-slate-700 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 border-2 border-indigo-600/20 p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Free 60-min agency finance health check
                </div>
                <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">{data.ctaTitle}</h2>
                <p className="mt-3 text-base sm:text-lg text-slate-700">
                  60 minutes with an ICAEW qualified accountant. Tailored to where you are now. No obligation.
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Book my free health check" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-8 text-center">
              Common questions from {data.displayStage.toLowerCase()}
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

      <section className="bg-slate-900 py-12 text-center">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <BadgeCheck className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Want to read first?</h2>
            <p className="mt-3 text-slate-300 text-sm">
              Our pillar guides cover the fundamentals in depth.
            </p>
            <Link href="/fundamentals" className={`${btnPrimary} mt-5`}>
              Browse the guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
