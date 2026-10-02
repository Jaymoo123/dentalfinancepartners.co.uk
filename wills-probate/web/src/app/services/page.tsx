import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `How ${siteConfig.name} Can Help | Free Tools, Specialist Help, Ongoing Support` },
  description:
    `Three ways to use ${siteConfig.name}: free calculators and guides, help from one of our specialists, or ongoing estate planning support from our own in-house team.`,
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">How we can help</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Free tools first. Specialist help if and when you want it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Everyone arrives at estate planning from a different place. Some people just want a number and a clear explanation. Some know they need professional help and want someone they can trust to take it on. Some have estates that will need attention for years, not weeks. {siteConfig.name} works at all three levels. The first is free for everyone, always, and there is never any obligation to go further.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white py-8 sm:py-10 border-b border-neutral-200">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most requested" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Not sure which applies to you?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Run a calculator first. The numbers usually make the next step obvious.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calculators" className={btnPrimary}>
              Use the free calculators
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-orange-500 underline-offset-4 hover:text-neutral-900 transition-colors ${focusRing}`}
            >
              Speak to a specialist
            </Link>
          </div>
          <p className="mt-10 text-sm text-neutral-500">
            We are accountants, not a law firm.{" "}
            <Link href="/about" className="font-medium text-orange-700 underline underline-offset-4 hover:text-orange-800 transition-colors">
              Read more about how we work
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Closing ask. Added 2026-09-28 (estate parity phase 0): this page rendered
          no capture surface at all, so the only route off it was a link. Same
          anatomy as /probate's closing block, not a new pattern. */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Want a specialist to take it from here?</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">Some estates need more than a calculator</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">Some estates are simple. Many are not: blended families, business assets, property abroad, pensions after April 2027. If you would like a professional to look at your situation, tell us a little about it and one of our estate planning specialists will take a look. It costs you nothing to ask, and there is no obligation.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">Speak to a specialist</h3>
              <LeadForm submitLabel="Speak to a specialist" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
