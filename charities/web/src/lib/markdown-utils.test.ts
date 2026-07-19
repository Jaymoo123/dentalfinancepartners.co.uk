import { describe, it, expect } from "vitest";
import { extractFaqs } from "./markdown-utils";
import { getAllGuides } from "./guides/content";

describe("extractFaqs", () => {
  it("extracts h3/p pairs after the FAQ heading, stripping tags", () => {
    const html = `<h2 id="intro">Intro</h2><p>x</p><h2 id="faq">Frequently asked questions</h2><h3 id="q1">Q one?</h3><p>Answer <a href="/x">one</a>.</p><h3 id="q2">Q two?</h3><p>Answer two.</p><ul><li>more</li></ul>`;
    expect(extractFaqs(html)).toEqual([
      { question: "Q one?", answer: "Answer one." },
      { question: "Q two?", answer: "Answer two. more" },
    ]);
  });

  it("returns [] when no FAQ section exists", () => {
    expect(extractFaqs("<h2>Other</h2><p>text</p>")).toEqual([]);
  });

  it("finds FAQs in every published guide", () => {
    for (const guide of getAllGuides()) {
      expect(extractFaqs(guide.html).length, guide.slug).toBeGreaterThan(0);
    }
  });
});
