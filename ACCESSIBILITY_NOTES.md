# Accessibility Notes — revops-director-landing

_Last reviewed: 2026-08-18_

## Correction to the previous version of this file

An earlier version of this note (committed 2026-08-17) stated that the repo
contained no page markup to audit. That check only looked at `main`,
`feat/revops-landing-page`, and `docs/readme-formatting-fix` — all of which
are placeholder branches containing only `README.md`. It did not check
`feat/marketing-pages`, which **does** contain the real homepage markup
(`app/page.tsx`, `app/layout.tsx`, the shared `Navbar`/`Footer`, and the UI
component kit). This revision replaces that finding with a real, file-level
audit of that markup.

**Scope of this audit** (all read from `feat/marketing-pages` at the time of
review):
- `app/layout.tsx` — root HTML shell, wraps every page in `Navbar` + `main` + `Footer`
- `app/page.tsx` — the homepage (`/`) content
- `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- `components/ui/Section.tsx`, `SectionHeading.tsx`, `Button.tsx`, `Container.tsx`
- `app/globals.css`, `tailwind.config.ts` (for the color values used below)

Note: `app/page.tsx` on this branch is itself a documented placeholder ("the
full marketing homepage lives outside the scope of this change") — but it is
real, rendered markup using the same shared layout and components every other
page uses, so the issues below apply to the current homepage as shipped and
will very likely carry over into the fuller homepage build.

## Findings

### 1. No `<h1>` on the page (real issue)
`app/layout.tsx` never renders an `<h1>`, and the homepage's only heading is
the `<h2>` produced by `SectionHeading` ("Your AI workforce, department by
department."). The site name in `Navbar` is a plain `<Link>`, not a heading.
Result: the homepage's document outline starts at `<h2>` with no `<h1>`
anywhere in the DOM. This fails WCAG 1.3.1 (Info and Relationships) /
2.4.6 (Headings and Labels) best practice and means screen-reader users
navigating by heading level have no top-level landmark for "what page is
this." **Fix:** render the page's primary heading as an `<h1>` (e.g. add an
`as="h1"` option to `SectionHeading` for the top-of-page usage, or wrap the
hero title directly in `<h1>`).

### 2. No skip-to-content link (real issue)
`app/layout.tsx` renders `<Navbar />` immediately before `<main>`, with no
"Skip to main content" link. Keyboard and screen-reader users must tab through
the entire header (logo, all primary nav links, "Log in", "Start free trial")
on every single page before reaching page content. This fails WCAG 2.4.1
(Bypass Blocks). **Fix:** add a visually-hidden-until-focused skip link as the
first focusable element in `layout.tsx`, pointing to a `#main-content` id on
the `<main>` element.

### 3. Primary navigation is fully hidden on mobile with no alternative (real issue)
In `Navbar.tsx`, the links list is `<nav className="hidden items-center gap-8
md:flex">`. Below the `md` breakpoint this is `display: none`, which removes
it from the accessibility tree entirely — there is no hamburger/menu button
rendered to reveal it. Mobile and small-viewport users (including anyone
zoomed in past ~768px-equivalent, a common low-vision accommodation) have no
way to reach Features, Pricing, Integrations, Security, Case Studies, About,
Careers, or Contact from the nav at all. This is both a functional and a
WCAG 1.4.10 (Reflow) / 2.4.5 (Multiple Ways) concern. **Fix:** add a mobile
menu toggle (`<button aria-expanded aria-controls>`) that reveals the same
links in a disclosure/drawer below `md`.

### 4. Color contrast failures against the ratified brand palette (real issue, computed)
Contrast ratios below were computed directly from the exact hex values in
`tailwind.config.ts` / `app/globals.css` (accent `#DE4B12`, background
`#FFFFFF`, muted `#AEA8A8`, surface `#F6F7F9`, ink `#17151A`) using the WCAG
relative-luminance formula — not estimated:

| Usage | Foreground / Background | Ratio | WCAG AA needs | Result |
|---|---|---|---|---|
| Hero description copy (`SectionHeading`'s `description`, `text-muted` on white) | `#AEA8A8` / `#FFFFFF` | **2.34:1** | 4.5:1 (normal text) | **Fail** |
| Footer tagline & copyright (`text-muted` on `bg-surface`) | `#AEA8A8` / `#F6F7F9` | **2.18:1** | 4.5:1 | **Fail** |
| "Alyvon" eyebrow label (`text-accent`, 14px semibold, on white) | `#DE4B12` / `#FFFFFF` | **4.10:1** | 4.5:1 (not large text at 14px) | **Fail** |
| Primary CTA button text ("Explore features", white on `bg-accent`) | `#FFFFFF` / `#DE4B12` | **4.10:1** | 4.5:1 | **Fail** |
| Primary button *hover* state (white on `bg-rust`) | `#FFFFFF` / `#815445` | 6.39:1 | 4.5:1 | Pass |
| Body/heading text (`text-ink` on white) | `#17151A` / `#FFFFFF` | 18.13:1 | 4.5:1 | Pass |
| Nav links at 80% opacity (`text-ink/80` on navbar bg) | ~`#454448` / `#FFFFFF` | 9.67:1 | 4.5:1 | Pass |

The muted-text failures are the most visible: it is used for the homepage's
entire hero description sentence and for the footer tagline/copyright, so a
large share of the homepage's actual reading copy fails AA contrast today.
The accent-on-white and white-on-accent failures matter because they are the
**resting state** of the eyebrow label and the primary CTA button — the most
important click target on the page only reaches AA contrast in its `:hover`
state (`bg-rust`), not by default.

**Fix options** (without inventing new brand colors): darken `muted` for text
use specifically (a `text-muted` value around `#767074` reaches ~4.5:1 on
white), and reserve `accent`/`#DE4B12` on white for large text (≥24px) or
non-text UI (icons, borders, the 3:1 threshold) rather than for body-size CTA
labels — or use the darker `rust` (`#815445`) as the button surface instead of
`accent`, since it already clears AA at 6.39:1.

### 5. Decorative border contrast (minor, informational)
`border: #D8D6D7` against `background: #FFFFFF` is 1.45:1. WCAG 1.4.11
(Non-text Contrast, 3:1) applies to borders that are the *only* indicator of
a UI component boundary (e.g. input fields) — the borders in scope here
(navbar bottom border, footer top border, ghost-button border) are
supplementary rather than sole indicators, so this is not a strict violation
today, but it's worth knowing if the border is ever relied on alone to convey
a boundary (e.g. a future form control).

### 6. Things done right (no action needed)
- `<html lang="en">` is set correctly in `app/layout.tsx`.
- Layout uses real semantic landmarks: `<header>` (Navbar), `<main>`, `<footer>`.
- `Button` renders as a real `<Link>` (`<a>`), not a `<div onClick>`, so it's
  natively keyboard-focusable and works with screen readers.
- `Button` has an explicit visible focus style
  (`focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`),
  which is often missing on custom buttons — good default here.
- No images are present on the current homepage build, so there are no
  missing-`alt` issues yet; this should be re-checked once hero imagery is
  added.

## Suggested pre-merge checklist for the full homepage build
When the full marketing homepage (beyond this placeholder) is built on top of
`feat/marketing-pages`, re-run this list against the real page:
- [ ] Exactly one `<h1>` per page, in a logical heading order (no skipped levels).
- [ ] Skip-to-content link present and functional.
- [ ] Mobile nav has a working, keyboard-operable toggle with `aria-expanded`.
- [ ] Re-run the contrast table above against any new copy/background pairings.
- [ ] All meaningful images have descriptive `alt`; decorative images have `alt=""`.
- [ ] Forms (e.g. the contact form referenced in `components/ContactForm.tsx`)
      have programmatically associated `<label>`s and inline error messaging.
- [ ] Run axe-core or Lighthouse accessibility audit against the deployed preview.
