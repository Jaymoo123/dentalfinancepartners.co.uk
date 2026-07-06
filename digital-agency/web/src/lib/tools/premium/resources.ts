/**
 * Topic-to-tool spine for the Agency Founder Finance premium tier (aff).
 *
 * Maps each aff TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * returns false for, so those posts remain unchanged.
 *
 * R2 mapping (brief Section 1 + 3):
 *   pay-planning   -> salary-dividend-optimiser-premium  (Tool 1)
 *   exit           -> agency-exit-cgt-premium             (Tool 2)
 *   compliance-vat -> vat-scheme-comparator-premium       (Tool 3)
 *   structure      -> employer-cost-to-hire-premium       (Tool 4)
 *   rnd            -> rd-tax-credit-premium               (Tool 5, no blog category)
 *   international  -> ""   (excluded: UAE/relocation hedge, HP §8 + §10)
 *
 * The international topic covers all 10 relocation pages and the
 * international-agencies blog category. A relocation "tax saving" calculator
 * would require firm UAE figures we cannot stand behind and would breach HP §8/§10.
 * Those posts keep the R1 InlineMiniLeadForm and ExitIntentModal unchanged.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "pay-planning":   { toolId: "salary-dividend-optimiser-premium" },
  "exit":           { toolId: "agency-exit-cgt-premium" },
  "compliance-vat": { toolId: "vat-scheme-comparator-premium" },
  "structure":      { toolId: "employer-cost-to-hire-premium" },
  "rnd":            { toolId: "rd-tax-credit-premium" },
  "international":  { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
