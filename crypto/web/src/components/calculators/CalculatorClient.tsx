"use client";

import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import type { CalcValues } from "@accounting-network/web-shared/tools/types";
import { getGenericTool } from "@/lib/calculators/registry";

/**
 * RESULT-PANEL COLOUR SCOPE.
 *
 * The shared renderer paints its result column `bg-slate-900` and then reads
 * three custom properties inside it (Calculator.tsx:131, :141). This site
 * declares none of them, and the one it does declare resolves wrong there:
 *
 *  - `--brand-primary` is this site's GROUND identity, navy #0e1a3a. Inside the
 *    slate-900 result panel it measures 1.06:1, so the headline label
 *    ("Estimated CGT", "Likely status") and the positive verdict chip are
 *    effectively invisible: 1.06 against a 4.5 text floor and a 3.0 graphic
 *    floor. Live on all four calculators today.
 *  - `--calc-warn-bg` / `--calc-warn-fg` fall back to amber #fbbf24. Amber and
 *    orange are banned for warning, duty and deadline semantics on this estate,
 *    and this site's ACTION ramp is burnt orange, so the warn tone must not sit
 *    anywhere near either. Live on the trader checker's "Uncertain" verdict.
 *  - `--calc-warn-accent` is unreachable here (no tool emits tone "warn" without
 *    also emitting a verdict) but is set anyway so the amber fallback can never
 *    become reachable by a later edit to a tool.
 *
 * Scoped with `resultWrapper` rather than globals.css for two reasons: the
 * override must NOT reach the white part of the component, where
 * `--brand-primary` navy is the correct 4px rule at 17:1 on white; and
 * globals.css belongs to the shell work package. If a `--calc-warn-*` ramp is
 * ever added to globals.css, delete the keys here rather than letting two
 * declarations disagree.
 *
 * `display: contents` keeps the grid seeing the result panel itself as its
 * item, so the two-column layout is byte-identical; custom properties still
 * inherit through it.
 *
 * Measured on #0f172a (slate-900), sRGB, one ratio per pair:
 *   #e9c2a8 label text        11.06:1  text 4.5 PASS / ground 4.5 PASS
 *   #a85427 chip ground        3.44:1  graphic 3.0 PASS
 *   #ffffff on #a85427         5.30:1  text 4.5 PASS
 *   #e11d48 warn chip ground   3.88:1  graphic 3.0 PASS
 *   #ffffff on #e11d48         4.70:1  text 4.5 PASS
 *   #fda4af warn accent text   9.63:1  text 4.5 PASS / ground 4.5 PASS
 */
const RESULT_PANEL_TOKENS = {
  "--calc-warn-bg": "#e11d48",
  "--calc-warn-fg": "#ffffff",
  "--calc-warn-accent": "#fda4af",
};

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

  // Which of the two `--brand-primary` roles this tool actually renders. A tool
  // that returns a verdict paints the token as a CHIP GROUND under white text
  // (needs to be dark enough for the text); one that does not paints it as
  // LABEL TEXT on navy (needs to be light enough to read). No single value
  // clears both floors, so the value follows the tool. Derived from a compute
  // rather than a slug list so a tool that changes shape cannot leave this
  // stale; none of the four flips between branches on input.
  const defaults: CalcValues = Object.fromEntries(tool.fields.map((f) => [f.id, f.default]));
  const paintsVerdictChip = Boolean(tool.compute(defaults).verdict);

  const style = {
    display: "contents",
    ...RESULT_PANEL_TOKENS,
    "--brand-primary": paintsVerdictChip ? "#a85427" : "#e9c2a8",
  } as React.CSSProperties;

  return (
    <Calculator
      tool={tool}
      variant={variant}
      resultCta={resultCta}
      resultWrapper={(node) => <div style={style}>{node}</div>}
    />
  );
}
