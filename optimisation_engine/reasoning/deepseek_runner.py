"""
DeepSeek runner: bulletproof scaffolding for the reasoning layer.

Every reasoning checkpoint calls run_reasoning(...) which:
  1. Composes a system prompt with strict output contract + self-check rules.
  2. Inserts few-shot examples.
  3. Calls DeepSeek with low temperature.
  4. Parses the response as JSON; rejects if non-parseable.
  5. Validates against a list of callable validators.
  6. Logs cost + status to api_cost_log.
  7. Returns ReasoningResult with confidence + auto_applicable flag.

DeepSeek is cheap but unreliable on nuance — the rails are non-negotiable.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Callable, Generic, TypeVar

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

T = TypeVar("T")

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY") or os.getenv("OPENAI_API_KEY")
DEEPSEEK_MODEL = "deepseek-chat"

# Per DeepSeek pricing page (verify periodically):
# input  $0.27/M tokens
# output $1.10/M tokens
DEEPSEEK_COST_PER_INPUT_TOKEN = 0.27 / 1_000_000
DEEPSEEK_COST_PER_OUTPUT_TOKEN = 1.10 / 1_000_000


class ReasoningError(Exception):
    """Raised when the model output cannot be trusted."""


@dataclass
class ReasoningResult(Generic[T]):
    output: T                    # The parsed, validated JSON
    confidence: int              # Self-reported by model (0-100)
    cost_usd: float
    auto_applicable: bool        # confidence >= threshold AND all validators pass
    raw_response: str
    input_tokens: int = 0
    output_tokens: int = 0
    notes: list[str] = field(default_factory=list)


# Universal closing instructions appended to every reasoning prompt.
# Forces strict JSON + self-check.
_OUTPUT_CONTRACT_BLOCK = """
OUTPUT CONTRACT (MUST FOLLOW EXACTLY):
- Respond with a SINGLE JSON object that conforms to the schema described above.
- Do NOT include any prose outside the JSON. No markdown fences. No commentary.
- Every JSON field listed in the schema MUST be present. Use null where appropriate.
- Include a "confidence" field (integer 0-100) representing how sure you are.
  Use 90+ only when the answer is obvious from the inputs. Use 60-89 for likely.
  Use 30-59 if you're guessing meaningfully. Use 0-29 if you're not sure at all.

SELF-CHECK (perform mentally BEFORE responding):
1. Does my JSON parse cleanly? No trailing commas, no comments, no unquoted keys.
2. Have I included every required field exactly as named?
3. Is my "confidence" honest? If I'd disagree with myself on another reading, lower it.
4. Are my values consistent with the input data? No hallucinated facts.
5. Does my output violate any "MUST NOT" constraint in the prompt? If so, revise.

If self-check fails, fix and retry once internally before responding.
"""


def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def _log_cost(*, endpoint: str, site_key: str | None, input_tokens: int, output_tokens: int, status: str, error: str | None = None) -> None:
    """Insert a row in api_cost_log for the DeepSeek call."""
    import httpx

    cost = input_tokens * DEEPSEEK_COST_PER_INPUT_TOKEN + output_tokens * DEEPSEEK_COST_PER_OUTPUT_TOKEN
    payload = {
        "api_provider": "deepseek",
        "endpoint": endpoint,
        "site_key": site_key,
        "niche": site_key,
        "status": status,
        "cost_usd": round(cost, 8),
        "estimated_cost_usd": round(cost, 8),
        "response_status_code": 200 if status == "success" else None,
        "error_message": error,
        "completed_at": datetime.utcnow().isoformat(),
        "request_payload": {"input_tokens": input_tokens, "output_tokens": output_tokens},
    }
    try:
        httpx.post(
            f"{SUPABASE_URL}/rest/v1/api_cost_log",
            headers={**_supabase_headers(), "Prefer": "return=minimal"},
            json=payload,
            timeout=10.0,
        )
    except Exception:
        pass  # cost logging failure shouldn't break the call


def _extract_json(text: str) -> dict | list:
    """Best-effort JSON extraction. DeepSeek sometimes wraps in fences despite contract."""
    text = text.strip()
    # Strip ```json ... ``` fences if present
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"```\s*$", "", text)
        text = text.strip()
    # Try direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    # Fallback: extract the largest valid JSON object/array
    # Find first { or [ and last } or ]
    open_idx = min((text.find(c) for c in "{[" if text.find(c) >= 0), default=-1)
    if open_idx < 0:
        raise ReasoningError(f"No JSON found in response: {text[:200]}")
    # Walk back from the end to find a balanced close
    for i in range(len(text), open_idx, -1):
        snippet = text[open_idx:i].strip()
        try:
            return json.loads(snippet)
        except json.JSONDecodeError:
            continue
    raise ReasoningError(f"Could not extract valid JSON: {text[:200]}")


def _build_system_prompt(*, role: str, task: str, schema_description: str, must_not: list[str], examples: list[dict]) -> str:
    """Compose the system prompt with role, task, schema, constraints, examples."""
    parts = [
        f"You are {role}.",
        "",
        f"YOUR TASK: {task}",
        "",
        "OUTPUT SCHEMA:",
        schema_description,
    ]
    if must_not:
        parts.append("")
        parts.append("MUST NOT:")
        for rule in must_not:
            parts.append(f"  - {rule}")
    if examples:
        parts.append("")
        parts.append("EXAMPLES:")
        for i, ex in enumerate(examples, 1):
            parts.append(f"\nExample {i}:")
            parts.append("Input:")
            parts.append(json.dumps(ex["input"], indent=2))
            parts.append("Output:")
            parts.append(json.dumps(ex["output"], indent=2))
    parts.append(_OUTPUT_CONTRACT_BLOCK)
    return "\n".join(parts)


def run_reasoning(
    *,
    endpoint_name: str,
    role: str,
    task: str,
    schema_description: str,
    user_input: str,
    examples: list[dict] | None = None,
    must_not: list[str] | None = None,
    validators: list[Callable[[Any], tuple[bool, str | None]]] | None = None,
    confidence_threshold: int = 70,
    site_key: str | None = None,
    temperature: float = 0.2,
    max_tokens: int = 4000,
) -> ReasoningResult:
    """Run a single reasoning checkpoint through DeepSeek with full rails.

    Args:
        endpoint_name: Identifier logged to api_cost_log (e.g. 'semantic_page_match').
        role: System-prompt role description.
        task: One-sentence task description.
        schema_description: Plain-English description of the expected JSON shape.
        user_input: The actual input data, prose or JSON.
        examples: Few-shot pairs [{input: ..., output: ...}, ...].
        must_not: Negative constraints (e.g. ["must not invent slugs", ...]).
        validators: List of (output) -> (ok, error_message) callables.
        confidence_threshold: Minimum self-reported confidence for auto_applicable=True.
        site_key: For cost-log attribution.

    Returns:
        ReasoningResult.
    """
    from openai import OpenAI  # imported here so the module loads without openai installed

    if not DEEPSEEK_API_KEY:
        raise ReasoningError("DEEPSEEK_API_KEY not set in .env")

    client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com", timeout=120.0, max_retries=2)

    system_prompt = _build_system_prompt(
        role=role,
        task=task,
        schema_description=schema_description,
        must_not=must_not or [],
        examples=examples or [],
    )

    try:
        completion = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input},
            ],
            temperature=temperature,
            max_tokens=max_tokens,
            response_format={"type": "json_object"},
        )
    except Exception as exc:
        _log_cost(endpoint=endpoint_name, site_key=site_key, input_tokens=0, output_tokens=0, status="failed", error=f"{type(exc).__name__}: {exc}"[:1000])
        raise ReasoningError(f"DeepSeek API call failed: {exc}") from exc

    raw = completion.choices[0].message.content or ""
    usage = completion.usage
    input_tokens = getattr(usage, "prompt_tokens", 0) if usage else 0
    output_tokens = getattr(usage, "completion_tokens", 0) if usage else 0

    # Parse JSON
    try:
        parsed = _extract_json(raw)
    except ReasoningError as exc:
        _log_cost(endpoint=endpoint_name, site_key=site_key, input_tokens=input_tokens, output_tokens=output_tokens, status="failed", error=f"JSON parse: {exc}"[:1000])
        raise

    # Confidence handling
    confidence = parsed.get("confidence") if isinstance(parsed, dict) else None
    if not isinstance(confidence, int):
        confidence = 0
    confidence = max(0, min(100, confidence))

    # Run validators
    notes: list[str] = []
    auto_applicable = confidence >= confidence_threshold
    for v in validators or []:
        ok, msg = v(parsed)
        if not ok:
            auto_applicable = False
            notes.append(f"validator failed: {msg}")

    _log_cost(endpoint=endpoint_name, site_key=site_key, input_tokens=input_tokens, output_tokens=output_tokens, status="success")

    return ReasoningResult(
        output=parsed,
        confidence=confidence,
        cost_usd=input_tokens * DEEPSEEK_COST_PER_INPUT_TOKEN + output_tokens * DEEPSEEK_COST_PER_OUTPUT_TOKEN,
        auto_applicable=auto_applicable,
        raw_response=raw,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        notes=notes,
    )


# -----------------------------------------------------------------------------
# Common validators (importable from checkpoints)
# -----------------------------------------------------------------------------


def require_keys(*keys: str) -> Callable:
    def _v(o):
        if not isinstance(o, dict):
            return False, f"not a dict (got {type(o).__name__})"
        missing = [k for k in keys if k not in o]
        if missing:
            return False, f"missing keys: {missing}"
        return True, None
    return _v


def must_be_in(field: str, allowed: set) -> Callable:
    def _v(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        val = o.get(field)
        if val is None:
            return True, None  # null allowed
        if isinstance(val, list):
            bad = [v for v in val if v not in allowed]
            if bad:
                return False, f"{field} has invalid values: {bad}"
        elif val not in allowed:
            return False, f"{field}={val!r} not in {allowed}"
        return True, None
    return _v


def no_em_dashes(field: str) -> Callable:
    """Enforce the user's no-em-dash rule on string fields."""
    def _v(o):
        if not isinstance(o, dict):
            return True, None
        val = o.get(field)
        if isinstance(val, str) and ("—" in val or "–" in val):
            return False, f"{field} contains em-dash or en-dash"
        return True, None
    return _v
