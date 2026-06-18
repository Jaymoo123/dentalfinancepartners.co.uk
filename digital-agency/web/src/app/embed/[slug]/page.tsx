/**
 * Embed route for individual calculators.
 * noindex — not a public page; rendered inside iframes.
 * Sends aff-embed-height postMessage for auto-resize.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTools, getGenericTool } from "@/lib/tools/registry";
import { CalculatorClient } from "@/components/tools/CalculatorClient";
import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
import { EmbedAttribution } from "@accounting-network/web-shared/tools/embed/EmbedAttribution";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return allTools().map((t) => ({ slug: t.slug }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  return (
    <div className="p-4">
      <EmbedAutoResize messageType="aff-embed-height" />
      <CalculatorClient slug={slug} variant="embed" />
      <EmbedAttribution
        siteName={siteConfig.name}
        siteUrl={siteConfig.url}
        toolSlug={slug}
        leadCtaLabel="Talk to an agency accountant"
      />
    </div>
  );
}
