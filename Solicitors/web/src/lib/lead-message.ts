/**
 * Pure helpers for composing the leads message column on the Solicitors site.
 *
 * Structured prefix lines are prepended so the receiving accountant can read
 * segment data at a glance without touching the payload schema.
 *
 * Rules:
 *  - Only include a prefix line when the value is non-empty.
 *  - Separate prefix block from user message with a blank line.
 *  - If there is no user message, return prefix lines only (no trailing blank).
 */

export interface LeadMessageArgs {
  /** Free-text context label, e.g. role or practice area. */
  context?: string;
  /** Secondary qualifier, e.g. firm type or entity structure. */
  qualifier?: string;
  /** User-supplied message from the form. */
  message?: string;
}

/**
 * Compose a lead message from structured context fields and an optional free-text message.
 */
export function composeLeadMessage({ context, qualifier, message }: LeadMessageArgs): string {
  const lines: string[] = [];

  if (context && context.trim()) {
    lines.push(`Context: ${context.trim()}`);
  }

  if (qualifier && qualifier.trim()) {
    lines.push(`Detail: ${qualifier.trim()}`);
  }

  const userMsg = message?.trim() ?? "";

  if (lines.length === 0) {
    return userMsg;
  }

  if (!userMsg) {
    return lines.join("\n");
  }

  return `${lines.join("\n")}\n\n${userMsg}`;
}

/**
 * Build a short human-readable summary prefix for health-check wizard submissions.
 * Keeps only the fields a partner needs at a glance; full answers go into extras.
 */
export interface HealthCheckSummaryArgs {
  role?: string;
  firmType?: string;
  practiceArea?: string;
  entity?: string;
  cofaInPlace?: boolean;
  topConcern?: string;
}

export function composeHealthCheckSummary({
  role,
  firmType,
  practiceArea,
  entity,
  cofaInPlace,
  topConcern,
}: HealthCheckSummaryArgs): string {
  const lines: string[] = ["Firm health check submission"];

  if (role) lines.push(`Role: ${role}`);
  if (firmType) lines.push(`Firm type: ${firmType}`);
  if (practiceArea) lines.push(`Practice area: ${practiceArea}`);
  if (entity) lines.push(`Entity: ${entity}`);
  if (cofaInPlace !== undefined) lines.push(`COFA in place: ${cofaInPlace ? "yes" : "NO"}`);
  if (topConcern && topConcern.trim()) lines.push(`Top concern: ${topConcern.trim()}`);

  return lines.join("\n");
}
