"""Throwaway: run a read-only SELECT against Supabase via the Management API.
Usage: python scripts/_sb_query.py "SELECT ..."
"""
import os
import sys
import json
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

r = httpx.post(
    URL,
    headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
    json={"query": sys.argv[1]},
    timeout=60,
)
r.raise_for_status()
print(json.dumps(r.json(), indent=2, default=str))
