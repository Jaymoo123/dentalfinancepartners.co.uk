/**
 * Additive premium-tool + resource-gate island for calculator pages.
 *
 * Resolves the topic from the calculator slug, then renders the premium tool
 * (if a config exists) and the resource gate (if an asset is enabled) directly
 * below the existing calculator. The existing calculator stays the indexable
 * hero — this never touches its server-rendered copy, H1, explainer or schema.
 *
 * When neither a premium config nor an enabled asset exists for the topic, this
 * renders nothing, so calculator pages are unchanged until a category is
 * onboarded.
 */
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import {
  hasEnabledResource,
  resourceForTopic,
} from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { GateOrForm } from "@/components/resources/GateOrForm";

export function CalculatorPageResources({
  slug,
  
}: {
  slug: string;
  
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId ?? "");
  const hasGate = hasEnabledResource(topic);
  if (!hasPremium && !hasGate) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-orange-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Go deeper
        </span>
        <p className="text-sm font-semibold text-slate-700">
          Get the full {label} model and guide
        </p>
      </div>
      {hasPremium ? <PremiumUpgrade topic={topic} full placement="calculator" /> : null}
      {hasGate ? (
        <GateOrForm
          topic={topic}
          split
          placement="calculator"
        />
      ) : null}
    </div>
  );
}

// Re-exported for the hand-authored employer-ni page which needs to pass a
// static slug rather than using the [slug] dynamic route.
export { CalculatorPageResources as default };
