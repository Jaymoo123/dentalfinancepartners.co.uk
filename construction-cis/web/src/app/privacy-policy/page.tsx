import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

const company = siteConfig.company;
const partner = siteConfig.partner;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.legalName} (trading as ${siteConfig.name}) collects and uses personal data on this website. UK GDPR and Data Protection Act 2018 compliant.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white">
      <div className={`${contentNarrow} ${sectionYLoose}`}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy policy</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: 18 June 2026</p>
        <div className="prose-blog mt-10 space-y-6">
          <p>
            This policy explains how {company.legalName} (trading as {siteConfig.name}), referred to here as
            &quot;we&quot;, &quot;us&quot; and &quot;our&quot;, collects, uses and protects your personal information
            when you use the {siteConfig.name} website (the &quot;Site&quot;). We are committed to protecting your
            privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection
            Act 2018.
          </p>

          <h2>1. Who we are (data controller)</h2>
          <p>
            The data controller responsible for your personal data is {company.legalName}, which trades as{" "}
            {siteConfig.name}:
          </p>
          <ul>
            <li><strong>Registered company name:</strong> {company.legalName}</li>
            <li><strong>Trading name:</strong> {siteConfig.name}</li>
            <li><strong>Company number:</strong> {company.number} (registered in {company.placeOfRegistration})</li>
            <li><strong>Registered office:</strong> {company.registeredOfficeLine}</li>
          </ul>
          <p>
            If you have any questions about this policy or wish to exercise your rights, please contact us through our{" "}
            <Link href="/contact" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">contact page</Link>.
          </p>

          <h2>2. What information we collect</h2>
          <p>We collect the following personal information through the Site:</p>
          <ul>
            <li>
              <strong>Enquiry forms:</strong> when you submit an enquiry (including through the form that may appear if
              you are about to leave a page), we collect your name, email address, phone number, the type of
              construction worker or business you are, your message, and the page you submitted from.
            </li>
            <li>
              <strong>Email sign-ups:</strong> if you subscribe to our updates or download a guide, we collect your
              email address (and, where relevant, the resource you requested).
            </li>
            <li>
              <strong>Consent records:</strong> when you give consent, we keep a record of the exact wording you agreed
              to and the date and time you agreed, so we can show that consent was given.
            </li>
            <li>
              <strong>Analytics and technical data:</strong> information about how you use the Site (such as pages
              viewed, device and browser type, and an approximate country derived from your IP address). Our hosting
              provider may also log technical request data for security and performance. See our{" "}
              <Link href="/cookie-policy" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">cookie policy</Link> for detail.
            </li>
          </ul>
          <p>
            Providing this information is voluntary. You are not under a statutory or contractual obligation to provide
            it, but if you do not, we will not be able to respond to your enquiry or send you the updates or resources
            you have asked for.
          </p>

          <h2>3. Why we use your information</h2>
          <ul>
            <li>
              <strong>To respond to your enquiry:</strong>{" "}
              {partner
                ? `to deal with your enquiry and to pass it to ${partner.name} so that they can provide the advice you have requested.`
                : "to deal with your enquiry and provide the advice you have requested."}
            </li>
            <li>
              <strong>To send you updates you asked for:</strong> if you signed up to our email updates, to send you
              general construction tax and CIS information until you unsubscribe.
            </li>
            <li>
              <strong>To improve and protect the Site:</strong> to understand how the Site is used and to keep it
              secure and working properly.
            </li>
          </ul>

          <h2>4. Our lawful basis</h2>
          <p>
            We rely on your <strong>consent</strong> to process the personal data you provide through our enquiry forms
            and email sign-ups{partner ? ", and to share your enquiry with our specialist partner firm as described below" : ""}. You can
            withdraw your consent at any time (see your rights in section 7); withdrawing consent does not affect any
            processing that took place before you withdrew it.
          </p>
          <p>
            For website analytics, site improvement and security, we rely on our <strong>legitimate interests</strong>,
            specifically measuring and improving the Site and keeping it secure and protected against misuse.
          </p>

          <h2>5. Who we share your information with</h2>
          {partner ? (
            <p>
              When you submit an enquiry, we share the details you provide with our specialist partner firm,{" "}
              <strong>{partner.name}</strong>, so that they can respond and provide the advice you asked for. {partner.name}{" "}
              acts as an <strong>independent data controller</strong> of the information it receives, and its own use of your
              data is governed by its own privacy policy. We share your enquiry only for the purpose of responding to it.
            </p>
          ) : (
            <p>
              Your enquiry is handled by us; we do <strong>not</strong> share it with any third-party advisory firm. We use
              the service providers listed below only as our processors, acting on our instructions.
            </p>
          )}
          <p>We also use the following service providers, who process data on our instructions only (as our processors):</p>
          <ul>
            <li><strong>Supabase:</strong> secure database hosting for form submissions (EU-hosted).</li>
            <li><strong>Google Analytics:</strong> website analytics and performance measurement.</li>
            <li><strong>Vercel:</strong> website hosting and content delivery.</li>
          </ul>
          <p>We do not sell your personal data, and we do not use it for third-party advertising.</p>

          <h2>6. How long we keep your information</h2>
          <p>
            We keep enquiry data for <strong>{company.enquiryRetentionMonths} months</strong> from the date of your
            enquiry, after which it is deleted. If you subscribe to our email updates, we keep your email address
            until you unsubscribe. Consent records are kept for as long as we hold the related personal data, so that
            we can demonstrate that consent was given.
          </p>

          <h2>7. Your rights</h2>
          <p>Under UK data protection law you have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal data we hold about you.</li>
            <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
            <li><strong>Erase</strong> your data in certain circumstances.</li>
            <li><strong>Restrict</strong> how we use your data in certain situations.</li>
            <li><strong>Data portability:</strong> receive a copy of your data in a machine-readable format.</li>
            <li><strong>Object</strong> to certain processing.</li>
            <li><strong>Withdraw consent</strong> at any time, where we rely on your consent.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us through our{" "}
            <Link href="/contact" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">contact page</Link>.
            We will respond within one month.
          </p>
          <p>
            You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK&apos;s
            data protection regulator, at{" "}
            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 underline underline-offset-2 hover:text-orange-800"
            >
              ico.org.uk/make-a-complaint
            </a>
            . We would, however, welcome the chance to address your concerns first.
          </p>

          <h2>8. Cookies and analytics</h2>
          <p>
            We use cookies and similar technologies for analytics, so we can understand how the Site is used and
            improve it. For full details of what we use and how to manage or opt out, please see our{" "}
            <Link href="/cookie-policy" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">cookie policy</Link>.
          </p>

          <h2>9. How we protect your data and international transfers</h2>
          <p>
            Form submissions are stored securely and access is restricted to authorised staff only. Some of our service
            providers (for example, Vercel) are based outside the UK and EEA. Where data is transferred
            internationally, we rely on appropriate safeguards such as the UK extension to the EU-US Data Privacy
            Framework or Standard Contractual Clauses.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this
            page shows when it was last revised. We encourage you to review this policy periodically.
          </p>

          <h2>11. Contact us</h2>
          <p>
            If you have any questions about this privacy policy or how we handle your data, please contact us through
            our{" "}
            <Link href="/contact" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
