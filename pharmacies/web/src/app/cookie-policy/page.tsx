import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY, focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies on this website.`,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description: `How ${siteConfig.name} uses cookies and similar technologies on this website.`,
    url: `${siteConfig.url}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie policy",
    description: `How ${siteConfig.name} uses cookies and similar technologies on this website.`,
  },
};

/**
 * CHROME ONLY. Every sentence is the pre-port copy, byte for byte. The
 * cookie-policy-vs-AdSense row and the retention months are owner-ruled LEFT
 * AS IS (2026-09-29, re-applied here) and are not reopened.
 *
 * ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx (replacing
 * src/components/ui/Breadcrumb.tsx, which W3 retires; still exactly one
 * BreadcrumbList per URL) and page-blocks.tsx `Eyebrow`, whose word is the
 * first word of this route's own h1, so no copy is authored.
 *
 * Substantive change: five inline links carried a raw `#0f3a4a` hex utility
 * and no focus ring. They now read primary-700 (`#177392`, 5.38:1 on white,
 * PASS) and the site's `--focus-ring` recipe. No dark ground on this page, so
 * no `.ground-dark`.
 *
 * ADOPTION DECLINED: primitives/SlimHero.tsx (docblock :5-13 scopes it to the
 * three token-gated post-submit pages and it has no slot above its eyebrow for
 * this route's breadcrumb, :52-57); primitives/FaqSection.tsx (a single-open
 * Radix accordion, :45, would collapse legal text a reader must be able to
 * ctrl-F, and this page emits no FAQPage JSON-LD); marketing/LeadCTAPanel.tsx
 * and marketing/WhatToExpectCard.tsx (a capture surface on a cookie policy is
 * wrong on its own terms, and the card's defaults publish a fee line this site
 * never promises, :22-27).
 */
const legalLink = `font-medium text-primary-700 underline underline-offset-2 rounded ${focusRing}`;

export default function CookiePolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        siteUrl={siteConfig.url}
        items={[
          { label: "Home", href: "/" },
          { label: "Cookie policy" },
        ]}
      />
      <Eyebrow>Cookie</Eyebrow>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Cookie policy</h1>
      <p className="mt-4 text-sm text-slate-500">Last updated: 15 July 2026</p>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
        <p>
          This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses cookies and
          similar technologies on our website. Cookies are small text files stored on your device that help us
          understand how visitors use our Site and improve your experience.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">1. What cookies we use</h2>

        <h3 className="text-lg font-semibold text-slate-900">Essential cookies</h3>
        <p>
          We do not currently use any strictly necessary cookies. Our Site functions without requiring cookies for
          basic operation.
        </p>

        <h3 className="text-lg font-semibold text-slate-900">First-party analytics</h3>
        <p>
          We run our own privacy-first analytics so we can understand how visitors use the Site and improve it. To do
          this we store two random identifiers in your browser (a visitor identifier and a session identifier) and
          record anonymous interaction events such as pages viewed, scrolling, clicks and form steps. The lawful
          basis is our legitimate interest in measuring and improving the Site.
        </p>
        <p>
          This data is anonymous. We do not store your IP address (only a country derived from it), we do not
          collect your name, email or phone number in these events, and we do not sell or share this data.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">2. Purpose of cookies</h2>
        <p>We use cookies to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Understand which pages are most useful to pharmacy owners and buyers</li>
          <li>Identify technical issues or broken links</li>
          <li>Measure the effectiveness of our content</li>
          <li>Improve the overall user experience</li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for advertising, remarketing, or selling your data to third parties.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">3. How to manage cookies</h2>

        <h3 className="text-lg font-semibold text-slate-900">Browser settings</h3>
        <p>
          Most browsers allow you to block or delete cookies through their settings. Please note that blocking all
          cookies may affect your experience on some websites. Instructions for popular browsers:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className={legalLink}
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className={legalLink}
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className={legalLink}
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className={legalLink}
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900">4. Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this
          page shows when it was last revised.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">5. Contact us</h2>
        <p>
          If you have questions about our use of cookies, please contact us via our{" "}
          <Link href="/contact" className={legalLink}>
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
