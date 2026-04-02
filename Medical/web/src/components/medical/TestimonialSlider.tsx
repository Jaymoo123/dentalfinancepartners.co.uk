"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "They spotted that my NHS pension annual allowance was about to be breached. The restructuring they suggested saved me a £12,000 tax charge that my previous accountant had no idea about.",
    author: "Dr. James Harrison",
    role: "GP Partner (15 years)",
    outcome: "Avoided £12k pension tax charge",
    initials: "JH",
  },
  {
    quote:
      "As a locum, my tax situation was a mess. They sorted out my self-assessment, claimed all my travel and equipment expenses properly, and set me up with quarterly accounting. I got a £3,400 refund.",
    author: "Dr. Priya Sharma",
    role: "Locum GP",
    outcome: "£3,400 tax refund",
    initials: "PS",
  },
  {
    quote:
      "The partnership profit-sharing advice they gave us saved our 4-partner practice £22k in the first year. They understood the NHS structures our general accountant never did.",
    author: "Dr. Robert Williams",
    role: "GP Senior Partner",
    outcome: "Practice saved £22k in Year 1",
    initials: "RW",
  },
  {
    quote:
      "Moving from salaried to partnership was financially complex. They modeled every scenario — pension impact, tax bands, profit shares — so I knew exactly what I was signing up for.",
    author: "Dr. Helen Cooper",
    role: "New GP Partner",
    outcome: "Full financial clarity before partnership buy-in",
    initials: "HC",
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
        <blockquote className="text-lg leading-relaxed text-slate-700">
          &ldquo;{currentTestimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--medical-teal)] text-lg font-bold text-white">
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.author}</div>
            <div className="mt-1 text-sm text-slate-600">{currentTestimonial.role}</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-[var(--medical-teal)] bg-[var(--medical-teal)]/5 px-4 py-3">
            <span className="text-sm font-bold text-[var(--medical-teal)]">
              Result: {currentTestimonial.outcome}
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
