import type { Metadata } from "next";
import { contentNarrow, sectionY } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
};

export default function CookiePolicyPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Cookie policy</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: 27 March 2026</p>
      <div className="prose-blog mt-8 space-y-4 text-[var(--ink-soft)]">
        <p>
          This policy describes how {siteConfig.name} uses cookies and similar technologies. This site is built to
          minimise unnecessary tracking; adjust this page if you add analytics or marketing pixels.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Essential cookies</h2>
        <p>
          Some cookies may be required for the Site to function securely. These do not require consent under UK
          ePrivacy guidance where strictly necessary.
        </p>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Optional analytics</h2>
        <p>
          If you enable privacy-friendly analytics in future, you should list the provider, purpose, and retention
          here, and obtain consent where required.
        </p>
      </div>
    </div>
  );
}
