import nicheConfig from "../../../../niche.config.json";

export const site = {
  name: nicheConfig.display_name,
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${nicheConfig.domain}`,
  sourceIdentifier: "hospitality",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy.",
} as const;
