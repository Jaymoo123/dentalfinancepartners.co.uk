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
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      // headingLevel=2 closes the h1 -> h3 skip on all three tool pages
      // (P0-B #9): the widget's tool name is the first heading after the hero
      // h1, and the kit default is h3. The kit accordion below renders its
      // triggers in Radix's h3 Header, so the served order is h1 -> h2 -> h3.
      // On /embed there is no h1 above it other than the sr-only tool name, and
      // the tool name heading is the page's own first visible heading either
      // way, so the same value is correct on both variants.
      headingLevel={2}
      // `eyebrow` is NOT passed. `tool.category` is the site's only existing
      // candidate label and the tool hero now renders it as <Eyebrow onDark>
      // (app/calculators/[slug]/page.tsx), so passing it here as well would
      // print the same label twice within one screen. The kit's default black
      // "Calculator" tag therefore stays, unchanged, on both variants.
    />
  );
}
