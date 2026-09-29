"use client";

import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { getGenericTool } from "@/lib/calculators/registry";

/**
 * Thin client wrapper. The tool carries a compute FUNCTION, which cannot cross
 * the RSC boundary, so server pages pass only the slug and the tool is resolved
 * here (the pattern documented in
 * packages/web-shared/tools/components/Calculator.tsx:14).
 *
 * ADOPTED: the kit's own `eyebrow` seam on that component. Its default
 * pre-header is a slate-900 block with white caps, the only label of its shape
 * left on this site after phase 3 put `Eyebrow` on every structural section of
 * the services, for and vat families. Passing this site's Eyebrow is the
 * sanctioned substitution (the prop exists for exactly this; Property does the
 * same) and changes no word: the label is still "Calculator".
 *
 * `resultCta` is passed through and is DEAD: neither caller
 * (app/calculators/[slug]/page.tsx, app/embed/[slug]/page.tsx) supplies it.
 * Left unwired on purpose. Filling it would add a lead-capture surface inside
 * the result panel, which is owner-gated.
 */
export function CalculatorClient({
  slug,
  variant = "page",
  resultCta,
  headingLevel,
}: {
  slug: string;
  variant?: "page" | "embed";
  resultCta?: React.ReactNode;
  /**
   * Passed straight to the kit component (Calculator.tsx:43,82,115). The kit
   * default is 3, which on /calculators/[slug] jumps the h1 in the hero to an h3
   * with no h2 between them. The page route passes 2; the embed route does not,
   * because an embed is an iframe fragment with no h1 of its own above it and 3
   * is right there.
   */
  headingLevel?: 2 | 3;
}) {
  const tool = getGenericTool(slug);
  if (!tool) return null;
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      headingLevel={headingLevel}
      eyebrow={<Eyebrow>Calculator</Eyebrow>}
    />
  );
}
