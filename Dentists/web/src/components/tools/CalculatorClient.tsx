"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. (Functions cannot be passed
 * from Server to Client Components; this is the RSC lesson from GAP-2.)
 *
 * When variant="page" a CalcResultCta is injected into the result slot via the
 * shared Calculator's resultCta prop. Embed pages (variant="embed") automatically
 * exclude the CTA because the shared Calculator only renders resultCta for pages.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { getGenericTool } from "@/lib/tools/registry";

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
    />
  );
}
