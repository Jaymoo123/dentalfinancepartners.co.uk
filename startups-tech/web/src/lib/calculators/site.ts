import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "startups-tech",
  // Static notice-only acknowledgement, identical to config/site.ts leadConsentText
  // (kept in this env-free module for calculator surfaces). Forms append the
  // "See our Privacy Policy." link sentence.
  leadConsentText:
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.",
} as const;
