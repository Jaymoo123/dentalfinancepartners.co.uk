"use client";

import { useState } from "react";

/**
 * Renders a copy-paste code snippet with a "Copy" button, used on the
 * self-serve embed gallery so partner sites can grab an iframe snippet in one
 * click.
 */
export function EmbedSnippet({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can select manually.
    }
  };

  return (
    <div className="relative">
      {label && (
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div>
      )}
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 pr-20 text-xs leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 rounded bg-[var(--brand-primary)] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[var(--brand-primary-strong)]"
        aria-label="Copy code to clipboard"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
