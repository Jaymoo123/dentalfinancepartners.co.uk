import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";

/**
 * The shared shell for the four `/research/<slug>` reports.
 *
 * The four pages were structurally identical and textually independent: each
 * redefined `Stat` and `Section` byte-for-byte, hand-rolled the same navy hero,
 * the same key-findings card, the same conversion panel and the same FAQ block.
 * One chrome change meant four edits and, historically, three of the four
 * getting it. This component is the single definition; the pages supply content.
 *
 * Three things the pages keep, deliberately:
 *  - the `HEADLINE_SENTENCE` h1 is passed in already derived. No number is ever
 *    retyped into a heading.
 *  - the hero CTA row (`heroCtas`) is written in the page, so every `data-cta`
 *    id is a literal string in the file that renders it, one id per route, and
 *    the trap-22 guard can extract it. A template literal here would collapse
 *    four routes into one `vw_cta_performance` row.
 *  - the FAQ is plain headings and paragraphs, NOT the kit `FaqSection`. That
 *    component is a Radix accordion with no `forceMount`, so closed answers
 *    leave the server HTML entirely. These are citation surfaces; the same
 *    decision is recorded on the homepage (app/page.tsx) and in
 *    BlogPostRenderer. The `faqs` array here is the one the page also feeds to
 *    `buildFaqPageJsonLd`, so markup and schema cannot drift.
 */

type Faq = { question: string; answer: string };

/**
 * A headline number.
 *
 * These were `bg-white/5` tiles inside the navy hero. They sit in the body now,
 * above the findings that explain them: `text-primary-800` (#9a3412) on
 * `bg-slate-50` (#f8fafc) measures well clear of the 4.5:1 text floor, and
 * `tabular-nums` stops the digits shifting between tiles.
 */
function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
      <div className="text-3xl font-bold tabular-nums text-primary-800 sm:text-4xl">{value}</div>
      <div className="mt-1.5 text-sm leading-relaxed text-neutral-700">{label}</div>
    </div>
  );
}

export function ResearchLayout({
  schemas,
  breadcrumbLabel,
  eyebrow,
  headline,
  intro,
  heroCtas,
  stats,
  keyFindings,
  source,
  children,
  conversionTitle,
  conversionBody,
  conversionCtas,
  conversionSubmitLabel = "Get a free CIS review",
  faqs,
}: {
  /** JSON-LD objects, serialised in order. Article, Dataset, FAQPage. Nulls skipped. */
  schemas: (object | null)[];
  breadcrumbLabel: string;
  eyebrow: string;
  /** The derived HEADLINE_SENTENCE. Never retype a number into this. */
  headline: string;
  intro: ReactNode;
  /** Written in the page so each `data-cta` id is a literal, route-unique string. */
  heroCtas: ReactNode;
  stats: { value: string; label: string }[];
  /** The `<li>` items of the key-findings card. */
  keyFindings: ReactNode;
  /** The card's source footnote. */
  source: ReactNode;
  /** The `<ResearchSection>`s. */
  children: ReactNode;
  conversionTitle: string;
  conversionBody: ReactNode;
  /** Written in the page, same reason as `heroCtas`. */
  conversionCtas: ReactNode;
  conversionSubmitLabel?: string;
  faqs: Faq[];
}) {
  return (
    <>
      {schemas.filter((s): s is object => s !== null).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero. Navy, and the breadcrumb now takes variant="light" (TD-31): the
          default variant renders text-neutral-500 links on #171717, which is a
          contrast failure the component already shipped a fix for and no call
          site passed. The four stat tiles that used to live here have moved
          into the body, beside the findings that explain them. */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: breadcrumbLabel },
            ]}
          />
          {/* Not `.eyebrow`: that class defaults to --accent-strong, which is
              ~3.43 on this ground. text-orange-400 (#ff8904) is 7.54. */}
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">{intro}</p>
          <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">{heroCtas}</div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} />
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-primary-50/60 p-6 ring-1 ring-primary-200 sm:p-8">
              <h2 className="text-lg font-bold text-primary-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                {keyFindings}
              </ul>
              <p className="mt-4 text-xs text-neutral-600">{source}</p>
            </div>

            {children}

            {/* The closing ask, and the target of the hero primary. The wrapper
                carries NO data-cta: autoCapture resolves through
                closest("[data-cta]"), so an id here would swallow every click
                inside the form (reverted once already, 05ddb709). */}
            <div id="book" className="mt-10 scroll-mt-24 rounded-xl bg-primary-50 p-8 ring-1 ring-primary-200 sm:p-10">
              <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">{conversionTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">{conversionBody}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {conversionCtas}
              </div>
              {/* The form keeps a white card under it. D.1's ground invariant:
                  the field labels are only known-safe on white, and every other
                  in-scope LeadForm mount on this site sits in one. */}
              <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-primary-200 sm:p-8">
                <LeadForm redirectOnSuccess={false} submitLabel={conversionSubmitLabel} />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
