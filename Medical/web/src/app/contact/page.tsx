import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "Contact Medical Accountants UK | Book Free Consultation",
  description: `Contact ${siteConfig.name} for GP accounting and medical tax enquiries. NHS pension planning, locum tax, private practice advice. 24-hour response.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact Medical Accountants UK",
    description: "Book free consultation for GP accounting and medical tax advice. 24-hour response time.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Medical Accountants UK",
    description: "Book free consultation for GP accounting and medical tax advice. 24-hour response time.",
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
        Whether you're a GP partner navigating NHS pension complexities, a locum doctor managing multiple income streams, or a consultant considering private practice incorporation, we're here to help. Fill in the form below or contact us directly.
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

          <div className="rounded-2xl border border-[var(--medical-teal)]/20 bg-gradient-to-br from-[var(--medical-teal)]/5 to-transparent p-6 sm:p-8">
            <h3 className="font-serif text-base font-semibold text-[var(--ink)] sm:text-lg">What happens next?</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--coral)] text-xs font-bold text-white">1</span>
                <span>We'll review your enquiry and respond within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--coral)] text-xs font-bold text-white">2</span>
                <span>Brief introductory call to understand your medical practice structure and tax situation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--coral)] text-xs font-bold text-white">3</span>
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
            <h3 className="text-sm font-semibold text-[var(--medical-teal-dark)]">NHS Pension Annual Allowance</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Managing unexpected tax charges from NHS pension growth. We help GPs and consultants navigate annual allowance calculations and scheme pays elections.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--medical-teal-dark)]">Locum Tax Returns</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Self Assessment for locum doctors working across multiple practices. Expense claims, payment on account, and quarterly tax planning.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--medical-teal-dark)]">Private Practice Incorporation</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Structuring your private work through a limited company. Corporation tax planning, profit extraction, and ongoing compliance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--medical-teal-dark)]">GP Partnership Accounts</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Partnership tax returns, profit allocation, and financial reporting for GP practices. NHS and private income reconciliation.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
