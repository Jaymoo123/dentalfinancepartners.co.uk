import { notFound } from "next/navigation";
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
import { getGenericTool, allTools } from "@/lib/tools/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTools()
    .filter((t) => t.kind === "generic")
    .map((t) => ({ slug: t.slug }));
}

// noindex: embed pages are not meant for direct crawling
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
      <EmbedAutoResize messageType="hd-embed-height" />
      <Calculator tool={tool} variant="embed" />
    </div>
  );
}
