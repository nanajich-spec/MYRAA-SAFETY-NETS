$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$imagesDir = Join-Path $root 'images'
$videoDir = Join-Path $root 'vedios'
$manifestScript = Join-Path $root 'update-media-manifest.ps1'

if (-not (Test-Path $imagesDir)) {
    Write-Error "Images directory not found: $imagesDir"
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
$cwebp = Get-Command cwebp -ErrorAction SilentlyContinue

if (-not $magick -and -not $cwebp) {
    Write-Host "No image optimization CLI found."
    Write-Host "Install one of these tools:"
    Write-Host "1) ImageMagick (magick)"
    Write-Host "2) libwebp tools (cwebp)"
    exit 1
}

$sourceExts = @('.jpg', '.jpeg', '.png')
$images = Get-ChildItem -Path $imagesDir -File |
    Where-Object { $sourceExts -contains $_.Extension.ToLower() }

foreach ($img in $images) {
    $webpPath = [System.IO.Path]::ChangeExtension($img.FullName, '.webp')

    if ($cwebp) {
        & cwebp -quiet -q 78 "$($img.FullName)" -o "$webpPath"
    } elseif ($magick) {
        & magick "$($img.FullName)" -strip -quality 78 "$webpPath"
    }

    if (Test-Path $webpPath) {
        Write-Host "Created: $([System.IO.Path]::GetFileName($webpPath))"
    }
}

if (Test-Path $manifestScript) {
    & $manifestScript
}

Write-Host "Optimization complete."
Write-Host "Tip: Keep originals for fallback and use .webp files in manifest for best performance."
if (Test-Path $videoDir) {
    Write-Host "Video optimization note: compress heavy videos separately with ffmpeg for faster load times."
}
