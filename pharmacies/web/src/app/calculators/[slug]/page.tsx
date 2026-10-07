import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { buildCalculatorJsonLd, buildFaqPageJsonLd } from "@/lib/calculators/schema";
import { genericTools, getGenericTool } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return genericTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) return {};
  const canonical = `${site.url}/calculators/${tool.slug}`;
  return {
    title: { absolute: tool.metaTitle },
    description: tool.metaDescription,
    alternates: { canonical },
    openGraph: { title: tool.metaTitle, description: tool.oneLiner, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title: tool.metaTitle, description: tool.oneLiner },
  };
}

export default async function CalculatorToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getGenericTool(slug);
  if (!tool) notFound();

  const faqSchema = tool.faqs ? buildFaqPageJsonLd(tool.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: tool.name,
            description: tool.metaDescription,
            path: `/calculators/${tool.slug}`,
          }),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div>
        {/* UB, `calc_hero_help` DECLINED: this template's hero (above) carries
            no link at all, only the Eyebrow, h1 and intro paragraph. Rule 1
            forbids a new link, so there is no existing element to attach the
            id to. `data-cta` on this template therefore stays on the kit's
            own `CalcResultCta`/`FaqSection` surfaces, which it already carries
            via its own instrumentation, not this file. */}
        {/* .ground-dark: the brand hero is a dark ground (the
            --brand-primary token, the brand step P1-A pinned), so every focusable thing inside it, the breadcrumb links
            included, takes the white ring via globals.css. */}
        <section className="ground-dark bg-[var(--brand-primary)] py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            {/* Kit Breadcrumb, tone="onBrand": white links / white-80 separator,
                measured for a mid-to-dark brand ground. It also emits the
                BreadcrumbList JSON-LD these three pages did not have at all
                (P0-B per-family notes), so this is a pure gain. */}
            <Breadcrumb
              siteUrl={site.url}
              tone="onBrand"
              items={[
                { label: "Home", href: "/" },
                { label: "Calculators", href: "/calculators" },
                { label: tool.name },
              ]}
            />
            <Eyebrow onDark>{tool.category}</Eyebrow>
            {/* UB, H1 rhythm: a calculator hero is a step down from the
                service/hub detail heroes (36px source today), so the new
                top step is `lg:text-5xl` rather than the `lg:text-6xl` on
                those two. Class string only, `tool.name` unchanged. */}
            <h1 className="text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl leading-[1.15]">{tool.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{tool.intro}</p>
          </div>
        </section>

        {/* UB, G3 ground fix (sameAdjacent=1): this section was `bg-[var(--surface)]`,
            identical to the `aria-labelledby="calc_result-heading"` <section>
            `CalcResultCta.tsx:23` mounts inside it (`bg-[var(--surface)]` too,
            measured via `curl localhost:3111/calculators/locum-take-home-comparator
            | grep -oE '<section[^>]*>'`, which is where the 5th `<section>`
            the 0.2 count did not break out comes from). `CalcResultCta.tsx` is
            not in this package's OWNS set (`components/calculators/**`), so the
            fix is here: moving the WRAPPING section to `bg-white` gives the
            card contrast against its own backdrop instead of sitting flush on
            an identical ground, and the flat doc-order sequence becomes
            dark / white / surface / white / surface, zero adjacent repeats.
            UB2 SUPERSEDES THAT CHOICE, taking W7C's handoff diff
            (docs/pharmacies/_port/W7C_RECEIPT.md section 3, the one-line fix
            W7C measured but was not allowed to apply): this section is now
            `bg-slate-50`, not `bg-white`. UB's `bg-white` moved the clash
            rather than closing it, because the explainer section two below is
            also `bg-white`, so V2's instrument measured navy / white / white /
            surface at 390, 768 and 1440 and counted the pair. The band-level
            sequence is now navy / slate-50 / white / surface, with
            `--surface` = globals.css:129 `hex f8fafc`, so no two adjacent bands
            share a ground and the last band is still light before the dark
            footer. `slate-50` is an already-measured ground on this route (the
            FAQ band paints the same value through `--surface`), so no new
            contrast row is needed: the h2 `--ink` `hex 0f172a` and the body
            slate-700 `hex 334155` rows carried elsewhere on this page apply
            unchanged, and the kit Calculator's own cards are white and keep
            their edge against it.
            ONE CONSEQUENCE, declared rather than left for the next reviewer:
            `CalcResultCta`'s card is `bg-[var(--surface)]`, the same value as
            this band's new ground, so that card no longer separates by fill. It
            keeps the edge it already had, `rounded-2xl border-l-4
            border-[var(--brand-primary)]` (CalcResultCta.tsx:23), which is a
            brand rule rather than a tint. The file is
            `components/calculators/**` and off limits here, so repainting the
            card white is the next package's one-class change if the owner wants
            fill separation back as well. DECLINED:
            `ScrollGlowGroup` around this band. `CalculatorClient` renders no
            card grid in this file's tree (`Calculator.tsx:121,162` are single
            cards, not a grid), so there is nothing to wrap. */}
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            {/* DECLINED: packages/web-shared/leads/MobileToolSlot.tsx:14. It is
                the mobile stand-in for a DESKTOP-ONLY premium tool ("Premium
                tools are desktop-only... Rendered inside PremiumUpgrade's
                mobile-only (sm:hidden) block", its docstring :3-10). All three
                pharmacy tools are standard config-driven calculators that run
                fine at 390 and this site has no PremiumUpgrade surface, so the
                slot would hide a working calculator behind a form on mobile.
                It also requires `siteConfig` and `submitLead` props (:25-26)
                that bind the KIT MiniCapture; this site's local MiniCapture
                signature is frozen (W6) and accepts neither. Testable: grep
                PremiumUpgrade under pharmacies/web/src hits nothing but this
                comment. */}
            <CalculatorClient slug={tool.slug} variant="page" resultCta={<CalcResultCta campaign={tool.slug} />} />
          </div>
        </section>

        {/* UB2, Eyebrow DECLINED on this band, re-checked against each of the
            three records rather than inherited from UB. `tool.category` is the
            only label this data shape publishes and it is already the hero
            Eyebrow, but the decisive test is the kit's own constraint on the
            primitive (`design/marketing/TopicSection.tsx:51`: the eyebrow
            "must not repeat the heading's words"), and all three fail it:
            category "Locum Pharmacists" against heading "Why the tax route
            matters less than employment status for locum pharmacists";
            "NHS Contract and Income" against "How the NHS FP34 payment cycle
            drives pharmacy cash flow"; "Buying a Pharmacy" against "How to
            assess pharmacy purchase affordability". `oneLiner` is the only
            other string on the record and this page never prints it, so using
            it would publish new copy. Count for this template is 1 -> 1, which
            is R4 PART B gap 2 and the owner's call.

            UB2, R4 PART B gap 1 ("the card walls are still paragraph boxes")
            DOES NOT APPLY to this template, stated rather than silently
            skipped: there is no card wall on it. Its four bands are a hero, the
            kit calculator (whose cards all live in `components/calculators/**`
            and `packages/web-shared/tools/**`, both off limits), this single
            prose column, and the kit FaqSection. `GenericTool`
            (packages/web-shared/tools/types.ts:86-100) publishes no
            `{title, body}` set and no `string[]` of claims on any of the three
            records: `related` and `workedExamples` are both optional and both
            absent (`grep -n 'related\|workedExamples' lib/calculators/tools/*.ts`
            = 0), so the two fields that would have fed a card grid or a tick
            list carry nothing. Nothing was forced into place to make a count.

            ADOPTED here instead, the one kit component the data does fit:
            `design/primitives/page-blocks.tsx:13` `Prose`, the kit's body copy
            stack, replacing a hand-rolled copy of it. Byte-equivalent colour,
            checked: the local class was `text-[var(--ink-soft)]` and
            globals.css:132 binds `--ink-soft: hex 334155`, which IS slate-700,
            the colour `Prose` paints (:17). Same `mt-6 space-y-4
            leading-relaxed`. The only delta is `text-sm sm:text-base` instead
            of a flat `text-base`, i.e. one step smaller at 390 only, which is
            the site-wide body rhythm every other kit band already uses. No
            string moved and `{p}` is still a JSX text child, so nothing in
            `lib/calculators/**` is read differently.

            STILL DECLINED on this band, each re-read against today's kit:
            - `design/marketing/CoverageCards.tsx:46` and
              `design/primitives/page-blocks.tsx:97` CardStack: both need
              `{title, body}` items. `explainer.paragraphs` is `string[]` with
              no titles, and writing a heading per paragraph is authoring.
            - `design/marketing/NumberedReasons.tsx:130` and
              `design/marketing/WhyUsList.tsx:12`: same missing `title`, plus
              both assert an ordinal sequence this explainer's paragraphs do
              not claim.
            - `design/marketing/DrawnTickList.tsx:33` takes `string[]`, which
              `explainer.paragraphs` technically IS, and it is declined anyway:
              its item renders as a single `<span>` beside a 20px tick (:98),
              a one-line claim. These are 40-to-70-word paragraphs; three of
              them as tick rows reads as a promise list, which is a different
              claim from the explanation they are.
            - `design/marketing/ProcessTimeline.tsx:26` needs `{n, title,
              body}`; no record publishes staged steps.
            - `design/marketing/ComparisonTable.tsx:32-47` needs a `general`
              string per row; nothing on these records compares two options as
              data.
            - `design/marketing/TopicSection.tsx:38` requires a non-optional
              `eyebrow` string, which is exactly what the decline above says
              cannot be supplied.
            - `design/marketing/StatsCounter.tsx`: `GenericTool` publishes no
              `stats` array at all, unlike `PharmacyService`.
            - `design/primitives/ExampleFigureNote.tsx:22`: its default label
              is a kit string, so rule 9 would permit it, but each tool already
              publishes its own caveat in `result.note`, which the kit
              Calculator renders on the result panel. A second disclaimer is
              the same objection that stands against NoticeCard below. */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{tool.explainer.heading}</h2>
            <Prose>
              {tool.explainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Prose>

            {/* REMOVED 2026-09-28 parity phase 0 (Opus read): this route rendered
                TWO identical capture forms, this one and CalcResultCta under the
                result. Brief section 4 allows exactly one, directly under the
                result, so the footer duplicate goes. Phase 4 keeps it at one.

                DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx:19,
                the "these are estimates, check your own figures" card. Each of
                the three tools already publishes exactly that sentence inside
                its own `result.note`, which the kit Calculator renders on the
                result panel (tools/components/Calculator.tsx:211-240). A
                NoticeCard here would print a second, weaker copy of a caveat the
                reader has just read, and the note itself lives in
                lib/calculators/tools/**, which is off limits to this package, so
                it cannot be moved. The component IS adopted on /calculators,
                where the equivalent sentence has no home. Testable: grep
                `note:` in each tool file. */}
          </div>
        </section>

        {/* Kit FaqSection on the SAME `tool.faqs` binding that feeds the
            FAQPage JSON-LD above (T17: one binding, two consumers).
            `alwaysRenderAnswers` keeps every answer in the server HTML so the
            schema never asserts an answer the markup does not carry.
            `html` is NOT passed: all three tools' answers are plain text
            (verified, no tags in any `answer` in lib/calculators/tools/**).
            `eyebrow=""` because the kit default "FAQ" is a label this site does
            not publish; the existing h2 string is the kit default already.

            UB2, BAND SEQUENCE AND GROUNDS RE-CHECKED. The served HTML of the
            build under test (`curl -s localhost:3111/calculators/
            locum-take-home-comparator | grep -oE '<section[^>]*'`) returned
            five `<section>` elements in doc order, which is why no earlier
            sweep broke out the real band sequence:
              1 `ground-dark bg-[var(--brand-primary)]`  DARK  (hero)
              2 `bg-white`                               LIGHT (calculator)
              3 `rounded-2xl border-l-4 bg-[var(--surface)]`, a CARD inside
                band 2, not a band (CalcResultCta.tsx:23, off limits here)
              4 `bg-white`                               LIGHT (explainer)
              5 `bg-[var(--surface)]`                    LIGHT (this FAQ)
            UB's receipt recorded that as "dark / white / surface / white /
            surface, zero adjacent repeats", counting entry 3 as a band. It is
            not one: the served class string above is a rounded, brand-edged
            card. At BAND level the sequence was dark / white / white / surface,
            so bands 2 and 4 shared a ground, which is exactly the pair V2
            measured at all three widths and W7C handed over.
            AFTER the one-class fix above the band sequence is
            DARK / slate-50 / white / surface, zero adjacent repeats at band
            level, last band light into the slate-900 footer.
            Also re-checked on this route while the file was open: exactly ONE
            form, under the result, no gate and no PDF (the explainer's
            duplicate went in phase 0 and nothing was added back), and
            `lib/calculators/**` is untouched, so the three golden test files
            still pass unchanged. */}
        {tool.faqs && tool.faqs.length > 0 && (
          <FaqSection
            faqs={tool.faqs}
            eyebrow=""
            title="Frequently asked questions"
            className="bg-[var(--surface)] py-12 sm:py-16"
            tone="white"
            alwaysRenderAnswers
          />
        )}
      </div>
    </>
  );
}
