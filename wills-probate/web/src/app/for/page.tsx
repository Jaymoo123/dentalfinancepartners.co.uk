import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { tradeTypes } from "@/data/trade-types";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Who We Help | Estate Planning Specialists",
  description:
    "Plain-English probate, wills and inheritance tax guidance for executors, surviving spouses, blended families, business owners, pension holders and expats.",
  alternates: { canonical: `${siteConfig.url}/for` },
};

export default function ForIndexPage() {
  const tradeSegment = tradeTypes.filter((t) => t.segment === "trade");
  const businessSegment = tradeTypes.filter((t) => t.segment === "business");

  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Who we work with</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Clear probate and inheritance tax guidance, whoever you are.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Probate and inheritance tax work differently depending on your situation. We know the specific position for each audience and where the pitfalls and planning opportunities actually are.
          </p>
        </div>
      </section>

      {/* Individual trades grid */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            For individuals
          </h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-2xl">
            People dealing with probate or planning their own estate. We explain the process and point you to the right specialist help.
          </p>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tradeSegment.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-5 sm:p-6 transition-all hover:bg-orange-600/20 hover:border-orange-400/40"
              >
                <span className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {type.title}
                </span>
                <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-2">
                  {type.intro.split(".")[0]}.
                </p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business-owner segments grid, hidden when empty */}
      {businessSegment.length > 0 && (
        <section className="bg-neutral-800 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              For business owners and specific situations
            </h2>
            <p className="text-neutral-400 text-sm mb-8 max-w-2xl">
              Business owners planning succession, pension holders affected by the 2027 changes, and expats with cross-border estates.
            </p>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {businessSegment.map((type) => (
                <Link
                  key={type.slug}
                  href={`/for/${type.slug}`}
                  className="group block bg-white/5 border border-white/10 p-5 sm:p-6 transition-all hover:bg-orange-600/20 hover:border-orange-400/40"
                >
                  <span className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                    {type.title}
                  </span>
                  <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-2">
                    {type.intro.split(".")[0]}.
                  </p>
                  <ArrowRight className="mt-3 h-4 w-4 text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why trade knowledge matters */}
      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Why situation matters</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Probate and inheritance tax work differently depending on your situation.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                The same probate process applies to every estate, but how it plays out depends on the family situation, the size and type of the estate, and whether inheritance tax is due. A surviving spouse has different reliefs available to a business owner. A blended family needs different will planning to a straightforward estate.
              </p>
              <p>
                We explain the general position for each situation in plain English, and take the money side ourselves when the estate needs more than a guide.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/contact" className={btnPrimary}>
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing ask. Added 2026-09-28 (estate parity phase 0): this page rendered
          no capture surface at all, so the only route off it was a link. Same
          anatomy as /probate's closing block, not a new pattern. */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">Your situation, not a category.</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">None of these pages will match your estate exactly. Tell us the parts that do not fit, and one of our accountants will tell you what the money side actually requires in your case.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">Tell us about the estate</h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
