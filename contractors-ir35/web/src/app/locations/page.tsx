import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { CITIES } from "./[slug]/data";

export const metadata: Metadata = {
  title: { absolute: `Contractor Accountants Near You | ${siteConfig.name}` },
  description:
    "Specialist contractor and IR35 accountants serving contractors across the UK remotely. Find your city: London, Manchester, Birmingham, Reading, Cambridge and beyond.",
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: `Contractor Accountants Near You | ${siteConfig.name}`,
    description:
      "Specialist contractor and IR35 accountants serving the whole of the UK remotely.",
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
};

// Preferred display order for the main UK contractor markets
const PRIORITY_SLUGS = [
  "london",
  "manchester",
  "birmingham",
  "leeds",
  "bristol",
  "glasgow",
  "edinburgh",
  "reading",
  "cambridge",
  "oxford",
];

function CityCard({ slug }: { slug: string }) {
  const city = CITIES[slug];
  if (!city) return null;

  return (
    <Link
      href={`/locations/${city.slug}`}
      className="group block bg-white border border-neutral-200 hover:border-cyan-700 hover:shadow-md transition-all overflow-hidden"
    >
      {city.heroImage ? (
        <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
          <Image
            src={city.heroImage.url}
            alt={city.heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="relative h-44 w-full bg-gradient-to-br from-cyan-700 to-cyan-900 flex items-center justify-center">
          <Building2 className="h-12 w-12 text-white opacity-40" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
          {city.region}
        </p>
        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-cyan-800 transition-colors">
          Contractor accountants in {city.name}
        </h3>
        {city.keySectors.length > 0 && (
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {city.keySectors.slice(0, 3).map((s) => s.name).join(" · ")}
          </p>
        )}
        <div className="mt-4 flex items-center text-cyan-700 font-semibold text-sm">
          View {city.name} page
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function SimpleCityLink({ slug }: { slug: string }) {
  const city = CITIES[slug];
  if (!city) return null;
  return (
    <Link
      href={`/locations/${city.slug}`}
      className="group flex items-center justify-between gap-2 border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors hover:border-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
    >
      <span className="truncate font-medium">{city.name}</span>
      <ArrowRight className="h-3 w-3 shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

export default function LocationsIndexPage() {
  const allSlugs = Object.keys(CITIES);
  const totalCities = allSlugs.length;

  const prioritySet = new Set(PRIORITY_SLUGS);
  const priorityAvailable = PRIORITY_SLUGS.filter((s) => CITIES[s]);
  const restSlugs = allSlugs
    .filter((s) => !prioritySet.has(s))
    .sort((a, b) => (CITIES[a]?.name || "").localeCompare(CITIES[b]?.name || ""));

  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-700 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <MapPin className="h-3.5 w-3.5" />
              UK coverage
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Contractor and IR35 accountants across the UK
            </h1>
            <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
              {totalCities > 0
                ? `Specialist contractor and IR35 accountants serving contractors in ${totalCities} of the UK's biggest contracting markets, entirely remotely. Each city page covers the dominant contractor sectors and the local off-payroll picture. National coverage, remote-first, fixed fees.`
                : "Specialist contractor and IR35 accountants serving contractors across the UK, entirely remotely. National coverage, remote-first, fixed fees."}
            </p>
          </div>
        </div>
      </section>

      {/* City listing */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            {totalCities === 0 ? (
              <div className="border border-neutral-200 bg-white p-10 text-center">
                <Building2 className="h-10 w-10 text-cyan-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  Location pages coming soon
                </h2>
                <p className="text-neutral-600 max-w-md mx-auto">
                  We cover the whole of the UK remotely. Detailed city pages are
                  being added now. In the meantime,{" "}
                  <Link
                    href="/contact"
                    className="text-cyan-700 underline hover:text-cyan-800 font-semibold"
                  >
                    book a free call
                  </Link>{" "}
                  and we will help you wherever you contract.
                </p>
              </div>
            ) : (
              <>
                {/* Priority cities as cards */}
                {priorityAvailable.length > 0 && (
                  <div className="mb-14">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-200">
                      Major UK contractor markets
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {priorityAvailable.map((s) => (
                        <CityCard key={s} slug={s} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Remaining cities as compact links */}
                {restSlugs.length > 0 && (
                  <div className="mb-14 last:mb-0">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-200">
                      More UK locations
                    </h2>
                    <p className="mb-4 text-sm text-neutral-600">
                      {restSlugs.length} further location pages, each with the
                      local contractor scene and IR35 FAQs.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {restSlugs.map((s) => (
                        <SimpleCityLink key={s} slug={s} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
