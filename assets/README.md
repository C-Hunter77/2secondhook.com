# assets/

Place your media files here.

## Hero Showreel Video
- **File name:** `hero-showreel.mp4`
- **Format:** MP4 (H.264), 1920×1080
- **Size:** Keep under 20 MB for fast page loads (compress with HandBrake or FFmpeg)
- **Tip:** A 10–30 second looping clip works best for background video heroes

The video is referenced in `index.html` as:
```html
<source src="assets/hero-showreel.mp4" type="video/mp4" />
```

If the video file is absent, the `poster` image (Unsplash fallback) will be shown instead.

## Images
Replace any Unsplash `src` URLs in `index.html` and `pricing.html` with paths to
your own images for a production-ready site.
