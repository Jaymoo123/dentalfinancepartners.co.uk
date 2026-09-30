import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { contractorTypes } from "@/data/contractor-types";
import { getRelatedPosts, getCategorySlug } from "@/lib/blog";
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

  const description = `Specialist contractor and IR35 accountants for ${city.name} contractors. IR35 status, limited company tax, umbrella vs Ltd and self assessment.`;

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
    description: `Specialist contractor and IR35 accountants serving ${city.name} contractors remotely, nationwide. IR35 status reviews, off-payroll determinations, limited company and PSC tax, umbrella vs limited company comparisons, self assessment and contractor tax planning.`,
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

  // Related reading, the locations template's own slot. Real <a href> cards, so
  // this is link-positive: four more crawlable paths into the blog per city.
  const relatedPosts = getRelatedPosts("", "IR35 Status", 4);

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

      {/* Hero with optional image. The photography is DESIGN_DELTA N4 and is an
          open owner decision, so it is left exactly as it is. */}
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
          <div className="py-12 sm:py-16 lg:py-20">
            <div className={siteContainerLg}>
              <HeroContent city={city} />
            </div>
          </div>
        )}
      </section>

      {/* Contractor scene. No `max-w-4xl mx-auto` wrapper: `.prose-blog` already
          pins its own 65ch measure, so the clamp only narrowed the page. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="mb-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
            The {city.name} contractor scene
          </h2>
          <div
            className="prose-blog article-body"
            dangerouslySetInnerHTML={{ __html: city.contractorScene }}
          />
        </div>
      </section>

      {/* Key contractor sectors */}
      {city.keySectors.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="mb-8 text-2xl font-bold text-neutral-900 sm:text-3xl">
              The contractor sectors that drive {city.name}
            </h2>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {city.keySectors.map((sector) => (
                <div
                  key={sector.name}
                  className="rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 sm:p-6"
                >
                  <h3 className="text-base font-bold text-neutral-900 sm:text-lg">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {sector.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sector links to /for/* */}
      {city.sectorLinks.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Contractors we support in {city.name}
            </h2>
            <p className="mb-8 text-neutral-600">
              We work with contractors across {city.name}&apos;s main sectors.
              Each type has its own IR35 exposure, expense profile and
              tax-planning priorities.
            </p>
            <div className="flex flex-wrap gap-3">
              {city.sectorLinks.map((sectorSlug) => {
                const label = SECTOR_TITLES[sectorSlug] || sectorSlug;
                return (
                  <Link
                    key={sectorSlug}
                    href={`/for/${sectorSlug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    {label}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs. Native <details>, so every answer is in server HTML and the
          FAQPage JSON-LD above is truthful (DESIGN_DELTA §4 P2: never adopt the
          kit's Radix accordion, which unmounts closed answers). */}
      {hasFaqs && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="mb-8 text-2xl font-bold text-neutral-900 sm:text-3xl">
              IR35 questions from {city.name} contractors
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {city.localFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl bg-white ring-1 ring-neutral-200/70"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 transition-colors hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45"
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
                  <div className="border-t border-neutral-100 px-6 pb-6 pt-4 leading-relaxed text-neutral-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby areas */}
      {city.nearbyAreas.length > 0 && (
        <section className="bg-white py-10 sm:py-12">
          <div className={siteContainerLg}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600">
              Also serving contractors in
            </p>
            <p className="text-sm text-neutral-600">
              {city.nearbyAreas.join(" · ")}
            </p>
          </div>
        </section>
      )}

      {/* Related articles, the locations template's own slot. Recipe matched by
          hand rather than adopting the kit `RelatedArticles`: that component
          sets `focus-visible:outline-none` and delegates the ring to a
          `.related-card:focus-within` rule in globals-standard.css, which this
          site does not import, so the focus indicator would be invisible. */}
      {relatedPosts.length > 0 && (
        <section
          className="bg-slate-50 py-12 sm:py-16 lg:py-20"
          aria-labelledby="related-articles-heading"
        >
          <div className={siteContainerLg}>
            <h2
              id="related-articles-heading"
              className="mb-8 text-2xl font-bold text-neutral-900 sm:text-3xl"
            >
              Related articles
            </h2>
            <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <li key={p.slug} className="flex">
                  <Link
                    href={`/blog/${getCategorySlug(p)}/${p.slug}`}
                    className="flex h-full w-full flex-col rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 transition-colors hover:bg-neutral-50 hover:ring-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:p-6"
                  >
                    <span className="text-base font-bold leading-snug text-neutral-900 sm:text-lg">
                      {p.title}
                    </span>
                    <span className="mt-2.5 line-clamp-3 text-sm leading-6 text-neutral-600">
                      {p.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Closing ask. Was a full-bleed navy band sitting directly on the dark
          footer; `contained` restores the light band between them. The form is
          the same `LeadForm` that was already here. `proofPoints` EMPTY: the
          kit's defaults publish a fee line and a response-time promise, both of
          which are forbidden on this site. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Free call"
          title={`Talk to a contractor and IR35 specialist for ${city.name}`}
          description={`Book a free call. We will review your IR35 position, your structure and whether there is anything worth changing. We act for ${city.name} contractors entirely remotely. No jargon, no obligation.`}
          proofPoints={[]}
          formTitle="Book your free call"
          form={<LeadForm submitLabel="Request a callback" />}
          footnote={
            <>
              If you would rather write to us first, use the{" "}
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

// Extracted hero content to avoid duplication in conditional branches
function HeroContent({ city }: { city: (typeof CITIES)[string] }) {
  return (
    <div className="max-w-3xl w-full">
      <Breadcrumb
        siteUrl={siteConfig.url}
        onDark
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: city.name },
        ]}
      />
      {/* Mono eyebrow, not the `.eyebrow` class: that rule pins
          `color: var(--accent)` (3.69 here). It is `@layer components`, so a
          `text-*` utility WOULD beat it; hand-rolling needs no override at
          all. Replaces a `bg-cyan-700` pill. */}
      <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
        {city.region}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        Contractor accountants in{" "}
        <span className="text-primary-400">{city.name}</span>
      </h1>
      <div
        className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-200 prose-invert"
        dangerouslySetInnerHTML={{ __html: city.intro }}
      />
      {city.population && (
        <p className="mt-3 font-mono text-sm uppercase tracking-wider text-neutral-300">
          Population: {city.population}
        </p>
      )}
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
  );
}
