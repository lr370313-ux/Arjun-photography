# Desktop layout review

Checked browser CSS viewports:

| Viewport | Result |
| --- | --- |
| 1920 × 1080 | Wider service and portfolio layouts; 1080p hero selected; no horizontal overflow |
| 2560 × 1440 | Content capped at 1800px; header fits; full portfolio renders all 14 sample photographs |
| 3840 × 2160 | Content remains centered; header fits; no horizontal overflow |
| 3440 × 1440 | Ultrawide layout remains centered without stretching text lines |
| 1440 × 900 | Existing laptop layout retained; no horizontal overflow |
| 390 × 844 | Two-column portfolio and mobile menu retained; 720p hero selected; no horizontal overflow |

Large-screen rules start at 1600 CSS pixels in `src/app/wide-desktop.css`.
Content remains Inter 16px, menu links remain 14px, and the film carousel retains its 8px spacing.
The desktop hero is a local 1920×1080, 24fps copy; smaller screens keep the lighter 1280×720 copy. The new file passed a full decode check.
