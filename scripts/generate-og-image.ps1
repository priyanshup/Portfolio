<#
  scripts/generate-og-image.ps1

  Regenerates public/og-image.png — the 1200x630 social-share card used by
  the og:image / twitter:image tags in index.html.

  Why this exists: og-image.png was once a byte-identical copy of the 96x96
  logo, so every LinkedIn/Slack share rendered a tiny logo. Keep the card
  evergreen (name, title, domains — no employer or dates) so it doesn't go
  stale when the role changes.

  Usage (Windows PowerShell 5.1+):
    powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1

  After deploying, force LinkedIn to re-scrape:
    https://www.linkedin.com/post-inspector/
#>

Add-Type -AssemblyName System.Drawing

$root    = Split-Path -Parent $PSScriptRoot
$outPath = Join-Path $root 'public\og-image.png'
$logo    = Join-Path $root 'public\logo.png'

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'
$g.InterpolationMode = 'HighQualityBicubic'

function Brush($hex, $alpha = 255) {
  $c = [System.Drawing.ColorTranslator]::FromHtml($hex)
  New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, $c))
}

# Background — matches the site's dark theme token (#0f172a)
$g.FillRectangle((Brush '#0f172a'), 0, 0, $W, $H)

# Soft accent glow, lower-right (accent token #10b981)
$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(660, 200, 720, 720)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush $glow
$pgb.CenterColor    = [System.Drawing.Color]::FromArgb(70, 16, 185, 129)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 16, 185, 129))
$g.FillPath($pgb, $glow)

# Border
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 30, 41, 59)), 2
$g.DrawRectangle($pen, 1, 1, $W - 3, $H - 3)

# Logo (native 96x96 — drawn 1:1 so it stays crisp)
if (Test-Path $logo) {
  $img = [System.Drawing.Image]::FromFile($logo)
  $g.DrawImage($img, 80, 72, 96, 96)
  $img.Dispose()
}

$white  = Brush '#ffffff'
$muted  = Brush '#94a3b8'
$accent = Brush '#10b981'

$fName  = New-Object System.Drawing.Font 'Segoe UI', 76, ([System.Drawing.FontStyle]::Bold), 'Pixel'
$fTitle = New-Object System.Drawing.Font 'Segoe UI Semibold', 36, ([System.Drawing.FontStyle]::Regular), 'Pixel'
$fSub   = New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Regular), 'Pixel'
$fMono  = New-Object System.Drawing.Font 'Consolas', 24, ([System.Drawing.FontStyle]::Regular), 'Pixel'

$g.DrawString('PRIYANSHU',  $fName, $white, 74, 205)
$g.DrawString('PUSHPAM',    $fName, $white, 74, 290)

$g.FillRectangle($accent, 80, 400, 64, 4)

$g.DrawString('Technical Product Leader', $fTitle, $accent, 78, 424)
$g.DrawString([string]::Join('  ' + [char]0x00B7 + '  ', 'Healthcare', 'Gaming', 'E-commerce', 'Digital Commerce'), $fSub, $muted, 80, 480)
$g.DrawString('priyanshup.github.io/Portfolio', $fMono, $muted, 80, 555)

$g.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Wrote $outPath ($W x $H)"
