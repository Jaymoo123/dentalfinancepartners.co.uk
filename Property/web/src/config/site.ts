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

// Recipient of shared enquiries is disclosed to enquirers as a CATEGORY only
// ("a firm from our specialist partner network"), never as a named firm. This lets a
// lead a firm declines be routed to another firm in the network without any site change.
// niche.config.json holds only that category label — no individual firm is named anywhere
// in the live tree (the former named-firm details were removed 2026-07-27 when that deal ended).
//
// PARTNER_DISCLOSURE_PAUSED is retained infrastructure. Even when false it now surfaces
// only the category label from config, never a specific firm; the two branches differ
// only in phrasing. Neither path can expose a named firm.
const PARTNER_DISCLOSURE_PAUSED = true;
const configuredPartner = niche.partner; // category label only, no named firm
const disclosePartner = !PARTNER_DISCLOSURE_PAUSED && Boolean(configuredPartner);

// Lead-form enquiry wording (each form appends "See our Privacy Policy."). Both branches
// disclose the recipient as the partner-network CATEGORY only; the receiving firm names
// itself in its own Article 14 notice at first contact. Matches the Privacy Policy and the
// Data Sharing Agreement Annex B (category-based disclosure).
const leadConsentText = disclosePartner
  ? `To answer your enquiry, your details will be shared with ${configuredPartner!.name}, an independent data controller that will contact you and use your details under its own privacy policy. By submitting this enquiry you confirm you understand this.`
  : `To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. By submitting this enquiry you confirm you understand this.`;
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
  // Recipient shown in the Privacy Policy as the partner-network category only; no
  // individual firm is named (see PARTNER_DISCLOSURE_PAUSED above).
  partner: disclosePartner
    ? { name: configuredPartner!.name, privacyPolicyUrl: configuredPartner!.privacy_policy_url ?? null }
    : { name: "a firm from our specialist partner network", privacyPolicyUrl: null },
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // Consent text for email-only resource downloads (never names the partner). Forms append the link.
  resourceConsentText,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
