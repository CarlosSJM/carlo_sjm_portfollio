# Feature Specification: About Section Real Photo

**Feature Branch**: `005-experience-section` (implemented in-branch, no dedicated branch — small content swap)
**Created**: 2026-08-28
**Status**: Draft

## Summary

Replace the geometric "PROFILE IMAGE" placeholder in the About section with Carlos's real portrait photo, keeping the existing Vesica Piscis circular frame. This closes roadmap follow-up task #22 ("real profile photo").

## User Scenarios & Testing

### User Story 1 — Visitor sees a real portrait instead of a placeholder (Priority: P1)

A visitor scrolls to the About section and sees Carlos's actual photo, cropped and framed so the face and upper torso are clearly visible inside the circular Vesica Piscis frame.

**Why this priority**: Replaces a placeholder with real content — directly increases trust/credibility of the portfolio. Source photo provided by the user (`carlos_sjm_dev.jpeg`, 1066×1600 B&W studio portrait).

**Independent Test**: Navigate to `/#about`. An `<img>` with accessible name "Carlos SJM, portrait" is visible inside the circular frame; face is centered and not cropped out.

**Constitution Compliance**:
- Server-First: `ProfilePhoto` is a Server Component (`next/image`, no client state needed)
- SEO: descriptive `alt` text on the image
- Privacy: no metadata/EXIF concerns — image re-encoded (cropped + recompressed) via ImageMagick, not the original file, before being committed
- Accessibility: `next/image` renders a real `<img>` with `alt`; decorative frame SVG stays `aria-hidden`
- Performance: image cropped to a 900×900 square and recompressed (JPEG q87, ~64KB) before being added to the repo; `next/image` further optimizes/serves responsive sizes at build/request time; `priority` set since it's above-the-fold-adjacent content

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/#about`, **When** the section loads, **Then** the real photo is visible inside the circular frame with accessible name "Carlos SJM, portrait"
2. **Given** the photo, **When** viewed at both the 256px (mobile) and 320px (desktop `md:`) frame sizes, **Then** the face stays centered and legible (object-fit: cover on a face/torso-framed square source avoids awkward crops at either size)
3. **Given** JavaScript is disabled, **Then** the photo is still visible (Server Component, plain `<img>` under the hood)

**Vitest Coverage**:
- [x] `tests/unit/about.test.ts` — `ABOUT_DATA.photoSrc` matches `/^\/images\//`, `photoAlt` is non-empty

**Playwright Coverage**:
- [x] `tests/e2e/about.spec.ts` — "profile photo is visible with accessible label" replaces the old placeholder test; asserts `getByRole("img", { name: "Carlos SJM, portrait" })` is visible

## Implementation Notes

- Source file `/home/carlossjm/Imágenes/carlos_sjm_dev.jpeg` (1066×1600) provided by the user, outside the repo — never committed as-is
- Cropped with ImageMagick (`magick ... -crop 1066x1066+0+70 -resize 900x900 -quality 87`) to a top-aligned square: face centered in the upper-middle third, shoulders and the start of the crossed forearms visible at the bottom edge, per the user's explicit framing request ("cara y medio torso, si se ven los brazos mejor")
- Output committed at `public/images/carlos-sjm.jpg` (900×900, ~64KB)
- `AboutData` type extended with `photoSrc: \`/${string}\`` and `photoAlt: string`, populated in `src/data/about.ts` — keeps content centralized in `src/data/` per project convention
- New `src/components/ui/ProfilePhoto.tsx` (Server Component) replaces `src/components/ui/PhotoPlaceholder.tsx` (deleted — dead code once the real photo exists). Reuses the exact same Vesica Piscis SVG frame markup and `clipPath: circle(40% at 50% 50%)` crop, swapping the placeholder `<div>` text for a `next/image` `fill` image with `object-cover`
- No new dependencies — `next/image` is already part of Next.js; cropping done once via the system `magick` CLI (ImageMagick), not a runtime/build dependency

## Out of Scope

- Color grading / retouching the photo beyond crop + resize + compress
- Generating multiple art-directed crops per breakpoint (a single square source + `object-cover` is sufficient at both frame sizes)
- Updating `og-image` or any other place a profile photo might eventually be reused (tracked separately if it comes up)
