import Link from "next/link";
import type { ReactNode } from "react";
import { btnPrimary, siteContainerLg } from "../layout-utils";
import { Eyebrow } from "../primitives/page-blocks";

/**
 * Homepage self-identification module. Sits between the MTD countdown and the
 * "Who we are" intro so the page reads problem -> cause -> who fixes it.
 *
 * Two-column: the argument sits on the left, `marquee` renders on the right.
 * Property's own right column is a continuous vertical loop of first-person
 * prompts (`PromptMarquee` + the `marquee-y` keyframes in `globals.css`); both
 * the component and its prompt data are Property-only and outside
 * web-shared, so the caller builds that piece and passes the rendered result
 * in rather than this file importing it.
 */
export function ProblemStatement({
  marquee,
}: {
  /** Right-column content (e.g. a self-identification prompt list). Per-site;
   *  replaces Property's `<PromptMarquee prompts={prompts} />` — the
   *  `./PromptMarquee` component and its `Prompt` type both live outside
   *  web-shared (`Property/web/src/components/property/PromptMarquee.tsx`). */
  marquee: ReactNode;
}) {
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
              href="#book"
              data-cta="problem_book"
              data-cta-placement="problem_statement"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
            >
              Book free consultation
            </Link>
          </div>

          {/* Right: per-site slot, rendered at the exact position PromptMarquee occupied */}
          {marquee}
        </div>
      </div>
    </section>
  );
}
