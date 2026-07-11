import os, sys, httpx
from dotenv import load_dotenv
load_dotenv()
URL="https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
def sql(q):
    r=httpx.post(URL,headers={"Authorization":f"Bearer {os.getenv('SUPABASE_ACCESS_TOKEN')}","Content-Type":"application/json","User-Agent":"x"},json={"query":q},timeout=120)
    r.raise_for_status(); return r.json()
if __name__=="__main__":
    q = open(sys.argv[1], encoding="utf-8").read() if len(sys.argv)>1 and os.path.exists(sys.argv[1]) else sys.argv[1]
    print(sql(q))
