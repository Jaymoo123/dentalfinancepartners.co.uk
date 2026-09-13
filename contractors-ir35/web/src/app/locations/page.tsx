import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
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
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-neutral-200/70 transition-colors hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      {city.heroImage ? (
        <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
          <Image
            src={city.heroImage.url}
            alt={city.heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
          <Building2 aria-hidden className="h-12 w-12 text-white opacity-40" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-600">
          {city.region}
        </p>
        <h3 className="text-xl font-bold text-neutral-900">
          Contractor accountants in {city.name}
        </h3>
        {city.keySectors.length > 0 && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {city.keySectors.slice(0, 3).map((s) => s.name).join(" · ")}
          </p>
        )}
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600">
          View {city.name} page
          <ArrowRight
            aria-hidden
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </span>
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
      className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm text-neutral-700 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      <span className="truncate font-medium">{city.name}</span>
      <ArrowRight
        aria-hidden
        className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
      />
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
      {/* Hero. Mono eyebrow rather than the `.eyebrow` class: that rule is
          UNLAYERED in globals.css and pins `color: var(--accent)`, which
          measures 3.69 on this ground and cannot be overridden by a utility. */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              UK coverage
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Contractor and IR35 accountants across the UK
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              {totalCities > 0
                ? `Specialist contractor and IR35 accountants serving contractors in ${totalCities} of the UK's biggest contracting markets, entirely remotely. Each city page covers the dominant contractor sectors and the local off-payroll picture. National coverage, remote-first.`
                : "Specialist contractor and IR35 accountants serving contractors across the UK, entirely remotely. National coverage, remote-first."}
            </p>
            <Link
              href="#book"
              className={`${btnPrimary} mt-8 rounded-xl`}
              data-cta="hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>

      {/* City listing. White body ground, container measure, no inner clamp. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {totalCities === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center ring-1 ring-neutral-200/70">
              <h2 className="mb-2 text-xl font-bold text-neutral-900">
                Location pages coming soon
              </h2>
              <p className="mx-auto max-w-md text-neutral-600">
                We cover the whole of the UK remotely. Detailed city pages are
                being added now. In the meantime,{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary-600 underline hover:text-primary-700"
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
                  <h2 className="mb-6 border-b border-neutral-200 pb-3 text-2xl font-bold text-neutral-900">
                    Major UK contractor markets
                  </h2>
                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {priorityAvailable.map((s) => (
                      <CityCard key={s} slug={s} />
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining cities as compact links */}
              {restSlugs.length > 0 && (
                <div className="mb-14 last:mb-0">
                  <h2 className="mb-6 border-b border-neutral-200 pb-3 text-2xl font-bold text-neutral-900">
                    More UK locations
                  </h2>
                  <p className="mb-4 text-sm text-neutral-600">
                    {restSlugs.length} further location pages, each with the
                    local contractor scene and IR35 FAQs.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {restSlugs.map((s) => (
                      <SimpleCityLink key={s} slug={s} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Closing ask, `contained` so no dark band touches the dark footer.
          `proofPoints` intentionally EMPTY, see the glossary index. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="slate"
          eyebrow="Free call"
          title="Talk to a contractor and IR35 specialist wherever you contract"
          description="We act for contractors across the UK entirely remotely. Tell us about your contract and your structure, and we will tell you what is worth changing."
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            <>
              No obligation. If you would rather write to us first, use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 underline hover:text-primary-700"
              >
                contact form
              </Link>
              .
            </>
          }
        />
      </div>
    </>
  );
}
