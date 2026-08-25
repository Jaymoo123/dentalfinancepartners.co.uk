import nicheConfig from "../../../../niche.config.json";
import { siteConfig } from "@/config/site";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "crypto",
  // Canonical acknowledgement wording from @/config/site so forms never drift;
  // MiniCapture renders and stores this string byte-identical.
  leadConsentText: `${siteConfig.leadConsentText} See our Privacy Policy.`,
} as const;
