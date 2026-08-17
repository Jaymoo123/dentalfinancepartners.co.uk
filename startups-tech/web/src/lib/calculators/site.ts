import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "startups-tech",
  // Static notice-only acknowledgement, identical to config/site.ts leadConsentText
  // (kept in this env-free module for calculator surfaces). Forms append the
  // "See our Privacy Policy." link sentence.
  leadConsentText:
    "Founder Tax Partners will share your details with regulated firms in our specialist partner network so they can answer your enquiry. You can object at any time.",
} as const;
