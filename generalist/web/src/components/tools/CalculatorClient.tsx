"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. (Functions cannot be passed
 * from Server to Client Components; this is the same pattern Property's
 * site-local Calculator uses, adapted for the shared renderer which cannot
 * import a site's registry itself.)
 *
 * Page variant: renders a CalcResultCta after the result panel so users can
 * convert in-flow at peak intent. Embed variant: no capture (iframed contexts
 * should not show the full lead form).
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/tools/registry";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";

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
      resultCta={variant === "page" ? <CalcResultCta campaign={slug} /> : undefined}
    />
  );
}
