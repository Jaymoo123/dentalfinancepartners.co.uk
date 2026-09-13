import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
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
  { id: "about-us", label: "1. About us" },
  { id: "no-advice", label: "2. No advice provided on the Site" },
  { id: "accuracy", label: "3. Accuracy and changes" },
  { id: "acceptable-use", label: "4. Acceptable use" },
  { id: "intellectual-property", label: "5. Intellectual property" },
  { id: "third-party-links", label: "6. Third-party links" },
  { id: "limitation-of-liability", label: "7. Limitation of liability" },
  { id: "disclaimer-of-warranties", label: "8. Disclaimer of warranties" },
  { id: "indemnity", label: "9. Indemnity" },
  { id: "governing-law", label: "10. Governing law and jurisdiction" },
  { id: "changes", label: "11. Changes to these terms" },
  { id: "severability", label: "12. Severability" },
  { id: "contact-us", label: "13. Contact us" },
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

export default function TermsPage() {
  return (
    <>
      {/* The last-updated date is hero fine print rather than a line stranded
          above the body. The date itself is untouched: a restyle is not a change
          to the document, so re-dating it would be a false claim. */}
      <SlimHero eyebrow="Legal" title="Terms of use">
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
            These terms of use govern your access to and use of the {siteConfig.name} website (the &quot;Site&quot;). By accessing or using the Site, you agree to be bound by these terms. If you do not agree, please do not use the Site.
          </p>

          <h2 id="about-us">1. About us</h2>
          <p>
            The Site is operated by {siteConfig.company.legalName} (trading as {siteConfig.name}), a company registered in{" "}
            {siteConfig.company.placeOfRegistration} under company number {siteConfig.company.number}, with its registered
            office at {siteConfig.company.registeredOfficeLine}. You can contact us via our{" "}
            <Link href="/contact" className="text-cyan-800 underline underline-offset-2 hover:text-cyan-900">
              contact page
            </Link>
            .
          </p>

          <h2 id="no-advice">2. No advice provided on the Site</h2>
          <p>
            Content on this Site is for general information purposes only. It does <strong>not</strong> constitute accounting, tax, financial, or legal advice. You should not rely on any content on the Site as a substitute for professional advice tailored to your specific circumstances.
          </p>
          <p>
            Formal engagements for professional services are subject to separate written engagement letters and terms of business. No accountant-client relationship is created by your use of this Site or submission of an enquiry form.
          </p>

          <h2 id="accuracy">3. Accuracy and changes</h2>
          <p>
            While we aim to keep information on the Site accurate and up to date, tax and accounting rules change frequently. We make no representations or warranties regarding the accuracy, completeness, or currency of any content.
          </p>
          <p>
            We reserve the right to update, modify, or remove content at any time without notice. It is your responsibility to check for updates if you are relying on information from the Site.
          </p>

          <h2 id="acceptable-use">4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorised access to any part of the Site, server, or database</li>
            <li>Use automated systems (bots, scrapers) to access the Site without our prior written consent</li>
            <li>Transmit any harmful code, viruses, or malicious software</li>
            <li>Interfere with or disrupt the Site or servers</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
          </ul>

          <h2 id="intellectual-property">5. Intellectual property</h2>
          <p>
            All content on the Site, including text, graphics, logos, and software, is the property of {siteConfig.company.legalName} or its licensors and is protected by UK and international copyright laws.
          </p>
          <p>
            You may view and print pages from the Site for your personal, non-commercial use, provided you do not modify any content and you retain all copyright and proprietary notices. Any other use requires our prior written permission.
          </p>

          <h2 id="third-party-links">6. Third-party links</h2>
          <p>
            The Site may contain links to third-party websites. We do not control or endorse these websites and are not responsible for their content, privacy practices, or terms of use. You access third-party websites at your own risk.
          </p>

          <h2 id="limitation-of-liability">7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.company.legalName} excludes all liability for any loss or damage arising from your use of the Site, including but not limited to:
          </p>
          <ul>
            <li>Direct, indirect, incidental, or consequential losses</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Errors, omissions, or inaccuracies in content</li>
            <li>Unavailability or interruption of the Site</li>
          </ul>
          <p>
            Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
          </p>

          <h2 id="disclaimer-of-warranties">8. Disclaimer of warranties</h2>
          <p>
            The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, express or implied, regarding the Site&apos;s operation, content, or suitability for any purpose. This includes implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2 id="indemnity">9. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless {siteConfig.company.legalName}, its directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from your use of the Site or breach of these terms.
          </p>

          <h2 id="governing-law">10. Governing law and jurisdiction</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes arising from these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2 id="changes">11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The &quot;Last updated&quot; date at the top of this page shows when they were last revised. Your continued use of the Site after changes are posted constitutes your acceptance of the updated terms.
          </p>

          <h2 id="severability">12. Severability</h2>
          <p>
            If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>

          <h2 id="contact-us">13. Contact us</h2>
          <p>
            Questions about these terms? Contact us via our{" "}
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
