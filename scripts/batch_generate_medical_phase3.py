"""
Batch generate Phase 3 location posts for Medical.
"""
import subprocess
import time

BATCH_SIZE = 10

print(f'Starting Phase 3 location post generation ({BATCH_SIZE} posts)...')
print('=' * 60)

for i in range(BATCH_SIZE):
    print(f'\n[{i+1}/{BATCH_SIZE}] Generating location post...')
    
    try:
        result = subprocess.run(
            ['python', 'Medical/generate_blog_supabase.py'],
            cwd='.',
            capture_output=False,
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            print(f'[{i+1}/{BATCH_SIZE}] SUCCESS')
        else:
            print(f'[{i+1}/{BATCH_SIZE}] FAILED with return code {result.returncode}')
            break
            
    except subprocess.TimeoutExpired:
        print(f'[{i+1}/{BATCH_SIZE}] TIMEOUT - skipping')
        continue
    except Exception as e:
        print(f'[{i+1}/{BATCH_SIZE}] ERROR: {e}')
        break
    
    time.sleep(2)

print('\n' + '=' * 60)
print('Phase 3 location posts complete!')
