"use client";

/**
 * NumberInput — string-backed controlled number input for bespoke calculators.
 *
 * Solves the rage-click bug: a plain <input type="number"> whose onChange does
 * Number(e.target.value) snaps a cleared box to 0, making it impossible to
 * clear and re-type a value. This component holds a local string so the user
 * can freely edit (including clearing the box). Parsing + clamping happens on
 * a valid numeric entry and on blur, at which point onChange(number) is called
 * with the resolved, clamped value.
 *
 * Props mirror a plain <input> as closely as possible so drop-in replacement
 * is mechanical.
 */

import { useState } from "react";

interface NumberInputProps {
  /** Controlled numeric value driven by the parent. */
  value: number;
  /** Called with a non-negative number when the value changes. */
  onChange: (value: number) => void;
  /** Minimum allowed value. Defaults to 0 (all calculator amounts are non-negative). */
  min?: number;
  id?: string;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  id,
  placeholder,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: NumberInputProps) {
  // Initialise the text box from the incoming numeric value.
  const [text, setText] = useState<string>(() =>
    Number.isFinite(value) ? String(value) : String(min)
  );
  // Track the last value driven from outside so we can resync if the parent
  // changes value (e.g. a reset button) without an intermediate user edit.
  const [lastExternal, setLastExternal] = useState<number>(value);

  // If the parent has changed the numeric value from outside (not via our own
  // onChange), resync the text box. This handles e.g. programmatic resets.
  if (value !== lastExternal) {
    setLastExternal(value);
    setText(Number.isFinite(value) ? String(value) : String(min));
  }

  const clamp = (n: number) => Math.max(min, Number.isFinite(n) ? n : min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow: empty string, digits, one decimal point, no negatives.
    if (/^\d*\.?\d*$/.test(raw)) {
      setText(raw);
      // Only fire the numeric callback when there is a parseable number.
      if (raw !== "" && raw !== ".") {
        onChange(clamp(Number(raw)));
      }
    }
    // Reject anything that doesn't match (e.g. letters) by simply not updating.
  };

  const handleBlur = () => {
    // Resolve empty / partial entry to the minimum (0 for all current inputs).
    const n = text === "" || text === "." ? min : Number(text);
    const clamped = clamp(n);
    // Normalise the display: remove trailing dot, collapse "0.0" -> "0", etc.
    setText(String(clamped));
    onChange(clamped);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    />
  );
}
