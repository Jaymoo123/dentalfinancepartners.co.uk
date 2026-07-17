/**
 * Single source of truth for lead contact-field validation floors, shared by the
 * capture forms (LeadForm, DetailsForm), the submit + complete API routes, and
 * the missing-field router. The phone/name floors are re-exported from the shared
 * lead-nurture engine so server-side routing and client-side validation can never
 * drift; the email regex lives here because it is form-level validation.
 */
import {
  nameMeetsFloor,
  phoneMeetsFloor,
  phoneDigitCount,
  NAME_MIN_LENGTH,
  PHONE_MIN_DIGITS,
} from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";

export {
  nameMeetsFloor,
  phoneMeetsFloor,
  phoneDigitCount,
  NAME_MIN_LENGTH,
  PHONE_MIN_DIGITS,
};

/** Matches the submit route's EMAIL_RE. */
export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A usable name is at least NAME_MIN_LENGTH non-space characters. */
export const isNameOk = nameMeetsFloor;

/** A usable phone has at least PHONE_MIN_DIGITS digits. */
export const isPhoneOk = phoneMeetsFloor;

/** A well-formed email address. */
export function isEmailOk(email: string | null | undefined): boolean {
  return emailRe.test((email ?? "").trim());
}
