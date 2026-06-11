"use client";

/**
 * Property RSC boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string). The tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialisation boundary. (Functions cannot be passed
 * from Server to Client Components; this pattern prevents the prerender error.)
 *
 * For the embed variant, variant="embed" is passed through so the Calculator
 * omits its page-only CTA and the embed layout applies.
 *
 * The resultCta prop accepts a React node (the shared Calculator's API) so the
 * server page can inject a CTA without passing functions across the boundary.
 * Property tool pages that need a CTA inject <CalcResultCta> or <PageResultCta>
 * as children.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/calculators/registry";

export function CalculatorClient({
  slug,
  variant = "page",
  resultCta,
}: {
  slug: string;
  variant?: "page" | "embed";
  resultCta?: React.ReactNode;
}) {
  const tool = getGenericTool(slug);
  if (!tool) return null;
  return <Calculator tool={tool} variant={variant} resultCta={resultCta} />;
}
