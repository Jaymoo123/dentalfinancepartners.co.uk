/**
 * Topic-to-tool spine for the Medical Accountants UK premium tier.
 *
 * Maps each Medical TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * will return false for, so those posts remain unchanged.
 *
 * Phase 4 mapping (7 new tools added, TOPIC_RESOURCES updated):
 *   nhs-pension          -> nhs-superannuation-tiered-contribution  (Tool 4: broadest reach
 *                           across all NHS pension posts -- superannuation is the entry-level
 *                           question before annual allowance. Tool 1 nhs-pension-premium,
 *                           Tool 5 nhs-pension-scheme-pays-premium and Tool 10
 *                           consultant-private-vs-nhs are all available via /calculators
 *                           and will surface on their own mapped calculator pages.)
 *   locum                -> locum-take-home-premium    (Tool 2: unchanged)
 *   gp-tax               -> salaried-gp-vs-partner     (Tool 7: replaces locum-take-home-premium;
 *                           gp-tax-and-accounts and medical-expenses posts are primarily read
 *                           by employed/partnership GPs, not locums; the salaried-vs-partner
 *                           comparison is the highest-demand query in this category.)
 *   incorporation-private -> incorporation-premium     (Tool 3: unchanged)
 *   gp-practice          -> gp-partner-drawings-planner (Tool 6: was empty string; 36 posts
 *                           covering practice management now get a relevant calculator.)
 *
 * Public tools (salaried-doctor-take-home, doctor-expenses-tax-relief) are registered
 * in the main fleet registry (lib/tools/registry.ts) and surface on /calculators pages.
 * They are NOT surfaced as blog premium islands because they lack a PremiumToolConfig;
 * they serve the gp-tax intent via the primaryCalculator field in taxonomy.ts.
 *
 * Storage prefix: ma (FROZEN). Never ptp: or dfp:.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "nhs-pension":           { toolId: "nhs-superannuation-tiered-contribution" },
  "locum":                 { toolId: "locum-take-home-premium" },
  "gp-tax":                { toolId: "salaried-gp-vs-partner" },
  "incorporation-private": { toolId: "incorporation-premium" },
  "gp-practice":           { toolId: "gp-partner-drawings-planner" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
