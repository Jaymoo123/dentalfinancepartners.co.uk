import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "How We Can Help | The Money Side of Divorce" },
  description:
    "Free calculators and plain-English guides on the money side of divorce and separation, with a route to specialist help when your situation needs it.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-neutral-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            How we can help
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            We work out the money side of divorce and separation with you: what a fair
            settlement looks like, how pensions split, and the tax on it. Where you need a
            solicitor, we work alongside a regulated firm and stay on the money side.
          </p>
        </div>
      </section>

      {siteStats.length > 0 && <StatsBar stats={siteStats} />}

      {serviceTiers.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <ServiceTiers tiers={serviceTiers} />
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900">Not sure where to start?</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Tell us about your situation and one of our divorce finance specialists will work through it with you.
            Free, with no obligation.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-6 inline-flex`}>
            Get in touch
          </Link>
        </div>
      </section>

      {/* Closing ask. Added 2026-09-28 (estate parity phase 0): this page rendered no
          capture surface at all, so the only route off it was a link to /contact.
          Same anatomy as the /for/[slug] closing block, not a new pattern. */}
      <section className="border-t border-neutral-200 bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">Talk to a specialist about your situation</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">Book a free call. We will talk through your situation and whether there is anything worth changing. No hard sell, no obligation.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl">Book your free call</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
