import nicheConfigJson from "../../../niche.config.json";
import { validateNicheConfig } from "@accounting-network/web-shared/lib/niche-config";
export type { NicheConfig } from "@accounting-network/web-shared/lib/niche-config";
import type { NicheConfig as BaseNicheConfig } from "@accounting-network/web-shared/lib/niche-config";

// The kit's `NicheConfig.blog` interface (packages/web-shared/lib/niche-config.ts,
// off limits to this package) only declares the three shared CTA keys. This site
// publishes four additional blog section labels (M1a item 3, plus
// `howto_heading` for the rendered HowTo step list), so the shape is
// widened locally rather than in the kit. `validateNicheConfig` still runs its
// runtime checks on the shared keys; this cast only extends what tsc knows about.
type SiteNicheConfig = BaseNicheConfig & {
  blog: BaseNicheConfig["blog"] & {
    label_topics: string;
    label_library: string;
    related_heading: string;
    howto_heading: string;
  };
};

export const niche = validateNicheConfig(nicheConfigJson) as SiteNicheConfig;

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
