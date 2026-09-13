import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { EmbedAutoResize } from "@/components/embed/EmbedAutoResize";
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
    // Embed surface -- do not index (the canonical, indexable version lives at
    // /calculators/<slug>).
    robots: { index: false, follow: false },
    alternates: { canonical: `${siteConfig.url}/calculators/${tool.slug}` },
  };
}

/**
 * Bare iframe document. NO PageShell: no header, no footer, no skip link, no
 * sticky, no lead panel. That is now enforced by `ChromeGate` inside
 * `PageShell` (see that file for why it is not `app/embed/layout.tsx`), because
 * the root layout mounts `PageShell` for every route and this document renders
 * inside a third party's page.
 *
 * Section order is tool -> attribution -> resize script. Nothing else, ever.
 * The canonical points AWAY, at the indexable twin `/calculators/<slug>`: two
 * tools at one URL each is the point, and the embed must never compete with it.
 */
export default async function CalculatorEmbedPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  return (
    <div className="bg-white p-3 sm:p-4">
      <CalculatorClient slug={tool.slug} variant="embed" />
      <div className="mt-3 text-center">
        <a
          href={`${siteConfig.url}/calculators/${tool.slug}?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${tool.slug}`}
          target="_blank"
          rel="noopener"
          className="text-xs text-neutral-600 transition-colors hover:text-primary-600"
        >
          Powered by <span className="font-bold text-neutral-700">{siteConfig.name}</span> &middot; specialist UK contractor accountants
        </a>
      </div>
      <EmbedAutoResize />
    </div>
  );
}
