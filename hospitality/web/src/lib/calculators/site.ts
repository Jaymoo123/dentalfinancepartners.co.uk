import nicheConfig from "../../../../niche.config.json";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "hospitality",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "Hospitality Tax will share your details with regulated firms in our specialist partner network so they can answer your enquiry. You can object at any time. See our Privacy Policy.",
} as const;
