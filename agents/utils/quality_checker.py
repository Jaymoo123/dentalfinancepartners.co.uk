"""
Content quality validation system.
"""
import os
import re
import hashlib
from typing import List, NamedTuple
from agents.config.cost_limits import QUALITY_THRESHOLDS

class QualityResult(NamedTuple):
    passed: bool
    issues: List[str]
    metrics: dict

class QualityChecker:
    def __init__(self):
        self.thresholds = QUALITY_THRESHOLDS
    
    async def validate(self, content_path: str) -> QualityResult:
        """
        Validate content quality.
        Returns QualityResult with pass/fail and issues list.
        """
        if not os.path.exists(content_path):
            return QualityResult(False, ["File not found"], {})
        
        with open(content_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        issues = []
        metrics = {}
        
        # 1. Length check
        word_count = len(content.split())
        metrics["word_count"] = word_count
        if word_count < self.thresholds["min_word_count"]:
            issues.append(f"Too short: {word_count} words (min {self.thresholds['min_word_count']})")
        
        # 2. HTML structure check
        if not self._has_proper_html(content):
            issues.append("Missing proper HTML structure (needs <h2>, <p>, <ul>)")
        
        # 3. FAQ check
        faq_count = self._count_faqs(content)
        metrics["faq_count"] = faq_count
        if faq_count < 4:
            issues.append(f"Missing FAQs: found {faq_count}, need 4")
        
        # 4. Internal links check
        internal_link_count = self._count_internal_links(content)
        metrics["internal_links"] = internal_link_count
        if internal_link_count == 0:
            issues.append("No internal links found")
        
        # 5. Keyword density check
        keyword_density = self._calculate_keyword_density(content)
        metrics["keyword_density"] = keyword_density
        if keyword_density > self.thresholds["max_keyword_density"]:
            issues.append(f"Keyword stuffing: {keyword_density*100:.1f}% (max {self.thresholds['max_keyword_density']*100}%)")
        
        # 6. Front matter check
        if not self._has_valid_frontmatter(content):
            issues.append("Invalid or missing front matter")
        
        return QualityResult(
            passed=len(issues) == 0,
            issues=issues,
            metrics=metrics
        )
    
    def _has_proper_html(self, content: str) -> bool:
        """Check for proper HTML structure."""
        has_h2 = "<h2>" in content or "<h2 " in content
        has_p = "<p>" in content
        has_list = "<ul>" in content or "<ol>" in content
        return has_h2 and has_p and has_list
    
    def _count_faqs(self, content: str) -> int:
        """Count FAQ questions in front matter."""
        faq_matches = re.findall(r'question:', content)
        return len(faq_matches)
    
    def _count_internal_links(self, content: str) -> int:
        """Count internal links (relative URLs)."""
        internal_links = re.findall(r'href="(/[^"]+)"', content)
        return len(internal_links)
    
    def _calculate_keyword_density(self, content: str) -> float:
        """Calculate keyword density (simplified)."""
        # Extract main keyword from title/h1
        title_match = re.search(r'title: "([^"]+)"', content)
        if not title_match:
            return 0.0
        
        title = title_match.group(1).lower()
        main_keyword = title.split()[0:3]  # First 3 words as keyword phrase
        keyword_phrase = " ".join(main_keyword)
        
        # Count occurrences
        content_lower = content.lower()
        keyword_count = content_lower.count(keyword_phrase)
        total_words = len(content.split())
        
        return keyword_count / total_words if total_words > 0 else 0.0
    
    def _has_valid_frontmatter(self, content: str) -> bool:
        """Check for valid YAML front matter."""
        if not content.startswith("---"):
            return False
        
        required_fields = ["title:", "slug:", "metaTitle:", "metaDescription:"]
        return all(field in content for field in required_fields)
    
    @staticmethod
    def calculate_content_hash(content: str) -> str:
        """Calculate SHA256 hash of content for exact duplicate detection."""
        return hashlib.sha256(content.encode()).hexdigest()
