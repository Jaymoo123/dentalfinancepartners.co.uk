import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why we focus on UK dental practices, associates, and owners — specialist accounting without generic SME boilerplate.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About us",
    description:
      "Why we focus on UK dental practices, associates, and owners — specialist accounting without generic SME boilerplate.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About us",
    description:
      "Why we focus on UK dental practices, associates, and owners — specialist accounting without generic SME boilerplate.",
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
        About {siteConfig.name}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We set out to build an accounting practice that could keep pace with UK dentistry — mixed payment models,
        changing associate relationships, and serious capital decisions — without treating your practice like a generic
        small business.
      </p>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">How we work</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        <li>Plain language, partner-led advice you can act on.</li>
        <li>Monthly discipline where it matters — not just a rush every January.</li>
        <li>Tax and governance that stands up when HMRC, funders, or buyers ask questions.</li>
      </ul>
      <h2 className="mt-10 font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Evidence-led content</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
        Our{" "}
        <Link href="/blog" className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}>
          blog
        </Link>{" "}
        is written for dentists and practice managers who need UK context — not recycled US tax tips. Start with{" "}
        <Link
          href="/blog/practice-accounting/nhs-private-mix-dental-accounts"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          NHS/private reporting
        </Link>{" "}
        or{" "}
        <Link
          href="/blog/associate-tax/associate-dentist-tax-self-assessment-uk"
          className={`text-[var(--accent-strong)] underline ${focusRing} rounded`}
        >
          associate Self Assessment
        </Link>
        .
      </p>
      <div className="mt-10 sm:mt-12">
        <CTASection
          title="See if we are a fit"
          description="Tell us about your role — associate, owner, or group — and what you want to fix in the next 12 months."
        />
      </div>
    </div>
  );
}
