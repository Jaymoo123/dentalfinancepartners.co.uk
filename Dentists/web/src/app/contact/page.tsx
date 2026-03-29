import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — enquiries for UK dental practice accounting and tax support.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact",
    description: `Contact ${siteConfig.name} — enquiries for UK dental practice accounting and tax support.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Contact</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        New enquiries by form, phone, or email. We aim to reply within one working day.
      </p>
      <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_1.5fr] lg:gap-10 xl:gap-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">Direct details</h2>
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
          </dl>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
          <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
        </div>
      </div>
    </div>
  );
}
