import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Contact ${siteConfig.name}` },
  description:
    "Ask a question, report an error, or request a call from one of our divorce finance specialists about your situation. We reply within one working day.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">Get in touch</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Whether you have a question about something on the site, want to point out an error,
            or would like to speak to one of our divorce finance specialists, we would like to hear from you. Divorce
            runs on its own timetable, and there is no urgency on our side. Take whatever time you
            need.
          </p>
        </div>
      </section>

      <section className="bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold tracking-tight">What happens next</h2>
              <ul className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
                <li>We read every message and reply within one working day.</li>
                <li>
                  If you have asked to speak to a specialist, one of our divorce finance specialists
                  will call you within one working day. Where you need a
                  solicitor or mediator, we work alongside regulated family law firms and accredited
                  mediators and stay on the money side.
                </li>
                <li>
                  We cannot answer questions about your personal legal position by email. A call
                  with one of our divorce finance specialists covers the money side: settlements,
                  pensions and tax.
                </li>
                <li>
                  If there is any risk to your safety, or money is being hidden or controlled, tell
                  the specialist as early as you can. It changes what they can do for you. If you
                  are in immediate danger, call 999.
                </li>
              </ul>

              <div className="mt-12 border-t border-neutral-200 pt-8">
                <p className="text-sm font-medium text-neutral-900">Prefer to read up first?</p>
                <p className="mt-2 text-sm text-neutral-600">
                  Try our{" "}
                  <Link href="/calculators" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">
                    free calculators
                  </Link>{" "}
                  or browse the{" "}
                  <Link href="/blog" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">
                    guides
                  </Link>
                  .
                </p>
                <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                  By submitting the form you agree to us using your details to respond to your enquiry. {siteConfig.leadConsentText} See our privacy policy for full details.
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
