import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { contentNarrow, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies, browser storage and analytics, and how you can control them when browsing our CIS accounting site.`,
};

export default function CookiePolicyPage() {
  return (
    <section className="bg-white">
      <div className={`${contentNarrow} ${sectionYLoose}`}>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cookie policy" }]} />
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cookie policy</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: 12 September 2026</p>
        <div className="prose-blog mt-10 space-y-6">
          {/* TD-36. The analytics path on this site sets NO cookies: `grep -rn
              "document.cookie"` across `src` and `packages/web-shared/analytics`
              returns 0. It uses browser storage (localStorage for the visitor
              id, sessionStorage for the session id, see
              packages/web-shared/analytics/ids.ts). Describing that as "cookies"
              is a false statement about our own processing in the document a
              regulator reads first, so the page says storage where it means
              storage and reserves the word "cookie" for the one real cookie
              (section 1, the admin sign-in session). PECR still applies to
              browser storage either way, so this is a description fix, not a
              claim to an exemption. */}
          <p>
            This policy describes how Ashfield Trading Ltd (trading as {siteConfig.name}) uses cookies and
            similar technologies, including browser storage, on our website. A cookie is a small text file a
            site stores on your device. Browser storage (localStorage and sessionStorage) does the same job in
            a different place: the values are held by your browser for this site and are not sent with every
            request the way a cookie is. Both are covered by this policy.
          </p>

          <h2>1. What we use</h2>

          <h3>Strictly necessary cookies</h3>
          {/* TD-37. The previous sentence was absolute ("We do not currently use
              any strictly necessary cookies") and false: the admin sign-in route
              sets a session cookie at src/app/api/admin/login/route.ts:78, read
              back at src/app/admin/analytics/checkAuth.ts. It is staff-only and
              an ordinary visitor never receives it, but nothing on the page
              narrowed the sentence, so the sentence is narrowed here instead of
              being deleted. */}
          <p>
            We set no cookies for ordinary visitors, and the Site works without them. One cookie is set for
            staff: signing in to our internal admin area stores a session cookie so the sign-in is remembered
            for that session. It is strictly necessary for that sign-in, it is never set for visitors browsing
            the Site, and it carries no analytics or advertising data.
          </p>

          <h3>First-party analytics</h3>
          <p>
            We run our own privacy-first analytics so we can understand how visitors use the Site and improve
            it. To do this we store two random identifiers in your browser (a visitor identifier in
            localStorage, which persists between visits, and a session identifier in sessionStorage, which
            resets after 30 minutes idle or when you close the tab) and record interaction events such as pages
            viewed, scrolling, clicks and form steps. The lawful basis is our legitimate interest in measuring
            and improving the Site.
          </p>
          {/* TD-17. What the code actually persists, read from the live handler:
              src/app/api/track/route.ts:17 mounts
              packages/web-shared/analytics/server/createTrackHandler.ts, which
              reads x-vercel-ip-country, -city, -country-region and -timezone at
              :231-234 and writes all four at :148-151, against the persistent
              visitor id. The raw IP genuinely is never stored or hashed (no
              x-forwarded-for and no request.ip anywhere in the handler), so that
              half of the old sentence was true and is kept. "Only a country" and
              the flat "anonymous" were not, and city + region + timezone against
              a durable id is not anonymous in the UK GDPR sense, so the word is
              dropped rather than qualified. */}
          <p>
            We do not store your IP address. We do record the approximate location our hosting provider derives
            from it: country, city, region and timezone. Because that is recorded against the visitor identifier
            described above, which lasts between visits, we do not describe this data as anonymous. We do not
            collect your name, email or phone number in these events, and we do not sell or share this data. You
            can opt out at any time using the &quot;Do not track me&quot; link in the footer of every page, which
            immediately stops all analytics on your device.
          </p>

          <h3>Third-party analytics</h3>
          {/* TD-16. The Google Analytics opt-out section that used to sit in
              section 3 is deleted. This site runs no Google Analytics:
              niche.config.json:251 sets "google_analytics_id": "", layout.tsx
              passes that empty string to ConsentedScripts, and
              packages/web-shared/analytics/react/GoogleAnalytics.tsx:8 returns
              null for anything that is not a G- id, so no gtag and no
              googletagmanager script is ever emitted. The page already said so
              correctly here and then, sixty lines later, told visitors to
              install the GA opt-out add-on: a step that does nothing, about a
              product that is not running. Do not reinstate the section if GA is
              ever switched on; write one that matches whatever is then true. */}
          <p>
            This Site does not use Google Analytics or any other third-party analytics. The only analytics data
            collected is through our own first-party system described above.
          </p>

          <h2>2. What we use it for</h2>
          <p>We use cookies and browser storage to:</p>
          <ul>
            <li>Understand which pages are most useful to CIS subcontractors and construction businesses</li>
            <li>Identify technical issues or broken links</li>
            <li>Measure the effectiveness of our content</li>
            <li>Improve the overall user experience</li>
            <li>Keep a staff sign-in to our admin area active for that session</li>
          </ul>
          <p>
            We do <strong>not</strong> use cookies or browser storage for advertising, remarketing, or selling
            your data to third parties.
          </p>

          <h2>3. How to manage cookies and browser storage</h2>
          <p>The quickest way to stop our analytics is the opt-out below. You can also use your browser.</p>

          <h3>Our opt-out</h3>
          <p>
            The &quot;Do not track me&quot; link in the footer of every page stops all analytics on your device
            immediately, and clears the identifiers described above. It is the only control you need for
            anything this Site records.
          </p>

          <h3>Browser settings</h3>
          <p>
            Most browsers allow you to block or delete cookies and site data through their settings. Please note
            that blocking all cookies and site data may affect your experience on some websites. Instructions for
            popular browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2>4. Changes to this policy</h2>
          <p>
            We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this
            page shows when it was last revised.
          </p>

          <h2>5. Contact us</h2>
          <p>
            If you have questions about our use of cookies and browser storage, please contact us via our{" "}
            <Link href="/contact" className="text-primary-700 underline underline-offset-2 hover:text-primary-800">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
