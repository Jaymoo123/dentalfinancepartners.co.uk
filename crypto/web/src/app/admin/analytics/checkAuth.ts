/**
 * Console auth gate — server-side helper for crypto admin routes.
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
