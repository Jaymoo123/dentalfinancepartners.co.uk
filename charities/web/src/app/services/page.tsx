import type { Metadata } from "next";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { CtaBand, HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
import { charityServices } from "@/data/charity-services";
import { siteConfig } from "@/config/site";
import { serviceTiers } from "@/config/service-tiers";

export const metadata: Metadata = {
  title: { absolute: "Charity Accounting Services | Trustee Tax" },
  description:
    "Charity accounting services: independent examination, annual accounts, bookkeeping, Gift Aid claims and charity VAT. Specialist support for charities, CICs and social enterprises.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Charity accounting services."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <p>
          Every service is built around how charity finance works in practice: fund accounting,
          Charity Commission compliance, Gift Aid and the specific requirements of the Charities
          SORP.
        </p>
      </PageHero>

      {/* Heading count is derived, never typed: a hardcoded "five" drifts the
          moment a service is added or retired. */}
      <HubSection
        eyebrow="What we do"
        title={`${charityServices.length} service lines`}
        ground="slate"
      >
        <LinkCardGrid
          columns={3}
          items={charityServices.map((service) => ({
            href: `/services/${service.slug}`,
            title: service.title,
            body: service.intro,
          }))}
        />
      </HubSection>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Three service tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Sized around the scrutiny obligations that apply at each income level. Start on the
              tier that fits your charity now and move when your circumstances change.
            </p>
          </div>
          <div className="mt-10">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which service you need?">
        <p>
          Tell us about your charity, CIC or social enterprise and we will tell you what is required
          and how we can help.
        </p>
      </CtaBand>
    </>
  );
}
