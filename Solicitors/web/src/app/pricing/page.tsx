import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { packages } from "@/config/packages";
import { PackagesSection } from "@accounting-network/web-shared/pricing/PackagesSection";
import { solicitorsRegistry } from "@accounting-network/web-shared/experiments/registries/solicitors";

const TITLE = "Pricing | Fixed Monthly Accounting Packages for Solicitors";
const DESCRIPTION =
  "Fixed monthly accounting packages for solicitors and law firms. Clear pricing, no fixed term.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
    languages: {
      "en-GB": `${siteConfig.url}/pricing`,
      "x-default": `${siteConfig.url}/pricing`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/pricing`, type: "website" },
};

export default function PricingPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Pricing" }];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Pricing</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Simple monthly pricing
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Fixed fees for sole practitioners and law firms. No hourly billing, no surprises.
            </p>
          </div>
        </div>
      </section>

      <PackagesSection config={packages} registry={solicitorsRegistry} />
    </>
  );
}
