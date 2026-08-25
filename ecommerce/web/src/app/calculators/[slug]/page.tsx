import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { buildFaqJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return genericTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  return {
    title: { absolute: tool.metaTitle },
    description: tool.metaDescription,
    alternates: { canonical: `${site.url}/calculators/${tool.slug}` },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: tool.name,
            description: tool.metaDescription,
            path: `/calculators/${tool.slug}`,
          }),
        }}
      />
      {tool.faqs && tool.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(tool.faqs) }} />
      )}
      <CalculatorClient slug={tool.slug} variant="page" />
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-6">
            {tool.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: f.answer }} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
