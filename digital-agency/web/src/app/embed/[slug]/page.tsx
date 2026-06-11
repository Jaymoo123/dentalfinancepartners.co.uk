/**
 * Embed route for individual calculators.
 * noindex — not a public page; rendered inside iframes.
 * Sends aff-embed-height postMessage for auto-resize.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTools, getGenericTool } from "@/lib/tools/registry";
import { CalculatorClient } from "@/components/tools/CalculatorClient";

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
      <CalculatorClient slug={slug} variant="embed" />
    </div>
  );
}
