import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
import { EmbedAttribution } from "@accounting-network/web-shared/tools/embed/EmbedAttribution";
import { getGenericTool, allTools } from "@/lib/tools/registry";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTools()
    .filter((t) => t.kind === "generic")
    .map((t) => ({ slug: t.slug }));
}

// noindex: embed pages are not for direct crawling
export const metadata = { robots: { index: false } };

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  return (
    <div className="p-4" style={{ minHeight: tool.embedHeight }}>
      <EmbedAutoResize messageType="ma-embed-height" />
      {/* slug only — the function-bearing tool config resolves client-side */}
      <CalculatorClient slug={slug} variant="embed" />
      <EmbedAttribution
        siteName={siteConfig.name}
        siteUrl={siteConfig.url}
        toolSlug={slug}
        leadCtaLabel="Speak to a medical accountant"
      />
    </div>
  );
}
