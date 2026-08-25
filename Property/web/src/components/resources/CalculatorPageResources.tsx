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
 * TWO THINGS WERE REMOVED HERE, both on instruction. Do not restore either
 * without asking.
 *
 * 1. `GateOrForm` — a MiniCapture that rendered a second lead form directly
 *    under the calculator. A calculator page carries exactly two asks: the
 *    calculator's own result gate, and the navy LeadCTAPanel at the foot. This
 *    is the same one-form-per-page rule that removed the mid-page MiniCapture
 *    blocks from /landlord-tax, /section-24 and /making-tax-digital-landlords.
 *    GateOrForm itself still exists and is still used by the blog renderer.
 *
 * 2. The "Go deeper / Get the full <topic> model and guide" strip that used to
 *    head this block. It was a hand-rolled emerald pill badge, off the design
 *    system, and it introduced the guide that GateOrForm offered. With the
 *    guide gone it introduced nothing, so it went with it. The tool below
 *    carries its own label.
 */
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";

export function CalculatorPageResources({ slug }: { slug: string }) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;
  if (!hasPremiumTool(resourceForTopic(topic)?.toolId)) return null;

  // `mobileFallback="link"` keeps the mobile slot form-free: below `sm` the
  // premium tool is replaced by a link to the navy panel at the foot of the
  // page, not by a second capture form.
  return <PremiumUpgrade topic={topic} full placement="calculator" mobileFallback="link" />;
}
