import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { HeroOffer } from "@/components/intent/HeroOffer";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";

/**
 * Homepage STUB (scaffold phase): compiles and renders with neutral copy.
 * Real hero, proof and section copy land with the brand and content build.
 */

export const metadata: Metadata = {
  title: "The Money Side of Divorce, Explained | UK",
  description:
    "Plain-English guidance on financial settlements, pensions, tax and the family home for people divorcing or separating in the UK. Free calculators, no jargon.",
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 py-16 sm:py-24">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            The money side of divorce, explained in plain English.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Financial settlements, pensions, tax and the family home. Free calculators and guides
            for people divorcing or separating in the UK, with a route to specialist help when you
            need it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <HeroOffer
              fallback={
                <Link href="/calculators" className={btnSecondary}>
                  Try the free calculators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              }
            />
          </div>
        </div>
      </section>

      {/* Stats (renders nothing while siteStats is empty) */}
      {siteStats.length > 0 && <StatsBar stats={siteStats} />}

      {/* Service tiers (renders nothing while serviceTiers is empty) */}
      {serviceTiers.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <ServiceTiers tiers={serviceTiers} />
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section id="contact" className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Tell us about your situation
            </h2>
            <p className="mt-3 text-neutral-600">
              A specialist will come back to you within one working day. Free, with no obligation.
            </p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
