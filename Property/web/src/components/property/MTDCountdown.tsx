"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function MTDCountdown() {
  const [daysUntilMTD, setDaysUntilMTD] = useState<number | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const mtdDate = new Date("2026-04-06");
    const today = new Date();
    const diffTime = mtdDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilMTD(diffDays);

    const dismissed = localStorage.getItem("mtd-countdown-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("mtd-countdown-dismissed", "true");
  };

  if (isDismissed || daysUntilMTD === null || daysUntilMTD < 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-6 bg-slate-900 p-6 border-l-4 border-emerald-600">
      <div className="flex flex-1 items-center gap-6">
        <div className="flex flex-col items-center bg-emerald-600 px-8 py-4 min-w-[120px]">
          <div className="text-5xl font-bold text-white font-mono leading-none">{daysUntilMTD}</div>
          <div className="mt-2 text-xs font-bold text-emerald-100 uppercase tracking-wider">Days</div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">Making Tax Digital starts 6 April 2026</h3>
          <p className="mt-2 text-sm text-slate-200">
            Quarterly digital reporting becomes mandatory for landlords earning £50k+. Are you ready?{" "}
            <Link href="#mtd" className="font-bold text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
              Check if you're affected
            </Link>
          </p>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-white"
        aria-label="Dismiss MTD countdown"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
