"use client";

/**
 * Lightweight form-lifecycle tracking. Wire the returned handlers into a lead
 * form to capture where users start, hesitate, abandon, error, and submit.
 *
 * Pass opts.flow = "multi" for stepped forms to activate step-level helpers.
 * Carries NO field values, only field names + outcome — no PII.
 */
import { useCallback, useRef } from "react";
import { track } from "../track";
import { setConverted } from "../visitMemory";

interface FormTrackingOpts {
  flow?: "single" | "multi";
}

export function useFormTracking(formId: string, opts?: FormTrackingOpts) {
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const flow = opts?.flow ?? "single";

  const onFieldFocus = useCallback(
    (field: string) => {
      if (!startedRef.current) {
        startedRef.current = true;
        track("form_start", { form_id: formId, first_field: field, flow });
      }
      track("form_field_focus", { form_id: formId, field, flow });
    },
    [formId, flow],
  );

  const onFieldBlur = useCallback(
    (field: string, hadValue: boolean, charLen?: number) => {
      if (completedRef.current) return;
      if (!hadValue) {
        track("form_field_abandon", { form_id: formId, field, had_value: false, flow });
      } else if (field === "email" && typeof charLen === "number") {
        track("form_field_abandon", { form_id: formId, field, had_value: true, char_len: charLen, flow });
      }
    },
    [formId, flow],
  );

  const onError = useCallback(
    (field: string, errorKind: string, step?: number) => {
      track("form_error", { form_id: formId, field, error_kind: errorKind, flow, step });
    },
    [formId, flow],
  );

  const onSubmit = useCallback(
    (fieldsCompleted: number) => {
      track("form_submit", { form_id: formId, fields_completed: fieldsCompleted, flow });
    },
    [formId, flow],
  );

  const onLead = useCallback(
    (extra: Record<string, string | number | boolean> = {}) => {
      completedRef.current = true;
      setConverted();
      track("lead_submitted", { form_id: formId, ...extra, flow });
    },
    [formId, flow],
  );

  const onStepView = useCallback(
    (step: number, stepId: string) => {
      track("form_step_view", { form_id: formId, step, step_id: stepId, flow });
    },
    [formId, flow],
  );

  const onStepComplete = useCallback(
    (step: number, stepId: string, extra?: { ms_on_step?: number; lead_role?: string }) => {
      track("form_step_complete", { form_id: formId, step, step_id: stepId, flow, ...extra });
    },
    [formId, flow],
  );

  const onStepBack = useCallback(
    (fromStep: number, toStep: number) => {
      track("form_step_back", { form_id: formId, from_step: fromStep, to_step: toStep, flow });
    },
    [formId, flow],
  );

  return { onFieldFocus, onFieldBlur, onError, onSubmit, onLead, onStepView, onStepComplete, onStepBack };
}
