"use client";

/**
 * Client-boundary wrapper for the shared <Calculator> renderer.
 *
 * Server pages pass only the SLUG (a string); the tool config — which carries
 * a compute FUNCTION — is resolved here, inside the client module graph, so it
 * never crosses the RSC serialization boundary. Functions cannot be passed from
 * Server to Client Components; this is the GAP-2 RSC lesson, applied verbatim.
 *
 * THE RESULT GATE IS WIRED HERE AND NOWHERE ELSE. This component has three
 * importers: /calculators/[slug], /embed/[slug] and /nhs-pension (the flagship
 * pillar, on the DEFAULT variant). Wiring the gate per-route would leave
 * /nhs-pension ungated, which is exactly how the generalist port failed at this
 * phase. Every future CalculatorTabs panel mounts this component by slug and
 * inherits the gate for free.
 *
 * The gate replaces the old always-visible capture panel below the result: an
 * always-visible capture under an already-satisfied reader converts at a small
 * fraction of the gate's rate. Embeds (variant="embed") are never gated, so they
 * render byte-identically to before.
 */
import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
import { ResultGate } from "@/components/tools/ResultGate";
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import { getGenericTool } from "@/lib/tools/registry";

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
    <Calculator
      tool={tool}
      variant={variant}
      resultWrapper={(node) => (
        <ResultGate
          campaign={slug}
          enabled={variant !== "embed"}
          /* Topic-matched modal copy, the one capability the premium tier had
             and the ten generic calculators did not. Without it every free
             calculator shows the same generic heading, which is most of the
             gate's future volume on the site's own default wording. */
          topicKey={topicForCalcSlug(slug)}
        >
          {node}
        </ResultGate>
      )}
    />
  );
}
