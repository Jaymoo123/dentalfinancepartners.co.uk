import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { CITIES } from "./data";
import { buildFaqJsonLd, buildLocalBusinessJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return { title: "Location not found" };

  const url = `${siteConfig.url}/locations/${city.slug}`;

  // Compose the full title and bypass the layout brand template (absolute) so
  // the brand suffix is not appended a second time.
  const title = `CIS Accountants in ${city.name} | ${siteConfig.name}`;

  const description = `CIS accountants for construction subcontractors and contractors in ${city.name}. CIS refunds, gross payment status and self assessment. Fixed fees.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title: `CIS Accountants in ${city.name}`,
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

  // Build LocalBusiness JSON-LD
  const localBusiness = buildLocalBusinessJsonLd({
    name: `${siteConfig.name} - ${city.name}`,
    description: `Specialist CIS accountants for construction subcontractors and contractors in ${city.name}. CIS refunds, gross payment status, self assessment, sole trader and limited company accounting. Fixed fees.`,
    url: `/locations/${city.slug}`,
    city: city.name,
    region: city.region,
    geo: city.geo,
    areaServed: [city.name, ...city.nearbyAreas],
    serviceTypes: [
      "CIS tax refunds",
      "Gross Payment Status applications",
      "Self Assessment returns",
      "Sole trader accounting",
      "Limited company accounting",
      "CIS compliance",
    ],
  });

  const hasFaqs = city.localFaqs.length > 0;
  const faqSchema = hasFaqs ? buildFaqJsonLd(city.localFaqs) : null;

  // Which /for/* pages match the city's trade mix?
  const tradeLinks = city.tradeMix.map((t) => t.toLowerCase().replace(/\s+/g, "-"));

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
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-900/90 to-neutral-900/60" />
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
              The {city.name} construction scene
            </h2>
            <div
              className="prose-blog article-body"
              dangerouslySetInnerHTML={{ __html: city.contractorScene }}
            />
          </div>
        </div>
      </section>

      {/* Major projects */}
      {city.majorProjects.length > 0 && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
                Major construction projects in {city.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {city.majorProjects.map((project) => (
                  <div
                    key={project.name}
                    className="bg-white border border-neutral-200 border-l-4 border-l-orange-500 p-5 sm:p-6"
                  >
                    <h3 className="text-base font-bold text-neutral-900">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                      {project.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trade mix linking to /for/* */}
      {city.tradeMix.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
                Trades we support in {city.name}
              </h2>
              <p className="text-neutral-600 mb-8">
                We work with all construction trades in {city.name}. Each trade
                has its own CIS patterns, expense profile and refund potential.
              </p>
              <div className="flex flex-wrap gap-3">
                {city.tradeMix.map((trade, i) => {
                  const tradeSlug = tradeLinks[i];
                  return (
                    <Link
                      key={trade}
                      href={`/for/${tradeSlug}`}
                      className="inline-flex items-center gap-2 border border-neutral-200 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-all"
                    >
                      {trade}
                      <ArrowRight className="h-3.5 w-3.5 text-orange-500" />
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
                CIS questions from {city.name} contractors
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {city.localFaqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-neutral-200 bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-orange-700 transition-colors list-none">
                      <span>{faq.question}</span>
                      <span
                        className="flex-shrink-0 text-orange-500 transition-transform group-open:rotate-45"
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
                Also covering
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
              <div className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
                Get started
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Talk to a CIS specialist in {city.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-200">
                Book a free call. We will review your CIS position, check your
                deduction history and tell you whether you are owed a refund.
                No jargon, no obligation.
              </p>
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
      <div className="mt-6 inline-flex items-center gap-2 bg-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
        <MapPin className="h-3.5 w-3.5" />
        {city.region}
      </div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        CIS accountants in{" "}
        <span className="text-orange-400">{city.name}</span>
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
