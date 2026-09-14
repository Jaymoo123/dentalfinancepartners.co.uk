/**
 * Shared page furniture for the services, sectors, guides and research
 * surfaces, built on the shared design kit.
 *
 * Why these live here rather than in each page file: before the port, the four
 * index pages and the seven detail templates each hand-rolled a hero, a card
 * grid, an FAQ block and a closing band, and no two of them matched. Eight card
 * recipes, three FAQ treatments, four hero paddings.
 *
 * Everything visual below is the kit's: `Breadcrumb`, `Eyebrow`,
 * `layout-utils` containers and buttons, and the kit's
 * corrected card recipe (`ring-1 ring-slate-200/70`, NOT `border
 * border-slate-200`). What is local is the HTML carve-out: `src/data/
 * charity-types.ts` stores inline `<a href>` anchors inside `intro`,
 * `challenges[].body`, `howWeHelp[].body` and `faqs[].answer`, and every
 * pre-port template rendered those as `{value}`, so 16 government links have
 * been shipping as visible escaped markup. The kit's `CoverageCards`,
 * `CardStack` and `FaqSection` all render their text as `{value}` too, so
 * adopting them verbatim would preserve the defect. These wrappers carry the
 * same kit styling with `dangerouslySetInnerHTML` on those fields instead.
 *
 * CORRECTION 2026-09-14. The three declines this docstring used to carry
 * (`RelatedArticles`, `TableOfContents`, `ReadingProgress`) rested on two
 * premises that are both false today, and all three components are in fact
 * already mounted on the blog article route
 * (`src/app/blog/[category]/[slug]/page.tsx:19-22,143,200,287`):
 *   - "this site does not import globals-standard.css" is wrong: it is imported
 *     at `src/app/globals.css:13`, so `.related-card:focus-within`
 *     (globals-standard.css:243) does resolve here.
 *   - "this site's globals.css does not declare --primary" is wrong: it is
 *     declared at `src/app/globals.css:51` as `var(--brand-primary)`.
 * Do not reinstate either reason. The declines that DO still hold are recorded
 * on the components below (`FaqSection`, `CtaBand`) and on the card grids.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb, type BreadcrumbItem } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import {
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import CharitiesBackdrop from "@/components/layout/CharitiesBackdrop";
import { siteConfig } from "@/config/site";

/** Inline-anchor treatment for the HTML-bearing fields, LIGHT grounds. primary-700
 *  rather than 600: 600 measures 4.49 on slate-50, just under the 4.5 text floor. */
const richLink =
  "[&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-800";

/** Same treatment for the DARK hero ground (bg-slate-900). `richLink` was applied
 *  to the hero body at both tones, and `[&_a]:text-primary-700` is a real rule on
 *  the anchor, so it beat every INHERITED colour the caller set on a wrapper (the
 *  research jump navs each carry `text-slate-300` on the <nav>, which never
 *  reached the anchors). primary-700 #16483a on slate-900 #0f172b measures 1.73,
 *  against a 4.5:1 floor at 14px and a 3:1 floor at 16-18px: fail at every size.
 *  primary-400 #58a88f on the same ground measures 6.27, clearing both floors.
 *  Hover goes to white, 17.84. Ratios computed from the INSTALLED Tailwind 4.3.0
 *  theme.css oklch values (slate-900 = oklch(20.8% 0.042 265.755)) and this
 *  site's own @theme primary ramp, not the v3 hex table.
 *  Underline is kept so the link stays identifiable by more than colour. */
const richLinkOnDark =
  "[&_a]:font-semibold [&_a]:text-primary-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-white";

/**
 * Page hero. `cream` is the index/landing ground, `dark` the detail-page one,
 * matching the kit's own split (`BlogCategoryHub` cream, `SlimHero` navy).
 * The breadcrumb is the kit's, which emits its own BreadcrumbList JSON-LD, so a
 * page adopting this hero must drop any page-level `buildBreadcrumbJsonLd`
 * call or it emits the node twice.
 * The section is already `relative overflow-hidden` with `relative z-10`
 * content, which is `CharitiesBackdrop`'s host contract, so the backdrop is
 * mounted here rather than in each of the eleven callers.
 */
export function PageHero({
  eyebrow,
  title,
  crumbs,
  tone = "cream",
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  crumbs: BreadcrumbItem[];
  tone?: "cream" | "dark";
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`relative flex min-h-[300px] items-center overflow-hidden py-10 sm:min-h-[350px] sm:py-12 lg:py-14 ${
        dark ? "bg-slate-900" : heroCreamSurface
      }`}
    >
      <CharitiesBackdrop tone={dark ? "dark" : "cream"} />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className="max-w-3xl">
          <Breadcrumb siteUrl={siteConfig.url} onDark={dark} items={crumbs} />
          <Eyebrow onDark={dark}>{eyebrow}</Eyebrow>
          <h1
            className={`text-3xl font-bold leading-[1.15] text-balance sm:text-5xl lg:text-6xl ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h1>
          {children ? (
            <div
              className={`mt-4 space-y-4 text-base leading-7 sm:mt-6 sm:text-lg ${
                dark ? `${richLinkOnDark} text-white/90` : `${richLink} text-slate-700`
              }`}
            >
              {children}
            </div>
          ) : null}
          {actions ? (
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Section wrapper: eyebrow, h2, then the caller's content. */
export function HubSection({
  eyebrow,
  title,
  ground = "white",
  children,
}: {
  eyebrow: string;
  title: string;
  ground?: "white" | "slate";
  children: ReactNode;
}) {
  return (
    <section className={`py-16 sm:py-20 ${ground === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <div className={siteContainerLg}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export type LinkCard = {
  href: string;
  title: string;
  body?: string;
  meta?: string;
  /** Headline figure above the title, for the research index cards. */
  stat?: string;
  statLabel?: string;
};

/**
 * The one link-card grid. Card recipe is the kit's corrected one, taken from
 * `HubArticleList.tsx:82` and `CoverageCards.tsx:70`: a slate ring at 70%
 * alpha, not a solid border. The whole card is the anchor and carries the kit
 * `focusRing`, so keyboard focus is visible without any globals-standard rule.
 */
export function LinkCardGrid({
  items,
  columns = 3,
  compact = false,
  clampBody = true,
}: {
  items: LinkCard[];
  columns?: 2 | 3 | 5;
  compact?: boolean;
  /** Clamp the body to three lines. Off where the body IS the content the
   *  reader is choosing between, as on the research index. */
  clampBody?: boolean;
}) {
  const grid =
    columns === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-8 grid gap-4 sm:mt-10 sm:gap-6 ${grid}`}>
      {items.map((item) => (
        <article
          key={item.href}
          className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-primary-600"
        >
          <Link
            href={item.href}
            className={`flex h-full flex-col rounded-xl ${compact ? "p-4 sm:p-5" : "p-6 sm:p-7"} ${focusRing}`}
          >
            {item.stat ? (
              <>
                <span className="text-3xl font-bold text-primary-700 sm:text-4xl">{item.stat}</span>
                {item.statLabel ? (
                  <span className="mt-1 mb-4 text-sm text-slate-600">{item.statLabel}</span>
                ) : null}
              </>
            ) : null}
            {compact ? (
              <span className="text-sm font-bold text-slate-900 sm:text-base">{item.title}</span>
            ) : (
              <h3 className="text-base font-bold! leading-snug! tracking-normal! text-slate-900 sm:text-lg">
                {item.title}
              </h3>
            )}
            {item.body ? (
              <div className="mt-3 mb-5 flex-grow">
                <p
                  className={`text-sm leading-6 text-slate-600 ${clampBody ? "line-clamp-3" : ""}`}
                >
                  {item.body}
                </p>
              </div>
            ) : null}
            {item.meta ? (
              <p className="mt-auto text-sm text-slate-500">{item.meta}</p>
            ) : null}
          </Link>
        </article>
      ))}
    </div>
  );
}

/**
 * Titled cards whose body is a raw HTML string (see the file docstring).
 * Same recipe as `LinkCardGrid`, minus the link affordances.
 */
export function RichCardGrid({
  items,
  columns = 2,
  tone = "white",
}: {
  items: Array<{ title: string; body: string }>;
  columns?: 2 | 3;
  tone?: "white" | "slate";
}) {
  return (
    <div
      className={`mt-8 grid gap-5 sm:mt-10 sm:gap-6 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={`rounded-xl p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 ${
            tone === "slate" ? "bg-slate-50" : "bg-white"
          }`}
        >
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
          <p
            className={`mt-3 text-sm leading-relaxed text-slate-700 sm:text-base ${richLink}`}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * FAQ block. Deliberately a plain `<dl>`, NOT the kit `FaqSection` and not the
 * kit's radix `Accordion`: that accordion passes no `forceMount`, so every
 * closed answer is absent from the server HTML while the page's
 * `buildFaqJsonLd` still asserts it to crawlers. The kit's `AccordionContent`
 * does spread its props, so `forceMount` could be threaded from here without
 * editing `packages/web-shared/` — but the blog route
 * (`src/app/blog/[category]/[slug]/page.tsx`) already settled this site on a
 * `<dl>` that is always in the DOM, and the two should match. Do not convert
 * this back to an accordion.
 * Pair it with `buildFaqJsonLd` in the page.
 */
export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Common questions",
  ground = "white",
}: {
  faqs: Array<{ question: string; answer: string }>;
  eyebrow?: string;
  title?: string;
  ground?: "white" | "slate";
}) {
  if (faqs.length === 0) return null;
  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${ground === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <div className={siteContainerLg}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:mb-12 sm:text-4xl">{title}</h2>
        <dl className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className={`rounded-xl p-4 ring-1 ring-slate-200/70 sm:p-6 ${
                ground === "slate" ? "bg-white" : "bg-slate-50"
              }`}
            >
              <dt className="text-sm font-bold text-slate-900 sm:text-base">{faq.question}</dt>
              <dd
                className={`mt-2 text-sm leading-relaxed text-slate-700 sm:text-base ${richLink}`}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * Closing band. Deliberately a link to /contact, not the kit `LeadCTAPanel`:
 * that panel has a required `form` slot, so adopting it on these routes would
 * add twelve new lead-capture surfaces to the site. Changing the SET of capture
 * surfaces is an owner decision with a conversion read, not a design port
 * decision. No fee claim and no turnaround promise here, by rule.
 */
export function CtaBand({
  title,
  children,
  label = "Get in touch",
  href = "/contact",
  cta,
}: {
  title: string;
  children: ReactNode;
  label?: string;
  href?: string;
  /** `data-cta` id. Omit on routes with no CTA series to start. */
  cta?: string;
}) {
  return (
    // border-b: on /services and /guides/[slug] this band is the LAST section on
    // the page and the kit footer is also bg-slate-900 with no top border of its
    // own (SiteFooter.tsx:138), so the two dark grounds merged into one slab with
    // no boundary. white/10 is the footer's own divider value (SiteFooter.tsx:195).
    // On /for/[slug] and /services/[slug] a slate-50 section follows and the
    // hairline sits invisibly on an already-visible edge.
    <section className="border-b border-white/10 bg-slate-900 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">{title}</h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
            {children}
          </div>
          <div className="mt-8">
            <Link
              href={href}
              {...(cta ? { "data-cta": cta, "data-cta-placement": "page_foot", "data-cta-goal": "contact" } : {})}
              className={btnPrimary}
            >
              {label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stat tile. Was duplicated verbatim in all four research study pages. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <div className="text-3xl font-bold text-primary-700 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

/** Ruled article section. Was duplicated verbatim in all four study pages. */
export function ResearchSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className={`mt-4 space-y-4 text-base leading-relaxed text-slate-700 ${richLink}`}>
        {children}
      </div>
    </section>
  );
}
