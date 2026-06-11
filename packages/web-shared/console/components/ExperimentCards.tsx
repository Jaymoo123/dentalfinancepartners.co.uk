"use client";
/**
 * Experiment card components for the estate console experiments tab.
 *
 * Three components, all "use client" so they can be imported into RSC pages
 * as leaf components without crossing the server/client boundary with functions.
 *
 * ExperimentCard -- dispatcher: routes to BuildingBlockCard or ConversionCard
 *   based on whether the meta declares a primary building-block metric.
 * BuildingBlockCard -- CRO tests (5 of 6): scores on acted / exposed, shows
 *   conversion as a secondary guardrail. "Awaiting exposure" empty state.
 * ConversionCard -- Personalisation (whole-experience, no surface): conversion-
 *   only card with relative lift and significance badge.
 *
 * Both card styles follow the original Property admin console design:
 *   - emerald border / background tint
 *   - significance badge (95% CI two-sided z-test)
 *   - control / treatment side-by-side tiles
 *   - honest directional-only labelling until thresholds are met
 *
 * Props are fully serialisable so these components cross the RSC boundary from
 * the server page with no issues.
 */

import type { ExperimentMeta, ExperimentPrimary } from "../../console/components/experimentMetaTypes";
import type {
  ExperimentArms,
  ExperimentFunnelArms,
} from "../adminData";

// ── Thresholds (match original Property dashboard) ────────────────────────

/** Sessions per arm before conversion-card results are considered non-directional. */
const AB_MIN_SESSIONS = 100;
/** Exposures per arm before building-block card results are considered non-directional. */
const MIN_EXPOSED = 50;

// ── Helpers ───────────────────────────────────────────────────────────────

function pct(v: number | null | undefined): string {
  return v == null ? "-" : `${(v * 100).toFixed(1)}%`;
}

// ── ExperimentCard (dispatcher) ───────────────────────────────────────────

export function ExperimentCard({
  meta,
  arms,
  funnel,
}: {
  meta: ExperimentMeta;
  arms: ExperimentArms;
  funnel?: ExperimentFunnelArms;
}) {
  // Route on the presence of a primary metric declaration, NOT on whether funnel
  // data has arrived yet. The building-block card handles its own empty state.
  if (meta.primary) {
    return (
      <BuildingBlockCard
        meta={meta}
        primary={meta.primary}
        funnel={funnel ?? { control: null, treatment: null }}
      />
    );
  }
  return <ConversionCard meta={meta} arms={arms} />;
}

// ── BuildingBlockCard ────────────────────────────────────────────────────

function BuildingBlockCard({
  meta,
  primary,
  funnel,
}: {
  meta: ExperimentMeta;
  primary: ExperimentPrimary;
  funnel: ExperimentFunnelArms;
}) {
  const { control, treatment } = funnel;
  const hasBoth = !!control && !!treatment;
  const cExp = control?.exposed ?? 0;
  const tExp = treatment?.exposed ?? 0;
  const cAct = control?.acted ?? 0;
  const tAct = treatment?.acted ?? 0;
  const cRate = cExp > 0 ? cAct / cExp : 0;
  const tRate = tExp > 0 ? tAct / tExp : 0;
  const enough = hasBoth && cExp >= MIN_EXPOSED && tExp >= MIN_EXPOSED;
  const relLift = cRate > 0 ? (tRate - cRate) / cRate : null;

  let significant: boolean | null = null;
  if (hasBoth && cExp > 0 && tExp > 0) {
    const pPool = (cAct + tAct) / (cExp + tExp);
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / cExp + 1 / tExp));
    if (se > 0) significant = Math.abs((tRate - cRate) / se) >= 1.96;
  }

  const cConv = cExp > 0 ? (control!.converted / cExp) : null;
  const tConv = tExp > 0 ? (treatment!.converted / tExp) : null;
  const guard = primary.guardrail;
  const cPhone = guard ? (cAct > 0 ? control!.acted_with_phone / cAct : null) : null;
  const tPhone = guard ? (tAct > 0 ? treatment!.acted_with_phone / tAct : null) : null;

  let headline: React.ReactNode;
  let headlineClass = "text-slate-900";
  if (!hasBoth) {
    headline = "Waiting for both arms to be seen";
    headlineClass = "text-slate-500";
  } else if (!enough) {
    headline = `Not enough exposure yet, directional only (need ~${MIN_EXPOSED}+ per arm)`;
    headlineClass = "text-amber-700";
  } else if (relLift == null) {
    headline = "Control has no actions yet, lift not computable";
    headlineClass = "text-slate-500";
  } else {
    const sign = relLift >= 0 ? "+" : "";
    headline = (
      <>
        <span className={relLift >= 0 ? "text-emerald-700" : "text-rose-700"}>
          {sign}{(relLift * 100).toFixed(0)}%
        </span>{" "}
        {primary.metricLabel.toLowerCase()} vs control
      </>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold text-emerald-900">{meta.label}</h3>
        {enough && significant != null && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              significant
                ? "bg-emerald-600 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {significant ? "Significant (95%)" : "Not yet significant"}
          </span>
        )}
      </div>

      <p className={`mt-1 text-xl font-bold ${headlineClass}`}>{headline}</p>
      <p className="mt-0.5 text-xs font-medium text-slate-500">
        {primary.metricLabel}: {primary.actionLabel} / {primary.exposureLabel}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Control</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(cExp > 0 ? cRate : null)}</div>
          <div className="mt-0.5 text-xs text-slate-500">{cExp} {primary.exposureLabel} - {cAct} acted</div>
          <div className="mt-1 text-[11px] text-slate-400">Leads (of exposed): {pct(cConv)}</div>
          {guard && <div className="mt-0.5 text-[11px] text-slate-400">{guard.label}: {pct(cPhone)}</div>}
          <div className="mt-1 text-[11px] text-slate-400">{meta.controlDesc}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Treatment</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(tExp > 0 ? tRate : null)}</div>
          <div className="mt-0.5 text-xs text-slate-500">{tExp} {primary.exposureLabel} - {tAct} acted</div>
          <div className="mt-1 text-[11px] text-slate-400">Leads (of exposed): {pct(tConv)}</div>
          {guard && <div className="mt-0.5 text-[11px] text-emerald-700/70">{guard.label}: {pct(tPhone)}</div>}
          <div className="mt-1 text-[11px] text-emerald-700/70">{meta.treatmentDesc}</div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Building block (more frequent than a lead, so it reads sooner). Leads shown as a secondary check; directional until each arm has ~{MIN_EXPOSED}+ exposures.
        {enough && significant === false && " The current gap could still be noise."}
      </p>
    </div>
  );
}

// ── ConversionCard ────────────────────────────────────────────────────────

function ConversionCard({
  meta,
  arms,
}: {
  meta: ExperimentMeta;
  arms: ExperimentArms;
}) {
  const { control, treatment } = arms;
  const hasBoth = !!control && !!treatment;
  const cRate = control?.conversion_rate ?? 0;
  const tRate = treatment?.conversion_rate ?? 0;
  const cSessions = control?.sessions ?? 0;
  const tSessions = treatment?.sessions ?? 0;
  const enough = hasBoth && cSessions >= AB_MIN_SESSIONS && tSessions >= AB_MIN_SESSIONS;
  const relLift = cRate > 0 ? (tRate - cRate) / cRate : null;

  let sig: { z: number; significant: boolean } | null = null;
  if (hasBoth && cSessions > 0 && tSessions > 0) {
    const cConv = control!.converted_sessions;
    const tConv = treatment!.converted_sessions;
    const pPool = (cConv + tConv) / (cSessions + tSessions);
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / cSessions + 1 / tSessions));
    if (se > 0) {
      const z = (tRate - cRate) / se;
      sig = { z, significant: Math.abs(z) >= 1.96 };
    }
  }

  let headline: React.ReactNode;
  let headlineClass = "text-slate-900";
  if (!hasBoth) {
    headline = "Waiting for both arms to log sessions";
    headlineClass = "text-slate-500";
  } else if (!enough) {
    headline = "Not enough data yet, directional only (need ~100+ sessions per arm)";
    headlineClass = "text-amber-700";
  } else if (relLift == null) {
    headline = "Control has no conversions yet, lift not computable";
    headlineClass = "text-slate-500";
  } else {
    const sign = relLift >= 0 ? "+" : "";
    const dir = relLift >= 0 ? "vs" : "below";
    headline = (
      <>
        <span className={relLift >= 0 ? "text-emerald-700" : "text-rose-700"}>
          {sign}{(relLift * 100).toFixed(0)}% conversions
        </span>{" "}
        {dir} control
      </>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold text-emerald-900">{meta.label}</h3>
        {enough && sig && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              sig.significant
                ? "bg-emerald-600 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {sig.significant ? "Significant (95%)" : "Not yet significant"}
          </span>
        )}
      </div>

      <p className={`mt-1 text-xl font-bold ${headlineClass}`}>{headline}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Control</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(control?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {cSessions} sessions - {control?.converted_sessions ?? 0} converted
          </div>
          <div className="mt-1 text-[11px] text-slate-400">{meta.controlDesc}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Treatment</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(treatment?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {tSessions} sessions - {treatment?.converted_sessions ?? 0} converted
          </div>
          <div className="mt-1 text-[11px] text-emerald-700/70">{meta.treatmentDesc}</div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Relative lift = (treatment vs control) / control. Directional until each arm has ~{AB_MIN_SESSIONS}+ sessions.
        {enough && sig && !sig.significant && " The current gap could still be noise."}
      </p>
    </div>
  );
}
