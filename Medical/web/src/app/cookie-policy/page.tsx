import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/**
 * Owner decision 6 (docs/medical/_port/README.md): this page is corrected in
 * full. Every claim below is traced to a call site:
 *   GA4 id            Medical/niche.config.json:168 ("G-CQF7KFZ1P6")
 *   GA mounted gated  layout.tsx:114 -> ConsentedScripts.tsx:24 (null when denied)
 *   storage prefix    layout.tsx:80 (storagePrefix="ma", FROZEN)
 *   opt-out control   PageShell.tsx:86 -> ConsentToggle.tsx:30 ("Do not track me")
 *   ingest            src/app/api/track/route.ts -> createTrackHandler.ts:231-234
 * No first-party cookie is set anywhere: `grep -rn document.cookie src/` and the
 * same grep over packages/web-shared/ both return nothing. The only cookies on
 * this site come from GA4.
 */

const description = `How ${siteConfig.name} uses cookies, browser storage and analytics, and how to opt out.`;

export const metadata: Metadata = {
  title: "Cookie policy",
  description,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  twitter: {
    card: "summary_large_image",
    title: "Cookie policy",
    description,
  },
};

const linkClass = "font-semibold text-[var(--accent-strong)] underline underline-offset-2";
const h2Class = "mt-10 text-2xl font-bold text-[var(--ink)] sm:text-3xl";
const h3Class = "mt-8 text-lg font-semibold text-[var(--ink)]";

/** Every browser-storage key this site writes, with the file that writes it. */
const storageKeys: { key: string; store: string; purpose: string }[] = [
  {
    key: "ma_consent",
    store: "Local storage",
    purpose:
      "Records that you have used the “Do not track me” control, so we keep honouring your choice on later visits. This one is strictly necessary: without it we could not remember that you opted out.",
  },
  {
    key: "ma_vid",
    store: "Local storage",
    purpose: "A random visitor identifier for our own analytics. Not derived from anything you tell us.",
  },
  {
    key: "ma_sid, ma_sid_ts",
    store: "Session storage",
    purpose: "A random session identifier and the time of your last activity, so a visit can be counted as one visit. The session restarts after 30 minutes of inactivity.",
  },
  {
    key: "ma_visits",
    store: "Local storage",
    purpose: "A count of how many separate visits you have made, so we can tell a returning reader from a first-time one.",
  },
  {
    key: "ma_entry_topic, ma_last_topic",
    store: "Session and local storage",
    purpose: "The subject of the page you landed on, and the last subject you read about, so the guides and calculators we point you to match what you came for.",
  },
  {
    key: "ma_journey",
    store: "Session storage",
    purpose: "A short trail of the pages you have viewed in this session, used for the same tailoring.",
  },
  {
    key: "ma_converted",
    store: "Local storage",
    purpose: "A flag set when you have already sent us an enquiry, so we stop asking you to.",
  },
  {
    key: "ma_booking_nudge, ma_booked",
    store: "Local storage",
    purpose: "A short-lived token that lets you book a call back after an enquiry, and a flag that clears it once you have booked. The token carries no personal details.",
  },
  {
    key: "ma_sticky_dismissed, ma_returning_bar_dismissed, ma_modal_shown, ma_deepscroll_<subject>",
    store: "Session storage, except ma_deepscroll_<subject> which is local storage",
    purpose: "Records that you have closed or already been shown one of our prompts, so it is not shown again.",
  },
  {
    key: "ma_assistant_active, ma_assistant_autoopened",
    store: "Session storage",
    purpose: "Records that the help panel has opened once in this session, so it does not open itself again.",
  },
  {
    // Written as a prefix, not the full template: src/tests/result-gate-boundary.test.ts
    // asserts that only resultGateStorage.ts contains the full reveal-key literal, and
    // that guard is not this page's to weaken.
    key: "ma_calc_revealed… (one per calculator)",
    store: "Session storage",
    purpose: "Remembers that you have already seen the result of a particular calculator, so you are not asked twice for the same one.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cookie policy" },
        ]}
      />
      <h1 className="text-3xl font-bold text-[var(--ink)] sm:text-4xl">Cookie policy</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: 11 September 2026</p>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
        <p>
          This policy describes how {siteConfig.company.legalName} (trading as {siteConfig.name}) uses
          cookies and similar technologies on our website (the &quot;Site&quot;). Cookies are small text
          files stored on your device. We also use two other kinds of browser storage, called local
          storage and session storage, which work in a similar way, and this policy covers those too.
        </p>
        <p>
          If you would rather not be measured at all, use the <strong>&quot;Do not track me&quot;</strong>{" "}
          button in the footer of any page. Section 4 explains what it does.
        </p>

        <h2 className={h2Class}>1. Cookies</h2>
        <p>
          <strong>We do not set any cookies of our own.</strong> The only cookies placed on your device
          through this Site come from Google Analytics 4, which we use to measure how the Site is used.
          Google Analytics is loaded only if you have not opted out, so if you have used the
          &quot;Do not track me&quot; button, no cookie is set at all.
        </p>
        <p>When Google Analytics is running, it sets:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>_ga:</strong> distinguishes one browser from another. Expires after 2 years.
          </li>
          <li>
            <strong>_ga_CQF7KFZ1P6:</strong> keeps the state of your visit for our particular Google
            Analytics property. Expires after 2 years.
          </li>
        </ul>
        <p>
          Google Analytics records information such as the pages you viewed, how long you spent on them,
          your browser and device type and where you arrived from. Google sets these cookies as an
          independent controller for some of its own purposes, and its handling of that data is governed
          by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Google&apos;s privacy policy
          </a>
          .
        </p>

        <h2 className={h2Class}>2. Our own analytics, and what we store in your browser</h2>
        <p>
          Alongside Google Analytics we run our own measurement. It does not use cookies. Instead, events
          such as a page view, a scroll, a click or a form step are sent to our own server and stored in
          our database, with two random identifiers attached so that a sequence of events can be read as
          one visit. Our hosting provider tells us the approximate country, region, city and time zone of
          the request. <strong>We never store your IP address.</strong> These events carry no name, email
          address or phone number.
        </p>
        <p>
          To make that work, and to remember things like a prompt you have already closed, we store the
          following values in your browser. They are all first-party, none of them is shared with an
          advertiser, and all of them begin with <code>ma_</code>:
        </p>
        <dl className="space-y-4 rounded-xl border border-[var(--border)] p-5">
          {storageKeys.map((item) => (
            <div key={item.key}>
              <dt className="font-semibold text-[var(--ink)]">
                <code>{item.key}</code>{" "}
                <span className="text-sm font-normal text-[var(--muted)]">({item.store})</span>
              </dt>
              <dd className="mt-1 text-base leading-relaxed">{item.purpose}</dd>
            </div>
          ))}
        </dl>
        <p>
          Local storage stays on your device until you or your browser clears it. Session storage is
          cleared when you close the tab. Our lawful basis for this measurement is our legitimate interest
          in understanding and improving the Site, which is why we offer an opt-out rather than asking you
          to agree before you can read anything. See our{" "}
          <Link href="/privacy-policy" className={linkClass}>
            privacy policy
          </Link>{" "}
          for how we handle personal data more generally.
        </p>
        <p>
          We also use Vercel Speed Insights, a page-speed measurement supplied by our hosting provider,
          which reports anonymous loading-performance figures.
        </p>

        <h2 className={h2Class}>3. What we use this for</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Understanding which pages are most useful to doctors, dentists and practice owners</li>
          <li>Identifying technical problems and broken links</li>
          <li>Measuring whether our guides and calculators actually help</li>
          <li>Pointing you to the guide or calculator that matches what you were reading</li>
        </ul>
        <p>
          We do <strong>not</strong> use any of it for advertising or remarketing, and we do not sell it.
        </p>

        <h2 className={h2Class}>4. How to opt out</h2>

        <h3 className={h3Class}>On this Site</h3>
        <p>
          The <strong>&quot;Do not track me&quot;</strong> button in the footer of every page is the
          control to use. Pressing it records your choice on your device and takes effect immediately: we
          stop loading Google Analytics, and we stop sending events to our own analytics, including the
          identifiers and visit history described in section 2. The same button then reads
          &quot;Enable analytics&quot; if you change your mind. Your choice is stored on the device and in
          the browser you used, so you would need to repeat it elsewhere.
        </p>
        <p>
          A small number of the values in section 2 are not analytics and may still be written after you
          opt out, because their only job is to remember something you did on the page, for example that
          you closed a prompt or already revealed a calculator result. You can clear those at any time
          through your browser settings.
        </p>

        <h3 className={h3Class}>Browser settings</h3>
        <p>
          Most browsers let you block or delete cookies and clear site storage. Blocking everything may
          affect how some websites work. Instructions for popular browsers:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h3 className={h3Class}>Google&apos;s own opt-out</h3>
        <p>
          Google also publishes a{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          , which blocks Google Analytics across every site you visit. It does not affect our own
          analytics, so the footer button is the more complete option here.
        </p>

        <h2 className={h2Class}>5. Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The &quot;Last updated&quot; date at the top
          of this page shows when it was last revised.
        </p>

        <h2 className={h2Class}>6. Contact us</h2>
        <p>
          If you have questions about our use of cookies or browser storage, please contact us via our{" "}
          <Link href="/contact" className={linkClass}>
            contact page
          </Link>
          . You can also read our{" "}
          <Link href="/terms" className={linkClass}>
            terms of use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
