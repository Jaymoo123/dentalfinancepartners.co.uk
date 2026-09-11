import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import { LeadCTAPanel } from "@/components/marketing/LeadCTAPanel";
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

  const description = `CIS accountants for construction subcontractors and contractors in ${city.name}. CIS refunds, gross payment status and self assessment.`;

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
    description: `Specialist CIS accountants for construction subcontractors and contractors in ${city.name}. CIS refunds, gross payment status, self assessment, sole trader and limited company accounting.`,
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

      {/* Hero. The photo branch that used to sit here was DEAD CODE: no city in
          data.ts carries a heroImage payload, so the 420px image, its three-stop
          scrim and its two outbound photo credits never rendered on any of the 25
          routes. Removed with the field, and replaced by the brand motif hero. */}
      <section className="relative overflow-hidden bg-neutral-900 py-16 sm:py-20">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <HeroContent city={city} />
        </div>
      </section>

      {/* Contractor scene */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
            The {city.name} construction scene
          </h2>
          <div
            className="prose-blog article-body"
            dangerouslySetInnerHTML={{ __html: city.contractorScene }}
          />
        </div>
      </section>

      {/* Major projects */}
      {city.majorProjects.length > 0 && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
              Major construction projects in {city.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {city.majorProjects.map((project) => (
                <div
                  key={project.name}
                  className="bg-white border border-neutral-200 border-l-4 border-l-[var(--btn-ground)] p-5 sm:p-6"
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
        </section>
      )}

      {/* Trade mix linking to /for/* */}
      {city.tradeMix.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className={siteContainerLg}>
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
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {hasFaqs && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className={siteContainerLg}>
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
                      className="flex-shrink-0 text-[var(--accent-strong)] transition-transform group-open:rotate-45"
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
        </section>
      )}

      {/* Nearby areas */}
      {city.nearbyAreas.length > 0 && (
        <section className="bg-white py-10 sm:py-12">
          <div className={siteContainerLg}>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Also covering
            </p>
            <p className="text-sm text-neutral-600">
              {city.nearbyAreas.join(" · ")}
            </p>
          </div>
        </section>
      )}

      {/* The closing ask. This used to be a full-bleed bg-neutral-900 band, which
          made it the last opaque band under <main> on all 25 city routes, running
          straight into the slate-900 footer: DESIGN_SYSTEM.md section 9 forbids
          navy touching navy, and this one template was 25 of the 29 routes in
          breach. `contained` renders the panel on --hero-cream, so the tail is now
          white (nearby areas), cream (panel), navy (footer). The same LeadForm is
          inside the panel, so no capture is lost. Static band in the page body:
          nothing interruptive, and no data-cta id, so trap 22's locked triples do
          not move. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          eyebrow="Get started"
          title={`Talk to a CIS specialist in ${city.name}`}
          description="Book a free call. We will review your CIS position, check your deduction history and tell you whether you are owed a refund."
          proofPoints={[
            {
              title: "CIS specialists only",
              detail: "Construction tax is the whole of what we do, not a sideline.",
            },
            {
              title: "Nationwide, remote-first",
              detail: `We work with ${city.name} subcontractors wherever the site is.`,
            },
            {
              title: "No hard sell, no obligation",
              detail: "If your CIS position is already right, we will say so.",
            },
          ]}
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
