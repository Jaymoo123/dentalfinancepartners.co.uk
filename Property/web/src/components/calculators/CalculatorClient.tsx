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
 * Property tool pages that need a CTA inject <PageResultCta>
 * as children.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/calculators/registry";
import { Eyebrow } from "@/components/ui/page-blocks";

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
  // Property's pre-header, not the shared black tag. The five bespoke
  // calculators all head themselves with <Eyebrow>Calculator</Eyebrow>, so a
  // generic registry tool rendered beside them (the allowance calculator on
  // /landed-estates, for one) has to match. Passing the node rather than
  // restyling the shared component leaves the other 17 sites untouched.
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      eyebrow={<Eyebrow>Calculator</Eyebrow>}
    />
  );
}
