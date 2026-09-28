import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { btnOnDark, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { EntityBlock } from "@accounting-network/web-shared/design/marketing/EntityBlock";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { JsonLd, buildFaqPage, buildService } from "@accounting-network/web-shared/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { charityServices, getCharityService } from "@/data/charity-services";
import {
  FaqSection,
  HubSection,
  LinkCardGrid,
  PageHero,
  RichCardGrid,
} from "@/components/hubs/HubParts";

export function generateStaticParams() {
  return charityServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getCharityService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getCharityService(slug);
  if (!service) notFound();

  const schemaOpts = {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.legalName,
    publisherLogoUrl: siteConfig.publisherLogoUrl,
  };
  const faqSchema = buildFaqPage(service.faqs);

  return (
    <>
      <JsonLd
        data={[
          buildService(
            {
              name: service.title,
              description: service.metaDescription,
              url: `/services/${service.slug}`,
              areaServed: "United Kingdom",
            },
            schemaOpts,
          ),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <PageHero
        tone="dark"
        eyebrow={service.title}
        title={`${service.headline}.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        actions={
          <Link href="/contact" className={btnOnDark}>
            Get in touch
          </Link>
        }
      >
        {/* intro carries inline <a> anchors in src/data/charity-services.ts (Wave 1,
            LEADS_250_PROGRAMME_2026-09-27 S4a); plain {service.intro} escaped them
            as visible text, matching the defect already fixed on the for/[slug] route. */}
        <p dangerouslySetInnerHTML={{ __html: service.intro }} />
      </PageHero>

      {/* Stat band. slate-800 under the slate-900 hero so the two read as
          separate bands; the mono figures and the label treatment are the
          pre-port ones. */}
      <section className="bg-slate-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {service.stats.map((stat) => (
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

      <HubSection eyebrow="The problem" title="The challenges trustees face.">
        <RichCardGrid items={service.challenges} columns={2} tone="slate" />
      </HubSection>

      <HubSection eyebrow="The work" title="How we help." ground="slate">
        <RichCardGrid items={service.howWeHelp} columns={3} tone="white" />
      </HubSection>

      {niche.entity ? <EntityBlock {...niche.entity} /> : null}

      <FaqSection faqs={service.faqs} />

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Get started"
          title={`Talk to a specialist about ${service.title}`}
          description="Tell us about your charity, CIC or social enterprise. We will explain what your organisation needs, in plain English, with no obligation."
          proofPoints={[]}
          formTitle="Get in touch"
          form={<LeadForm submitLabel="Send enquiry" />}
          contained
          ground="white"
        />
      </div>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Other services</Eyebrow>
          <LinkCardGrid
            compact
            columns={5}
            items={charityServices
              .filter((s) => s.slug !== slug)
              .map((s) => ({ href: `/services/${s.slug}`, title: s.title }))}
          />
        </div>
      </section>
    </>
  );
}
