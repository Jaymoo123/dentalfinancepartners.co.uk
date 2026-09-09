"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config - which carries
 * a compute FUNCTION - is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. (Functions cannot be passed
 * from Server to Client Components; this is the same pattern Property's
 * site-local Calculator uses, adapted for the shared renderer which cannot
 * import a site's registry itself.)
 *
 * Page variant: the RESULT COLUMN is wrapped in <ResultGate>, so the figure is
 * held behind the capture interstitial until the reader submits or skips. This
 * replaces the retired CalcResultCta, an always-visible form under an already
 * satisfied reader. Embed variant: no gate, no capture - those calculators run
 * on third-party sites and gating them would break that deal.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/tools/registry";
import { ResultGate } from "@/components/calculators/ResultGate";

export function CalculatorClient({
  slug,
  variant = "page",
}: {
  slug: string;
  variant?: "page" | "embed";
}) {
  // Resolved synchronously from the static registry; never briefly null for
  // valid slugs (generateStaticParams only emits registry slugs).
  const tool = getGenericTool(slug);
  if (!tool) return null;
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultWrapper={
        variant === "page"
          ? (node) => (
              <ResultGate campaign={slug} ground="navy">
                {node}
              </ResultGate>
            )
          : undefined
      }
    />
  );
}
