import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "startups-tech",
  // Static notice-only acknowledgement, identical to config/site.ts leadConsentText
  // (kept in this env-free module for calculator surfaces). Forms append the
  // "See our Privacy Policy." link sentence.
  leadConsentText:
    "Founder Tax Partners will use your details to respond to your enquiry. To answer it, your details may be shared with regulated firms from our specialist partner network, who may contact you directly about it. More than one firm may take up your enquiry: up to three firms in the profession you are asking about, and up to three in related professions such as brokers, solicitors and advisers. Founder Tax Partners may be paid a fee by a firm your enquiry is passed to. You can object at any time. By submitting this enquiry you confirm you understand this.",
} as const;
