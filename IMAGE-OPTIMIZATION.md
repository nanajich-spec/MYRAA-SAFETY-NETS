# Image And Media Optimization Plan

This website supports modern image formats including `.webp` in the dynamic gallery.

## Recommended Production Workflow

1. Upload original photos to `images/`.
2. Run:
   ```powershell
   .\optimize-images.ps1
   ```
3. The script generates `.webp` versions (quality 78) and refreshes `js/media-manifest.json`.
4. Deploy both original and `.webp` files.

## Why This Helps Lighthouse

- Smaller image payloads improve LCP and Speed Index.
- Lazy-loaded gallery images reduce initial page weight.
- Async decoding reduces main-thread blocking.

## Video Optimization Plan

Use ffmpeg for heavy videos before upload:

```powershell
ffmpeg -i "input.mp4" -vcodec libx264 -crf 28 -preset medium -acodec aac "output-optimized.mp4"
```

Keep target file size low for mobile networks.

## Extra Performance Checklist

- Prefer image widths near display size.
- Avoid uploading very large originals directly from phone camera.
- Keep first viewport clean from heavy media.
- Re-run `update-media-manifest.ps1` after media changes.
