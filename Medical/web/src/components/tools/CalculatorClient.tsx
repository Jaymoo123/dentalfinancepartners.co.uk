"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. Functions cannot be passed from
 * Server to Client Components; this is the GAP-2 RSC lesson, applied verbatim.
 *
 * THE RESULT FORM IS WIRED HERE AND NOWHERE ELSE. This component has three
 * importers: /calculators/[slug], /embed/[slug] and /nhs-pension (the flagship
 * pillar, on the DEFAULT variant). Wiring it per-route would leave
 * /nhs-pension without one, which is exactly how the generalist port failed at
 * this phase. Every future CalculatorTabs panel mounts this component by slug
 * and inherits the form for free.
 *
 * Owner decision 2026-09-27: no popup on the calculators. ResultGate no
 * longer holds the result; it renders it immediately with one inline capture
 * form beneath. Embeds (variant="embed") never get the form, so they render
 * byte-identically to before.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { ResultGate } from "@/components/tools/ResultGate";
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
      resultWrapper={(node) => (
        <ResultGate campaign={slug} enabled={variant !== "embed"}>
          {node}
        </ResultGate>
      )}
    />
  );
}
