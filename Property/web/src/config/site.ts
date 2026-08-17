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

// Lead-form notice WITHOUT the trailing "See our Privacy Policy." link (each form
// appends that). IN-HOUSE: enquiries are answered by us and are not shared with any
// partner firm. Reverted estate-wide 2026-08-17 (owner instruction) from the
// 2026-08-15 pool-model sharing notice; production had LEADS_NOTIFY_CC unset, so no
// lead was ever routed under it. If sharing is ever switched back on, this notice AND
// the privacy policy must disclose it BEFORE the first lead is routed.
const leadConsentText = `${niche.display_name} will use your details to respond to your enquiry and to contact you about it. You can object at any time.`;
// Email-only sign-ups (resource downloads) are NOT shared with any partner firm.
// They keep a tick-to-consent box with their own wording,
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
  // It is intentionally NOT displayed publicly (public contact goes via /contact).
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
  // Partner category enquiries are shared with (see category-routing note above).
  // Null only if a niche has no partner block at all (handled-in-house sites).
  partner: niche.partner
    ? { name: niche.partner.name, privacyPolicyUrl: niche.partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // Consent text for email-only resource downloads (never names the partner). Forms append the link.
  resourceConsentText,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
