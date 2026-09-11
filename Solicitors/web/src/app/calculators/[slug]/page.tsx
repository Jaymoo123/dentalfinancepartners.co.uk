import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { getGenericTool, allTools } from "@/lib/tools/registry";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LEAD_PROOF_POINTS } from "@/lib/blog-category-copy";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { RelatedArticles } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import Link from "next/link";

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

  const webApp = buildWebApplication({
    name: tool.metaTitle,
    description: tool.metaDescription,
    path: `/calculators/${slug}`,
    applicationCategory: "FinanceApplication",
  });
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? buildFaqPage(tool.faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <>
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      <section className="relative overflow-hidden bg-slate-900 py-12 sm:py-16">
        <SolicitorsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow onDark>Free calculator · UK 2026/27</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
              {tool.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          {/* slug only — the function-bearing tool config resolves client-side (RSC lesson) */}
          <CalculatorClient slug={slug} variant="page" />

          {/* Resource island: gated xlsx + guide for the matched topic (renders nothing
              when no enabled asset exists for the calculator's topic). */}
          <CalculatorPageResources slug={slug} pageTitle={tool.name} />
        </div>
      </section>

      {tool.explainer && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
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
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            {/* No heading: every candidate is authored copy and the hard rule of
                2026-09-11 forbids it. The per-card "Calculator" pill is the
                component's own chrome and carries the meaning. Owner item. */}
            <RelatedArticles
              items={tool.related.map((r) => ({ href: r.href, title: r.label }))}
            />
          </div>
        </section>
      )}

      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          title="Need help interpreting your results?"
          description="These calculators give directional figures based on published rates. Your actual position depends on firm structure, basis period adjustments, existing capital contributions, and your specific revenue profile. We model the full picture as part of our advisory work."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} />}
          backdrop={<SolicitorsBackdrop tone="navy" />}
          footnote={
            /* The live `calculator-page-cta` element, kept verbatim: LeadForm
               carries no data-cta, so retiring this link would fork the
               vw_cta_performance series (plan T22/R4). */
            <Link
              href="/contact"
              className={`inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)] ${focusRing}`}
              data-cta="calculator-page-cta"
              data-cta-goal="form"
              data-cta-placement="calculator"
            >
              {tool.ctaLabel ?? "Book a free consultation"}
            </Link>
          }
        />
      </div>

      {tool.faqs && tool.faqs.length > 0 && (
        /* Light band between the navy panel and the navy footer (DS 0.1).
           Deliberately a plain <dl>, not the kit accordion: that component
           escapes HTML in answers and keeps closed answers out of the server
           HTML. One array feeds this and the FAQPage JSON-LD. */
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-4">
              {tool.faqs.map((f) => (
                <div
                  key={f.question}
                  className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70"
                >
                  <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-slate-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
    </>
  );
}
