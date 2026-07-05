/**
 * Pure helper functions for message prefixes on contextual lead captures.
 * Unit-testable with no side-effects.
 */

/**
 * Returns the message prefix used when a lead is submitted from a calculator
 * result page, e.g. "[Calculator: locum-tax-calculator] ".
 */
export function calculatorMessagePrefix(slug: string): string {
  return `[Calculator: ${slug}] `;
}

/**
 * Returns the message prefix used when a lead is submitted via the exit-intent
 * capture, e.g. "[Exit intent (NHS Pension Planning)] ".
 */
export function exitIntentMessagePrefix(topicLabel: string): string {
  return `[Exit intent (${topicLabel})] `;
}

/**
 * Returns the message prefix used when a lead is submitted via the health
 * check wizard, including the role and key findings.
 */
export function healthCheckMessagePrefix(role: string, findings: string[]): string {
  const findingsSummary = findings.length > 0 ? findings.slice(0, 3).join("; ") : "no high-priority findings";
  return `[Health check: role=${role}] ${findingsSummary}. `;
}
