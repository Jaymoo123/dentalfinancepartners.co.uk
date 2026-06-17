import type { Metadata } from "next";
import { contentNarrow, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Contractor Tax Accountants collects, uses and protects your personal data when you enquire, including analytics, data retention and your UK GDPR rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white">
      <div className={`${contentNarrow} ${sectionYLoose}`}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy policy</h1>
        <div className="prose-blog mt-10">
          <p>This privacy policy explains how {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects your personal information when you use this website or contact us.</p>
          <h2>What we collect</h2>
          <p>When you complete our contact form, we collect your name, email address, phone number, and any message you include. We also collect your IP address and basic browser information automatically via our analytics.</p>
          <h2>How we use it</h2>
          <p>We use the information you provide to respond to your enquiry. We do not share your personal information with third parties for marketing purposes.</p>
          <h2>Analytics</h2>
          <p>We use Google Analytics to understand how visitors use our site. This collects anonymised data including pages visited and time on site. You can opt out via your browser settings or the Google Analytics opt-out add-on.</p>
          <h2>Data retention</h2>
          <p>We retain enquiry data for up to 12 months. If you become a client, we retain your information for the duration of the engagement and for six years thereafter in line with HMRC record-keeping requirements.</p>
          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to access, correct or delete the personal information we hold about you. Contact us at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> to exercise these rights.</p>
          <h2>Contact</h2>
          <p>{siteConfig.legalName}, {siteConfig.contact.email}</p>
        </div>
      </div>
    </section>
  );
}
