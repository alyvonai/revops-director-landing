# Section Manifest — revops-director-landing scaffold

This file tracks the minimal static landing page scaffold being built on
branch `feat/landing-page-scaffold`. There is no upstream copy/content
document for this build — it is a from-scratch scaffold — so each section
below is a file to create/update directly, not an extraction target.

## Brand tokens (source of truth for styles.css)
- Accent (single warm orange): `#DE4B12`
- Background / cool white surface: `#FFFFFF`
- Alt surface (cool off-white): `#F6F7F9`
- Border: `#D8D6D7`
- Muted text: `#AEA8A8`
- Secondary accent (rust/orange, sparing use only): `#815445`
- Alt surface gray: `#EEEEEF`
- Typeface: Archivo (sans-serif only, no serif fallback)

## Sections

| # | Section | File | Status |
|---|---------|------|--------|
| 1 | Read existing README.md | `README.md` (read-only research) | Done — original README was a 2-line stub: repo name + one-line description ("Landing page for Alyvon's RevOps Director — AI-powered revenue operations specialist"). No prior scaffold existed. |
| 2 | index.html hero section | `index.html` | Pending |
| 3 | styles.css design tokens | `styles.css` | Pending |
| 4 | package.json dev script | `package.json` | Pending |
| 5 | README.md install/run instructions | `README.md` | Pending |
| 6 | Draft pull request | N/A (GitHub PR object) | In progress — branch `feat/landing-page-scaffold` created off `main`@`6880f2c6e67a0376edc9f6da805e7481db457abd`; draft PR opened with this manifest as first commit. |

## Conventions for build units
- Plain HTML/CSS/JS only — no build tooling, no framework, no bundler.
- `index.html` links `styles.css` directly via `<link rel="stylesheet" href="styles.css">`.
- `styles.css` defines all brand colors as CSS custom properties on `:root` (see tokens above) — no hard-coded hex values elsewhere in the file.
- Load Archivo from Google Fonts in `index.html` `<head>`, with a sans-serif fallback stack (`'Archivo', -apple-system, 'Segoe UI', sans-serif`) — never a serif fallback.
- `package.json` `dev` script should run a simple static file server (e.g. `npx serve .`) with no other dependencies required.
- Keep the whole scaffold to these four files — no extra assets, no images, no additional pages — this is a minimal landing page scaffold, not a full site.
