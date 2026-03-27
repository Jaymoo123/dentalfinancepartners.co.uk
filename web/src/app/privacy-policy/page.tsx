import type { Metadata } from "next";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.name} collects and uses personal data on this website.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: 27 March 2026</p>
      <div className="prose-blog mt-8 space-y-4 text-[var(--ink-soft)]">
        <p>
          This policy explains how {siteConfig.legalName} (&quot;we&quot;, &quot;us&quot;) handles information when you
          use {siteConfig.name} (the &quot;Site&quot;). It is a summary for transparency — replace with counsel-reviewed
          wording before production launch.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">What we collect</h2>
        <p>
          When you submit the contact form, we may collect your name, email address, phone number, practice
          name, message, and the page URL you submitted from. We use this to respond to your enquiry and to
          understand how visitors found us.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">How data is processed</h2>
        <p>
          Form submissions may be processed by a Google Apps Script web app endpoint configured by us, which
          stores data in a Google Sheet restricted to authorised staff. Google&apos;s processing is covered by
          their terms and your Workspace/data processing settings.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Cookies</h2>
        <p>
          See our <a href="/cookie-policy" className="text-[var(--accent-strong)] underline">cookie policy</a> for
          details on optional analytics or similar cookies if enabled.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Your rights</h2>
        <p>
          Under UK GDPR, you may request access, correction, or deletion of your personal data where applicable.
          Contact us using the details on the contact page.
        </p>
      </div>
    </div>
  );
}
