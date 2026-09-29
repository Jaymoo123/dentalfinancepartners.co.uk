import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { hospitalityHubs, getHospitalityHub } from "@/data/hospitality-hubs";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export function generateStaticParams() {
  return hospitalityHubs.map((h) => ({ slug: h.slug }));
}

/**
 * Same anchor contract as the sibling template
 * (src/app/services/[slug]/page.tsx:20-38, identical strings). No `body`,
 * `intro` or `answer` in src/data/hospitality-hubs.ts authors an anchor today
 * (`grep -c '<a href' src/data/hospitality-hubs.ts` = 0), but the two templates
 * read the same shape and the same writers, so the treatment is kept identical
 * rather than left to be discovered missing the first time a sector record
 * gains a link.
 */
const authoredLinkRing =
  "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-700 ${authoredLinkRing}`;
const linkOnBrand = `[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 ${authoredLinkRing}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHospitalityHub(slug);
  if (!hub) return {};
  return {
    title: { absolute: hub.metaTitle },
    description: hub.metaDescription,
    alternates: { canonical: `${siteConfig.url}/for/${slug}` },
  };
}

export default async function HospitalityHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = getHospitalityHub(slug);
  if (!hub) notFound();

  return (
    <>
      {/* 2026-09-28 parity fix (brief section 5, G3): had FAQPage but no
          Service node and no BreadcrumbList. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildServiceJsonLd({
            name: `Accounting for ${hub.title}`,
            description: hub.metaDescription,
            url: `/for/${slug}`,
          }),
        }}
      />
      {/* This template is the sibling of src/app/services/[slug]/page.tsx and
          every adoption and decline below is the same decision, made once and
          written there in full (that file's :79-120 for the hero, :150-172 for
          the stats band, :193-229 for the card grids, :257-276 for the FAQ).
          Summarised here so this file can be reviewed on its own:
          ADOPTED  Breadcrumb tone="onBrand" (replaces the "All sectors"
                   back-link at the old :63-65; the local <JsonLd
                   buildBreadcrumb> block is removed in the same edit so there
                   is exactly ONE BreadcrumbList emitter per URL).
          ADOPTED  HospitalityBackdrop + host contract + .ground-dark. Ground
                   bg-primary-600 #b0532f, composite #b55834: white 5.09 / 4.76
                   PASS; the white/80 standfirst 3.87 / 3.66 SUB-FLOOR, and it
                   was sub-floor before this package.
          ADOPTED  ScrollGlowGroup on both card grids, Eyebrow on the "Other
                   sectors we work with" rail, FaqSection html
                   alwaysRenderAnswers, LeadCTAPanel backdrop.
          DECLINED SlimHero (hardcoded bg-slate-900, SlimHero.tsx:36, K1),
                   StatsCounter (text-slate-900 figure at :119 on a dark band,
                   fixed md:grid-cols-4 at :116 against three stats),
                   CardStack / CoverageCards / ProcessTimeline /
                   ProblemStatement / ComparisonTable / WhatToExpectCard /
                   DrawnTickList, and Eyebrow in the hero. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-600 py-16 sm:py-20">
        <HospitalityBackdrop patternId="sector-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "For", href: "/for" },
              { label: hub.title },
            ]}
          />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{hub.headline}.</h1>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnBrand}`}
            dangerouslySetInnerHTML={{ __html: hub.intro }}
          />
          <div className="mt-10">
            {/* data-cta on the control, never on the wrapper (R5 B2). Link,
                destination and label unchanged; the ring is new. */}
            <Link
              href="/contact"
              data-cta="sector_hero_contact"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-600 hover:bg-white/90 transition-colors ${focusRing}`}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {hub.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {hub.title.toLowerCase()} accounting different.</h2>
          <ScrollGlowGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {hub.challenges.map((item) => (
              <article key={item.title} className="border border-slate-200 border-l-4 border-l-primary-600 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p
                  className={`mt-4 text-base leading-relaxed text-slate-600 ${linkOnLight}`}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </article>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {hub.title.toLowerCase()}.</h2>
          <ScrollGlowGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {hub.howWeHelp.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 p-6 sm:p-8 hover:border-primary-600 hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed text-slate-600 ${linkOnLight}`}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            ))}
          </ScrollGlowGroup>
          <div className="mt-10">
            <Link href="/services" className={`inline-flex items-center gap-2 text-primary-600 hover:opacity-80 font-semibold text-sm sm:text-base transition-opacity ${focusRing}`}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {hub.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(hub.faqs) }} />
      )}
      {hub.faqs.length > 0 && (
        <div className={linkOnLight}>
          <FaqSection
            eyebrow=""
            title="Common questions"
            faqs={hub.faqs}
            tone="white"
            html
            alwaysRenderAnswers
            className="bg-white py-12 sm:py-16 lg:py-20"
          />
        </div>
      )}

      {/* 2026-09-28 parity fix (brief section 4): this page rendered zero forms,
          only a /contact link. Swapped for the shared LeadCTAPanel + this
          site's own LeadForm, same pattern as ecommerce's /for/[slug].
          W3 changes no string here; it adds only `backdrop`. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a specialist."
        description={`Tell us about your ${hub.title.toLowerCase()} business and we will reply within 24 hours.`}
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel="Request callback" />}
        backdrop={<HospitalityBackdrop patternId="sector-cta" />}
      />

      <section className="bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          {/* ADOPTED: `Eyebrow`, fed this rail's OWN published label unchanged.
              Replaces the hand-rolled uppercase micro-label; the kit recipe
              adds the brand EyebrowRule mark and lifts the text from the
              neutral 500 step to slate-600 (4.55 -> 7.25 on this ground). */}
          <Eyebrow>Other sectors we work with</Eyebrow>
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {hospitalityHubs.filter((h) => h.slug !== slug).map((h) => (
              <Link key={h.slug} href={`/for/${h.slug}`} className={`group block border border-slate-200 bg-white p-4 transition-all hover:border-primary-600 hover:shadow-sm ${focusRing}`}>
                <span className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">{h.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/for" className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:opacity-80 transition-opacity ${focusRing}`}>
              See all sectors we work with
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
