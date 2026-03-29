"""
Sync Shared Components - Copies shared web components to niche folders.
Run before building each niche to ensure latest shared code is used.
"""
import os
import sys
import shutil
import json
import argparse
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent
SHARED_WEB_CORE = PROJECT_ROOT / "shared" / "web-core"

def sync_to_niche(niche: str, dry_run: bool = False):
    """Sync shared components to a specific niche."""
    niche_path = PROJECT_ROOT / niche / "web"
    
    if not niche_path.exists():
        print(f"ERROR: Niche path does not exist: {niche_path}")
        return False
    
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Syncing shared components to {niche}...")
    
    # Define what to sync - BACKEND LOGIC ONLY
    # UI components are niche-specific to allow visual differentiation
    sync_map = {
        "lib": "src/lib",              # Backend logic: blog parsing, schema helpers
        "config": "src/config",        # Config loader utilities
        "types": "src/types",          # TypeScript type definitions
    }
    
    synced_files = []
    
    for shared_rel, niche_rel in sync_map.items():
        shared_dir = SHARED_WEB_CORE / shared_rel
        niche_dir = niche_path / niche_rel
        
        if not shared_dir.exists():
            print(f"  SKIP: {shared_rel} (not in shared)")
            continue
        
        # Get all files in shared directory
        for shared_file in shared_dir.rglob("*"):
            if shared_file.is_file():
                rel_path = shared_file.relative_to(shared_dir)
                target_file = niche_dir / rel_path
                
                if not dry_run:
                    target_file.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(shared_file, target_file)
                
                synced_files.append(f"{niche_rel}/{rel_path}")
                print(f"  {'WOULD SYNC' if dry_run else 'SYNCED'}: {niche_rel}/{rel_path}")
    
    # Update niche config with sync timestamp
    if not dry_run:
        config_path = PROJECT_ROOT / niche / "niche.config.json"
        if config_path.exists():
            with open(config_path, "r") as f:
                config = json.load(f)
            
            config["last_sync"] = datetime.utcnow().isoformat()
            
            with open(config_path, "w") as f:
                json.dump(config, f, indent=2)
            
            print(f"\n  Updated {niche}/niche.config.json with sync timestamp")
    
    print(f"\n{'Would sync' if dry_run else 'Synced'} {len(synced_files)} files to {niche}")
    return True

def sync_all_niches(dry_run: bool = False):
    """Sync shared components to all niches."""
    # Discover all niches (folders with niche.config.json)
    niches = []
    for item in PROJECT_ROOT.iterdir():
        if item.is_dir() and (item / "niche.config.json").exists():
            niches.append(item.name)
    
    if not niches:
        print("No niches found with niche.config.json")
        return
    
    print(f"Found niches: {', '.join(niches)}")
    
    for niche in niches:
        sync_to_niche(niche, dry_run)

def validate_shared_structure():
    """Validate that shared directory structure is correct."""
    required_dirs = [
        "lib",
        "config",
        "types"
    ]
    
    print("Validating shared structure...")
    all_valid = True
    
    for dir_path in required_dirs:
        full_path = SHARED_WEB_CORE / dir_path
        if not full_path.exists():
            print(f"  MISSING: {dir_path}")
            all_valid = False
        else:
            file_count = len(list(full_path.rglob("*")))
            print(f"  OK: {dir_path} ({file_count} files)")
    
    return all_valid

def main():
    parser = argparse.ArgumentParser(description="Sync shared components to niches")
    parser.add_argument("--niche", help="Specific niche to sync (or --all)")
    parser.add_argument("--all", action="store_true", help="Sync to all niches")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be synced without doing it")
    parser.add_argument("--validate", action="store_true", help="Validate shared structure")
    
    args = parser.parse_args()
    
    if args.validate:
        validate_shared_structure()
        return
    
    if args.all:
        sync_all_niches(args.dry_run)
    elif args.niche:
        sync_to_niche(args.niche, args.dry_run)
    else:
        print("Usage: python sync_shared_components.py --niche Dentists")
        print("   or: python sync_shared_components.py --all")
        print("   or: python sync_shared_components.py --validate")

if __name__ == "__main__":
    main()
