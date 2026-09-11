"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config -- which carries
 * a compute FUNCTION -- is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. Functions cannot be passed from
 * Server to Client Components; this is the GAP-2 RSC lesson, applied verbatim.
 *
 * The resultCta prop accepts a React node (the shared Calculator's API) so the
 * server page can inject a CTA without passing functions across the boundary.
 * For the embed variant, variant="embed" omits the resultCta automatically.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/tools/registry";
import { CalcResultCta } from "@/components/tools/CalcResultCta";
import { ResultGate } from "@/components/calculators/ResultGate";

export function CalculatorClient({
  slug,
  variant = "page",
}: {
  slug: string;
  variant?: "page" | "embed";
}) {
  const tool = getGenericTool(slug);
  if (!tool) return null;
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={variant === "page" ? <CalcResultCta campaign={slug} /> : undefined}
      // Page variant only: the RESULT COLUMN is held behind the capture
      // interstitial. Embeds are never gated (variant === "embed" leaves the
      // wrapper undefined, so Calculator falls back to its identity default).
      // CalcResultCta is NOT retired here: Calculator renders it as a sibling
      // BELOW the grid, outside the wrapped column, so it is unaffected by the
      // gate and no live copy is removed from 13 indexed pages.
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
