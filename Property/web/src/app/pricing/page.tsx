import type { Metadata } from "next";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { propertyRegistry } from "@accounting-network/web-shared/experiments/registries/property";
import { packages } from "@/config/packages";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed monthly accounting packages for landlords and property companies. Clear pricing, no fixed term.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
    languages: {
      "en-GB": `${siteConfig.url}/pricing`,
      "x-default": `${siteConfig.url}/pricing`,
    },
  },
  openGraph: {
    title: "Pricing",
    description:
      "Fixed monthly accounting packages for landlords and property companies. Clear pricing, no fixed term.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing",
    description:
      "Fixed monthly accounting packages for landlords and property companies. Clear pricing, no fixed term.",
  },
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <div className="max-w-3xl mt-6">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Simple monthly pricing</h1>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-600">
              Fixed fees for landlords. No hourly billing, no surprises.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <PackagesSection config={packages} registry={propertyRegistry} />
        </div>
      </section>
    </>
  );
}
