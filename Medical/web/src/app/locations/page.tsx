import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "GP Accountants by Location | Medical Accounting Specialists UK",
  description: `${siteConfig.name} — specialist GP accounting and medical tax services across major UK cities. Find your local medical accountant.`,
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: "GP Accountants by Location | UK Medical Accounting",
    description: `Specialist GP accounting and medical tax services across major UK cities. NHS pension planning, locum tax, private practice advice.`,
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Accountants by Location | UK Medical Accounting",
    description: `Specialist GP accounting and medical tax services across major UK cities. NHS pension planning, locum tax, private practice advice.`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
        GP accountants across the UK
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We work with GPs, consultants, and locum doctors throughout the UK. Explore location-specific pages for context on local medical accounting services, then contact us to discuss your specific needs.
      </p>

      <ul className="mt-10 grid list-none gap-4 pl-0 sm:mt-12 sm:grid-cols-2 sm:gap-6">
        {siteConfig.locations.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/locations/${loc.slug}`}
              className={`card-premium block rounded-xl p-6 no-underline shadow-sm transition-shadow hover:shadow-md ${focusRing}`}
            >
              <span className="font-serif text-xl font-semibold text-[var(--ink)]">
                {cityLabel[loc.slug] ?? loc.slug}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">{loc.title}</span>
              <span className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--accent-strong)]">
                View local services →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
          Remote service for all UK doctors
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          While we highlight major cities, we work with medical professionals throughout England, Scotland, Wales, and Northern Ireland. NHS pension planning, locum tax returns, and private practice accounting can all be handled remotely with secure document sharing and video calls.
        </p>
      </div>

      <div className="mt-12">
        <CTASection
          title="Not based in these cities?"
          description="We work with GPs and consultants nationwide. Contact us to discuss your medical accounting needs regardless of location."
        />
      </div>
    </div>
    </>
  );
}
