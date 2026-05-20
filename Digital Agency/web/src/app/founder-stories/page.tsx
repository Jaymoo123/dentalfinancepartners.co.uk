import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, ShieldAlert } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { STORIES } from "./[slug]/data";

export const metadata: Metadata = {
  title: `Founder Stories | ${siteConfig.name}`,
  description:
    "Composite case studies based on patterns across our UK and UAE agency clients. Real financial mechanics, anonymised subjects. BADR exits, R&D claims, incorporation, IR35, relocation.",
  alternates: { canonical: `${siteConfig.url}/founder-stories` },
  openGraph: {
    title: "Founder Stories | Composite Agency Case Studies",
    description: "Real financial decisions, anonymised subjects.",
    url: `${siteConfig.url}/founder-stories`,
    type: "website",
  },
};

export default function FounderStoriesIndexPage() {
  const stories = Object.values(STORIES);

  return (
    <>
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Founder Stories" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <Users className="h-3.5 w-3.5" />
              Composite case studies
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Agency founder stories
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              {stories.length} composite case studies showing how UK and UAE agency founders have approached the financial decisions we see most often: BADR exits, R&D claims, incorporation timing, IR35, relocation.
            </p>

            <div className="mt-6 inline-flex items-start gap-2 bg-amber-500/10 border border-amber-500/40 px-4 py-3 text-sm text-amber-100">
              <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-amber-200">A note on these stories:</strong> they are composites based on patterns across our agency clients. Names, locations and specific figures have been anonymised. The financial mechanics and tax treatment are real and reflect current 2025/26 UK rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <Link
                key={s.slug}
                href={`/founder-stories/${s.slug}`}
                className="group block bg-slate-50 border border-slate-200 p-6 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  {s.agency_type} · {s.stage}
                </p>
                <h2 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  <strong className="text-slate-900">Outcome:</strong> {s.outcome}
                </p>
                <div className="mt-4 flex items-center text-indigo-600 font-semibold text-sm">
                  Read the story
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
