import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/newsletter/SignupForm";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url.replace(/\/$/, "")}/newsletter`;

export const metadata: Metadata = {
  title: "The Agency Founder Tax Brief: weekly UK + UAE tax for agency founders",
  description:
    "One short email a week. UK and UAE tax, pay, structure and exit for agency founders. Plain text, one idea per issue, unsubscribe one click.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "The Agency Founder Tax Brief",
    description:
      "Weekly UK and UAE tax for agency founders. Plain text, one CTA per email, unsubscribe one click.",
    url: pageUrl,
  },
};

export default function NewsletterPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Newsletter
      </p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">
        The Agency Founder Tax Brief
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        One short email a week, Thursday morning, UK time. UK and UAE tax, pay,
        structure, and exit for agency founders. Plain text. One idea per issue.
        Unsubscribe one click.
      </p>

      <div className="mt-8">
        <SignupForm source="newsletter-page" />
      </div>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold text-slate-900">What you get</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li>
            <strong>Week one:</strong> a five-email welcome series covering the
            salary–dividend choice, R&amp;D credits, the pillar guides, the Dubai
            move, and the free health check.
          </li>
          <li>
            <strong>Every Thursday after that:</strong> one tax or finance idea
            that&rsquo;s relevant to UK or UAE agency founders this week.
          </li>
          <li>
            <strong>Never:</strong> retargeting pixels, banner ads, sponsored
            placements, or sales drips.
          </li>
        </ul>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-8 text-sm text-slate-600">
        <p>
          <strong>Editorial:</strong> articles linked from the Tax Brief are
          editorial content. For decisions specific to your agency,{" "}
          <Link href="/contact" className="text-indigo-600 underline">
            book a call
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
