import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about startup tax, R&D relief, SEIS/EIS or EMI. We reply within 24 hours.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Contact us</h1>
      <p className="mt-4 text-neutral-600">Tell us about your startup tax situation. We reply within 24 hours.</p>
      <div className="mt-10"><LeadForm /></div>
    </main>
  );
}
