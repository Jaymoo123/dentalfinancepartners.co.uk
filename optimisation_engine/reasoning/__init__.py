"""
Reasoning layer.

Each module here represents one LLM-driven checkpoint in the optimisation
pipeline. All checkpoints share deepseek_runner.py for strict, validated,
audit-logged calls.

Design principles (per user direction 2026-05-19, "maximum caution"):
  - Strict JSON output contract; non-JSON or schema-failing responses are rejected.
  - Few-shot prompting: each checkpoint provides 2-3 input/output examples.
  - Self-check step in prompt: model verifies its own output before responding.
  - Confidence field (0-100) self-reported; values below threshold queue for
    human review, do not auto-apply.
  - Code-side validators run after schema parse and can veto.
  - Cost-logged to api_cost_log like any other paid call.
  - First-cycle policy: nothing reasoning-driven auto-applies until two
    successful cycles have positive outcome_verdict.
"""
