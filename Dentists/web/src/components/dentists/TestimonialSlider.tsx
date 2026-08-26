"use client";

import { useState, useEffect } from "react";

// Anonymised social proof only. Estate rule for the niche lead-gen sites: no
// named clients, no invented figures, no attributed outcome statistics. These
// are situation summaries describing the kind of work, written in the third
// person, not quotes attributed to a person.
const testimonials = [
  {
    quote:
      "An associate decides to buy a practice and needs the numbers before the offer, not after it. That means projections a lender will actually accept, due diligence on the UDA contract and the recall base, and a view on whether the goodwill is bought personally or through a company, because the structure chosen at the start is expensive to unpick later.",
    role: "Typical associate to practice owner engagement",
    outcome: "Practice acquisition and structuring",
    initials: "PA",
  },
  {
    quote:
      "An NHS practice reaches the end of the contract year unsure whether its UDA delivery is where it thinks it is. The work is reconciling the schedule against the pension and superannuation deductions, checking prior-year adjustments and clawback exposure, and setting associate splits so the practice is not carrying a shortfall the associates created.",
    role: "Typical NHS practice engagement",
    outcome: "NHS contract and UDA reconciliation",
    initials: "NH",
  },
  {
    quote:
      "An associate dentist has been filing self-assessment alone and has never claimed the full set: GDC retention, indemnity, equipment and loupes, courses and CPD, and travel between separate practices. The review covers the current year and the two before it, and where the under-claim is material an amendment is filed rather than left.",
    role: "Typical associate engagement",
    outcome: "Expense claims and self-assessment",
    initials: "AD",
  },
  {
    quote:
      "A practice owner wants to know how the business compares before deciding what to change. Lab costs, materials, staff cost as a share of revenue and hourly chair yield are read together rather than one at a time, because a single line looking high is often a symptom of how the diary is being filled rather than a supplier problem.",
    role: "Typical practice benchmarking review",
    outcome: "Practice benchmarking and cost review",
    initials: "PB",
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
      <div className="border-l-4 border-[var(--gold)] bg-white p-8">
        <p className="text-lg leading-relaxed text-slate-700">{currentTestimonial.quote}</p>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--gold)] text-lg font-bold text-white" aria-hidden>
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.role}</div>
            <div className="mt-1 text-sm text-slate-600">Anonymised. No client is named and no figures are attributed.</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-[var(--gold)] bg-[var(--gold)]/5 px-4 py-3">
            <span className="text-sm font-bold text-[var(--gold)]">Area: {currentTestimonial.outcome}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2"
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
              className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 ${
                idx === currentIndex ? "bg-[var(--gold)] scale-125" : "bg-slate-300 hover:bg-slate-400"
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
