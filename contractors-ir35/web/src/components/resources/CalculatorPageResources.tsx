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
 * The label eyebrow is the shared kit `Eyebrow` (brand rule + restrained caps).
 * It replaced a solid bg-[var(--accent)] uppercase chip on 2026-09-14: that is the
 * recipe page-blocks.tsx records as having "shouted louder than the heading it was
 * introducing".
 */
import { topicForCalcSlug, getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource, resourceForTopic } from "@/lib/resources/registry";
import { gateCopy } from "@/lib/resources/copy";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

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
      <Eyebrow>Go deeper</Eyebrow>
      <p className="text-sm font-semibold text-[var(--ink-soft)]">
        Get the full {label} model and guide
      </p>
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
