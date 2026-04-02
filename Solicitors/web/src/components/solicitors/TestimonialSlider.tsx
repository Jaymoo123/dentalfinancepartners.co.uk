"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Our SRA accountant's report was always stressful with our old firm. These specialists handle client money reconciliations monthly, so year-end is straightforward. No surprises, no compliance risks.",
    author: "Catherine Hargreaves",
    role: "Managing Partner (12-partner firm)",
    outcome: "Clean SRA reports for 3 consecutive years",
    initials: "CH",
  },
  {
    quote:
      "They restructured our partnership profit allocation and saved the firm £35k in NI contributions. Plus the Basis Period Reform transition was seamless — they had us prepared a year early.",
    author: "David Richardson",
    role: "Senior Partner",
    outcome: "£35k NI savings through restructuring",
    initials: "DR",
  },
  {
    quote:
      "As a sole practitioner, I needed someone who understood both my practice accounts and personal tax planning. They handle everything and the fixed fee means no surprises.",
    author: "Sarah Blackwell",
    role: "Sole Practitioner",
    outcome: "Complete practice + personal tax management",
    initials: "SB",
  },
  {
    quote:
      "When we converted from partnership to LLP, they handled the entire process — tax implications, SRA notifications, client money transfer procedures. It was completely painless.",
    author: "Mark Jenkins",
    role: "Partner (6-partner firm)",
    outcome: "Seamless LLP conversion",
    initials: "MJ",
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
        <blockquote className="text-lg leading-relaxed text-slate-700">
          &ldquo;{currentTestimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--primary)] text-lg font-bold text-white">
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.author}</div>
            <div className="mt-1 text-sm text-slate-600">{currentTestimonial.role}</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 px-4 py-3">
            <span className="text-sm font-bold text-[var(--primary)]">Result: {currentTestimonial.outcome}</span>
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
