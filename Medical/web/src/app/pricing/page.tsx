import type { Metadata } from "next";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { packages } from "@/config/packages";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { buildPricingFaqJsonLd } from "@accounting-network/web-shared/pricing/faq-schema";
import { medicalRegistry } from "@accounting-network/web-shared/experiments/registries/medical";
import { PlanAssistStrip } from "@accounting-network/web-shared/pricing/PlanAssistStrip";
import { niche } from "@/config/niche-loader";

export const metadata: Metadata = {
  title: `Medical Accountant Pricing for Locums, GPs and Consultants`,
  description:
    "Fixed monthly accounting packages for locums, GPs and consultants. Clear pricing, no fixed term.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
  openGraph: {
    title: `Medical Accountant Pricing for Locums, GPs and Consultants | ${siteConfig.name}`,
    description:
      "Fixed monthly accounting packages for locums, GPs and consultants. Clear pricing, no fixed term.",
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
      <section className={`${sectionY} bg-[var(--background)]`}>
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <p className="section-label">Pricing</p>
            <h1 className="display-serif mt-4 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl md:text-[2.75rem]">
              Simple monthly pricing
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Fixed fees for locums, GPs and consultants. No hourly billing, no surprises.
            </p>
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-[var(--background)] border-t border-[var(--border)]`}>
        <div className={siteContainerLg}>
          <PackagesSection config={packages} registry={medicalRegistry} />
          <PlanAssistStrip dataCta="pricing_assist_call" ctaVariant={niche.cta.variant} />
        </div>
      </section>
    </>
  );
}
