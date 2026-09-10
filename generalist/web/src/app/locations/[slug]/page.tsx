import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnOnDark, btnPrimary, linkArrow } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import {
  RelatedArticles,
  type RelatedArticleItem,
} from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { SERVICE_LINES } from "@/lib/service-lines";
import { getRelatedPosts, slugifyCategory, firstSentence } from "@/lib/blog";
import { CITIES } from "./data";
import { JsonLd, buildAccountingService, buildFaqPage } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

/**
 * The reading offered under every city page. Locations are not a blog category
 * and no post is written about a specific town, so there is nothing to match on
 * per city; this is the standing limited-company set, which is the subject the
 * location traffic actually arrives on.
 * ponytail: one category read, not a 193x scan for town names that no post
 * contains. Swap for a city-matched set the day city-tagged posts exist.
 */
const RELATED_CATEGORY = "Limited Company Tax";

/** The six lines the city grid shows, from the single /services source. */
const CITY_SERVICES = SERVICE_LINES.slice(0, 6).map((s) => ({
  title: s.title,
  body: s.body,
  icon: s.icon,
}));

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) return { title: "Location not found" };

  const url = `${siteConfig.url}/locations/${city.slug}`;
  // Singular "Accountant in [City]" per the primary keyword research.
  // Title is brand-less: the root layout template appends " | Holloway Davies"
  // once. Including the brand here as well double-stamped it ("... | Holloway
  // Davies | Holloway Davies"). Description folds in small-business service-intent.
  return {
    title: `Accountant in ${city.name}`,
    description: `Small business accountant in ${city.name}: corporation tax, VAT, payroll, self assessment, R&D and exit planning for limited companies, contractors and sole traders. Fixed fees, free call.`,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title: `Accountant in ${city.name}`,
      description: `Specialist accountant in ${city.name}. Fixed fees, national coverage, free initial call.`,
      url,
      type: "website",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) notFound();

  // LocalBusiness / AccountingService schema with broadened areaServed and
  // sector knowledge for richer local entity signals.
  const localBusiness = buildAccountingService({
    name: `${siteConfig.name} - ${city.name}`,
    description: `Senior accountant in ${city.name}. Corporation tax, VAT, payroll, R&D credits, exit planning. Serving limited companies, contractors, sole traders, partnerships and small businesses across ${city.region}.`,
    url: `/locations/${city.slug}`,
    city: city.name,
    address: { addressRegion: city.region },
    geo: { latitude: city.geo.latitude, longitude: city.geo.longitude },
    areaServed: [city.name, ...city.nearbyAreas],
  });
  // No price band is asserted here: the site publishes no pricing, so one would
  // be a structured claim nothing on the page supports.
  Object.assign(localBusiness as Record<string, unknown>, {
    parentOrganization: { "@type": "Organization", "@id": `${siteConfig.url}#organization` },
    serviceType: [
      "Limited company accounting",
      "Sole trader accounting",
      "Contractor accounting",
      "Tax planning",
      "Management accounts",
      "Payroll and PAYE",
      "VAT and MTD",
      "R&D tax credits",
      "Exit planning",
    ],
    knowsAbout: city.localSectors,
  });

  // Same array feeds the accordion below, so markup and schema cannot drift.
  const faqSchema = buildFaqPage(
    city.localFaqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  const related: RelatedArticleItem[] = getRelatedPosts("", RELATED_CATEGORY, 3).map((p) => ({
    href: `/blog/${slugifyCategory(p.category)}/${p.slug}`,
    title: p.title,
    excerpt: firstSentence(p.contentHtml, p.summary),
  }));

  return (
    <>
      <JsonLd data={faqSchema ? [localBusiness, faqSchema] : [localBusiness]} />

      {/* HERO */}
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[380px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: city.name },
              ]}
            />
            <Eyebrow onDark>{city.region}</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Accountant in {city.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {city.intro}
            </p>
            <DrawnTickList
              className="mt-6"
              items={["Experienced team", "Fixed fees", "National coverage"]}
            />
            <a
              href="#book"
              data-cta="location_hero_book"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-8`}
            >
              Speak to an accountant in {city.name}
            </a>
          </div>
        </div>
      </section>

      {/* WHY HERE + BUSINESS SCENE + BUSINESS HUBS */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Why we work with {city.name} businesses
          </h2>
          <Prose>
            <p>{city.whyHere}</p>
          </Prose>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-4xl">
            The {city.name} business scene
          </h2>
          <Prose>
            <p>{city.businessScene}</p>
          </Prose>

          <div className="mt-10">
            <NoticeCard tone="slate" ground="white" title={`Business hubs in ${city.name}`}>
              <p className="text-base text-slate-700">{city.businessHubs.join(" · ")}</p>
            </NoticeCard>
          </div>
        </div>
      </section>

      {/* SECTOR EMPHASIS + KEY EMPLOYERS */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-6 flex flex-wrap gap-2">
            {city.localSectors.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            How {city.name}&rsquo;s economic mix shapes our service emphasis
          </h2>
          <Prose>
            <p>{city.sectorEmphasis}</p>
          </Prose>
          {city.keyEmployers.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Anchor employers in {city.name}
              </p>
              <p className="mt-2 text-base text-slate-700">{city.keyEmployers.join(" · ")}</p>
            </div>
          )}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            What we do for {city.name} businesses
          </h2>
          <div className="mt-8 sm:mt-10">
            <CoverageCards items={CITY_SERVICES} tone="slate" columns={2} />
          </div>
          <p className="mt-8 text-sm text-slate-600">
            <Link href="/services" className={linkArrow}>
              See all our services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* LOCAL CASE STUDY + MID-PAGE CTA */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>{city.name} case study (anonymised)</Eyebrow>
          <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {city.localCaseStudy.headline}
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {city.localCaseStudy.business_type}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {city.localCaseStudy.body}
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Want the same read on your own figures?
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-700">
              What it costs depends on the size and structure of the business, so we will talk that
              through rather than quote blind.
            </p>
            <a
              href="#book"
              data-cta="location_mid_book"
              data-cta-placement="mid"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6`}
            >
              Book a free call
            </a>
          </div>
        </div>
      </section>

      {/* LOCAL FAQS */}
      <FaqSection mountAnswers
        eyebrow="FAQ"
        title={`Frequently asked questions from ${city.name}`}
        faqs={city.localFaqs}
        className="bg-white pt-12 sm:pt-16 lg:pt-20"
      />

      {/* Adjacent town cross-link (non-templated, one per page) */}
      <section className="bg-white pb-12 pt-10 sm:pb-16 sm:pt-12 lg:pb-20">
        <div className={siteContainerLg}>
          <div className="border-t border-slate-200 pt-8 text-base text-slate-600">
            Also based in or near {city.adjacentTown.name}? See our{" "}
            <Link
              href={`/locations/${city.adjacentTown.slug}`}
              className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
            >
              accountant in {city.adjacentTown.name}
            </Link>{" "}
            page.
          </div>
        </div>
      </section>

      {/* RELATED READING */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <Eyebrow>Related reading</Eyebrow>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl sm:mb-12">
              Guides for limited company owners
            </h2>
            <RelatedArticles columns={3} items={related} />
          </div>
        </section>
      )}

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title={`Speak to an accountant in ${city.name}`}
          description="Book a free 30-minute call. We will talk through your situation and give you clear, practical recommendations. No jargon, no obligation."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Book a free call" redirectOnSuccess />}
          contained
          ground="white"
        />
      </div>
    </>
  );
}
