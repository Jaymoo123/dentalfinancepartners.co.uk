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
