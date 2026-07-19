export function addHeadingIds(html: string): string {
  const headingRegex = /<(h[23])>(.*?)<\/\1>/gi;
  let counter = 0;

  return html.replace(headingRegex, (match, tag, content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const uniqueId = id || `heading-${counter++}`;
    return `<${tag} id="${uniqueId}">${content}</${tag}>`;
  });
}

export function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /<h([23])\s+id="([^"]+)">(.*?)<\/h\1>/gi;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Extract Q&A pairs from a "Frequently asked questions" section:
 * each <h3> is a question, everything until the next <h3>/<h2> is the answer.
 * Returns plain-text pairs suitable for FAQPage JSON-LD (uses copy verbatim, tags stripped).
 */
export function extractFaqs(html: string): Array<{ question: string; answer: string }> {
  const sectionMatch = /<h2[^>]*>\s*Frequently asked questions\s*<\/h2>([\s\S]*?)(?=<h2[^>]*>|$)/i.exec(html);
  if (!sectionMatch) return [];

  const faqs: Array<{ question: string; answer: string }> = [];
  const qaRegex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
  const strip = (s: string) =>
    s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").replace(/ ([.,;:)])/g, "$1").trim();
  let m;
  while ((m = qaRegex.exec(sectionMatch[1])) !== null) {
    const question = strip(m[1]);
    const answer = strip(m[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}
