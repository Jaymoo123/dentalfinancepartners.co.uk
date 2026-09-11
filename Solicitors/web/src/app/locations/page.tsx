import type { Metadata } from "next";
import Link from "next/link";
import { Video } from "lucide-react";
import {
  siteContainerLg,
  sectionY,
  sectionYLoose,
  focusRing,
  btnPrimary,
  btnSecondary,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd, buildOrganizationJsonLd } from "@/lib/schema/index";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Solicitor Accountants by Location | Law Firm Accounting Specialists UK",
  description: `${siteConfig.name} — specialist solicitor accounting and law firm tax services across major UK cities. Find your local legal sector accountant.`,
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: "Solicitor Accountants by Location | UK Legal Sector Accounting",
    description: `Specialist solicitor accounting and law firm tax services across major UK cities. SRA compliance, partnership tax, LLP conversion advice.`,
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
};

const cityLabel: Record<string, string> = {
  london: "London",
  manchester: "Manchester",
  birmingham: "Birmingham",
  leeds: "Leeds",
  bristol: "Bristol",
};

export default function LocationsHubPage() {
  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <JsonLd data={orgSchema} />

      <section className="relative overflow-hidden bg-slate-900">
        <div className={`${siteContainerLg} ${sectionYLoose} relative z-10`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
            variant="light"
          />
          {/* Narrow measure on hero copy only; the body below is siteContainerLg. */}
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              Solicitor accountants across the UK
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              We work with solicitors, law firm partners, and legal practitioners throughout the UK. Explore location-specific pages for context on local legal sector accounting services, then contact us to discuss your specific needs.
            </p>
          </div>
        </div>
        <SolicitorsBackdrop tone="navy" />
      </section>

      {/* Slate ground so the white .card-premium tiles oppose it. The grid is
          this section's visual: it re-presents the copy above it (the cities
          the paragraph says we cover) and invents no words. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <ul className="grid list-none gap-6 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className={`card-premium group block h-full no-underline ${focusRing}`}
                >
                  <span className="block text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-700">
                    {cityLabel[loc.slug] ?? loc.slug}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-slate-600">{loc.title}</span>
                  <span className="mt-4 inline-flex min-h-10 items-center text-sm font-bold text-primary-700">
                    View local services →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100"
              aria-hidden
            >
              <Video className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Remote service for all UK solicitors
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              While we highlight major cities, we work with solicitors and law firms throughout England and Wales. SRA compliance, partnership tax returns, and practice succession planning can all be handled remotely with secure document sharing and video calls.
            </p>
          </div>
        </div>
      </section>

      {/* One closing ask. The two CTASection links survive verbatim as the
          panel footnote so `cta-section-primary` and `cta-section-secondary`
          keep their ids, labels and hrefs and no live series forks. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          title="Not based in these cities?"
          description="We work with solicitors and law firms nationwide. Contact us to discuss your legal practice accounting needs regardless of location."
          proofPoints={[]}
          form={<LeadForm redirectOnSuccess={false} />}
          footnote={
            <span className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={`${btnPrimary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-primary"
              >
                Speak to a specialist
              </Link>
              <Link
                href="/services"
                className={`${btnSecondary} w-full min-w-0 sm:w-auto`}
                data-cta="cta-section-secondary"
              >
                View services
              </Link>
            </span>
          }
        />
      </div>
    </>
  );
}
