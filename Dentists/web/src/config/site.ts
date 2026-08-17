/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";
import { getActiveNav } from "@accounting-network/web-shared/lib/niche-config";

const office = niche.company.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// Partner firm enquiries would be shared with. null estate-wide since 2026-08-17:
// nothing is shared, and the privacy policy branches on this being null.
const partner = niche.partner;
// Lead-form notice WITHOUT the trailing "See our Privacy Policy." link (each form
// appends that). IN-HOUSE: enquiries are answered by us and are not shared with any
// partner firm. Reverted estate-wide 2026-08-17 (owner instruction) from the
// 2026-08-15 pool-model sharing notice; production had LEADS_NOTIFY_CC unset, so no
// lead was ever routed under it. If sharing is ever switched back on, this notice AND
// the privacy policy must disclose it BEFORE the first lead is routed.
const leadConsentText = `${niche.display_name} will use your details to respond to your enquiry and to contact you about it. You can object at any time.`;

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
  // Variant-filtered: items flagged hide_in_packages drop out in packages mode.
  nav: getActiveNav(niche),
  footer: niche.footer_links,
  locations: niche.locations,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  // Dental Finance Partners (and every estate brand) is a trading name of Ashfield Trading Ltd.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // brand, e.g. "Dental Finance Partners"
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
  // Partner firm, null estate-wide since 2026-08-17: enquiries are handled in-house.
  partner: partner
    ? { name: partner.name, privacyPolicyUrl: partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // leadConsentTextWithFollowUp: swapped live into leadConsentText 2026-07-19 per owner approval.
  /**
   * Consent text for the resource gate (in-house only).
   * ResourceGate is a first-party data capture by Dental Finance Partners.
   * It does NOT name any partner firm, so it is separate from leadConsentText.
   * Forms append "See our Privacy Policy." with a link.
   */
  resourceConsentText:
    `I agree to Dental Finance Partners using my details to send me the free resource I have requested and to respond to any enquiry I submit.`,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
