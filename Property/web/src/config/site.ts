/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";

// Guarded: 7 prod client_error rows showed niche.company undefined in some
// client bundles (partial chunk load). Fall back to empties so the page renders.
const company = (niche?.company ?? {}) as Partial<typeof niche.company>;
const office = (company.registered_office ?? {}) as Partial<
  NonNullable<typeof niche.company>["registered_office"]
>;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// Specialist partner firm that enquiries are shared with. DJH's real details live in
// niche.config.json and are never removed.
//
// TEMPORARY (2026-07-15): out of terms with DJH. While PARTNER_DISCLOSURE_PAUSED is
// true we do NOT name DJH at the point of collection and the Privacy Policy shows the
// generic "specialist partner firm" wording instead of DJH's name + external policy
// link. Lead forwarding to DJH is paused (owner decision; forwarding is a manual
// operator action, no code enforces it). TO RESTORE DJH: set this flag to false and
// redeploy, everything below returns to the exact wording it had before.
//
// Do NOT "fix" this back to unconditionally naming DJH thinking it is the C1
// regression (audit 2026-07-02) — the restore path already reproduces the exact
// Annex B.1 wording byte-for-byte; softening it while DISCLOSED still needs a B.4
// variation with DJH first.
const PARTNER_DISCLOSURE_PAUSED = true;
const configuredPartner = niche.partner; // DJH details preserved in config
const disclosePartner = !PARTNER_DISCLOSURE_PAUSED && Boolean(configuredPartner);

// Lead-form enquiry wording (each form appends "See our Privacy Policy."). When DJH is
// disclosed this is the EXACT Annex B.1 point-of-collection acknowledgement required by
// the executed Lead Generation & Data Sharing Agreement, naming DJH as the specialist
// partner AT the point of collection (the rendered form text and stored consent_text row
// both equal it verbatim once the trailing link is appended). When paused it is a generic
// placeholder that names no firm and links no external policy, matching the Privacy Policy.
const leadConsentText = disclosePartner
  ? `To answer your enquiry, your details will be shared with our specialist partner firm ${configuredPartner!.name}${configuredPartner!.descriptor ? ` ${configuredPartner!.descriptor}` : ""}, an independent data controller that will contact you and use your details under its own privacy policy. By submitting this enquiry you confirm you understand this.`
  : `To answer your enquiry, your details may be shared with a specialist partner firm who will contact you. By submitting this enquiry you confirm you understand this.`;
// Email-only sign-ups (resource downloads) are NOT shared with the partner firm
// (agreement Annex B.2). They keep a tick-to-consent box with their own wording,
// which must never mention the partner. Forms append "See our Privacy Policy."
const resourceConsentText = `I agree to ${niche.display_name} using my email to send me the resource I requested.`;

export const siteConfig = {
  name: niche.display_name,
  legalName: niche.legal_name,
  domain: niche.domain,
  tagline: niche.tagline,
  description: niche.description,
  locale: niche.seo.locale,
  get url() {
    return getSiteUrl();
  },
  publisherLogoUrl: niche.brand.publisher_logo_url,
  // NOTE: contact.email is an internal-routing value only (e.g. nurture reply-to).
  // It is intentionally NOT displayed publicly — public contact goes via /contact.
  contact: niche.contact,
  nav: niche.navigation,
  footer: niche.footer_links,
  locations: niche.locations,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  // Property Tax Partners (and every estate brand) is a trading name of Ashfield Trading Ltd.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // brand, e.g. "Property Tax Partners"
    number: company.number,
    placeOfRegistration: company.place_of_registration,
    registeredOffice: office,
    registeredOfficeLine,
    enquiryRetentionMonths: company.enquiry_retention_months, // change retention in one place
    // VAT: Ashfield Trading Ltd is NOT VAT-registered yet. When it registers, set
    // "company.vat_number" in niche.config.json and wire it where a VAT number should display.
    vatNumber: company.vat_number ?? null,
    // Companies-disclosure line for the footer (Companies Act 2006 / e-commerce regs).
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${company.place_of_registration} (company no. ${company.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Specialist partner firm enquiries are shared with. While PARTNER_DISCLOSURE_PAUSED
  // (see above) the Privacy Policy shows a generic, unnamed placeholder; restore the
  // flag to surface DJH's real name + external privacy-policy link again.
  partner: disclosePartner
    ? { name: configuredPartner!.name, privacyPolicyUrl: configuredPartner!.privacy_policy_url ?? null }
    : { name: "a specialist partner firm", privacyPolicyUrl: null },
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // Consent text for email-only resource downloads (never names the partner). Forms append the link.
  resourceConsentText,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
