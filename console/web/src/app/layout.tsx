/**
 * Root layout for the estate console.
 *
 * - noindex meta on every page (OB-01; X-Robots-Tag header is also set in
 *   next.config.ts headers() for belt-and-braces coverage).
 * - No analytics SDK, no sitemap, no public surface.
 * - Site switcher chrome is injected here so it appears on every gated route.
 */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estate Console",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
