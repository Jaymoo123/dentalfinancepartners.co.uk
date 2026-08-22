import type { LucideIcon } from "lucide-react";

/**
 * A column of first-person prompts on a continuous vertical loop.
 *
 * Lifted out of `ProblemStatement` so the homepage and the service pages share
 * one implementation instead of two that drift. The motion is pure CSS
 * (`marquee-y` in globals.css): it pauses on hover and keyboard focus, and under
 * prefers-reduced-motion the column becomes an ordinary scroll area. Nothing
 * here ships JavaScript.
 *
 * The prompts are first-person on purpose: a reader skims past a described
 * problem but stops on a sentence they would actually say. They are deliberately
 * UNATTRIBUTED and must stay that way — no names, initials, avatars or portfolio
 * details. They are self-identification cues, not testimonials, and the moment
 * they carry an attribution they read as invented client quotes.
 *
 * Keep any prompt set EVEN in length. The zigzag offset alternates on index, so
 * an odd set flips the pattern where the duplicated loop joins and the seam
 * shows.
 */

export type Prompt = { tag: string; text: string; icon: LucideIcon };

/**
 * Card surface, which has to contrast with the section behind it. The fades are
 * a mask rather than a gradient, so the viewport itself is ground-agnostic and
 * this is the only thing that needs to know.
 */
type Tone = "white" | "slate";

function PromptCard({
  tag,
  text,
  icon: Icon,
  index,
  tone,
}: Prompt & { index: number; tone: Tone }) {
  // Gentle zigzag so the column reads as movement rather than a stack of boxes.
  const offset = index % 2 === 0 ? "lg:mr-8" : "lg:ml-8";
  return (
    // Neutral card on purpose: red names the problem, emerald is reserved for the
    // answer alongside, and the card itself stays out of the argument.
    <li
      className={`rounded-xl border border-slate-200 p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6 ${
        tone === "slate" ? "bg-slate-50" : "bg-white"
      } ${offset}`}
    >
      <div className="flex gap-4">
        {/* Red, not brand emerald: these cards name the problem, and the section's
            emerald belongs to the answer. red-600 is the existing --destructive
            token, so it is not a new colour on the site. */}
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
          <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          {/* Sentence case, not uppercase: these are full sentences, and uppercase
              at this length reads as shouting and slows scanning. */}
          <span className="block text-sm font-bold leading-snug text-red-700 sm:text-base">{tag}</span>
          <p className="mt-2 text-base italic leading-relaxed text-slate-700 sm:text-lg">
            &ldquo;{text}&rdquo;
          </p>
        </div>
      </div>
    </li>
  );
}

export function PromptMarquee({ prompts, tone = "white" }: { prompts: Prompt[]; tone?: Tone }) {
  return (
    <div
      // Height is tuned to show ~3 cards: roughly 3 card heights plus the gaps
      // between them. If the quote type size changes, retune this.
      className="marquee-viewport relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[480px]"
      // Short fade zones: a long one leaves cards hovering half-transparent at the
      // edges, which reads as an empty card rather than a card leaving.
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      <div className="marquee-track">
        <ul className="mb-4 flex flex-col gap-4">
          {prompts.map((prompt, i) => (
            <PromptCard key={prompt.tag} {...prompt} index={i} tone={tone} />
          ))}
        </ul>
        {/* Duplicate set completes the seamless loop; hidden from AT so the
            prompts are not announced twice. */}
        <ul aria-hidden className="mb-4 flex flex-col gap-4">
          {prompts.map((prompt, i) => (
            <PromptCard key={prompt.tag} {...prompt} index={i} tone={tone} />
          ))}
        </ul>
      </div>
    </div>
  );
}
