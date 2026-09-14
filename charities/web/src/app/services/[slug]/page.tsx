import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { btnOnDark, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { charityServices, getCharityService } from "@/data/charity-services";
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

  return (
    <>
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
        <p>{service.intro}</p>
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

      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }}
        />
      )}
      <FaqSection faqs={service.faqs} />

      <CtaBand title="Speak to a charity accounts specialist.">
        <p>
          Tell us about your charity, CIC or social enterprise and we will arrange a short
          introductory call. No obligation.
        </p>
      </CtaBand>

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
