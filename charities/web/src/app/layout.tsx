import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.brand-tbd-charities.invalid";

// Estate audit 2026-07 fixes baked in at scaffold time:
// - description trimmed to <=155 chars by spinup (meta-length defect)
// - og:image is the dynamic 1200x630 PNG route /api/og (never an SVG)
// - Organization JSON-LD present from day one (lawyers/agency schema defect)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "AccountingService"],
  "@id": `${siteUrl}#organization`,
  name: "BRAND_TBD Charity Accountancy",
  url: siteUrl,
  description: "UK charities, CICs and social enterprises: accounts, independent examination, Gift Aid, VAT and trustee compliance",
  logo: `${siteUrl}/api/og`,
  areaServed: "GB",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BRAND_TBD Charity Accountancy",
  description: "UK charities, CICs and social enterprises: accounts, independent examination, Gift Aid, VAT and trustee compliance",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "BRAND_TBD Charity Accountancy",
    title: "BRAND_TBD Charity Accountancy",
    description: "UK charities, CICs and social enterprises: accounts, independent examination, Gift Aid, VAT and trustee compliance",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "BRAND_TBD Charity Accountancy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRAND_TBD Charity Accountancy",
    description: "UK charities, CICs and social enterprises: accounts, independent examination, Gift Aid, VAT and trustee compliance",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
