import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Locations | Property Accountants Across the UK",
  description: `${siteConfig.name} — specialist property accountants serving landlords across the UK. Explore our locations.`,
  alternates: { canonical: `${siteConfig.url.replace(/\/$/, "")}/locations` },
};

export default function LocationsHubPage() {
  return (
    <>
      <section className="relative h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=2000&q=85"
          alt="UK cities"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
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
                href={`/locations/${loc.slug}`}
                className="group bg-slate-50 border-l-4 border-slate-300 p-8 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
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

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <CTASection
            title="Not sure which page fits?"
            description="Tell us where you are based and we'll point you to the right next step."
          />
        </div>
      </section>
    </>
  );
}
