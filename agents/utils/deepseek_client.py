"""
DeepSeek API Client - OpenAI-compatible wrapper for DeepSeek v3.
Optimized for structured output and creative content generation.
"""
from openai import OpenAI
from typing import List, Dict, Optional, Union
import json


class DeepSeekClient:
    """
    DeepSeek API client using OpenAI SDK.
    
    Cost: $0.14/M input tokens, $0.28/M output tokens
    Model: deepseek-chat (DeepSeek-V3.2, 128K context)
    """
    
    def __init__(self, api_key: str = None):
        import os
        
        if api_key is None:
            api_key = os.getenv('OPENAI_API_KEY') or os.getenv('DEEPSEEK_API_KEY')
        
        if not api_key:
            raise ValueError("DeepSeek API key not provided. Set OPENAI_API_KEY or DEEPSEEK_API_KEY in .env")
        
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com",
            timeout=120.0,  # 2 minute timeout for large requests
            max_retries=2
        )
        self.model = "deepseek-chat"
    
    def generate_structured(self, 
                          prompt: str, 
                          system: Optional[str] = None,
                          temperature: float = 0.3,
                          max_tokens: int = 6000,
                          response_format: Optional[Dict] = None) -> Union[str, Dict]:
        """
        Generate structured output (JSON, configs, data).
        
        Best for:
        - Config generation
        - Keyword analysis
        - Database migrations
        - Structured data
        
        Parameters:
        - temperature: 0.1-0.3 (deterministic)
        - max_tokens: 8000 (large structured output)
        """
        
        messages = []
        
        if system:
            messages.append({"role": "system", "content": system})
        
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.9
            )
            
            content = response.choices[0].message.content
            
            # If response_format provided, parse JSON
            if response_format:
                try:
                    # Try to extract JSON from markdown code blocks
                    if '```json' in content:
                        json_start = content.find('```json') + 7
                        json_end = content.find('```', json_start)
                        content = content[json_start:json_end].strip()
                    elif '```' in content:
                        json_start = content.find('```') + 3
                        json_end = content.find('```', json_start)
                        content = content[json_start:json_end].strip()
                    
                    return json.loads(content)
                except json.JSONDecodeError as e:
                    print(f"[WARNING] Failed to parse JSON response: {e}")
                    print(f"Raw response: {content[:500]}...")
                    return content
            
            return content
        
        except Exception as e:
            print(f"\nERROR in generate_structured: {e}")
            print(f"Prompt length: {len(prompt)} chars")
            print(f"Max tokens: {max_tokens}")
            raise
    
    def generate(self,
                prompt: str,
                system: Optional[str] = None,
                temperature: float = 0.7,
                max_tokens: int = 2048) -> str:
        """
        Simple generation method (for testing and basic use).
        
        Args:
            prompt: User prompt
            system: Optional system prompt
            temperature: 0.0-1.0
            max_tokens: Max response tokens
        
        Returns:
            str: Generated text
        """
        messages = []
        
        if system:
            messages.append({"role": "system", "content": system})
        
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            
            return response.choices[0].message.content
        
        except Exception as e:
            print(f"\nERROR in generate: {e}")
            raise
    
    def generate_creative(self,
                         prompt: str,
                         system: Optional[str] = None,
                         temperature: float = 0.8,
                         max_tokens: int = 4096) -> str:
        """
        Generate creative content (pages, blog posts, copy).
        
        Best for:
        - Homepage generation
        - Blog posts
        - Marketing copy
        - Page content
        
        Parameters:
        - temperature: 0.7-0.9 (more creative)
        - max_tokens: 4096 (typical page length)
        """
        
        messages = []
        
        if system:
            messages.append({"role": "system", "content": system})
        
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.95
            )
            
            return response.choices[0].message.content
        
        except Exception as e:
            print(f"\nERROR in generate_creative: {e}")
            print(f"Prompt length: {len(prompt)} chars")
            print(f"Max tokens: {max_tokens}")
            raise
    
    def generate_with_refinement(self,
                                prompt: str,
                                system: Optional[str] = None,
                                temperature: float = 0.8,
                                max_tokens: int = 4096) -> str:
        """
        Two-pass generation for critical content.
        
        Pass 1: Generate draft
        Pass 2: Self-critique and refine
        
        Cost: 2x API calls but still 7.5x cheaper than Claude
        Quality: Approaches Claude quality through iteration
        """
        
        # Pass 1: Generate draft
        draft = self.generate_creative(prompt, system, temperature, max_tokens)
        
        # Pass 2: Refine with quality checklist
        refinement_prompt = f"""Review and improve this generated content:

ORIGINAL CONTENT:
{draft}

QUALITY CHECKLIST:
1. SEO: Is the target keyword used naturally?
2. UK English: Check spelling (specialise, optimise, organisation)
3. Professional tone: Remove hype, be specific and trustworthy
4. Clarity: Is it clear and jargon-free?
5. Structure: Are headings, paragraphs well-organized?
6. CTAs: Are calls-to-action clear and compelling?

TASK: Rewrite the content addressing any issues from the checklist.
Return ONLY the improved version (same format as original).
"""
        
        refined = self.generate_creative(refinement_prompt, system, temperature, max_tokens)
        
        return refined
    
    def test_connection(self) -> bool:
        """Test API connection and credentials."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": "Hello"}],
                max_tokens=10
            )
            
            return bool(response.choices[0].message.content)
        
        except Exception as e:
            print(f"DeepSeek API connection failed: {e}")
            return False


def main():
    """Test DeepSeek client."""
    import os
    
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        print("ERROR: DEEPSEEK_API_KEY not set")
        return
    
    client = DeepSeekClient(api_key)
    
    # Test connection
    print("Testing DeepSeek API connection...")
    if client.test_connection():
        print("[OK] DeepSeek API connected successfully")
    else:
        print("[FAILED] DeepSeek API connection failed")
        return
    
    # Test structured generation
    print("\nTesting structured generation...")
    result = client.generate_structured(
        prompt='Generate a JSON object with fields: name, age, city. Use example data.',
        temperature=0.2
    )
    print(f"Result: {result[:200]}...")
    
    # Test creative generation
    print("\nTesting creative generation...")
    result = client.generate_creative(
        prompt='Write a professional tagline for a medical accounting firm in the UK (max 10 words).',
        temperature=0.8
    )
    print(f"Result: {result}")
    
    print("\n[SUCCESS] All tests passed")


if __name__ == "__main__":
    main()
