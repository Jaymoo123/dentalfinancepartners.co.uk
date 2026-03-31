"""
Generate ALL Phase 2 Property posts (130 posts)
Runs generate_all_automated.py 7 times (20 posts each, last run 10 posts)
"""
import subprocess
import time
from datetime import datetime

NUM_RUNS = 7
POSTS_PER_RUN = 20

print("="*80)
print("PHASE 2: GENERATING 130 PROPERTY COMPREHENSIVE POSTS")
print("="*80)
print(f"\nStarted at: {datetime.now().strftime('%H:%M:%S')}")
print(f"Expected time: ~10 hours")
print(f"Runs: {NUM_RUNS} (20 posts each, last run 10 posts)")
print()

total_generated = 0
total_errors = 0

for run in range(1, NUM_RUNS + 1):
    print("\n" + "="*80)
    print(f"RUN {run}/{NUM_RUNS} - Generating up to 20 posts")
    print("="*80)
    print(f"Time: {datetime.now().strftime('%H:%M:%S')}")
    print()
    
    try:
        result = subprocess.run(
            ["python", "generate_all_automated.py"],
            capture_output=False,
            text=True,
            timeout=7200  # 2 hours max per run
        )
        
        if result.returncode == 0:
            print(f"\n[OK] Run {run} complete")
            total_generated += 20 if run < NUM_RUNS else 10
        else:
            print(f"\n[ERROR] Run {run} failed")
            total_errors += 1
    
    except subprocess.TimeoutExpired:
        print(f"\n[ERROR] Run {run} timeout after 2 hours")
        total_errors += 1
    except Exception as e:
        print(f"\n[ERROR] Run {run} exception: {e}")
        total_errors += 1
    
    print(f"\nProgress: ~{total_generated}/130 posts generated")
    print(f"Runs complete: {run}/{NUM_RUNS}")
    
    # Delay between runs
    if run < NUM_RUNS:
        print(f"\nWaiting 10 seconds before next run...")
        time.sleep(10)

print("\n" + "="*80)
print("PHASE 2 PROPERTY GENERATION COMPLETE")
print("="*80)
print(f"\nCompleted at: {datetime.now().strftime('%H:%M:%S')}")
print(f"Estimated posts generated: ~{total_generated}")
print(f"Failed runs: {total_errors}")

print("\n" + "="*80)
print("NEXT: Generate Dentists Phase 2 (12 posts)")
print("  cd ../Dentists && python generate_all_automated.py")
print("="*80)
