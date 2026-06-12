"""
blog_provenance.py  —  classify every blog post by model-era (deterministic, no LLM calls).

Usage:
    python scripts/blog_provenance.py --site <key>
    python scripts/blog_provenance.py --all

Sites:  dentists | medical | solicitors | generalist | agency
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO = Path(__file__).resolve().parents[1]

SITE_CONFIG: dict[str, dict] = {
    "dentists": {
        "content_dir": REPO / "Dentists" / "web" / "content" / "blog",
        "expected": 204,
    },
    "medical": {
        "content_dir": REPO / "Medical" / "web" / "content" / "blog",
        "expected": 73,
    },
    "solicitors": {
        "content_dir": REPO / "Solicitors" / "web" / "content" / "blog",
        "expected": 183,
    },
    "generalist": {
        "content_dir": REPO / "generalist" / "web" / "content" / "blog",
        "expected": 366,
    },
    "agency": {
        "content_dir": REPO / "digital-agency" / "web" / "content" / "blog",
        "expected": 306,
    },
}

# Commits that mask true origin → set confidence='low'
ORIGIN_MASKING_COMMITS = {
    "5da8276aafba90e258322db0d53a6c9c8759d2de",  # generalist baseline snapshot
    "bf3eaf2f8de30ca502f96d81f38981e19666bbac",  # agency subtree-merge
    "bc880b1f4b692d748a8fa7ea2ee034230c7de763",  # agency rename
}


# ---------------------------------------------------------------------------
# Git helpers
# ---------------------------------------------------------------------------

def _git(cmd: list[str], *, cwd: Path = REPO) -> str:
    """Run a git command and return stdout as UTF-8 string."""
    result = subprocess.run(
        ["git", "-c", "core.quotepath=false"] + cmd,
        capture_output=True,
        cwd=str(cwd),
    )
    return result.stdout.decode("utf-8", errors="replace")


def _build_add_map(pathspec: str) -> dict[str, tuple[str, str, str]]:
    """One-pass: git log diff-filter=A for a pathspec.

    Returns {relpath_from_repo_root → (date_str, sha, subject)}.
    date_str = YYYY-MM-DD, sha = full 40-char, subject = commit subject.
    """
    raw = _git([
        "log", "--diff-filter=A",
        "--date=short",
        "--pretty=format:COMMIT|%H|%ad|%s",
        "--name-only",
        "--",
        pathspec,
    ])

    result: dict[str, tuple[str, str, str]] = {}
    current_commit: tuple[str, str, str] | None = None

    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("COMMIT|"):
            parts = line.split("|", 3)
            if len(parts) >= 4:
                _, sha, d, subject = parts
                current_commit = (d, sha, subject)
            elif len(parts) == 3:
                _, sha, d = parts
                current_commit = (d, sha, "")
        elif current_commit and line.endswith(".md"):
            # Only record EARLIEST add per file (git log is newest-first)
            if line not in result:
                result[line] = current_commit

    return result


def _build_last_modified_map(pathspec: str) -> dict[str, tuple[str, str]]:
    """One-pass: git log (no diff-filter) for last-modified per file.

    Returns {relpath → (date_str, subject)}.
    We want the MOST RECENT touch — git log is newest-first so first occurrence wins.
    """
    raw = _git([
        "log",
        "--date=short",
        "--pretty=format:COMMIT|%H|%ad|%s",
        "--name-only",
        "--",
        pathspec,
    ])

    result: dict[str, tuple[str, str]] = {}
    current_commit: tuple[str, str] | None = None

    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("COMMIT|"):
            parts = line.split("|", 3)
            if len(parts) >= 4:
                _, sha, d, subject = parts
                current_commit = (d, subject)
            elif len(parts) == 3:
                current_commit = (parts[2], "")
        elif current_commit and line.endswith(".md"):
            if line not in result:
                result[line] = current_commit

    return result


def _build_rename_map(pathspec: str) -> dict[str, str]:
    """Rename-chain pass: map renamed targets → their source path.

    Returns {new_relpath → old_relpath} so we can look up the original add.
    """
    raw = _git([
        "log", "--diff-filter=R",
        "--date=short",
        "--pretty=format:COMMIT|%H|%ad|%s",
        "--name-status",
        "--",
        pathspec,
    ])

    result: dict[str, str] = {}

    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("COMMIT"):
            continue
        if line.startswith("R"):
            parts = line.split("\t")
            if len(parts) >= 3:
                # parts[0]=R100, parts[1]=old_path, parts[2]=new_path
                old_path = parts[1].strip()
                new_path = parts[2].strip()
                if new_path not in result:
                    result[new_path] = old_path

    return result


# ---------------------------------------------------------------------------
# Supabase monitored_pages fetch (optional)
# ---------------------------------------------------------------------------

def _fetch_monitored_slugs(site: str) -> set[str]:
    """Return slugs from monitored_pages for this site. Warns on failure."""
    try:
        # Load dotenv
        env_file = REPO / ".env"
        env_vars: dict[str, str] = {}
        if env_file.exists():
            for ln in env_file.read_text(encoding="utf-8", errors="replace").splitlines():
                ln = ln.strip()
                if ln and not ln.startswith("#") and "=" in ln:
                    k, _, v = ln.partition("=")
                    env_vars[k.strip()] = v.strip().strip('"').strip("'")

        token = env_vars.get("SUPABASE_ACCESS_TOKEN") or os.getenv("SUPABASE_ACCESS_TOKEN", "")
        if not token:
            print(f"  [provenance] WARNING: no SUPABASE_ACCESS_TOKEN — skipping monitored_pages for {site}")
            return set()

        import httpx  # type: ignore

        PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
        url = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
        query = f"SELECT slug FROM monitored_pages WHERE site = '{site}'"
        r = httpx.post(
            url,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"query": query},
            timeout=30.0,
        )
        r.raise_for_status()
        rows = r.json()
        slugs: set[str] = set()
        for row in rows:
            if isinstance(row, dict) and "slug" in row:
                slugs.add(str(row["slug"]).strip().lstrip("/"))
        return slugs

    except Exception as exc:
        print(f"  [provenance] WARNING: monitored_pages query failed ({exc}) — continuing without it")
        return set()


# ---------------------------------------------------------------------------
# Wave-tracker slug extraction
# ---------------------------------------------------------------------------

_SLUG_PATTERN = re.compile(r"`([a-z0-9][a-z0-9\-]{3,80})`")

# Status indicators that appear in the leftmost column of page-tracker tables
_STATUS_INDICATOR_RE = re.compile(
    r"(?:✅|🟦|🟩|🟡|⬜|⚠|todo|brief done|in.progress|done|blocked|page written|verified|"
    r"COMPLETE|todo|PENDING)",
    re.IGNORECASE,
)


def _extract_slugs_from_tracker_table(path: Path) -> set[str]:
    """Extract slugs ONLY from status-table rows in a wave/rewrite page tracker.

    Reads only table rows where the first cell contains a status indicator.
    This prevents picking up slugs mentioned in flags/notes sections.
    """
    if not path.exists():
        return set()
    text = path.read_text(encoding="utf-8", errors="replace")
    slugs: set[str] = set()

    for line in text.splitlines():
        if "|" not in line:
            continue
        cells = [c.strip() for c in line.split("|")]
        # cells[0] is empty (line starts with |), cells[1] is first column
        if len(cells) < 4:
            continue
        first_cell = cells[1].strip() if len(cells) > 1 else ""
        # Check if this looks like a status row
        if not _STATUS_INDICATOR_RE.search(first_cell):
            continue
        # Slug is typically in cells[2] or cells[3] — scan all cells for a slug-like token
        for cell in cells[2:6]:
            cell = cell.strip().strip("`").strip()
            if re.match(r"^[a-z][a-z0-9\-]{5,80}$", cell):
                slugs.add(cell)
            # Also check backtick-quoted within cell
            for m in _SLUG_PATTERN.finditer(cell):
                token = m.group(1)
                if re.match(r"^[a-z][a-z0-9\-]+$", token) and len(token) > 5:
                    slugs.add(token)

    return slugs


def _extract_slugs_from_file(path: Path) -> set[str]:
    """Robustly extract slug-like tokens from a markdown rewrite worklist.

    For REWRITE worklists (not wave trackers) we need broader extraction
    because slugs appear in prose lists and table cells without status indicators.
    """
    if not path.exists():
        return set()
    text = path.read_text(encoding="utf-8", errors="replace")
    slugs: set[str] = set()

    # 1. Backtick-quoted tokens
    for m in _SLUG_PATTERN.finditer(text):
        token = m.group(1)
        # Looks like a slug: all lowercase, hyphens, no extension
        if re.match(r"^[a-z0-9][a-z0-9\-]+$", token) and len(token) > 5:
            slugs.add(token)

    # 2. Table cells containing slug-like values (unquoted)
    for line in text.splitlines():
        if "|" in line:
            cells = [c.strip() for c in line.split("|")]
            for cell in cells:
                cell = cell.strip().strip("`").strip()
                if re.match(r"^[a-z][a-z0-9\-]{5,80}$", cell):
                    slugs.add(cell)

    return slugs


def _load_wave_tracker_slugs(site: str) -> set[str]:
    """Load slugs from wave*_page_tracker.md for a site.

    Uses the table-only extractor to avoid picking up EXISTING_PAGE_STALE
    mentions in the flags/notes sections.
    """
    docs_dir = REPO / "docs" / site
    slugs: set[str] = set()
    for f in docs_dir.glob("wave*_page_tracker.md"):
        slugs.update(_extract_slugs_from_tracker_table(f))
    return slugs


def _load_rewrite_tracker_slugs(site: str) -> set[str]:
    """Load slugs from per-site rewrite tracker docs."""
    slugs: set[str] = set()

    if site == "medical":
        path = REPO / "docs" / "medical" / "page_rewrite_tracker.md"
        slugs.update(_extract_slugs_from_file(path))

    if site == "solicitors":
        path = REPO / "docs" / "solicitors" / "rewrite_worklist_and_hitlist.md"
        slugs.update(_extract_slugs_from_file(path))

    return slugs


def _load_qa_verdict_slugs(site: str) -> set[str]:
    """Collect slugs from all QA verdict caches that show completed rewrites.

    NOTE: All existing QA verdict caches under optimisation_engine/.cache/ are
    Property-site rewrites (the rewrite engine ran on Property). They must NOT
    be applied to other sites — doing so creates false track2-rewritten hits for
    posts that happen to share a generic slug name (e.g. 'aia-capital-allowances').
    We therefore only return slugs for the 'property' site; for all other sites
    the QA-verdict source is empty.
    """
    # None of the 5 classified sites is 'property', so this source is always empty.
    # If property is ever added to the site list, we can enable it.
    if site != "property":
        return set()

    slugs: set[str] = set()

    patterns = [
        str(REPO / ".cache" / "qa_runner" / "**" / "*.json"),
        str(REPO / "optimisation_engine" / ".cache" / "*verdict*.json"),
        str(REPO / "optimisation_engine" / ".cache" / "qa_verdict_*.json"),
        str(REPO / ".cache" / "*_verdicts.json"),
    ]

    import glob as _glob

    for pat in patterns:
        for fpath in _glob.glob(pat, recursive=True):
            try:
                with open(fpath, encoding="utf-8", errors="replace") as fh:
                    d = json.load(fh)
                # Format 1: {"slugs": {slug: {"all_clear": bool, ...}}}
                if isinstance(d, dict) and "slugs" in d:
                    for slug, info in d["slugs"].items():
                        if isinstance(info, dict) and info.get("all_clear"):
                            slugs.add(slug.strip().lstrip("/"))
                # Format 2: list of {slug: ..., verdict: ...}
                elif isinstance(d, list):
                    for item in d:
                        if isinstance(item, dict):
                            s = item.get("slug", "")
                            if s and (item.get("all_clear") or item.get("verdict") == "pass"):
                                slugs.add(str(s).strip().lstrip("/"))
            except Exception:
                pass

    return slugs


# ---------------------------------------------------------------------------
# Frontmatter helpers
# ---------------------------------------------------------------------------

def _parse_frontmatter(text: str) -> dict[str, str]:
    """Simple YAML frontmatter parser (no heavy deps)."""
    fm: dict[str, str] = {}
    if not text.startswith("---"):
        return fm
    end = text.find("\n---", 3)
    if end == -1:
        return fm
    block = text[3:end]
    for line in block.splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm


def _word_count(text: str) -> int:
    """Word count of body (after frontmatter)."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            body = text[end + 4:]
        else:
            body = text
    else:
        body = text

    # Strip HTML tags for a rough count
    no_tags = re.sub(r"<[^>]+>", " ", body)
    return len(no_tags.split())


def _parse_date(s: str) -> Optional[date]:
    """Parse a date string to date object, tolerant of various formats."""
    s = s.strip().strip('"').strip("'")
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            pass
    # Try ISO with time component
    try:
        return date.fromisoformat(s[:10])
    except Exception:
        pass
    return None


# ---------------------------------------------------------------------------
# Era classification
# ---------------------------------------------------------------------------

_OPUS_SUBJECT_RE = re.compile(
    r"net-new|waves?\s*\d|Opus-written|gap-fill batch",
    re.IGNORECASE,
)

_DEEPSEEK_CONSOLIDATED_RE = re.compile(
    r"via consolidated generator|research-grounded",
    re.IGNORECASE,
)

_META_ONLY_RE = re.compile(r"meta|SERP|title", re.IGNORECASE)


def _classify(
    slug: str,
    site: str,
    first_add_sha: str,
    first_add_date: Optional[str],
    first_add_subject: str,
    track2_slugs: set[str],
    wave_slugs: set[str],
) -> tuple[str, str, str]:
    """Return (era, confidence, rule).

    Rules in priority order:
    1. track2-rewritten
    2. opus-wave
    3. deepseek
    4. claude-supabase
    5. ambiguous
    """
    fad = _parse_date(first_add_date) if first_add_date else None
    fad_str = str(fad) if fad else "unknown"

    # --- Rule 1: track2-rewritten ---
    if slug in track2_slugs:
        conf = "low" if first_add_sha in ORIGIN_MASKING_COMMITS else "high"
        return "track2-rewritten", conf, "r1-track2-slug"

    # --- Rule 2: opus-wave ---
    if slug in wave_slugs:
        conf = "low" if first_add_sha in ORIGIN_MASKING_COMMITS else "high"
        return "opus-wave", conf, "r2-wave-tracker"

    if _OPUS_SUBJECT_RE.search(first_add_subject):
        conf = "low" if first_add_sha in ORIGIN_MASKING_COMMITS else "high"
        return "opus-wave", conf, "r2-subject-match"

    # --- Rule 3: deepseek ---

    # DeepSeek: subject matches consolidated generator / research-grounded
    if _DEEPSEEK_CONSOLIDATED_RE.search(first_add_subject):
        return "deepseek", "high", "r3-subject-consolidated"

    # DeepSeek: dentists 2026-05-18 Phase 5-7
    if site == "dentists" and fad_str == "2026-05-18":
        if re.search(r"Phase\s*[5-7]", first_add_subject, re.IGNORECASE):
            return "deepseek", "high", "r3-dentists-phase57"

    # DeepSeek: solicitors 2026-05-18 (Phase 6 batches)
    if site == "solicitors" and fad_str == "2026-05-18":
        return "deepseek", "high", "r3-solicitors-0518"

    # DeepSeek: dentists posts hidden in the 2026-05-20 working-tree snapshot.
    # Unlike generalist/agency (whose corpora predate the snapshot and came from the
    # Anthropic supabase pipeline), dentists' active generators on the snapshot date
    # were BOTH DeepSeek (legacy Phase 5-7 generator + consolidated generator), and
    # the affected slugs pattern-match the consolidated keyword pages. Low confidence.
    if site == "dentists" and first_add_sha in ORIGIN_MASKING_COMMITS:
        return "deepseek", "low", "r3-dentists-snapshot"

    # DeepSeek: first_add_date between 2026-05-19 and 2026-06-01 (no opus marker).
    # Origin-masking commits (generalist snapshot / agency subtree-merge + rename) are
    # excluded: their dates are when the corpus was *committed*, not generated — those
    # corpora came from the Anthropic generate_blog_supabase.py pipeline and fall
    # through to r4-masking-commit (claude-supabase, low confidence).
    if fad is not None and first_add_sha not in ORIGIN_MASKING_COMMITS:
        if date(2026, 5, 19) <= fad <= date(2026, 6, 1):
            return "deepseek", "high", "r3-date-range-0519-0601"

    # --- Rule 4: claude-supabase ---
    if fad is not None and fad < date(2026, 5, 18):
        conf = "low" if first_add_sha in ORIGIN_MASKING_COMMITS else "high"
        return "claude-supabase", conf, "r4-pre-0518"

    if first_add_sha in ORIGIN_MASKING_COMMITS:
        return "claude-supabase", "low", "r4-masking-commit"

    # --- Rule 5: ambiguous ---
    return "ambiguous", "low", "r5-ambiguous"


# ---------------------------------------------------------------------------
# Main per-site processor
# ---------------------------------------------------------------------------

def _process_site(site: str, verbose: bool = False) -> list[dict]:
    cfg = SITE_CONFIG[site]
    content_dir: Path = cfg["content_dir"]
    content_dir_rel = str(content_dir.relative_to(REPO)).replace("\\", "/")

    print(f"\n[{site}] content dir: {content_dir_rel}")

    # --- 1. Git add maps ---
    add_map = _build_add_map(content_dir_rel)

    # Agency special case: also run against old pathspec, merge by basename (earliest add)
    if site == "agency":
        old_rel = "Digital Agency/web/content/blog"
        old_add_map = _build_add_map(old_rel)
        for old_path, info in old_add_map.items():
            basename = Path(old_path).name
            # Find if new_path for this basename already in add_map
            # Look for any key whose basename matches
            existing_key = None
            for k in add_map:
                if Path(k).name == basename:
                    existing_key = k
                    break
            if existing_key is None:
                # Not in new map → add under new path
                new_path = f"{content_dir_rel}/{basename}"
                add_map[new_path] = info
            else:
                # Keep earliest date
                existing_date = _parse_date(add_map[existing_key][0])
                old_date = _parse_date(info[0])
                if existing_date and old_date and old_date < existing_date:
                    add_map[existing_key] = info

    # --- 2. Rename chain ---
    rename_map = _build_rename_map(content_dir_rel)

    # --- 3. Last-modified map ---
    lm_map = _build_last_modified_map(content_dir_rel)

    # --- 4. Track2 slugs (3 sources) ---
    monitored = _fetch_monitored_slugs(site)
    rewrite_slugs = _load_rewrite_tracker_slugs(site)
    qa_slugs = _load_qa_verdict_slugs(site)  # property-only; empty for these 5 sites
    track2_slugs = monitored | rewrite_slugs | qa_slugs

    # --- 5. Wave tracker slugs ---
    wave_slugs = _load_wave_tracker_slugs(site)

    if verbose:
        print(f"  track2_slugs: {len(track2_slugs)} | wave_slugs: {len(wave_slugs)}")

    # --- 6. Walk disk files ---
    disk_files: list[Path] = sorted(content_dir.rglob("*.md"))
    print(f"  disk files: {len(disk_files)}")

    # Build a lookup from repo-relative path (forward slashes) → add info
    # Normalise add_map keys to forward slashes
    norm_add_map: dict[str, tuple[str, str, str]] = {}
    for k, v in add_map.items():
        norm_add_map[k.replace("\\", "/")] = v

    records: list[dict] = []

    for fpath in disk_files:
        relpath = str(fpath.relative_to(REPO)).replace("\\", "/")
        slug = fpath.stem

        # Git first-add
        add_info = norm_add_map.get(relpath)

        # Try rename chain if not found
        if add_info is None:
            renamed_from = rename_map.get(relpath)
            if renamed_from:
                add_info = norm_add_map.get(renamed_from.replace("\\", "/"))

        # Last modified
        lm_info = lm_map.get(relpath)
        if lm_info is None:
            lm_info = ("", "")

        # Frontmatter
        try:
            raw = fpath.read_text(encoding="utf-8", errors="replace")
        except Exception:
            raw = ""
        fm = _parse_frontmatter(raw)
        fm_date_str = fm.get("date", "") or fm.get("publishDate", "") or fm.get("published", "")
        fm_date = _parse_date(fm_date_str) if fm_date_str else None

        # Word count
        wc = _word_count(raw)

        if add_info is None:
            # Untracked
            record = {
                "slug": slug,
                "relpath": relpath,
                "era": "untracked",
                "confidence": "low",
                "rule": "untracked",
                "git_first_add": None,
                "first_add_sha": None,
                "first_add_subject": None,
                "last_modified_date": lm_info[0] or None,
                "last_modified_subject": lm_info[1] or None,
                "meta_only_touch": False,
                "frontmatter_date": fm_date_str or None,
                "backdated": False,
                "word_count": wc,
            }
        else:
            first_add_date, first_add_sha, first_add_subject = add_info
            fad = _parse_date(first_add_date)

            # meta_only_touch: last modified subject matches /meta|SERP|title/i AND that commit != first-add
            meta_only_touch = False
            if lm_info[0] and lm_info[0] != first_add_date:
                if _META_ONLY_RE.search(lm_info[1]):
                    meta_only_touch = True
            elif lm_info[0] == first_add_date and lm_info[1] != first_add_subject:
                if _META_ONLY_RE.search(lm_info[1]):
                    meta_only_touch = True

            # backdated
            backdated = False
            if fm_date and fad:
                diff = abs((fm_date - fad).days)
                backdated = diff > 7

            era, confidence, rule = _classify(
                slug=slug,
                site=site,
                first_add_sha=first_add_sha,
                first_add_date=first_add_date,
                first_add_subject=first_add_subject,
                track2_slugs=track2_slugs,
                wave_slugs=wave_slugs,
            )

            # Override confidence for origin-masking commits
            if first_add_sha in ORIGIN_MASKING_COMMITS:
                confidence = "low"

            record = {
                "slug": slug,
                "relpath": relpath,
                "era": era,
                "confidence": confidence,
                "rule": rule,
                "git_first_add": first_add_date or None,
                "first_add_sha": first_add_sha[:12] if first_add_sha else None,
                "first_add_subject": first_add_subject or None,
                "last_modified_date": lm_info[0] or None,
                "last_modified_subject": lm_info[1] or None,
                "meta_only_touch": meta_only_touch,
                "frontmatter_date": fm_date_str or None,
                "backdated": backdated,
                "word_count": wc,
            }

        records.append(record)

    return records


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------

def _write_inventory(site: str, records: list[dict]) -> Path:
    out_dir = REPO / ".cache" / "provenance" / site
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "inventory.json"
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(records, fh, indent=2, default=str)
    return out_path


def _era_counts(records: list[dict]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for r in records:
        era = r["era"]
        counts[era] = counts.get(era, 0) + 1
    return counts


def _write_summary(all_results: dict[str, list[dict]]) -> Path:
    today = "2026-06-12"
    out_path = REPO / "docs" / f"provenance_summary_{today}.md"

    lines: list[str] = [
        f"# Blog Provenance Summary — {today}",
        "",
        "Generated by `scripts/blog_provenance.py --all`. Deterministic, no LLM calls.",
        "",
    ]

    # Per-site era table
    lines.append("## Per-site era counts")
    lines.append("")
    era_order = ["track2-rewritten", "opus-wave", "deepseek", "claude-supabase", "ambiguous", "untracked"]
    header = "| Site | Expected | Disk | " + " | ".join(era_order) + " |"
    sep = "| --- | --- | --- | " + " | ".join(["---"] * len(era_order)) + " |"
    lines.append(header)
    lines.append(sep)

    for site, records in all_results.items():
        expected = SITE_CONFIG[site]["expected"]
        disk = len(records)
        counts = _era_counts(records)
        row_vals = [str(counts.get(e, 0)) for e in era_order]
        gap = disk - expected
        gap_str = f"{disk} (+{gap})" if gap > 0 else f"{disk} (-{abs(gap)})" if gap < 0 else str(disk)
        lines.append(f"| {site} | {expected} | {gap_str} | " + " | ".join(row_vals) + " |")

    lines.append("")
    lines.append("## DeepSeek totals per site")
    lines.append("")
    lines.append("| Site | DeepSeek posts |")
    lines.append("| --- | --- |")
    for site, records in all_results.items():
        counts = _era_counts(records)
        lines.append(f"| {site} | {counts.get('deepseek', 0)} |")

    lines.append("")
    lines.append("## Ambiguous posts (need manual review)")
    lines.append("")
    any_ambig = False
    for site, records in all_results.items():
        ambig = [r for r in records if r["era"] == "ambiguous"]
        if ambig:
            any_ambig = True
            lines.append(f"### {site} ({len(ambig)} ambiguous)")
            lines.append("")
            lines.append("| slug | first_add | subject |")
            lines.append("| --- | --- | --- |")
            for r in ambig:
                slug = r["slug"]
                fad = r.get("git_first_add", "")
                subj = (r.get("first_add_subject") or "")[:80]
                lines.append(f"| {slug} | {fad} | {subj} |")
            lines.append("")

    if not any_ambig:
        lines.append("None.")
        lines.append("")

    lines.append("## Untracked posts (on disk, no git add commit found)")
    lines.append("")
    any_untracked = False
    for site, records in all_results.items():
        untracked = [r for r in records if r["era"] == "untracked"]
        if untracked:
            any_untracked = True
            lines.append(f"### {site} ({len(untracked)} untracked)")
            lines.append("")
            for r in untracked:
                lines.append(f"- `{r['slug']}`")
            lines.append("")

    if not any_untracked:
        lines.append("None.")
        lines.append("")

    lines.append("## Reconciliation notes")
    lines.append("")
    for site, records in all_results.items():
        expected = SITE_CONFIG[site]["expected"]
        disk = len(records)
        gap = disk - expected
        if abs(gap) > 2:
            lines.append(f"- **{site}**: disk={disk}, expected={expected}, gap={gap} — INVESTIGATE")
        else:
            lines.append(f"- {site}: disk={disk}, expected={expected}, gap={gap} — OK")

    lines.append("")
    lines.append("## Classification notes")
    lines.append("")
    lines.append(
        "- **Dentists de-stale (FA-2026, commit cf665616):** 10 pages de-staled in the same commit "
        "as Waves 1-4. These pages were already in the corpus with pre-2026-05-18 first-adds, so "
        "they classify by their ORIGINAL era (claude-supabase or deepseek). Their de-stale touch "
        "is visible via last_modified_date/subject. Flagged: these slugs may appear as "
        "claude-supabase or deepseek but have been factually updated."
    )
    lines.append("")
    lines.append(
        "- **Medical page_rewrite_tracker.md:** all 46 slugs listed as todo/unstarted at tracker "
        "creation time (2026-05-21), but commit fa8400ab confirms all 46 Track-2 rewrites shipped "
        "2026-06-03, so they classify track2-rewritten. Their underlying origin was "
        "claude-supabase (legacy corpus committed 7c798331, 2026-04-01); the 27 Opus wave pages "
        "are captured via wave-tracker. Medical has ZERO rewrite candidates left."
    )
    lines.append("")
    lines.append(
        "- **Agency confidence:** all agency posts have first_add in commit bc880b1f (rename) "
        "or bf3eaf2f (subtree-merge), both ORIGIN_MASKING_COMMITS → era=claude-supabase, "
        "confidence=low. The corpus was generated pre-monorepo by the site's "
        "generate_blog_supabase.py (Anthropic) pipeline — agency never had a DeepSeek generator. "
        "True generation dates/models are hidden by the monolithic commits; the blind quality "
        "audit (Phase D) validates the high-quality belief."
    )
    lines.append("")
    lines.append(
        "- **Generalist confidence:** bulk (363 of 366) arrive in snapshot commit 5da8276a "
        "(2026-05-20, ORIGIN_MASKING_COMMIT) → era=claude-supabase, confidence=low (the site "
        "only ever had the Anthropic generate_blog_supabase.py generator). The 3 posts added "
        "individually 'via consolidated generator' on 2026-05-20 are deepseek/high."
    )
    lines.append("")
    lines.append(
        "- **Dentists snapshot pages:** 19 posts first-added in snapshot 5da8276a classify "
        "deepseek/LOW (rule r3-dentists-snapshot): dentists' active generators on that date were "
        "both DeepSeek (legacy Phase 5-7 + consolidated), and the slugs pattern-match the "
        "consolidated keyword pages (aia/vat-calculator variants). Phase D should sample these."
    )

    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out_path


# ---------------------------------------------------------------------------
# Self-verification
# ---------------------------------------------------------------------------

def _spot_check(site: str, records: list[dict], n: int = 3) -> list[dict]:
    """Spot-check n files per site by running per-file git log.

    Uses both --follow form and plain form; if --follow returns nothing (known
    limitation with git-mv renamed files + --diff-filter=A), falls back to the
    plain form. Reports OK if either form agrees with our stored date.
    """
    # Pick a variety: first, last, middle
    sample_indices = [0, len(records) // 2, len(records) - 1]
    sample_indices = [i for i in sample_indices if 0 <= i < len(records)]
    # Remove untracked from sample
    sample = [records[i] for i in sample_indices if records[i]["era"] != "untracked"][:n]

    results = []
    for r in sample:
        relpath = r["relpath"]

        # Try --follow first
        slow_raw = _git([
            "log", "--follow", "--diff-filter=A", "--date=short",
            "--format=%h %ad %s",
            "--",
            relpath,
        ])
        slow_lines = [l.strip() for l in slow_raw.splitlines() if l.strip()]

        # Fallback: no --follow (works better for git-mv renames)
        if not slow_lines:
            slow_raw2 = _git([
                "log", "--diff-filter=A", "--date=short",
                "--format=%h %ad %s",
                "--",
                relpath,
            ])
            slow_lines2 = [l.strip() for l in slow_raw2.splitlines() if l.strip()]
            slow_first = slow_lines2[-1] if slow_lines2 else "(not found)"
            note = "(fallback-no-follow)"
        else:
            slow_first = slow_lines[-1]
            note = ""

        # Our stored value
        our_sha_short = r.get("first_add_sha") or ""
        our_date = r.get("git_first_add") or ""

        # Check if our date matches
        match = our_date in slow_first if our_date else False

        results.append({
            "site": site,
            "slug": r["slug"],
            "our_date": our_date,
            "our_sha_short": our_sha_short,
            "git_slow_result": slow_first + (" " + note if note else ""),
            "date_match": match,
        })

    return results


def _sanity_checks(all_results: dict[str, list[dict]]) -> list[str]:
    """Run sanity checks, return list of findings."""
    findings: list[str] = []

    for site, records in all_results.items():
        deepseek_slugs = {r["slug"] for r in records if r["era"] == "deepseek"}
        opus_slugs = {r["slug"] for r in records if r["era"] == "opus-wave"}
        overlap = deepseek_slugs & opus_slugs
        if overlap:
            findings.append(
                f"SANITY FAIL [{site}]: {len(overlap)} slugs in BOTH deepseek and opus-wave: "
                + ", ".join(sorted(overlap)[:5])
            )
        else:
            findings.append(f"SANITY PASS [{site}]: zero deepseek/opus-wave overlap")

        # Wave-tracker slugs classified opus-wave or track2
        wave_slugs = _load_wave_tracker_slugs(site)
        for slug in wave_slugs:
            # Find in records
            match = next((r for r in records if r["slug"] == slug), None)
            if match and match["era"] not in ("opus-wave", "track2-rewritten"):
                findings.append(
                    f"SANITY WARN [{site}]: wave-tracker slug '{slug}' classified as '{match['era']}'"
                )

    return findings


# ---------------------------------------------------------------------------
# Backfill helpers
# ---------------------------------------------------------------------------

# Mapping from (era, confidence) → generator tag value for backfill.
# Used by --backfill-generator. Never auto-runs; requires --execute.
_BACKFILL_GENERATOR_MAP: dict[tuple[str, str], str] = {
    ("deepseek",       "high"): "deepseek-chat/legacy-bulk",
    ("deepseek",       "low"):  "deepseek-chat/unverified",
    ("claude-supabase","high"): "claude/legacy-supabase",
    ("claude-supabase","low"):  "unverified/claude-era",
    ("opus-wave",      "high"): "opus-4.8/netnew-wave",
    ("opus-wave",      "low"):  "opus-4.8/netnew-wave",
    ("track2-rewritten","high"):"opus-4.8/track2-rewrite",
    ("track2-rewritten","low"): "opus-4.8/track2-rewrite",
}

# Era+confidence combos that we do NOT stamp (ambiguous / untracked origin).
_BACKFILL_SKIP_ERAS = {"ambiguous", "untracked"}


def _insert_generator_frontmatter(raw: str, generator_value: str) -> str | None:
    """Insert `generator: <value>` into the YAML frontmatter block.

    Inserts immediately after the `date:` line. If no `date:` line is found,
    inserts at the end of the frontmatter block (before the closing ---).
    Returns the modified text, or None if the file has no valid frontmatter.

    Preserves line endings (CRLF vs LF) detected in the file.
    Never touches the body.
    """
    if not raw.startswith("---"):
        return None
    # Detect line ending used in this file
    linesep = "\r\n" if "\r\n" in raw[:200] else "\n"

    end_idx = raw.find("\n---", 3)
    if end_idx == -1:
        return None

    fm_block = raw[3:end_idx]  # frontmatter content (between the two ---)
    body_rest = raw[end_idx:]   # "\n---\n<body>"

    # Check if generator field already present (any generator: line)
    if re.search(r"(?m)^generator:", fm_block):
        return None  # already stamped; do not overwrite during backfill

    lines = fm_block.split("\n")

    # Find the date: line to insert after it
    insert_after = -1
    for i, line in enumerate(lines):
        if re.match(r"^date:", line.strip() if line.startswith(" ") else line):
            insert_after = i
            break

    generator_line = f"generator: {generator_value}"
    if insert_after >= 0:
        lines.insert(insert_after + 1, generator_line)
    else:
        # No date line; append before end of frontmatter
        # Strip trailing empty lines and add before them
        lines.append(generator_line)

    new_fm = "\n".join(lines)
    return "---" + new_fm + body_rest


def _backfill_site(
    site: str,
    records: list[dict],
    *,
    execute: bool,
    verbose: bool,
) -> dict[str, int]:
    """Backfill generator frontmatter for one site.

    Args:
        site: site key
        records: provenance records from _process_site()
        execute: if False, dry-run only (print counts, no file writes)
        verbose: print per-file actions

    Returns a dict of counts: would_stamp, already_stamped, skipped_era,
    skipped_no_file, errors, stamped (only non-zero when execute=True).
    """
    cfg = SITE_CONFIG[site]
    content_dir: Path = cfg["content_dir"]

    counts: dict[str, int] = {
        "would_stamp": 0,
        "already_stamped": 0,
        "skipped_era": 0,
        "skipped_no_file": 0,
        "errors": 0,
        "stamped": 0,
    }

    for rec in records:
        era = rec.get("era", "")
        confidence = rec.get("confidence", "low")
        relpath = rec.get("relpath", "")

        # Skip eras we cannot assign a generator to
        if era in _BACKFILL_SKIP_ERAS:
            counts["skipped_era"] += 1
            continue

        generator_value = _BACKFILL_GENERATOR_MAP.get((era, confidence))
        if generator_value is None:
            # Unknown combination — skip safely
            counts["skipped_era"] += 1
            continue

        # Resolve absolute path
        fpath = REPO / relpath
        if not fpath.exists():
            counts["skipped_no_file"] += 1
            continue

        try:
            raw = fpath.read_text(encoding="utf-8", errors="replace")
        except Exception as exc:
            if verbose:
                print(f"    ERROR reading {relpath}: {exc}")
            counts["errors"] += 1
            continue

        # Check if already stamped
        fm = _parse_frontmatter(raw)
        if fm.get("generator"):
            counts["already_stamped"] += 1
            if verbose:
                print(f"    SKIP (already stamped): {relpath} => {fm['generator']}")
            continue

        # Attempt to build modified text
        new_text = _insert_generator_frontmatter(raw, generator_value)
        if new_text is None:
            if verbose:
                print(f"    SKIP (no valid frontmatter): {relpath}")
            counts["skipped_no_file"] += 1
            continue

        counts["would_stamp"] += 1
        if verbose:
            print(f"    {'STAMP' if execute else 'would_stamp'}: {relpath} => {generator_value}")

        if execute:
            try:
                # Detect original encoding hint (UTF-8 BOM)
                encoding = "utf-8-sig" if raw.startswith("﻿") else "utf-8"
                fpath.write_text(new_text, encoding=encoding)
                counts["stamped"] += 1
            except Exception as exc:
                if verbose:
                    print(f"    ERROR writing {relpath}: {exc}")
                counts["errors"] += 1
                counts["would_stamp"] -= 1  # correct the would_stamp count

    return counts


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Blog provenance classifier")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--site", choices=list(SITE_CONFIG.keys()), help="Single site to process")
    group.add_argument("--all", action="store_true", help="Process all 5 sites")
    parser.add_argument("--verbose", "-v", action="store_true")
    parser.add_argument(
        "--backfill-generator",
        action="store_true",
        help=(
            "Backfill generator: frontmatter field from era classification. "
            "Default is dry-run (prints counts only). Pass --execute to write files. "
            "Combine with --site or --all."
        ),
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Required to actually write files when --backfill-generator is set. "
             "Without this flag the backfill prints counts only.",
    )
    args = parser.parse_args()

    sites = list(SITE_CONFIG.keys()) if args.all else [args.site]

    all_results: dict[str, list[dict]] = {}
    inventory_paths: list[str] = []

    for site in sites:
        records = _process_site(site, verbose=args.verbose)
        all_results[site] = records
        inv_path = _write_inventory(site, records)
        inventory_paths.append(str(inv_path))
        counts = _era_counts(records)
        print(f"  [{site}] era counts: {counts}")

    # --backfill-generator mode: run after normal classification so we have
    # fresh era/confidence data. Dry-run unless --execute is passed.
    if args.backfill_generator:
        execute = getattr(args, "execute", False)
        mode_label = "EXECUTE" if execute else "DRY-RUN"
        print(f"\n=== BACKFILL-GENERATOR ({mode_label}) ===")
        if execute:
            print("  Writing generator: fields to frontmatter...")
        else:
            print("  Dry-run only. Pass --execute to write files.")
        print("")

        total_would_stamp = 0
        total_stamped = 0
        for site, records in all_results.items():
            bf_counts = _backfill_site(site, records, execute=execute, verbose=args.verbose)
            total_would_stamp += bf_counts["would_stamp"]
            total_stamped += bf_counts["stamped"]
            print(
                f"  [{site}] would_stamp={bf_counts['would_stamp']} "
                f"already_stamped={bf_counts['already_stamped']} "
                f"skipped_era={bf_counts['skipped_era']} "
                f"skipped_no_file={bf_counts['skipped_no_file']} "
                f"errors={bf_counts['errors']}"
                + (f" stamped={bf_counts['stamped']}" if execute else "")
            )

        print("")
        if execute:
            print(f"  Total stamped: {total_stamped}")
        else:
            print(f"  Total would_stamp: {total_would_stamp} (run with --execute to apply)")
        return

    # Summary doc (always written, even for single site — but use all available results)
    if args.all or len(all_results) == len(SITE_CONFIG):
        summary_path = _write_summary(all_results)
        print(f"\n[summary] written: {summary_path}")
    else:
        summary_path = None

    # Self-verification
    print("\n=== SELF-VERIFICATION ===")

    # 1. Spot-checks
    all_spot = []
    for site, records in all_results.items():
        checks = _spot_check(site, records)
        all_spot.extend(checks)

    print(f"\nSpot-checks ({len(all_spot)} files):")
    for sc in all_spot:
        status = "OK" if sc["date_match"] else "MISMATCH"
        print(f"  [{sc['site']}] {sc['slug']}: {sc['our_date']} ({sc['our_sha_short']}) "
              f"  git-slow={sc['git_slow_result'][:60]}  [{status}]")

    # 2. Reconciliation
    print("\nReconciliation:")
    for site, records in all_results.items():
        expected = SITE_CONFIG[site]["expected"]
        disk = len(records)
        gap = disk - expected
        flag = "INVESTIGATE" if abs(gap) > 2 else "OK"
        print(f"  [{site}] disk={disk}, expected={expected}, gap={gap:+d}  [{flag}]")

    # 3. Sanity checks
    if len(all_results) > 1:
        print("\nSanity checks:")
        for finding in _sanity_checks(all_results):
            print(f"  {finding}")

    print("\n=== FILES WRITTEN ===")
    for p in inventory_paths:
        print(f"  {p}")
    if summary_path:
        print(f"  {summary_path}")


if __name__ == "__main__":
    main()
