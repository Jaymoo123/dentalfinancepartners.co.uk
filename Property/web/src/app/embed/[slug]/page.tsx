import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calculator } from "@/components/calculators/Calculator";
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
      <Calculator slug={tool.slug} variant="embed" />
      <div className="mt-3 text-center">
        <a
          href={`${siteConfig.url}/calculators/${tool.slug}?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${tool.slug}`}
          target="_blank"
          rel="noopener"
          className="text-xs text-slate-500 hover:text-emerald-700 transition-colors"
        >
          Powered by <span className="font-bold text-slate-700">Property Tax Partners</span> · specialist UK property accountants
        </a>
      </div>
      <EmbedAutoResize />
    </div>
  );
}
