import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "pharmacies",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "Pharmacy Tax will use your details to respond to your enquiry. To answer it, your details may be shared with a relevant regulated firm from our specialist partner network, who may contact you directly about your enquiry. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy.",
} as const;
