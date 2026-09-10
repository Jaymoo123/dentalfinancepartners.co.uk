"use client";

import { Printer } from "lucide-react";
import { btnSecondary } from "@/components/ui/layout-utils";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className={`${btnSecondary} flex-shrink-0`}
    >
      <Printer className="h-4 w-4" />
      Print / Save as PDF
    </button>
  );
}
