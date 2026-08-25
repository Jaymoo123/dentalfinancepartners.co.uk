import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";

/**
 * Services STUB (scaffold phase): compiles and renders with neutral copy.
 * Real service copy lands with the brand and content build.
 */

export const metadata: Metadata = {
  title: { absolute: "How We Can Help | The Money Side of Divorce" },
  description:
    "Free calculators and plain-English guides on the money side of divorce and separation, with a route to specialist help when your situation needs it.",
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
            Free tools and guides for the money side of divorce and separation. Full service
            detail is being built now.
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
            Tell us about your situation and a specialist will point you in the right direction.
            Free, with no obligation.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-6 inline-flex`}>
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
