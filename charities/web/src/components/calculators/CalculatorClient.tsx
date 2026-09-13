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
  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      resultWrapper={onDarkResultColumn}
    />
  );
}

/**
 * CONTRAST FIX, site-local by necessity.
 *
 * The kit paints the result headline LABEL as `text-[var(--brand-primary)]`
 * inside its own slate-900 result panel
 * (packages/web-shared/tools/components/Calculator.tsx:141). This site's brand
 * is #1a5c4a, which measures 2.27:1 on slate-900 #0f172b against a 4.5:1 text
 * floor. Self-measured with a WCAG 2.x converter calibrated against the
 * INSTALLED Tailwind 4.3.0 oklch theme table (slate-900 = oklch(20.8% 0.042
 * 265.755) = #0f172b), not the v3 hex table.
 *
 * packages/web-shared is manager-only and shared by 19 sites (trap 12), so the
 * repair is made here, by re-pointing --brand-primary to the ramp's ON-DARK
 * step for the result column only: --color-primary-400 #57a88f measures 6.29:1
 * on the same ground. The ramp step already exists and is already documented as
 * the on-dark step (globals.css). Nothing outside the result column sees it:
 * the panel border, the eyebrow and the CTA keep the true brand green.
 *
 * ponytail: CEILING. --brand-primary is also the ground of the POSITIVE verdict
 * pill (Calculator.tsx:131, `bg-[var(--brand-primary)] text-white`), which sits
 * in the same column. White on #57a88f is 2.47:1, so this override would break
 * that pill. It is safe today because none of this site's three tools ever
 * returns `verdict.positive === true` (grep `positive` in
 * src/lib/calculators/tools/ — both occurrences are `positive: false`, and a
 * false verdict uses --calc-warn-bg, not the brand). UPGRADE PATH: the kit
 * stops reusing one token for on-dark TEXT and an on-dark GROUND — give line
 * 141 its own `--calc-result-label` falling back to --brand-primary. Do that and
 * this wrapper deletes.
 */
function onDarkResultColumn(node: React.ReactNode) {
  return (
    // display:contents so the slate-900 panel stays the grid item itself and the
    // two-column layout is byte-identical; custom properties still inherit
    // through a contents box.
    <div
      style={
        {
          display: "contents",
          // Literal fallback on purpose: Tailwind v4 only emits an @theme
          // variable when a generated UTILITY references it, and nothing here
          // writes text-primary-400/border-primary-400, so --color-primary-400
          // can legitimately be tree-shaken out of the bundle. #57a88f is that
          // ramp step's own documented value (globals.css).
          "--brand-primary": "var(--color-primary-400, #57a88f)",
        } as React.CSSProperties
      }
    >
      {node}
    </div>
  );
}
