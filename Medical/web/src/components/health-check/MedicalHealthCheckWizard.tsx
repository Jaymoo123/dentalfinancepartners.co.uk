"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertTriangle, Info } from "lucide-react";
import { btnPrimary, focusRing } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";
import { useFormTracking } from "@accounting-network/web-shared/analytics/react/useFormTracking";
import { getVisitorId, getSessionId } from "@accounting-network/web-shared/analytics/ids";

type Role = "gp-partner" | "salaried-gp" | "consultant" | "locum" | "junior" | "";
type PensionStatus = "not-enrolled" | "enrolled-fine" | "concerned-aa" | "received-charge" | "";
type PrivatePractice = "none" | "occasional" | "regular" | "company" | "";
type IncomeLevel = "under-100k" | "100-150k" | "150-200k" | "over-200k" | "";
type CurrentAccountant = "none" | "generalist" | "specialist-non-medical" | "specialist-medical" | "";

type Answers = {
  role: Role;
  pensionStatus: PensionStatus;
  privatePractice: PrivatePractice;
  incomeLevel: IncomeLevel;
  currentAccountant: CurrentAccountant;
  name: string;
  email: string;
};

type Finding = {
  priority: "high" | "medium" | "low";
  title: string;
  body: string;
};

// LD-04: must be exactly the disclosure rendered next to the step-6 checkbox.
const CONSENT_TEXT = `I agree to my details being shared by ${niche.display_name} with specialist partners for the purpose of responding to my health check submission and providing specialist advice. See our Privacy Policy.`;

function deriveFindings(answers: Answers): Finding[] {
  const findings: Finding[] = [];

  if (answers.pensionStatus === "received-charge") {
    findings.push({
      priority: "high",
      title: "NHS pension annual allowance charge received",
      body: "You have received a pension annual allowance charge. Before paying it, verify the underlying pension input amount from NHSBSA is correct (errors are common). Then assess whether a Scheme Pays election is the right approach versus a direct HMRC payment. We can review both options.",
    });
  }

  if (answers.pensionStatus === "concerned-aa") {
    findings.push({
      priority: "high",
      title: "Annual allowance review recommended",
      body: "If you are concerned about the annual allowance, a formal pension input calculation should be done before the charge crystallises. Carry-forward from the three prior years may reduce or eliminate any excess. We run this calculation annually for all clients at risk.",
    });
  }

  if (answers.incomeLevel === "over-200k" && answers.pensionStatus !== "not-enrolled") {
    findings.push({
      priority: "high",
      title: "Tapered annual allowance likely applies",
      body: "At income over £200,000, the tapered annual allowance typically reduces your limit from £60,000 to as low as £10,000. Even if you have not received a Pension Savings Statement, the tapered position should be modelled each year to avoid a surprise charge.",
    });
  }

  if (answers.privatePractice === "regular" && answers.currentAccountant !== "specialist-medical") {
    findings.push({
      priority: "high",
      title: "Private practice income may not be returned correctly",
      body: "Regular private practice income requires careful treatment on self-assessment: correct classification as trading income, Class 4 NI calculation, allowable expense claim (indemnity, GMC, CPD, motor), and interaction with your NHS pension position. A generalist accountant typically under-claims expenses and misses the pension interaction.",
    });
  }

  if (answers.privatePractice === "regular" && (answers.incomeLevel === "150-200k" || answers.incomeLevel === "over-200k")) {
    findings.push({
      priority: "medium",
      title: "Private practice company worth modelling",
      body: "At consistent private income above £80,000-£100,000, a limited company for your private practice may reduce your combined income tax and NI materially. This requires a shareholder structure that allows income splitting and careful modelling of the NHS pension interaction. It is worth a formal analysis.",
    });
  }

  if (answers.role === "locum" && answers.currentAccountant !== "specialist-medical") {
    findings.push({
      priority: "high",
      title: "IR35 status across your engagements needs review",
      body: "Locum doctor IR35 status varies by engagement type. Agency NHS work may have been given an inside-IR35 SDS; direct sessional GP work is often outside IR35. Each engagement needs to be assessed separately. A non-specialist accountant is unlikely to have done this.",
    });
  }

  if (answers.role === "locum" && (answers.incomeLevel === "150-200k" || answers.incomeLevel === "over-200k")) {
    findings.push({
      priority: "medium",
      title: "Limited company structure worth modelling at your income level",
      body: "At sustained locum income above £80,000-£100,000 from outside-IR35 engagements, a limited company can save £5,000-£15,000 per year depending on your shareholder structure. We compare all three structures (sole trader, limited company, umbrella) at your actual income level including the NHS pension access trade-off.",
    });
  }

  if (answers.role === "gp-partner" && answers.currentAccountant === "generalist") {
    findings.push({
      priority: "medium",
      title: "Partnership accounts may contain gaps",
      body: "GP partnership accounts require specific treatment of NHS superannuation, notional rent, and basis period reform adjustments. Generalist accountants frequently handle the compliance correctly but miss the nuances that affect individual partners' tax positions and NHS pension certificates.",
    });
  }

  if (answers.incomeLevel === "over-200k" && answers.currentAccountant === "none") {
    findings.push({
      priority: "high",
      title: "No accountant at this income level is a significant risk",
      body: "At income over £200,000, you are almost certainly inside the tapered annual allowance and have self-assessment obligations covering multiple income streams. HMRC interest in high-earning professionals without proper returns is increasing. An unrepresented position at this income level carries meaningful compliance risk.",
    });
  }

  if (answers.currentAccountant === "generalist" && (answers.role === "gp-partner" || answers.role === "consultant")) {
    findings.push({
      priority: "medium",
      title: "Specialist review recommended",
      body: "Generalist accountants handle GP and consultant compliance competently but typically miss the NHS pension nuances, medical expense optimisation, and practice structure opportunities that a medical specialist identifies routinely. A one-off review often pays for itself in recovered expenses alone.",
    });
  }

  if (findings.length === 0) {
    findings.push({
      priority: "low",
      title: "Your position looks broadly managed",
      body: "Based on your answers, there are no obvious high-priority concerns. That said, the specifics of your NHS pension position, expense claims, and income structure are worth a professional review annually. A 30-minute call with a medical accountant is free and often surfaces items that do not appear on a checklist.",
    });
  }

  return findings.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

const priorityConfig = {
  high: { label: "Priority", icon: AlertTriangle, bg: "bg-red-50 border-red-200", iconClass: "text-red-500", labelClass: "text-red-700 bg-red-100" },
  medium: { label: "Notable", icon: Info, bg: "bg-amber-50 border-amber-200", iconClass: "text-amber-600", labelClass: "text-amber-800 bg-amber-100" },
  low: { label: "FYI", icon: CheckCircle2, bg: "bg-emerald-50 border-emerald-200", iconClass: "text-emerald-600", labelClass: "text-emerald-800 bg-emerald-100" },
};

const TOTAL_STEPS = 6;

function Progress({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-medium text-[var(--muted)] mb-2">
        <span>Step {step} of {TOTAL_STEPS}</span>
        <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--border)]">
        <div
          className="h-1.5 rounded-full bg-[var(--copper)] transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}

function RadioOption({ value, current, onChange, children }: {
  value: string;
  current: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const selected = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${focusRing} ${
        selected
          ? "border-[var(--copper)] bg-[var(--copper-soft)] font-semibold text-[var(--ink)]"
          : "border-[var(--border)] bg-white text-[var(--ink-soft)] hover:border-[var(--copper)]/60 hover:bg-[var(--surface-elevated)]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${selected ? "border-[var(--copper)] bg-[var(--copper)]" : "border-[var(--border)]"}`} />
        {children}
      </span>
    </button>
  );
}

export function MedicalHealthCheckWizard() {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    role: "",
    pensionStatus: "",
    privatePractice: "",
    incomeLevel: "",
    currentAccountant: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [findings, setFindings] = useState<Finding[]>([]);
  // LD-04: consent only ever comes from this rendered, user-operated checkbox.
  const [consent, setConsent] = useState(false);

  // SEC-08: wizard lifecycle tracking — no field values captured, only step + outcome.
  const { onSubmit: trackFormSubmit, onLead } = useFormTracking("health_check_wizard");

  const canProceed = () => {
    if (step === 1) return answers.role !== "";
    if (step === 2) return answers.pensionStatus !== "";
    if (step === 3) return answers.privatePractice !== "";
    if (step === 4) return answers.incomeLevel !== "";
    if (step === 5) return answers.currentAccountant !== "";
    // LD-04: the consent checkbox is required before the wizard can submit.
    if (step === 6) return answers.name.trim() !== "" && answers.email.includes("@") && consent;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const derived = deriveFindings(answers);
    setFindings(derived);

    // LD-02: emit form_submit (step count = completed questionnaire steps)
    trackFormSubmit(TOTAL_STEPS);

    const { supabaseUrl, supabaseKey } = getSupabaseConfig();
    if (supabaseUrl && supabaseKey) {
      const payload = {
        full_name: answers.name.trim(),
        email: answers.email.trim().toLowerCase(),
        phone: "—",
        role: answers.role,
        message: `Medical health check: role=${answers.role}, pension=${answers.pensionStatus}, private=${answers.privatePractice}, income=${answers.incomeLevel}, accountant=${answers.currentAccountant}. Findings: ${derived.map((f) => f.title).join("; ")}`,
        // PF-07: source from niche config, never a literal
        source: niche.content_strategy.source_identifier,
        source_url:
          typeof window !== "undefined"
            ? window.location.href
            : "/free-practice-health-check",
        submitted_at: new Date().toISOString(),
        // LD-04: real consent state from the step-6 checkbox; the stored text is
        // exactly what the visitor saw next to it.
        consent_given: consent,
        consent_text: CONSENT_TEXT,
        consent_at: new Date().toISOString(),
        // LD-05: stitch visitor + session ids so the wizard lead links to analytics events
        visitor_id: getVisitorId() ?? undefined,
        session_id: getSessionId() ?? undefined,
      };

      try {
        const result = await submitLead(payload, supabaseUrl, supabaseKey);
        if (result.success) {
          // First-party lead event only after a confirmed submission.
          onLead({ role: answers.role });
        }
      } catch {
        // Non-critical: show findings regardless of submission status
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="h-8 w-8 text-[var(--copper)]" />
          <div>
            <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">Your practice health check</h2>
            <p className="text-sm text-[var(--muted)]">{findings.length} item{findings.length !== 1 ? "s" : ""} flagged for your position</p>
          </div>
        </div>

        <div className="space-y-4">
          {findings.map((f, i) => {
            const config = priorityConfig[f.priority];
            const Icon = config.icon;
            return (
              <div key={i} className={`rounded-2xl border p-5 sm:p-6 ${config.bg}`}>
                <div className="flex items-start gap-4">
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconClass}`} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${config.labelClass}`}>
                        {config.label}
                      </span>
                      <h3 className="font-semibold text-[var(--ink)] text-sm sm:text-base">{f.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{f.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-[var(--navy)] p-6 text-center">
          <h3 className="font-serif text-lg font-semibold text-white">Want to put numbers to these?</h3>
          <p className="mt-2 text-sm text-white/80">30-minute call with a specialist GP accountant, free. We review your specific position, not a checklist.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={btnPrimary}>Book your free call</Link>
            <Link href="/medical-guides" className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Read medical guides
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-10">
      <Progress step={step} />

      {step === 1 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">What is your primary role?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Select the option that best describes your current position.</p>
          <div className="mt-6 space-y-3">
            <RadioOption value="gp-partner" current={answers.role} onChange={(v) => { if (!started) { setStarted(true); } setAnswers({ ...answers, role: v as Role }); }}>GP Partner</RadioOption>
            <RadioOption value="salaried-gp" current={answers.role} onChange={(v) => { if (!started) { setStarted(true); } setAnswers({ ...answers, role: v as Role }); }}>Salaried GP</RadioOption>
            <RadioOption value="consultant" current={answers.role} onChange={(v) => { if (!started) { setStarted(true); } setAnswers({ ...answers, role: v as Role }); }}>Hospital Consultant</RadioOption>
            <RadioOption value="locum" current={answers.role} onChange={(v) => { if (!started) { setStarted(true); } setAnswers({ ...answers, role: v as Role }); }}>Locum Doctor</RadioOption>
            <RadioOption value="junior" current={answers.role} onChange={(v) => { if (!started) { setStarted(true); } setAnswers({ ...answers, role: v as Role }); }}>Junior Doctor (Foundation to Registrar)</RadioOption>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">What is your NHS pension situation?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Your NHS Pension Scheme membership and annual allowance position.</p>
          <div className="mt-6 space-y-3">
            <RadioOption value="not-enrolled" current={answers.pensionStatus} onChange={(v) => setAnswers({ ...answers, pensionStatus: v as PensionStatus })}>I am not enrolled in the NHS Pension Scheme</RadioOption>
            <RadioOption value="enrolled-fine" current={answers.pensionStatus} onChange={(v) => setAnswers({ ...answers, pensionStatus: v as PensionStatus })}>Enrolled and I have not had any annual allowance concerns</RadioOption>
            <RadioOption value="concerned-aa" current={answers.pensionStatus} onChange={(v) => setAnswers({ ...answers, pensionStatus: v as PensionStatus })}>Enrolled but I am concerned about the annual allowance</RadioOption>
            <RadioOption value="received-charge" current={answers.pensionStatus} onChange={(v) => setAnswers({ ...answers, pensionStatus: v as PensionStatus })}>I have received an annual allowance tax charge</RadioOption>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Do you have private practice income?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Private patients, medico-legal work, cosmetics, or other non-NHS income.</p>
          <div className="mt-6 space-y-3">
            <RadioOption value="none" current={answers.privatePractice} onChange={(v) => setAnswers({ ...answers, privatePractice: v as PrivatePractice })}>No, I work exclusively on NHS contracts</RadioOption>
            <RadioOption value="occasional" current={answers.privatePractice} onChange={(v) => setAnswers({ ...answers, privatePractice: v as PrivatePractice })}>Occasional private sessions or medico-legal work (under £20,000/year)</RadioOption>
            <RadioOption value="regular" current={answers.privatePractice} onChange={(v) => setAnswers({ ...answers, privatePractice: v as PrivatePractice })}>Regular private practice income (£20,000 or more per year)</RadioOption>
            <RadioOption value="company" current={answers.privatePractice} onChange={(v) => setAnswers({ ...answers, privatePractice: v as PrivatePractice })}>I already operate a limited company for private income</RadioOption>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">What is your approximate total income?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">All income before tax: NHS salary or partnership share, private practice, locum shifts, investment income.</p>
          <div className="mt-6 space-y-3">
            <RadioOption value="under-100k" current={answers.incomeLevel} onChange={(v) => setAnswers({ ...answers, incomeLevel: v as IncomeLevel })}>Under £100,000</RadioOption>
            <RadioOption value="100-150k" current={answers.incomeLevel} onChange={(v) => setAnswers({ ...answers, incomeLevel: v as IncomeLevel })}>£100,000 to £150,000</RadioOption>
            <RadioOption value="150-200k" current={answers.incomeLevel} onChange={(v) => setAnswers({ ...answers, incomeLevel: v as IncomeLevel })}>£150,000 to £200,000</RadioOption>
            <RadioOption value="over-200k" current={answers.incomeLevel} onChange={(v) => setAnswers({ ...answers, incomeLevel: v as IncomeLevel })}>Over £200,000</RadioOption>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">What is your current accountancy arrangement?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Who currently handles your tax returns and financial advice?</p>
          <div className="mt-6 space-y-3">
            <RadioOption value="none" current={answers.currentAccountant} onChange={(v) => setAnswers({ ...answers, currentAccountant: v as CurrentAccountant })}>I do not have an accountant</RadioOption>
            <RadioOption value="generalist" current={answers.currentAccountant} onChange={(v) => setAnswers({ ...answers, currentAccountant: v as CurrentAccountant })}>I have a generalist accountant (not medical-specific)</RadioOption>
            <RadioOption value="specialist-non-medical" current={answers.currentAccountant} onChange={(v) => setAnswers({ ...answers, currentAccountant: v as CurrentAccountant })}>I have a specialist accountant but not medical-focused</RadioOption>
            <RadioOption value="specialist-medical" current={answers.currentAccountant} onChange={(v) => setAnswers({ ...answers, currentAccountant: v as CurrentAccountant })}>I have a medical specialist accountant</RadioOption>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">Where should we send your results?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Your findings appear on screen immediately. We will follow up once with the full report and an offer of a free 30-minute call. No drip sequences.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--ink)] mb-1.5">Name</label>
              <input
                type="text"
                value={answers.name}
                onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                placeholder="Dr Sarah Ahmed"
                className="w-full min-h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--ink)] transition-all focus:border-[var(--copper)] focus:outline-none focus:ring-2 focus:ring-[var(--copper)]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--ink)] mb-1.5">Email</label>
              <input
                type="email"
                value={answers.email}
                onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                placeholder="sarah@example.com"
                className="w-full min-h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--ink)] transition-all focus:border-[var(--copper)] focus:outline-none focus:ring-2 focus:ring-[var(--copper)]/20"
              />
            </div>
            {/* LD-04: real, user-operated consent checkbox; CONSENT_TEXT mirrors this label exactly. */}
            <label htmlFor="hc-consent" className="flex items-start gap-3 text-xs leading-relaxed text-[var(--muted)]">
              <input
                id="hc-consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--copper)]"
              />
              <span>
                I agree to my details being shared by {niche.display_name} with specialist partners for the purpose of responding to my health check submission and providing specialist advice. See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--copper)] underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            <p className="text-xs text-[var(--muted)]">
              We follow up once with the report. No marketing sequences. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={`inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--ink-soft)] hover:border-[var(--navy)] hover:text-[var(--navy)] transition-all ${focusRing}`}
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={!canProceed()}
            onClick={() => setStep((s) => s + 1)}
            className={`${btnPrimary} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Continue
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!canProceed() || submitting}
            onClick={handleSubmit}
            className={`${btnPrimary} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {submitting ? "Processing..." : "See my results"}
            {!submitting && <ChevronRight className="ml-1.5 h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
