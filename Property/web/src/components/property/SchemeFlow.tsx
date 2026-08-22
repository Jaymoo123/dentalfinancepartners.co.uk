import { ArrowRight, Banknote, Check, Landmark, Minus, Percent } from "lucide-react";
import { ScrollGlowGroup } from "@/components/property/ScrollGlowGroup";

const STAGES = [
  {
    icon: Banknote,
    title: "Your tenant pays the rent",
    body: "UK property income is taxed here whoever owns it and wherever they live.",
  },
  {
    icon: Percent,
    title: "20% is taken before you see it",
    body: "Your UK letting agent deducts basic rate tax from the rent. With no UK agent, the duty falls on any tenant paying you more than £100 a week.",
  },
  {
    icon: Landmark,
    title: "It goes to HMRC quarterly",
    body: "Set against the bill you will eventually settle on your UK tax return.",
  },
];

/** What the agent can and cannot see when they work out the 20%. */
const COUNTED = ["The agent's own fees", "Repairs the agent arranged"];
const NOT_COUNTED = [
  "Mortgage interest",
  "Insurance",
  "Ground rent",
  "Accountancy fees",
  "Anything you paid directly",
];

/**
 * The mechanics of the non-resident landlord scheme, as a figure rather than
 * three paragraphs: where the money goes, what the 20% is actually calculated
 * on, and what the fix is.
 *
 * The middle block is the point of the whole section. The scheme over-deducts
 * because the agent can only net off the costs that pass through their own
 * hands, so setting the two lists beside each other shows the gap at a glance —
 * which four paragraphs of prose could only assert.
 *
 * Following `ComparisonTable`: the excluded side gets a neutral dash, never a
 * red cross. Nobody is doing anything wrong here — the agent genuinely cannot
 * see those costs — and a cross would read as an accusation.
 *
 * Server component, no JavaScript.
 *
 * RULE ZERO (c), applied in Phase 6.7. The "Not deducted" `Minus` marks were
 * `text-slate-400` on the slate-50 card, measured in Edge at 2.51:1 against the
 * 4.5:1 AA floor; they are now `text-slate-500` at 4.55:1. Nothing else about
 * the treatment changed. Recorded here so a later diff against Property_zip
 * does not read it as drift. Same swap `ComparisonTable` took in Phase 6.3 on
 * the same mark for the same reason.
 */
export function SchemeFlow() {
  return (
    <div className="mt-8 sm:mt-10">
      <ScrollGlowGroup as="ol" className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-16">
        {STAGES.map((stage, i) => (
          <li
            key={stage.title}
            className="relative flex flex-col rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-7"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <stage.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{stage.body}</p>
            {/* Connector, desktop only — the grid is a single column below md, where a
                sideways arrow would point at nothing. */}
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className="absolute top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-300 md:-right-11 md:flex"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ScrollGlowGroup>


      {/*
        Hairline bracket joining the three stages to the card below, so the
        over-deduction reads as a consequence of the flow rather than a new
        subject. It mirrors the card row's own grid, same columns and same gap,
        which is what keeps the drops on the card centres.

        Desktop only. Below `md` the stages are already stacked in a single
        column, where a merging bracket would have nothing to merge.
      */}
      <div aria-hidden className="hidden h-10 md:grid md:grid-cols-3 md:gap-16">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative">
            {/* Drop from the card above. */}
            <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-slate-400" />
            {/* The joining rule, in three segments rather than one absolute span:
                each segment lives in its own grid cell and reaches `-left-10` /
                `-right-10` into the gaps, so the bracket stays welded to the card
                centres whatever the gap is. The -16 must match md:gap-16 on this
                grid and on the row of cards above. */}
            <span
              className={`absolute top-5 h-px bg-slate-400 ${
                i === 0 ? "-right-16 left-1/2" : i === 1 ? "-left-16 -right-16" : "-left-16 right-1/2"
              }`}
            />
            {/* Stem down into the card below. */}
            {i === 1 && <span className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-slate-400" />}
          </div>
        ))}
      </div>
      {/*
        Cards four and five each carry their own trigger rather than joining the
        row's group above. They sit below the fold on most screens, so a single
        five-child sequence would burn their glow while they were still off
        screen: the effect has to happen where the reader can see it.

        The 0.35s delay is half the row's stagger. It gives each card a beat
        after it arrives before it lights, so the five read as one continuing
        sequence instead of two glows firing the instant they appear.
      */}
      <ScrollGlowGroup delay={0.35} className="mt-5 sm:mt-6 md:mt-0">
        <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            But the 20% is not worked out on your profit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            The agent nets off only the costs that passed through their hands. Everything else is invisible to them.
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-900">
            So a landlord with borrowing has far too much taken, and only gets it back through a UK return.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Deducted before the 20%
              </p>
              <ul className="mt-3 space-y-2">
                {COUNTED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-2 border-slate-300 pl-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Not deducted</p>
              <ul className="mt-3 space-y-2">
                {NOT_COUNTED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollGlowGroup>

      {/* Stem on to the fix. Unlike the bracket above it this one is a single
          line between two full-width cards, so it holds up at every width and
          is not hidden below md. It replaces the card's top margin rather than
          adding to it. */}
      <div aria-hidden className="relative h-10">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-400" />
      </div>

      <ScrollGlowGroup delay={0.35}>
        <div className="rounded-xl bg-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
          <h3 className="text-base sm:text-lg font-bold text-emerald-900">
            The fix: approval to receive your rent gross
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-emerald-900/80">
            It does not reduce the tax you owe. It stops the cash being taken a year early, from a figure that was
            never right in the first place.
          </p>
        </div>
      </ScrollGlowGroup>
    </div>
  );
}
