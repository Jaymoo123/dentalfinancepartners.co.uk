"use client";

import { useState } from "react";

export function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [mortgageInterest, setMortgageInterest] = useState(7200);
  const [insurance, setInsurance] = useState(400);
  const [maintenance, setMaintenance] = useState(1200);
  const [managementFees, setManagementFees] = useState(0);
  const [otherCosts, setOtherCosts] = useState(500);

  const annualRent = monthlyRent * 12;
  const totalExpenses = mortgageInterest + insurance + maintenance + managementFees + otherCosts;
  const netProfit = annualRent - totalExpenses;
  
  const grossYield = (annualRent / propertyValue) * 100;
  const netYield = (netProfit / propertyValue) * 100;
  
  const monthlyCashFlow = netProfit / 12;

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--ink)] transition-colors focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20";
  const labelClass = "block text-sm font-semibold text-[var(--navy)]";

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-serif text-2xl font-semibold text-[var(--navy)]">Rental Yield Calculator</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Calculate gross yield, net yield, and monthly cash flow for your rental property.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="property-value-yield" className={labelClass}>
            Property value
          </label>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-lg font-medium text-[var(--navy)]">£</span>
            <input
              id="property-value-yield"
              type="number"
              min="0"
              step="10000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="monthly-rent" className={labelClass}>
            Monthly rent
          </label>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-lg font-medium text-[var(--navy)]">£</span>
            <input
              id="monthly-rent"
              type="number"
              min="0"
              step="100"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>

        <div className="rounded-lg bg-[var(--surface)] p-4">
          <h4 className="text-sm font-semibold text-[var(--navy)]">Annual expenses</h4>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="mortgage-interest-yield" className={labelClass}>
                Mortgage interest
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">£</span>
                <input
                  id="mortgage-interest-yield"
                  type="number"
                  min="0"
                  step="500"
                  value={mortgageInterest}
                  onChange={(e) => setMortgageInterest(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="insurance-yield" className={labelClass}>
                Insurance
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">£</span>
                <input
                  id="insurance-yield"
                  type="number"
                  min="0"
                  step="100"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="maintenance-yield" className={labelClass}>
                Maintenance & repairs
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">£</span>
                <input
                  id="maintenance-yield"
                  type="number"
                  min="0"
                  step="100"
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="management-fees" className={labelClass}>
                Management fees
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">£</span>
                <input
                  id="management-fees"
                  type="number"
                  min="0"
                  step="100"
                  value={managementFees}
                  onChange={(e) => setManagementFees(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="other-costs" className={labelClass}>
                Other costs (ground rent, service charge, etc.)
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--navy)]">£</span>
                <input
                  id="other-costs"
                  type="number"
                  min="0"
                  step="100"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4 rounded-xl bg-[var(--surface)] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs font-medium text-[var(--muted)]">Annual rental income</div>
            <div className="mt-1 font-mono text-lg font-semibold text-[var(--navy)]">
              £{annualRent.toLocaleString("en-GB")}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-[var(--muted)]">Total annual expenses</div>
            <div className="mt-1 font-mono text-lg font-semibold text-[var(--navy)]">
              £{totalExpenses.toLocaleString("en-GB")}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-xs font-medium text-[var(--muted)]">Gross yield</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[var(--navy)]">
                {grossYield.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-[var(--muted)]">Net yield</div>
              <div
                className={`mt-1 font-mono text-2xl font-bold ${
                  netYield >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {netYield.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-[var(--muted)]">Monthly cash flow</div>
              <div
                className={`mt-1 font-mono text-2xl font-bold ${
                  monthlyCashFlow >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                £{monthlyCashFlow.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
        <p className="font-semibold">Understanding yield:</p>
        <p className="mt-2">
          <strong>Gross yield</strong> = (Annual rent / Property value) × 100. This ignores all costs.
        </p>
        <p className="mt-2">
          <strong>Net yield</strong> = (Annual profit / Property value) × 100. This accounts for all expenses including mortgage interest, but excludes tax.
        </p>
        <p className="mt-2">
          Most landlords focus on net yield, as it reflects actual cash flow before tax. A good net yield for buy-to-let in 2026 is typically 3-5%, depending on location and property type.
        </p>
      </div>

      <div className="mt-6 text-center">
        <a
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--navy)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          Get portfolio profitability report
        </a>
      </div>
    </div>
  );
}
