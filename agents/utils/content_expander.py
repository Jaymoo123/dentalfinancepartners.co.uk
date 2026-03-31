"""
Content Expander - Claude Integration with Git Rollback
Generates section expansions and manages content with version control

Usage:
    from agents.utils.content_expander import ContentExpander
    
    expander = ContentExpander('property')
    expander.expand_section(optimization_id)
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from datetime import datetime
from typing import Dict, Optional
import httpx
import json
import subprocess

from anthropic import Anthropic
from agents.config.gsc_config import get_niche_config

# Load API keys
try:
    from dotenv import load_dotenv
    load_dotenv()
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
except:
    ANTHROPIC_API_KEY = None
    SUPABASE_URL = None
    SUPABASE_KEY = None


class ContentExpander:
    """
    Generate section expansions using Claude with git-based rollback support.
    
    Features:
    - Backup content before changes (git commit)
    - Generate new sections with Claude
    - Insert sections without modifying existing content
    - Support rollback to previous version
    - Update metadata in Supabase
    """
    
    def __init__(self, niche: str):
        """
        Initialize expander for specific niche.
        
        Args:
            niche: Niche identifier (property, dentists, medical, etc.)
        """
        self.niche = niche
        self.config = get_niche_config(niche)
        self.claude = Anthropic(api_key=ANTHROPIC_API_KEY)
        
        if not ANTHROPIC_API_KEY:
            raise ValueError("ANTHROPIC_API_KEY not configured")
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
    
    def expand_section(self, optimization_id: str) -> bool:
        """
        Generate and apply section expansion for approved optimization.
        
        Args:
            optimization_id: UUID of the optimization
        
        Returns:
            bool: True if successful
        """
        print(f"\n[EXPANDER] Processing optimization {optimization_id}")
        
        # 1. Load optimization
        optimization = self._load_optimization(optimization_id)
        if not optimization:
            print(f"[ERROR] Optimization not found")
            return False
        
        if optimization['status'] != 'approved':
            print(f"[ERROR] Optimization not approved (status: {optimization['status']})")
            return False
        
        slug = optimization['existing_slug']
        
        # 2. Find blog post file
        blog_file_path = self._find_blog_file(slug)
        if not blog_file_path:
            print(f"[ERROR] Blog file not found for slug: {slug}")
            return False
        
        print(f"[OK] Found blog file: {blog_file_path}")
        
        # 3. BACKUP: Create git commit BEFORE changes
        backup_commit = self._backup_content(blog_file_path, optimization_id)
        if not backup_commit:
            print(f"[ERROR] Failed to backup content")
            return False
        
        # Update optimization with backup reference
        self._update_optimization(optimization_id, {
            'content_backup_path': f'git:{backup_commit}',
            'status': 'in_progress',
        })
        
        # 4. Read existing content
        existing_content = self._read_file(blog_file_path)
        
        # 5. Generate expansion with Claude
        print(f"[CLAUDE] Generating section expansion...")
        expansion = self._generate_expansion(existing_content, optimization)
        
        if not expansion:
            print(f"[ERROR] Failed to generate expansion")
            return False
        
        # 6. Insert new sections
        updated_content = self._insert_sections(existing_content, expansion, optimization)
        
        # 7. Write back to file
        self._write_file(blog_file_path, updated_content)
        
        # 8. Create git commit for the optimization
        optimization_commit = self._commit_optimization(blog_file_path, optimization_id)
        
        # 9. Update optimization and blog_topics
        self._update_optimization(optimization_id, {
            'status': 'measuring',
            'implemented_at': datetime.now().isoformat(),
            'implementation_notes': f'Added {len(optimization.get("suggested_sections", []))} sections. Git: {optimization_commit[:8]}',
        })
        
        # Update blog_topics
        self._increment_optimization_count(slug)
        
        print(f"[OK] Optimization implemented successfully")
        print(f"  Backup: {backup_commit[:8]}")
        print(f"  Commit: {optimization_commit[:8]}")
        
        return True
    
    def rollback_optimization(self, optimization_id: str, reason: str) -> bool:
        """
        Rollback a failed optimization to original content.
        
        Args:
            optimization_id: UUID of the optimization
            reason: Reason for rollback
        
        Returns:
            bool: True if successful
        """
        print(f"\n[ROLLBACK] Processing optimization {optimization_id}")
        
        # Load optimization
        optimization = self._load_optimization(optimization_id)
        if not optimization:
            print(f"[ERROR] Optimization not found")
            return False
        
        if optimization.get('rolled_back'):
            print(f"[ERROR] Already rolled back")
            return False
        
        slug = optimization['existing_slug']
        backup_path = optimization.get('content_backup_path')
        
        if not backup_path or not backup_path.startswith('git:'):
            print(f"[ERROR] No git backup found")
            return False
        
        commit_hash = backup_path.replace('git:', '')
        
        # Find blog file
        blog_file_path = self._find_blog_file(slug)
        if not blog_file_path:
            print(f"[ERROR] Blog file not found")
            return False
        
        # Restore from git
        rollback_commit = self._restore_from_git(blog_file_path, commit_hash, optimization_id)
        
        if not rollback_commit:
            print(f"[ERROR] Failed to restore from git")
            return False
        
        # Update optimization record
        self._update_optimization(optimization_id, {
            'rolled_back': True,
            'rolled_back_at': datetime.now().isoformat(),
            'rollback_reason': reason,
            'status': 'completed',
            'impact_notes': f'Rolled back: {reason}',
        })
        
        # Decrement optimization count
        self._decrement_optimization_count(slug)
        
        print(f"[OK] Rollback complete")
        print(f"  Restored from: {commit_hash[:8]}")
        print(f"  Rollback commit: {rollback_commit[:8]}")
        
        return True
    
    def _generate_expansion(self, existing_content: str, optimization: Dict) -> Optional[str]:
        """Generate new sections using Claude."""
        system_prompt = """You are a content expansion specialist for UK financial services blogs.

Your task: Generate NEW sections to ADD to an existing blog post.

CRITICAL RULES:
1. DO NOT modify or rewrite existing content
2. Generate ONLY the NEW sections requested
3. Match the tone, style, and depth of the existing content exactly
4. Naturally incorporate target keywords (no keyword stuffing)
5. Add internal links where relevant
6. Use UK English spelling and terminology
7. Provide actionable, accurate information
8. Use proper markdown formatting (H2, H3, paragraphs, lists)

OUTPUT FORMAT:
Return ONLY the new sections in markdown format.
Start each section with ## or ### heading.
Do NOT include frontmatter or metadata.
"""
        
        suggested_sections = optimization.get('suggested_sections', [])
        if isinstance(suggested_sections, str):
            suggested_sections = json.loads(suggested_sections)
        
        user_prompt = f"""
EXISTING BLOG POST:
{existing_content}

OPTIMIZATION TASK:
{optimization['recommended_action']}

TARGET KEYWORDS TO INCORPORATE NATURALLY:
{', '.join(optimization.get('target_keywords', []))}

SECTIONS TO ADD:
{json.dumps(suggested_sections, indent=2)}

Generate the new sections following the existing post's structure, tone, and depth.
Return ONLY the new sections (markdown format) with clear H2/H3 headings.
"""
        
        try:
            message = self.claude.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
            
            expansion = message.content[0].text
            print(f"[OK] Generated {len(expansion)} characters of new content")
            return expansion
        
        except Exception as e:
            print(f"[ERROR] Claude generation failed: {e}")
            return None
    
    def _insert_sections(self, existing_content: str, expansion: str, optimization: Dict) -> str:
        """
        Insert new sections into existing content.
        
        Strategy: Add new sections at the end, before any FAQs or conclusion.
        """
        # Add optimization marker comment
        marker = f"\n\n<!-- Optimization {optimization['id'][:8]} - {datetime.now().strftime('%Y-%m-%d')} -->\n\n"
        
        # Simple strategy: append before closing content
        # TODO: Could be smarter about insertion point
        
        updated_content = existing_content.rstrip() + marker + expansion + "\n"
        
        return updated_content
    
    def _backup_content(self, file_path: str, optimization_id: str) -> Optional[str]:
        """Create git commit of current content BEFORE optimization."""
        try:
            # Stage the file
            subprocess.run(['git', 'add', file_path], check=True, capture_output=True)
            
            # Commit
            commit_msg = f"[BACKUP] Before optimization {optimization_id[:8]}"
            result = subprocess.run(
                ['git', 'commit', '-m', commit_msg],
                check=True,
                capture_output=True,
                text=True
            )
            
            # Get commit hash
            hash_result = subprocess.run(
                ['git', 'rev-parse', 'HEAD'],
                check=True,
                capture_output=True,
                text=True
            )
            commit_hash = hash_result.stdout.strip()
            
            # Create tag
            tag_name = f"optimization-{optimization_id[:8]}-backup"
            subprocess.run(['git', 'tag', tag_name, commit_hash], check=True, capture_output=True)
            
            print(f"[BACKUP] Created at {commit_hash[:8]} (tag: {tag_name})")
            return commit_hash
        
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Git backup failed: {e}")
            return None
    
    def _commit_optimization(self, file_path: str, optimization_id: str) -> Optional[str]:
        """Commit the optimization changes."""
        try:
            subprocess.run(['git', 'add', file_path], check=True, capture_output=True)
            
            commit_msg = f"[OPTIMIZATION] {optimization_id[:8]} - Section expansion"
            result = subprocess.run(
                ['git', 'commit', '-m', commit_msg],
                check=True,
                capture_output=True,
                text=True
            )
            
            hash_result = subprocess.run(
                ['git', 'rev-parse', 'HEAD'],
                check=True,
                capture_output=True,
                text=True
            )
            commit_hash = hash_result.stdout.strip()
            
            tag_name = f"optimization-{optimization_id[:8]}"
            subprocess.run(['git', 'tag', tag_name, commit_hash], check=True, capture_output=True)
            
            print(f"[COMMIT] Created at {commit_hash[:8]} (tag: {tag_name})")
            return commit_hash
        
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Git commit failed: {e}")
            return None
    
    def _restore_from_git(self, file_path: str, backup_commit: str, optimization_id: str) -> Optional[str]:
        """Restore content from backup commit."""
        try:
            # Checkout file from backup commit
            subprocess.run(
                ['git', 'checkout', backup_commit, '--', file_path],
                check=True,
                capture_output=True
            )
            
            # Commit the rollback
            subprocess.run(['git', 'add', file_path], check=True, capture_output=True)
            
            commit_msg = f"[ROLLBACK] Restore {optimization_id[:8]} from {backup_commit[:8]}"
            subprocess.run(['git', 'commit', '-m', commit_msg], check=True, capture_output=True)
            
            hash_result = subprocess.run(
                ['git', 'rev-parse', 'HEAD'],
                check=True,
                capture_output=True,
                text=True
            )
            rollback_hash = hash_result.stdout.strip()
            
            print(f"[ROLLBACK] Restored from {backup_commit[:8]}")
            return rollback_hash
        
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Git restore failed: {e}")
            return None
    
    def _find_blog_file(self, slug: str) -> Optional[str]:
        """Find blog post markdown file by slug."""
        content_dir = self.config['content_dir']
        potential_path = os.path.join(content_dir, f"{slug}.md")
        
        if os.path.exists(potential_path):
            return potential_path
        
        # Try searching
        try:
            for root, dirs, files in os.walk(content_dir):
                for file in files:
                    if file == f"{slug}.md":
                        return os.path.join(root, file)
        except:
            pass
        
        return None
    
    def _read_file(self, file_path: str) -> str:
        """Read file content."""
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _write_file(self, file_path: str, content: str):
        """Write file content."""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    def _load_optimization(self, optimization_id: str) -> Optional[Dict]:
        """Load optimization from Supabase."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {"id": f"eq.{optimization_id}"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            return data[0] if data else None
        except Exception as e:
            print(f"[ERROR] Failed to load optimization: {e}")
            return None
    
    def _update_optimization(self, optimization_id: str, update_data: Dict):
        """Update optimization in Supabase."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
        
        params = {"id": f"eq.{optimization_id}"}
        
        try:
            response = httpx.patch(url, headers=headers, params=params, json=update_data, timeout=10.0)
            response.raise_for_status()
        except Exception as e:
            print(f"[ERROR] Failed to update optimization: {e}")
    
    def _increment_optimization_count(self, slug: str):
        """Increment optimization count for blog topic."""
        table_name = self.config['blog_topics_table']
        url = f"{SUPABASE_URL}/rest/v1/{table_name}"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
        
        # Find topic by slug
        params = {"slug": f"eq.{slug}"}
        
        try:
            # Get current count
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            
            if data:
                current_count = data[0].get('optimization_count', 0)
                
                # Update
                update_data = {
                    'optimization_count': current_count + 1,
                    'last_optimized_at': datetime.now().isoformat(),
                }
                
                response = httpx.patch(url, headers=headers, params=params, json=update_data, timeout=10.0)
                response.raise_for_status()
        
        except Exception as e:
            print(f"[ERROR] Failed to update blog topic: {e}")
    
    def _decrement_optimization_count(self, slug: str):
        """Decrement optimization count (after rollback)."""
        table_name = self.config['blog_topics_table']
        url = f"{SUPABASE_URL}/rest/v1/{table_name}"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
        
        params = {"slug": f"eq.{slug}"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            
            if data:
                current_count = data[0].get('optimization_count', 0)
                
                update_data = {
                    'optimization_count': max(0, current_count - 1),
                }
                
                response = httpx.patch(url, headers=headers, params=params, json=update_data, timeout=10.0)
                response.raise_for_status()
        
        except Exception as e:
            print(f"[ERROR] Failed to update blog topic: {e}")


def main():
    """Test the content expander."""
    import sys
    
    if len(sys.argv) > 2:
        niche = sys.argv[1]
        optimization_id = sys.argv[2]
    else:
        print("Usage: python content_expander.py <niche> <optimization_id>")
        return
    
    print("=" * 80)
    print(f"CONTENT EXPANDER TEST - {niche.upper()}")
    print("=" * 80)
    
    expander = ContentExpander(niche)
    success = expander.expand_section(optimization_id)
    
    print("\n" + "=" * 80)
    print(f"[{'SUCCESS' if success else 'FAILED'}]")
    print("=" * 80)


if __name__ == "__main__":
    main()
