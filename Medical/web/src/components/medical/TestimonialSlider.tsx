"use client";

import { useState, useEffect } from "react";

// Anonymised social proof only. Estate rule for the niche lead-gen sites: no
// named clients, no invented figures, no attributed outcome statistics. These
// are situation summaries describing the kind of work, written in the third
// person, not quotes attributed to a person.
const testimonials = [
  {
    quote:
      "A GP partner arrives with an NHSBSA pension savings statement they have not opened, on the assumption that an annual allowance charge is unavoidable. The first job is checking the pension input amount against the actual pensionable pay, because mid-year pay changes and scheme section moves are a known source of error, and then testing carry-forward from the three previous years before anyone reaches for a Scheme Pays election.",
    role: "Typical GP partner engagement",
    outcome: "NHS Pension annual allowance",
    initials: "GP",
  },
  {
    quote:
      "A locum doctor has been filing self-assessment alone and has never claimed the full set: GMC retention, MDU, MPS or MDDUS indemnity, professional subscriptions, mileage between separate engagements, CPD, and equipment. The review covers the current year and the two before it, and where the under-claim is material an amendment is filed rather than left.",
    role: "Typical locum engagement",
    outcome: "Expense claims and self-assessment",
    initials: "LD",
  },
  {
    quote:
      "A practice changes its partner mix mid-year, so the profit share is not the same before and after, notional rent and reimbursed expenses have to be allocated consistently, and every partner's individual return has to agree with the partnership return. Coordinating the practice accounts and the individual returns as one piece of work is what stops the same income being counted twice.",
    role: "Typical GP practice engagement",
    outcome: "Partnership accounts and profit allocation",
    initials: "PA",
  },
  {
    quote:
      "A salaried GP is offered a partnership and wants to know what it means financially before signing: the capital buy-in and how it is funded, the shift from PAYE to self-employment and payments on account, the change in superannuation tier, and what the profit share is likely to be after tax rather than before it. The point of the modelling is to make the decision on numbers rather than on the headline share.",
    role: "Typical partnership buy-in review",
    outcome: "Salaried GP to partner modelling",
    initials: "BI",
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
      <div className="border-l-4 border-[var(--medical-teal)] bg-white p-8">
        <p className="text-lg leading-relaxed text-slate-700">{currentTestimonial.quote}</p>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--medical-teal)] text-lg font-bold text-white" aria-hidden>
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.role}</div>
            <div className="mt-1 text-sm text-slate-600">Anonymised. No client is named and no figures are attributed.</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-[var(--medical-teal)] bg-[var(--medical-teal)]/5 px-4 py-3">
            <span className="text-sm font-bold text-[var(--medical-teal)]">
              Area: {currentTestimonial.outcome}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--medical-teal)] focus:ring-offset-2"
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
              className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--medical-teal)] focus:ring-offset-2 ${
                idx === currentIndex ? "scale-125 bg-[var(--medical-teal)]" : "bg-slate-300 hover:bg-slate-400"
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
