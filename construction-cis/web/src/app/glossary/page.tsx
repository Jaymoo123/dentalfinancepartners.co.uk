import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { GLOSSARY } from "./[slug]/data";

export const metadata: Metadata = {
  title: `CIS Glossary`,
  description:
    "Plain-English definitions of CIS, tax and construction accounting terms. Deduction rates, gross payment status, self assessment, VAT and more. Updated for 2026/27.",
  alternates: { canonical: `${siteConfig.url}/glossary` },
  openGraph: {
    title: "CIS Glossary | Construction Tax Terms Explained",
    description:
      "Plain-English definitions for UK construction subcontractors and contractors.",
    url: `${siteConfig.url}/glossary`,
    type: "website",
  },
};

const CATEGORIES = [
  "CIS fundamentals",
  "Deductions and rates",
  "Returns and compliance",
  "Refunds and repayments",
  "Business structures",
  "VAT and MTD",
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
              { label: "CIS Glossary" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 font-geist-mono text-xs font-medium uppercase tracking-[0.1em] text-orange-400">
              <BookOpen className="h-3.5 w-3.5" />
              Plain English definitions
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              CIS and construction tax glossary
            </h1>
            <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
              {entries.length > 0
                ? `${entries.length} definitions of the terms UK construction subcontractors and contractors actually need to understand. Written by specialist CIS accountants. All figures updated for 2026/27.`
                : "Specialist CIS accountants explaining the terms UK construction subcontractors and contractors need to understand. Definitions being added now."}
            </p>
          </div>
        </div>
      </section>

      {/* Term listing */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div>
            {entries.length === 0 ? (
              <div className="border border-neutral-200 bg-white p-10 text-center">
                <BookOpen className="h-10 w-10 text-orange-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  Definitions coming soon
                </h2>
                <p className="text-neutral-600 max-w-md mx-auto">
                  We are adding plain-English CIS and construction tax
                  definitions now. If you have a specific question, you can{" "}
                  <Link
                    href="/contact"
                    className="text-orange-700 underline hover:text-orange-800 font-semibold"
                  >
                    book a free call
                  </Link>{" "}
                  and ask us directly.
                </p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat} className="mb-12 last:mb-0">
                  <p className="font-geist-mono text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
                    {byCategory[cat].length} definitions
                  </p>
                  <h2 className="mt-2 mb-6 text-2xl font-bold text-neutral-900">
                    {cat}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {byCategory[cat].map((e) => (
                      <Link
                        key={e.slug}
                        href={`/glossary/${e.slug}`}
                        className="group block rounded-xl bg-white border border-slate-200 p-5 hover:border-orange-500 hover:shadow-md transition-all"
                      >
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">
                          {e.term}
                        </h3>
                        <div className="mt-3 flex items-center text-orange-700 font-semibold text-sm">
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

      {/* Section D.3 closing ask. `contained` so the last band under <main> is
          light (cream), never navy against the navy footer: DESIGN_SYSTEM
          section 9. Static band in the page body, nothing interruptive. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          title="Looked up the term, still not sure where you stand?"
          description="A definition tells you what a rule is. It does not tell you what it does to your figures. Tell us where you are up to and we will tell you what it means for your CIS position this year."
          proofPoints={[
            {
              title: "CIS specialists only",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "Fees agreed before any work starts",
              detail: "The specialist firm you speak to sets its own fee and agrees it with you up front.",
            },
            {
              title: "No hard sell, no obligation",
              detail: "If your position is already right, we will say so.",
            },
          ]}
        />
      </div>
    </>
  );
}
