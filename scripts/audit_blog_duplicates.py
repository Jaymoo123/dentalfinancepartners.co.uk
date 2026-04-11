"""
Audit all blog posts for duplicate content signals:
1. Exact duplicate h2/h3 headings within a single post
2. Near-duplicate headings (semantic overlap via fuzzy match)
3. Repeated topic blocks (Section 24, MTD, CGT, incorporation mentioned in 3+ separate sections)
4. Inconsistent tax rates / years within a single post
"""

import os
import re
import sys
import collections
from difflib import SequenceMatcher

SITES = {
    "Property": os.path.join("Property", "web", "content", "blog"),
    "Dentists": os.path.join("Dentists", "web", "content", "blog"),
    "Medical": os.path.join("Medical", "web", "content", "blog"),
    "Solicitors": os.path.join("Solicitors", "web", "content", "blog"),
}

CGT_RATE_PATTERNS = [
    re.compile(r'(\d{1,2})%\s*(?:and|or|/)\s*(\d{1,2})%\s*(?:CGT|capital gains)', re.IGNORECASE),
    re.compile(r'CGT\s*(?:rate|rates)?\s*(?:of|at)?\s*(\d{1,2})%\s*(?:and|or|/)\s*(\d{1,2})%', re.IGNORECASE),
    re.compile(r'(?:capital gains tax)\s*(?:rate|rates)?\s*(?:of|at)?\s*(\d{1,2})%\s*(?:and|or|/)\s*(\d{1,2})%', re.IGNORECASE),
    re.compile(r'(\d{1,2})%\s*CGT', re.IGNORECASE),
    re.compile(r'subject to (\d{1,2})%', re.IGNORECASE),
]

CORP_TAX_PATTERNS = [
    re.compile(r'corporation tax\s*(?:rate|rates)?\s*(?:of|at|is)?\s*(\d{1,2})%', re.IGNORECASE),
    re.compile(r'(\d{1,2})%\s*corporation tax', re.IGNORECASE),
]

TOPIC_KEYWORDS = {
    "Section 24": re.compile(r'section 24', re.IGNORECASE),
    "MTD": re.compile(r'making tax digital|MTD|quarterly\s+(?:digital\s+)?report', re.IGNORECASE),
    "Incorporation": re.compile(r'incorporat(?:ion|ing|e)|limited company|company structure', re.IGNORECASE),
    "CGT": re.compile(r'capital gains tax|CGT|property disposal', re.IGNORECASE),
}


def get_body(content):
    parts = content.split("---", 2)
    if len(parts) < 3:
        return ""
    return parts[2]


def get_sections(body):
    """Split body into sections by h2 headings, return list of (heading_text, section_body)."""
    pattern = re.compile(r'<h2(?:\s[^>]*)?>(.*?)</h2>', re.IGNORECASE | re.DOTALL)
    matches = list(pattern.finditer(body))
    sections = []
    for i, m in enumerate(matches):
        heading = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        sections.append((heading, body[start:end]))
    return sections


def similar(a, b, threshold=0.65):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio() >= threshold


def audit_post(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    body = get_body(content)
    if not body.strip():
        return []

    findings = []
    fname = os.path.basename(filepath)

    # 1. Exact duplicate headings
    headings = re.findall(r'<(h[23])(?:\s[^>]*)?>(.*?)</\1>', body, re.IGNORECASE | re.DOTALL)
    heading_texts = [re.sub(r'<[^>]+>', '', h[1]).strip() for h in headings]
    counts = collections.Counter(heading_texts)
    for h, c in counts.items():
        if c > 1:
            findings.append(("DUPLICATE_HEADING", f'"{h}" appears {c}x'))

    # 2. Near-duplicate headings (fuzzy)
    seen_pairs = set()
    for i, h1 in enumerate(heading_texts):
        for j, h2 in enumerate(heading_texts):
            if j <= i:
                continue
            if h1 == h2:
                continue
            pair_key = tuple(sorted([h1, h2]))
            if pair_key in seen_pairs:
                continue
            if similar(h1, h2, 0.65):
                seen_pairs.add(pair_key)
                findings.append(("SIMILAR_HEADING", f'"{h1}" ~ "{h2}"'))

    # 3. Topic sprawl: same topic in 3+ separate h2 sections
    sections = get_sections(body)
    for topic_name, pattern in TOPIC_KEYWORDS.items():
        mentioning_sections = []
        for heading, section_body in sections:
            if pattern.search(heading) or (pattern.search(section_body) and len(section_body) > 100):
                mentioning_sections.append(heading)
        if len(mentioning_sections) >= 3:
            findings.append(("TOPIC_SPRAWL", f'"{topic_name}" discussed in {len(mentioning_sections)} sections: {mentioning_sections[:5]}'))

    # 4. Inconsistent CGT rates within single post
    cgt_rates_found = set()
    for pat in CGT_RATE_PATTERNS:
        for m in pat.finditer(body):
            groups = [g for g in m.groups() if g]
            for g in groups:
                val = int(g)
                if 10 <= val <= 45:
                    cgt_rates_found.add(val)
    if len(cgt_rates_found) >= 3:
        findings.append(("CGT_RATE_INCONSISTENCY", f"Multiple CGT rates referenced: {sorted(cgt_rates_found)}"))

    # 5. Stale corp tax rate
    for pat in CORP_TAX_PATTERNS:
        for m in pat.finditer(body):
            rate = int(m.group(1))
            if rate == 19:
                context = body[max(0, m.start()-50):m.end()+50].replace('\n', ' ').strip()
                findings.append(("STALE_CORP_TAX", f"19% corporation tax reference: ...{context[-80:]}..."))

    # 6. Total heading count (bloat signal)
    h2_count = len([h for h in headings if h[0].lower() == 'h2'])
    if h2_count > 12:
        findings.append(("EXCESSIVE_H2", f"{h2_count} h2 headings (potential content bloat)"))

    return [(fname, f_type, detail) for f_type, detail in findings]


def main():
    target_site = sys.argv[1] if len(sys.argv) > 1 else None

    sites_to_audit = {}
    if target_site and target_site in SITES:
        sites_to_audit[target_site] = SITES[target_site]
    else:
        sites_to_audit = SITES

    for site_name, blog_dir in sites_to_audit.items():
        if not os.path.isdir(blog_dir):
            print(f"\n=== {site_name}: directory not found ===")
            continue

        files = sorted(f for f in os.listdir(blog_dir) if f.endswith(".md"))
        all_findings = []

        for fname in files:
            fpath = os.path.join(blog_dir, fname)
            findings = audit_post(fpath)
            all_findings.extend(findings)

        print(f"\n{'='*70}")
        print(f"  {site_name} ({len(files)} posts)")
        print(f"{'='*70}")

        if not all_findings:
            print("  No issues found.")
            continue

        by_type = collections.defaultdict(list)
        for fname, f_type, detail in all_findings:
            by_type[f_type].append((fname, detail))

        type_labels = {
            "DUPLICATE_HEADING": "Exact Duplicate Headings",
            "SIMILAR_HEADING": "Near-Duplicate Headings (fuzzy)",
            "TOPIC_SPRAWL": "Topic Sprawl (same topic in 3+ sections)",
            "CGT_RATE_INCONSISTENCY": "CGT Rate Inconsistencies",
            "STALE_CORP_TAX": "Stale Corporation Tax Rate (19%)",
            "EXCESSIVE_H2": "Excessive H2 Count (>12)",
        }

        for f_type in ["DUPLICATE_HEADING", "SIMILAR_HEADING", "TOPIC_SPRAWL",
                        "CGT_RATE_INCONSISTENCY", "STALE_CORP_TAX", "EXCESSIVE_H2"]:
            items = by_type.get(f_type, [])
            if not items:
                continue
            print(f"\n  --- {type_labels.get(f_type, f_type)} ({len(items)} issues) ---")
            for fname, detail in items:
                print(f"    {fname}")
                print(f"      {detail}")

        total = len(all_findings)
        affected = len(set(f[0] for f in all_findings))
        print(f"\n  TOTAL: {total} issues across {affected} posts")


if __name__ == "__main__":
    main()
