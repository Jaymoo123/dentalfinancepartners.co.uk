import type { Metadata } from "next";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { SignupForm } from "@/components/newsletter/SignupForm";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url.replace(/\/$/, "")}/newsletter`;

export const metadata: Metadata = {
  title: "The Director's Brief: weekly UK tax for limited companies, contractors and sole traders",
  description:
    "One short email a week. UK tax, pay, structure and exit for limited company directors, contractors, sole traders and small businesses. Plain text, one idea per issue, unsubscribe one click.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "The Director's Brief",
    description:
      "Weekly UK business tax. Plain text, one CTA per email, unsubscribe one click.",
    url: pageUrl,
  },
};

export default function NewsletterPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 py-8 sm:py-10 lg:py-12">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]}
            />
            <Eyebrow onDark>Newsletter</Eyebrow>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              The Director&rsquo;s Brief
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              One short email a week, Thursday morning, UK time. UK tax, pay,
              structure, and exit for limited company directors, contractors, sole
              traders, partnerships and growing small businesses. Plain text. One
              idea per issue. Unsubscribe one click.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <SignupForm source="newsletter-page" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">What you get</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>
                  <strong>Week one:</strong> a short welcome series covering the
                  salary vs dividend choice, R&amp;D credits, the pillar guides, and
                  the free health check.
                </li>
                <li>
                  <strong>Every Thursday after that:</strong> one tax or finance idea
                  that&rsquo;s relevant to UK business owners this week.
                </li>
                <li>
                  <strong>Never:</strong> retargeting pixels, banner ads, sponsored
                  placements, or sales drips.
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-600">
            <strong>Editorial:</strong> articles linked from the Director&rsquo;s Brief are
            editorial content. For decisions specific to your business,{" "}
            <InlineLink href="/contact">book a call</InlineLink>.
          </p>
        </div>
      </section>
    </>
  );
}
