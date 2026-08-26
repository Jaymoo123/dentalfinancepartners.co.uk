"use client";

import { useState, useEffect } from "react";

// Anonymised social proof only. Estate rule for the niche lead-gen sites: no
// named clients, no invented figures, no attributed outcome statistics. These
// are situation summaries describing the kind of work, written in the third
// person, not quotes attributed to a person.
const testimonials = [
  {
    quote:
      "A firm treats the SRA Accounts Rules as a year-end exercise and finds the accountant's report stressful as a result. Moving client account reconciliations to a monthly rhythm, with residual balances and unallocated receipts cleared as they arise rather than at the deadline, is what turns the annual report into a check on work already done.",
    role: "Typical firm compliance engagement",
    outcome: "SRA Accounts Rules and client money",
    initials: "SR",
  },
  {
    quote:
      "A partnership wants its profit allocation reviewed. The work covers how fixed shares, drawings and reserves interact, the National Insurance position of salaried versus equity members, and whether an LLP or corporate structure fits the firm, with the answer depending on the partner mix rather than on a general rule.",
    role: "Typical partnership structure review",
    outcome: "Profit allocation and partner structure",
    initials: "PA",
  },
  {
    quote:
      "A sole practitioner needs the practice accounts and the personal tax position handled as one piece of work rather than two. Drawings, the payments on account cycle, pension contributions and the client account position all move together, and looking at any one of them in isolation tends to produce a decision that costs money elsewhere.",
    role: "Typical sole practitioner engagement",
    outcome: "Practice accounts and personal tax",
    initials: "SP",
  },
  {
    quote:
      "A firm converting from a general partnership to an LLP has more to sequence than the incorporation itself: the tax consequences of the transfer, the SRA notification and authorisation steps, and the client account transfer procedures, which have to be planned in order because getting the client money step wrong is the one that carries regulatory consequences.",
    role: "Typical LLP conversion engagement",
    outcome: "Partnership to LLP conversion",
    initials: "LC",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative">
      <div className="border-l-4 border-[var(--primary)] bg-white p-8">
        <p className="text-lg leading-relaxed text-slate-700">{currentTestimonial.quote}</p>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--primary)] text-lg font-bold text-white" aria-hidden>
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.role}</div>
            <div className="mt-1 text-sm text-slate-600">Anonymised. No client is named and no figures are attributed.</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 px-4 py-3">
            <span className="text-sm font-bold text-[var(--primary)]">Area: {currentTestimonial.outcome}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
          aria-label={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
          type="button"
        >
          {isPaused ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPaused(true);
              }}
              className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
                idx === currentIndex ? "scale-125 bg-[var(--primary)]" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === currentIndex ? "true" : "false"}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
