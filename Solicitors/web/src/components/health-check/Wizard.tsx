"use client";

import { useMemo, useState } from "react";
import {
  ACCOUNTANT_OPTIONS,
  CLIENT_MONEY_OPTIONS,
  ENTITY_OPTIONS,
  EXIT_OPTIONS,
  FIRM_TYPE_OPTIONS,
  PRACTICE_AREA_OPTIONS,
  ROLE_OPTIONS,
} from "@/lib/health-check/questions";
import { runRules } from "@/lib/health-check/rules";
import type {
  AccountantSatisfaction,
  ClientMoneyVolume,
  Entity,
  ExitHorizon,
  FirmType,
  HealthCheckAnswers,
  Opportunity,
  PracticeArea,
  Role,
} from "@/lib/health-check/types";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitSolicitorLead } from "@/lib/leads/submit-client";
import { composeHealthCheckSummary } from "@/lib/lead-message";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

// LD-04: must be exactly the disclosure rendered next to the step-6 checkbox.
const CONSENT_TEXT = `${siteConfig.leadConsentText} See our Privacy Policy.`;

type Answers = {
  name: string;
  email: string;
  firmName: string;
  role: Role | "";
  firmType: FirmType | "";
  practiceArea: PracticeArea | "";
  entity: Entity | "";
  feeEarnerCount: number;
  profitPreTax: number;
  partnerDrawings: number;
  clientMoneyVolume: ClientMoneyVolume | "";
  cofaInPlace: boolean;
  exitHorizon: ExitHorizon | "";
  accountantSatisfaction: AccountantSatisfaction | "";
  topConcern: string;
  // LD-04: consent is part of the Answers state so Step6 can bind it via update().
  consent: boolean;
  // LD-03: honeypot field value, forwarded to the server.
  enquiryRef: string;
};

const INITIAL: Answers = {
  name: "",
  email: "",
  firmName: "",
  role: "",
  firmType: "",
  practiceArea: "",
  entity: "",
  feeEarnerCount: 0,
  profitPreTax: 0,
  partnerDrawings: 0,
  clientMoneyVolume: "",
  cofaInPlace: true,
  exitHorizon: "",
  accountantSatisfaction: "",
  topConcern: "",
  consent: false,
  enquiryRef: "",
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
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step, totalSteps]);

  // SEC-08: wizard lifecycle tracking - no field values captured, only step + outcome.
  const { onSubmit: trackFormSubmit, onLead } = useFormTracking("health_check_wizard");

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
      if (!a.firmType) return "Pick your firm type";
      if (!a.practiceArea) return "Pick your primary practice area";
      return null;
    }
    if (step === 3) {
      if (!a.entity) return "Pick your entity structure";
      return null;
    }
    if (step === 4) {
      if (!a.clientMoneyVolume) return "Pick your client money volume";
      return null;
    }
    if (step === 5) {
      if (!a.exitHorizon) return "Pick a sale / buy horizon";
      if (!a.accountantSatisfaction) return "Pick your accountant position";
      return null;
    }
    // LD-04: the consent checkbox is required before the wizard can submit.
    if (step === 6) {
      if (!a.consent) return "Please tick the box to agree before generating your report.";
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
      firmName: a.firmName.trim() || undefined,
      role: a.role as Role,
      firmType: a.firmType as FirmType,
      practiceArea: a.practiceArea as PracticeArea,
      entity: a.entity as Entity,
      feeEarnerCount: a.feeEarnerCount,
      profitPreTax: a.profitPreTax,
      partnerDrawings: a.partnerDrawings,
      clientMoneyVolume: a.clientMoneyVolume as ClientMoneyVolume,
      cofaInPlace: a.cofaInPlace,
      exitHorizon: a.exitHorizon as ExitHorizon,
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

    // LD-02: emit form_submit (step count = questionnaire steps completed)
    trackFormSubmit(totalSteps);

    // Build a short human-readable message for the partner inbox; full answers
    // go into extras so the schema never grows unboundedly.
    const message = composeHealthCheckSummary({
      role: validatedAnswers.role,
      firmType: validatedAnswers.firmType,
      practiceArea: validatedAnswers.practiceArea,
      entity: validatedAnswers.entity,
      cofaInPlace: validatedAnswers.cofaInPlace,
      topConcern: validatedAnswers.topConcern,
    });

    // Niche qualifier answers that do not belong in top-level columns live in extras.
    const topOpportunities = opportunities
      .slice(0, 5)
      .map((o) => ({ severity: o.severity, title: o.title }));

    const extras: Record<string, unknown> = {
      health_check: {
        firmType: validatedAnswers.firmType,
        practiceArea: validatedAnswers.practiceArea,
        entity: validatedAnswers.entity,
        feeEarnerCount: validatedAnswers.feeEarnerCount,
        profitPreTax: validatedAnswers.profitPreTax,
        partnerDrawings: validatedAnswers.partnerDrawings,
        clientMoneyVolume: validatedAnswers.clientMoneyVolume,
        cofaInPlace: validatedAnswers.cofaInPlace,
        exitHorizon: validatedAnswers.exitHorizon,
        accountantSatisfaction: validatedAnswers.accountantSatisfaction,
        topConcern: validatedAnswers.topConcern,
        opportunityCount: opportunities.length,
        topOpportunities,
      },
      // practice_name is not a top-level leads column; preserve via extras.
      ...(validatedAnswers.firmName ? { practice_name: validatedAnswers.firmName } : {}),
    };

    const leadPayload = {
      full_name: validatedAnswers.name,
      email: validatedAnswers.email,
      // No phone collected in the health-check wizard; pass captureMode email_only
      // so server validation does not require a phone number.
      phone: "",
      role: validatedAnswers.role,
      message,
      // PF-07: source from niche config, never a literal
      source: niche.content_strategy.source_identifier,
      source_url: typeof window !== "undefined" ? window.location.href : "/free-firm-health-check",
      submitted_at: new Date().toISOString(),
      // LD-04: real consent state from the step-6 checkbox; the stored text is
      // exactly what the visitor saw next to it.
      consent_given: a.consent,
      consent_text: CONSENT_TEXT,
      consent_at: new Date().toISOString(),
      // LD-05: stitch visitor + session ids so this lead links to its analytics events
      visitor_id: getVisitorId() ?? undefined,
      session_id: getSessionId() ?? undefined,
      extras,
      captureMode: "email_only" as const,
    };

    try {
      const submitResult = await submitSolicitorLead(leadPayload, a.enquiryRef);
      if (submitResult.success) {
        // First-party lead event only after a confirmed submission.
        onLead({ role: validatedAnswers.role });
      }
    } catch {
      // Non-critical: show findings regardless of submission status
    }

    setResult({ opportunities, counts });
    setSubmitting(false);
  }

  if (result) {
    const topItems = result.opportunities.slice(0, 5);
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          Firm health check complete
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          We found {result.opportunities.length} planning items in your specific position.
        </h3>
        <p className="mt-3 text-[var(--ink-soft)]">
          Below are the top items worth reviewing. We will follow up on the email you supplied (<strong>{a.email}</strong>) to talk through any of them in detail.
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
                  className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface)] p-5"
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
                  <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
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

        <div className="mt-8 rounded-2xl border border-[var(--primary)] bg-[var(--primary)]/5 p-6">
          <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Talk it through</h4>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            These directional flags are useful, but a 30-minute call with a legal-sector specialist accountant on real numbers is where the value sits. No obligation, no sales drip.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-soft)]"
          >
            Book a 30-minute scoping call
          </a>
        </div>

        <p className="mt-6 text-xs text-[var(--muted)]">
          Editorial: this report is generated from your answers and is directional only, not personalised tax or regulatory advice. All figures use UK 2025/26 rates.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
        <span>Step {step} of {totalSteps}</span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
        <div className="h-full bg-[var(--primary)] transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 space-y-5">
        {step === 1 && <Step1 a={a} update={update} />}
        {step === 2 && <Step2 a={a} update={update} />}
        {step === 3 && <Step3 a={a} update={update} />}
        {step === 4 && <Step4 a={a} update={update} />}
        {step === 5 && <Step5 a={a} update={update} />}
        {step === 6 && <Step6 a={a} update={update} />}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>
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
            className="min-h-12 rounded-full bg-[var(--primary)] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-soft)]"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting || !a.consent}
            className="min-h-12 rounded-full bg-[var(--primary)] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-soft)] disabled:opacity-60"
          >
            {submitting ? "Generating report…" : "Get my firm health check"}
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        Editorial: report generated from your inputs, directional only, not personalised advice.
      </p>
    </div>
  );
}

const inputCls =
  "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-[var(--ink)]">{children}</label>;
}

function Step1({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">First, about you</h3>
      <div>
        <Label>Your name</Label>
        <input type="text" autoComplete="name" value={a.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="e.g. Sarah Khan" />
      </div>
      <div>
        <Label>Email</Label>
        <input type="email" autoComplete="email" value={a.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
      </div>
      <div>
        <Label>Firm name (optional)</Label>
        <input type="text" autoComplete="organization" value={a.firmName} onChange={(e) => update("firmName", e.target.value)} className={inputCls} placeholder="e.g. Khan & Partners LLP" />
      </div>
    </>
  );
}

function Step2({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your role and firm</h3>
      <div>
        <Label>Your primary role</Label>
        <select value={a.role} onChange={(e) => update("role", e.target.value as Role)} className={inputCls}>
          <option value="">Select…</option>
          {ROLE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <Label>Firm type / size</Label>
        <select value={a.firmType} onChange={(e) => update("firmType", e.target.value as FirmType)} className={inputCls}>
          <option value="">Select…</option>
          {FIRM_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <Label>Primary practice area</Label>
        <select value={a.practiceArea} onChange={(e) => update("practiceArea", e.target.value as PracticeArea)} className={inputCls}>
          <option value="">Select…</option>
          {PRACTICE_AREA_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </>
  );
}

function Step3({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Structure and numbers</h3>
      <div>
        <Label>Entity structure</Label>
        <select value={a.entity} onChange={(e) => update("entity", e.target.value as Entity)} className={inputCls}>
          <option value="">Select…</option>
          {ENTITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <Label>Fee-earner count (0 if self-employed)</Label>
        <input type="number" inputMode="numeric" min={0} max={500} step={1} value={a.feeEarnerCount || ""} onChange={(e) => update("feeEarnerCount", Math.max(0, Math.min(500, parseInt(e.target.value || "0", 10) || 0)))} className={inputCls} placeholder="e.g. 8" />
      </div>
      <div>
        <Label>Profit before tax last full year (£)</Label>
        <input type="number" inputMode="numeric" min={0} step={1000} value={a.profitPreTax || ""} onChange={(e) => update("profitPreTax", Math.max(0, parseInt(e.target.value || "0", 10) || 0))} className={inputCls} placeholder="e.g. 250000" />
      </div>
      <div>
        <Label>Your annual drawings / extraction (£)</Label>
        <input type="number" inputMode="numeric" min={0} step={1000} value={a.partnerDrawings || ""} onChange={(e) => update("partnerDrawings", Math.max(0, parseInt(e.target.value || "0", 10) || 0))} className={inputCls} placeholder="e.g. 120000" />
      </div>
    </>
  );
}

function Step4({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">SRA compliance</h3>
      <div>
        <Label>Client money volume</Label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CLIENT_MONEY_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              name="client-money"
              checked={a.clientMoneyVolume === o.value}
              onChange={() => update("clientMoneyVolume", o.value)}
              label={o.label}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <input
            type="checkbox"
            checked={a.cofaInPlace}
            onChange={(e) => update("cofaInPlace", e.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          <span className="text-sm font-semibold text-[var(--ink)]">
            COFA appointed and active (uncheck if no COFA or vacant)
          </span>
        </label>
      </div>
    </>
  );
}

function Step5({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Future plans</h3>
      <div>
        <Label>Sale / purchase / succession plans</Label>
        <select value={a.exitHorizon} onChange={(e) => update("exitHorizon", e.target.value as ExitHorizon)} className={inputCls}>
          <option value="">Select…</option>
          {EXIT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <Label>How is your current accountancy arrangement?</Label>
        <select value={a.accountantSatisfaction} onChange={(e) => update("accountantSatisfaction", e.target.value as AccountantSatisfaction)} className={inputCls}>
          <option value="">Select…</option>
          {ACCOUNTANT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <Label>Anything specific you want us to look at? (optional)</Label>
        <textarea value={a.topConcern} onChange={(e) => update("topConcern", e.target.value)} rows={3} maxLength={1000} className={inputCls} placeholder="e.g. FA 2014 position on a new fixed-share partner, or pre-sale planning, or COFA succession…" />
      </div>
    </>
  );
}

function Step6({ a, update }: { a: Answers; update: <K extends keyof Answers>(k: K, v: Answers[K]) => void }) {
  return (
    <>
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Review</h3>
      <p className="text-sm text-[var(--ink-soft)]">
        Last check before we generate. We&apos;ll show your top items on this page and follow up to <strong>{a.email}</strong>.
      </p>

      {/* LD-03: honeypot -- visually hidden, server stores flagged when non-empty */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="hc-enquiry-ref">Reference (leave blank)</label>
        <input
          id="hc-enquiry-ref"
          type="text"
          name="enquiry_ref"
          tabIndex={-1}
          autoComplete="off"
          value={a.enquiryRef}
          onChange={(e) => update("enquiryRef", e.target.value)}
        />
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <ReviewRow label="Name" value={a.name} />
        <ReviewRow label="Email" value={a.email} />
        {a.firmName && <ReviewRow label="Firm" value={a.firmName} />}
        <ReviewRow label="Role" value={ROLE_OPTIONS.find((o) => o.value === a.role)?.label || ""} />
        <ReviewRow label="Firm type" value={FIRM_TYPE_OPTIONS.find((o) => o.value === a.firmType)?.label || ""} />
        <ReviewRow label="Practice area" value={PRACTICE_AREA_OPTIONS.find((o) => o.value === a.practiceArea)?.label || ""} />
        <ReviewRow label="Entity" value={ENTITY_OPTIONS.find((o) => o.value === a.entity)?.label || ""} />
        <ReviewRow label="Profit pre-tax" value={`£${a.profitPreTax.toLocaleString("en-GB")}`} />
        <ReviewRow label="Client money" value={CLIENT_MONEY_OPTIONS.find((o) => o.value === a.clientMoneyVolume)?.label || ""} />
        <ReviewRow label="COFA in place" value={a.cofaInPlace ? "Yes" : "No"} />
        <ReviewRow label="Exit horizon" value={EXIT_OPTIONS.find((o) => o.value === a.exitHorizon)?.label || ""} />
      </dl>
      {/* LD-04: real, user-operated consent checkbox; CONSENT_TEXT mirrors this label exactly. */}
      <label htmlFor="hc-consent" className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[var(--muted)]">
        <input
          id="hc-consent"
          name="consent"
          type="checkbox"
          checked={a.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
        />
        <span>
          {siteConfig.leadConsentText} See our{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--primary)] underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] py-1.5">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--ink)]">{value || "-"}</span>
    </div>
  );
}

function CountTile({ label, value, tone }: { label: string; value: number; tone: "high" | "medium" | "low" | "info" }) {
  const tones = {
    high: "border-red-200 bg-red-50 text-red-900",
    medium: "border-amber-200 bg-amber-50 text-amber-900",
    low: "border-emerald-200 bg-emerald-50 text-emerald-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  };
  return (
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">{label}</div>
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
  const labels = { high: "Priority", medium: "Notable", low: "Tweak", info: "FYI" };
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[severity]}`}>
      {labels[severity]}
    </span>
  );
}

function RadioCard({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${
        checked ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] hover:border-[var(--primary)]/40"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--primary)]" />
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
    </label>
  );
}
