"use client";

import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { CALC_CAPTURE_BLURB, CALC_CAPTURE_HEADING } from "@/lib/calculators/site";
import { MiniCapture } from "./MiniCapture";

export function CalcResultCta({ campaign }: { campaign: string }) {
  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      {/* ExampleFigureNote: its docstring (packages/web-shared/design/primitives/
          ExampleFigureNote.tsx:1-21) rules that the note goes on EVERY visual
          carrying figures, statutory ones included, and that StatsCounter is the
          one deliberate exception. This sits directly under the result panel,
          which is the visual carrying the figures. The default label is the
          intended string: these three tools are explicitly scenario estimates. */}
      <ExampleFigureNote className="mb-4" />
      <MiniCapture
        formId="calc_result"
        messagePrefix={`[Calculator: ${campaign}]`}
        heading={CALC_CAPTURE_HEADING}
        blurb={CALC_CAPTURE_BLURB}
        submitLabel="Get my figures checked"
        className="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-5 sm:p-6"
      />
    </div>
  );
}
