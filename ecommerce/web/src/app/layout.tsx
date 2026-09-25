import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { PageShell } from "@/components/layout/PageShell";
import { ecommerceServices } from "@/data/services";
import { vatPages } from "@/data/vat";
import { TOOLS } from "@/lib/calculators/registry";

const siteUrl = `https://${niche.domain}`;

/**
 * Primary nav, built here in the server layout and passed down as plain data,
 * so the calculator registry's compute functions never reach the client bundle
 * (the kit shell is a client component). Same six top-level entries the old
 * src/components/ui/SiteNav.tsx rendered, in the same order - no route is added
 * to or removed from the chrome by this port. The children are new: the kit
 * header turns them into dropdowns and the kit footer derives its Services and
 * Resources columns from them, so a section that gains a page gains a chrome
 * link automatically instead of drifting the way a hand-listed footer does.
 *
 * The self-referential first child ("All services", "VAT hub") is deliberate:
 * the kit's footer column headings are not links, so without it the hub page
 * itself would have no footer entry. The kit drawer filters it out where the
 * parent link already covers it.
 */
const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      ...ecommerceServices.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  {
    label: "VAT Hub",
    href: "/vat",
    children: [
      { label: "VAT hub", href: "/vat" },
      ...vatPages.map((v) => ({ label: v.title, href: `/vat/${v.slug}` })),
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "All calculators", href: "/calculators" },
      ...TOOLS.map((t) => ({ label: t.name, href: `/calculators/${t.slug}` })),
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", niche.seo.organization_type],
  "@id": `${siteUrl}#organization`,
  name: niche.display_name,
  legalName: niche.legal_name,
  url: siteUrl,
  description: niche.description,
  logo: `${siteUrl}/api/og`,
  address: {
    "@type": "PostalAddress",
    streetAddress: [niche.company!.registered_office.line1, niche.company!.registered_office.line2].filter(Boolean).join(", "),
    addressLocality: niche.company!.registered_office.city,
    postalCode: niche.company!.registered_office.postcode,
    addressCountry: "GB",
  },
  areaServed: "GB",
  knowsAbout: [
    "VAT registration for online sellers",
    "Ecommerce VAT compliance",
    "Marketplace deemed-supplier rules",
    "Settlement and payout reconciliation",
    "Platform reporting obligations (DAC7)",
    "Making Tax Digital for Income Tax",
    "Cross-border selling IOSS and OSS",
    "Sole trader vs limited company for online sellers",
    "Amazon FBA and FBM tax",
    "Shopify seller accounts",
  ],
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/16358723",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: niche.seo.theme_color,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${niche.display_name} | ${niche.tagline}`,
    template: `%s | ${niche.display_name}`,
  },
  description: niche.description,
  alternates: {
    canonical: siteUrl,
    languages: { "en-GB": siteUrl, "x-default": siteUrl },
  },
  verification: {
    google: niche.seo.search_console_verification?.google || undefined,
    yandex: niche.seo.search_console_verification?.yandex || undefined,
    other: {
      ...(niche.seo.search_console_verification?.bing
        ? { "msvalidate.01": niche.seo.search_console_verification.bing }
        : {}),
    },
  },
  openGraph: {
    type: "website",
    locale: niche.seo.locale,
    url: siteUrl,
    siteName: niche.display_name,
    title: niche.display_name,
    description: niche.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }],
  },
  twitter: {
    card: "summary_large_image",
    title: niche.display_name,
    description: niche.description,
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={GeistSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />


      </head>
      <body className="antialiased">
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * storagePrefix "ectp" FROZEN (spinup 2026-07-15) — hardcoded literal by
         * design, NEVER from config or env (changing it orphans visitor identities).
         * PF-07: siteKey sourced from niche config, never a literal.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="ectp"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            {/* Chrome = the shared kit. PageShell also supplies the skip link,
                the single <main id="main">, and the /embed/* chrome bypass
                (partner iframes get no header and no footer). */}
            <PageShell nav={primaryNav}>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
