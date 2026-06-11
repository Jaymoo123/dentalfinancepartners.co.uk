/**
 * Console auth gate — server-side helper for generalist admin routes.
 *
 * Reads the HttpOnly session cookie and validates it against the current
 * ADMIN_DASHBOARD_KEY. Returns the key if the session is valid, or null
 * if the caller should redirect to the login page.
 *
 * Usage in a Server Component:
 *   const key = await checkAuth(cookies());
 *   if (!key) redirect("/admin/analytics/login");
 */
import { cookies } from "next/headers";
import {
  CONSOLE_COOKIE_NAME,
  verifySessionCookie,
} from "@accounting-network/web-shared/console/consoleAuth";

export async function checkAuth(): Promise<boolean> {
  const jar = await cookies();
  const cookieValue = jar.get(CONSOLE_COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_DASHBOARD_KEY || "";
  if (!expected) return false;
  return verifySessionCookie(cookieValue, expected);
}
