import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why we focus on UK medical professionals — specialist accounting for GPs, consultants, and practice owners without generic SME advice.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About us",
    description:
      "Why we focus on UK medical professionals — specialist accounting for GPs, consultants, and practice owners without generic SME advice.",
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
        We built our practice specifically for UK medical professionals — GPs, consultants, locums, and practice owners who need more than generic small business advice. From NHS pension annual allowances to private practice incorporation, we understand the unique challenges facing doctors today.
      </p>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">How we work</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        <li>Clear, medical-focused advice without SME boilerplate.</li>
        <li>Proactive planning for NHS pensions, locum structures, and private practice growth.</li>
        <li>Year-round support, not just Self Assessment season.</li>
        <li>Tax strategies that work with medical career progression and changing roles.</li>
      </ul>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Evidence-led content</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        Our{" "}
        <Link href="/blog" className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}>
          blog
        </Link>{" "}
        is written for medical professionals who need UK-specific guidance — not generic tax tips. Start with{" "}
        <Link
          href="/blog/nhs-pension-annual-allowance-doctors-guide"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          NHS pension planning
        </Link>{" "}
        or{" "}
        <Link
          href="/blog/locum-doctor-tax-guide-self-employment"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          locum tax essentials
        </Link>
        .
      </p>
      <div className="mt-10 sm:mt-12">
        <CTASection
          title="See if we are a fit"
          description="Tell us about your medical role — GP, consultant, or locum — and what financial challenges you want to solve."
        />
      </div>
    </div>
  );
}