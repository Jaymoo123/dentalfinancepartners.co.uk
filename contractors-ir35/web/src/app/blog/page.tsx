import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "IR35 and Contractor Tax Blog | Guides and Articles",
  description:
    "Practical IR35 and contractor tax guides. Off-payroll rules, limited company tax, expenses, dividends, pension planning and more. Written by specialist contractor accountants.",
};

const categories = [
  "IR35 Status",
  "Limited Company Tax",
  "Umbrella vs Limited Company",
  "Expenses and Deductions",
  "Pension and Dividends",
  "MTD and Compliance",
  "Contractor Accounting Basics",
];

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-teal-400">Contractor guides</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            IR35 and contractor tax, explained.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Practical guides on IR35 status, off-payroll rules, limited company tax, expenses, dividends and pension planning. Written by specialist contractor accountants.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-[#fafaf7] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="text-sm font-medium text-neutral-500 mb-4">Browse by topic</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="border border-neutral-200 bg-[#fafaf7] p-8 sm:p-12 text-center">
            <p className="eyebrow">Coming soon</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Articles are being published.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-neutral-600">
              We are building out our IR35 and contractor tax guide library. In the meantime, if you have a specific question about IR35 status, limited company tax, or contractor expenses, book a free call and we will talk it through with you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={btnPrimary}>
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-semibold tracking-tight">Not sure where to start?</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            The most common question we get is some version of: &ldquo;Am I inside or outside IR35, and does it matter?&rdquo; The answer depends on your contract, your working practices, and your end client&rsquo;s size. We can help you work through it.
          </p>
          <p className="mt-6 text-sm text-neutral-500">
            Email:{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={`text-teal-700 underline underline-offset-2 hover:text-teal-800 ${focusRing}`}
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
