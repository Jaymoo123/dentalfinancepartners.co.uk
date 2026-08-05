import type { Metadata } from "next";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { packages } from "@/config/packages";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { PlanAssistStrip } from "@accounting-network/web-shared/pricing/PlanAssistStrip";
import { niche } from "@/config/niche-loader";
import { buildPricingFaqJsonLd } from "@accounting-network/web-shared/pricing/faq-schema";
import { generalistRegistry } from "@accounting-network/web-shared/experiments/registries/generalist";

export const metadata: Metadata = {
  title: `Accountant Pricing for Sole Traders and Limited Companies`,
  description:
    "Fixed monthly accounting packages for sole traders and limited companies. Clear pricing, no fixed term, cancel with 1 month's notice.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
  openGraph: {
    title: `Accountant Pricing for Sole Traders and Limited Companies | ${siteConfig.name}`,
    description:
      "Fixed monthly accounting packages for sole traders and limited companies. Clear pricing, no fixed term, cancel with 1 month's notice.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPricingFaqJsonLd(packages)) }}
      />
      <section className={`${sectionY} bg-[#fafaf7]`}>
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-orange-500">
              Pricing
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.05] sm:text-6xl lg:text-7xl text-balance">
              Simple monthly pricing
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Fixed fees for sole traders and limited companies. No hourly billing, no surprises.
            </p>
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-[#fafaf7] border-t border-neutral-200`}>
        <div className={siteContainerLg}>
          <PackagesSection config={packages} registry={generalistRegistry} />
          <PlanAssistStrip dataCta="pricing_assist_call" ctaVariant={niche.cta.variant} />
        </div>
      </section>
    </>
  );
}
