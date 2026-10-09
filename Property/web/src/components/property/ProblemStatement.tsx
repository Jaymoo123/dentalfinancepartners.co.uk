import Link from "next/link";
import {
  BarChart3,
  Building2,
  CalendarClock,
  PoundSterling,
  TrendingUp,
  UserX,
} from "lucide-react";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";
import { PromptMarquee, type Prompt } from "./PromptMarquee";

/**
 * Homepage self-identification module. Sits between the MTD countdown and the
 * "Who we are" intro so the page reads problem -> cause -> who fixes it.
 *
 * Two-column: the argument sits on the left, the prompts scroll continuously on
 * the right (vertical marquee, styles in globals.css).
 *
 * The prompts are first-person on purpose: a reader skims past a described
 * problem but stops on a sentence they would actually say. They are deliberately
 * UNATTRIBUTED and must stay that way — no names, initials, avatars or portfolio
 * details. They are self-identification cues, not testimonials, and the moment
 * they carry an attribution they read as invented client quotes.
 */
// `tag` names the technical issue behind the worry. It does the quiet work of the
// module: the reader arrives with a vague complaint and leaves knowing it has a
// name — and that we knew the name.
// `tag` states the problem in the reader's own words rather than naming the tax
// topic, so the card is recognisable before any jargon is understood. The quote
// underneath then supplies the detail. Icons deliberately match the glyph the
// homepage services grid uses for the same topic (Section 24 -> BarChart3, MTD ->
// CalendarClock, incorporation -> Building2), so a concept keeps one symbol. For
// topics absent from that grid, the glyph follows essential-guides.ts instead
// (CGT -> TrendingUp).
//
// Keep the count EVEN. The zigzag offset below alternates on index, so an odd
// set flips the pattern where the duplicated loop joins and the seam shows.

const prompts: Prompt[] = [
  {
    tag: "I don't understand Section 24",
    text: "My tax bill jumped and no one explained why.",
    icon: BarChart3,
  },
  {
    tag: "I have the wrong adviser",
    text: "My accountant files my return but has never once mentioned Section 24.",
    icon: UserX,
  },
  {
    tag: "Should I incorporate?",
    text: "Everyone says put it in a limited company. Nobody will tell me if that's right for me.",
    icon: Building2,
  },
  {
    tag: "Does MTD apply to me?",
    text: "I've had a letter about Making Tax Digital and I don't know if it applies to me.",
    icon: CalendarClock,
  },
  {
    tag: "I've just sold a property",
    text: "Someone mentioned a 60-day deadline for the tax. I don't know if I've missed it.",
    icon: TrendingUp,
  },
  {
    tag: "I might be overpaying",
    text: "I don't know if I'm overpaying, and I don't know how I'd find out.",
    icon: PoundSterling,
  },
];

export function ProblemStatement() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: the argument */}
          <div>
            <Eyebrow>Sound familiar?</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
              Your rent went up. Your profit didn&apos;t.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              Since April 2020 you can no longer deduct mortgage interest from rental income. Most
              landlords felt the tax bill rise without ever being told why, or whether theirs was
              even calculated correctly.
            </p>
            <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
              If two or more of these sound like you, you&apos;re not disorganised: you&apos;re using
              a generalist for a specialist job.
            </p>
            <Link
              href="/contact"
              data-cta="problem_book"
              data-cta-placement="problem_statement"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
            >
              Book free consultation
            </Link>
          </div>

          {/* Right: prompts on a continuous vertical loop */}
          <PromptMarquee prompts={prompts} />
        </div>
      </div>
    </section>
  );
}
