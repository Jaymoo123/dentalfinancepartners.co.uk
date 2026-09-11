import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import {
  contentNarrow,
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/** Body link: navy primary-700 (11.13 on the --background ground, 11.64 on white).
 *  The gold accent token measures 3.76 as text and is barred from light grounds. */
const aboutLink = `text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing} rounded`;

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why we focus on UK dental practices, associates, and owners. Specialist accounting without generic SME boilerplate.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About us",
    description:
      "Why we focus on UK dental practices, associates, and owners. Specialist accounting without generic SME boilerplate.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About us",
    description:
      "Why we focus on UK dental practices, associates, and owners. Specialist accounting without generic SME boilerplate.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero. Gold eyebrow on navy is 6.23 and is the sanctioned on-dark accent;
          the same word set on a light ground would be 2.75 and is never written. */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Who we are</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              About {siteConfig.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              We set out to build an accounting practice that could keep pace with UK dentistry (mixed payment
              models, changing associate relationships, and serious capital decisions) without treating your
              practice like a generic small business.
            </p>
          </div>
        </div>
      </section>

      <div className={`${contentNarrow} ${sectionY}`}>
        <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">How we work</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--ink-soft)]">
          <li>Plain language, partner-led advice you can act on.</li>
          <li>Monthly discipline where it matters, not just a rush every January.</li>
          <li>Tax and governance that stands up when HMRC, funders, or buyers ask questions.</li>
        </ul>

        <h2 className="mt-12 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Evidence-led content</h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
          Our{" "}
          <Link href="/blog" className={aboutLink}>
            blog
          </Link>{" "}
          is written for dentists and practice managers who need UK context, not recycled US tax tips. Start with{" "}
          <Link href="/blog/practice-accounting/nhs-private-mix-dental-accounts" className={aboutLink}>
            NHS/private reporting
          </Link>{" "}
          or{" "}
          <Link href="/blog/associate-tax/associate-dentist-tax-self-assessment-uk" className={aboutLink}>
            associate Self Assessment
          </Link>
          .
        </p>

        <div className="mt-12">
          <CTASection
            title="See if we are a fit"
            description="Tell us about your role (associate, owner, or group) and what you want to fix in the next 12 months."
          />
        </div>
      </div>
    </>
  );
}
