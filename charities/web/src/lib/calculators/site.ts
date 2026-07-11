/**
 * Minimal site identity for the calculator + research surfaces, read straight
 * from niche.config.json so BRAND_TBD resolves in one place when the brand
 * lands. If the layout agent ships a full @/config/site later, switch these
 * imports over (noted in the S5 build report).
 */
import nicheConfig from "../../../../niche.config.json";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "charities",
  leadConsentText: `I agree to ${nicheConfig.display_name} using my details to respond to my enquiry and provide the advice I have requested. See our Privacy Policy.`,
} as const;
