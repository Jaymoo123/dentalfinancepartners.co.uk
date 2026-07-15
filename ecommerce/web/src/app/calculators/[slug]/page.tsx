import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";

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
      <CalculatorClient slug={tool.slug} variant="page" />
    </main>
  );
}
