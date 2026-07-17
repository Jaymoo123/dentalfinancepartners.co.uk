/**
 * Pure-logic contracts for the multi-step mini lead capture flow.
 * No React, no browser globals (except process.env for the feature flag).
 * Import validators from lead-nurture-shared so floors stay in one place.
 */
import {
  nameMeetsFloor,
  phoneMeetsFloor,
} from "../lead-nurture/lead-nurture-shared";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default message floors. Lowered from Property's original 40/8 — 96% of errors hit the floor. */
export const MINI_MESSAGE_MIN_CHARS = 20;
export const MINI_MESSAGE_MIN_WORDS = 4;
export const OTHER_ROLE_VALUE = "Other";
export const ROLE_DETAIL_MAX_CHARS = 200;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type StepDirection = "forward" | "back";

export interface Step1Values {
  role: string;
  roleDetail: string;
  message: string;
}

export interface Step2Values {
  fullName: string;
  email: string;
  phone: string;
}

// ---------------------------------------------------------------------------
// Step validators
// ---------------------------------------------------------------------------

/**
 * Validate the role-and-message step.
 * Error keys: "role" | "roleDetail" | "message".
 * opts lets a surface raise the message floor above the shared defaults.
 */
export function validateStep1(
  v: Step1Values,
  opts?: { minChars?: number; minWords?: number },
): Record<string, string> {
  const errs: Record<string, string> = {};
  const minChars = opts?.minChars ?? MINI_MESSAGE_MIN_CHARS;
  const minWords = opts?.minWords ?? MINI_MESSAGE_MIN_WORDS;

  if (!v.role.trim()) {
    errs.role = "Select what best describes you.";
  } else if (v.role === OTHER_ROLE_VALUE && !v.roleDetail.trim()) {
    errs.roleDetail = "Tell us what best describes you.";
  }

  const msg = v.message.trim();
  const wordCount = msg ? msg.split(/\s+/).filter(Boolean).length : 0;
  if (msg.length < minChars || wordCount < minWords) {
    errs.message =
      "Please give a little more detail (a sentence or two) so the right specialist can help.";
  }

  return errs;
}

/**
 * Validate the contact-details step.
 * Error keys: "fullName" | "email" | "phone".
 */
export function validateStep2(v: Step2Values): Record<string, string> {
  const errs: Record<string, string> = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nameMeetsFloor(v.fullName)) {
    errs.fullName = "Enter your name.";
  }
  if (!emailRe.test(v.email.trim())) {
    errs.email = "Enter a valid email address.";
  }
  if (!phoneMeetsFloor(v.phone)) {
    errs.phone = "Enter a phone number we can call you on.";
  }
  return errs;
}

// ---------------------------------------------------------------------------
// Role extras builder
// ---------------------------------------------------------------------------

/**
 * Build the role_detail payload fragment when the user selected "Other" and
 * supplied a free-text description. Returns undefined for all other roles.
 */
export function buildRoleExtras(
  role: string,
  roleDetail: string,
): { role_detail: string } | undefined {
  if (role !== OTHER_ROLE_VALUE) return undefined;
  const trimmed = roleDetail.trim();
  if (!trimmed) return undefined;
  return { role_detail: trimmed.slice(0, ROLE_DETAIL_MAX_CHARS) };
}

// ---------------------------------------------------------------------------
// Return-path guard
// ---------------------------------------------------------------------------

/**
 * Type guard: a safe return path starts with "/" and contains no backslashes,
 * whitespace, or control characters. Rejects protocol-relative paths (//),
 * absolute URLs, and values usable for open-redirect or header-injection.
 */
export function isSafeReturnPath(p: unknown): p is string {
  if (typeof p !== "string") return false;
  if (!p.startsWith("/")) return false;
  if (p.startsWith("//")) return false;
  if (p.includes("\\")) return false;
  if (/[\s\x00-\x1F\x7F]/.test(p)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Thank-you URL builder
// ---------------------------------------------------------------------------

/**
 * Build the post-submission redirect URL.
 * bt and rt are added as encodeURIComponent values.
 * rt is silently dropped when isSafeReturnPath fails.
 */
export function buildThankYouUrl(bookingToken?: string, returnPath?: string): string {
  const parts: string[] = [];
  if (bookingToken) {
    parts.push(`bt=${encodeURIComponent(bookingToken)}`);
  }
  if (returnPath !== undefined && isSafeReturnPath(returnPath)) {
    parts.push(`rt=${encodeURIComponent(returnPath)}`);
  }
  return parts.length ? `/thank-you?${parts.join("&")}` : "/thank-you";
}

// ---------------------------------------------------------------------------
// Feature flag
// ---------------------------------------------------------------------------

/** True when the multi-step mini capture flow is enabled via env var. */
export function miniformsMultistepEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MINIFORMS_MULTISTEP === "1";
}
