import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { focusRing, siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Locations",
  description: `${siteConfig.name}. Specialist dental practice finance and accounting across the UK. Explore our locations.`,
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: "Locations",
    description: `${siteConfig.name}. Specialist dental practice finance and accounting across the UK. Explore our locations.`,
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations",
    description: `${siteConfig.name}. Specialist dental practice finance and accounting across the UK. Explore our locations.`,
  },
};

const cityLabel: Record<string, string> = {
  london: "London",
  manchester: "Manchester",
};

export default function LocationsHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Locations" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Where we work
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Dental accountants by location
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              We work with dental practices, associates and locums across the UK. Start from a local page for
              context on the market where you practise, then get in touch for advice tailored to your structure.
            </p>
          </div>
        </div>
      </section>

      {/* City cards */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Local pages
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Each page covers the areas we serve, the services that come up most often in that market, and how
              to get started.
            </p>
            <ul className="mt-10 grid list-none gap-6 pl-0 sm:grid-cols-2">
              {siteConfig.locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className={`block h-full rounded-2xl border border-[var(--border)] bg-white p-7 no-underline transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <span className="block text-xl font-semibold text-[var(--navy)]">
                      {cityLabel[loc.slug] ?? loc.slug}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[var(--ink-soft)]">{loc.title}</span>
                    <span className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-primary-700">
                      View local page
                      <span aria-hidden className="ml-1">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing panel */}
      <section className="bg-white border-t border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <CTASection
              title="Not sure which page fits?"
              description="Tell us where you are based and whether you are an associate or a practice owner, and we will point you to the right next step."
            />
          </div>
        </div>
      </section>
    </>
  );
}
