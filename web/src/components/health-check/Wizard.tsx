"use client";

import { useMemo, useState } from "react";
import {
  AGENCY_TYPE_OPTIONS,
  CONTRACTOR_OPTIONS,
  ENTITY_OPTIONS,
  EXIT_OPTIONS,
  INTERNATIONAL_OPTIONS,
  RD_OPTIONS,
  REVENUE_BAND_OPTIONS,
} from "@/lib/health-check/questions";
import type {
  AgencyType,
  ContractorUse,
  Entity,
  ExitHorizon,
  International,
  RdActivity,
  RevenueBand,
} from "@/lib/health-check/types";

type Answers = {
  name: string;
  email: string;
  company: string;
  agencyType: AgencyType | "";
  revenueBand: RevenueBand | "";
  entity: Entity | "";
  profitPreTax: number;
  currentSalary: number;
  currentDividend: number;
  rdActivity: RdActivity | "";
  contractorUse: ContractorUse | "";
  international: International[];
  exitHorizon: ExitHorizon | "";
  topConcern: string;
};

const INITIAL: Answers = {
  name: "",
  email: "",
  company: "",
  agencyType: "",
  revenueBand: "",
  entity: "",
  profitPreTax: 0,
  currentSalary: 0,
  currentDividend: 0,
  rdActivity: "",
  contractorUse: "",
  international: [],
  exitHorizon: "",
  topConcern: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = {
  submissionId: string;
  topThreeTitles: string[];
  counts: { high: number; medium: number; low: number; info: number };
};

export function HealthCheckWizard() {
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step, totalSteps]);

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setA((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function toggleInternational(v: International) {
    setA((prev) => ({
      ...prev,
      international: prev.international.includes(v)
        ? prev.international.filter((x) => x !== v)
        : [...prev.international, v],
    }));
  }

  function canAdvance(): string | null {
    if (step === 1) {
      if (!a.name.trim()) return "Add your name";
      if (!EMAIL_RE.test(a.email)) return "Valid email is required";
      return null;
    }
    if (step === 2) {
      if (!a.agencyType) return "Pick an agency type";
      if (!a.revenueBand) return "Pick a revenue band";
      return null;
    }
    if (step === 3) {
      if (!a.entity) return "Pick your entity structure";
      return null;
    }
    if (step === 4) {
      if (!a.rdActivity) return "Tell us about R&D activity";
      if (!a.contractorUse) return "Tell us about contractor use";
      return null;
    }
    if (step === 5) {
      if (!a.exitHorizon) return "Pick an exit horizon";
      return null;
    }
    return null;
  }

  function next() {
    const err = canAdvance();
    if (err) {
      setError(err);
      return;
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    const err = canAdvance();
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/health-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Submission failed");
      }
      const data = (await res.json()) as Result & { ok: true };
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          Health check complete
        </p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          Your report is on its way.
        </h3>
        <p className="mt-3 text-slate-700">
          We&rsquo;ve emailed your personalised Agency Finance Health Check as a
          PDF to <strong>{a.email}</strong>. It usually arrives within a minute —
          check spam if it doesn&rsquo;t.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Priority" value={result.counts.high} tone="high" />
          <Stat label="Notable" value={result.counts.medium} tone="medium" />
          <Stat label="Tweaks" value={result.counts.low} tone="low" />
          <Stat label="FYI" value={result.counts.info} tone="info" />
        </div>

        {result.topThreeTitles.length > 0 && (
          <div className="mt-8">
            <h4 className="text-base font-bold text-slate-900">
              Top items we&rsquo;d look at first
            </h4>
            <ul className="mt-3 space-y-2">
              {result.topThreeTitles.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span className="text-slate-700">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href="/contact"
          className="mt-8 inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Book a 60-minute call to talk through it
        </a>
        <p className="mt-3 text-xs text-slate-500">
          Reference: {result.submissionId}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-indigo-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 space-y-5">
        {step === 1 && <Step1 a={a} update={update} />}
        {step === 2 && <Step2 a={a} update={update} />}
        {step === 3 && <Step3 a={a} update={update} />}
        {step === 4 && <Step4 a={a} update={update} />}
        {step === 5 && <Step5 a={a} update={update} toggleInternational={toggleInternational} />}
        {step === 6 && <Step6 a={a} />}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 1 || submitting}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Back
        </button>
        {step < totalSteps ? (
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Generating report…" : "Get my health check"}
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Editorial: this report is generated from your inputs and is directional
        only. Not personalised tax advice.
      </p>
    </div>
  );
}

// ─── Step components ───────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-900">{children}</label>;
}

const inputCls =
  "mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

function Step1({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">First, about you</h3>
      <div>
        <Label>Your name</Label>
        <input
          type="text"
          autoComplete="name"
          value={a.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
          placeholder="Alex Smith"
        />
      </div>
      <div>
        <Label>Email</Label>
        <input
          type="email"
          autoComplete="email"
          value={a.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputCls}
          placeholder="alex@youragency.com"
        />
      </div>
      <div>
        <Label>Company name (optional)</Label>
        <input
          type="text"
          autoComplete="organization"
          value={a.company}
          onChange={(e) => update("company", e.target.value)}
          className={inputCls}
          placeholder="Smith Creative Ltd"
        />
      </div>
    </>
  );
}

function Step2({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">Your agency</h3>
      <div>
        <Label>Agency type</Label>
        <select
          value={a.agencyType}
          onChange={(e) => update("agencyType", e.target.value as AgencyType)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {AGENCY_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Annual revenue band</Label>
        <select
          value={a.revenueBand}
          onChange={(e) => update("revenueBand", e.target.value as RevenueBand)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {REVENUE_BAND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function Step3({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">Structure &amp; numbers</h3>
      <div>
        <Label>Entity structure</Label>
        <select
          value={a.entity}
          onChange={(e) => update("entity", e.target.value as Entity)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {ENTITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Profit before tax — last full year (£)</Label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          value={a.profitPreTax || ""}
          onChange={(e) => update("profitPreTax", Math.max(0, parseInt(e.target.value || "0", 10) || 0))}
          className={inputCls}
          placeholder="e.g. 120000"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Salary you pay yourself (£/year)</Label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={a.currentSalary || ""}
            onChange={(e) => update("currentSalary", Math.max(0, parseInt(e.target.value || "0", 10) || 0))}
            className={inputCls}
            placeholder="e.g. 12570"
          />
        </div>
        <div>
          <Label>Dividends you take (£/year)</Label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={a.currentDividend || ""}
            onChange={(e) => update("currentDividend", Math.max(0, parseInt(e.target.value || "0", 10) || 0))}
            className={inputCls}
            placeholder="e.g. 50000"
          />
        </div>
      </div>
    </>
  );
}

function Step4({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">Activity</h3>
      <div>
        <Label>How much R&amp;D-style work do you do?</Label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RD_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              name="rd"
              checked={a.rdActivity === o.value}
              onChange={() => update("rdActivity", o.value)}
              label={o.label}
              helper={o.helper}
            />
          ))}
        </div>
      </div>
      <div>
        <Label>Do you use contractors / freelancers?</Label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CONTRACTOR_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              name="contractors"
              checked={a.contractorUse === o.value}
              onChange={() => update("contractorUse", o.value)}
              label={o.label}
              helper={o.helper}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Step5({
  a,
  update,
  toggleInternational,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  toggleInternational: (v: International) => void;
}) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">International &amp; exit</h3>
      <div>
        <Label>Client / location mix (tick all that apply)</Label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INTERNATIONAL_OPTIONS.map((o) => (
            <CheckCard
              key={o.value}
              checked={a.international.includes(o.value)}
              onChange={() => toggleInternational(o.value)}
              label={o.label}
            />
          ))}
        </div>
      </div>
      <div>
        <Label>Exit horizon</Label>
        <select
          value={a.exitHorizon}
          onChange={(e) => update("exitHorizon", e.target.value as ExitHorizon)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {EXIT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Anything you specifically want us to look at? (optional)</Label>
        <textarea
          value={a.topConcern}
          onChange={(e) => update("topConcern", e.target.value)}
          rows={3}
          maxLength={1000}
          className={inputCls}
          placeholder="e.g. I think my salary–dividend split is wrong, or I'm not sure if R&D applies, or I'm thinking about Dubai…"
        />
      </div>
    </>
  );
}

function Step6({ a }: { a: Answers }) {
  return (
    <>
      <h3 className="text-xl font-bold text-slate-900">Review</h3>
      <p className="text-sm text-slate-600">
        Last check before we generate. We&rsquo;ll email the PDF to{" "}
        <strong>{a.email}</strong>.
      </p>
      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <ReviewRow label="Name" value={a.name} />
        <ReviewRow label="Email" value={a.email} />
        {a.company && <ReviewRow label="Company" value={a.company} />}
        <ReviewRow
          label="Agency type"
          value={AGENCY_TYPE_OPTIONS.find((o) => o.value === a.agencyType)?.label || ""}
        />
        <ReviewRow
          label="Revenue band"
          value={REVENUE_BAND_OPTIONS.find((o) => o.value === a.revenueBand)?.label || ""}
        />
        <ReviewRow
          label="Entity"
          value={ENTITY_OPTIONS.find((o) => o.value === a.entity)?.label || ""}
        />
        <ReviewRow label="Profit pre-tax" value={`£${a.profitPreTax.toLocaleString("en-GB")}`} />
        <ReviewRow label="Salary" value={`£${a.currentSalary.toLocaleString("en-GB")}`} />
        <ReviewRow label="Dividends" value={`£${a.currentDividend.toLocaleString("en-GB")}`} />
        <ReviewRow
          label="R&D activity"
          value={RD_OPTIONS.find((o) => o.value === a.rdActivity)?.label || ""}
        />
        <ReviewRow
          label="Contractors"
          value={CONTRACTOR_OPTIONS.find((o) => o.value === a.contractorUse)?.label || ""}
        />
        <ReviewRow
          label="International"
          value={
            a.international.length
              ? a.international
                  .map((v) => INTERNATIONAL_OPTIONS.find((o) => o.value === v)?.label || v)
                  .join(", ")
              : "—"
          }
        />
        <ReviewRow
          label="Exit horizon"
          value={EXIT_OPTIONS.find((o) => o.value === a.exitHorizon)?.label || ""}
        />
      </dl>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 py-1.5">
      <span className="text-slate-500">{label}</span>
      <span className="text-right text-slate-900 font-medium">{value || "—"}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "high" | "medium" | "low" | "info";
}) {
  const tones = {
    high: "border-red-200 bg-red-50 text-red-900",
    medium: "border-amber-200 bg-amber-50 text-amber-900",
    low: "border-emerald-200 bg-emerald-50 text-emerald-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  };
  return (
    <div className={`rounded-md border p-3 ${tones[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function RadioCard({
  name,
  checked,
  onChange,
  label,
  helper,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  helper: string;
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col rounded-md border p-3 transition-colors ${
        checked
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-indigo-600"
        />
        <span className="text-sm font-semibold text-slate-900">{label}</span>
      </span>
      <span className="mt-1 pl-6 text-xs text-slate-600">{helper}</span>
    </label>
  );
}

function CheckCard({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 transition-colors ${
        checked
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600"
      />
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </label>
  );
}
