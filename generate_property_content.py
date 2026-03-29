"""
Generate initial Property blog content batch.
Runs research → generation → deployment in sequence.
"""
import sys
import asyncio
import subprocess

sys.path.insert(0, 'agents')

async def main():
    print("=" * 70)
    print("PROPERTY CONTENT GENERATION - INITIAL BATCH")
    print("=" * 70)
    
    # Step 1: Research topics (3 batches of 5 = 15 topics)
    print("\n[STEP 1/4] Researching topics...")
    for batch in range(3):
        print(f"\n  Batch {batch + 1}/3...")
        result = subprocess.run(
            ["python", "agents/content_research_agent.py", "--niche", "Property"],
            capture_output=True,
            text=True
        )
        print(result.stdout)
        if result.returncode != 0:
            print(f"ERROR: {result.stderr}")
            return
    
    # Step 2: Generate blog posts (15 posts)
    print("\n[STEP 2/4] Generating blog posts...")
    result = subprocess.run(
        ["python", "agents/blog_generation_agent.py", "--niche", "Property", "--max-posts", "15"],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.returncode != 0:
        print(f"ERROR: {result.stderr}")
        return
    
    # Step 3: Deploy to filesystem
    print("\n[STEP 3/4] Deploying content to filesystem...")
    result = subprocess.run(
        ["python", "agents/deployment_agent.py", "--niche", "Property", "--max-deployments", "20"],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.returncode != 0:
        print(f"ERROR: {result.stderr}")
        return
    
    # Step 4: Check final status
    print("\n[STEP 4/4] Final status check...")
    from utils.supabase_client import SupabaseClient
    from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY
    
    client = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    content = await client.select('published_content', filters={'niche': 'property', 'deployment_status': 'deployed'})
    
    print(f"\n{'=' * 70}")
    print(f"COMPLETE: Generated and deployed {len(content)} Property articles")
    print(f"{'=' * 70}")
    
    if content:
        print("\nArticles created:")
        for i, c in enumerate(content):
            print(f"  {i+1}. {c['slug']}")
    
    print("\nNext steps:")
    print("  1. Run: git add Property/web/content/blog/")
    print("  2. Run: git commit -m 'Add initial Property blog content'")
    print("  3. Run: git push origin main")
    print("  4. Vercel will auto-deploy to propertytaxpartners.co.uk")

if __name__ == "__main__":
    asyncio.run(main())
