import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { contractorTypes } from "@/data/contractor-types";

export const metadata: Metadata = {
  title: "Contractor Types We Work With | Specialist IR35 Accountants",
  description:
    "Specialist contractor accounting across every sector: IT, engineering, finance, consulting, NHS locums, oil and gas, legal, marketing and construction.",
};

export default function ForIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Who we work with</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Specialist contractor accounting for every sector.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            IR35, limited company tax and contractor finances work differently across sectors. We know the specific challenges, working patterns and risk factors that apply to your type of contracting, not just the generic rules.
          </p>
        </div>
      </section>

      {/* Contractor type grid */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {contractorTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-5 sm:p-6 transition-all hover:bg-cyan-700/20 hover:border-cyan-400/40"
              >
                <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {type.title}
                </span>
                <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-2">
                  {type.intro.split(".")[0]}.
                </p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why specialist */}
      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Why sector knowledge matters</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              IR35 works differently across sectors.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                The same IR35 tests (control, substitution, mutuality of obligation) apply to every contractor. But how they play out depends entirely on how contracting actually works in your sector. A platform developer embedded in a bank&apos;s engineering team faces different exposure than an offshore drilling engineer on a North Sea rotation. A locum solicitor covering maternity leave is in a different position from an interim CFO filling a vacant executive seat.
              </p>
              <p>
                Generalist accountants apply the IR35 rules correctly in theory but miss the sector-specific working practice details that determine whether the position holds in practice. We know those details because we work with contractors across all of these sectors week in, week out.
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
    </>
  );
}
