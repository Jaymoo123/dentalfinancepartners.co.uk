import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Mail } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { contractorTypes } from "@/data/contractor-types";
import { CITIES } from "./data";
import {
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}

// Map /for slugs to their display titles for nicer link labels.
const SECTOR_TITLES: Record<string, string> = Object.fromEntries(
  contractorTypes.map((t) => [t.slug, t.title])
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return { title: "Location not found" };

  const url = `${siteConfig.url}/locations/${city.slug}`;

  // Compose the full title and bypass the layout brand template (absolute) so
  // the brand suffix is not appended a second time.
  const title = `Contractor Accountants in ${city.name} | ${siteConfig.name}`;

  const description = `Specialist contractor and IR35 accountants for ${city.name} contractors. IR35 status, limited company tax, umbrella vs Ltd and self assessment. Fixed fees.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title: `Contractor Accountants in ${city.name}`,
      description,
      url,
      type: "website",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) notFound();

  // Build LocalBusiness JSON-LD. Contractor Tax Accountants is a remote,
  // national service: areaServed lists the city plus nearby areas, but there is
  // deliberately no fabricated local street address (the schema helper emits
  // addressLocality / addressRegion only, which honestly reflects the area
  // served rather than a physical office at that postcode).
  const localBusiness = buildLocalBusinessJsonLd({
    name: `${siteConfig.name} - ${city.name}`,
    description: `Specialist contractor and IR35 accountants serving ${city.name} contractors remotely, nationwide. IR35 status reviews, off-payroll determinations, limited company and PSC tax, umbrella vs limited company comparisons, self assessment and contractor tax planning. Fixed fees.`,
    url: `/locations/${city.slug}`,
    city: city.name,
    region: city.region,
    geo: city.geo,
    areaServed: [city.name, ...city.nearbyAreas],
    serviceTypes: [
      "IR35 status reviews",
      "Off-payroll working determinations",
      "Limited company and PSC accounting",
      "Umbrella vs limited company comparisons",
      "Self Assessment returns",
      "Contractor tax planning",
    ],
  });

  const hasFaqs = city.localFaqs.length > 0;
  const faqSchema = hasFaqs ? buildFaqJsonLd(city.localFaqs) : null;

  // Breadcrumb JSON-LD (the Breadcrumb component renders its own copy in the
  // hero; this is emitted explicitly here to satisfy the page structured-data
  // contract).
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: city.name },
  ]);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusiness }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* Hero with optional image */}
      <section className="relative overflow-hidden bg-neutral-900">
        {city.heroImage ? (
          <div className="relative h-[420px] sm:h-[500px]">
            <Image
              src={city.heroImage.url}
              alt={city.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/95 via-cyan-900/90 to-neutral-900/60" />
            {city.heroImage.photographer && (
              <p className="absolute bottom-2 right-3 z-10 text-[10px] text-neutral-300/80">
                Photo:{" "}
                <a
                  href={city.heroImage.photographer_url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="underline hover:text-white"
                >
                  {city.heroImage.photographer}
                </a>{" "}
                /{" "}
                <a
                  href={city.heroImage.pexels_url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="underline hover:text-white"
                >
                  Pexels
                </a>
              </p>
            )}
            <div className={`${siteContainerLg} relative z-10 h-full flex items-end pb-10 sm:pb-14`}>
              <HeroContent city={city} />
            </div>
          </div>
        ) : (
          <div className="py-16 sm:py-20">
            <div className={siteContainerLg}>
              <HeroContent city={city} />
            </div>
          </div>
        )}
      </section>

      {/* Contractor scene */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
              The {city.name} contractor scene
            </h2>
            <div
              className="prose-blog article-body"
              dangerouslySetInnerHTML={{ __html: city.contractorScene }}
            />
          </div>
        </div>
      </section>

      {/* Key contractor sectors */}
      {city.keySectors.length > 0 && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
                The contractor sectors that drive {city.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {city.keySectors.map((sector) => (
                  <div
                    key={sector.name}
                    className="bg-white border border-neutral-200 border-l-4 border-l-cyan-700 p-5 sm:p-6"
                  >
                    <h3 className="text-base font-bold text-neutral-900">
                      {sector.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                      {sector.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sector links to /for/* */}
      {city.sectorLinks.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
                Contractors we support in {city.name}
              </h2>
              <p className="text-neutral-600 mb-8">
                We work with contractors across {city.name}'s main sectors. Each
                type has its own IR35 exposure, expense profile and tax-planning
                priorities.
              </p>
              <div className="flex flex-wrap gap-3">
                {city.sectorLinks.map((sectorSlug) => {
                  const label = SECTOR_TITLES[sectorSlug] || sectorSlug;
                  return (
                    <Link
                      key={sectorSlug}
                      href={`/for/${sectorSlug}`}
                      className="inline-flex items-center gap-2 border border-neutral-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:border-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 transition-all"
                    >
                      {label}
                      <ArrowRight className="h-3.5 w-3.5 text-cyan-700" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {hasFaqs && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
                IR35 questions from {city.name} contractors
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {city.localFaqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-neutral-200 bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-cyan-800 transition-colors list-none">
                      <span>{faq.question}</span>
                      <span
                        className="flex-shrink-0 text-cyan-700 transition-transform group-open:rotate-45"
                        aria-hidden
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nearby areas */}
      {city.nearbyAreas.length > 0 && (
        <section className="bg-white py-10 sm:py-12">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Also serving contractors in
              </p>
              <p className="text-sm text-neutral-600">
                {city.nearbyAreas.join(" · ")}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
                Get started
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Talk to a contractor and IR35 specialist for {city.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-200">
                Book a free call. We will review your IR35 position, your
                structure and whether there is anything worth changing. We act
                for {city.name} contractors entirely remotely. No jargon, no
                obligation.
              </p>
              <div className="mt-6 space-y-3 text-neutral-200">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <Link
                    href="/contact"
                    className="font-semibold underline hover:text-white transition-colors"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <Link href="/contact" className={`${btnPrimary} mt-8`}>
                Book a free call
              </Link>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Book your free call
              </h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Extracted hero content to avoid duplication in conditional branches
function HeroContent({ city }: { city: (typeof CITIES)[string] }) {
  return (
    <div className="max-w-3xl w-full">
      <Breadcrumb
        variant="light"
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: city.name },
        ]}
      />
      <div className="mt-6 inline-flex items-center gap-2 bg-cyan-700 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
        <MapPin className="h-3.5 w-3.5" />
        {city.region}
      </div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        Contractor accountants in{" "}
        <span className="text-cyan-400">{city.name}</span>
      </h1>
      <div
        className="mt-4 text-lg text-neutral-200 leading-relaxed max-w-2xl prose-invert"
        dangerouslySetInnerHTML={{ __html: city.intro }}
      />
      {city.population && (
        <p className="mt-3 text-sm font-mono uppercase tracking-wider text-neutral-400">
          Population: {city.population}
        </p>
      )}
    </div>
  );
}
