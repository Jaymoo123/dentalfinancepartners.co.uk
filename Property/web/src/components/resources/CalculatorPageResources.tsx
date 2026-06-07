/**
 * Additive premium-tool + resource-gate island for calculator pages.
 *
 * Resolves the topic from the calculator SLUG, then renders the premium tool
 * (if a config exists) and the resource gate (if a category asset is enabled)
 * PROMINENTLY, directly BELOW the existing calculator. The existing calculator
 * stays the indexable hero — this never touches its server-rendered
 * copy/H1/explainer/FAQ/schema.
 *
 * VISIBILITY FIX: the email gate renders as a normal SSR client component (via
 * ResourceGateLazy) so its form markup is in the page's server HTML and can't
 * silently vanish. The premium calculator stays client-dynamic (recharts is
 * heavy) but carries a sized loading placeholder. The whole block is clearly
 * labelled so it reads as an obvious "free tool + guide" card.
 *
 * When neither a premium config nor an enabled asset exists for the topic, this
 * renders NOTHING, so calculator pages are unchanged until a category is
 * onboarded.
 */
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import {
  hasEnabledResource,
  resourceForTopic,
} from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { gateCopy } from "@/lib/resources/copy";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { ResourceGateLazy } from "@/components/resources/ResourceGateLazy";

export function CalculatorPageResources({
  slug,
  pageTitle,
}: {
  slug: string;
  pageTitle?: string;
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId);
  const hasGate = hasEnabledResource(topic);
  if (!hasPremium && !hasGate) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Go deeper
        </span>
        <p className="text-sm font-semibold text-slate-700">
          Get the full {label} model and guide
        </p>
      </div>
      {hasPremium ? <PremiumUpgrade topic={topic} full placement="calculator" /> : null}
      {hasGate ? (
        <ResourceGateLazy
          topic={topic}
          copy={gateCopy(topic, pageTitle)}
          split
          placement="calculator"
        />
      ) : null}
    </div>
  );
}
