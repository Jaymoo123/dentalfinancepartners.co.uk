import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms of use for the ${siteConfig.name} website.`,
};

export default function TermsPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Terms of use</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: 27 March 2026</p>
      <div className="prose-blog mt-8 space-y-4 text-[var(--ink-soft)]">
        <p>
          These terms govern your use of the {siteConfig.name} website. They are a starter template — have them
          reviewed by your legal adviser before relying on them in production.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">No advice on the Site</h2>
        <p>
          Content on this Site is for general information only. It does not constitute accounting, tax, or legal
          advice. Engagements for professional services are subject to separate engagement letters and terms.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Accuracy</h2>
        <p>
          While we aim to keep information accurate, tax rules change. You should confirm any decision with a
          qualified adviser.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Contact</h2>
        <p>
          Questions about these terms?{" "}
          <Link href="/contact" className="text-[var(--accent-strong)] underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
