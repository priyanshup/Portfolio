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

# Palette: the site's light "workshop" tokens (src/index.css)
$page   = '#e4e3df'; $plate = '#f3f2ef'; $line = '#d3d2cd'
$ink    = '#0a0a0a'; $muted = '#57575a'; $orange = '#fa5b01'

# Page, then one plate with a hairline edge and a screw in each corner
$g.FillRectangle((Brush $page), 0, 0, $W, $H)
$g.FillRectangle((Brush $plate), 28, 28, $W - 56, $H - 76)
$pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($line)), 2
$g.DrawRectangle($pen, 28, 28, $W - 56, $H - 76)
foreach ($p in @(@(52, 52), @(($W - 66), 52), @(52, ($H - 90)), @(($W - 66), ($H - 90)))) {
  $g.DrawEllipse($pen, $p[0], $p[1], 14, 14)
}

# Logo (native 96x96, drawn 1:1 so it stays crisp)
if (Test-Path $logo) {
  $img = [System.Drawing.Image]::FromFile($logo)
  $g.DrawImage($img, 92, 84, 96, 96)
  $img.Dispose()
}

$fName  = New-Object System.Drawing.Font 'Arial Black', 82, ([System.Drawing.FontStyle]::Regular), 'Pixel'
$fLabel = New-Object System.Drawing.Font 'Segoe UI Semibold', 24, ([System.Drawing.FontStyle]::Regular), 'Pixel'
$fMono  = New-Object System.Drawing.Font 'Consolas', 24, ([System.Drawing.FontStyle]::Regular), 'Pixel'

# Name: the surname sits on an orange block, as on the site
$g.DrawString('Priyanshu', $fName, (Brush $ink), 80, 196)
$sz = $g.MeasureString('Pushpam', $fName)
$g.FillRectangle((Brush $orange), 92, 312, [int]$sz.Width - 18, 100)
$g.DrawString('Pushpam', $fName, (Brush $ink), 80, 300)

$sep = '  ' + [char]0x00B7 + '  '
$g.DrawString(('TECHNICAL PRODUCT LEADER' + $sep + 'HEALTHCARE' + $sep + 'GAMING' + $sep + 'E-COMMERCE'), $fLabel, (Brush $muted), 92, 446)
$g.DrawString('priyanshup.github.io/Portfolio', $fMono, (Brush $muted), 92, 494)

# Colour stripe along the bottom edge
$x = 0
foreach ($seg in @(@(25, $plate), @(16, '#6e6e71'), @(32, $orange), @(17, $plate), @(10, $ink))) {
  $segW = [int]($W * $seg[0] / 100)
  $g.FillRectangle((Brush $seg[1]), $x, $H - 14, $segW + 1, 14)
  $x += $segW
}

$g.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Wrote $outPath ($W x $H)"
