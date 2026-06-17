import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./[slug]/data";

export const metadata: Metadata = {
  title: { absolute: `IR35 Glossary | ${siteConfig.name}` },
  description:
    "Plain-English definitions of IR35, off-payroll and contractor tax terms: inside vs outside IR35, CEST, SDS, umbrella companies and dividends. Verified for 2026/27.",
  alternates: { canonical: `${siteConfig.url}/glossary` },
  openGraph: {
    title: "IR35 Glossary | Contractor Tax Terms Explained",
    description:
      "Plain-English definitions for UK limited-company contractors, umbrella workers and freelancers.",
    url: `${siteConfig.url}/glossary`,
    type: "website",
  },
};

const CATEGORIES = [
  "IR35 fundamentals",
  "Status tests",
  "Off-payroll mechanics",
  "Limited company tax",
  "Umbrella and employment",
  "Expenses, VAT and compliance",
] as const;

export default function GlossaryIndexPage() {
  const entries = Object.values(GLOSSARY);

  // Group by category
  const byCategory: Record<string, typeof entries> = {};
  for (const e of entries) {
    (byCategory[e.category] ||= []).push(e);
  }

  // Use canonical order, then any uncategorised extras
  const canonicalCats = CATEGORIES.filter(
    (c) => byCategory[c] && byCategory[c].length > 0
  );
  const extraCats = Object.keys(byCategory).filter(
    (c) => !(CATEGORIES as readonly string[]).includes(c)
  );
  const categories = [...canonicalCats, ...extraCats];

  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "IR35 Glossary" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Plain English definitions
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              IR35 and contractor tax glossary
            </h1>
            <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
              {entries.length > 0
                ? `${entries.length} definitions of the terms UK limited-company contractors, umbrella workers and freelancers actually need to understand. Written by specialist contractor accountants. All figures verified for 2026/27.`
                : "Specialist contractor accountants explaining the IR35 and contractor tax terms you need to understand. Definitions being added now."}
            </p>
          </div>
        </div>
      </section>

      {/* Term listing */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            {entries.length === 0 ? (
              <div className="border border-neutral-200 bg-white p-10 text-center">
                <BookOpen className="h-10 w-10 text-cyan-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  Definitions coming soon
                </h2>
                <p className="text-neutral-600 max-w-md mx-auto">
                  We are adding plain-English IR35 and contractor tax definitions
                  now. Check back shortly, or{" "}
                  <Link
                    href="/contact"
                    className="text-cyan-700 underline hover:text-cyan-800 font-semibold"
                  >
                    book a free call
                  </Link>{" "}
                  if you have a specific question.
                </p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-200">
                    {cat}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {byCategory[cat].map((e) => (
                      <Link
                        key={e.slug}
                        href={`/glossary/${e.slug}`}
                        className="group block bg-white border border-neutral-200 p-5 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all"
                      >
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                          {e.term}
                        </h3>
                        <div className="mt-3 flex items-center text-cyan-700 font-semibold text-sm">
                          Read definition
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
