import Link from "next/link";
import { PageHero } from "@/app/_parts/PageHero";
import { buildFaqJsonLd } from "@/lib/schema";
import { sectionY, siteContainerLg } from "@/components/ui/layout-utils";

/**
 * The detail anatomy shared by `/services/[slug]` and `/for/[slug]`.
 *
 * One component because the two routes are the same page with different data:
 * navy hero, dark stat strip, challenges, how-we-help, FAQ, closing CTA. They
 * were two hand-copies that had already drifted in one respect that mattered,
 * and that drift was a latent defect rather than a style difference: the
 * service route rendered its authored fields as HTML and the hub route rendered
 * the same-shaped fields as text children. Unifying them fixes the hub side
 * once, where both callers route through, instead of per field.
 *
 * Every authored string this renders is a literal in `src/data/`, never user
 * input, which is what makes `dangerouslySetInnerHTML` safe here. The fields
 * carry authored gov.uk citations as inline `<a>`; rendered as text children
 * they display as escaped markup and the citations are dead.
 *
 * The FAQ is native `<details>/<summary>`, NOT the kit's Radix accordion. The
 * accordion has no `forceMount`, so a closed answer is absent from the server
 * HTML while the FAQPage JSON-LD below still asserts it. `<details>` keeps
 * every asserted answer in the served markup. Do not "upgrade" this.
 */

export type TopicSection = { title: string; body: string };
export type TopicFaq = { question: string; answer: string };

export function TopicPageLayout({
  breadcrumb,
  eyebrow,
  headline,
  intro,
  stats,
  challengesHeading,
  challenges,
  howWeHelpHeading,
  howWeHelp,
  faqs,
  ctaHeading,
  ctaBody,
}: {
  /** Trail including Home and the current page. The last item carries no href. */
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  headline: string;
  /** Authored HTML. */
  intro: string;
  stats: { value: string; label: string }[];
  challengesHeading: string;
  challenges: TopicSection[];
  howWeHelpHeading: string;
  howWeHelp: TopicSection[];
  faqs: TopicFaq[];
  ctaHeading: string;
  ctaBody: string;
}) {
  return (
    <>
      {/* Hero: the site's one hero (`_parts/PageHero`), not a third copy of it.
          Navy is the ground identity; the action ramp carries the in-copy
          citations, because a navy link on near-navy copy is not identifiable as
          a link. primary-400 measures 5.56:1 on #0e1a3a, clear of the 4.5 floor,
          and is the kit's own onDark answer for a brand link. */}
      <PageHero eyebrow={eyebrow} title={`${headline}.`} items={breadcrumb}>
        <p
          className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg [&_a]:font-semibold [&_a]:text-primary-400 [&_a]:underline [&_a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0e1a3a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get in touch
          </Link>
        </div>
      </PageHero>

      {/* Stat strip. WHITE, not a second dark band. The navy hero above is the
          ground identity; a bg-neutral-800 strip under it sat at almost the same
          luminance (L* 10.3 vs 15.6) and the seam read as one long dark slab
          with a hue shift. Navy never touches navy. This is the homepage's own
          answer (`app/page.tsx` key-figures bar), reused rather than invented:
          white ground, value in brand navy, label in slate-600.

          Re-measured because the ground changed (one ratio, three floors):
            #0e1a3a value on #ffffff   17.12:1  graphic PASS / text PASS / ground PASS
            #475569 label on #ffffff    7.57:1  graphic PASS / text PASS / ground PASS
          The retired pair (text-neutral-400 on bg-neutral-800, 5.86:1) passed
          too; it is gone because the BAND was wrong, not the type on it. */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="font-mono text-2xl font-bold text-[#0e1a3a] sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges: slate ground, white cards opposing it. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {challengesHeading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {challenges.map((item, i) => (
              <article key={item.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-base font-bold tabular-nums text-slate-900 ring-1 ring-slate-200/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we help: white ground, slate cards with the brand rule on the edge. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {howWeHelpHeading}
          </h2>
          <div className="mt-10 space-y-5">
            {howWeHelp.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-xl border-l-4 border-[var(--btn-ground)] bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-7"
              >
                <div className="font-mono text-sm font-bold tabular-nums tracking-tight text-slate-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }} />
          <section className="bg-slate-50">
            <div className={`${siteContainerLg} ${sectionY}`}>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Common questions</h2>
              <div className="mt-10 space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-xl bg-white ring-1 ring-slate-200/70">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold text-slate-900 transition-colors hover:text-primary-700">
                      <span>{faq.question}</span>
                      <span
                        className="flex-shrink-0 text-primary-700 transition-transform group-open:rotate-45"
                        aria-hidden
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                      </span>
                    </summary>
                    <div
                      className="border-t border-slate-200 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600 sm:text-base [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Closing ask. A LINK to /contact, not an embedded form: these routes
          carry no capture surface today and adding one is an owner decision.
          White ground so the navy footer is not the second navy field running
          straight into the first. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="rounded-xl bg-[#0e1a3a] p-8 sm:p-12">
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">{ctaHeading}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{ctaBody}</p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0e1a3a] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
