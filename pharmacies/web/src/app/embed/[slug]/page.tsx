import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";

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
    robots: { index: false, follow: false },
    alternates: { canonical: `${site.url}/calculators/${tool.slug}` },
  };
}

export default async function CalculatorEmbedPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  return (
    <div className="bg-white p-3 sm:p-4">
      {/* Visually-hidden h1 (owner decision, 2026-10-07, P0-B #10). This
          document is a real page a partner's iframe fetches on its own URL and
          an assistive reader can land on it directly, so it needs a top-level
          heading; showing one would put a second title above the widget's own
          name inside a partner's layout, which the embed exists not to do. The
          string is the tool name, already published. No chrome, no form, no
          capture here: locked rule 18 holds. */}
      <h1 className="sr-only">{tool.name}</h1>
      <CalculatorClient slug={tool.slug} variant="embed" />
      <div className="mt-3 text-center">
        <a
          href={`${site.url}/calculators/${tool.slug}?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${tool.slug}`}
          target="_blank"
          rel="noopener"
          // NEW segmentation on the partner surface: the only control on the
          // embed, and the only measure of what the embed sends back.
          data-cta="embed_attribution"
          data-cta-placement="embed"
          data-cta-goal="tool"
          className="text-xs text-[var(--muted)] transition-colors hover:text-[var(--brand-primary)]"
        >
          Powered by <span className="font-bold text-[var(--ink)]">{site.name}</span> &middot; specialist UK pharmacy accountants
        </a>
      </div>
      <EmbedAutoResize messageType="pharmacies-embed-height" />
    </div>
  );
}
