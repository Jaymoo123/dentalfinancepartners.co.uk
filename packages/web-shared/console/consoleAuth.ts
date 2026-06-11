/**
 * Operator console authentication — OB-01 design.
 *
 * Pattern:
 *   1. Login page POSTs the key to /admin/analytics/login
 *   2. Handler compares with crypto.timingSafeEqual (no timing oracle)
 *   3. On match: sets an HttpOnly + Secure + SameSite=Strict session cookie
 *   4. Every console route calls checkConsoleAuth(cookies()) — returns true or
 *      redirects to the login page.
 *
 * Why NOT ?k= in the URL (OB-01 recording): URL query params appear in server
 * logs, browser history, Referer headers, and are visible to analytics scripts
 * that run before the page gate. A POST + cookie keeps the credential off the
 * wire entirely after login.
 *
 * Rate-limiting: the login POST route is the only writable surface; callers
 * should implement a simple in-process counter or use an edge middleware to
 * enforce SEC-06 posture (e.g. max 5 attempts per IP per 10 minutes).
 *
 * This module is Node.js only (uses `crypto` from the Node stdlib). It MUST
 * NOT be imported into browser / client components.
 */

import { timingSafeEqual, createHash } from "crypto";

/** Cookie name for the admin session. */
export const CONSOLE_COOKIE_NAME = "__console_session";

/** 24-hour session TTL (seconds). Rotate the key to invalidate all sessions. */
const SESSION_TTL_S = 86400;

/**
 * Compare the submitted key against the expected key in constant time.
 * Returns true only when both buffers are present and identical.
 */
export function verifyConsoleKey(submitted: string, expected: string): boolean {
  if (!submitted || !expected) return false;
  // Pad both to the same length so the timingSafeEqual does not reveal
  // which one is shorter through a length comparison.
  const a = Buffer.from(submitted.padEnd(256, "\0"), "utf8");
  const b = Buffer.from(expected.padEnd(256, "\0"), "utf8");
  // Ensure equal length before calling timingSafeEqual (Node requirement).
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Derive a session token from the current key. This means:
 *   - changing ADMIN_DASHBOARD_KEY immediately invalidates existing cookies.
 *   - the token itself does not leak the raw key.
 */
export function deriveSessionToken(key: string): string {
  return createHash("sha256")
    .update(`console-session:${key}`)
    .digest("hex");
}

/**
 * Verify a session cookie value against the expected key.
 * Returns true when the cookie matches the token derived from the current key.
 */
export function verifySessionCookie(cookieValue: string | undefined, key: string): boolean {
  if (!cookieValue || !key) return false;
  const expected = deriveSessionToken(key);
  const a = Buffer.from(cookieValue.padEnd(256, "\0"), "utf8");
  const b = Buffer.from(expected.padEnd(256, "\0"), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Build the Set-Cookie header value for the admin session cookie.
 * Secure flag is omitted in test environments where HTTPS is unavailable.
 */
export function buildSessionCookie(key: string, opts?: { secure?: boolean }): string {
  const token = deriveSessionToken(key);
  const secure = opts?.secure ?? process.env.NODE_ENV === "production";
  const parts = [
    `${CONSOLE_COOKIE_NAME}=${token}`,
    `Max-Age=${SESSION_TTL_S}`,
    "Path=/admin/analytics",
    "HttpOnly",
    "SameSite=Strict",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

/**
 * Build the Set-Cookie header to CLEAR the admin session cookie (logout).
 */
export function clearSessionCookie(): string {
  return [
    `${CONSOLE_COOKIE_NAME}=`,
    "Max-Age=0",
    "Path=/admin/analytics",
    "HttpOnly",
    "SameSite=Strict",
  ].join("; ");
}

/**
 * Standard noindex metadata for all console routes (OB-01).
 */
export const CONSOLE_NOINDEX_META = {
  robots: { index: false, follow: false },
} as const;
