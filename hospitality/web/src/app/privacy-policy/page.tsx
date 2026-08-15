import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

const company = siteConfig.company;

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${company.legalName} (trading as ${siteConfig.name}) collects and uses personal data on this website. UK GDPR and Data Protection Act 2018 compliant.`,
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `How ${company.legalName} (trading as ${siteConfig.name}) collects and uses personal data on this website. UK GDPR compliant.`,
    url: `${siteConfig.url}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy policy",
    description: `How ${company.legalName} (trading as ${siteConfig.name}) collects and uses personal data. UK GDPR compliant.`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-neutral-500">Last updated: 15 July 2026</p>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
        <p>
          This policy explains how {company.legalName} (trading as {siteConfig.name}), referred to here as
          &quot;we&quot;, &quot;us&quot; and &quot;our&quot;, collects, uses and protects your personal information
          when you use the {siteConfig.name} website (the &quot;Site&quot;). We are committed to protecting your
          privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection
          Act 2018.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">1. Who we are (data controller)</h2>
        <p>
          The data controller responsible for your personal data is {company.legalName}, which trades as{" "}
          {siteConfig.name}:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Registered company name:</strong> {company.legalName}</li>
          <li><strong>Trading name:</strong> {siteConfig.name}</li>
          <li><strong>Company number:</strong> {company.number} (registered in {company.placeOfRegistration})</li>
          <li><strong>Registered office:</strong> {company.registeredOfficeLine}</li>
        </ul>
        <p>
          If you have any questions about this policy or wish to exercise your rights, please contact us through our{" "}
          <Link href="/contact" className="text-[#b0532f] underline hover:text-[#8f421f]">contact page</Link>.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">2. What information we collect</h2>
        <p>We collect the following personal information through the Site:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Enquiry forms:</strong> when you submit an enquiry, we collect your name, email address,
            phone number, the type of hospitality business you operate, your message, and the page you submitted from.
          </li>
          <li>
            <strong>Email sign-ups:</strong> if you subscribe to our updates or download a guide, we collect your
            email address (and, where relevant, the resource you requested).
          </li>
          <li>
            <strong>Acknowledgement and consent records:</strong> we keep a record of the exact wording shown to you
            and the date and time, so we can show what you were told when you submitted an enquiry, and that consent
            was given when you signed up to our email updates.
          </li>
          <li>
            <strong>Analytics and technical data:</strong> information about how you use the Site (such as pages
            viewed, device and browser type, and an approximate country derived from your IP address). Our hosting
            provider may also log technical request data for security and performance. See our{" "}
            <Link href="/cookie-policy" className="text-[#b0532f] underline hover:text-[#8f421f]">cookie policy</Link>{" "}
            for detail.
          </li>
        </ul>
        <p>
          Providing this information is voluntary. You are not under a statutory or contractual obligation to provide
          it, but if you do not, we will not be able to respond to your enquiry or send you the updates or resources
          you have asked for.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">3. Why we use your information</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>To respond to your enquiry:</strong> to deal with your enquiry and to share it with a
            relevant regulated firm from our specialist partner network, so that they can respond and, if you
            want it, provide the advice you have requested.
          </li>
          <li>
            <strong>To send you updates you asked for:</strong> if you signed up to our email updates, to send you
            general hospitality accounting information until you unsubscribe.
          </li>
          <li>
            <strong>To improve and protect the Site:</strong> to understand how the Site is used and to keep it
            secure and working properly.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-900">4. Our lawful basis</h2>
        <p>
          When you submit an enquiry, we rely on our <strong>legitimate interests</strong> (Article 6(1)(f)
          of the UK GDPR) to handle it and to share it with regulated firms from our specialist partner
          network, so that they can respond and provide the advice you asked for. You have the{" "}
          <strong>right to object</strong> to this processing at any time, under Article 21 (see your rights
          in section 7).
        </p>
        <p>
          For our <strong>email sign-ups</strong>, we rely on your <strong>consent</strong>. You can
          withdraw your consent at any time (see your rights in section 7); withdrawing consent does not
          affect any processing that took place before you withdrew it.
        </p>
        <p>
          For website analytics, site improvement and security, we rely on our{" "}
          <strong>legitimate interests</strong>, specifically measuring and improving the Site and keeping it secure
          and protected against misuse. You can opt out at any time using the &quot;Do not track me&quot; link in
          the footer of every page.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">5. Who we share your information with</h2>
        <p>
          When you submit an enquiry, we share information about you and your enquiry with regulated firms
          from our <strong>specialist partner network</strong>, so that they can contact you and provide the
          advice you asked for. What we share is: your name, telephone number and email address; your
          enquiry message; the type of work it describes, the grade we give it under our published grading
          rubric and a one-line summary of what you are asking for; the role and any description of it you
          gave; your practice or company name if you gave one; the rough area you are in; whether we were
          able to confirm your contact details and when; and the website, page and form your enquiry came
          from, together with the notice you were shown. We do this on the basis of our{" "}
          <strong>legitimate interests</strong> (see section 4), and you can object at any time (see
          section 7). Each receiving firm acts as an <strong>independent data controller</strong> of the
          information it receives, and uses it under its own privacy policy. We share this information only
          for the purpose of arranging and providing the advice you asked for.
        </p>
        <p>
          <strong>More than one firm may receive your enquiry.</strong> We work with a network of specialist
          firms rather than a single firm, and we do not name the individual firms on this website. Firms
          are first shown a short summary of your enquiry with your name and contact details removed, and
          only a firm that decides it can help receives your details in full. Up to <strong>three</strong>
          firms in the profession your enquiry concerns may take it up that way. Separately, up to{" "}
          <strong>three</strong> firms in related professions, such as mortgage and finance brokers,
          independent financial advisers, solicitors and specialist consultants, may also take it up,
          because they answer a different part of the same question and do not compete for the same work.
          So at most six firms may receive your details, and often fewer. Whichever firms contact you will
          each tell you who they are and give you their own privacy information at that point.
        </p>
        <p>
          <strong>If no firm takes up your enquiry.</strong> If no firm in the profession your enquiry
          concerns takes it up within 48 hours, we may offer it instead to firms in the related professions
          above, so that you still get an answer rather than none. If we cannot confirm your contact details
          and you do not reply to our follow-up messages, your enquiry may be passed after seven days to a
          single firm as part of a batch, for the same purpose. We will not pass your enquiry on at all if
          you have objected or asked us to stop, and you can ask us to stop at any time (see section 7).
        </p>
        <p>
          <strong>How we are paid.</strong> We may be paid a fee by a firm your enquiry is passed to. This
          does not change what you pay that firm, and does not affect the advice they give you.
        </p>
        <p>We also use the following service providers, who process data on our instructions only (as our processors):</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Supabase:</strong> secure database hosting for form submissions (EU-hosted).</li>
          <li><strong>Vercel:</strong> website hosting and content delivery.</li>
          <li><strong>Resend:</strong> sending the emails we use to confirm your details and to respond to you.</li>
          <li><strong>Twilio:</strong> sending the text messages we use to confirm your details.</li>
          <li>
            <strong>Anthropic, through the Vercel AI Gateway:</strong> reading your enquiry to grade the type of
            work it describes and to write the one-line summary we show to firms.
          </li>
          <li><strong>Companies House:</strong> looking up publicly available information where you mention a company.</li>
        </ul>
        <p>
          Some of these providers process data outside the United Kingdom. Where they do, we rely on a valid
          transfer mechanism under the UK GDPR.
        </p>
        <p>We do not sell your personal data, and we do not use it for third-party advertising.</p>

        <h2 className="text-xl font-semibold text-neutral-900">6. How long we keep your information</h2>
        <p>
          We keep enquiry data for <strong>{company.enquiryRetentionMonths} months</strong> from the date of your
          enquiry, after which it is deleted. If you subscribe to our email updates, we keep your email address until
          you unsubscribe. Our records of what you were shown and any consent you gave are kept for as long as we hold
          the related personal data, so that we can demonstrate the lawful basis for using it.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">7. Your rights</h2>
        <p>Under UK data protection law you have the right to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Access</strong> the personal data we hold about you.</li>
          <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
          <li><strong>Erase</strong> your data in certain circumstances.</li>
          <li><strong>Restrict</strong> how we use your data in certain situations.</li>
          <li><strong>Data portability:</strong> receive a copy of your data in a machine-readable format.</li>
          <li>
            <strong>Object</strong> to our processing that is based on legitimate interests, including our
            sharing of your enquiry with firms in our partner network, under Article 21.
          </li>
          <li>
            <strong>Withdraw consent</strong> at any time, where we rely on your consent (for example, our email
            updates).
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us through our{" "}
          <Link href="/contact" className="text-[#b0532f] underline hover:text-[#8f421f]">contact page</Link>. We
          will respond within one month.
        </p>
        <p>
          You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK&apos;s
          data protection regulator, at{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b0532f] underline hover:text-[#8f421f]"
          >
            ico.org.uk/make-a-complaint
          </a>
          . We would, however, welcome the chance to address your concerns first.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">8. Cookies and analytics</h2>
        <p>
          We use cookies and similar technologies for analytics, so we can understand how the Site is used and
          improve it. For full details of what we use and how to manage or opt out, please see our{" "}
          <Link href="/cookie-policy" className="text-[#b0532f] underline hover:text-[#8f421f]">cookie policy</Link>.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">9. How we protect your data and international transfers</h2>
        <p>
          Form submissions are stored securely and access is restricted to authorised staff only. Some of our service
          providers (for example, Vercel) are based outside the UK and EEA. Where data is transferred
          internationally, we rely on appropriate safeguards such as the UK extension to the EU-US Data Privacy
          Framework or Standard Contractual Clauses.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">10. Changes to this policy</h2>
        <p>
          We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this
          page shows when it was last revised. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-xl font-semibold text-neutral-900">11. Contact us</h2>
        <p>
          If you have any questions about this privacy policy or how we handle your data, please contact us through
          our{" "}
          <Link href="/contact" className="text-[#b0532f] underline hover:text-[#8f421f]">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
