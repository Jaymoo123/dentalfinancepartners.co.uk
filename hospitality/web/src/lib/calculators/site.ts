import nicheConfig from "../../../../niche.config.json";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "hospitality",
  leadConsentText: `I agree to ${nicheConfig.display_name} using my details to respond to my enquiry and provide the advice I have requested. See our Privacy Policy.`,
} as const;
