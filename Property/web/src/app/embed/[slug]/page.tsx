import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";
import { EmbedAttribution } from "@accounting-network/web-shared/tools/embed/EmbedAttribution";
import { siteConfig } from "@/config/site";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";

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
    title: tool.name,
    description: tool.oneLiner,
    // Embed surface — do not index (the canonical, indexable version lives at
    // /calculators/<slug>).
    robots: { index: false, follow: false },
    alternates: { canonical: `${siteConfig.url}/calculators/${tool.slug}` },
  };
}

export default async function CalculatorEmbedPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  return (
    <div className="bg-white p-3 sm:p-4">
      <CalculatorClient slug={tool.slug} variant="embed" />
      <EmbedAttribution
        siteName={siteConfig.name}
        siteUrl={siteConfig.url}
        toolSlug={tool.slug}
        leadCtaLabel="Speak to a property tax specialist"
      />
      <EmbedAutoResize />
    </div>
  );
}
