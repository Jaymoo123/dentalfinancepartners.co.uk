#!/usr/bin/env python3
"""
state_check.py - what is actually true right now, across the estate.

WHY THIS EXISTS
---------------
Things go stale silently. A balance runs down, a migration reaches staging but
never prod, a data feed stops, a flag never gets set, a partner leaves. None of
that raises its hand. This walks the building every day and says what drifted.

HOW IT WORKS (the whole idea in four lines)
-------------------------------------------
1. Each "lane" goes and LOOKS at a live system and writes down plain facts.
2. Facts are compared against the PREVIOUS run's facts.
3. Anything new, gone, or moved the wrong way gets reported.
4. Nothing is ever fixed, deleted or changed. This tool only ever reads.

That comparison-against-last-run is what stops this becoming another stale
checklist. A new cron, a new table, a new env var shows up as NEW without
anyone having to remember to add it here. Something retired shows up as GONE.

ADDING A CHECK
--------------
Write a function that returns a list of facts and add it to LANES at the
bottom. That is the entire extension mechanism. A fact is:

    fact("lane", "name", value, note="optional human context")

If a fact should also trip a hard alarm regardless of history, append a
Rule to RULES. Everything else is discovered.

READ-ONLY GUARANTEE
-------------------
This script issues GETs and SELECTs only. It writes exactly one file: its own
snapshot under out/. `--selftest` asserts no mutating SQL verb appears in this
source. It has no authority to fix anything, by design.

USAGE
-----
    python scripts/state_check.py                # run, print table, exit 1 on drift
    python scripts/state_check.py --json         # machine output
    python scripts/state_check.py --selftest     # prove the alarm and the read-only rule work
    python scripts/state_check.py --no-save      # do not write a snapshot
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import httpx
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
SNAP_PREFIX = "state_check_"

# --------------------------------------------------------------------------
# The ONLY hand-maintained settings. Everything else is discovered.
# Keep this block small. If you are tempted to add a list of things to watch,
# see whether the lane can find them itself instead.
# --------------------------------------------------------------------------
TWILIO_MIN_RUNWAY_DAYS = 30      # shout when the SMS account has less than this
# Facts whose VALUE is a timestamp that must keep moving. The snapshot diff
# only sees NEW/GONE/CHANGED, so a heartbeat that FREEZES (hourly cron dead,
# stamp stops changing) produces nothing. This rule cures that blindness:
# older than the tolerance -> ALARM; unparseable/absent -> BLIND.
HEARTBEAT_MAX_AGE_HOURS = {
    "nurture.last_cron_run_at": 3,     # hourly cron; frozen = cron dead
    "nurture.last_digest_run_at": 30,  # daily 07:00 digest
}
FRESHNESS_TOLERANCE_DAYS = {     # how stale a feed may get before it is a problem
    "leads": 3,
    "web_sessions": 2,
    "web_events": 2,
    "gsc_page_performance": 10,
    "gsc_query_data": 10,
    "bing_query_data": 10,
    "lead_contact_events": 7,
}
# Tables with a timestamp but no tolerance above are reported as UNKNOWN, not
# ignored. That is deliberate: a new data feed should make itself known.
FRESHNESS_IGNORE = {             # written on demand or by a retired system:
    # append-rarely by nature, so staleness says nothing about health
    "sites", "lead_buyers", "monitored_pages", "optimisation_changes",
    "blog_topics", "subscribers", "nurture_state", "lead_nurture_state",
    "api_cost_log", "deploy_watch", "optimisation_opportunities",
    # retired systems, kept for history
    "agent_executions", "blog_optimizations", "niche_metrics",
    # run by hand when someone wants them, not on a schedule
    "competitor_gap_reports", "competitor_pages", "ga4_page_data",
    "site_daily_snapshots",
}
# Migrations whose objects are legitimately absent from prod. Each needs a
# reason. If one of these ever DOES appear in prod, the comparison lane will
# say so as a CHANGED row, and the entry can come out.
KNOWN_SCHEMA_DRIFT = {
    "000_create_core_tables.sql":
        "prod base schema predates version control; file has invalid syntax, never replayable",
    "002_add_content_storage.sql":
        "content-deployment tables were never adopted",
    "20260401000001_create_blog_topics_solicitors.sql":
        "renamed to blog_topics_solicitors_legacy_20260520",
    "20260516000001_create_blog_topics_agency.sql":
        "renamed to blog_topics_agency_legacy_20260520",
    "20260517000001_create_blog_topics_generalist.sql":
        "renamed to blog_topics_generalist_legacy_20260520",
}
# the seven near-identical medical topic migrations from 2026-03-30, same reason
KNOWN_SCHEMA_DRIFT.update({
    n: "renamed to blog_topics_medical_legacy_20260520"
    for n in (
        "20260330164916_create_blog_topics_medical.sql",
        "20260330171008_create_blog_topics_medical.sql",
        "20260330171316_create_blog_topics_medical.sql",
        "20260330182509_create_blog_topics_medical.sql",
        "20260330182957_create_blog_topics_medical.sql",
        "20260330184307_create_blog_topics_medical.sql",
        "20260330184532_create_blog_topics_medical.sql",
    )
})
SUPA_PROJECT = "dhlxwmvmkrfnmcgjbntk"   # prod


# --------------------------------------------------------------------------
# Plumbing
# --------------------------------------------------------------------------
def fact(lane: str, name: str, value, note: str = "") -> dict:
    """One observed truth. Value must be JSON-serialisable and comparable."""
    return {"lane": lane, "name": name, "value": value, "note": note}


class Ctx:
    """Shared clients. Every lane gets one; a lane that cannot run says so."""

    def __init__(self) -> None:
        load_dotenv(ROOT / ".env")
        load_dotenv(ROOT / "Property" / "web" / ".env.local", override=False)
        self.supa_token = os.getenv("SUPABASE_ACCESS_TOKEN")
        self.vercel_token = os.getenv("VERCEL_TOKEN")
        self.vercel_org = os.getenv("VERCEL_ORG_ID")
        self.twilio_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.twilio_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.http = httpx.Client(timeout=45, headers={"User-Agent": "estate-state-check/1"})

    def sql(self, query: str) -> list[dict]:
        """Read-only query against prod. Raises if the lane cannot proceed."""
        if not self.supa_token:
            raise RuntimeError("SUPABASE_ACCESS_TOKEN not set")
        r = self.http.post(
            f"https://api.supabase.com/v1/projects/{SUPA_PROJECT}/database/query",
            headers={"Authorization": f"Bearer {self.supa_token}"},
            json={"query": query},
        )
        r.raise_for_status()
        return r.json()

    def gh(self, *args: str) -> str:
        """gh CLI, read-only subcommands only."""
        res = subprocess.run(
            ["gh", *args], cwd=ROOT, capture_output=True, text=True, timeout=90
        )
        if res.returncode != 0:
            raise RuntimeError(res.stderr.strip()[:200] or "gh failed")
        return res.stdout


# --------------------------------------------------------------------------
# Lanes. Each returns facts. Each may raise; the runner records that as a
# BLIND row, because a lane that cannot see is itself a finding.
# --------------------------------------------------------------------------
def lane_money(ctx: Ctx) -> list[dict]:
    """Twilio balance and burn. Runs the SMS that verifies every new lead."""
    if not ctx.twilio_sid:
        raise RuntimeError("TWILIO_ACCOUNT_SID not set")
    auth = (ctx.twilio_sid, ctx.twilio_token)
    base = f"https://api.twilio.com/2010-04-01/Accounts/{ctx.twilio_sid}"

    bal = ctx.http.get(f"{base}/Balance.json", auth=auth).json()
    balance = float(bal["balance"])

    today = dt.date.today()
    usage = ctx.http.get(
        f"{base}/Usage/Records/Daily.json",
        auth=auth,
        params={
            "Category": "totalprice",
            "StartDate": str(today - dt.timedelta(days=30)),
            "PageSize": "50",
        },
    ).json()
    spend = sum(abs(float(u.get("price") or 0)) for u in usage.get("usage_records", []))
    per_day = spend / 30 if spend else 0.0
    runway = round(balance / per_day, 1) if per_day > 0 else None

    return [
        fact("money", "twilio.balance_gbp", round(balance, 2)),
        fact("money", "twilio.spend_30d_gbp", round(spend, 2)),
        fact("money", "twilio.runway_days", runway,
             note="empty account = instant SMS fails = leads stop becoming contactable"),
    ]


def lane_vercel_env(ctx: Ctx) -> list[dict]:
    """Which env keys exist on each project. Names only, never values."""
    if not ctx.vercel_token:
        raise RuntimeError("VERCEL_TOKEN not set")
    h = {"Authorization": f"Bearer {ctx.vercel_token}"}
    p = {"teamId": ctx.vercel_org, "limit": "100"}

    projects = ctx.http.get("https://api.vercel.com/v9/projects", headers=h, params=p).json()
    out: list[dict] = []
    for proj in projects.get("projects", []):
        envs = ctx.http.get(
            f"https://api.vercel.com/v9/projects/{proj['id']}/env",
            headers=h,
            params={"teamId": ctx.vercel_org, "limit": "200"},
        ).json()
        keys = sorted(
            f"{e['key']}:{'+'.join(sorted(e.get('target') or []))}"
            for e in envs.get("envs", [])
        )
        out.append(fact("vercel_env", f"{proj['name']}.keys", keys))
    return out


def lane_schema(ctx: Ctx) -> list[dict]:
    """
    Every migration file vs what prod actually has.

    There is no applied-migrations table in this project, so 'what is in prod'
    is not recorded anywhere. We therefore verify by inspection: parse the
    objects each migration creates and check prod has them. Self-updating -
    a new .sql file is checked the next time this runs.
    """
    tables = {
        r["table_name"]
        for r in ctx.sql(
            "select table_name from information_schema.tables where table_schema='public'"
        )
    }
    cols = {
        (r["table_name"], r["column_name"])
        for r in ctx.sql(
            "select table_name, column_name from information_schema.columns"
            " where table_schema='public'"
        )
    }

    re_tbl = re.compile(r"create\s+(?:table|(?:materialized\s+)?view)\s+(?:if\s+not\s+exists\s+)?(?:or\s+replace\s+)?(?:public\.)?[\"']?([a-z_][a-z0-9_]*)", re.I)
    re_col = re.compile(r"alter\s+table\s+(?:if\s+exists\s+)?(?:only\s+)?(?:public\.)?[\"']?([a-z_][a-z0-9_]*)[\"']?\s+add\s+column\s+(?:if\s+not\s+exists\s+)?[\"']?([a-z_][a-z0-9_]*)", re.I)
    re_comment = re.compile(r"--[^\n]*")

    out: list[dict] = []
    for path in sorted((ROOT / "supabase" / "migrations").glob("*.sql")):
        # strip line comments first: prose in a comment is not a schema object
        sql = re_comment.sub("", path.read_text(encoding="utf-8", errors="ignore"))
        missing: list[str] = []
        for m in set(re_tbl.findall(sql)):
            if m not in tables:
                missing.append(m)
        for tbl, col in set(re_col.findall(sql)):
            if tbl in tables and (tbl, col) not in cols:
                missing.append(f"{tbl}.{col}")

        if not missing:
            value, note = "applied", ""
        elif path.name in KNOWN_SCHEMA_DRIFT:
            value, note = "absent-by-design", KNOWN_SCHEMA_DRIFT[path.name]
        else:
            value, note = "MISSING", ", ".join(sorted(missing)[:6])
        out.append(fact("schema", path.name, value, note=note))
    return out


def lane_freshness(ctx: Ctx) -> list[dict]:
    """
    How recently each data feed received anything.

    Discovers the tables itself: any public table carrying a recognised
    timestamp column. A feed that quietly stops is the failure this catches.
    """
    ts_names = ("ts", "date", "submitted_at", "started_at", "created_at", "recorded_at")
    rows = ctx.sql(
        "select c.table_name, c.column_name from information_schema.columns c"
        " join information_schema.tables t on t.table_schema=c.table_schema"
        "  and t.table_name=c.table_name"
        " where c.table_schema='public' and t.table_type='BASE TABLE'"
        f" and c.column_name in ({','.join(repr(n) for n in ts_names)})"
    )
    # Views are excluded above: a view's max(ts) only mirrors its base table.
    # Partitions (web_events_2026_07) and renamed-legacy tables are excluded
    # below: both are stale by definition and would drown the real signal.
    dead = re.compile(r"_\d{4}_\d{2}$|_legacy_\d+$")
    best: dict[str, str] = {}
    for r in rows:
        t, c = r["table_name"], r["column_name"]
        if t in FRESHNESS_IGNORE or dead.search(t):
            continue
        if t not in best or ts_names.index(c) < ts_names.index(best[t]):
            best[t] = c
    if not best:
        return []

    union = " union all ".join(
        f"select '{t}' as tbl, max({c})::text as last_seen from public.{t}"
        for t, c in sorted(best.items())
    )
    today = dt.date.today()
    out: list[dict] = []
    for r in ctx.sql(union):
        if not r["last_seen"]:
            continue
        last = dt.date.fromisoformat(r["last_seen"][:10])
        age = (today - last).days
        tol = FRESHNESS_TOLERANCE_DAYS.get(r["tbl"])
        note = "" if tol is not None else "no tolerance declared for this feed"
        out.append(fact("freshness", f"{r['tbl']}.days_stale", age, note=note))
    return out


def lane_jobs(ctx: Ctx) -> list[dict]:
    """Scheduled work: does each job that claims a schedule actually run?"""
    out: list[dict] = []

    # GitHub workflows: declared schedule vs real last run
    wf_dir = ROOT / ".github" / "workflows"
    scheduled = {}
    for path in sorted(wf_dir.glob("*.yml")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        # a cron line that is not commented out
        crons = [
            ln.strip() for ln in text.splitlines()
            if "cron:" in ln and not ln.strip().startswith("#")
        ]
        if crons:
            # value only: drop any trailing "# explanatory comment"
            raw = crons[0].split("cron:")[1].split("#")[0].strip()
            scheduled[path.name] = raw.strip("'\"")

    try:
        runs = json.loads(ctx.gh("run", "list", "--limit", "120",
                                 "--json", "workflowName,conclusion,createdAt,event"))
    except Exception:
        runs = []
    last_by_wf: dict[str, dict] = {}
    for r in runs:
        last_by_wf.setdefault(r["workflowName"], r)

    try:
        wf_list = json.loads(ctx.gh("workflow", "list", "--all", "--json", "name,state,path"))
    except Exception:
        wf_list = []
    state_by_path = {Path(w["path"]).name: w["state"] for w in wf_list}
    name_by_path = {Path(w["path"]).name: w["name"] for w in wf_list}

    for fname, cron in scheduled.items():
        state = state_by_path.get(fname, "unknown")
        wf_name = name_by_path.get(fname, fname)
        last = last_by_wf.get(wf_name)
        out.append(fact(
            "jobs", f"workflow.{fname}",
            f"{state} | {cron}",
            note=(f"last {last['conclusion']} {last['createdAt'][:10]}" if last
                  else "no run recorded"),
        ))

    # Vercel crons declared in each app's vercel.json
    for vj in sorted(ROOT.glob("*/web/vercel.json")) + sorted(ROOT.glob("*/vercel.json")):
        try:
            cfg = json.loads(vj.read_text(encoding="utf-8"))
        except Exception:
            continue
        for c in cfg.get("crons", []) or []:
            out.append(fact("jobs", f"vercel_cron.{vj.parent.name}{c['path']}",
                            c.get("schedule", "?")))

    # the nurture engine stamps its own heartbeat; that is the truth for the hourly cron
    try:
        hb = ctx.sql("select last_cron_run_at, last_digest_run_at, paused"
                     " from lead_nurture_control limit 1")
        if hb:
            out.append(fact("jobs", "nurture.last_cron_run_at", (hb[0]["last_cron_run_at"] or "")[:16]))
            out.append(fact("jobs", "nurture.last_digest_run_at", (hb[0]["last_digest_run_at"] or "")[:16]))
            out.append(fact("jobs", "nurture.paused", hb[0]["paused"]))
    except Exception:
        pass

    # deploy_watch self-evidence: a pending gate past its due date means the
    # cron ran without landing the verdict (or stopped running). The table
    # already encodes "should have fired", so no extra stamping is needed.
    try:
        overdue = ctx.sql(
            "select count(*) as n from deploy_watch"
            " where status = 'pending'"
            "   and now() > started_at + (gate_day + 1) * interval '1 day'"
        )
        out.append(fact("jobs", "deploy_watch.overdue_unsent", int(overdue[0]["n"])))
    except Exception:
        pass

    return out


def lane_secrets(ctx: Ctx) -> list[dict]:
    """
    Secrets the LIVE workflows demand vs secrets the repo actually holds.

    Only enabled workflows count. A disabled workflow referencing a secret we
    do not have is not a problem, and counting it would bury the ones that are.
    """
    try:
        wf = json.loads(ctx.gh("workflow", "list", "--all", "--json", "state,path"))
        enabled = {Path(w["path"]).name for w in wf if w["state"] == "active"}
    except Exception:
        enabled = set()

    wanted: set[str] = set()
    for path in (ROOT / ".github" / "workflows").glob("*.yml"):
        if enabled and path.name not in enabled:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        wanted |= set(re.findall(r"secrets\.([A-Z0-9_]+)", text))
    wanted.discard("GITHUB_TOKEN")  # provided automatically

    have = {ln.split("\t")[0] for ln in ctx.gh("secret", "list").splitlines() if ln.strip()}
    missing = sorted(wanted - have)
    return [
        fact("secrets", "repo.present", sorted(have)),
        fact("secrets", "repo.missing", missing,
             note="a workflow references these but the repo does not have them"),
    ]


def lane_leads(ctx: Ctx) -> list[dict]:
    """
    Lead flow per site, submitted AND contactable, in 7-day windows.

    Two numbers on purpose: submissions can look healthy while the number of
    leads you can actually reach collapses. That is the failure mode an empty
    SMS account produces.
    """
    rows = ctx.sql(
        """
        select source,
               count(*) filter (where submitted_at >= now() - interval '7 days')  as w0,
               count(*) filter (where submitted_at >= now() - interval '14 days'
                                  and submitted_at <  now() - interval '7 days')  as w1,
               count(*) filter (where submitted_at >= now() - interval '7 days'
                                  and status in ('contactable','forwarded'))      as w0_contactable
        from leads
        where coalesce(is_test,false) = false
          and submitted_at >= now() - interval '14 days'
        group by source order by 2 desc
        """
    )
    out = []
    for r in rows:
        out.append(fact("leads", f"{r['source']}.submitted_7d", int(r["w0"]),
                        note=f"prior 7d: {r['w1']}"))
        out.append(fact("leads", f"{r['source']}.contactable_7d", int(r["w0_contactable"])))

    # Pipeline coverage: does the machinery that should run PER LEAD actually
    # produce rows? These caught two live defects on day one (enrichment and
    # auto-scoring both at 0 forever while their health probes said ready).
    cov = ctx.sql(
        """
        select
          (select count(*) from lead_enrichment
            where enriched_at >= now() - interval '7 days')               as enrichment_7d,
          (select count(*) from lead_value_scores
            where scored_by = 'claude_auto'
              and scored_at >= now() - interval '7 days')                 as auto_scored_7d,
          (select count(*) from leads
            where coalesce(is_test,false) = false
              and submitted_at >= now() - interval '48 hours')            as leads_48h,
          (select count(*) from leads
            where coalesce(is_test,false) = false
              and submitted_at >= now() - interval '96 hours')            as leads_96h
        """
    )[0]
    out.append(fact("leads", "pipeline.enrichment_7d", int(cov["enrichment_7d"])))
    out.append(fact("leads", "pipeline.auto_scored_7d", int(cov["auto_scored_7d"])))
    out.append(fact("leads", "pipeline.total_48h", int(cov["leads_48h"]),
                    note=f"96h: {cov['leads_96h']}"))
    out.append(fact("leads", "pipeline.total_96h", int(cov["leads_96h"])))
    return out


def lane_exposure(ctx: Ctx) -> list[dict]:
    """
    Public tables with row-level security switched off.

    Supabase serves the public schema to anyone holding the anon key, and the
    anon key ships inside the public JavaScript by design. So a public table
    with RLS off is readable by the internet. Found by this check on day one:
    two orphan tables holding IP addresses had RLS off and no policies.
    """
    rows = ctx.sql(
        "select c.relname,"
        " (select count(*) from pg_policies p where p.tablename = c.relname) as policies"
        " from pg_class c join pg_namespace n on n.oid = c.relnamespace"
        " where n.nspname = 'public' and c.relkind = 'r'"
        "   and c.relrowsecurity = false"
        " order by c.relname"
    )
    open_tables = sorted(r["relname"] for r in rows)
    return [fact("exposure", "public_tables_without_rls", open_tables,
                 note="readable by anyone with the anon key")]


LANES = [
    ("money", lane_money),
    ("exposure", lane_exposure),
    ("vercel_env", lane_vercel_env),
    ("schema", lane_schema),
    ("freshness", lane_freshness),
    ("jobs", lane_jobs),
    ("secrets", lane_secrets),
    ("leads", lane_leads),
]


# --------------------------------------------------------------------------
# Hard rules: things that are wrong in absolute terms, not just changed.
# Everything else is caught by comparison against the previous run.
# --------------------------------------------------------------------------
def apply_rules(facts: list[dict]) -> list[dict]:
    findings = []
    by_name = {f["name"]: f for f in facts}

    r = by_name.get("twilio.runway_days")
    if r and isinstance(r["value"], (int, float)) and r["value"] < TWILIO_MIN_RUNWAY_DAYS:
        findings.append({
            "status": "ALARM", "lane": "money", "name": "twilio.runway_days",
            "detail": f"{r['value']} days left, floor is {TWILIO_MIN_RUNWAY_DAYS}. "
                      f"Balance {by_name['twilio.balance_gbp']['value']} GBP.",
        })

    for f in facts:
        if f["lane"] == "schema" and f["value"] == "MISSING":
            findings.append({
                "status": "ALARM", "lane": "schema", "name": f["name"],
                "detail": f"not applied to prod: {f['note']}",
            })
        if f["lane"] == "freshness" and isinstance(f["value"], int):
            tbl = f["name"].split(".")[0]
            tol = FRESHNESS_TOLERANCE_DAYS.get(tbl)
            if tol is None:
                findings.append({
                    "status": "UNKNOWN", "lane": "freshness", "name": f["name"],
                    "detail": f"{f['value']}d stale, and nobody has said how fresh this "
                              f"feed should be. Decide, then add it to "
                              f"FRESHNESS_TOLERANCE_DAYS or FRESHNESS_IGNORE.",
                })
            elif f["value"] > tol:
                findings.append({
                    "status": "ALARM", "lane": "freshness", "name": f["name"],
                    "detail": f"{f['value']}d stale, tolerance {tol}d",
                })

    m = by_name.get("repo.missing")
    if m and m["value"]:
        findings.append({
            "status": "ALARM", "lane": "secrets", "name": "repo.missing",
            "detail": f"workflows reference but repo lacks: {', '.join(m['value'])}",
        })

    # Frozen-heartbeat rule: a timestamp fact that stopped moving is an
    # incident the snapshot diff cannot see (no change = no CHANGED row).
    # Only judged when the jobs lane actually produced facts: if the lane
    # itself was blind, the lane-level BLIND finding already covers it.
    now_utc = dt.datetime.now(dt.timezone.utc)
    jobs_ran = any(f["lane"] == "jobs" for f in facts)
    for name, max_hours in (HEARTBEAT_MAX_AGE_HOURS.items() if jobs_ran else ()):
        f = by_name.get(name)
        if f is None or not f["value"]:
            findings.append({
                "status": "BLIND", "lane": "jobs", "name": name,
                "detail": "heartbeat fact absent or empty; the thing that stamps it "
                          "may be dead, or the lane could not read it",
            })
            continue
        try:
            stamp = dt.datetime.fromisoformat(str(f["value"])).replace(tzinfo=dt.timezone.utc)
        except ValueError:
            findings.append({
                "status": "BLIND", "lane": "jobs", "name": name,
                "detail": f"unparseable heartbeat value {f['value']!r}",
            })
            continue
        age_h = (now_utc - stamp).total_seconds() / 3600
        if age_h > max_hours:
            findings.append({
                "status": "ALARM", "lane": "jobs", "name": name,
                "detail": f"frozen: last stamped {f['value']} ({age_h:.1f}h ago, "
                          f"tolerance {max_hours}h). The cron behind it has stopped.",
            })

    # Scheduled-workflow rules: a failing or silently-stopped workflow is an
    # incident (GitHub auto-disables schedules after 60 idle days; a monitor
    # that dies this way is the proven rot mode this tool exists to kill).
    for f in facts:
        if f["lane"] != "jobs" or not f["name"].startswith("workflow."):
            continue
        state = str(f["value"]).split("|")[0].strip()
        note = f.get("note") or ""
        if state == "active" and note.startswith("last failure"):
            findings.append({
                "status": "ALARM", "lane": "jobs", "name": f["name"],
                "detail": f"last scheduled run FAILED ({note}). Go and look.",
            })
        elif state == "active" and note == "no run recorded":
            findings.append({
                "status": "UNKNOWN", "lane": "jobs", "name": f["name"],
                "detail": "active schedule but no run in the last 120 runs. "
                          "New workflow, or scheduling silently stopped?",
            })
        elif state == "active" and note.startswith("last "):
            # Backstop staleness: any active schedule (6-hourly, daily or
            # weekly) should have run within 8 days. Older = the schedule
            # has silently stopped (GitHub 60-day auto-disable, or worse).
            m_date = re.search(r"(\d{4}-\d{2}-\d{2})$", note)
            if m_date:
                last_day = dt.datetime.fromisoformat(m_date.group(1)).replace(
                    tzinfo=dt.timezone.utc)
                if (now_utc - last_day).days > 8:
                    findings.append({
                        "status": "ALARM", "lane": "jobs", "name": f["name"],
                        "detail": f"active schedule but last run was {m_date.group(1)} "
                                  f"({(now_utc - last_day).days}d ago). Scheduling has "
                                  "silently stopped.",
                    })
        elif state not in ("active", "unknown"):
            findings.append({
                "status": "UNKNOWN", "lane": "jobs", "name": f["name"],
                "detail": f"declares a cron but workflow state is {state}. "
                          "Delete the cron block or re-enable it.",
            })

    # Overdue deploy-watch gates: pending past due = verdicts silently not landing.
    ow = by_name.get("deploy_watch.overdue_unsent")
    if ow and isinstance(ow["value"], int) and ow["value"] > 0:
        findings.append({
            "status": "ALARM", "lane": "jobs", "name": "deploy_watch.overdue_unsent",
            "detail": f"{ow['value']} watch gate(s) past due and unsent. The cron is "
                      "running without landing verdicts, or has stopped.",
        })

    # Pipeline coverage: leads arriving but per-lead machinery producing nothing.
    subs = sum(
        f["value"] for f in facts
        if f["lane"] == "leads" and f["name"].endswith(".submitted_7d")
        and isinstance(f["value"], int)
    )
    for probe in ("pipeline.enrichment_7d", "pipeline.auto_scored_7d"):
        p = by_name.get(probe)
        if p is not None and subs > 0 and p["value"] == 0:
            findings.append({
                "status": "ALARM", "lane": "leads", "name": probe,
                "detail": f"{subs} leads arrived in 7d but this per-lead pipeline "
                          "produced 0 rows. It is broken, not quiet.",
            })

    # Business canary: zero leads for 48h is abnormal at current volume.
    # Weekend-aware: on Mon/Tue the window widens to 96h so a quiet weekend
    # does not page anyone.
    canary = by_name.get(
        "pipeline.total_96h" if now_utc.weekday() in (0, 1) else "pipeline.total_48h"
    )
    if canary is not None and canary["value"] == 0:
        findings.append({
            "status": "ALARM", "lane": "leads", "name": "pipeline.leads_flatline",
            "detail": "0 leads across every site in the canary window. Form, DB "
                      "write, bot-gate or deploy regression - go and look now.",
        })
    return findings


def compare(now: list[dict], prev: list[dict] | None) -> list[dict]:
    """New, gone, or changed since last run. This is the anti-rot mechanism."""
    if prev is None:
        return [{"status": "INFO", "lane": "-", "name": "baseline",
                 "detail": "first run, nothing to compare against yet"}]
    a = {f["name"]: f for f in prev}
    b = {f["name"]: f for f in now}
    out = []
    for name in sorted(set(b) - set(a)):
        out.append({"status": "NEW", "lane": b[name]["lane"], "name": name,
                    "detail": f"appeared since last run, value {b[name]['value']!r}. "
                              f"Does it need watching?"})
    for name in sorted(set(a) - set(b)):
        out.append({"status": "GONE", "lane": a[name]["lane"], "name": name,
                    "detail": "was checked last run, is absent now. Retired, or broken?"})
    for name in sorted(set(a) & set(b)):
        if a[name]["value"] != b[name]["value"]:
            out.append({"status": "CHANGED", "lane": b[name]["lane"], "name": name,
                        "detail": f"{a[name]['value']!r} -> {b[name]['value']!r}"})
    return out


def latest_snapshot() -> list[dict] | None:
    files = sorted(OUT.glob(f"{SNAP_PREFIX}*.json"))
    if not files:
        return None
    return json.loads(files[-1].read_text(encoding="utf-8")).get("facts")


# --------------------------------------------------------------------------
def selftest() -> int:
    """Prove the two things that would silently lie if they broke."""
    src = Path(__file__).read_text(encoding="utf-8")
    # Working code only: after the module docstring, before this function (which
    # necessarily names the patterns it hunts for).
    body = src.split('"""', 2)[2].split("def selftest")[0].lower()
    # Match SQL SHAPES, not English words. "drop any trailing comment" in prose
    # is fine; "drop table" is not. An earlier, blunter version of this check
    # false-positived on its own comments, which is how we learned the difference.
    mutating = [
        r"\bdelete\s+from\b",
        r"\bdrop\s+(?:table|view|column|index|schema|database|constraint)\b",
        r"\btruncate\b",
        r"\binsert\s+into\b",
        r"\bupdate\s+\w+\s+set\b",
        r"\balter\s+table\s+\w+\s+(?:add|drop|alter)\b",
        r"\.delete\s*\(",          # httpx / client-level deletes
    ]
    for pat in mutating:
        hit = re.search(pat, body)
        assert hit is None, f"mutating operation present: {hit.group(0)!r}"

    f = [fact("money", "twilio.runway_days", 5), fact("money", "twilio.balance_gbp", 5.2)]
    assert any(x["status"] == "ALARM" for x in apply_rules(f)), "low runway did not alarm"

    f2 = [fact("money", "twilio.runway_days", 400), fact("money", "twilio.balance_gbp", 900)]
    assert not apply_rules(f2), "healthy runway alarmed anyway"

    old = [fact("jobs", "workflow.a.yml", "active")]
    new = [fact("jobs", "workflow.b.yml", "active")]
    d = {x["status"] for x in compare(new, old)}
    assert d == {"NEW", "GONE"}, f"comparison missed appearance/disappearance: {d}"

    print("selftest OK: read-only rule holds, alarm fires, comparison detects new and gone")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--selftest", action="store_true")
    ap.add_argument("--no-save", action="store_true", help="do not write a snapshot")
    args = ap.parse_args()

    if args.selftest:
        return selftest()

    ctx = Ctx()
    facts: list[dict] = []
    findings: list[dict] = []

    for name, fn in LANES:
        try:
            facts.extend(fn(ctx))
        except Exception as exc:  # a lane that cannot see is itself a finding
            findings.append({"status": "BLIND", "lane": name, "name": f"{name}.lane",
                             "detail": f"could not run: {exc}"})

    findings.extend(apply_rules(facts))
    findings.extend(compare(facts, latest_snapshot()))

    if not args.no_save:
        OUT.mkdir(exist_ok=True)
        (OUT / f"{SNAP_PREFIX}{dt.date.today()}.json").write_text(
            json.dumps({"generated": dt.datetime.now().isoformat(timespec="seconds"),
                        "facts": facts, "findings": findings}, indent=2),
            encoding="utf-8",
        )

    bad = [f for f in findings if f["status"] in ("ALARM", "BLIND")]

    if args.json:
        print(json.dumps({"facts": facts, "findings": findings}, indent=2))
        return 1 if bad else 0   # nothing else on stdout: it must stay parseable

    order = {"ALARM": 0, "BLIND": 1, "UNKNOWN": 2, "GONE": 3, "CHANGED": 4, "NEW": 5, "INFO": 6}
    print(f"\nSTATE CHECK  {dt.date.today()}   {len(facts)} facts observed\n")
    if not findings:
        print("  all quiet")
    for f in sorted(findings, key=lambda x: (order.get(x["status"], 9), x["name"])):
        print(f"  {f['status']:<8} {f['lane']:<11} {f['name']:<44} {f['detail']}")
    print(f"\n{len(bad)} alarm(s), {len(findings) - len(bad)} note(s). "
          f"This tool reports only; it changes nothing.")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
