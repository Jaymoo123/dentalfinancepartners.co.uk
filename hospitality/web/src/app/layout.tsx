import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.brand-tbd-hospitality.invalid";

// Estate audit 2026-07 fixes baked in at scaffold time:
// - description trimmed to <=155 chars by spinup (meta-length defect)
// - og:image is the dynamic 1200x630 PNG route /api/og (never an SVG)
// - Organization JSON-LD present from day one (lawyers/agency schema defect)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "AccountingService"],
  "@id": `${siteUrl}#organization`,
  name: "BRAND_TBD Hospitality Accountancy",
  url: siteUrl,
  description: "UK hospitality businesses (pubs, restaurants, hotels, cafes, takeaways): accounts, tronc and tips compliance, VAT and payroll",
  logo: `${siteUrl}/api/og`,
  areaServed: "GB",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BRAND_TBD Hospitality Accountancy",
  description: "UK hospitality businesses (pubs, restaurants, hotels, cafes, takeaways): accounts, tronc and tips compliance, VAT and payroll",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "BRAND_TBD Hospitality Accountancy",
    title: "BRAND_TBD Hospitality Accountancy",
    description: "UK hospitality businesses (pubs, restaurants, hotels, cafes, takeaways): accounts, tronc and tips compliance, VAT and payroll",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "BRAND_TBD Hospitality Accountancy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRAND_TBD Hospitality Accountancy",
    description: "UK hospitality businesses (pubs, restaurants, hotels, cafes, takeaways): accounts, tronc and tips compliance, VAT and payroll",
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
