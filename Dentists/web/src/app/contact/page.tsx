import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
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
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: `Contact ${siteConfig.name} — enquiries for UK dental practice accounting and tax support.`,
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
        New enquiries go through the form below. Fill it in and we will be in touch within one working day.
      </p>
      <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_1.5fr] lg:gap-10 xl:gap-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">How to reach us</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Send us a few details using the form and a dental accountant will reply within one working day, by email or with a call at a time that suits you.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Registered office: {siteConfig.company.registeredOfficeLine}.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
          <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
        </div>
      </div>
    </div>
  );
}
