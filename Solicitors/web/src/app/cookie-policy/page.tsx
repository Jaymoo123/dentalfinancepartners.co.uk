import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies. Google Analytics cookies explained.`,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description: `How ${siteConfig.name} uses cookies and similar technologies. Google Analytics cookies explained.`,
    url: `${siteConfig.url}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie policy",
    description: `How ${siteConfig.name} uses cookies and similar technologies. Google Analytics cookies explained.`,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cookie policy" },
        ]}
      />
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Cookie policy</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: 18 June 2026</p>
      <div className="prose-blog mt-8 space-y-6 text-[var(--ink-soft)]">
        <p>
          This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses cookies and similar technologies on our website. Cookies are small text files stored on your device that help us understand how visitors use our Site and improve your experience.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">1. What cookies we use</h2>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Essential cookies</h3>
        <p>
          We do not currently use any strictly necessary cookies. Our Site functions without requiring cookies for basic operation.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">First-party analytics</h3>
        <p>
          We run our own privacy-first analytics so we can understand how visitors use the Site and improve it. To do this we store two random identifiers in your browser (a visitor identifier and a session identifier) and record anonymous interaction events such as pages viewed, scrolling, clicks and form steps. The lawful basis is our legitimate interest in measuring and improving the Site.
        </p>
        <p>
          We do not store your IP address. We do store the approximate location and time zone our hosting provider derives from your connection, namely country, region, city and time zone, together with your browser and operating system family. We do not collect your name, email or phone number in these events, and we do not sell or share this data. You can opt out at any time using the &quot;Do not track me&quot; link in the footer of every page, which immediately stops all analytics on your device.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Analytics cookies (Google Analytics)</h3>
        <p>
          We use Google Analytics to understand how visitors interact with our Site. This helps us improve content and user experience. Google Analytics sets the following cookies:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>_ga:</strong> Distinguishes unique users. Expires after 2 years.
          </li>
          <li>
            <strong>_ga_G-N6ZPRB3DSQ:</strong> Maintains the Google Analytics 4 session state for this Site. Expires after 2 years.
          </li>
          <li>
            <strong>_gat_gtag_*:</strong> Where the Google tag sets it, used to throttle the request rate. Expires after 1 minute.
          </li>
        </ul>
        <p>
          Google Analytics collects information such as pages visited, time spent on pages, browser type, device type, and referral source. IP addresses are anonymised. Data is retained for 14 months.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">2. Purpose of cookies</h2>
        <p>We use cookies to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Understand which pages are most useful to solicitors and law firms</li>
          <li>Identify technical issues or broken links</li>
          <li>Measure the effectiveness of our content</li>
          <li>Improve the overall user experience</li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for advertising, remarketing, or selling your data to third parties.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">3. How to manage cookies</h2>
        <p>You can control and manage cookies in several ways:</p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">On this site</h3>
        <p>
          Use the &quot;Do not track me&quot; link in the footer of any page to opt out of our first-party analytics and Google Analytics. Your choice is stored on your device and takes effect immediately. You can re-enable analytics from the same link.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Browser settings</h3>
        <p>
          Most browsers allow you to block or delete cookies through their settings. Please note that blocking all cookies may affect your experience on some websites. Instructions for popular browsers:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-strong)] underline underline-offset-2"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-strong)] underline underline-offset-2"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-strong)] underline underline-offset-2"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent-strong)] underline underline-offset-2"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Google Analytics opt-out</h3>
        <p>
          You can opt out of Google Analytics tracking by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent-strong)] underline underline-offset-2"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">4. Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this page shows when it was last revised.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">5. Contact us</h2>
        <p>
          If you have questions about our use of cookies, please contact us via our{" "}
          <Link href="/contact" className="font-semibold text-[var(--accent-strong)] underline underline-offset-2">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
