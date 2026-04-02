import re
import uuid
import requests
import os
import sys
import random

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config

# Import rate limit tracker
try:
    from rate_limit_tracker import track_request, check_rate_limit, print_status
except ImportError:
    # Fallback if tracker not available
    def track_request():
        pass
    def check_rate_limit():
        return True, 0
    def print_status():
        pass

# === HELPERS ===

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def get_random_fallback_image():
    """Get a random fallback image from the pool"""
    if hasattr(config, 'FALLBACK_IMAGE_POOL') and config.FALLBACK_IMAGE_POOL:
        return random.choice(config.FALLBACK_IMAGE_POOL)
    return config.FALLBACK_IMAGE_URL

def generate_profession_specific_alt_tag(title: str) -> str:
    """Generate a profession-specific alt tag based on the content"""
    
    title_lower = title.lower()
    
    # Extract profession-specific alt tags
    if "fashion retailer" in title_lower or ("fashion" in title_lower and "retail" in title_lower):
        return "Fashion retail store environment with modern point of sale systems and stylish boutique setting"
    elif "property developer" in title_lower:
        return "Property development site with construction plans and real estate investment documentation"
    elif "landscaper" in title_lower or "gardener" in title_lower:
        return "Professional landscaper working outdoors with garden design tools and plants"
    elif "carpenter" in title_lower or "joiner" in title_lower:
        return "Carpenter in workshop with woodworking tools and timber materials"
    elif "plumber" in title_lower:
        return "Professional plumber working with pipes and plumbing equipment on site"
    elif "electrician" in title_lower:
        return "Electrician working with electrical panels and safety equipment"
    elif "influencer" in title_lower:
        return "Social media influencer creating content with ring light and smartphone setup"
    elif "consultant" in title_lower:
        return "Business consultant presenting to clients with charts and professional meeting setup"
    elif "photographer" in title_lower:
        return "Professional photographer with camera equipment in studio setting"
    elif "videographer" in title_lower:
        return "Videographer filming with professional camera and production equipment"
    elif "restaurant" in title_lower or "cafe" in title_lower:
        return "Restaurant kitchen and dining area with chef and service staff"
    elif "gym" in title_lower or "fitness" in title_lower:
        return "Modern gym facility with fitness equipment and personal trainers"
    elif "beauty salon" in title_lower or "salon" in title_lower or "hairdresser" in title_lower:
        return "Beauty salon interior with styling chairs and cosmetic products"
    elif "hotel" in title_lower or "hospitality" in title_lower:
        return "Hotel reception area with professional hospitality staff and elegant lobby"
    elif "doctor" in title_lower or "gp" in title_lower or "physician" in title_lower:
        return "Medical doctor in consultation room with stethoscope and medical equipment"
    elif "dentist" in title_lower or "dental" in title_lower:
        return "Dental clinic with modern equipment and professional dental care setting"
    elif "developer" in title_lower and ("software" in title_lower or "web" in title_lower or "app" in title_lower):
        return "Software developer coding on computer with multiple monitors in tech office"
    elif "designer" in title_lower:
        return "Creative designer working with digital tools and design software"
    elif "architect" in title_lower:
        return "Architect working with blueprints and building design plans"
    elif "engineer" in title_lower:
        return "Engineer working with technical drawings and equipment"
    elif "lawyer" in title_lower or "solicitor" in title_lower:
        return "Legal professional in law office with legal documents and books"
    elif "accountant" in title_lower:
        return "Professional accountant working with financial documents and spreadsheets"
    elif "teacher" in title_lower or "educator" in title_lower:
        return "Teacher in classroom environment with educational materials"
    elif "nurse" in title_lower or "nursing" in title_lower:
        return "Healthcare nurse in medical facility providing patient care"
    elif "pharmacy" in title_lower or "pharmacist" in title_lower:
        return "Pharmacist in modern pharmacy with medicines and prescriptions"
    elif "retail" in title_lower or "shop" in title_lower or "store" in title_lower:
        return "Retail store interior with products and customer service area"
    elif "freelance" in title_lower:
        return "Freelancer working in home office with laptop and professional setup"
    elif "startup" in title_lower:
        return "Startup team collaborating in modern office environment"
    elif "manufacturer" in title_lower or "manufacturing" in title_lower:
        return "Manufacturing facility with production equipment and quality control"
    elif "logistics" in title_lower or "delivery" in title_lower:
        return "Logistics warehouse with shipping and distribution operations"
    elif "marketing" in title_lower:
        return "Marketing team working on digital campaigns and strategy"
    elif "bookkeeping" in title_lower:
        return "Professional bookkeeping services with organized financial records"
    elif "payroll" in title_lower:
        return "Payroll processing and employee payment management systems"
    elif "tax" in title_lower or "hmrc" in title_lower:
        return "Tax preparation and HMRC compliance documentation"
    elif "vat" in title_lower:
        return "VAT calculations and business tax documentation"
    elif "invoice" in title_lower or "billing" in title_lower:
        return "Business invoicing and billing management systems"
    elif "expense" in title_lower:
        return "Business expense tracking and financial record keeping"
    else:
        # Generic business fallback
        return "Professional UK business environment with modern office setting"

# === UNSPLASH IMAGE FETCHER ===

def generate_image_with_alt_tag(row_data, parsed_parts=None):
    """
    Generate an image and appropriate alt tag for the blog post.
    Returns a dictionary with 'url' and 'alt_tag' keys.
    """
    topic = row_data.get("Blog Topic", "Business Accounting")
    
    # Generate the image URL
    image_url = generate_image_from_row(row_data, parsed_parts)
    
    # Generate profession-specific alt tag
    alt_tag = generate_profession_specific_alt_tag(topic)
    
    return {
        'url': image_url,
        'alt_tag': alt_tag
    }

def generate_image_from_row(row_data, parsed_parts=None):
    """
    Fetch professional stock images from Unsplash only.
    No AI generation - only real stock photography.
    Returns just the image URL for backward compatibility.
    """
    try:
        topic = row_data.get("Blog Topic", "Business Accounting")
        slug = slugify(topic)

        print(f"[→] Fetching Unsplash image for: {topic}")

        # Check rate limit before making request
        can_request, wait_time = check_rate_limit()
        if not can_request:
            print(f"[⚠️] Rate limit reached. Would need to wait {wait_time:.0f}s. Using fallback image.")
            return get_random_fallback_image()

        # Check if Unsplash is properly configured
        if not config.UNSPLASH_ACCESS_KEY:
            print("[❌] Unsplash API key not configured. Using fallback image.")
            return get_random_fallback_image()

        # Extract the main subject from the topic for better search results
        subject = topic.lower()
        
        # Clean up common phrases to get to the core topic
        cleanup_phrases = [
            'what can', 'claim as', 'business expenses', 'expenses for', 
            'tax deductions', 'how to', 'guide to', 'understanding',
            'for uk', 'for small business'
        ]
        
        for phrase in cleanup_phrases:
            subject = subject.replace(phrase, '').strip()

        # Create highly specific search queries based on the actual topic
        # First, try to identify specific professions or business types
        if 'videographer' in subject:
            query = "videographer camera equipment filming studio professional"
        elif 'influencer' in subject:
            query = "social media influencer content creator smartphone ring light"
        elif 'content creator' in subject:
            query = "content creator video editing computer studio creative"
        elif 'consultant' in subject:
            query = "business consultant meeting presentation laptop charts"
        elif 'bookkeeping' in subject:
            query = "bookkeeping software computer accounting ledger office"
        elif 'event management' in subject:
            query = "event planning organizer venue decoration conference"
        elif any(trade in subject for trade in ['carpenter', 'joiner']):
            query = "carpenter woodworking tools workshop craftsmanship"
        elif 'plumber' in subject:
            query = "plumber plumbing pipes tools professional work"
        elif 'electrician' in subject:
            query = "electrician electrical wiring tools safety equipment"
        elif 'roofer' in subject:
            query = "roofer roofing construction tiles ladder safety"
        elif 'landscaper' in subject or 'gardener' in subject:
            query = "landscaping garden design plants outdoor professional"
        elif 'builder' in subject or 'construction' in subject:
            query = "construction builder site hard hat building"
        elif any(med in subject for med in ['doctor', 'gp', 'physician']):
            query = "doctor medical consultation stethoscope clinic"
        elif 'dentist' in subject:
            query = "dentist dental clinic teeth examination professional"
        elif 'pharmacy' in subject or 'pharmacist' in subject:
            query = "pharmacy pharmacist medicine prescription healthcare"
        elif 'nurse' in subject or 'nursing' in subject:
            query = "nurse healthcare medical hospital patient care"
        elif any(tech in subject for tech in ['developer', 'programmer']):
            query = "software developer coding computer programming laptop"
        elif 'designer' in subject:
            query = "graphic designer creative design tablet studio"
        elif 'photographer' in subject:
            query = "photographer camera lens studio portrait professional"
        elif any(prop in subject for prop in ['property', 'landlord']):
            query = "property real estate house keys investment"
        elif 'rental' in subject or 'letting' in subject:
            query = "rental property apartment keys tenant agreement"
        elif 'restaurant' in subject or 'cafe' in subject:
            query = "restaurant dining chef kitchen food service"
        elif 'retail' in subject or 'shop' in subject:
            query = "retail store shopping customer service boutique"
        elif 'gym' in subject or 'fitness' in subject:
            query = "gym fitness equipment workout trainer exercise"
        elif 'beauty' in subject or 'salon' in subject:
            query = "beauty salon hairdresser makeup cosmetics professional"
        elif 'lawyer' in subject or 'solicitor' in subject:
            query = "lawyer legal office law books courtroom professional"
        elif 'architect' in subject:
            query = "architect blueprint design drawing office construction"
        elif 'engineer' in subject:
            query = "engineer technical blueprint design machinery industrial"
        elif 'teacher' in subject or 'education' in subject:
            query = "teacher classroom education learning students school"
        elif 'freelance' in subject:
            query = "freelancer home office laptop coffee remote work"
        elif 'startup' in subject:
            query = "startup team brainstorming whiteboard office innovation"
        elif 'ecommerce' in subject or 'online' in subject:
            query = "ecommerce online shopping laptop packages delivery"
        elif 'manufacturing' in subject:
            query = "manufacturing factory production line industrial machinery"
        elif 'logistics' in subject or 'delivery' in subject:
            query = "logistics warehouse delivery trucks shipping boxes"
        elif 'hotel' in subject or 'hospitality' in subject:
            query = "hotel hospitality reception lobby service professional"
        elif 'travel' in subject or 'tourism' in subject:
            query = "travel agency tourism vacation planning destination"
        elif 'marketing' in subject:
            query = "marketing digital advertising campaign strategy team"
        elif 'hr' in subject or 'recruitment' in subject:
            query = "human resources recruitment interview hiring office"
        elif 'insurance' in subject:
            query = "insurance broker policy documents protection office"
        elif 'investment' in subject or 'financial advisor' in subject:
            query = "financial advisor investment portfolio charts meeting"
        elif 'pension' in subject:
            query = "retirement pension planning documents calculator office"
        elif 'payroll' in subject:
            query = "payroll processing salary spreadsheet computer office"
        elif 'vat' in subject:
            query = "vat tax invoice receipt accounting paperwork"
        elif 'corporation tax' in subject:
            query = "business tax corporate documents hmrc filing"
        elif 'self assessment' in subject:
            query = "self assessment tax return form hmrc deadline"
        elif 'tax' in subject:
            query = "tax accounting hmrc documents filing deadline"
        elif 'invoice' in subject or 'billing' in subject:
            query = "invoice billing paperwork payment business office"
        elif 'expense' in subject or 'receipt' in subject:
            query = "business expense receipts folder organization filing"
        elif 'accounting' in subject:
            query = "accounting office spreadsheet finance charts graphs"
        elif 'business' in subject:
            query = "business meeting professional team office discussion"
        else:
            # Default to general business imagery without calculator
            query = "business professional office meeting team work"
        
        # Search parameters optimized for professional images
        params = {
            "query": query, 
            "orientation": "landscape", 
            "per_page": 10,  # Get more options to choose from
            "content_filter": "high", 
            "order_by": "relevant"
        }
        
        headers = {"Authorization": f"Client-ID {config.UNSPLASH_ACCESS_KEY}"}
        
        try:
            resp = requests.get("https://api.unsplash.com/search/photos", 
                              params=params, headers=headers, timeout=20)
            
            # Track the API request
            track_request()
            
            if resp.status_code == 200:
                results = resp.json().get("results", [])
                
                if not results:
                    print(f"[⚠️] No Unsplash results for '{query}'. Trying generic business backup...")
                    # Try a generic business backup with people
                    backup_params = {
                        "query": "business meeting team professionals office people working",
                        "orientation": "landscape",
                        "per_page": 5,
                        "content_filter": "high",
                        "order_by": "relevant"
                    }
                    backup_resp = requests.get("https://api.unsplash.com/search/photos", 
                                             params=backup_params, headers=headers, timeout=20)
                    if backup_resp.status_code == 200:
                        backup_results = backup_resp.json().get("results", [])
                        if backup_results:
                            backup_photo = backup_results[0]
                            backup_url = (backup_photo.get("urls", {}).get("regular") or 
                                        backup_photo.get("urls", {}).get("full") or
                                        backup_photo.get("urls", {}).get("raw"))
                            if backup_url:
                                print(f"[✅] Using generic business backup image: {backup_url}")
                                return backup_url
                    
                    print(f"[⚠️] No backup results either. Using fallback image.")
                    return get_random_fallback_image()
                
                # Find the best quality, professional-looking image
                best_photo = None
                
                for photo in results:
                    # Prefer color photos over black and white
                    if not photo.get("black_and_white", False):
                        # Check if image has good quality indicators
                        if photo.get("likes", 0) > 10 or photo.get("downloads", 0) > 100:
                            best_photo = photo
                            break
                
                # Fallback to first photo if no preferred photos found
                if not best_photo:
                    best_photo = results[0]
                
                # Get the image URL (prefer 'regular' size for web use)
                img_url = (best_photo.get("urls", {}).get("regular") or 
                          best_photo.get("urls", {}).get("full") or
                          best_photo.get("urls", {}).get("raw"))
                
                if img_url:
                    # Download the image
                    img_res = requests.get(img_url, timeout=30)
                    if img_res.status_code == 200:
                        # Upload to Supabase for reliable hosting
                        supabase_filename = f"{slug}-{uuid.uuid4().hex[:8]}.jpg"
                        uploaded_url = upload_to_supabase_from_bytes(
                            img_res.content, supabase_filename, content_type="image/jpeg"
                        )
                        if uploaded_url and uploaded_url not in [config.FALLBACK_IMAGE_URL] + getattr(config, 'FALLBACK_IMAGE_POOL', []):
                            print(f"[✅] Unsplash image uploaded to Supabase: {uploaded_url}")
                            return uploaded_url
                        
                        # Fallback to direct Unsplash URL if Supabase upload fails
                        print(f"[⚠️] Supabase upload failed, using direct Unsplash URL: {img_url}")
                        return img_url
                    else:
                        print(f"[❌] Failed to download Unsplash image: {img_res.status_code}")
                else:
                    print("[❌] No valid image URL found in Unsplash response")
            else:
                print(f"[❌] Unsplash API error: {resp.status_code}")
                if resp.status_code == 403:
                    print("    Check your Unsplash API key and rate limits")
                elif resp.status_code == 401:
                    print("    Invalid Unsplash API key")
                
        except requests.exceptions.Timeout:
            print("[❌] Unsplash API timeout")
        except Exception as e:
            print(f"[❌] Unsplash request error: {e}")

        # If everything fails, use fallback
        print(f"[⚠️] Using fallback image for: {topic}")
        return get_random_fallback_image()

    except Exception as e:
        print(f"❌ Error during image fetching: {e}")
        return get_random_fallback_image()


def upload_to_supabase_from_bytes(image_bytes, supabase_filename, content_type="image/jpeg"):
    """
    Optional: Upload image to Supabase for self-hosting
    Currently disabled - using direct Unsplash URLs instead
    """
    try:
        if not hasattr(config, 'SUPABASE_URL') or not hasattr(config, 'SUPABASE_SERVICE_ROLE_KEY'):
            print("[ℹ️] Supabase not configured. Using direct URLs.")
            return None
            
        upload_url = f"{config.SUPABASE_URL}/storage/v1/object/{config.SUPABASE_BUCKET}/{supabase_filename}"
        headers = {
            "Authorization": f"Bearer {config.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": content_type,
            "x-upsert": "true"
        }
        res = requests.post(upload_url, headers=headers, data=image_bytes)
        if res.status_code in [200, 201]:
            return f"{config.SUPABASE_URL}/storage/v1/object/public/{config.SUPABASE_BUCKET}/{supabase_filename}"
        else:
            print(f"[❌] Supabase upload failed: {res.status_code}")
            return None
    except Exception as e:
        print(f"❌ Supabase upload error: {e}")
        return None