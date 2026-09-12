import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContainerLg, btnOnDark } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { JsonLd, buildFaqPage, type FaqEntry, type SchemaThing } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { CITIES } from "./[slug]/data";

export const metadata: Metadata = {
  title: `Accountants near you across the UK`,
  description:
    "Specialist accountants for UK businesses across nearly 200 UK cities and towns. Local context, sector emphasis, fixed fees. Find your accountant in London, Manchester, Birmingham, Leeds, Bristol, Edinburgh and many more.",
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: `Accountants near you across the UK | ${siteConfig.name}`,
    description: "Specialist accountants for UK businesses across nearly 200 cities and towns.",
    url: `${siteConfig.url}/locations`,
    type: "website",
  },
};

// Tiered city groupings reflect business density, not arbitrary order.
const METRO_SLUGS = [
  "london", "manchester", "birmingham", "leeds", "bristol",
  "edinburgh", "glasgow", "liverpool", "sheffield", "newcastle",
];
const REGIONAL_SLUGS = [
  "bradford", "nottingham", "cardiff", "reading", "brighton",
  "portsmouth", "coventry", "bournemouth", "plymouth", "hull",
  "leicester", "stoke-on-trent", "wolverhampton", "derby", "southampton",
  "milton-keynes", "northampton", "oxford", "cambridge", "york",
];

const FAQS: FaqEntry[] = [
  {
    question: "What is on each location page?",
    answer:
      "The sectors that actually drive that local economy, the anchor employers around it, a worked example for a business of that type, and questions we get asked in that area. It is written against the town rather than swapped in from a template, which is why there is one page per location instead of one page with a dropdown.",
  },
  {
    question: "My town is not on the list. Can you still act for me?",
    answer:
      "Yes. The pages cover the towns and cities we get asked about most often, not the limit of where we work. We act for businesses across the whole of the United Kingdom, and nothing about the service changes if your postcode has no page of its own.",
  },
  {
    question: "Do you have an office in every town listed here?",
    answer:
      "No, and we do not claim to. We are a remote-first practice with one registered office, and the location pages describe the businesses and sectors we serve in each area rather than a branch on the high street. In-person meetings are available on request in the major cities.",
  },
  {
    question: "Do you work with businesses in Scotland, Wales and Northern Ireland?",
    answer:
      "Yes. Corporation tax, VAT and Companies House filing are the same across the United Kingdom. Where the rules do diverge, such as the separate Scottish income tax bands that apply to Scottish taxpayers, that is handled in the return rather than being a reason to use a different accountant.",
  },
  {
    question: "Does where my business is based change what I have to file?",
    answer:
      "Rarely. A UK company files the same accounts and corporation tax return wherever it trades, and the VAT registration threshold of £90,000 of taxable turnover is UK-wide. What genuinely changes by area is the commercial picture: sector mix, typical margins, wage pressure and what the local competition charges. That is what the location pages are for.",
  },
  {
    question: "How do I choose between the location page and just booking a call?",
    answer:
      "Read the page if you want a sense of whether we understand your kind of business before you speak to anyone. Book the call if you already know what you need. Either route reaches the same accountant, and the call is free and carries no obligation.",
  },
];

function CityCard({ slug }: { slug: string }) {
  const city = CITIES[slug];
  if (!city) return null;
  return (
    <Link
      href={`/locations/${city.slug}`}
      className="group block rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 transition-colors hover:ring-primary-600 sm:p-8"
    >
      <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-700">
        Accountant in {city.name}
      </h3>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
        {city.region}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {city.businessHubs.slice(0, 3).join(" · ")}
      </p>
      <span className="mt-4 flex items-center text-sm font-semibold text-primary-700">
        View {city.name} page
        <ArrowRight
          aria-hidden
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

function SimpleCityLink({ slug }: { slug: string }) {
  const city = CITIES[slug];
  if (!city) return null;
  return (
    <Link
      href={`/locations/${city.slug}`}
      className="group flex min-h-[44px] items-center justify-between gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-primary-600 hover:text-primary-700"
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
  const totalCities = Object.keys(CITIES).length;
  const featuredSet = new Set([...METRO_SLUGS, ...REGIONAL_SLUGS]);
  const restSlugs = Object.keys(CITIES).filter((s) => !featuredSet.has(s));
  const metro = METRO_SLUGS.filter((s) => CITIES[s]);
  const regional = REGIONAL_SLUGS.filter((s) => CITIES[s]);
  const rest = restSlugs
    .filter((s) => CITIES[s])
    .sort((a, b) => (CITIES[a]?.name || "").localeCompare(CITIES[b]?.name || ""));
  // Identical binding to the FaqSection below, so markup and schema cannot drift.
  const faqPage = buildFaqPage(FAQS);
  const webPage: SchemaThing = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Accountants near you across the UK",
    description: `Specialist accountants for UK businesses across ${totalCities} cities and towns.`,
    url: `${siteConfig.url}/locations`,
  };

  return (
    <>
      {/* BreadcrumbList is emitted by the kit <Breadcrumb> below. */}
      <JsonLd data={faqPage ? [webPage, faqPage] : [webPage]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Locations" }]}
            />
            <Eyebrow onDark>UK coverage</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Find an accountant in your part of the UK
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Specialist accountants for limited companies, contractors, sole traders, partnerships
              and small businesses across {totalCities} UK cities and towns. Every location page is
              researched against the local economic mix, named employers and sector emphasis.
              National coverage, remote-first, in-person on request.
            </p>
            <a
              href="#book"
              data-cta="locations_hero"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-6`}
            >
              Book a free call
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Major cities</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            The largest UK business centres
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metro.map((s) => (
              <CityCard key={s} slug={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Regional cities</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Regional centres and university cities
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regional.map((s) => (
              <CityCard key={s} slug={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>More UK locations</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Every other town and city we cover
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-600">
            {rest.length} further location pages, each with local sector context, named employers
            and a town-specific FAQ. If you would rather read the case for a remote-first
            accountant first, start on{" "}
            <Link href="/accountant-near-me" className="font-semibold text-primary-700 underline">
              accountant near me
            </Link>
            .
          </p>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {rest.map((s) => (
              <SimpleCityLink key={s} slug={s} />
            ))}
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="No page for your town yet?"
          description="The list covers the places we are asked about most, not the limit of where we work. Book a free 30-minute call and we will talk through your structure, your year end and what moving would involve."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Book a free call" redirectOnSuccess={false} />}
          contained
          ground="slate"
          footnote="No obligation and no hard sell. If your current arrangement is already working, we will say so."
        />
      </div>

      <FaqSection faqs={FAQS} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
