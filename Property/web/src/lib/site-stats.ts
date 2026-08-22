import type { StatItem } from "@/components/property/StatsCounter";

/**
 * The firm's headline figures, in one place.
 *
 * These used to be copied into the homepage and /about with a comment on each
 * asking the next person to keep them in sync by hand. They are a marketing
 * claim that appears in several places and changes as the practice grows, so
 * they get a single source instead.
 */
export const siteStats: StatItem[] = [
  { target: 100, suffix: "+", label: "Landlords served" },
  { target: 24, suffix: "hr", label: "Response time" },
  { target: 2.4, decimals: 1, prefix: "£", suffix: "M+", label: "Tax savings identified" },
  { target: 100, suffix: "%", label: "Property-only focus" },
];
