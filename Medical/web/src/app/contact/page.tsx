import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: { absolute: "Contact Medical Accountants UK | Speak to a Specialist" },
  description: `Send a GP accounting or medical tax enquiry to ${siteConfig.name}. NHS pension, locum tax, GP partnership and private practice enquiries, matched to a regulated firm from our specialist partner network.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact Medical Accountants UK | Speak to a Specialist",
    description:
      "Send your GP accounting or medical tax enquiry. We match it to a regulated firm from our specialist partner network that works with doctors.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Medical Accountants UK | Speak to a Specialist",
    description:
      "Send your GP accounting or medical tax enquiry. We match it to a regulated firm from our specialist partner network that works with doctors.",
  },
};

/* What actually happens after submit, traced to the call site rather than
   written from the old in-house copy: LeadForm renders
   siteConfig.leadConsentText ("a firm from our specialist partner network who
   will contact you"), /thank-you and /complete say the same, and the privacy
   policy caps the network. No turnaround promise, no fee, no named accountant:
   none of the three is ours to state, and the firm's terms are the firm's. */
const NEXT_STEPS = [
  "We read your enquiry and match it to a regulated firm from our specialist partner network that works with doctors.",
  "If that firm cannot help, your details may go to another firm in the network for the same purpose, within the cap set out in our privacy policy.",
  "The firm contacts you by phone or email. Scope, engagement and anything it will cost are agreed with them, not with us.",
];

const COMMON_ENQUIRIES = [
  {
    title: "NHS Pension Annual Allowance",
    body: "Unexpected tax charges from pension growth, pension input amounts, tapering, carry forward and Scheme Pays elections.",
  },
  {
    title: "Locum tax returns",
    body: "Self Assessment for locums working across multiple practices. Expense claims, payments on account, and planning for the bill.",
  },
  {
    title: "Private practice incorporation",
    body: "Structuring private work through a limited company: corporation tax, profit extraction, the pensionable pay effect and ongoing compliance.",
  },
  {
    title: "GP partnership accounts",
    body: "Partnership tax returns, profit allocation and financial reporting for GP practices, including NHS and private income reconciliation.",
  },
];

/* Closing-panel proof points. Mechanisms only: no fee, no turnaround, no client
   count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export default function ContactPage() {
  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[320px] sm:min-h-[380px] ${heroCreamSurface}`}
      >
        <MedicalBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Send your enquiry</h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Whether you are a GP partner facing an annual allowance charge, a locum working across
              several practices, or a consultant weighing up incorporating private work, tell us the
              position in the form. We read it and match it to a regulated firm from our specialist
              partner network that works with doctors, and that firm contacts you.
            </p>
            {isPackagesMode(niche) ? (
              <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                Already know what you need? Our fixed monthly plans start at £29 a month and you can{" "}
                <Link
                  href="/pricing"
                  className={`font-semibold text-primary-700 underline ${focusRing} rounded`}
                  data-cta="contact_pricing_link"
                  data-cta-placement="contact"
                  data-cta-variant={niche.cta.variant}
                >
                  compare plans and sign up online
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* The conversion surface. The form sits in the panel's white card: a bare
          form on a coloured ground is what shipped invisible field labels on 88
          article pages on this site. */}
      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          ground="white"
          eyebrow="Enquiries"
          title="Tell us about your position"
          description="Your role, how your income is structured and what is on your mind. The more concrete it is, the better the match."
          proofPoints={MEDICAL_PROOF_POINTS}
          formTitle="Send an enquiry"
          form={<LeadForm redirectOnSuccess submitLabel="Send enquiry" />}
        />
      </div>

      <section id="what-happens-next" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>After you send it</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">What happens next</h2>
          <ol className="mt-8 grid list-none gap-6 pl-0 sm:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700 ring-1 ring-primary-100">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            How your details are handled, how many firms they can reach and how to opt out are all set
            out in our{" "}
            <Link href="/privacy-policy" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              privacy policy
            </Link>
            . Sending an enquiry does not create a relationship with an accountant on its own, as our{" "}
            <Link href="/terms" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              terms
            </Link>{" "}
            explain.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Typical subjects</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Common enquiries</h2>
          <ul className="mt-8 grid list-none gap-6 pl-0 sm:grid-cols-2">
            {COMMON_ENQUIRIES.map((item) => (
              <li key={item.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            Not sure yet? The{" "}
            <Link href="/calculators" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              calculators
            </Link>{" "}
            and the{" "}
            <Link href="/medical-guides" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              guides
            </Link>{" "}
            are free to read, and{" "}
            <Link href="/about" className={`font-semibold text-primary-700 underline ${focusRing} rounded`}>
              about this site
            </Link>{" "}
            explains how the match works before you send anything.
          </p>
        </div>
      </section>
    </>
  );
}
