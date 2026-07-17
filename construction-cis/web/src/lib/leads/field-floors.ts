/**
 * Single source of truth for lead contact-field validation floors, shared by
 * the capture forms (LeadForm, DetailsForm), the submit + complete API routes,
 * and the missing-field router. Re-exports shared floors so server-side routing
 * and client-side validation can never drift.
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

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isNameOk = nameMeetsFloor;

export const isPhoneOk = phoneMeetsFloor;

export function isEmailOk(email: string | null | undefined): boolean {
  return emailRe.test((email ?? "").trim());
}
