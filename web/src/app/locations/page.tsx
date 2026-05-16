import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Locations | ${siteConfig.name}`,
  description:
    "Specialist agency accountants serving founders across the UK. London, Manchester and Birmingham focus with national and UAE coverage.",
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: `Locations | ${siteConfig.name}`,
    description: "Specialist agency accountants for founders across the UK.",
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
};

const cities = [
  { slug: "london", name: "London", description: "Shoreditch, Soho, Clerkenwell and the wider London agency ecosystem." },
  { slug: "manchester", name: "Manchester", description: "Northern Quarter, Ancoats and Manchester's growing creative agency scene." },
  { slug: "birmingham", name: "Birmingham", description: "Jewellery Quarter, Digbeth and the Midlands agency hub." },
  { slug: "leeds", name: "Leeds", description: "Holbeck, Leeds Dock and the Yorkshire digital agency cluster." },
  { slug: "bristol", name: "Bristol", description: "Harbourside, Stokes Croft and the UK's densest creative agency cluster per capita." },
  { slug: "edinburgh", name: "Edinburgh", description: "Old Town, Leith and Scotland's creative + fintech agency hub." },
  { slug: "glasgow", name: "Glasgow", description: "Merchant City, Finnieston and Scotland's broadcast and creative scene." },
];

export default function LocationsIndexPage() {
  return (
    <>
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <MapPin className="h-3.5 w-3.5" />
              UK coverage
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Specialist agency accountants across the UK
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              We work with agency founders nationwide, with a particular focus on the major UK agency hubs. All consultations remote-first; in-person available in London on request.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group block bg-slate-50 border border-slate-200 p-6 sm:p-8 hover:bg-white hover:border-indigo-600 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.description}</p>
                <div className="mt-5 flex items-center text-indigo-600 font-semibold text-sm">
                  Agency accountants in {c.name}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
