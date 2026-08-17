# Accessibility Notes — `revops-director-landing`

_Investigated 2026-08-17 by Engineering (Hugo)._

## ⚦️ Headline finding: there is no main page markup in this repo yet

Before auditing anything, I checked the repository's actual current state via the GitHub API rather than assuming file contents — this is a plain, load-bearing finding, not a footnote:

- **`main`** branch: contains a single file, `README.md`. No HTML, JSX/TSX, CSS, or any other landing-page markup exists.
- **`feat/revops-landing-page`** branch: tip commit is identical to `main`'s tip commit — same single `README.md`, no page code.
- **`docs/readme-formatting-fix`** branch (open draft PR [#1](https://github.com/alyvonai/revops-director-landing/pull/1)): only touches `README.md` punctuation/formatting.
- No other branches exist. No `index.html`, no `src/`, no framework scaffold (Next.js, Vite, etc.) of any kind has been committed anywhere in this repository.

**Conclusion:** the branch name (`feat/revops-landing-page`) and repo description ("Landing page for Alyvon's RevOps Director") indicate a landing page is *planned*, but the actual page markup has not been built/committed yet — this repo is currently a documentation-only stub. There is nothing to run an accessibility audit (contrast checker, screen-reader pass, axe/Lighthouse, heading-structure check, etc.) *against*, because there is no DOM to audit.

I'm not fabricating a markup review to fill this gap. Instead, below is (a) what a real audit will need to check once the page is built, and (b) one piece of real, non-fabricated analysis I *could* do today: contrast-checking the ratified Alyvon brand palette against WCAG 2.1 AA, since those exact colors will end up in the page's text, backgrounds, and buttons.

---

## Real finding available today: brand palette contrast audit (WCAG 2.1 AA)

Computed directly from the ratified hex values (not from any live markup, since none exists):

| Combination | Contrast ratio | Normal text (≥4.5:1) | Large text / UI (≥3:1) |
|---|---|---|---|
| Accent `#DE4B12` text on Background `#FFFFFF` | 4.10:1 | ❌ FAIL | ✅ PASS |
| Muted text `#AEA8A8` on Background `#FFFFFF` | 2.34:1 | ❌ FAIL | ❌ FAIL |
| Muted text `#AEA8A8` on Surface `#F6F7F9` | 2.18:1 | ❌ FAIL | ❌ FAIL |
| Rust/Orange `#815445` text on Background `#FFFFFF` | 6.39:1 | ✅ PASS | ✅ PASS |
| Border `#D8D6D7` on Background `#FFFFFF` | 1.45:1 | ❌ FAIL (n/a for borders, but too low to convey state via color alone) | ❌ FAIL |
| Accent `#DE4B12` on Alt Surface Gray `#EEEEEF` | 3.54:1 | ❌ FAIL | ✅ PASS |
| White text `#FFFFFF` on Accent `#DE4B12` button | 4.10:1 | ❌ FAIL | ✅ PASS |
| White text `#FFFFFF` on Rust/Orange `#815445` button | 6.39:1 | ✅ PASS | ✅ PASS |

**Implications for whoever builds the page:**
1. **Accent orange (`#DE4B12`) fails AA for normal-size body text** on both white and Alt Surface Gray backgrounds — it only clears AA at large-text/UI-component thresholds (≥18pt / ≥14pt bold, or as a button/icon outline). Do not set small body copy or links in `#DE4B12` on a light background; reserve it for large headlines, buttons (with white text, which passes at 4.10:1 only for large/UI text — see next point), badges, and icon accents.
2. **`#DE4B12` buttons with white text pass only the "large text/UI" threshold (4.10:1), not full AA body-text contrast (4.5:1).** If button labels are set at a typical 14–16px, this is a borderline fail. Either bump the button label size/weight to qualify as "large text" (≥14pt/18.66px bold) or use the darker Rust/Orange `#815445` for any button where the label must read as normal-size text — it passes cleanly at 6.39:1.
3. **Muted text `#AEA8A8` fails AA at every combination checked** (2.18–2.34:1, both well under the 3:1 floor even for large text). This token should not be used for any text that conveys meaning — captions, form hints, disabled-looking-but-actually-required labels, timestamps, etc. If it must stay in the palette for truly decorative use, do not use it for real content; otherwise darken it before shipping actual page copy.
4. **Border `#D8D6D7` (1.45:1) is far too low-contrast to be the sole indicator of an interactive state** (e.g., focus outline, input border, selected-tab underline) — WCAG 1.4.11 (Non-text Contrast) wants ≥3:1 for UI component boundaries that convey state.

---

## Standard checklist for the real audit (run this once markup exists)

When `feat/revops-landing-page` (or whatever branch ships the actual page) has real markup, re-run this investigation against the rendered DOM and check:

- **Document structure**: single `<h1>`, logical heading order (no skipped levels), `<html lang="en">` set, one landmark per region (`<header>`, `<nav>`, `<main>`, `<footer>`).
- **Images & icons**: every `<img>` has meaningful `alt` text (or `alt=""` if purely decorative); icon-only buttons/links have an accessible name (`aria-label` or visually-hidden text).
- **Color contrast**: re-run the table above against the *actual* rendered text/background pairs, including hover/focus/disabled states — not just the base palette.
- **Keyboard access**: every interactive element (CTA buttons, nav links, pricing-plan toggles, FAQ accordions) is reachable and operable via keyboard alone, with a visible focus indicator (not `outline: none` without a replacement).
- **Forms** (trial signup, "Book a Demo", contact): every input has a programmatically associated `<label>`; errors are announced (not color-only) and tied to the field via `aria-describeby`.
- **Motion/animation**: any autoplay video/animated hero respects `prefers-reduced-motion` and has a pause/stop control if it loops.
- **Semantic buttons vs. links**: `<button>` for actions, `<a href>` for navigation — not `<div onClick>`.
- **Skip link**: a "Skip to main content" link as the first focusable element, for pages with a large nav/header.
- **ARIA is supplementary, not primary**: prefer native HTML semantics; only add ARIA roles/attributes where native elements can't express the pattern (e.g., accordion/FAQ, tab panels).
- **Automated pass**: run axe-core or Lighthouse accessibility audit against the deployed preview once it exists, then re-check anything it flags by hand (automated tools catch ~30-50% of real issues).

## Recommendation

Treat this file as a pre-build checklist, not a completed audit. Once real markup lands on `feat/revops-landing-page` (or a successor branch), re-run this investigation against the actual DOM and update this file with concrete pass/fail findings tied to specific elements/selectors.
