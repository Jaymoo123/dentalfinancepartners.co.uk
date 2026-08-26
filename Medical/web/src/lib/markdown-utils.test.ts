import { describe, it, expect } from "vitest";
import { splitLabelledLine } from "./markdown-utils";
import { MEDICAL_GUIDES } from "./medical-guides-data";

describe("splitLabelledLine", () => {
  it("splits a labelled line so the caller can render a real <strong>", () => {
    expect(splitLabelledLine("1995 section: 1/80th of final pay.")).toEqual({
      label: "1995 section",
      rest: "1/80th of final pay.",
    });
    expect(splitLabelledLine("Sole trader: After income tax, net is lower.")).toEqual({
      label: "Sole trader",
      rest: "After income tax, net is lower.",
    });
  });

  it("strips a leading ordinal before matching", () => {
    expect(splitLabelledLine("2. PAYE company: withheld at source.").label).toBe("PAYE company");
  });

  it("returns no label when the line is plain prose", () => {
    expect(splitLabelledLine("Personal service: can you send a substitute?")).toEqual({
      label: null,
      rest: "Personal service: can you send a substitute?",
    });
  });

  // The original defect: a literal "<strong>" string was injected into a React text
  // node, so readers saw the tag. No returned value may ever contain raw markup.
  it("never returns markup for any line in the live guide corpus", () => {
    let lines = 0;
    for (const guide of MEDICAL_GUIDES) {
      for (const section of guide.sections) {
        for (const line of section.body.split("\n")) {
          if (!line) continue;
          lines++;
          const { label, rest } = splitLabelledLine(line);
          expect(`${label ?? ""}${rest}`).not.toMatch(/<\/?[a-z]/i);
        }
      }
    }
    expect(lines).toBeGreaterThan(50);
  });
});
