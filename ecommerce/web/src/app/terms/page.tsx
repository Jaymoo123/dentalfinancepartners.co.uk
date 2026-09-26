import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY, focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms of use for the ${siteConfig.name} website. Governing law, disclaimers, and acceptable use policy.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    title: `Terms of Use | ${siteConfig.name}`,
    description: `Terms of use for the ${siteConfig.name} website. Governing law, disclaimers, and acceptable use policy.`,
    url: `${siteConfig.url}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of use",
    description: `Terms of use for the ${siteConfig.name} website. Governing law, disclaimers, and acceptable use policy.`,
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
export default function TermsPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of use</h1>
      <p className="mt-4 text-sm text-neutral-500">Last updated: 15 July 2026</p>
      <div className="prose-blog mt-8 space-y-6">
        <p>
          These terms of use govern your access to and use of the {siteConfig.name} website (the &quot;Site&quot;). By
          accessing or using the Site, you agree to be bound by these terms. If you do not agree, please do not use the
          Site.
        </p>

        <h2>1. About us</h2>
        <p>
          The Site is operated by {siteConfig.company.legalName} (trading as {siteConfig.name}), a company registered
          in {siteConfig.company.placeOfRegistration} under company number {siteConfig.company.number}, with its
          registered office at {siteConfig.company.registeredOfficeLine}. You can contact us via our{" "}
          <Link href="/contact" className={focusRing}>
            contact page
          </Link>
          .
        </p>

        <h2>2. No advice provided on the Site</h2>
        <p>
          Content on this Site is for general information purposes only. It does <strong>not</strong> constitute
          accounting, tax, financial, or legal advice. You should not rely on any content on the Site as a substitute
          for professional advice tailored to your specific circumstances.
        </p>
        <p>
          Tax rules for online sellers, including VAT registration thresholds, marketplace deemed-supplier rules,
          platform reporting obligations, and cross-border obligations, change frequently and depend on individual
          facts. Always verify figures against current HMRC guidance and seek professional advice for your own
          situation.
        </p>
        <p>
          Formal engagements for professional services are subject to separate written engagement letters and terms of
          business. No accountant-client relationship is created by your use of this Site or submission of an enquiry
          form.
        </p>

        <h2>3. Accuracy and changes</h2>
        <p>
          While we aim to keep information on the Site accurate and up to date, tax and accounting rules change
          frequently. We make no representations or warranties regarding the accuracy, completeness, or currency of any
          content.
        </p>
        <p>
          We reserve the right to update, modify, or remove content at any time without notice. It is your
          responsibility to check for updates if you are relying on information from the Site.
        </p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorised access to any part of the Site, server, or database</li>
          <li>Use automated systems (bots, scrapers) to access the Site without our prior written consent</li>
          <li>Transmit any harmful code, viruses, or malicious software</li>
          <li>Interfere with or disrupt the Site or servers</li>
          <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
        </ul>

        <h2>5. Intellectual property</h2>
        <p>
          All content on the Site, including text, graphics, logos, and software, is the property of{" "}
          {siteConfig.legalName} or its licensors and is protected by UK and international copyright laws.
        </p>
        <p>
          You may view and print pages from the Site for your personal, non-commercial use, provided you do not modify
          any content and you retain all copyright and proprietary notices. Any other use requires our prior written
          permission.
        </p>

        <h2>6. Third-party links</h2>
        <p>
          The Site may contain links to third-party websites, including HMRC guidance and EU Commission sources. We do
          not control or endorse these websites and are not responsible for their content, privacy practices, or terms
          of use. You access third-party websites at your own risk.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.legalName} excludes all liability for any loss or damage
          arising from your use of the Site, including but not limited to:
        </p>
        <ul>
          <li>Direct, indirect, incidental, or consequential losses</li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>Errors, omissions, or inaccuracies in content</li>
          <li>Unavailability or interruption of the Site</li>
          <li>Reliance on any tax rate, threshold, or deadline stated on the Site without independent verification</li>
        </ul>
        <p>
          Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence,
          fraud, or any other liability that cannot be excluded by law.
        </p>

        <h2>8. Disclaimer of warranties</h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties,
          express or implied, regarding the Site&apos;s operation, content, or suitability for any purpose. This
          includes implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>

        <h2>9. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless {siteConfig.legalName}, its directors, employees, and agents from
          any claims, losses, damages, liabilities, and expenses (including legal fees) arising from your use of the
          Site or breach of these terms.
        </p>

        <h2>10. Governing law and jurisdiction</h2>
        <p>
          These terms are governed by the laws of England and Wales. Any disputes arising from these terms or your use
          of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2>11. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The &quot;Last updated&quot; date at the top of this page shows
          when they were last revised. Your continued use of the Site after changes are posted constitutes your
          acceptance of the updated terms.
        </p>

        <h2>12. Severability</h2>
        <p>
          If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall
          continue in full force and effect.
        </p>

        <h2>13. Contact us</h2>
        <p>
          Questions about these terms? Contact us via our{" "}
          <Link href="/contact" className={focusRing}>
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
