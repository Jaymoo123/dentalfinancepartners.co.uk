/**
 * Pure helper functions for message prefixes on contextual lead captures.
 * Unit-testable with no side-effects.
 */

/**
 * Returns the message prefix used when a lead is submitted from a calculator
 * result page, e.g. "[Calculator: salary-dividend] ".
 */
export function calculatorMessagePrefix(slug: string): string {
  return `[Calculator: ${slug}] `;
}

/**
 * Returns the message prefix used when a lead is submitted via the exit-intent
 * capture, e.g. "[Exit intent (Corporation Tax)] ".
 */
export function exitIntentMessagePrefix(topicLabel: string): string {
  return `[Exit intent (${topicLabel})] `;
}
