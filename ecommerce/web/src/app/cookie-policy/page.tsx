import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY, focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies on our website. UK PECR compliant.`,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description: `How ${siteConfig.name} uses cookies and similar technologies on our website. UK PECR compliant.`,
    url: `${siteConfig.url}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie policy",
    description: `How ${siteConfig.name} uses cookies and similar technologies on our website.`,
  },
};

/**
 * CHROME ONLY. The legal copy on this page is not reworded, reordered or
 * restructured by the port; the body renders through `.prose-blog`, which is
 * defined in src/app/globals.css inside `@layer components` (it was missing
 * from every stylesheet this site loads until phase 0, so this page shipped
 * unstyled in production). Nothing here fights that class.
 *
 * The only change: every inline link carried
 * `text-orange-700 underline underline-offset-2 hover:text-orange-800`, a raw
 * Tailwind orange that is not this site's brand ramp and, being a utility,
 * OUTRANKED the `.prose-blog a` colour that phase 0 deliberately set to the
 * accessible brand step. Dropping the colour utilities lets `.prose-blog a`
 * paint: `var(--brand-primary-text)` = #8a5e1a, 5.68 on white, hovering to
 * primary-800 #6f4b15 at 7.80. It also supplies the underline and offset, so
 * nothing is lost. `focusRing` is added because not one of these links had a
 * focus ring: the ring reads `var(--focus-ring)`, the light-ground value here
 * (this page paints no dark ground and carries no `.ground-dark`).
 *
 * No breadcrumb and no hero: this is a flat single-level legal page reached
 * from the footer, matching its two siblings.
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx (its
 * docblock scopes it to /thank-you, /book and /complete),
 * packages/web-shared/design/primitives/FaqSection.tsx (a Radix accordion with
 * no forceMount; it would also collapse legal text a reader must be able to
 * find with ctrl-F) and
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx,
 * marketing/StickyCTA.tsx, marketing/TestimonialsSection.tsx,
 * marketing/WhatToExpectCard.tsx and marketing/StatsCounter.tsx (banned for
 * this port; a lead-capture surface on a legal page is also wrong on its own
 * terms).
 */
export default function CookiePolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cookie policy</h1>
      <p className="mt-4 text-sm text-neutral-500">Last updated: 15 July 2026</p>
      <div className="prose-blog mt-8 space-y-6">
        <p>
          This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses cookies and
          similar technologies on our website. Cookies are small text files stored on your device that help us
          understand how visitors use our site and improve your experience.
        </p>

        <h2>1. What cookies we use</h2>

        <h3>Essential cookies</h3>
        <p>
          We do not currently use any strictly necessary cookies. Our site functions without requiring cookies for basic
          operation.
        </p>

        <h3>First-party analytics</h3>
        <p>
          We run our own privacy-first analytics so we can understand how visitors use the site and improve it. To do
          this we store two random identifiers in your browser (a visitor identifier and a session identifier) and
          record anonymous interaction events such as pages viewed, scrolling, clicks and form steps. The lawful basis
          is our legitimate interest in measuring and improving the site.
        </p>
        <p>
          This data is anonymous. We do not store your IP address (only a country derived from it), we do not collect
          your name, email or phone number in these events, and we do not sell or share this data. You can opt out at
          any time using the &quot;Do not track me&quot; link in the footer of every page, which immediately stops all
          analytics on your device.
        </p>

        <h2>2. Purpose of cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Understand which pages are most useful to online sellers and ecommerce businesses</li>
          <li>Identify technical issues or broken links</li>
          <li>Measure the effectiveness of our content</li>
          <li>Improve the overall user experience</li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for advertising, remarketing, or selling your data to third parties.
        </p>

        <h2>3. How to manage cookies</h2>

        <h3>On this site</h3>
        <p>
          Use the &quot;Do not track me&quot; link in the footer of any page to opt out of our first-party analytics.
          Your choice is stored on your device and takes effect immediately. You can re-enable analytics from the same
          link.
        </p>

        <h3>Browser settings</h3>
        <p>
          Most browsers allow you to block or delete cookies through their settings. Blocking all cookies may affect
          your experience on some websites. Instructions for popular browsers:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className={focusRing}
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className={focusRing}
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className={focusRing}
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className={focusRing}
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>4. Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this page
          shows when it was last revised.
        </p>

        <h2>5. Contact us</h2>
        <p>
          If you have questions about our use of cookies, please contact us via our{" "}
          <Link href="/contact" className={focusRing}>
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
