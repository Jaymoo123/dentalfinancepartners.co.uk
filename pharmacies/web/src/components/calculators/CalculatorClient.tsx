"use client";

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
