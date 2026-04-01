"""
Generate remaining Property Phase 2 posts.
Runs generate_blog_supabase.py from the Property directory to avoid path issues.
"""
import subprocess
import time
import os
from datetime import datetime

# Calculate how many posts we need
CURRENT_POSTS = 116  # Current count
TARGET_POSTS = 169   # Total target
REMAINING = TARGET_POSTS - CURRENT_POSTS

print("="*80)
print(f"GENERATING REMAINING PROPERTY POSTS")
print("="*80)
print(f"\nCurrent: {CURRENT_POSTS} posts")
print(f"Target: {TARGET_POSTS} posts")
print(f"Remaining: {REMAINING} posts")
print(f"\nStarted at: {datetime.now().strftime('%H:%M:%S')}")
print(f"ETA: ~{REMAINING * 0.75:.0f} minutes (~{REMAINING * 0.75 / 60:.1f} hours)")
print()

generated = 0
errors = 0

for i in range(1, REMAINING + 1):
    print(f"[{i}/{REMAINING}] Generating post {i}...")
    
    try:
        # Run from Property directory - this is the key fix
        result = subprocess.run(
            ["python", "generate_blog_supabase.py"],
            cwd="Property",  # Run from Property directory
            capture_output=False,  # Don't capture - let it print directly
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            generated += 1
            print(f"  [OK] Post {i} generated")
        else:
            errors += 1
            print(f"  [ERROR] Post {i} failed with code {result.returncode}")
    
    except subprocess.TimeoutExpired:
        errors += 1
        print(f"  [ERROR] Post {i} timeout after 120s")
    except Exception as e:
        errors += 1
        print(f"  [ERROR] Post {i} exception: {e}")
    
    print()
    
    # Brief delay between posts
    if i < REMAINING:
        time.sleep(2)

print("="*80)
print("GENERATION COMPLETE")
print("="*80)
print(f"\nCompleted at: {datetime.now().strftime('%H:%M:%S')}")
print(f"Generated: {generated}/{REMAINING}")
print(f"Errors: {errors}")
print(f"\nTotal Property posts: {CURRENT_POSTS + generated}")
print("="*80)
