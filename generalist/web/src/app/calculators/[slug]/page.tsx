import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg, btnOnDark } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { getGenericTool, allTools } from "@/lib/tools/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTools()
    .filter((t) => t.kind === "generic")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `${siteConfig.url}/calculators/${slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteConfig.url}/calculators/${slug}`,
      type: "website",
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  // ONE faq array: the schema and the rendered accordion read the same value,
  // so the two cannot drift.
  const faqs = tool.faqs ?? [];
  const webApp = buildWebApplication({
    name: tool.metaTitle,
    description: tool.metaDescription,
    path: `/calculators/${slug}`,
    applicationCategory: "FinanceApplication",
  });
  const faqSchema = faqs.length > 0 ? buildFaqPage(faqs) : null;

  return (
    <>
      {/* BreadcrumbList is emitted by the kit <Breadcrumb> below. */}
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow onDark>Free calculator · 2026/27 rates</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{tool.intro}</p>
            <a
              href="#get-expert-help"
              data-cta="calc_hero_help"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`${btnOnDark} mt-6`}
            >
              Ask an accountant about your figure
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          {/* slug only — the function-bearing tool config resolves client-side */}
          <CalculatorClient slug={slug} variant="page" />

          {/* Premium island: resolves topic from slug, renders only when a
              premium tool exists (renders null for unmapped topics). */}
          <CalculatorPageResources slug={slug} />
        </div>
      </section>

      {tool.explainer && (
        <section className="bg-white py-12 sm:py-16">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              {tool.explainer.heading}
            </h2>
            <Prose>
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Prose>
          </div>
        </section>
      )}

      {tool.related && tool.related.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainerLg}>
            <Eyebrow>Related reading</Eyebrow>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">
              Read this next
            </h2>
            <RelatedArticles
              items={tool.related.map((r) => ({ href: r.href, title: r.label }))}
            />
          </div>
        </section>
      )}

      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          title="Numbers are one thing. Getting the timing right is another."
          description="Every figure here is modelled on standard 2026/27 thresholds. Your actual position depends on prior-year usage, pension carry-forward, other income, and how your decisions interact. A free call gets that read properly."
          proofPoints={LEAD_PROOF_POINTS}
          form={
            <LeadForm
              submitLabel={tool.ctaLabel ?? "Book a free call"}
              redirectOnSuccess={false}
            />
          }
          backdrop={<GeneralistBackdrop />}
        />
      </div>

      {faqs.length > 0 && (
        <FaqSection faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
      )}
    </>
  );
}
