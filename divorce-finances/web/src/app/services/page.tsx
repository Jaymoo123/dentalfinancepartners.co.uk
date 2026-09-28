import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
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
            solicitor, we introduce you to a regulated firm we work with, and we stay on the
            money side.
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
            Tell us about your situation and one of our team will point you in the right
            direction. Free, with no obligation.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-6 inline-flex`}>
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
