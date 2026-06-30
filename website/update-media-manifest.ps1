$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$imagesDir = Join-Path $root 'images'
$videosDir = Join-Path $root 'vedios'
$outputFile = Join-Path $root 'js\media-manifest.json'

$imageExts = @('.jpg', '.jpeg', '.png', '.webp', '.gif')
$videoExts = @('.mp4', '.webm', '.ogg', '.mov')

function Get-EncodedRelativePaths {
    param(
        [string]$FolderPath,
        [string]$Prefix,
        [string[]]$AllowedExts
    )

    if (-not (Test-Path $FolderPath)) {
        return @()
    }

    $items = Get-ChildItem -Path $FolderPath -File |
        Where-Object { $AllowedExts -contains $_.Extension.ToLower() } |
        Sort-Object Name -Descending |
        ForEach-Object {
            $encodedName = [System.Uri]::EscapeDataString($_.Name)
            "$Prefix/$encodedName"
        }

    return @($items)
}

$images = Get-EncodedRelativePaths -FolderPath $imagesDir -Prefix 'images' -AllowedExts $imageExts
$videos = Get-EncodedRelativePaths -FolderPath $videosDir -Prefix 'vedios' -AllowedExts $videoExts

$manifest = [ordered]@{
    images = $images
    videos = $videos
}

$manifest | ConvertTo-Json -Depth 5 | Set-Content -Path $outputFile -Encoding UTF8

Write-Host "Media manifest updated: $outputFile"
Write-Host "Images: $($images.Count)"
Write-Host "Videos: $($videos.Count)"
