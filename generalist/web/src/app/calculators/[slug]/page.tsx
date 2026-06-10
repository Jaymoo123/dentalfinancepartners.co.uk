import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { Calculator as CalcIcon } from "lucide-react";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool, allTools } from "@/lib/tools/registry";
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

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: tool.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              <CalcIcon className="h-3.5 w-3.5" />
              Free calculator · 2025/26 rates
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{tool.name}</h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">{tool.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto">
            <Calculator tool={tool} variant="page" />

            {tool.explainer && (
              <div className="mt-12 border-l-4 border-orange-600 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">{tool.explainer.heading}</h2>
                {tool.explainer.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-base text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {tool.faqs && tool.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
                <dl className="space-y-4">
                  {tool.faqs.map((f) => (
                    <div key={f.question} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                      <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                      <dd className="mt-3 text-base text-slate-700 leading-relaxed">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="mt-12 bg-slate-900 p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Numbers are one thing. Getting the timing right is another.
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200 leading-relaxed">
                Every figure here is modelled on standard 2025/26 thresholds. Your actual position
                depends on prior-year usage, pension carry-forward, other income sources, and how
                your decisions interact with each other. We build those models as part of our
                advisory work.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block bg-orange-600 px-8 py-3 text-base font-bold text-white border-b-4 border-orange-800 hover:bg-orange-700 hover:border-orange-900 transition-all"
              >
                {tool.ctaLabel ?? "Book a free call"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
