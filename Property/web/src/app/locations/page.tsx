import type { Metadata } from "next";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import Link from "next/link";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { locationHref } from "@/lib/locations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Locations | Property Accountants Across the UK",
  description: `${siteConfig.name}, specialist property accountants serving landlords across the UK. Explore our locations.`,
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: "Locations | Property Accountants Across the UK",
    description: `${siteConfig.name}, specialist property accountants serving landlords across the UK. Explore our locations.`,
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations | Property Accountants Across the UK",
    description: `${siteConfig.name}, specialist property accountants serving landlords across the UK. Explore our locations.`,
  },
};

export default function LocationsHubPage() {
  return (
    <>
      <section className="relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[350px] overflow-hidden bg-slate-900">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Locations" },
              ]}
            />
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Locations</h1>
            <p className="mt-4 text-xl text-white">
              We work with landlords across the UK. Find your local area for context.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => (
              <Link
                key={loc.slug}
                // Ours: locationHref is the single point of control for city URL
                // resolution after the 08-05 reversal. Currently the identity
                // function, and it must not be bypassed.
                href={locationHref(loc.slug)}
                className="border border-transparent group bg-slate-50 p-8 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
              >
                <span className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {loc.title}
                </span>
                <span className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700 uppercase tracking-wider">
                  View local page
                  <span className="text-lg">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The old block asked people to pick a location page. Taking the details
          here instead means someone whose town has no page still converts,
          rather than bouncing off a list that does not include them. */}
      <LeadCTAPanel
        contained
        title="Not sure which page fits?"
        description="Tell us where you are based and what you own. We will point you to the right next step, wherever you are in the UK."
        proofPoints={[
          { title: "Property-only specialists", detail: "Landlords, investors and developers, nothing else" },
          { title: "Fixed fees, quoted upfront", detail: "No hourly billing, no surprise invoices" },
          { title: "24-hour response", detail: "Usually the same working day" },
        ]}
        footnote="No obligation and no hard sell. If you do not need us, we will tell you."
      />
    </>
  );
}
