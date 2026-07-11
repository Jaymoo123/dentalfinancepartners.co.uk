"use client";

/**
 * RSC boundary wrapper for the shared <Calculator> renderer. Server pages pass
 * only the SLUG; the tool config (which carries a compute FUNCTION) is
 * resolved here, inside the client module graph, so it never crosses the RSC
 * serialisation boundary.
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
