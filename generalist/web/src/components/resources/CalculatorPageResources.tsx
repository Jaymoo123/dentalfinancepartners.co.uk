/**
 * Additive premium-tool island for calculator pages.
 *
 * Resolves the topic from the calculator slug and renders the premium tool (if
 * a config exists) directly below the calculator. The calculator stays the
 * indexable hero — this never touches its server-rendered copy, H1, explainer
 * or schema. No premium config for the topic means this renders nothing.
 */
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";

export function CalculatorPageResources({
  slug,
  
}: {
  slug: string;
  
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  // Premium island only. The "Go deeper" pill strip and the second GateOrForm
  // capture are RETIRED (Property's own recorded decision: one form per page,
  // and a second capture below a satisfied reader converts at a fraction of
  // the first). The topic gate lives on the resources pages, not here.
  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId ?? "");
  if (!hasPremium) return null;

  return (
    <div className="mt-10">
      <PremiumUpgrade topic={topic} full placement="calculator" />
    </div>
  );
}

// Re-exported for the hand-authored employer-ni page which needs to pass a
// static slug rather than using the [slug] dynamic route.
export { CalculatorPageResources as default };
