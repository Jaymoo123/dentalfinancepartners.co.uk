import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  btnOnDark,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { charityTypes, getCharityType } from "@/data/charity-types";
import { buildFaqJsonLd } from "@/lib/schema";
import {
  CtaBand,
  FaqSection,
  HubSection,
  LinkCardGrid,
  PageHero,
  RichCardGrid,
} from "@/components/hubs/HubParts";

export function generateStaticParams() {
  return charityTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = getCharityType(slug);
  if (!type) return {};
  return {
    title: { absolute: type.metaTitle },
    description: type.metaDescription,
    alternates: { canonical: `${siteConfig.url}/for/${slug}` },
  };
}

export default async function CharityTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getCharityType(slug);
  if (!type) notFound();

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow={type.title}
        title={`${type.headline}.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Sectors", href: "/for" },
          { label: type.title },
        ]}
        actions={
          <Link href="/contact" className={btnOnDark}>
            Get in touch
          </Link>
        }
      >
        {/* intro carries inline <a> anchors in src/data/charity-types.ts. Every
            pre-port template rendered it as {type.intro}, which escaped the
            markup and shipped the tags as visible text on this route. */}
        <p dangerouslySetInnerHTML={{ __html: type.intro }} />
      </PageHero>

      <section className="bg-slate-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {type.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="font-mono text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HubSection
        eyebrow="The problem"
        title={`What makes ${type.title.toLowerCase()} accounting different.`}
      >
        <RichCardGrid items={type.challenges} columns={2} tone="slate" />
      </HubSection>

      <HubSection
        eyebrow="The work"
        title={`How we help ${type.title.toLowerCase()}.`}
        ground="slate"
      >
        <RichCardGrid items={type.howWeHelp} columns={3} tone="white" />
        <Link
          href="/services"
          className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
        >
          View all services
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </HubSection>

      {type.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(type.faqs) }}
        />
      )}
      <FaqSection faqs={type.faqs} />

      <CtaBand title="Speak to a specialist.">
        <p>
          Tell us about your {type.title.toLowerCase()} and we will arrange a short introductory
          call.
        </p>
      </CtaBand>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Other sectors we work with</Eyebrow>
          <LinkCardGrid
            compact
            columns={2}
            items={charityTypes
              .filter((t) => t.slug !== slug)
              .map((t) => ({ href: `/for/${t.slug}`, title: t.title }))}
          />
          <Link
            href="/for"
            className={`mt-6 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 ${focusRing}`}
          >
            See all sectors we work with
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
