import nicheConfig from "../../../../niche.config.json";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "hospitality",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "Hospitality Tax will use your details to respond to your enquiry and to contact you about it. You can object at any time. See our Privacy Policy.",
} as const;
