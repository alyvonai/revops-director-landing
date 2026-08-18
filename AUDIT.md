# Engineering Audit — revops-director-landing

**Audited by:** Hugo, Engineering Director
**Date:** 2026-08-18
**Repository:** `alyvonai/revops-director-landing`
**Code audited:** tip of `feat/marketing-pages` (`950c4ae`, "feat: add about page")

## Scope note (read this first)

`main` currently contains a single commit — just `README.md` — so there is
nothing to audit there. The real, working implementation (a Next.js 14 App
Router site with 9 routes: Home, Pricing, Features, Case Studies,
Integrations, Security, About, Careers, Contact) lives entirely on the
unmerged branch `feat/marketing-pages`, which is 32 commits ahead of `main`
and was last touched today; `main` hasn't moved since 2026-07-05. This audit
covers that branch's actual code, cited by file and line where relevant. The
repo also carries several `docs/*` branches (`docs/full-repo-audit`,
`docs/accessibility-notes`, `docs/design-system-notes`,
`docs/code-organization-improvements`, `docs/readme-tech-stack`) that were
all forked from the pre-code initial commit — meaning any prior audit/notes
content sitting on those branches predates the actual implementation and is
now stale. This document supersedes them for the current codebase.

---

## 1. Code organization

**The real site is stranded on an unmerged branch.** `feat/marketing-pages`
holds 32 commits of working implementation with no PR merged into `main`.
Until that lands, `main` — the branch anyone cloning the repo by default
gets — is a single README. This is the top structural risk in the repo
today, independent of the code's own quality.

**What's genuinely good:**
- `lib/site-data.ts` is a real single source of truth for facts referenced
  across pages (`siteConfig`, `proofPoints.specialistCount = 102`,
  `proofPoints.integrationCount = "1,000+"`, `primaryNav`, `footerNav`,
  `pricingTiers`) — every page imports from it rather than hardcoding
  numbers, which is exactly what `CONVENTIONS.md` prescribes.
- `CONVENTIONS.md` is an unusually concrete contract for a small repo: it
  specifies file layout (`app/<slug>/page.tsx`), a fixed component
  vocabulary (`Section`, `Container`, `SectionHeading`, `Button`, `Card`,
  `Badge`, `StatPill`, `FAQAccordion`), a metadata requirement, a "no
  hardcoded hex colors" rule, and explicit copy guardrails (no invented
  Enterprise price, no "117 specialists", no fabricated customer logos).
  Spot-checking the 8 marketing pages, this contract is actually followed —
  no raw hex values found in any `app/**/*.tsx`, no page hardcodes a number
  that exists in `site-data.ts`.
- Server/client split is disciplined: no `app/**/page.tsx` file has a
  `"use client"` directive; only two true interactive leaves do —
  `components/ui/FAQAccordion.tsx` and `components/ContactForm.tsx`.

**Concrete gaps found:**
- **Import-path inconsistency inside the same files.** `components/layout/Navbar.tsx`
  and `components/layout/Footer.tsx` import UI primitives via relative paths
  (`import { Container } from "../ui/Container"`, `../ui/Button`) while, in
  those exact same two files, `lib/site-data` is imported via the `@/`
  alias (`from "@/lib/site-data"`) that `tsconfig.json`'s `paths` block
  defines and that every other component/page in the repo uses
  consistently for `ui/*` imports. Pick one convention and apply it
  everywhere — right now it's split within single files.
- **A declared design token is never wired up.** `tailwind.config.ts`
  declares `fontFamily.sans` starting with `"Inter"`, but there is no
  `next/font` import, no `@font-face`, no self-hosted font file, and no
  Google Fonts `<link>` anywhere in the repo (`grep -r "next/font\|@font-face\|fonts.googleapis"`
  returns nothing). Every page silently falls back to the next entries in
  the stack (`ui-sans-serif`/`system-ui`), so the intended brand typeface
  never actually renders.
- **No `public/` directory at all.** No favicon, no OG image, no static
  assets of any kind exist in the repo yet — worth knowing before pages
  start assuming `next/image` or a logo file is available.
- **No CI.** There is no `.github/workflows/` directory, so `next lint` /
  `next build` / `tsc` never run automatically against pushes or PRs —
  the import-path and font-loading gaps above are exactly the class of
  issue a lint/build CI gate would have caught before merge.
- **`ContactForm` has no backend to submit to.** `components/ContactForm.tsx`'s
  `handleSubmit` only calls `event.preventDefault()` and flips local state
  to `"submitted"` — there is no `app/api/` route, server action, or
  `fetch()` call anywhere, so the form currently cannot deliver a real
  message despite the UI promising "a real person reads every message."
- **Dead branches.** `feat/revops-landing-page` and `docs/add-tech-stack-section`
  contain zero commits beyond the shared initial commit — they exist in
  name only and should be deleted or actually used.

---

## 2. Accessibility

**No `<h1>` exists anywhere in the site.** Across all 9 routes
(`app/page.tsx` and the 8 pages under `app/*/page.tsx`), every page's
top-of-page heading is rendered through `components/ui/SectionHeading.tsx`,
which hardcodes `<h2>` (line 22: `<h2 className="text-3xl font-semibold...`)
with no prop to render it as an `<h1>`. A repo-wide grep for `<h1` returns
zero matches, while `<h2` (only from `SectionHeading`) and 15 separate
`<h3>` instances do exist. Every page therefore has a broken document
outline — assistive tech users and SEO crawlers alike have no page-level
heading to land on.

**No mobile navigation exists.** `components/layout/Navbar.tsx` renders the
primary nav as `<nav className="hidden items-center gap-8 md:flex">` with
no hamburger button, `<details>`, or any alternate disclosure for narrow
viewports. Below the `md` breakpoint, "Features", "Integrations",
"Pricing", "Case Studies", and "Security" are not just visually hidden but
`display: none` — unreachable by any user on a phone-width screen except by
guessing the URL or scrolling to the footer.

**Color contrast failures against the ratified brand palette itself,**
computed directly from the hex values in `tailwind.config.ts` /
`app/globals.css` using WCAG's relative-luminance formula:
- `muted` (`#AEA8A8`) on `background` (`#FFFFFF`): **2.34:1**
- `muted` (`#AEA8A8`) on `surface` (`#F6F7F9`): **2.18:1**
  Both fail WCAG AA even at the relaxed large-text threshold (3:1), let
  alone the 4.5:1 normal-text minimum. `text-muted` is the class used for
  essentially every secondary line of copy on the site — `StatPill` labels,
  every `SectionHeading` description, the footer tagline, FAQ answers, and
  `Card` body text — so this is not an edge case, it's the default
  secondary-text color for the whole site.
- `accent` (`#DE4B12`) on white: **4.1:1** — passes for large text (≥3:1)
  but fails the 4.5:1 minimum required for normal/small text. It's used at
  small sizes for `SectionHeading`'s uppercase eyebrow label
  (`text-sm font-semibold uppercase`) and for inline links such as the
  `text-accent underline` link in `ContactForm`'s confirmation state.

**`FAQAccordion` is missing the ARIA relationship between trigger and
panel.** `components/ui/FAQAccordion.tsx` sets `aria-expanded` on the
`<button>` correctly, but the expandable answer `<div>` has no `id`, and the
button has no matching `aria-controls` — a screen reader has no
programmatic way to associate the trigger with the content it reveals.

**Form focus states are weaker than button focus states.** `ContactForm`'s
inputs/textarea use `focus:border-accent focus:outline-none` — the native
focus outline is removed and replaced only with a border-color shift from
`#D8D6D7` to `#DE4B12`, a subtle change compared to the
`focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`
pattern that `components/ui/Button.tsx` correctly uses. Keyboard users
tabbing through the contact form get a noticeably less visible focus
indicator than everywhere else on the site.

**No skip-to-content link.** `app/layout.tsx` renders `<Navbar />` directly
before `<main>` with nothing in between — keyboard users must tab through
the full nav on every single page load to reach page content.

**What's genuinely good:** `<html lang="en">` is set correctly in
`app/layout.tsx`; every `ContactForm` input has a properly associated
`<label htmlFor>`/`id` pair; `Button` and the form's submit button both use
a real `focus-visible` ring treatment.

---

## 3. SEO meta tags

**The homepage has no `metadata` export.** `app/page.tsx` is the only route
in the repo with zero `export const metadata` — the comment in the file
even says it's "a minimal placeholder" (line 10). It silently inherits only
the root layout's generic default (`"Alyvon — Your AI workforce, department
by department."` / one generic description), meaning the actual homepage
has no page-specific SEO title or description of its own, unlike the other
8 routes which all correctly set one.

**No `metadataBase` set.** `app/layout.tsx`'s root `metadata` object has no
`metadataBase`. Next.js requires this to resolve relative/social image URLs
and otherwise falls back to `http://localhost` for any `openGraph`/`twitter`
image resolution and warns at build time — moot today only because there
are no OG images yet (see below), but it needs to be set before any are
added.

**Zero social-sharing metadata anywhere.** Across the root layout and all 8
page-level `metadata` objects, there is no `openGraph` key and no `twitter`
key at all (confirmed by grep — only `title`/`description` fields exist).
Any link to alyvon's site shared on Slack, LinkedIn, or X today would
render with no title card, no description, and no image.

**No `robots.ts`/`robots.txt` and no `sitemap.ts`/`sitemap.xml`.** Next.js
App Router supports generating both from `app/robots.ts` and
`app/sitemap.ts`; neither file exists anywhere in the repo, so there is no
explicit crawl policy and no generated sitemap for search engines to
discover the 9 routes.

**No favicon/icon files.** There is no `app/icon.*`, `app/favicon.ico`, or
`public/favicon.ico` — confirmed via `find . -iname "*favicon*"` returning
nothing and no `public/` directory existing at all. Browsers/search results
fall back to Next.js's unbranded default.

**No structured data.** No JSON-LD (`Organization`, `SoftwareApplication`,
`FAQPage`, etc.) is emitted anywhere, despite the Pricing page in
particular having an FAQ block (`components/ui/FAQAccordion`) that is a
natural `FAQPage` schema candidate.

**What's genuinely good:** the root layout's title template
(`title: { default: "...", template: "%s | Alyvon" }` in `app/layout.tsx`)
is wired correctly, and all 8 non-home pages set a page-specific
`metadata.title` that does *not* redundantly repeat "Alyvon" — exactly the
rule `CONVENTIONS.md` states ("title should NOT repeat 'Alyvon' — the root
layout template already appends it"). Spot-checked all 8: none violate it.

---

## 4. Performance considerations

**Font loading is undefined, not just unoptimized.** As noted in Code
Organization, `"Inter"` is declared in `tailwind.config.ts` but nothing
actually requests it — no `next/font/google`, no `<link>` to Google Fonts,
no self-hosted `@font-face`. Practically this means there's currently no
render-blocking web-font request (a small accidental win), but it also
means the fix, when it comes, should go through `next/font` specifically —
it self-hosts the font, subsets it, and inlines `font-display` handling
automatically, avoiding a layout-shift/blocking-request regression that a
plain Google Fonts `<link>` would introduce.

**No image pipeline exists yet, by necessity.** There is no `public/`
directory and zero usage of `next/image` or `<img>` anywhere in `app/` or
`components/` (confirmed by grep). Nothing to optimize today, but there's
also no established pattern yet — worth deciding on `next/image` as the
only sanctioned way to add images before the first one lands, rather than
after.

**Client-side JavaScript is kept deliberately small.** Every route in
`app/` is a Server Component by default (no page-level `"use client"`);
only `components/ui/FAQAccordion.tsx` and `components/ContactForm.tsx` opt
into client rendering, and both are narrow, leaf-level interactive pieces.
This is a real, working discipline (enforced by `CONVENTIONS.md`) that
keeps the shipped JS bundle small relative to the number of routes — worth
preserving as more pages are added.

**Global smooth-scroll with no reduced-motion guard.** `app/globals.css`
sets `html { scroll-behavior: smooth; }` unconditionally, with no
`@media (prefers-reduced-motion: reduce)` override. This isn't a heavy
performance cost by itself, but it is an unconditional motion effect
applied site-wide that ignores a user/OS-level preference — worth wrapping
in a reduced-motion media query.

**`next.config.mjs` is effectively empty.** It sets only
`reactStrictMode: true` — no `images` config (moot until images exist), no
`compress`/caching customization, no bundler analysis step. Nothing wrong
with shipping on defaults at this stage, but there's no perf budget or
Lighthouse/CI check anywhere in the repo (no `.github/workflows/`) that
would catch a regression as more pages and eventually images/fonts are
added.

**Static content, rendered eagerly.** Content-heavy pages (`app/pricing/page.tsx`,
`app/features/page.tsx`, `app/integrations/page.tsx`) render arrays of
FAQs/tiers/capabilities defined inline or pulled from `lib/site-data.ts`
directly in the Server Component with no pagination or lazy/`next/dynamic`
loading. At the current small scale (a handful of items per page) this is
the right amount of simplicity — flagged only so it doesn't get overlooked
if these lists grow substantially.

---

## Summary of highest-priority fixes

1. Open a PR merging `feat/marketing-pages` into `main` — the real site
   should not be indefinitely stranded on a feature branch.
2. Give every page a real `<h1>` (add a `level`/`as` prop to
   `SectionHeading`, or render a dedicated `<h1>` per page) — affects all 9
   routes today.
3. Fix the two `muted`/`accent`-on-light-background contrast failures
   quantified above, or introduce darker text-color tokens for small text.
4. Add a mobile navigation disclosure to `Navbar` — nav is currently
   unreachable below the `md` breakpoint.
5. Add `openGraph`/`twitter` metadata + `metadataBase` to `app/layout.tsx`,
   and add `app/robots.ts` + `app/sitemap.ts`.
