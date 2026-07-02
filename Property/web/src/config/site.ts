/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// Specialist partner firm that enquiries are shared with. Kept configured so the
// Privacy Policy + lead routing keep disclosing and honouring the data-sharing
// arrangement; the lead-form wording below also names the partner at the point of
// collection, as required by Annex B.1 (restored 2026-07-02, finding C1).
const partner = niche.partner;
// Lead-form enquiry wording (each form appends "See our Privacy Policy."). Restored
// 2026-07-02 (owner-approved, audit finding C1) to the exact Annex B.1 point-of-collection
// acknowledgement required by the executed Lead Generation & Data Sharing Agreement: it
// names DJH Business Advisers Limited as the specialist partner the enquiry is shared with,
// AT the point of collection. Annex B.4 forbids materially weakening this without DJH's
// prior written agreement, so do NOT soften it in code (raise a B.4 variation with DJH
// first). The rendered form text and the stored consent_text row both equal the B.1
// wording verbatim once the trailing "See our Privacy Policy." is appended by each form.
const leadConsentText = `To answer your enquiry, your details will be shared with our specialist partner firm DJH Business Advisers Limited (part of the DJH group of companies), an independent data controller that will contact you and use your details under its own privacy policy. By submitting this enquiry you confirm you understand this.`;
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
    number: niche.company.number,
    placeOfRegistration: niche.company.place_of_registration,
    registeredOffice: niche.company.registered_office,
    registeredOfficeLine,
    enquiryRetentionMonths: niche.company.enquiry_retention_months, // change retention in one place
    // VAT: Ashfield Trading Ltd is NOT VAT-registered yet. When it registers, set
    // "company.vat_number" in niche.config.json and wire it where a VAT number should display.
    vatNumber: niche.company.vat_number ?? null,
    // Companies-disclosure line for the footer (Companies Act 2006 / e-commerce regs).
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${niche.company.place_of_registration} (company no. ${niche.company.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Specialist partner firm enquiries are shared with (null = handled in-house).
  partner: partner
    ? { name: partner.name, privacyPolicyUrl: partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // Consent text for email-only resource downloads (never names the partner). Forms append the link.
  resourceConsentText,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
