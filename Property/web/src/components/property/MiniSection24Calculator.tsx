"use client";

import { useState } from "react";
import Link from "next/link";

export function MiniSection24Calculator() {
  const [rentalIncome, setRentalIncome] = useState(50000);
  const [mortgageInterest, setMortgageInterest] = useState(20000);

  const taxRate = 0.40;
  const oldSystemTax = (rentalIncome - mortgageInterest) * taxRate;
  const section24Tax = rentalIncome * taxRate - mortgageInterest * 0.20;
  const extraTax = section24Tax - oldSystemTax;

  return (
    <div className="calculator-preview">
      <h3>Quick Section 24 Impact Check</h3>
      <p className="mb-4 text-sm text-slate-600">
        See how much extra tax you are paying as a higher-rate taxpayer
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="mini-rental" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Rental Income
          </label>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-700">£</span>
            <input
              id="mini-rental"
              type="number"
              min="0"
              step="5000"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(Number(e.target.value))}
              className="w-full rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-base font-medium text-slate-900 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="mini-mortgage" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Mortgage Interest
          </label>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-700">£</span>
            <input
              id="mini-mortgage"
              type="number"
              min="0"
              step="5000"
              value={mortgageInterest}
              onChange={(e) => setMortgageInterest(Number(e.target.value))}
              className="w-full rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-base font-medium text-slate-900 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-red-50 p-4 text-center">
          <div className="text-sm font-semibold uppercase tracking-wide text-red-800">Extra Tax Per Year</div>
          <div className="mt-2 font-mono text-4xl font-bold text-red-600">
            +£{extraTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-1 text-xs text-red-700">Due to Section 24 restriction</div>
        </div>
      </div>

      <Link
        href="/calculators#section-24"
        className="mt-4 block rounded-md bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-md"
      >
        View full calculator →
      </Link>
    </div>
  );
}
