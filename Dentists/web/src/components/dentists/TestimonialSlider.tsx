"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "They handled my transition from associate to practice owner — from the bank loan projections to the acquisition due diligence. The tax structuring alone saved me £18k in the first year.",
    author: "Dr. Rachel Green",
    role: "Practice owner (2 surgeries)",
    outcome: "Saved £18k in Year 1",
    initials: "RG",
  },
  {
    quote:
      "My previous accountant didn't understand NHS contracts at all. These specialists caught £4,200 in overclaimed UDAs I hadn't spotted, and helped me plan the right associate splits.",
    author: "Dr. Michael Patel",
    role: "NHS practice owner",
    outcome: "Recovered £4,200 in UDA adjustments",
    initials: "MP",
  },
  {
    quote:
      "As an associate, I was paying too much tax because nobody told me I could claim equipment, training, and indemnity costs. They got me a £2,800 refund for the previous two years.",
    author: "Dr. Sophie Taylor",
    role: "Associate dentist",
    outcome: "£2,800 tax refund claimed",
    initials: "ST",
  },
  {
    quote:
      "The practice benchmarking reports showed our lab costs were 4% above average. We renegotiated and saved £8k a year — more than their annual fee.",
    author: "Dr. Andrew Kim",
    role: "Practice owner (3 surgeries)",
    outcome: "Lab cost savings of £8k/year",
    initials: "AK",
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
                idx === currentIndex ? "bg-[var(--primary)] scale-125" : "bg-slate-300 hover:bg-slate-400"
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
