import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg, sectionY, sectionYLoose, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { getGenericTool, allTools } from "@/lib/tools/registry";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
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

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
              Free calculator · UK 2025/26
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {tool.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            {/* slug only — the function-bearing tool config resolves client-side (RSC lesson) */}
            <CalculatorClient slug={slug} variant="page" />

            {tool.explainer && (
              <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
                  {tool.explainer.heading}
                </h2>
                {tool.explainer.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Resource island: gated xlsx + guide for the matched topic (renders nothing
                when no enabled asset exists for the calculator's topic). */}
            <CalculatorPageResources slug={slug} pageTitle={tool.name} />

            {tool.faqs && tool.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                  Frequently asked questions
                </h2>
                <dl className="mt-6 space-y-4">
                  {tool.faqs.map((f) => (
                    <div
                      key={f.question}
                      className="rounded-2xl border border-[var(--border)] bg-white p-6"
                    >
                      <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                        {f.question}
                      </dt>
                      <dd className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                        {f.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="mt-12 rounded-2xl bg-[var(--primary)] p-8 text-white sm:p-10">
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Need help interpreting your results?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
                These calculators give directional figures based on published rates. Your actual position depends on firm structure, basis period adjustments, existing capital contributions, and your specific revenue profile. We model the full picture as part of our advisory work.
              </p>
              <Link
                href="/contact"
                className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)] ${focusRing}`}
                data-cta="calculator-page-cta"
                data-cta-goal="form"
                data-cta-placement="calculator"
              >
                {tool.ctaLabel ?? "Book a free consultation"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
