import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildService, buildFaqPage, JsonLd } from "@accounting-network/web-shared/schema";
import { CardStack } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TopicHero, TopicSection } from "@/components/property/TopicSection";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { audiences, getAudience } from "@/data/audiences";

export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};
  return {
    title: audience.metaTitle,
    description: audience.metaDescription,
    alternates: { canonical: `${siteConfig.url}/for/${slug}` },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const pagePath = `/for/${slug}`;
  const pageUrl = `${siteConfig.url}${pagePath}`;

  const serviceSchema = buildService(
    {
      name: audience.title,
      description: audience.metaDescription,
      url: pageUrl,
      audience: audience.title,
      areaServed: "United Kingdom",
    },
    {
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: siteConfig.legalName,
      publisherLogoUrl: siteConfig.publisherLogoUrl,
    },
  );
  const faqSchema = buildFaqPage(audience.faqs);

  return (
    <>
      <JsonLd data={faqSchema ? [serviceSchema, faqSchema] : serviceSchema} />

      <TopicHero
        breadcrumb={
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: audience.title }]} onDark />
        }
        title={audience.headline}
        standfirst={<span dangerouslySetInnerHTML={{ __html: audience.intro }} />}
        primary={null}
        secondary={null}
      />

      {audience.stats.length > 0 && (
        <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
          <div className={siteContainerLg}>
            {/* Plain text, not StatsCounter: values are strings like "18% / 24%"
                or "£3,000", not single numbers a count-up animation can parse. */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
              {audience.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TopicSection id="challenges" eyebrow="What lands on your desk" title="What you are dealing with">
        <CardStack items={audience.challenges} columns={2} html />
      </TopicSection>

      <TopicSection id="how-we-help" eyebrow="What a specialist reviews" title="What a specialist reviews" tone="slate">
        <CardStack items={audience.howWeHelp} columns={2} tone="white" html />
      </TopicSection>

      <FaqSection faqs={audience.faqs} html />

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          eyebrow="Free first call, then a fixed fee in writing"
          title="Talk to a specialist about your situation"
          description="Book a free first call. No obligation, no hard sell. If we take the work on, you get a fixed fee in writing before anything starts."
          proofPoints={[]}
          formTitle="Book your free first call"
          submitLabel="Request callback"
        />
      </div>
    </>
  );
}
