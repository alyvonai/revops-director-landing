# Design System Notes — revops-director-landing

_Compiled: 2026-08-18_
_Author: Hugo, Engineering Director_

## How this was compiled

Before writing this file, I read the actual, current state of
`alyvonai/revops-director-landing` directly via the GitHub API rather than
assuming its contents. Specifically I read:

- `GET /repos/alyvonai/revops-director-landing` — repo metadata (default
  branch, size, language, visibility, last push).
- `GET /repos/alyvonai/revops-director-landing/branches` — full branch list.
- The recursive git tree for every branch (`GET
  /repos/alyvonai/revops-director-landing/git/trees/{sha}?recursive=1`) for
  `main`, `feat/revops-landing-page`, `docs/full-repo-audit`,
  `docs/code-organization-improvements`, `docs/accessibility-notes`, and
  `docs/readme-tech-stack`.
- The full contents of every file that tree listed:
  - `README.md` on `main` (113 bytes)
  - `README.md` on `docs/readme-tech-stack` (242 bytes — a variant of the
    same README with a "Tech Stack" section appended)
  - `AUDIT.md` on `docs/full-repo-audit` (9,226 bytes)
  - `IMPROVEMENTS.md` on `docs/code-organization-improvements` (6,008 bytes)
  - `ACCESSIBILITY_NOTES.md` on `docs/accessibility-notes` (4,970 bytes)

## Headline finding

**There is no landing page implementation in this repository yet, and
therefore no tech stack, design system, or component/file convention to
document from code.** This is not an assumption — it's directly verifiable:

- The repository's `size` field and its `language` field (`null`) indicate no
  detected source language.
- The full recursive tree of `main` (commit `6880f2c6e67a0376edc9f6da805e7481db457abd`)
  contains **exactly one blob**: `README.md`. There is no `package.json`, no
  `src/`, `app/`, `pages/`, or `components/` directory, no CSS/Tailwind
  config, no build config (`next.config.js`, `vite.config.ts`, etc.), no
  lockfile, and no `.github/workflows/` CI config anywhere in the tree.
- `README.md`'s entire content is two lines:

  ```
  # revops-director-landing
  Landing page for Alyvon's RevOps Director — AI-powered revenue operations specialist
  ```

- The repo has six branches today: `main`, `feat/revops-landing-page`,
  `docs/full-repo-audit`, `docs/code-organization-improvements`,
  `docs/accessibility-notes`, and `docs/readme-tech-stack`. `main` and
  `feat/revops-landing-page` point to the **identical commit** — despite its
  name, the feature branch carries zero additional commits. The four
  `docs/*` branches each add exactly one new markdown file on top of that
  same commit (or, in the case of `docs/readme-tech-stack`, a slightly
  expanded `README.md`); none of them add or modify any application code
  either.
- The four existing `docs/*` files were themselves written as honest audits
  of this same empty state — `AUDIT.md`, `IMPROVEMENTS.md`, and
  `ACCESSIBILITY_NOTES.md` each independently confirm, citing the same
  GitHub API calls, that no HTML/JS/TS/CSS exists to review. This document
  corroborates rather than contradicts them.

This file exists so that the *next* engineer or agent who opens this repo —
and any future re-run of this task — doesn't have to rediscover this from
scratch, and so no one mistakes the branch names (`feat/revops-landing-page`,
`docs/*`) for evidence that a design system or component library already
exists here.

## What is therefore NOT yet knowable from this repo

Because no code has landed, the following cannot be answered from repository
evidence today, and any answer would be fabrication:

- **Tech stack** — no framework (Next.js/Vite/Astro/plain HTML), no styling
  approach (Tailwind/CSS Modules/styled-components), no package manager, and
  no hosting/build config are declared anywhere in the tree.
- **Design system** — no design tokens, theme file, or CSS variables are
  committed. (`docs/readme-tech-stack`'s README explicitly states "Tech
  Stack: Not yet determinable — this repository currently contains only this
  README with no code or configuration files.")
- **Component conventions** — no components directory, no naming pattern, no
  example component exists to infer conventions from.
- **File/folder conventions** — no directory structure exists to reverse-engineer.

## What IS established and should govern the first implementation

While there's no code-derived convention yet, the ratified brand tokens for
this org (already authoritative, independent of this repo) should be the
starting point once implementation begins, rather than re-deriving colors
from scratch:

- Accent: `#DE4B12`
- Background: `#FFFFFF`
- Border: `#D8D6D7`
- Muted text: `#AEA8A8`
- Surface: `#F6F7F9`
- Rust/Orange accent: `#815445`
- Alt surface gray: `#EEEEEF`

One note carried over from `docs/accessibility-notes`'s
`ACCESSIBILITY_NOTES.md` and `docs/full-repo-audit`'s `AUDIT.md` (both read
above) is worth flagging here too: `muted_text` (`#AEA8A8`) on `#FFFFFF` or
`#F6F7F9` is a light gray-on-light combination that is very likely to fail
WCAG AA contrast (4.5:1) for body copy. Whoever implements the design system
should verify the actual computed contrast ratio before using `muted_text`
for anything beyond decorative/secondary labels, and should not treat its
presence in the brand canon as an accessibility clearance.

`docs/code-organization-improvements`'s `IMPROVEMENTS.md` also proposes a
directory convention to adopt at the first commit (routed pages under
`app/`, shared primitives under `components/ui/`, page sections under
`components/sections/`, copy/config under `content/`, utilities/tokens under
`lib/`, static assets under `public/`) — this is a proposal, not something
observed in code, and should be treated as a recommendation to ratify (or
override) when the first implementation PR is opened, not as an existing
convention.

## Recommendation

Treat this repository as pre-implementation. The next concrete engineering
step is standing up the actual landing page (framework choice, directory
structure, and the ratified brand tokens above wired in from the start) —
at which point this file should be revisited and replaced with real,
code-cited design-system documentation (actual component names, actual
token file paths, actual conventions in use).
