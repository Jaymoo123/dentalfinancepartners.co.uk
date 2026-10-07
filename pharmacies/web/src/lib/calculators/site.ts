import nicheConfig from "../../../../niche.config.json";
export const site = {
  name: nicheConfig.display_name,
  url: (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) || `https://${nicheConfig.domain}`,
  sourceIdentifier: "pharmacies",
  // Static pool-model acknowledgement; must stay in step with web/src/config/site.ts.
  leadConsentText:
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy.",
} as const;

/**
 * The two sentences this subsystem publishes under a calculator result.
 *
 * They live here, not in the "use client" CalcResultCta that renders them,
 * because /calculators is a Server Component: a non-component export of a
 * client module reaches a server page as a client reference, not a string.
 *
 * Two consumers, one source: CalcResultCta (the capture under every tool
 * result) and the LeadCTAPanel on /calculators, which requires `title` and
 * `description` and has no published CTA copy of its own. Locked rule 1 bars
 * authoring a sentence, so the panel is fed the strings the same visitor
 * already reads one click deeper.
 */
export const CALC_CAPTURE_HEADING =
  "Check your position with a pharmacy finance specialist";
export const CALC_CAPTURE_BLURB =
  "A calculator gives you the shape of the answer. We confirm your exact figures, the reliefs you can claim, and what your business needs to file. No obligation, and we reply within 24 hours.";
