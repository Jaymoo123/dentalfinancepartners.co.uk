/**
 * Additive resource-gate island for Contractor Tax Accountants calculator pages.
 *
 * Resolves the topic from the calculator slug, then renders the ResourceGate
 * (if an asset is enabled) directly below the existing calculator. The existing
 * calculator stays the indexable hero: this never touches its server-rendered copy,
 * H1, explainer or schema.
 *
 * When no enabled asset exists for the topic, this renders nothing, so calculator
 * pages are unchanged until a resource is onboarded.
 *
 * Mount once in src/app/calculators/[slug]/page.tsx after <CalculatorClient slug={slug}>.
 *
 * TOKEN HARDENING: no var(--gold), no var(--navy), no var(--dark), no var(--primary).
 * The label eyebrow chip uses bg-[var(--accent)] text-white.
 */
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource, resourceForTopic } from "@/lib/resources/registry";
import { gateCopy } from "@/lib/resources/copy";
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

  const hasGate = hasEnabledResource(topic);
  if (!hasGate) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";
  const copy = gateCopy(topic, pageTitle);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-[var(--accent)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Go deeper
        </span>
        <p className="text-sm font-semibold text-[var(--ink-soft)]">
          Get the full {label} model and guide
        </p>
      </div>
      <ResourceGate
        topic={topic}
        copy={copy}
        split
        placement="calculator"
      />
    </div>
  );
}

// Re-exported as default for convenience.
export { CalculatorPageResources as default };

// Suppress unused import
void resourceForTopic;
