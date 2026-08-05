import type { Metadata } from "next";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { PlanAssistStrip } from "@accounting-network/web-shared/pricing/PlanAssistStrip";
import { niche } from "@/config/niche-loader";
import { dentistsRegistry } from "@accounting-network/web-shared/experiments/registries/dentists";
import { buildPricingFaqJsonLd } from "@accounting-network/web-shared/pricing/faq-schema";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { packages } from "@/config/packages";
import { buildBreadcrumbJsonLd, JsonLd } from "@/lib/schema/index";

export const metadata: Metadata = {
  title: "Dental Accountant Pricing and Packages",
  description:
    "Fixed monthly accounting packages for dental associates and practice owners. Clear pricing, no fixed term.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
    languages: {
      "en-GB": `${siteConfig.url}/pricing`,
      "x-default": `${siteConfig.url}/pricing`,
    },
  },
  openGraph: {
    title: `Dental Accountant Pricing and Packages | ${siteConfig.name}`,
    description:
      "Fixed monthly accounting packages for dental associates and practice owners. Clear pricing, no fixed term.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
};

export default function PricingPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pricing" },
  ];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildPricingFaqJsonLd(packages);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Pricing
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Simple monthly pricing
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Fixed fees for associates and practice owners. No hourly billing, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <PackagesSection config={packages} registry={dentistsRegistry} />
          <PlanAssistStrip dataCta="pricing_assist_call" ctaVariant={niche.cta.variant} />
        </div>
      </section>
    </>
  );
}
