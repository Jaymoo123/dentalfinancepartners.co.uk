import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import ContractorsBackdrop from "@/components/layout/ContractorsBackdrop";
import { siteConfig } from "@/config/site";

/**
 * Section index for the right-hand rail. Labels are copies of this page's own
 * heading text and the ids are the ones set on those headings. No new
 * substance: a restyle of a published legal notice may move copy, never change
 * it. Heading scroll offset is site-wide already (`globals.css`
 * `:where(h2[id], h3[id], h4[id]) { scroll-margin-top: 6rem }`), verified live
 * in the emitted stylesheet, so these ids inherit it.
 */
const SECTIONS = [
  { id: "what-cookies-we-use", label: "1. What cookies we use" },
  { id: "what-we-use-it-for", label: "2. What we use this data for" },
  { id: "how-to-manage", label: "3. How to manage cookies" },
  { id: "changes", label: "4. Changes to this policy" },
  { id: "contact-us", label: "5. Contact us" },
];

/** The sticky section index. Same shape as the sibling legal pages. */
function SectionIndex({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Sections of this page" className="hidden min-w-0 lg:block">
      <div className="sticky top-24 rounded-xl bg-neutral-50 p-5 ring-1 ring-neutral-200/70">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-600">
          On this page
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-neutral-600 underline-offset-2 hover:text-primary-700 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description: `How ${siteConfig.name} uses cookies and similar technologies.`,
    url: `${siteConfig.url}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie policy",
    description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* The last-updated date is hero fine print rather than a line stranded
          above the body. The date itself is untouched: a restyle is not a change
          to the document, so re-dating it would be a false claim. */}
      <SlimHero eyebrow="Legal" title="Cookie policy" backdrop={<ContractorsBackdrop />}>
        <p className="mt-4 text-sm text-neutral-400">Last updated: 18 June 2026</p>
      </SlimHero>

      {/* Two columns rather than a narrow body clamp: the page measure is the
          container, and the answer to long prose is to put something useful
          beside it. The rail is link-positive and gives the numbered clauses
          linkable anchors. `prose-blog` still sets its own `max-width: 65ch`
          in globals.css, which is outside this package lease. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
        <div className="prose-blog min-w-0 space-y-6">
          <p>
            This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses cookies and similar technologies on our website. Cookies are small text files stored on your device that help us understand how visitors use our Site and improve your experience.
          </p>

          <h2 id="what-cookies-we-use">1. What cookies we use</h2>

          <h3 id="essential-cookies">Essential cookies</h3>
          <p>
            We do not currently use any strictly necessary cookies. Our Site functions without requiring cookies for basic operation.
          </p>

          <h3 id="first-party-analytics">First-party analytics</h3>
          <p>
            We run our own privacy-first analytics so we can understand how visitors use the Site and improve
            it. To do this we store two random identifiers in your browser (a visitor identifier and a session
            identifier) and record anonymous interaction events such as pages viewed, scrolling, clicks and
            form steps. The lawful basis is our legitimate interest in measuring and improving the Site.
          </p>
          <p>
            This data is anonymous. We do not store your IP address itself. From it we derive and store an
            approximate location (country, city and region) and your timezone. We do not collect your name,
            email or phone number in these events, and we do not sell or share this data. You can opt out at any time using the &quot;Do not track me&quot; link in the footer of every page, which immediately stops all analytics on your device.
          </p>
          <h3 id="third-party-analytics">Third-party analytics</h3>
          <p>
            This Site does not use Google Analytics or any other third-party analytics cookies. The only
            analytics data collected is through our own first-party system described above.
          </p>

          <h2 id="what-we-use-it-for">2. What we use this data for</h2>
          <p>We use the analytics data described above to:</p>
          <ul>
            <li>Understand which pages are most useful to contractors and IR35-affected workers</li>
            <li>Identify technical issues or broken links</li>
            <li>Measure the effectiveness of our content</li>
            <li>Improve the overall user experience</li>
          </ul>
          <p>
            We do <strong>not</strong> use cookies for advertising, remarketing, or selling your data to third parties.
          </p>

          <h2 id="how-to-manage">3. How to manage cookies</h2>
          <p>You can control and manage cookies in several ways:</p>

          <h3 id="browser-settings">Browser settings</h3>
          <p>
            Most browsers allow you to block or delete cookies through their settings. Please note that blocking all cookies may affect your experience on some websites. Instructions for popular browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h3 id="our-own-analytics">Our own analytics</h3>
          <p>
            To opt out of our first-party analytics, use the &quot;Do not track me&quot; link in the footer of
            every page. It takes effect immediately on your device.
          </p>

          <h2 id="changes">4. Changes to this policy</h2>
          <p>
            We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top of this page shows when it was last revised.
          </p>

          <h2 id="contact-us">5. Contact us</h2>
          <p>
            If you have questions about our use of cookies, please contact us via our{" "}
            <Link href="/contact" className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900">
              contact page
            </Link>
            .
          </p>
        </div>
            <SectionIndex sections={SECTIONS} />
          </div>
        </div>
      </section>
    </>
  );
}
