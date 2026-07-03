/**
 * Shared, content-agnostic helpers for the lead-nurture engine that the host site
 * and the engine both need. Kept separate from config.ts so the pure
 * "which contact fields are missing" logic has ONE home and cannot drift between
 * the capture forms, the submit route, the missing-field router, and the
 * detail-capture sequence.
 *
 * Email is a prerequisite on every lead surface, so it is never treated as a
 * "missing" contact field here. The variable/optional fields are name and phone.
 */

export type MissingContactField = "name" | "phone";

/** Contact-field floors. Single source of truth (mirrors the submit route + forms). */
export const NAME_MIN_LENGTH = 2;
export const PHONE_MIN_DIGITS = 10;

/** Count digit characters in a phone-ish string (ignores spaces, +, (), -). */
export function phoneDigitCount(s: string | null | undefined): number {
  return ((s ?? "").match(/\d/g) || []).length;
}

/** A usable name is at least NAME_MIN_LENGTH non-space characters. */
export function nameMeetsFloor(name: string | null | undefined): boolean {
  return (name ?? "").trim().length >= NAME_MIN_LENGTH;
}

/** A usable phone has at least PHONE_MIN_DIGITS digits. */
export function phoneMeetsFloor(phone: string | null | undefined): boolean {
  return phoneDigitCount(phone) >= PHONE_MIN_DIGITS;
}

/**
 * Which required contact fields are missing / below floor on this lead.
 * Returns a STABLE order (["name","phone"]) so downstream copy phrasing is
 * deterministic. Empty array = the lead is contact-complete.
 */
export function computeMissingContact(lead: {
  full_name?: string | null;
  phone?: string | null;
}): MissingContactField[] {
  const missing: MissingContactField[] = [];
  if (!nameMeetsFloor(lead.full_name)) missing.push("name");
  if (!phoneMeetsFloor(lead.phone)) missing.push("phone");
  return missing;
}
