import type { Metadata } from "next";
import Link from "next/link";
import { EmbedSnippet } from "@/components/embed/EmbedSnippet";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { allTools } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: { absolute: `Embed Our Free IR35 Calculators | ${siteConfig.name}` },
  description:
    "Add our free UK contractor and IR35 calculators to your own website. Take-home, umbrella vs limited, dividend and corporation tax. One iframe, no cost.",
  alternates: { canonical: `${siteConfig.url}/embed` },
  openGraph: {
    title: "Embed Our Free IR35 Calculators",
    description:
      "Free, always-current contractor and IR35 calculators you can add to your own site in one line of HTML.",
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
  if (e.data && e.data.type === "ir35-embed-height") {
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
      {/* Hero. Mono eyebrow, not the `.eyebrow` class: that rule is UNLAYERED
          in globals.css and pins `color: var(--accent)`, which a utility cannot
          override. primary-400 #22d3ee on neutral-900 = 9.92.
          NO hero CTA to a lead form here, deliberately: this page's reader is a
          partner site, not a lead, and the ask is a partnership. Recorded in
          P3_ROUTE_ANATOMIES §B5 so it does not read as an omission. */}
      <section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb
            siteUrl={siteConfig.url}
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Embed our calculators" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              For partners
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Add our free IR35 calculators to your site
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              Free, mobile-friendly and always kept current with UK contractor tax rules. If you
              advise or write for contractors, freelancers or the recruiters and clients who engage
              them, drop any of these into your own pages with a single line of HTML. We keep them up
              to date; you keep your readers on your site.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Built for recruitment agencies, contractor bodies, umbrella and accountancy comparison
              sites, and industry blogs. The only condition is that you leave the small &ldquo;Powered
              by {siteConfig.name}&rdquo; line in place.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">How to embed (2 steps)</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-600">
                Step 1
              </p>
              <h3 className="mt-2 text-lg font-bold text-neutral-900">Paste the calculator</h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-700">
                Copy the iframe snippet for the calculator you want and paste it into your page
                where you want it to appear.
              </p>
            </li>
            <li className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-600">
                Step 2
              </p>
              <h3 className="mt-2 text-lg font-bold text-neutral-900">Add the resize script once</h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-700">
                Paste the small script below anywhere on the same page. It lets each calculator grow
                or shrink to fit its content, so there is no awkward scrollbar.
              </p>
            </li>
          </ol>
          <div className="mt-6">
            <EmbedSnippet code={RESIZE_SNIPPET} label="Resize script (add once per page)" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">The calculators</h2>
          {CALCULATORS.length === 0 ? (
            <p className="mt-6 text-neutral-600">Calculator tools coming soon.</p>
          ) : (
            <div className="mt-8 space-y-8">
              {CALCULATORS.map((c) => (
                <div
                  key={c.slug}
                  className="rounded-xl bg-white p-6 ring-1 ring-neutral-200/70 sm:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">{c.name}</h3>
                    <Link
                      href={`/calculators/${c.slug}`}
                      className="text-sm font-semibold text-primary-600 underline hover:text-primary-700"
                    >
                      Preview the full page &rarr;
                    </Link>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.oneLiner}</p>
                  <div className="mt-5">
                    <EmbedSnippet code={iframeSnippet(c.slug, c.name, c.embedHeight)} label="Embed code" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing ask: the LeadCTAPanel recipe (contained dark card on a light
          section, so no dark band touches the dark footer), but NOT the
          component. This page's ask is a partnership and there is no
          partnership form; the CTA legitimately leaves for /contact, and its
          embed-gallery UTMs are how partner enquiries are attributed at all. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="rounded-xl bg-slate-900 p-6 text-center ring-1 ring-slate-800 sm:p-10 lg:p-14">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400">
              Partnerships
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              Want a calculator built for your audience?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-200">
              If you run a contractor, recruitment or freelancing site and want a co-branded tool or
              a calculator tailored to your readers, we are happy to help. Get in touch and tell us
              what you need.
            </p>
            <div className="mt-8">
              <Link
                href="/contact?utm_source=embed-gallery&utm_medium=site&utm_campaign=partnerships"
                className={`${btnPrimary} rounded-xl text-base px-6 py-3 sm:px-8 sm:py-4`}
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
