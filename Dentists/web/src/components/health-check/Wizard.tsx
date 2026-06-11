"use client";

import { useMemo, useState } from "react";
import {
  ACCOUNTANT_OPTIONS,
  ENTITY_OPTIONS,
  GOODWILL_OPTIONS,
  NHS_PENSION_OPTIONS,
  PRACTICE_TYPE_OPTIONS,
  ROLE_OPTIONS,
  UDA_BAND_OPTIONS,
} from "@/lib/health-check/questions";
import { runRules } from "@/lib/health-check/rules";
import type {
  AccountantSatisfaction,
  Entity,
  GoodwillPlans,
  HealthCheckAnswers,
  NhsPensionStatus,
  Opportunity,
  PracticeType,
  Role,
  UdaBand,
} from "@/lib/health-check/types";

type Answers = {
  name: string;
  email: string;
  practiceName: string;
  role: Role | "";
  practiceType: PracticeType | "";
  udaBand: UdaBand | "";
  associateCount: number;
  entity: Entity | "";
  profitPreTax: number;
  currentSalary: number;
  currentDividend: number;
  nhsPensionStatus: NhsPensionStatus | "";
  goodwillPlans: GoodwillPlans | "";
  accountantSatisfaction: AccountantSatisfaction | "";
  topConcern: string;
};

const INITIAL: Answers = {
  name: "",
  email: "",
  practiceName: "",
  role: "",
  practiceType: "",
  udaBand: "",
  associateCount: 0,
  entity: "",
  profitPreTax: 0,
  currentSalary: 0,
  currentDividend: 0,
  nhsPensionStatus: "",
  goodwillPlans: "",
  accountantSatisfaction: "",
  topConcern: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = {
  opportunities: Opportunity[];
  counts: { high: number; medium: number; low: number; info: number };
};

export function HealthCheckWizard() {
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const totalSteps = 6;
  const progress = useMemo(
    () => Math.round((step / totalSteps) * 100),
    [step, totalSteps],
  );

  const supabaseUrl =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined;
  const supabaseKey =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined;

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setA((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function canAdvance(): string | null {
    if (step === 1) {
      if (!a.name.trim()) return "Add your name";
      if (!EMAIL_RE.test(a.email)) return "Valid email is required";
      return null;
    }
    if (step === 2) {
      if (!a.role) return "Pick your role";
      if (!a.practiceType) return "Pick your practice type";
      return null;
    }
    if (step === 3) {
      if (!a.entity) return "Pick your entity structure";
      if (!a.udaBand) return "Pick a UDA band (or 'not applicable')";
      return null;
    }
    if (step === 4) {
      if (!a.nhsPensionStatus) return "Pick your NHS Pension status";
      return null;
    }
    if (step === 5) {
      if (!a.goodwillPlans) return "Pick a goodwill / sale plan";
      if (!a.accountantSatisfaction) return "Pick your accountant position";
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

    const validatedAnswers: HealthCheckAnswers = {
      name: a.name.trim(),
      email: a.email.trim().toLowerCase(),
      practiceName: a.practiceName.trim() || undefined,
      role: a.role as Role,
      practiceType: a.practiceType as PracticeType,
      udaBand: a.udaBand as UdaBand,
      associateCount: a.associateCount,
      entity: a.entity as Entity,
      profitPreTax: a.profitPreTax,
      currentSalary: a.currentSalary,
      currentDividend: a.currentDividend,
      nhsPensionStatus: a.nhsPensionStatus as NhsPensionStatus,
      goodwillPlans: a.goodwillPlans as GoodwillPlans,
      accountantSatisfaction: a.accountantSatisfaction as AccountantSatisfaction,
      topConcern: a.topConcern.trim(),
    };

    const opportunities = runRules(validatedAnswers);
    const counts = {
      high: opportunities.filter((o) => o.severity === "high").length,
      medium: opportunities.filter((o) => o.severity === "medium").length,
      low: opportunities.filter((o) => o.severity === "low").length,
      info: opportunities.filter((o) => o.severity === "info").length,
    };

    if (supabaseUrl && supabaseKey) {
      const summary = opportunities
        .slice(0, 5)
        .map((o, i) => `${i + 1}. [${o.severity.toUpperCase()}] ${o.title}`)
        .join("\n");
      const leadPayload = {
        full_name: validatedAnswers.name,
        email: validatedAnswers.email,
        phone: "—",
        role: validatedAnswers.role,
        ...(validatedAnswers.practiceName
          ? { practice_name: validatedAnswers.practiceName }
          : {}),
        message:
          `Practice health check submission\n` +
          `Role: ${validatedAnswers.role}\n` +
          `Practice type: ${validatedAnswers.practiceType}\n` +
          `UDA band: ${validatedAnswers.udaBand}\n` +
          `Entity: ${validatedAnswers.entity}\n` +
          `Profit pre-tax: £${validatedAnswers.profitPreTax.toLocaleString("en-GB")}\n` +
          `NHS Pension: ${validatedAnswers.nhsPensionStatus}\n` +
          `Sale plans: ${validatedAnswers.goodwillPlans}\n` +
          `Accountant: ${validatedAnswers.accountantSatisfaction}\n\n` +
          `Top opportunities (${opportunities.length}):\n${summary}\n\n` +
          (validatedAnswers.topConcern
            ? `Top concern: ${validatedAnswers.topConcern}`
            : ""),
        source: "dentists",
        source_url:
          typeof window !== "undefined"
            ? window.location.href
            : "/free-practice-health-check",
        submitted_at: new Date().toISOString(),
      };

      try {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(leadPayload),
        });

        if (typeof window !== "undefined" && "gtag" in window) {
          const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
          if (gtag) {
            gtag("event", "generate_lead", {
              event_category: "engagement",
              event_label: "dentists_health_check",
              value: 1,
            });
          }
        }
      } catch (err) {
        console.error("Health check submission error:", err);
      }
    }

    setResult({ opportunities, counts });
    setSubmitting(false);
  }

  if (result) {
    const topItems = result.opportunities.slice(0, 5);
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          Practice health check complete
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          We found {result.opportunities.length} planning items in your specific position.
        </h3>
        <p className="mt-3 text-[var(--ink-soft)]">
          Below are the top items worth reviewing. We will follow up on the email
          you supplied (<strong>{a.email}</strong>) to talk through any of them in
          detail.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <CountTile label="Priority" value={result.counts.high} tone="high" />
          <CountTile label="Notable" value={result.counts.medium} tone="medium" />
          <CountTile label="Tweaks" value={result.counts.low} tone="low" />
          <CountTile label="FYI" value={result.counts.info} tone="info" />
        </div>

        {topItems.length > 0 && (
          <div className="mt-8">
            <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">
              The first things we&apos;d look at
            </h4>
            <ul className="mt-4 space-y-4">
              {topItems.map((o) => (
                <li
                  key={o.id}
                  className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="font-serif text-base font-semibold text-[var(--ink)]">
                      {o.title}
                    </h5>
                    <SeverityPill severity={o.severity} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {o.detail}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--gold-strong)]">
                    What to do: {o.action}
                  </p>
                  {o.estimatedSaving && (
                    <p className="mt-1 text-xs font-semibold text-emerald-700">
                      Indicative impact: {o.estimatedSaving}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-[var(--gold)] bg-[var(--gold-soft)] p-6">
          <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">
            Talk it through
          </h4>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            These directional flags are useful, but a 30-minute call with a
            dental-specialist accountant on real numbers is where the value sits.
            No obligation, no sales drip.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)]"
          >
            Book a 30-minute scoping call
          </a>
        </div>

        <p className="mt-6 text-xs text-[var(--muted)]">
          Editorial: this report is generated from your answers and is directional only, not personalised tax advice. All figures use UK 2025/26 rates.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
        <div
          className="h-full bg-[var(--gold)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 space-y-5">
        {step === 1 && <Step1 a={a} update={update} />}
        {step === 2 && <Step2 a={a} update={update} />}
        {step === 3 && <Step3 a={a} update={update} />}
        {step === 4 && <Step4 a={a} update={update} />}
        {step === 5 && <Step5 a={a} update={update} />}
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
          className="min-h-12 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface)] disabled:opacity-50"
        >
          Back
        </button>
        {step < totalSteps ? (
          <button
            type="button"
            onClick={next}
            className="min-h-12 rounded-full bg-[var(--gold)] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)]"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="min-h-12 rounded-full bg-[var(--gold)] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] disabled:opacity-60"
          >
            {submitting ? "Generating report…" : "Get my practice health check"}
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        Editorial: report generated from your inputs, directional only, not personalised tax advice.
      </p>
    </div>
  );
}

const inputCls =
  "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/25";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-[var(--ink)]">{children}</label>
  );
}

function Step1({
  a,
  update,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">First, about you</h3>
      <div>
        <Label>Your name</Label>
        <input
          type="text"
          autoComplete="name"
          value={a.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
          placeholder="e.g. Dr Sarah Khan"
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
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label>Practice name (optional)</Label>
        <input
          type="text"
          autoComplete="organization"
          value={a.practiceName}
          onChange={(e) => update("practiceName", e.target.value)}
          className={inputCls}
          placeholder="e.g. High Street Dental"
        />
      </div>
    </>
  );
}

function Step2({
  a,
  update,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your role and practice</h3>
      <div>
        <Label>Your primary role</Label>
        <select
          value={a.role}
          onChange={(e) => update("role", e.target.value as Role)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {ROLE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Practice type (NHS / private mix)</Label>
        <select
          value={a.practiceType}
          onChange={(e) => update("practiceType", e.target.value as PracticeType)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {PRACTICE_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function Step3({
  a,
  update,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Structure and numbers</h3>
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
        <Label>Annual UDA volume (England) or equivalent</Label>
        <select
          value={a.udaBand}
          onChange={(e) => update("udaBand", e.target.value as UdaBand)}
          className={inputCls}
        >
          <option value="">Select…</option>
          {UDA_BAND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Associate count (0 if not a principal)</Label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={50}
          step={1}
          value={a.associateCount || ""}
          onChange={(e) =>
            update(
              "associateCount",
              Math.max(0, Math.min(50, parseInt(e.target.value || "0", 10) || 0)),
            )
          }
          className={inputCls}
          placeholder="e.g. 2"
        />
      </div>
      <div>
        <Label>Profit before tax last full year (£)</Label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          value={a.profitPreTax || ""}
          onChange={(e) =>
            update("profitPreTax", Math.max(0, parseInt(e.target.value || "0", 10) || 0))
          }
          className={inputCls}
          placeholder="e.g. 120000"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label>Director salary if Ltd (£/yr)</Label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={a.currentSalary || ""}
            onChange={(e) =>
              update(
                "currentSalary",
                Math.max(0, parseInt(e.target.value || "0", 10) || 0),
              )
            }
            className={inputCls}
            placeholder="e.g. 12570"
          />
        </div>
        <div>
          <Label>Dividends if Ltd (£/yr)</Label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={a.currentDividend || ""}
            onChange={(e) =>
              update(
                "currentDividend",
                Math.max(0, parseInt(e.target.value || "0", 10) || 0),
              )
            }
            className={inputCls}
            placeholder="e.g. 50000"
          />
        </div>
      </div>
    </>
  );
}

function Step4({
  a,
  update,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">NHS Pension</h3>
      <div>
        <Label>Current NHS Pension Scheme membership</Label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {NHS_PENSION_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              name="nhs-pension"
              checked={a.nhsPensionStatus === o.value}
              onChange={() => update("nhsPensionStatus", o.value)}
              label={o.label}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">
          NHS Pension membership is one of the biggest variables in our recommendation, so it&apos;s worth getting right. If you&apos;re unsure, request your latest Total Reward Statement from NHS Pensions.
        </p>
      </div>
    </>
  );
}

function Step5({
  a,
  update,
}: {
  a: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Future plans</h3>
      <div>
        <Label>Any practice buy / sell plans?</Label>
        <select
          value={a.goodwillPlans}
          onChange={(e) =>
            update("goodwillPlans", e.target.value as GoodwillPlans)
          }
          className={inputCls}
        >
          <option value="">Select…</option>
          {GOODWILL_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>How is your current accountancy arrangement?</Label>
        <select
          value={a.accountantSatisfaction}
          onChange={(e) =>
            update(
              "accountantSatisfaction",
              e.target.value as AccountantSatisfaction,
            )
          }
          className={inputCls}
        >
          <option value="">Select…</option>
          {ACCOUNTANT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Anything specific you want us to look at? (optional)</Label>
        <textarea
          value={a.topConcern}
          onChange={(e) => update("topConcern", e.target.value)}
          rows={3}
          maxLength={1000}
          className={inputCls}
          placeholder="e.g. Thinking about Ltd vs partnership, or pre-sale planning, or whether to claim the new EV equipment as capital allowance…"
        />
      </div>
    </>
  );
}

function Step6({ a }: { a: Answers }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Review</h3>
      <p className="text-sm text-[var(--ink-soft)]">
        Last check before we generate. We&apos;ll show your top items on this page and follow up to <strong>{a.email}</strong>.
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <ReviewRow label="Name" value={a.name} />
        <ReviewRow label="Email" value={a.email} />
        {a.practiceName && <ReviewRow label="Practice" value={a.practiceName} />}
        <ReviewRow
          label="Role"
          value={ROLE_OPTIONS.find((o) => o.value === a.role)?.label || ""}
        />
        <ReviewRow
          label="Practice type"
          value={
            PRACTICE_TYPE_OPTIONS.find((o) => o.value === a.practiceType)?.label || ""
          }
        />
        <ReviewRow
          label="Entity"
          value={ENTITY_OPTIONS.find((o) => o.value === a.entity)?.label || ""}
        />
        <ReviewRow
          label="UDA band"
          value={UDA_BAND_OPTIONS.find((o) => o.value === a.udaBand)?.label || ""}
        />
        <ReviewRow label="Profit pre-tax" value={`£${a.profitPreTax.toLocaleString("en-GB")}`} />
        <ReviewRow
          label="NHS Pension"
          value={
            NHS_PENSION_OPTIONS.find((o) => o.value === a.nhsPensionStatus)?.label || ""
          }
        />
        <ReviewRow
          label="Sale plans"
          value={
            GOODWILL_OPTIONS.find((o) => o.value === a.goodwillPlans)?.label || ""
          }
        />
        <ReviewRow
          label="Accountant"
          value={
            ACCOUNTANT_OPTIONS.find((o) => o.value === a.accountantSatisfaction)
              ?.label || ""
          }
        />
      </dl>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] py-1.5">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--ink)]">{value || "—"}</span>
    </div>
  );
}

function CountTile({
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
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl font-bold">{value}</div>
    </div>
  );
}

function SeverityPill({ severity }: { severity: "high" | "medium" | "low" | "info" }) {
  const styles = {
    high: "bg-red-100 text-red-900 border-red-200",
    medium: "bg-amber-100 text-amber-900 border-amber-200",
    low: "bg-emerald-100 text-emerald-900 border-emerald-200",
    info: "bg-blue-100 text-blue-900 border-blue-200",
  };
  const labels = {
    high: "Priority",
    medium: "Notable",
    low: "Tweak",
    info: "FYI",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[severity]}`}
    >
      {labels[severity]}
    </span>
  );
}

function RadioCard({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${
        checked
          ? "border-[var(--gold)] bg-[var(--gold-soft)]"
          : "border-[var(--border)] hover:border-[var(--gold)]/40"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[var(--gold)]"
      />
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
    </label>
  );
}
