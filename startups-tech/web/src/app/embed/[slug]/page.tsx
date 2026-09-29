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

  /*
   * THE EMBED CONTRACT, restated so it cannot drift. This route is
   * `noindex, nofollow`, it canonicals to /calculators/<slug>, phase 1 already
   * bypasses the site chrome for it, and it carries exactly one outbound
   * attribution link. It gets NO header, NO footer, NO nav, NO breadcrumb, NO
   * form and NO LeadCTAPanel: it renders at unknown widths inside a partner's
   * iframe. This package restyles its tokens and nothing else. There is no
   * /embed index route on this site and this package does not create one.
   */
  return (
    <div className="bg-white p-3 sm:p-4">
      <CalculatorClient slug={tool.slug} variant="embed" />
      <div className="mt-3 text-center">
        <a
          href={`${site.url}/calculators/${tool.slug}?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${tool.slug}`}
          target="_blank"
          rel="noopener"
          /* 12px text, so it needs the 4.5 floor: slate-600 is 5.90 on white
             and primary-700 (#4338ca) is 7.90. primary-600 (#4f46e5, 6.29)
             would also pass, but 700 is the step this site puts text-weight
             brand on. focusRing is the site's single --focus-ring mechanism:
             this link is focusable, sits on white, and had no focus indication
             at all. */
          className={`text-xs text-slate-600 transition-colors hover:text-primary-700 ${focusRing}`}
        >
          Powered by <span className="font-bold text-slate-900">{site.name}</span> &middot; specialist UK startup accountants
        </a>
      </div>
      <EmbedAutoResize messageType="startups-embed-height" />
    </div>
  );
}
