import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about tronc, tips, VAT, payroll and hospitality accounts. We reply within 24 hours.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

// WhatToExpectCard (packages/web-shared/design/marketing/WhatToExpectCard.tsx) DECLINED here:
// this page publishes no items list today (niche.config.json has no matching array), and
// locked rule 17 requires items to be fed from the page's own existing copy. Feeding it the
// homepage's four rows or the kit DEFAULT_ITEMS would both author copy this page does not
// carry. See W6 receipt.
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        siteUrl={siteConfig.url}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Contact us</h1>
      <p className="mt-4 text-slate-600">
        Tell us about your hospitality business. We reply within 24 hours.
      </p>
      <div className="mt-10">
        <LeadForm />
      </div>
    </div>
  );
}
