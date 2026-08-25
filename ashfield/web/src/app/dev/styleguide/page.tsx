import type { Metadata } from "next";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassStat } from "@/components/glass/GlassStat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Styleguide (dev)",
  robots: { index: false, follow: false },
};

const colours = [
  ["paper", "#faf8f5"],
  ["paper-2", "#f3f0ea"],
  ["paper-3", "#ece8e0"],
  ["ink", "#14161a"],
  ["ink-70", "#14161ab3"],
  ["ink-45", "#14161a73"],
  ["navy", "#1e2a5e"],
  ["navy-70", "#1e2a5eb3"],
  ["navy-08", "#1e2a5e14"],
  ["hairline", "#14161a1f"],
  ["hairline-strong", "#14161a33"],
  ["glass", "#ffffffa6"],
] as const;

const typeScale = [
  ["type-display", "Display, hero only"],
  ["type-h1", "Heading one, Fraunces"],
  ["type-h2", "Heading two, Fraunces"],
  ["type-h3", "Heading three, Inter"],
  ["type-lead", "Lead paragraph sits under a heading and sets the argument."],
  ["type-body", "Body copy at 17px, Inter 400, oldstyle figures: 1,234,567."],
  ["type-caption", "Caption, ink at 45%, for figure notes and sources."],
  ["type-eyebrow", "Eyebrow small caps"],
  ["type-stat", "4,182"],
] as const;

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-(--gutter) pb-32 pt-16">
      <SectionHeading eyebrow="Internal reference" as="h1">
        Design system styleguide
      </SectionHeading>
      <p className="type-lead measure mt-6">
        Every token, type step and component in the Ashfield design language.
        Dev only, excluded from indexing and sitemaps.
      </p>

      {/* Tokens */}
      <section className="mt-24" data-reveal>
        <SectionHeading eyebrow="Section 0">Colour tokens</SectionHeading>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {colours.map(([name, hex]) => (
            <div key={name}>
              <div
                className="h-16 border border-hairline"
                style={{ background: hex }}
              />
              <p className="type-caption mt-2 !text-ink-70">--color-{name}</p>
              <p className="type-caption nums-lining">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section className="mt-24" data-reveal>
        <SectionHeading eyebrow="Section 2">Type scale</SectionHeading>
        <div className="mt-10 space-y-10">
          {typeScale.map(([cls, sample]) => (
            <div key={cls} className="hairline-b pb-8">
              <p className="type-caption mb-3">.{cls}</p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
          <div>
            <p className="type-caption mb-3">Fraunces italic, one per viewport</p>
            <p className="type-h2 italic">A network, not a directory</p>
          </div>
        </div>
      </section>

      {/* Hairlines */}
      <section className="mt-24" data-reveal>
        <SectionHeading eyebrow="Rules">Hairlines</SectionHeading>
        <div className="mt-10 space-y-6">
          <HairlineRule />
          <HairlineRule strong />
        </div>
      </section>

      {/* Glass over contrast layers, §4.2 demo */}
      <section className="mt-24 bg-paper-3 grain -mx-(--gutter) px-(--gutter) py-20">
        <SectionHeading eyebrow="Section 4">
          Glass over contrast layers
        </SectionHeading>
        <p className="type-caption mt-3 measure !text-ink-70">
          Every glass panel must sit over at least one contrast layer: a ghost
          serif numeral crossing the panel edge, or chart ink lines running
          underneath. Remove the backdrop filter, and if nothing changes the
          composition is wrong.
        </p>
        <div className="relative mt-14">
          {/* contrast layer 1: ghost numeral */}
          <span
            aria-hidden="true"
            className="ghost-numeral absolute -top-14 left-4 text-[11rem]"
          >
            15
          </span>
          {/* contrast layer 2: chart ink lines */}
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-10 h-40 w-full"
            viewBox="0 0 800 160"
            preserveAspectRatio="none"
          >
            <path
              d="M0 140 L100 120 L200 128 L300 96 L400 104 L500 66 L600 72 L700 34 L800 20"
              fill="none"
              stroke="#14161a"
              strokeWidth="1.5"
            />
            <path
              d="M0 150 L133 138 L266 142 L400 118 L533 122 L666 92 L800 78"
              fill="none"
              stroke="#1e2a5e"
              strokeWidth="1.5"
            />
          </svg>
          <div className="relative grid gap-6 py-10 sm:grid-cols-3">
            <GlassStat value="4,182" label="Qualified enquiries" caption="Trailing 12 months" />
            <GlassStat value="15" label="Live brands" />
            <GlassCard interactive className="px-7 py-6">
              <p className="type-eyebrow">Interactive card</p>
              <p className="type-body mt-3 text-ink-70">
                Hover lifts 2px, deepens the shadow. Press settles it back.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-24" data-reveal>
        <SectionHeading eyebrow="Section 7">Buttons and focus</SectionHeading>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button size="lg">Primary large</Button>
          <Button variant="secondary" size="lg" href="/">
            Link as button
          </Button>
        </div>
        <p className="type-caption mt-4">
          Tab through: 2px navy ring offset 3px everywhere; flips to ink on the
          navy pill.
        </p>
      </section>

      {/* Reveals */}
      <section className="mt-24">
        <SectionHeading eyebrow="Section 5">Reveals and stagger</SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="border border-hairline bg-paper-2 p-6"
            >
              <p className="type-eyebrow">Reveal {i + 1}</p>
              <p className="type-body mt-2 text-ink-70">
                Fades and rises 24px on entry. Visible immediately without
                JavaScript or with reduced motion.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Grain note */}
      <section className="mt-24" data-reveal>
        <SectionHeading eyebrow="Texture">Grain</SectionHeading>
        <p className="type-body measure mt-6 text-ink-70">
          The glass section above carries the grain overlay at 3.5% over
          paper-3. Grain never sits over glass panels themselves; the overlay
          renders beneath them.
        </p>
      </section>
    </div>
  );
}
