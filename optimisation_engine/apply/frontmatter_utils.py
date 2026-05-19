"""
Safe YAML frontmatter read/write for the site blog markdown files.

The site MD files use:
  ---
  yaml: fields
  ---
  body content (which may be HTML-in-markdown)

We preserve the body byte-for-byte (no markdown re-render). For frontmatter
we round-trip via PyYAML, which handles standard YAML cleanly but loses
comments and formatting nuances. The trade-off is acceptable because
frontmatter fields are simple scalars and lists.

Atomic write: write to <path>.tmp, then os.replace().
"""
from __future__ import annotations

import io
import os
import re
from pathlib import Path
from typing import Any

import yaml

FRONTMATTER_DELIM = "---"


class FrontmatterError(Exception):
    pass


def read(path: Path | str) -> tuple[dict, str]:
    """Read a markdown file. Returns (frontmatter_dict, body_string).

    Raises FrontmatterError if structure is malformed.
    """
    p = Path(path)
    if not p.exists():
        raise FrontmatterError(f"File not found: {p}")
    text = p.read_text(encoding="utf-8")
    if not text.startswith(FRONTMATTER_DELIM):
        raise FrontmatterError(f"{p} does not start with frontmatter delimiter '---'")

    # Find the closing delimiter
    m = re.match(r"^---\s*\n(.+?)\n---\s*\n?(.*)$", text, flags=re.DOTALL)
    if not m:
        raise FrontmatterError(f"{p} has no closing '---' delimiter")

    fm_raw = m.group(1)
    body = m.group(2)
    try:
        fm = yaml.safe_load(fm_raw) or {}
    except yaml.YAMLError as exc:
        raise FrontmatterError(f"YAML parse error in {p}: {exc}") from exc

    if not isinstance(fm, dict):
        raise FrontmatterError(f"{p} frontmatter is not a mapping (got {type(fm).__name__})")

    return fm, body


def write(path: Path | str, frontmatter: dict, body: str, *, atomic: bool = True) -> None:
    """Write the file. Atomic via temp + os.replace.

    Frontmatter is dumped via yaml.safe_dump with default_flow_style=False so
    output is human-readable.
    """
    p = Path(path)
    fm_yaml = yaml.safe_dump(
        frontmatter,
        default_flow_style=False,
        sort_keys=False,
        allow_unicode=True,
        width=2_000,  # don't wrap long strings
    )
    # PyYAML appends a trailing newline; strip it then add our own to keep the form exact
    fm_yaml = fm_yaml.rstrip("\n")
    content = f"---\n{fm_yaml}\n---\n{body}"

    if atomic:
        tmp = p.with_suffix(p.suffix + ".tmp")
        tmp.write_text(content, encoding="utf-8", newline="\n")
        os.replace(tmp, p)
    else:
        p.write_text(content, encoding="utf-8", newline="\n")


def update_fields(path: Path | str, updates: dict, *, preserve_prev: dict[str, str] | None = None) -> tuple[dict, dict]:
    """Convenience: read -> apply updates -> optionally preserve previous as _prev fields -> write.

    Args:
        path: file path
        updates: {field_name: new_value}
        preserve_prev: {field_name: prev_field_name} — when updating field X to new value,
                       move OLD value into prev_field_name.

    Returns:
        (old_frontmatter, new_frontmatter)
    """
    fm, body = read(path)
    old_fm = dict(fm)

    if preserve_prev:
        for field_name, prev_field_name in preserve_prev.items():
            if field_name in fm and field_name in updates:
                fm[prev_field_name] = fm[field_name]

    fm.update(updates)
    write(path, fm, body)
    return old_fm, fm


def verify_round_trip(path: Path | str) -> bool:
    """After write, re-read and confirm the file is still parseable."""
    try:
        read(path)
        return True
    except FrontmatterError:
        return False


# -- body manipulation helpers used by link/section apply modules --


def insert_after_first_match(body: str, pattern: str, insertion: str) -> tuple[str, int]:
    """Insert `insertion` immediately after the first regex match of `pattern`.

    Returns (new_body, count_inserted). count_inserted is 1 on success, 0 if
    no match was found (in which case body is unchanged).
    """
    m = re.search(pattern, body, flags=re.IGNORECASE | re.DOTALL)
    if not m:
        return body, 0
    end = m.end()
    return body[:end] + insertion + body[end:], 1


def replace_first_phrase_with_link(body: str, phrase: str, anchor: str, url: str) -> tuple[str, int]:
    """Replace the first occurrence of `phrase` in body with a markdown link.

    The link uses the anchor text and the URL. If the phrase isn't found
    case-sensitively, tries case-insensitive. Returns (new_body, count_replaced).
    """
    if phrase in body:
        return body.replace(phrase, f"[{anchor}]({url})", 1), 1
    # Case-insensitive fallback
    m = re.search(re.escape(phrase), body, flags=re.IGNORECASE)
    if m:
        return body[: m.start()] + f"[{anchor}]({url})" + body[m.end() :], 1
    return body, 0


def body_has_url(body: str, url: str) -> bool:
    """Does the body already contain a link to this URL?"""
    return url in body


def estimate_word_count(body: str) -> int:
    # Strip HTML tags then split
    text = re.sub(r"<[^>]+>", " ", body)
    return len(text.split())
