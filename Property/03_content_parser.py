import re
import os
import sys

# Add current directory to path for imports
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

# Import link validator
try:
    from link_validator import LinkValidator
    link_validator = LinkValidator()
except ImportError:
    link_validator = None
    print("Warning: link_validator not available, links won't be validated")

# Import service URL validator
try:
    from service_mappings import validate_and_fix_service_urls
except ImportError:
    validate_and_fix_service_urls = None

REQUIRED_KEYS = [
    "name", "slug", "category", "h1", "meta-title", "meta-description",
    "3-liner", "alt-tag", "image-prompt", "content",
    "FAQ1", "FAA1", "FAQ2", "FAA2", "FAQ3", "FAA3", "FAQ4", "FAA4"
]

def parse_deepseek_blocks(text):
    # Normalize all line endings to Unix-style
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Handle trailing whitespace after ==key== (e.g. ==name==  )
    pattern = r"==\s*(.+?)\s*==\s*\n"
    matches = list(re.finditer(pattern, text))

    result = {}
    for i, match in enumerate(matches):
        key = match.group(1).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        value = text[start:end].strip()

        # Check if key is duplicated
        if key in result:
            print(f"[!] Duplicate key detected: {key} — skipping second instance.")
        else:
            result[key] = value


    # Check for any missing required keys
    missing = [k for k in REQUIRED_KEYS if k not in result or not result[k].strip()]
    if missing:
        print(f"[!] WARNING: The following expected fields were missing or empty:\n{missing}\n")

    # Normalize headings: enforce H2-only by converting any <h3> tags to <h2>
    if "content" in result and result["content"]:
        result["content"] = sanitize_content(result["content"])[0]
        
        # Fix any incorrect service URLs in the content
        if validate_and_fix_service_urls:
            fixed_content, fixes = validate_and_fix_service_urls(result["content"])
            if fixes:
                print(f"[✓] Fixed {len(fixes)} incorrect service URLs in content:")
                for fix in fixes:
                    print(f"    - {fix}")
                result["content"] = fixed_content

    # --- Add Sanity-shaped keys alongside legacy fields ---
    try:
        # Direct field renames / synonyms
        result["title"] = result.get("name", "").strip() or result.get("title", "").strip()
        
        # Ensure meta-title is max 60 characters
        meta_title = result.get("meta-title", "").strip() or result.get("metaTitle", "").strip()
        if len(meta_title) > 60:
            print(f"[!] Meta title too long ({len(meta_title)} chars), truncating to 60")
            # Try to truncate at a word boundary
            meta_title = meta_title[:57] + "..."
            if " " in meta_title[:57]:
                meta_title = meta_title[:meta_title.rfind(" ", 0, 57)] + "..."
        result["metaTitle"] = meta_title
        
        # Ensure meta-description is max 160 characters
        meta_desc = result.get("meta-description", "").strip() or result.get("metaDescription", "").strip()
        if len(meta_desc) > 160:
            print(f"[!] Meta description too long ({len(meta_desc)} chars), truncating to 160")
            meta_desc = meta_desc[:157] + "..."
            if " " in meta_desc[:157]:
                meta_desc = meta_desc[:meta_desc.rfind(" ", 0, 157)] + "..."
        result["metaDescription"] = meta_desc
        result["summary"] = result.get("3-liner", "").strip() or result.get("summary", "").strip()
        result["altTag"] = result.get("alt-tag", "").strip() or result.get("altTag", "").strip()
        result["imageUrl"] = result.get("image", "").strip() or result.get("imageUrl", "").strip()
        result["imagePrompt"] = result.get("image-prompt", "").strip() or result.get("imagePrompt", "").strip()
        result["contentHtml"] = result.get("content", "").strip() or result.get("contentHtml", "").strip()
        result["schemaJson"] = result.get("schema", "").strip() or result.get("schemaJson", "").strip()

        # FAQs as an array
        faqs = []
        for i in range(1, 5):
            q = result.get(f"FAQ{i}", "").strip()
            a = result.get(f"FAA{i}", "").strip()
            if q or a:
                faqs.append({"question": q, "answer": a})
        result["faqs"] = faqs
    except Exception:
        pass

    return result


def sanitize_content(content: str) -> tuple[str, list[str]]:
    """Apply heading normalization, internal link sanitization, and rule corrections.
    Returns (sanitized_content, violations). Violations are generally empty because
    rule corrections are applied inline; reserve for future hard-block cases.
    """
    violations: list[str] = []
    html = content.replace("<h3>", "<h2>").replace("</h3>", "</h2>")
    
    try:
        from urllib.parse import urlparse
        import config
        import rules

        # Use LinkValidator if available
        if link_validator:
            # Validate and fix all internal links using LinkValidator
            html, fixes_made = link_validator.validate_content(html)
            if fixes_made:
                print(f"[LinkValidator] Fixed {len(fixes_made)} invalid links:")
                for fix in fixes_made[:5]:  # Show first 5 fixes
                    print(f"  - {fix}")
                if len(fixes_made) > 5:
                    print(f"  ... and {len(fixes_made) - 5} more")
        else:
            # Fallback to basic validation if LinkValidator not available
            def _rewrite_href(match: re.Match) -> str:
                full = match.group(0)
                href = match.group(1)
                # Absolute link on our domain → reduce to path
                if href.startswith(config.SITE_BASE_URL):
                    parsed = urlparse(href)
                    path = parsed.path or "/"
                else:
                    path = href
                # Only process internal links (start with /)
                if not path.startswith("/"):
                    return full
                # Whitelist check
                if path in config.INTERNAL_LINK_WHITELIST or any(path.startswith(p) for p in getattr(config, "INTERNAL_LINK_ALLOWED_PREFIXES", [])):
                    return full
                # Otherwise rewrite to fallback
                safe = config.INTERNAL_LINK_FALLBACK
                print(f"[Warning] Rewriting invalid link: {href} → {safe}")
                return full.replace(href, safe)

            html = re.sub(r'<a\s+href=\"([^\"]+)\"', _rewrite_href, html)

        # Apply canonical corrections/guards (returns corrected content; violations currently unused)
        corrected, rule_violations = rules.apply_canonical_corrections(html)
        html = corrected
        # Do not block publish for corrected content; keep list for optional logging
        violations.extend(rule_violations or [])
    except Exception as e:
        print(f"[Warning] Error in sanitize_content: {e}")

    return html, violations
