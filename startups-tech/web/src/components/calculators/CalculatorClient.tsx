"use client";

import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { getGenericTool } from "@/lib/calculators/registry";

/**
 * Thin client wrapper. The tool carries a compute FUNCTION, which cannot cross
 * the RSC boundary, so server pages pass only the slug and the tool is resolved
 * here (the pattern documented in
 * packages/web-shared/tools/components/Calculator.tsx).
 *
 * ADOPTED: the kit's own `eyebrow` seam on that component, via
 * packages/web-shared/design/primitives/page-blocks.tsx. The kit's DEFAULT
 * pre-header is a slate-900 block with white caps, the only label of that shape
 * left on this site once the port lands. Passing this site's Eyebrow is the
 * sanctioned substitution: the prop exists for exactly this, ecommerce and
 * Property both do it, and it changes no word. The label is still "Calculator",
 * which is the kit's own string, not authored copy. Eyebrow's light branch is
 * slate-600 and the tool panel it sits on is white, so it clears the 4.5 floor.
 *
 * ADOPTION DECLINED: the kit's `resultWrapper` seam on the same component. Its
 * stated purpose is the result gate (generalist passes a capture interstitial).
 * There is no result gate on any of this site's four tools today and adding one
 * is a capture-surface change requiring an owner gate.
 *
 * `resultCta` is passed straight through. The page template supplies it; the
 * embed template does not, and the kit itself renders it only when
 * `variant === "page"`, so the embed cannot grow a form by accident.
 */
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
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      eyebrow={<Eyebrow>Calculator</Eyebrow>}
    />
  );
}
