/**
 * Premium-tool island for calculator pages.
 *
 * Resolves the topic from the calculator SLUG and renders the premium
 * interactive tool directly BELOW the existing calculator. The existing
 * calculator stays the indexable hero — this never touches its server-rendered
 * copy/H1/explainer/FAQ/schema. When no premium tool exists for the topic this
 * renders NOTHING, so a calculator page is unchanged until its category is
 * onboarded.
 *
 * `GateOrForm` WAS removed here under the one-form-per-page rule on 2026-08-21
 * and is RESTORED on 2026-09-26 by owner instruction, after the redesign
 * before/after read: it was the only capture surface on a calculator page and
 * it produced 6 leads in the 33 days before the port and 0 in the 33 days
 * after (docs/property/STATE.md 0.24). The one-form-per-page rule assumed the
 * calculator's own result gate was an equivalent ask; the data says it is not,
 * the gate costs nothing and earns nothing here.
 *
 * NOTE for whoever touches this next: nothing in the codebase deduplicates
 * asks on a page. On /section-24-calculator the primary calculator carries its
 * own ResultGate AND the premium tool below carries a second one, so this block
 * makes three asks plus the foot panel on that route specifically. Left as-is
 * deliberately so this change stays a single variable; if it reads as crowded,
 * drop one of the two gates rather than this form.
 *
 * ALSO REMOVED, and staying removed:
 *
 * The "Go deeper / Get the full <topic> model and guide" strip that used to head
 * this block. It was a hand-rolled emerald pill badge, off the design system,
 * and it only introduced the guide. The tool and the capture block below both
 * carry their own labels.
 */
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import { hasEnabledResource, resourceForTopic } from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { GateOrForm } from "@/components/resources/GateOrForm";

export function CalculatorPageResources({ slug }: { slug: string }) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;
  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId);
  const hasGate = hasEnabledResource(topic);
  if (!hasPremium && !hasGate) return null;

  // `mobileFallback="link"` keeps the premium tool's own mobile slot form-free:
  // below `sm` it is a link to the navy panel at the foot. The capture block
  // below is not breakpoint-gated, so mobile still gets exactly one form.
  return (
    <>
      {hasPremium ? (
        <PremiumUpgrade topic={topic} full placement="calculator" mobileFallback="link" />
      ) : null}
      {hasGate ? <GateOrForm topic={topic} /> : null}
    </>
  );
}
