/**
 * Additive premium-tool + resource-gate island for Solicitors calculator pages.
 *
 * Resolves the topic from the calculator SLUG, then renders the premium tool
 * (if a config exists) and the resource gate (if a category asset is enabled)
 * below the existing calculator. The existing calculator stays the indexable
 * hero: this never touches its server-rendered copy/H1/explainer/FAQ/schema.
 *
 * Solicitors uses a dynamic /calculators/[slug]/page.tsx route (not per-slug
 * static pages), so this is wired once inside the [slug] page after the
 * calculator, NOT per static page.
 *
 * Ships ResourceGate (inline download reveal), NOT GateOrForm, because the
 * deliverable is the downloadable resource itself. GateOrForm (fallback to
 * MiniCapture) can be swapped in later if the gate sees 0-unlock patterns.
 *
 * Renders nothing when neither a premium config nor an enabled asset exists.
 */
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import {
  hasEnabledResource,
  resourceForTopic,
} from "@/lib/resources/registry";
import { gateCopy } from "@/lib/resources/copy";
import { PremiumUpgrade } from "@/components/tools/premium/PremiumUpgrade";
import { ResourceGate } from "@/components/resources/ResourceGate";

export function CalculatorPageResources({
  slug,
  pageTitle,
}: {
  slug: string;
  pageTitle?: string;
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  // Check if premium config exists for this topic
  const resource = resourceForTopic(topic);
  const hasPremium = !!resource?.toolId;
  const hasGate = hasEnabledResource(topic);
  if (!hasPremium && !hasGate) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-[var(--primary)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Go deeper
        </span>
        <p className="text-sm font-semibold text-[var(--ink-soft)]">
          Get the full {label} model and guide
        </p>
      </div>
      {hasPremium ? <PremiumUpgrade topic={topic} full placement="calculator" /> : null}
      {hasGate ? (
        <ResourceGate
          topic={topic}
          copy={gateCopy(topic, pageTitle)}
          split
          placement="calculator"
        />
      ) : null}
    </div>
  );
}
