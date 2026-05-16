import Link from "next/link";
import { Check, X, BadgeCheck, ClipboardCheck, ScaleIcon } from "lucide-react";
import { siteContainerLg, btnPrimary, btnSecondary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";

export type ComparisonRow = {
  feature: string;
  competitor: string | boolean;
  us: string | boolean;
  notes?: string;
};

export type Comparison = {
  slug: string;
  competitorName: string; // e.g. "Mazuma", "Crunch", "Generalist accountants"
  pageTitle: string;
  intro: string;
  whoIsRightFor: {
    competitor: { audience: string; whenToChoose: string[] };
    us: { audience: string; whenToChoose: string[] };
  };
  comparisonTable: ComparisonRow[];
  honestyParagraph: string;
  faqs: { q: string; a: string }[];
};

type Props = { data: Comparison };

const renderCell = (v: string | boolean) => {
  if (v === true) return <Check className="h-5 w-5 text-emerald-600" aria-label="Yes" />;
  if (v === false) return <X className="h-5 w-5 text-slate-400" aria-label="No" />;
  return <span className="text-sm text-slate-700">{v}</span>;
};

export function ComparisonLayout({ data }: Props) {
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

      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: data.pageTitle },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <ScaleIcon className="h-3.5 w-3.5" />
              Honest comparison
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {data.pageTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">{data.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-50 border-l-4 border-indigo-600 p-6 mb-12">
              <p className="text-base text-slate-700 leading-relaxed">{data.honestyParagraph}</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6">Side-by-side</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-900 bg-slate-50">Feature</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-900 bg-slate-50">{data.competitorName}</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-indigo-900 bg-indigo-50">Agency Founder Finance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonTable.map((row, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="py-3 px-4 text-sm font-semibold text-slate-900">{row.feature}</td>
                      <td className="py-3 px-4">{renderCell(row.competitor)}</td>
                      <td className="py-3 px-4 bg-indigo-50/30">{renderCell(row.us)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">{data.competitorName} is the right choice if</h3>
                <p className="mt-2 text-sm text-slate-600">{data.whoIsRightFor.competitor.audience}</p>
                <ul className="mt-5 space-y-3">
                  {data.whoIsRightFor.competitor.whenToChoose.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-600 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-indigo-900">We're the right choice if</h3>
                <p className="mt-2 text-sm text-slate-700">{data.whoIsRightFor.us.audience}</p>
                <ul className="mt-5 space-y-3">
                  {data.whoIsRightFor.us.whenToChoose.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-900">
                      <BadgeCheck className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span><strong>{item}</strong></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-8 text-center">
              Common questions
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

      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 border-2 border-indigo-600/20 p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Free 60-min health check
                </div>
                <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">
                  Not sure which is right for you?
                </h2>
                <p className="mt-3 text-base sm:text-lg text-slate-700">
                  Book a free 60-minute call. We'll honestly tell you whether we're a good fit. If we're not, we'll point you somewhere that is.
                </p>
              </div>
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-center">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <BadgeCheck className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
            <p className="text-slate-300 text-sm mb-4">Want to read more first?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/fundamentals" className={btnPrimary}>Pillar guides</Link>
              <Link href="/free-health-check" className={`${btnSecondary} border-white text-white hover:bg-white/10`}>Free health check</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
