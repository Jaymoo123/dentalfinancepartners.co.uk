import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { tradeTypes } from "@/data/trade-types";

export const metadata: Metadata = {
  title: "CIS Trades We Work With | Specialist Construction Accountants",
  description:
    "Specialist CIS accounting for every construction trade. Plumbers, electricians, joiners, groundworkers, roofers, builders, gas engineers, painters, scaffolders and civil engineers.",
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
            Specialist CIS accounting for every construction trade.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            CIS works differently across trades. Materials costs, professional registration fees and equipment allowances all vary. We know the specific position for each trade and where the refund opportunities and compliance risks actually are.
          </p>
        </div>
      </section>

      {/* Individual trades grid */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            For individual trades
          </h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-2xl">
            Self-employed subcontractors and sole traders working under CIS. We handle CIS refunds, gross payment status applications and Self Assessment for every trade that falls within the scheme.
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

      {/* Construction businesses grid — hidden when empty */}
      {businessSegment.length > 0 && (
        <section className="bg-neutral-800 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              For construction businesses
            </h2>
            <p className="text-neutral-400 text-sm mb-8 max-w-2xl">
              Limited companies, main contractors and construction businesses with employer-side CIS obligations. We cover monthly CIS300 returns, EPS deduction reclaims, supply-chain due diligence and the April 2026 anti-fraud compliance requirements.
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
            <div className="section-label mb-4">Why trade knowledge matters</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              CIS works differently across trades.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                The same CIS rules apply to every construction subcontractor. But how they play out depends entirely on how your trade actually works. A roofer who supplies significant materials has a very different deduction position to a groundworker who passes on plant hire costs. A gas engineer with Gas Safe registration fees has allowable expenses that a general builder does not. A scaffolder with significant equipment purchases has a different capital allowance position to a painter with modest tool costs.
              </p>
              <p>
                Generalist accountants apply the CIS rules correctly in theory but miss the trade-specific details that determine whether the position is optimal in practice. We know those details because we work with construction subcontractors across all these trades week in, week out.
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
