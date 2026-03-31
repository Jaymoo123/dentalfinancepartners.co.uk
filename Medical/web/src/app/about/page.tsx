import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why we focus exclusively on UK medical professionals — specialist accounting for GPs, consultants and practices, not generic SME advice.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About us",
    description:
      "Why we focus exclusively on UK medical professionals — specialist accounting for GPs, consultants and practices, not generic SME advice.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        About Medical Accountants UK
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We built a specialist accounting practice to serve the unique financial landscape of UK medicine — from NHS pension complexities and locum tax planning to private practice incorporation. We understand that your financial needs are distinct from generic small businesses.
      </p>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">How we work</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        <li>Partner-led advice tailored to GPs, consultants and medical practice owners.</li>
        <li>Proactive, year-round tax planning, not just a year-end compliance rush.</li>
        <li>Clear guidance on NHS pension annual allowance and lifetime allowance issues.</li>
        <li>Structured advice that withstands scrutiny from HMRC, lenders, or practice partners.</li>
      </ul>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Evidence-led content</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        Our{" "}
        <Link href="/blog" className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}>
          blog
        </Link>{" "}
        is written for medical professionals who need UK-specific tax insights — not generic financial tips. Start with{" "}
        <Link
          href="/blog/nhs-pension-annual-allowance-planning"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          NHS pension annual allowance planning
        </Link>{" "}
        or{" "}
        <Link
          href="/blog/locum-doctor-tax-deductions-uk"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          locum doctor tax deductions
        </Link>
        .
      </p>
      <div className="mt-10 sm:mt-12">
        <CTASection
          title="See if we are a fit"
          description="Tell us about your role — GP, consultant, locum or practice owner — and your key financial priorities for the coming year."
        />
      </div>
    </div>
  );
}