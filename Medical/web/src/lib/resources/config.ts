/**
 * Feature flags for the Medical Accountants UK resources system.
 *
 * RESOURCE_EMAIL_DELIVERY_ENABLED = false until a verified Resend from-domain
 * exists for medicalaccounts.co.uk. While false:
 *   - no email is promised in any copy ("Instant access on this page.")
 *   - the /api/resources/deliver POST is never fired
 *   - the inline download link + guide read link work without email
 */
export const RESOURCE_EMAIL_DELIVERY_ENABLED = false;
