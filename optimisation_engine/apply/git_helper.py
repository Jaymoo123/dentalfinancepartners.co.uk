"""
Per-change atomic git commit helper.

Each apply module produces ONE commit per logical change. The commit message
is grounded in the ChangeBrief — what / why / how — so git log is the audit
trail.

Safety:
  - Only stages the explicit files_to_modify list (never `git add -A`).
  - Verifies files exist before staging.
  - Reverts the working-tree change if `git commit` fails.
  - Returns the commit SHA on success.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import textwrap
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]


class GitError(Exception):
    pass


def _run(args: list[str], cwd: Path = ROOT) -> tuple[int, str, str]:
    res = subprocess.run(args, cwd=str(cwd), capture_output=True, text=True)
    return res.returncode, res.stdout, res.stderr


def _find_repo_root_for(file_path: Path) -> Path:
    """Walk up from `file_path` until we find a directory containing a `.git`
    entry (a real repo or a worktree's gitfile). Returns the repo root.

    Falls back to ROOT if no ancestor `.git` is found. This is what makes the
    apply lifecycle work for sub-repos like Digital Agency (which has its own
    git history independent of the parent monorepo) without needing per-site
    special-casing in the caller.
    """
    current = file_path.parent if file_path.is_file() else file_path
    while True:
        if (current / ".git").exists():
            return current
        if current.parent == current:
            return ROOT
        current = current.parent


def status_porcelain() -> list[str]:
    rc, out, err = _run(["git", "status", "--porcelain"])
    if rc != 0:
        raise GitError(f"git status failed: {err}")
    return [line for line in out.splitlines() if line.strip()]


def stage_and_commit(*, files: Iterable[str], message: str, allow_empty: bool = False) -> str:
    """Stage exactly the listed files (no other side effects) and commit.

    Args:
        files: repo-relative paths.
        message: full commit message (multi-line OK).
        allow_empty: pass --allow-empty to git commit.

    Returns:
        The commit SHA.

    Raises:
        GitError if any step fails.
    """
    files = list(files)
    if not files and not allow_empty:
        raise GitError("no files to stage")

    # Validate each file exists AND find the correct repo for it.
    # All files in one stage_and_commit call must belong to the same repo,
    # otherwise we'd silently split the change across repos.
    repo_root: Path | None = None
    rel_files: list[str] = []
    for f in files:
        p = ROOT / f
        if not p.exists():
            raise GitError(f"file does not exist: {p}")
        file_repo = _find_repo_root_for(p)
        if repo_root is None:
            repo_root = file_repo
        elif file_repo != repo_root:
            raise GitError(
                f"file {f!r} lives in repo {file_repo} but earlier files in this commit "
                f"live in {repo_root}. Cross-repo commits are not allowed in one call."
            )
        # Convert to repo-relative path
        try:
            rel_files.append(str(p.relative_to(repo_root)).replace("\\", "/"))
        except ValueError:
            raise GitError(f"file {p} not inside its detected repo {repo_root}")

    if repo_root is None:
        repo_root = ROOT

    # Stage (in the correct repo)
    rc, out, err = _run(["git", "add", "--"] + rel_files, cwd=repo_root)
    if rc != 0:
        raise GitError(f"git add failed in {repo_root}: {err}")

    # Verify something was staged (unless allow_empty)
    if not allow_empty:
        rc, out, err = _run(["git", "diff", "--cached", "--quiet"], cwd=repo_root)
        if rc == 0:
            # Nothing staged after `git add`; bail
            raise GitError(
                f"nothing changed for these files in {repo_root.name} repo (already at HEAD state)"
            )

    # Commit
    cmd = ["git", "commit", "-m", message]
    if allow_empty:
        cmd.append("--allow-empty")
    rc, out, err = _run(cmd, cwd=repo_root)
    if rc != 0:
        # Roll back the staged area
        _run(["git", "reset", "--"] + rel_files, cwd=repo_root)
        raise GitError(f"git commit failed in {repo_root}: {err or out}")

    # Capture the new SHA from the correct repo
    rc, sha, err = _run(["git", "rev-parse", "HEAD"], cwd=repo_root)
    if rc != 0:
        raise GitError(f"git rev-parse failed in {repo_root}: {err}")
    return sha.strip()


def build_commit_message(*, site_key: str, change_type: str, summary: str, brief_excerpt: str | None = None) -> str:
    """Standardised commit message format.

    Format:
        {site_key}: {summary}

        Change type: {change_type}
        Auto-applied by optimisation_engine.

        {brief_excerpt}

        Co-Authored-By: ...
    """
    lines = [f"{site_key}: {summary}", ""]
    lines.append(f"Change type: {change_type}")
    lines.append("Auto-applied by optimisation_engine.")
    if brief_excerpt:
        lines.append("")
        wrapped = textwrap.fill(brief_excerpt, width=72)
        lines.append(wrapped)
    lines.append("")
    lines.append("Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>")
    return "\n".join(lines)
