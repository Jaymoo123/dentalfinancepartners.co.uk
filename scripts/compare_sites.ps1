# Compare Dentists vs Property Sites
# This script checks both sites and highlights differences

Write-Host "=== DENTAL VS PROPERTY SITE COMPARISON ===" -ForegroundColor Cyan
Write-Host ""

# Function to compare outputs
function Compare-Output {
    param($Label, $Dental, $Property)
    
    Write-Host "--- $Label ---" -ForegroundColor Yellow
    
    if ($Dental -eq $Property) {
        Write-Host "✅ IDENTICAL" -ForegroundColor Green
    } else {
        Write-Host "🔴 DIFFERENT!" -ForegroundColor Red
        Write-Host ""
        Write-Host "DENTISTS:" -ForegroundColor Magenta
        Write-Host $Dental
        Write-Host ""
        Write-Host "PROPERTY:" -ForegroundColor Magenta
        Write-Host $Property
    }
    Write-Host ""
}

# 1. Check robots.txt
Write-Host "1. Checking robots.txt..." -ForegroundColor Cyan
try {
    $dentalRobots = Invoke-WebRequest -Uri "https://www.dentalfinancepartners.co.uk/robots.txt" -UseBasicParsing -ErrorAction Stop
    $dentalRobotsContent = $dentalRobots.Content
} catch {
    $dentalRobotsContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

try {
    $propertyRobots = Invoke-WebRequest -Uri "https://www.propertytaxpartners.co.uk/robots.txt" -UseBasicParsing -ErrorAction Stop
    $propertyRobotsContent = $propertyRobots.Content
} catch {
    $propertyRobotsContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

Compare-Output "robots.txt" $dentalRobotsContent $propertyRobotsContent

# 2. Check verification files
Write-Host "2. Checking Google verification files..." -ForegroundColor Cyan
try {
    $dentalVerif = Invoke-WebRequest -Uri "https://www.dentalfinancepartners.co.uk/google9b5077d68a9d0d70.html" -UseBasicParsing -ErrorAction Stop
    $dentalVerifContent = $dentalVerif.Content
} catch {
    $dentalVerifContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

try {
    $propertyVerif = Invoke-WebRequest -Uri "https://www.propertytaxpartners.co.uk/google9b5077d68a9d0d70.html" -UseBasicParsing -ErrorAction Stop
    $propertyVerifContent = $propertyVerif.Content
} catch {
    $propertyVerifContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

Compare-Output "Verification File (google9b5077d68a9d0d70.html)" $dentalVerifContent $propertyVerifContent

# 3. Check sitemap (first 1000 chars)
Write-Host "3. Checking sitemap.xml (first 1000 chars)..." -ForegroundColor Cyan
try {
    $dentalSitemap = Invoke-WebRequest -Uri "https://www.dentalfinancepartners.co.uk/sitemap.xml" -UseBasicParsing -ErrorAction Stop
    $dentalSitemapContent = $dentalSitemap.Content.Substring(0, [Math]::Min(1000, $dentalSitemap.Content.Length))
} catch {
    $dentalSitemapContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

try {
    $propertySitemap = Invoke-WebRequest -Uri "https://www.propertytaxpartners.co.uk/sitemap.xml" -UseBasicParsing -ErrorAction Stop
    $propertySitemapContent = $propertySitemap.Content.Substring(0, [Math]::Min(1000, $propertySitemap.Content.Length))
} catch {
    $propertySitemapContent = "ERROR: Could not fetch - $($_.Exception.Message)"
}

Write-Host "--- Sitemap Preview ---" -ForegroundColor Yellow
Write-Host "DENTISTS (first 1000 chars):" -ForegroundColor Magenta
Write-Host $dentalSitemapContent
Write-Host ""
Write-Host "PROPERTY (first 1000 chars):" -ForegroundColor Magenta
Write-Host $propertySitemapContent
Write-Host ""

# 4. Check homepage meta tags
Write-Host "4. Checking homepage meta tags..." -ForegroundColor Cyan
try {
    $dentalHome = Invoke-WebRequest -Uri "https://www.dentalfinancepartners.co.uk/" -UseBasicParsing -ErrorAction Stop
    $dentalMetaVerification = if ($dentalHome.Content -match 'google-site-verification.*?content="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
    $dentalCanonical = if ($dentalHome.Content -match '<link rel="canonical" href="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
    $dentalOgUrl = if ($dentalHome.Content -match '<meta property="og:url" content="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
} catch {
    $dentalMetaVerification = "ERROR: $($_.Exception.Message)"
    $dentalCanonical = "ERROR"
    $dentalOgUrl = "ERROR"
}

try {
    $propertyHome = Invoke-WebRequest -Uri "https://www.propertytaxpartners.co.uk/" -UseBasicParsing -ErrorAction Stop
    $propertyMetaVerification = if ($propertyHome.Content -match 'google-site-verification.*?content="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
    $propertyCanonical = if ($propertyHome.Content -match '<link rel="canonical" href="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
    $propertyOgUrl = if ($propertyHome.Content -match '<meta property="og:url" content="([^"]+)"') { $matches[1] } else { "NOT FOUND" }
} catch {
    $propertyMetaVerification = "ERROR: $($_.Exception.Message)"
    $propertyCanonical = "ERROR"
    $propertyOgUrl = "ERROR"
}

Compare-Output "Google Site Verification Meta Tag" $dentalMetaVerification $propertyMetaVerification
Compare-Output "Canonical URL" $dentalCanonical $propertyCanonical
Compare-Output "Open Graph URL" $dentalOgUrl $propertyOgUrl

# 5. Check HTTP status codes
Write-Host "5. Checking HTTP status codes..." -ForegroundColor Cyan
$dentalStatus = try { (Invoke-WebRequest -Uri "https://www.dentalfinancepartners.co.uk/" -UseBasicParsing -ErrorAction Stop).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }
$propertyStatus = try { (Invoke-WebRequest -Uri "https://www.propertytaxpartners.co.uk/" -UseBasicParsing -ErrorAction Stop).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }

Compare-Output "Homepage HTTP Status" $dentalStatus $propertyStatus

# 6. Check SSL certificates
Write-Host "6. Checking SSL certificates..." -ForegroundColor Cyan
$dentalSSL = try { 
    $req = [System.Net.WebRequest]::Create("https://www.dentalfinancepartners.co.uk/")
    $req.GetResponse() | Out-Null
    "✅ Valid SSL"
} catch { 
    "❌ SSL Error: $($_.Exception.Message)" 
}

$propertySSL = try { 
    $req = [System.Net.WebRequest]::Create("https://www.propertytaxpartners.co.uk/")
    $req.GetResponse() | Out-Null
    "✅ Valid SSL"
} catch { 
    "❌ SSL Error: $($_.Exception.Message)" 
}

Compare-Output "SSL Certificate" $dentalSSL $propertySSL

# 7. Compare niche.config.json files
Write-Host "7. Comparing niche.config.json files..." -ForegroundColor Cyan
$dentalConfig = Get-Content "Dentists\niche.config.json" -Raw | ConvertFrom-Json
$propertyConfig = Get-Content "Property\niche.config.json" -Raw | ConvertFrom-Json

Write-Host "--- Key Configuration Values ---" -ForegroundColor Yellow
Write-Host ""
Write-Host "Domain:" -ForegroundColor Magenta
Write-Host "  Dentists:  $($dentalConfig.domain)"
Write-Host "  Property:  $($propertyConfig.domain)"
Write-Host ""
Write-Host "Google Analytics ID:" -ForegroundColor Magenta
Write-Host "  Dentists:  $($dentalConfig.seo.google_analytics_id)"
Write-Host "  Property:  $($propertyConfig.seo.google_analytics_id)"
Write-Host ""
Write-Host "Google Site Verification:" -ForegroundColor Magenta
Write-Host "  Dentists:  $($dentalConfig.seo.google_site_verification)"
Write-Host "  Property:  $($propertyConfig.seo.google_site_verification)"
Write-Host ""
Write-Host "Contact Email:" -ForegroundColor Magenta
Write-Host "  Dentists:  $($dentalConfig.contact.email)"
Write-Host "  Property:  $($propertyConfig.contact.email)"
Write-Host ""
Write-Host "Contact Phone:" -ForegroundColor Magenta
Write-Host "  Dentists:  $($dentalConfig.contact.phone)"
Write-Host "  Property:  $($propertyConfig.contact.phone)"
Write-Host ""

# 8. Check blog post counts
Write-Host "8. Checking blog post counts..." -ForegroundColor Cyan
$dentalPosts = (Get-ChildItem "Dentists\web\content\blog\*.md" -ErrorAction SilentlyContinue).Count
$propertyPosts = (Get-ChildItem "Property\web\content\blog\*.md" -ErrorAction SilentlyContinue).Count

Write-Host "--- Blog Post Counts ---" -ForegroundColor Yellow
Write-Host "  Dentists:  $dentalPosts posts"
Write-Host "  Property:  $propertyPosts posts"
Write-Host ""

# Summary
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔍 KEY FINDINGS:" -ForegroundColor Yellow
Write-Host ""

if ($dentalRobotsContent -ne $propertyRobotsContent) {
    Write-Host "🔴 robots.txt files are DIFFERENT" -ForegroundColor Red
}

if ($dentalVerifContent -eq $propertyVerifContent -and $dentalVerifContent -ne "ERROR: Could not fetch") {
    Write-Host "🔴 CRITICAL: Both sites use the SAME verification file!" -ForegroundColor Red
    Write-Host "   Each site needs its own unique verification file." -ForegroundColor Red
}

if ($dentalConfig.seo.google_site_verification -eq $propertyConfig.seo.google_site_verification) {
    Write-Host "🔴 CRITICAL: Both niche configs have the SAME verification code!" -ForegroundColor Red
}

if ($dentalStatus -ne 200) {
    Write-Host "🔴 CRITICAL: Dentists site returned HTTP $dentalStatus (not 200 OK)" -ForegroundColor Red
}

if ($propertyStatus -ne 200) {
    Write-Host "🔴 CRITICAL: Property site returned HTTP $propertyStatus (not 200 OK)" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Check complete! Review the differences above." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review DENTAL_QUICK_CHECKLIST.md for action items"
Write-Host "2. Check Google Search Console verification status"
Write-Host "3. Check Vercel dashboard for both projects"
Write-Host ""
