import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `How ${siteConfig.name} Can Help | Free Tools, Specialist Handoff, Ongoing Support` },
  description:
    `Three ways to use ${siteConfig.name}: free calculators and guides, our accountants on the money side, and a solicitor introduction when the matter needs one.`,
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
            Everyone arrives at estate planning from a different place. Some people just want a number and a clear explanation. Some need an accountant on the money side now. Some also need a solicitor, and we introduce them to a regulated firm we work with. {siteConfig.name} works at all three levels. The first is free for everyone, always, and there is never any obligation to go further.
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
              Talk to our accountants
            </Link>
          </div>
          <p className="mt-10 text-sm text-neutral-500">
            We work the money side of your estate, and introduce you to a solicitor when the matter needs one.{" "}
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
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">Not sure which of the three you need?</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">Describe the estate or the plan in a few lines. We will tell you whether a calculator answers it, whether it needs one of our accountants, and whether a solicitor has to be involved as well.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">Tell us about your situation</h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
