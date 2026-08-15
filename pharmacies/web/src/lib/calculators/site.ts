import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "pharmacies",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "Pharmacy Tax will use your details to respond to your enquiry. To answer it, your details may be shared with regulated firms from our specialist partner network, who may contact you directly about it. More than one firm may take up your enquiry: up to three firms in the profession you are asking about, and up to three in related professions such as brokers, solicitors and advisers. Pharmacy Tax may be paid a fee by a firm your enquiry is passed to. You can object at any time. By submitting this enquiry you confirm you understand this. See our Privacy Policy.",
} as const;
