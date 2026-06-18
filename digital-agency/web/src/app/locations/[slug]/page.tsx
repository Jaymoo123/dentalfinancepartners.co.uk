import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, BadgeCheck, Mail, ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { CITIES } from "./data";
import { JsonLd, buildAccountingService } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return { title: "Location not found" };

  const url = `${siteConfig.url}/locations/${city.slug}`;
  return {
    title: `Agency Accountants in ${city.name} | ${siteConfig.name}`,
    description: `Specialist accountants for ${city.name} agency founders. Tax planning, management accounts, IR35, R&D credits and exit planning. ICAEW qualified, fixed fees, free initial call.`,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title: `Agency Accountants in ${city.name}`,
      description: `Specialist accountants for ${city.name} agency founders. ICAEW qualified, fixed fees.`,
      url,
      type: "website",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) notFound();

  const localBusiness = buildAccountingService({
    name: `${siteConfig.name} - ${city.name}`,
    description: `Specialist accountants for ${city.name} agency founders. ICAEW qualified, fixed fees, agency-only focus.`,
    url: `/locations/${city.slug}`,
    city: city.name,
    address: { addressRegion: city.region },
    geo: { latitude: city.geo.latitude, longitude: city.geo.longitude },
    areaServed: [city.name],
  });
  // Augment with additional fields the builder doesn't expose
  Object.assign(localBusiness as Record<string, unknown>, {
    priceRange: "£££",
    parentOrganization: { "@type": "Organization", "@id": `${siteConfig.url}#organization` },
    serviceType: [
      "Agency accounting",
      "Tax planning",
      "Management accounts",
      "IR35 compliance",
      "R&D tax credits",
      "Exit planning",
    ],
  });
  return (
    <>
      <JsonLd data={localBusiness} />

      <section className="bg-slate-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: city.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <MapPin className="h-3.5 w-3.5" />
              {city.region}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Agency accountants in <span className="text-indigo-400">{city.name}</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              {city.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-400" />
                <span className="font-semibold">ICAEW qualified</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-400" />
                <span className="font-semibold">Fixed fees</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-400" />
                <span className="font-semibold">Agency specialists</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why we work with {city.name} agency founders</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">{city.whyHere}</p>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">The {city.name} agency scene</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">{city.agencyScene}</p>

            <div className="mt-10 bg-slate-50 border-l-4 border-indigo-600 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Agency hubs in {city.name}</p>
              <p className="mt-2 text-base text-slate-700">{city.agencyHubs.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-8">
              What we do for {city.name} agency founders
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Tax planning", body: "Salary and dividend extraction, corporation tax, R&D credits, BADR planning." },
                { title: "Management accounts", body: "Monthly P&L, cash flow forecasting, KPI dashboards built for agencies." },
                { title: "IR35 compliance", body: "SDS documentation, status determinations, freelancer engagement reviews." },
                { title: "Incorporation & structure", body: "Sole trader to limited, holding companies, alphabet shares." },
                { title: "MTD & VAT", body: "Making Tax Digital ITSA and VAT compliance, scheme selection." },
                { title: "Exit planning", body: "BADR, MBOs, earn-outs, goodwill valuation, due diligence support." },
              ].map((s) => (
                <div key={s.title} className="bg-white border border-slate-200 p-5">
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/services" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                See all our services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20`}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Speak to a {city.name} agency specialist
              </h2>
              <p className="mt-4 text-lg text-slate-200 leading-relaxed">
                Book a free 30-minute call. We will talk through your situation and give you clear, practical recommendations. No jargon, no obligation.
              </p>
              <div className="mt-6 space-y-3 text-slate-200">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-indigo-300" />
                  <Link href="/contact" className="font-semibold underline">
                    Contact us
                  </Link>
                </div>
              </div>
              <Link href="/contact" className={`${btnPrimary} mt-8`}>
                Book a free call
              </Link>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Request a callback</h3>
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
