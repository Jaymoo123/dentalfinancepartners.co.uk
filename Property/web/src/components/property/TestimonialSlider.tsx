"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "They helped me understand whether incorporation made sense for my 6-property portfolio. The feasibility analysis showed it would take 4 years to break even — so we decided to wait. That honest advice saved me £30k in upfront costs.",
    author: "Sarah Mitchell",
    role: "Portfolio owner, 6 properties",
    outcome: "Saved £30k by NOT incorporating",
    initials: "SM",
  },
  {
    quote:
      "I was completely unprepared for MTD. They set me up with the right software, explained quarterly reporting, and made sure I was compliant before the April deadline. No stress, no penalties.",
    author: "David Chen",
    role: "Individual landlord, 3 properties",
    outcome: "MTD-ready 2 months early",
    initials: "DC",
  },
  {
    quote:
      "The property-by-property profitability reports showed me that two of my properties were barely breaking even after all costs. I refinanced one and sold the other. Much clearer picture now.",
    author: "Emma Thompson",
    role: "Portfolio owner, 8 properties",
    outcome: "Improved portfolio yield by 1.8%",
    initials: "ET",
  },
  {
    quote:
      "Section 24 was costing me £6,400 a year. They modeled incorporation properly — including CGT and SDLT — and it made financial sense. Three years in, I'm already £12k better off.",
    author: "James Patterson",
    role: "Portfolio owner, 12 properties",
    outcome: "Saved £6,400/year after incorporating",
    initials: "JP",
  },
  {
    quote:
      "As a non-resident landlord, the tax rules are complex. They handled my Self Assessment, sorted out my UK tax position, and made sure I was claiming everything I should. Clear, responsive, and property-focused.",
    author: "Maria Rodriguez",
    role: "Non-resident landlord, 4 properties",
    outcome: "Compliant and optimized",
    initials: "MR",
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
      <div className="border-l-4 border-emerald-600 bg-white p-8">
        <blockquote className="text-lg leading-relaxed text-slate-700">
          &ldquo;{currentTestimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-emerald-600 text-lg font-bold text-white">
            {currentTestimonial.initials}
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{currentTestimonial.author}</div>
            <div className="mt-1 text-sm text-slate-600">{currentTestimonial.role}</div>
          </div>
        </div>
        {currentTestimonial.outcome && (
          <div className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 px-4 py-3">
            <span className="text-sm font-bold text-emerald-900">Result: {currentTestimonial.outcome}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
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
              className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
                idx === currentIndex ? "bg-emerald-600 scale-125" : "bg-slate-300 hover:bg-slate-400"
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
