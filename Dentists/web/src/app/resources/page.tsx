/**
 * /resources — the index the six resource topics never had.
 *
 * Two of the six hold a Google position around 10 with impressions and no
 * clicks; the other four have no search rows at all, which on a page with no
 * inbound link and no hub reads as "never discovered" rather than "dead". This
 * route is the missing hub: one internal path in, one CollectionPage document,
 * and a link out to each topic.
 *
 * Reuses the existing loaders untouched (`publishedGuideTopicsWithFile`,
 * `getGuideByTopic`, `resourceForTopic`, `isXlsxEnabled`), so a topic appears
 * here on exactly the condition it renders at all: enabled AND a file on disk.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  focusRing,
  sectionY,
  sectionYLoose,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getGuideByTopic, publishedGuideTopicsWithFile } from "@/lib/resources/content";
import { isXlsxEnabled, resourceForTopic } from "@/lib/resources/registry";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { buildCollectionPage, JsonLd } from "@/lib/schema/index";

const TITLE = "Free resources for UK dentists";
const DESCRIPTION =
  "Free spreadsheet models and written research notes for UK dentists: associate take-home pay, incorporation, profit extraction, practice purchase, practice sale and NHS UDA value. No sign-up, no email gate.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/resources`,
    languages: {
      "en-GB": `${siteConfig.url}/resources`,
      "x-default": `${siteConfig.url}/resources`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/resources`,
    type: "website",
  },
};

export default function ResourcesIndex() {
  const topics = publishedGuideTopicsWithFile();
  const items = topics
    .map((topic) => {
      const guide = getGuideByTopic(topic);
      if (!guide) return null;
      const resource = resourceForTopic(topic as TopicKey);
      return {
        topic,
        title: guide.title,
        summary: guide.summary,
        version: guide.frontmatter.version,
        xlsxLabel: isXlsxEnabled(resource) && resource?.xlsx ? resource.xlsx.label : null,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Resources" }];

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPage({
            name: TITLE,
            description: DESCRIPTION,
            path: "/resources",
            numberOfItems: items.length,
          }),
        ]}
      />

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Free resource library
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {TITLE}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              The working models and research notes behind the decisions a dentist actually faces.
              Each one is a full written walk-through of the numbers, and most come with the
              spreadsheet behind it. Nothing here is gated: no sign-up, no email address, no
              form between you and the file.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-5xl">
            {items.length === 0 ? (
              <p className="text-center text-base text-[var(--ink-soft)]">
                Resources will appear here.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((item) => (
                  <Link
                    key={item.topic}
                    href={`/resources/${item.topic}`}
                    className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-white p-7 transition-shadow hover:shadow-md ${focusRing}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-700">
                      {item.xlsxLabel ? "Guide and spreadsheet model" : "Written guide"}
                    </p>
                    <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-[var(--ink)] group-hover:text-primary-700">
                      {item.title}
                    </h2>
                    {item.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {item.summary}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[var(--muted)]">
                      <span>{item.version ? `Tax year ${item.version}` : "Free to use"}</span>
                      <span className="font-semibold text-primary-700">Read it →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <p className="mt-10 text-sm leading-relaxed text-[var(--ink-soft)]">
              Want the longer read?{" "}
              <Link
                href="/dental-guides"
                className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}
              >
                The pillar guides
              </Link>{" "}
              take a single decision end to end.{" "}
              <Link
                href="/calculators"
                className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}
              >
                The calculators
              </Link>{" "}
              run the same numbers in your browser, and{" "}
              <Link
                href="/blog"
                className={`font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800 ${focusRing}`}
              >
                the blog
              </Link>{" "}
              answers one question at a time.
            </p>
          </div>
        </div>
      </section>

      <section
        id="enquiry-form"
        aria-labelledby="resources-cta-heading"
        className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--background)]"
      >
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Ready to apply this to your practice?
            </p>
            <h2
              id="resources-cta-heading"
              className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl"
            >
              Get your own numbers checked
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
              The models give you the framework. A specialist dental accountant can confirm the
              figures for your practice, flag any reliefs that apply and talk through the timing.
              The first call is free and with no obligation.
            </p>
            <Link
              href="/contact"
              data-cta="resources_hub_contact"
              data-cta-placement="resources_index_closing"
              data-cta-goal="form"
              className={`mt-7 inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-[var(--navy)] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[var(--navy-soft)] ${focusRing}`}
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
