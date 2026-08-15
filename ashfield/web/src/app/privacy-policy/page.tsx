import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const company = siteConfig.company;
const container = "mx-auto max-w-3xl px-4 py-16 sm:py-24";
const link = "text-blue-900 underline underline-offset-2 hover:text-blue-950";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${company.legalName} collects and uses personal data on this website. UK GDPR and Data Protection Act 2018 compliant.`,
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `How ${company.legalName} collects and uses personal data on this website. UK GDPR compliant.`,
    url: `${siteConfig.url}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white">
      <div className={container}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy policy</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: 23 July 2026</p>
        <div className="prose-blog mt-10 space-y-6">
          <p>
            This policy explains how {company.legalName}, referred to here as &quot;we&quot;, &quot;us&quot; and
            &quot;our&quot;, collects, uses and protects your personal information when you use the {siteConfig.name}{" "}
            website (the &quot;Site&quot;). We are committed to protecting your privacy and complying with the UK
            General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <h2>1. Who we are (data controller)</h2>
          <p>The data controller responsible for your personal data is {company.legalName}:</p>
          <ul>
            <li><strong>Registered company name:</strong> {company.legalName}</li>
            <li><strong>Company number:</strong> {company.number} (registered in {company.placeOfRegistration})</li>
            <li><strong>Registered office:</strong> {company.registeredOfficeLine}</li>
          </ul>
          <p>
            If you have any questions about this policy or wish to exercise your rights, please contact us through our{" "}
            <Link href="/contact" className={link}>contact page</Link>.
          </p>

          <h2>2. What information we collect</h2>
          <p>We collect the following personal information through the Site:</p>
          <ul>
            <li>
              <strong>Enquiry forms:</strong> when you submit an enquiry, we collect your name, email address, phone
              number, the type of organisation you represent, your message, and the page you submitted from.
            </li>
            <li>
              <strong>Email sign-ups:</strong> if you subscribe to our updates or download a resource, we collect your
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
              <Link href="/cookie-policy" className={link}>cookie policy</Link> for detail.
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
              <strong>To respond to your enquiry:</strong> to deal with your enquiry and provide the information you
              have requested.
            </li>
            <li>
              <strong>To send you updates you asked for:</strong> if you signed up to our email updates, to send you
              relevant information until you unsubscribe.
            </li>
            <li>
              <strong>To improve and protect the Site:</strong> to understand how the Site is used and to keep it
              secure and working properly.
            </li>
          </ul>

          <h2>4. Our lawful basis</h2>
          <p>
            We rely on your <strong>consent</strong> (Article 6(1)(a) of the UK GDPR) to process the personal data you
            provide through our enquiry forms and email sign-ups. You can withdraw your consent at any time (see your
            rights in section 7); withdrawing consent does not affect any processing that took place before you
            withdrew it.
          </p>
          <p>
            For website analytics, site improvement and security, we rely on our <strong>legitimate interests</strong>
            (Article 6(1)(f) of the UK GDPR), specifically measuring and improving the Site and keeping it secure and
            protected against misuse. You have the <strong>right to object</strong> to processing based on legitimate
            interests at any time, under Article 21 (see your rights in section 7).
          </p>

          <h2>5. Who we share your information with</h2>
          <p>
            Your enquiry is handled by us; we do <strong>not</strong> share it with any third-party advisory firm. We
            use the service providers listed below only as our processors, acting on our instructions.
          </p>
          <ul>
            <li><strong>Supabase:</strong> secure database hosting for form submissions (EU-hosted).</li>
            <li><strong>Vercel:</strong> website hosting and content delivery.</li>
            <li><strong>Resend:</strong> sending the emails we use to respond to you.</li>
          </ul>
          <p>We do not sell your personal data, and we do not use it for third-party advertising.</p>

          <h2>6. How long we keep your information</h2>
          <p>
            We keep enquiry data for <strong>{company.enquiryRetentionMonths} months</strong> from the date of your
            enquiry, after which it is deleted. If you subscribe to our email updates, we keep your email address until
            you unsubscribe. Consent records are kept for as long as we hold the related personal data, so that we can
            demonstrate that consent was given.
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
            <Link href="/contact" className={link}>contact page</Link>. We will respond within one month.
          </p>
          <p>
            You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK&apos;s data
            protection regulator, at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className={link}>
              ico.org.uk/make-a-complaint
            </a>
            . We would, however, welcome the chance to address your concerns first.
          </p>

          <h2>8. Cookies and analytics</h2>
          <p>
            We use cookies and similar technologies for analytics, so we can understand how the Site is used and
            improve it. For full details of what we use and how to manage or opt out, please see our{" "}
            <Link href="/cookie-policy" className={link}>cookie policy</Link>.
          </p>

          <h2>9. How we protect your data and international transfers</h2>
          <p>
            Form submissions are stored securely and access is restricted to authorised staff only. Some of our service
            providers (for example, Vercel) are based outside the UK and EEA. Where data is transferred internationally,
            we rely on appropriate safeguards such as the UK extension to the EU-US Data Privacy Framework or Standard
            Contractual Clauses.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this
            page shows when it was last revised. We encourage you to review this policy periodically.
          </p>

          <h2>11. Contact us</h2>
          <p>
            If you have any questions about this privacy policy or how we handle your data, please contact us through
            our <Link href="/contact" className={link}>contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
