/**
 * Dental Finance Partners — UK dental practice finance & accounting.
 * Production: set NEXT_PUBLIC_SITE_URL=https://dentalfinancepartners.co.uk (no trailing slash)
 */
export const siteConfig = {
  name: "Dental Finance Partners",
  legalName: "Dental Finance Partners Ltd",
  domain: "dentalfinancepartners.co.uk",
  tagline: "Accounting for UK dentists — nothing else",
  description:
    "Dental accountants for associates, practice owners, and multi-site groups. NHS contracts, associate tax, VAT in a practice, and acquisitions — we only work with dentists.",
  locale: "en-GB",
  get url() {
    return (
      (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
      "http://localhost:3000"
    );
  },
  /** Social / JSON-LD logo; on-page hero/footer use text marks. Add `/public/brand/logo.png` anytime and point this there. */
  publisherLogoUrl: "/og-placeholder.svg",
  contact: {
    email: "hello@dentalfinancepartners.co.uk",
    phone: "+44 20 0000 0000",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Locations", href: "/locations" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie policy", href: "/cookie-policy" },
  ],
  locations: [
    { slug: "london", title: "Dental finance & accounting in London" },
    { slug: "manchester", title: "Dental finance & accounting in Manchester" },
  ],
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
