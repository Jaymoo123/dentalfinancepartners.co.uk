"""
Generate Phase 2 Dentists posts (12 posts) with detailed status updates
"""
import subprocess
import time
import re
from datetime import datetime

NUM_POSTS = 12

print("="*80)
print(f"PHASE 2: GENERATING {NUM_POSTS} DENTISTS COMPREHENSIVE POSTS")
print("="*80)
print(f"\nStarted at: {datetime.now().strftime('%H:%M:%S')}")
print()

generated = []
errors = []

for i in range(1, NUM_POSTS + 1):
    print(f"[{i}/{NUM_POSTS}] Generating post {i}...")
    
    try:
        result = subprocess.run(
            ["python", "generate_blog_supabase.py"],
            capture_output=True,
            text=True,
            timeout=180
        )
        
        if result.returncode == 0:
            slug_match = re.search(r'\[COMPLETE\] (.+?)\.md', result.stdout)
            topic_match = re.search(r'Found topic: (.+)', result.stdout)
            
            if slug_match:
                slug = slug_match.group(1)
                topic = topic_match.group(1) if topic_match else "Unknown"
                generated.append((slug, topic))
                print(f"  [OK] {slug}")
                print(f"       Topic: {topic[:60]}")
            else:
                print(f"  [WARN] Generated but couldn't extract slug")
                generated.append(("unknown", "unknown"))
        else:
            print(f"  [ERROR] Generation failed")
            print(f"  {result.stderr[:200]}")
            errors.append(i)
    
    except subprocess.TimeoutExpired:
        print(f"  [ERROR] Timeout after 180s")
        errors.append(i)
    except Exception as e:
        print(f"  [ERROR] {str(e)[:200]}")
        errors.append(i)
    
    print()
    
    if i < NUM_POSTS:
        time.sleep(3)

print("="*80)
print("PHASE 2 DENTISTS GENERATION COMPLETE")
print("="*80)
print(f"\nCompleted at: {datetime.now().strftime('%H:%M:%S')}")
print(f"Generated: {len(generated)}/{NUM_POSTS}")
print(f"Errors: {len(errors)}")

if generated:
    print(f"\nGenerated posts:")
    for slug, topic in generated:
        print(f"  - {slug}")

print("\n" + "="*80)
print("PHASE 2 COMPLETE FOR DENTISTS")
print("="*80)
print("\nWaiting for Property Phase 2 to complete...")
print("Check Property/generate_phase2_all.py progress")
