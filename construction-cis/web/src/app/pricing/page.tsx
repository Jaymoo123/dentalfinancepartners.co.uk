import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { packages } from "@/config/packages";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { PlanAssistStrip } from "@accounting-network/web-shared/pricing/PlanAssistStrip";
import { niche } from "@/config/niche-loader";
import { buildPricingFaqJsonLd } from "@accounting-network/web-shared/pricing/faq-schema";
import { siteRegistries } from "@accounting-network/web-shared/experiments/registries";

export const metadata: Metadata = {
  title: { absolute: "CIS Accounting Packages & Pricing | Trade Tax Specialists" },
  description:
    "Fixed monthly accounting packages for CIS subcontractors, contractors and trade companies. Clear pricing, no fixed term.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPricingFaqJsonLd(packages)) }}
      />
      <section className="border-b border-neutral-200 bg-[#1e293b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-6">Pricing</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple monthly pricing
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Fixed fees for subbies, contractors and trade companies. No hourly billing, no surprises.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <PackagesSection config={packages} registry={siteRegistries["construction-cis"]} />
          <PlanAssistStrip dataCta="pricing_assist_call" ctaVariant={niche.cta.variant} />
        </div>
      </section>
    </>
  );
}
