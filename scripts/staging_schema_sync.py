"""Sync the Property-app-relevant schema from PROD Supabase to STAGING.

Why this exists (2026-07-01, lead-nurture dress rehearsal):
- Staging (fyabqbuklfrjqjxaofcx) was restored from pause but is EMPTY.
- Replaying supabase/migrations is not viable: 000_create_core_tables.sql has
  invalid syntax (ADD CONSTRAINT IF NOT EXISTS) and prod's base schema predates
  version control, so the files do not reproduce real prod.
- Instead we introspect PROD (read-only) and emit exact DDL for only the
  objects the Property web app + shared packages touch at runtime, then apply
  it to STAGING. Webhook triggers (sheets/email/enrich) are deliberately
  EXCLUDED so rehearsal submits never call prod endpoints.

Usage:
    python scripts/staging_schema_sync.py            # dump from prod, apply to staging
    python scripts/staging_schema_sync.py --dry-run  # dump + print summary, apply nothing

Reads SUPABASE_ACCESS_TOKEN from repo-root .env. Prod is only ever SELECTed from.
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = "dhlxwmvmkrfnmcgjbntk"
STAGING = "fyabqbuklfrjqjxaofcx"

# Trigger names (or substrings) that must NOT be copied to staging: these call
# external webhooks (Google Sheets forward, email notify, enrichment) and would
# fire real prod endpoints from rehearsal data.
TRIGGER_BLOCKLIST_SUBSTRINGS = ["webhook", "sheets", "email", "enrich"]

DEFAULT_OBJECTS = ROOT / "scripts" / "staging_schema_objects.json"


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")


TOKEN = load_env("SUPABASE_ACCESS_TOKEN")


def run_sql(ref: str, sql: str) -> tuple[bool, object]:
    url = f"https://api.supabase.com/v1/projects/{ref}/database/query"
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            # Cloudflare bans the default Python UA with error 1010.
            "User-Agent": "accounting-network-migrator/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            raw = resp.read().decode("utf-8")
            return True, (json.loads(raw) if raw else [])
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8')[:800]}"
    except Exception as e:  # noqa: BLE001
        return False, f"{type(e).__name__}: {e}"


def prod_select(sql: str) -> list[dict]:
    ok, res = run_sql(PROD, sql)
    if not ok:
        raise SystemExit(f"prod introspection failed: {res}\nSQL: {sql[:200]}")
    return res  # type: ignore[return-value]


def q(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def lit(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


# ── introspection ────────────────────────────────────────────────────────────

def fetch_fk_targets(tables: list[str]) -> set[str]:
    rows = prod_select(f"""
        select distinct cf.relname as target
        from pg_constraint c
        join pg_class ct on ct.oid = c.conrelid
        join pg_namespace n on n.oid = ct.relnamespace
        join pg_class cf on cf.oid = c.confrelid
        where c.contype = 'f' and n.nspname = 'public'
          and ct.relname in ({', '.join(lit(t) for t in tables)})
    """)
    return {r["target"] for r in rows}


def table_ddl(table: str) -> list[str]:
    cols = prod_select(f"""
        select column_name, is_nullable, column_default,
               format_type(a.atttypid, a.atttypmod) as sql_type,
               a.attidentity as identity
        from information_schema.columns isc
        join pg_attribute a on a.attrelid = 'public.{table}'::regclass
             and a.attname = isc.column_name
        where isc.table_schema = 'public' and isc.table_name = {lit(table)}
        order by isc.ordinal_position
    """)
    if not cols:
        raise SystemExit(f"prod table not found: {table}")
    lines = []
    for c in cols:
        line = f"  {q(c['column_name'])} {c['sql_type']}"
        if c["identity"] in ("a", "d"):
            line += " generated {} as identity".format("always" if c["identity"] == "a" else "by default")
        elif c["column_default"]:
            line += f" default {c['column_default']}"
        if c["is_nullable"] == "NO":
            line += " not null"
        lines.append(line)
    stmts = [f"create table if not exists public.{q(table)} (\n" + ",\n".join(lines) + "\n);"]

    cons = prod_select(f"""
        select conname, pg_get_constraintdef(c.oid) as def, contype
        from pg_constraint c
        join pg_class ct on ct.oid = c.conrelid
        join pg_namespace n on n.oid = ct.relnamespace
        where n.nspname = 'public' and ct.relname = {lit(table)}
        order by case contype when 'p' then 0 when 'u' then 1 when 'c' then 2 else 3 end
    """)
    for con in cons:
        # Idempotent: only touch the constraint when its definition differs
        # (dropping a PK that later gained dependent FKs would otherwise fail).
        stmts.append(f"""do $$
begin
  if not exists (
    select 1 from pg_constraint c join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = {lit(table)}
      and c.conname = {lit(con['conname'])}
      and pg_get_constraintdef(c.oid) = {lit(con['def'])}
  ) then
    execute 'alter table public.{q(table)} drop constraint if exists {q(con["conname"])}';
    execute {lit(f"alter table public.{q(table)} add constraint {q(con['conname'])} {con['def']}")};
  end if;
end $$;""")

    idxs = prod_select(f"""
        select indexname, indexdef from pg_indexes
        where schemaname = 'public' and tablename = {lit(table)}
          and indexname not in (
            select conname from pg_constraint c
            join pg_class ct on ct.oid = c.conrelid
            where ct.relname = {lit(table)})
    """)
    for i in idxs:
        # "ON ONLY" appears in partitioned-parent index defs; staging tables are plain.
        stmts.append(i["indexdef"].replace("CREATE INDEX", "CREATE INDEX IF NOT EXISTS", 1)
                                  .replace("CREATE UNIQUE INDEX", "CREATE UNIQUE INDEX IF NOT EXISTS", 1)
                                  .replace(" ON ONLY ", " ON ") + ";")

    rls = prod_select(f"""
        select relrowsecurity from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
        where n.nspname = 'public' and c.relname = {lit(table)}
    """)
    if rls and rls[0]["relrowsecurity"]:
        stmts.append(f"alter table public.{q(table)} enable row level security;")
    pols = prod_select(f"""
        select policyname, cmd, permissive, roles, qual, with_check
        from pg_policies where schemaname = 'public' and tablename = {lit(table)}
    """)
    for p in pols:
        roles = p["roles"]
        if isinstance(roles, str):  # "{anon,authenticated}"
            roles = [r for r in roles.strip("{}").split(",") if r]
        stmt = f"drop policy if exists {q(p['policyname'])} on public.{q(table)};\n"
        stmt += f"create policy {q(p['policyname'])} on public.{q(table)}"
        stmt += f" as {'permissive' if str(p['permissive']).upper().startswith('PERM') else 'restrictive'}"
        stmt += f" for {p['cmd'].lower()}"
        if roles:
            stmt += " to " + ", ".join(q(r) for r in roles)
        if p["qual"]:
            stmt += f" using ({p['qual']})"
        if p["with_check"]:
            stmt += f" with check ({p['with_check']})"
        stmts.append(stmt + ";")
    return stmts


def trigger_ddl(table: str) -> list[str]:
    trs = prod_select(f"""
        select t.tgname, pg_get_triggerdef(t.oid) as def, p.proname,
               pg_get_functiondef(p.oid) as fndef
        from pg_trigger t
        join pg_class c on c.oid = t.tgrelid
        join pg_namespace n on n.oid = c.relnamespace
        join pg_proc p on p.oid = t.tgfoid
        where n.nspname = 'public' and c.relname = {lit(table)} and not t.tgisinternal
    """)
    stmts = []
    for t in trs:
        blob = (t["tgname"] + " " + t["proname"] + " " + (t["fndef"] or "")).lower()
        if any(b in blob for b in TRIGGER_BLOCKLIST_SUBSTRINGS):
            print(f"  [skip trigger] {table}.{t['tgname']} (webhook/external)")
            continue
        stmts.append(t["fndef"] + ";")
        stmts.append(f"drop trigger if exists {q(t['tgname'])} on public.{q(table)};")
        stmts.append(t["def"] + ";")
    return stmts


def view_ddl(view: str) -> str:
    rows = prod_select(f"select pg_get_viewdef('public.{view}'::regclass, true) as def")
    return f"create or replace view public.{q(view)} as\n{rows[0]['def']}"


def function_ddl(fn: str) -> list[str]:
    rows = prod_select(f"""
        select pg_get_functiondef(p.oid) as def
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
        where n.nspname = 'public' and p.proname = {lit(fn)}
    """)
    if not rows:
        raise SystemExit(f"prod function not found: {fn}")
    return [r["def"] + ";" for r in rows]


# ── main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    dry = "--dry-run" in sys.argv
    objects = json.loads(DEFAULT_OBJECTS.read_text(encoding="utf-8"))
    tables = list(objects["tables"])
    views = list(objects["views"])
    functions = list(objects.get("functions", []))

    # Pull in FK-referenced tables transitively.
    seen = set(tables)
    frontier = list(tables)
    while frontier:
        extra = fetch_fk_targets(frontier) - seen
        if not extra:
            break
        print(f"FK dependencies added: {sorted(extra)}")
        tables.extend(sorted(extra))
        seen |= extra
        frontier = sorted(extra)

    print(f"Dumping from prod: {len(tables)} tables, {len(views)} views, {len(functions)} functions")
    batches: list[tuple[str, str]] = []  # (label, sql)
    for t in tables:
        batches.append((f"table {t}", "\n".join(table_ddl(t))))
    for fn in functions:
        batches.append((f"function {fn}", "\n".join(function_ddl(fn))))
    for t in tables:
        trg = trigger_ddl(t)
        if trg:
            batches.append((f"triggers {t}", "\n".join(trg)))
    # Views may depend on each other: retry failures until fixpoint.
    view_batches = [(f"view {v}", view_ddl(v) + ";") for v in views]

    out = ROOT / "scripts" / "staging_schema_dump.sql"
    out.write_text(
        "\n\n".join(f"-- ── {label} " + "─" * 30 + "\n" + sql for label, sql in batches + view_batches),
        encoding="utf-8",
    )
    print(f"DDL written to {out}")
    if dry:
        print("DRY RUN: nothing applied to staging.")
        return

    failed: list[str] = []
    for label, sql in batches:
        ok, msg = run_sql(STAGING, sql)
        print(f"[{'PASS' if ok else 'FAIL'}] {label}")
        if not ok:
            failed.append(label)
            print(f"        {msg}")

    pending = view_batches
    last_err: dict[str, object] = {}
    for _round in range(6):
        nxt = []
        for label, sql in pending:
            ok, msg = run_sql(STAGING, sql)
            if ok:
                print(f"[PASS] {label}")
            else:
                nxt.append((label, sql))
                last_err[label] = msg
        if not nxt or len(nxt) == len(pending):
            pending = nxt
            break
        pending = nxt
    for label, _sql in pending:
        failed.append(label)
        print(f"[FAIL] {label}\n        {last_err.get(label)}")

    print("\n" + ("STAGING SCHEMA SYNC CLEAN" if not failed else f"FAILED: {failed}"))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
