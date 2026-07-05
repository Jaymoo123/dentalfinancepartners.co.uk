"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. Functions cannot be passed from
 * Server to Client Components; this is the GAP-2 RSC lesson, applied verbatim.
 *
 * On the "page" variant a CalcResultCta is injected below the calculator result
 * to convert calculator engagement into qualified leads. Embed variant is left
 * clean (no CTA, framing-safe).
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/tools/registry";
import { CalcResultCta } from "@/components/tools/CalcResultCta";

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
    <>
      <Calculator tool={tool} variant={variant} />
      {variant === "page" && <CalcResultCta slug={slug} />}
    </>
  );
}
