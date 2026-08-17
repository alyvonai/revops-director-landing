# Accessibility Notes — revops-director-landing

_Last reviewed: 2026-08-17_

## Finding: no page markup exists yet to audit

This repository currently contains a single file — `README.md` — from its
initial commit. There is no HTML, JSX/TSX, or CSS for the RevOps Director
landing page checked in on the `main` branch (and the `master` ref exists
but has zero commits). In other words: **the "main page markup" this task
was scoped to review does not exist yet.**

Because of that, no real accessibility defects can be reported against
actual markup — doing so would mean fabricating findings against code that
was never written. This note documents that state plainly, and instead
provides a pre-build accessibility checklist so the first version of the
landing page ships accessible by default rather than needing a retrofit
audit later.

## What to do with this note

Treat this as a **pre-flight checklist**, not a bug list. Apply it while
building the landing page markup, and re-run a real audit (axe-core /
Lighthouse / manual screen-reader pass) against the actual rendered page
once it exists — this note should be revisited and replaced with concrete,
file-and-line findings at that point.

## Accessibility checklist for the landing page build

### Document structure
- Exactly one `<h1>` per page, describing the page's primary purpose
  (e.g. "RevOps Director — AI-powered revenue operations specialist").
  Headings should nest in order (`h1` → `h2` → `h3`) with no skipped levels.
- Use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) rather
  than generic `<div>`s for page structure, so screen-reader users can jump
  between regions.
- Set `<html lang="en">` and a descriptive, unique `<title>`.

### Images and media
- Every `<img>` needs meaningful `alt` text; purely decorative images
  should use `alt=""` (not omitted) so screen readers skip them.
- Icon-only buttons/links (e.g. social icons, hamburger menu) need an
  accessible name via `aria-label` or visually-hidden text — an icon glyph
  alone is not announced.

### Interactive elements
- Use native `<button>` / `<a href>` elements for controls instead of
  `<div onClick>` — divs are not keyboard-focusable or announced as
  controls by default (missing `role`, `tabindex`, and keyup handling).
- Every focusable element must have a visible focus indicator — do not
  ship `outline: none` / `:focus { outline: 0; }` without a replacement
  focus style.
- Verify logical tab order matches visual/reading order, especially in any
  multi-column hero or pricing-tier layout.
- CTA buttons ("Book a Demo," "Start Free Trial," etc.) need clear,
  specific link/button text — avoid bare "Click here" or "Learn more"
  with no context for screen-reader users navigating by link list.

### Forms (trial signup, demo request, etc.)
- Every input needs a programmatically associated `<label>` (via `for`/`id`
  or wrapping) — placeholder text alone is not a label.
- Required fields and validation errors must be conveyed to assistive tech
  (`aria-required`, `aria-invalid`, `aria-describedby` pointing at the
  error message), not just conveyed by color/icon.
- Error and success messages should be in a live region (`role="alert"` or
  `aria-live="polite"`) so they're announced without a page reload.

### Color and contrast
- Body text must meet WCAG AA contrast (4.5:1 for normal text, 3:1 for
  large/bold text) against its background.
- Watch the brand accent `#DE4B12` and muted text `#AEA8A8` in particular —
  both are light/mid-tone enough that they can fail AA contrast on the
  white (`#FFFFFF`) or light-gray (`#F6F7F9` / `#EEEEEF`) surfaces used in
  this design system when used for body copy or small UI text. Reserve
  low-contrast tones for large decorative text or backgrounds, and verify
  actual pairs with a contrast checker before shipping.
- Don't convey state (e.g. "selected plan," "error," "required") through
  color alone — pair it with text, an icon, or a shape change.

### Motion and responsiveness
- Respect `prefers-reduced-motion` for any hero animation, carousel, or
  scroll-triggered effect.
- Confirm the page is usable and readable at 200% browser zoom and on
  narrow (375px) viewports without horizontal scrolling or clipped text.

### Testing before merge
- Run an automated pass (axe DevTools, Lighthouse accessibility audit, or
  `@axe-core/playwright` in CI) against the built page.
- Do one manual keyboard-only pass (Tab/Shift+Tab/Enter/Space) through the
  entire page, and one screen-reader pass (VoiceOver or NVDA) through the
  hero, pricing table, and signup form specifically, since those are the
  highest-value conversion paths on this landing page.

## Next step
Once the actual landing page markup is committed, re-run this review against
the real DOM and replace this checklist with dated, file-specific findings
(element, issue, WCAG criterion, suggested fix) rather than a general guide.
