/**
 * Admin console login page (OB-01).
 *
 * Renders a key form that POSTs to /api/admin/login. The credential travels
 * in a form body, never in the URL. On success, the handler sets an HttpOnly
 * session cookie and redirects to /admin/analytics.
 *
 * noindex is set so this page is never indexed.
 */
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";

export const metadata: Metadata = CONSOLE_NOINDEX_META;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isRateLimit = error === "rate_limit";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900">Analytics console</h1>
        <p className="mt-1 text-sm text-slate-500">Enter the admin key to access the dashboard.</p>

        {error && (
          <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {isRateLimit
              ? "Too many failed attempts. Please wait 10 minutes and try again."
              : "Incorrect key. Please try again."}
          </div>
        )}

        <form action="/api/admin/login" method="POST" className="mt-5 space-y-4">
          <div>
            <label htmlFor="key" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Admin key
            </label>
            <input
              id="key"
              name="key"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
              placeholder="Enter key..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
