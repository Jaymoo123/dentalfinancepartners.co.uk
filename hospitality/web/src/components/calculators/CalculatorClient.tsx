"use client";

import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { getGenericTool } from "@/lib/calculators/registry";

export function CalculatorClient({
  slug,
  variant = "page",
  resultCta,
  headingLevel,
}: {
  slug: string;
  variant?: "page" | "embed";
  resultCta?: React.ReactNode;
  headingLevel?: 2 | 3;
}) {
  const tool = getGenericTool(slug);
  if (!tool) return null;
  return <Calculator tool={tool} variant={variant} resultCta={resultCta} headingLevel={headingLevel} />;
}
