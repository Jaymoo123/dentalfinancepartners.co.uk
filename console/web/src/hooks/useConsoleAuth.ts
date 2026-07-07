"use client";

import { useEffect } from "react";

/**
 * Checks session validity on mount. Redirects to /login if the
 * __console_session cookie is absent or expired.
 *
 * The cookie is HttpOnly so client JS cannot read it directly.
 * /api/console/session probes it server-side and returns 401 if invalid.
 */
export function useConsoleAuth(): void {
  useEffect(() => {
    fetch("/api/console/session", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
        }
      })
      .catch(() => {
        // Network error — don't redirect, allow retry on next interaction
      });
  }, []);
}
