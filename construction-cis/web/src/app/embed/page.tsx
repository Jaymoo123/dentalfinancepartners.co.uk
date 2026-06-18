import type { Metadata } from "next";
import Link from "next/link";
import { EmbedSnippet } from "@/components/embed/EmbedSnippet";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: `Embed Our Free CIS Calculators | ${siteConfig.name}`,
  description:
    "Add our free, always-current UK CIS calculators to your own website. CIS refund, take-home pay, gross payment status, and more. One iframe, mobile-friendly, no cost.",
  alternates: { canonical: `${siteConfig.url}/embed` },
  openGraph: {
    title: "Embed Our Free CIS Calculators",
    description:
      "Free, always-current CIS calculators you can add to your own site in one line of HTML.",
    url: `${siteConfig.url}/embed`,
    type: "website",
  },
};

const base = siteConfig.url.replace(/\/$/, "");

const CALCULATORS = allTools();

const embedDomain = base.replace(/^https?:\/\//, "");

const RESIZE_SNIPPET = `<!-- Add once, anywhere on the page. Lets the calculators resize to fit. -->
<script>
window.addEventListener("message", function (e) {
  if (e.data && e.data.type === "cis-embed-height") {
    document
      .querySelectorAll('iframe[src*="${embedDomain}/embed/"]')
      .forEach(function (f) { f.style.height = e.data.height + "px"; });
  }
});
</script>`;

function iframeSnippet(slug: string, name: string, height: number): string {
  return `<iframe
  src="${base}/embed/${slug}"
  title="${name} by ${siteConfig.name}"
  style="width:100%;border:0;"
  height="${height}"
  loading="lazy"
></iframe>`;
}

export default function EmbedGalleryPage() {
  return (
    <>
      <section className="bg-slate-900 py-14 sm:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Embed our calculators" },
            ]}
          />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Add our free CIS calculators to your site
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Free, mobile-friendly and always kept current with UK CIS rules. If you advise or
            write for construction workers and contractors, drop any of these into your own pages
            with a single line of HTML. We keep them up to date; you keep your readers on your
            site.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            Built for construction trade associations, contractor bodies, payroll providers, and
            industry blogs. The only condition is that you leave the small &ldquo;Powered by{" "}
            {siteConfig.name}&rdquo; line in place.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How to embed (2 steps)</h2>
            <ol className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <li>
                <strong>1. Paste the calculator.</strong> Copy the iframe snippet for the
                calculator you want and paste it into your page where you want it to appear.
              </li>
              <li>
                <strong>2. Add the resize script once.</strong> Paste the small script below
                anywhere on the same page. It lets each calculator grow or shrink to fit its
                content, so there is no awkward scrollbar.
              </li>
            </ol>
            <div className="mt-6">
              <EmbedSnippet code={RESIZE_SNIPPET} label="Resize script (add once per page)" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">The calculators</h2>
          {CALCULATORS.length === 0 ? (
            <p className="mt-6 text-slate-600">Calculator tools coming soon.</p>
          ) : (
            <div className="mt-8 space-y-10">
              {CALCULATORS.map((c) => (
                <div key={c.slug} className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{c.name}</h3>
                    <Link
                      href={`/calculators/${c.slug}`}
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Preview the full page &rarr;
                    </Link>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{c.oneLiner}</p>
                  <div className="mt-5">
                    <EmbedSnippet code={iframeSnippet(c.slug, c.name, c.embedHeight)} label="Embed code" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl bg-slate-900 p-8 text-center text-white sm:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Want a calculator built for your audience?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
              If you run a construction or trade site and want a co-branded tool or a calculator
              tailored to your readers, we are happy to help. Get in touch and tell us what you
              need.
            </p>
            <div className="mt-8">
              <Link
                href="/contact?utm_source=embed-gallery&utm_medium=site&utm_campaign=partnerships"
                className={`${btnPrimary} text-base px-6 py-3 sm:px-8 sm:py-4`}
              >
                Talk to us about a partnership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
