import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { focusRing } from "@/components/ui/layout-utils";

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
      <CalculatorClient slug={tool.slug} variant="embed" />
      <div className="mt-3 text-center">
        <a
          href={`${site.url}/calculators/${tool.slug}?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${tool.slug}`}
          target="_blank"
          rel="noopener"
          /* Hover colour is --brand-primary-text (#8a5e1a, 5.68 on white),
             not --brand-primary (#c9861b, 3.04 on white), which globals.css:96
             marks decorative only. This is 12px text and needs the 4.5 floor.
             focusRing is the site's single --focus-ring mechanism: this link is
             focusable, sits on white inside a partner iframe, and had no focus
             indication at all. No chrome, navigation or breadcrumb is added
             here: the route is noindex and renders at unknown widths. */
          className={`text-xs text-[var(--muted)] transition-colors hover:text-[var(--brand-primary-text)] ${focusRing}`}
        >
          Powered by <span className="font-bold text-[var(--ink)]">{site.name}</span> &middot; specialist UK ecommerce accountants
        </a>
      </div>
      <EmbedAutoResize messageType="ecommerce-embed-height" />
    </div>
  );
}
