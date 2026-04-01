"""
Batch generate Solicitors blog posts from Supabase topics.
"""
import argparse
import os
import subprocess
import sys
import time
from datetime import datetime

def run_generation(count: int, delay_seconds: int = 5):
    """Run blog generation multiple times."""
    
    print("=" * 80)
    print("BATCH GENERATE SOLICITORS BLOG POSTS")
    print("=" * 80)
    print(f"Target count: {count}")
    print(f"Delay between posts: {delay_seconds}s")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    script_path = os.path.join("Solicitors", "generate_blog_supabase.py")
    
    if not os.path.exists(script_path):
        print(f"Error: Script not found at {script_path}")
        sys.exit(1)
    
    successful = 0
    failed = 0
    
    for i in range(1, count + 1):
        print(f"\n[{i}/{count}] Generating post...")
        
        try:
            result = subprocess.run(
                ["python", script_path],
                capture_output=True,
                text=True,
                timeout=120
            )
            
            if result.returncode == 0:
                successful += 1
                print(f"[OK] Post {i} generated successfully")
                
                if "No unused topics found" in result.stdout:
                    print("[INFO] No more topics available")
                    break
            else:
                failed += 1
                print(f"[ERROR] Post {i} failed")
                print(result.stderr)
        
        except subprocess.TimeoutExpired:
            failed += 1
            print(f"[ERROR] Post {i} timed out")
        
        except Exception as e:
            failed += 1
            print(f"[ERROR] Post {i} failed: {e}")
        
        if i < count:
            print(f"Waiting {delay_seconds}s before next post...")
            time.sleep(delay_seconds)
    
    print("\n" + "=" * 80)
    print("BATCH GENERATION COMPLETE")
    print("=" * 80)
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Total: {successful + failed}")
    print(f"Finished: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Batch generate Solicitors blog posts")
    parser.add_argument("--count", type=int, default=15, help="Number of posts to generate (default: 15)")
    parser.add_argument("--delay", type=int, default=5, help="Delay between posts in seconds (default: 5)")
    
    args = parser.parse_args()
    
    run_generation(args.count, args.delay)
