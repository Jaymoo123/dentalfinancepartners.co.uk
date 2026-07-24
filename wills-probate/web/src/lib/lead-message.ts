/**
 * Pure helper for composing the leads message column.
 *
 * Structured prefix lines are prepended so the partner can read
 * segment data at a glance without touching the payload schema.
 *
 * Rules:
 *  - Only include a prefix line when the value is non-empty.
 *  - Separate prefix block from user message with a blank line.
 *  - If there is no user message, return prefix lines only (no trailing blank).
 */

export interface LeadMessageArgs {
  trade?: string;
  subbieCount?: string;
  message?: string;
}

export function composeLeadMessage({ trade, subbieCount, message }: LeadMessageArgs): string {
  const lines: string[] = [];

  if (trade && trade.trim()) {
    lines.push(`Trade: ${trade.trim()}`);
  }

  if (subbieCount && subbieCount.trim()) {
    lines.push(`Subcontractors paid: ${subbieCount.trim()}`);
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
