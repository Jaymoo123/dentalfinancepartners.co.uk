import type { Metadata } from "next";
import Link from "next/link";
import {
  contentNarrow,
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/** Body link: navy primary-700 (11.13 on the --background ground, 11.64 on white).
 *  --accent-strong is gold-strong and measures 3.76, a text fail, which is why no
 *  legal page links through the accent token. */
const legalLink = `text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing} rounded`;

/** GA4 sets exactly two cookies: `_ga` and `_ga_<measurement id without the G- prefix>`.
 *  Derived from the configured id so the name cannot drift from what actually runs. */
const gaPropertyCookie = `_ga_${niche.seo.google_analytics_id.replace(/^G-/, "")}`;

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
    <>
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cookie policy" },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Legal</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">Cookie policy</h1>
            <p className="mt-5 text-sm text-white/85">Last updated: 18 June 2026</p>
          </div>
        </div>
      </section>
      <div className={`${contentNarrow} ${sectionY} prose-blog space-y-6 text-[var(--ink-soft)]`}>
        <p>
          This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses cookies and similar technologies on our website. Cookies are small text files stored on your device that help us understand how visitors use our Site and improve your experience.
        </p>

        <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">1. What cookies we use</h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Essential cookies and storage</h3>
        <p>
          We set no cookies of our own on the public pages of the Site. Our own analytics use browser storage rather than cookies: two random identifiers, and, if you opt out of analytics, a record of that choice so it survives between visits. The opt-out record is the one item we would keep whatever you chose, because without it we could not honour your decision. Google Analytics does set cookies on the public pages unless you have opted out, and those cookies are listed below.
        </p>
        <p>
          A single sign-in cookie is used in the private, staff-only part of the Site. Visitors cannot reach that area and it is never set by browsing the public pages.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">First-party analytics</h3>
        <p>
          We run our own privacy-first analytics so we can understand how visitors use the Site and improve it. To do this we store two random identifiers in your browser (a visitor identifier and a session identifier) and record anonymous interaction events such as pages viewed, scrolling, clicks and form steps. The lawful basis is our legitimate interest in measuring and improving the Site.
        </p>
        <p>
          This data is anonymous. We do not store your IP address (only a country derived from it), we do not collect your name, email or phone number in these events, and we do not sell or share this data. You can opt out at any time using the &quot;Do not track me&quot; link in the footer of every page. That stops our first-party analytics on your device straight away, and stops Google Analytics loading on the pages you view after that.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Analytics cookies (Google Analytics)</h3>
        <p>
          We use Google Analytics to understand how visitors interact with our Site. This helps us improve content and user experience. Google Analytics runs by default on the public pages, on the same legitimate-interest basis as our own analytics, and stops running if you opt out. When it runs, it sets the following cookies:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>_ga:</strong> Distinguishes one browser from another. Expires after 2 years.
          </li>
          <li>
            <strong>{gaPropertyCookie}:</strong> Keeps the state of your visit for this website&apos;s Google Analytics
            property. Expires after 2 years.
          </li>
        </ul>
        <p>
          Google Analytics collects information such as pages visited, time spent on pages, browser type, device type, and referral source. It does not store your IP address: your IP address is used to work out an approximate location and is then discarded. How long Google keeps this analytics data is a setting on our Google Analytics property, and the longest period Google allows us to choose is 14 months.
        </p>

        <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">2. Purpose of cookies</h2>
        <p>We use cookies to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Understand which pages are most useful to dental professionals</li>
          <li>Identify technical issues or broken links</li>
          <li>Measure the effectiveness of our content</li>
          <li>Improve the overall user experience</li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for advertising, remarketing, or selling your data to third parties.
        </p>

        <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">3. How to manage cookies</h2>
        <p>You can control and manage cookies in several ways:</p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">On this site</h3>
        <p>
          Use the &quot;Do not track me&quot; link in the footer of any page to opt out of our first-party analytics and Google Analytics. Your choice is stored on your device. Our own analytics stop immediately and Google Analytics is not loaded on the pages you view after that. Any Google Analytics cookies already on your device stay there until they expire or you delete them in your browser settings. You can re-enable analytics from the same link.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Browser settings</h3>
        <p>
          Most browsers allow you to block or delete cookies through their settings. Please note that blocking all cookies may affect your experience on some websites. Instructions for popular browsers:
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

        <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Google Analytics opt-out</h3>
        <p>
          You can opt out of Google Analytics tracking by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className={legalLink}
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">4. Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this page shows when it was last revised.
        </p>

        <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">5. Contact us</h2>
        <p>
          If you have questions about our use of cookies, please contact us via our{" "}
          <Link href="/contact" className={legalLink}>
            contact page
          </Link>
          .
        </p>
      </div>
    </>
  );
}
