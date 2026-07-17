/**
 * Pure HTML split utilities for blog post island injection.
 * No React, no imports — plain string → string/null.
 *
 * Site-specific topic→tool mapping stays in the caller (BlogPostRenderer).
 */

/**
 * Split at the FIRST h2 (~20-25% into most articles) for early tool injection.
 * Falls back to after the first 2 closing </p> tags when there is no h2, and
 * to whole-article-before / empty-after when there is no usable break at all,
 * so EVERY post can be injected into.
 */
export function splitContentEarly(html: string): { before: string; after: string } {
  const firstH2 = html.search(/<h2[^>]*>/);
  if (firstH2 > 0) {
    return { before: html.slice(0, firstH2), after: html.slice(firstH2) };
  }
  const paragraphRe = /<\/p>/g;
  let m: RegExpExecArray | null;
  let count = 0;
  let cut = -1;
  while ((m = paragraphRe.exec(html)) !== null) {
    count += 1;
    if (count === 2) {
      cut = m.index + m[0].length;
      break;
    }
  }
  if (cut > 0 && cut < html.length) {
    return { before: html.slice(0, cut), after: html.slice(cut) };
  }
  return { before: html, after: "" };
}

/**
 * Find a second, later split point in the post-early-tool remainder for the
 * email gate. Targets a heading roughly half-way through the remainder.
 * Returns after=null when the remainder has no further heading (caller drops
 * the gate directly under the tool instead).
 */
export function splitRemainderForGate(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  if (headings.length < 2) {
    return { before: html, after: null };
  }
  const targetIdx = Math.max(1, Math.floor(headings.length * 0.5));
  const target = headings[targetIdx];
  if (target?.index === undefined) {
    return { before: html, after: null };
  }
  return { before: html.slice(0, target.index), after: html.slice(target.index) };
}

/**
 * Mid-scroll split for the fallback InlineMiniLeadForm (no premium tool/gate).
 * Targets ~60% into the article (after 60% of h2 headings).
 * Returns after=null when there are fewer than 4 h2 headings.
 */
export function splitContentAtMidScroll(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  if (headings.length < 4) {
    return { before: html, after: null };
  }
  const targetIdx = Math.floor(headings.length * 0.6);
  const target = headings[targetIdx];
  if (target?.index === undefined) {
    return { before: html, after: null };
  }
  return { before: html.slice(0, target.index), after: html.slice(target.index) };
}
