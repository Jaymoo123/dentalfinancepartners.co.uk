import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "Contact Accounts for Lawyers | Book Free Consultation",
  description: `Contact ${siteConfig.name} for solicitor accounting and law firm tax enquiries. SRA compliance, partnership tax, LLP conversion advice. 24-hour response.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact Accounts for Lawyers",
    description: "Book free consultation for solicitor accounting and law firm tax advice. 24-hour response time.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const orgSchema = buildOrganizationJsonLd();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Contact us</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Whether you're a sole practitioner managing SRA compliance, a law firm partner navigating LLP conversion, or a COFA ensuring client money rules are met, we're here to help. Fill in the form below or contact us directly.
      </p>
      
      <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_1.5fr] lg:gap-10 xl:gap-12">
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">Get in touch</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-medium text-[var(--ink)]">Email</dt>
                <dd className="mt-2">
                  <a
                    className={`inline-flex min-h-10 items-center text-[var(--accent-strong)] underline ${focusRing} rounded`}
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--ink)]">Phone</dt>
                <dd className="mt-2">
                  <a
                    className={`inline-flex min-h-10 items-center text-[var(--accent-strong)] underline ${focusRing} rounded`}
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--ink)]">Response time</dt>
                <dd className="mt-2 text-[var(--ink-soft)]">
                  Within 24 hours, typically same working day
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent p-6 sm:p-8">
            <h3 className="font-serif text-base font-semibold text-[var(--ink)] sm:text-lg">What happens next?</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">1</span>
                <span>We'll review your enquiry and respond within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">2</span>
                <span>Brief introductory call to understand your practice structure and compliance needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">3</span>
                <span>Clear recommendations with fixed-fee quote if you choose to proceed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Book your free consultation</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Tell us about your situation and we'll arrange a short call to discuss how we can help.
          </p>
          <div className="mt-6">
            <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:mt-16 sm:p-8">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">Common enquiries</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary)]">SRA Accounts Rules Compliance</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Client money handling, trust accounting, 5-week reconciliations, and annual Accountant's Reports. We help solicitors meet SRA requirements and avoid breaches.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary)]">Partnership & LLP Tax</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Partnership tax returns, LLP member allocations, profit extraction strategies, and Basis Period Reform navigation for law firm partners.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary)]">LLP Conversion</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Tax implications of converting from partnership to LLP. Structure analysis, conversion planning, and ongoing compliance for law firms.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary)]">Practice Succession Planning</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Practice valuations, goodwill calculations, partner retirement planning, and practice sale tax implications for legal practices.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
