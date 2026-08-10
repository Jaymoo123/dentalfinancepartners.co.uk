/**
 * Minimal site identity for the calculator + research surfaces, read straight
 * from niche.config.json so BRAND_TBD resolves in one place when the brand
 * lands. If the layout agent ships a full @/config/site later, switch these
 * imports over (noted in the S5 build report).
 */
import nicheConfig from "../../../../niche.config.json";
import { siteConfig } from "@/config/site";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "charities",
  // Canonical acknowledgement wording from @/config/site so forms never drift;
  // MiniCapture renders and stores this string byte-identical (LD-04).
  leadConsentText: `${siteConfig.leadConsentText} See our Privacy Policy.`,
} as const;
