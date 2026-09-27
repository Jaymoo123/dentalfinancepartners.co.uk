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
 * `GateOrForm` was removed here on 2026-08-21 (one-form-per-page rule), restored
 * 2026-09-26 (it was the only capture surface on a calculator page and the gate
 * alone earned 0 leads), and removed again 2026-09-27 under S1a: the primary
 * calculator now carries its own inline `calc_result_form`, so this block would
 * make a second ask on the same page. See docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md
 * section 13 S1a.
 *
 * ALSO REMOVED, and staying removed:
 *
 * The "Go deeper / Get the full <topic> model and guide" strip that used to head
 * this block. It was a hand-rolled emerald pill badge, off the design system,
 * and it only introduced the guide. The tool and the capture block below both
 * carry their own labels.
 */
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { resourceForTopic } from "@/lib/resources/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";

export function CalculatorPageResources({ slug }: { slug: string }) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;
  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId);
  if (!hasPremium) return null;

  // ponytail: S1a (09-27) - one form under a calculator. The premium tool
  // renders result + Workings only here (no ResultCaptureForm, placement
  // !== "blog"), so the page's single ask stays the primary calc_result_form.
  return <PremiumUpgrade topic={topic} full placement="calculator" mobileFallback="link" />;
}
