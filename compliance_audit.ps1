$files = @(
    "index.html",
    "about.html",
    "services.html",
    "pricing.html",
    "contact.html",
    "privacy-policy.html",
    "terms-and-conditions.html",
    "refund-and-cancellation-policy.html",
    "disclaimer.html",
    "404.html",
    "robots.txt",
    "sitemap.xml"
)

Write-Host "============================================="
Write-Host "    IMAX MEDIA COMPLIANCE & AUDIT CHECK"
Write-Host "============================================="

Write-Host "`n1. FILE EXISTENCE CHECK:"
$allFilesExist = $true
foreach ($f in $files) {
    $exists = Test-Path $f
    Write-Host " - $f : $exists"
    if (-not $exists) { $allFilesExist = $false }
}

Write-Host "`n2. HTML PAGES COMPLIANCE AUDIT:"
$htmlFiles = $files | Where-Object { $_.EndsWith(".html") }

foreach ($hf in $htmlFiles) {
    $content = Get-Content -Raw $hf
    Write-Host "`n--- Checking $hf ---"
    
    $hasTitle = $content -match '<title>(.*?)</title>'
    $title = if ($hasTitle) { $matches[1] } else { "MISSING" }
    Write-Host "  Title: $title"
    
    $hasCanonical = $content -match '<link rel="canonical" href="([^"]+)"'
    $canonical = if ($hasCanonical) { $matches[1] } else { "MISSING" }
    Write-Host "  Canonical: $canonical"

    $hasPhone = $content.Contains("9122675361")
    Write-Host "  Phone Number (+91 9122675361): $hasPhone"

    $hasEmail = $content.Contains("imaxmedia@gmail.com")
    Write-Host "  Email (imaxmedia@gmail.com): $hasEmail"

    $hasAddress = $content.Contains("Kishoreganj, Road No. 2") -and $content.Contains("Ranchi, Jharkhand")
    Write-Host "  Full Address (Ranchi, Jharkhand): $hasAddress"

    $hasSample = $content.Contains("[Sample Client]")
    Write-Host "  Contains '[Sample Client]' (Must be False): $hasSample"
}

Write-Host "`n3. TERMS & CONDITIONS 23 SECTIONS AUDIT:"
$tc = Get-Content -Raw "terms-and-conditions.html"
$sectionsCount = 0
for ($i = 1; $i -le 23; $i++) {
    $found = $tc.Contains("<h2>$i.") -or $tc.Contains("<h2>$i ")
    if ($found) { $sectionsCount++ }
}
Write-Host "  Terms & Conditions Sections Found: $sectionsCount / 23"

Write-Host "`n4. ROBOTS.TXT CHECK:"
$robots = Get-Content -Raw "robots.txt"
Write-Host "  Allows Googlebot: $($robots.Contains('Googlebot'))"
Write-Host "  Allows AdsBot-Google: $($robots.Contains('AdsBot-Google'))"
Write-Host "  Contains Sitemap: $($robots.Contains('Sitemap:'))"

Write-Host "`n5. SITEMAP.XML CHECK:"
$sitemap = Get-Content -Raw "sitemap.xml"
$urlCount = ([regex]::Matches($sitemap, "<loc>")).Count
Write-Host "  Total URLs in Sitemap: $urlCount / 9"

Write-Host "`n============================================="
Write-Host " AUDIT FINISHED"
Write-Host "============================================="
