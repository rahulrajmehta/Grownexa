$html = Get-Content -Raw "index.html"
Write-Host "=== SECTION AUDIT ==="
$sections = @(
    'id="home"',
    'id="services"',
    'id="why-us"',
    'id="process"',
    'id="packages"',
    'id="proof"',
    'id="faq"',
    'class="final-cta-section"',
    'class="footer"'
)
foreach ($sec in $sections) {
    $matched = $html.Contains($sec)
    Write-Host "$sec -> $matched"
}

Write-Host "`n=== WHATSAPP CTA AUDIT ==="
$pattern = 'data-wa-message="([^"]+)"'
$matches = [regex]::Matches($html, $pattern)
Write-Host "Total WhatsApp CTAs found: $($matches.Count)"
$i = 1
foreach ($m in $matches) {
    Write-Host "$i. $($m.Groups[1].Value)"
    $i++
}

Write-Host "`n=== MODAL & FLOATING AUDIT ==="
Write-Host "Floating WhatsApp Button: $($html.Contains('id="floatingWhatsApp"'))"
Write-Host "Consultation Modal: $($html.Contains('id="consultationModal"'))"
Write-Host "Privacy Modal: $($html.Contains('id="privacyModal"'))"
Write-Host "Terms Modal: $($html.Contains('id="termsModal"'))"
