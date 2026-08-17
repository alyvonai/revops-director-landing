# Code Organization Improvements — revops-director-landing

## Repo audit finding (read this first)

Before proposing improvements, I checked out the actual current state of
`alyvonai/revops-director-landing` rather than assuming it. The repository
contains **exactly one file, `README.md`**, and no application/landing-page
code has been committed to any branch yet. I verified this across all three
branches that exist:

- `main` (tip `6880f2c`) — tree contains only `README.md`.
- `feat/revops-landing-page` (same tip `6880f2c` as `main`) — identical, only `README.md`.
- `docs/readme-formatting-fix` (tip `f3e8cff`) — a formatting-only edit to `README.md`, still the only file.

The full, current content of `README.md` (113 bytes) reads:

> `# revops-director-landing`
> `Landing page for Alyvon's RevOps Director — AI-powered revenue operations specialist`

There is no `src/`, `pages/`, `components/`, `public/`, `package.json`,
build config, or styling file anywhere in the repo. This means there is no
*existing* code organization to critique — the branch name
`feat/revops-landing-page` shows the build is intended but hasn't started.

In the interest of not fabricating a codebase that doesn't exist, the three
improvements below are framed as **conventions to lock in before the first
real commit lands**, so the structure doesn't have to be retrofitted once
components, copy, and pricing data start accumulating. This is the most
useful and honest form "code organization improvements" can take for a repo
at this stage, and each one is grounded in what `README.md` actually says
about the page's purpose plus Alyvon's existing multi-department product
shape (16 departments, of which RevOps Director is one).

## Three concrete improvements

### 1. Decide the component/section directory layout now, not after the first PR

`README.md` describes this as a single department landing page
("RevOps Director"), and Alyvon has 16 departments total — several of which
will likely get their own near-identical landing page repos (this repo's own
naming pattern, `revops-director-landing`, implies a template that will be
reused, e.g. `marketing-ops-director-landing`). If each one improvises its
own folder layout independently, they'll drift and become hard to
maintain as a set. Concretely: commit a skeleton (even before real content)
of `src/components/` for shared, reusable UI primitives, `src/sections/` for
page-specific sections (Hero, Pricing, FAQ, CTA), and `src/lib/` for
non-visual logic — and document that layout at the top of `README.md` itself,
since `README.md` is currently the only artifact anyone reviewing the repo
will see.

### 2. Put pricing/plan copy in one typed data file, not scattered in JSX/markup

Alyvon's pricing has several tiers with numbers that change over time
(Starter $299/mo, Growth $899/mo, Scale $2,400/mo, Enterprise custom-priced —
per the ratified plan facts this repo will need to render). The single
highest-leverage organizational decision available before any component code
exists is to require that plan names, prices, deliverable counts, and seat
counts live in one file (e.g. `src/data/plans.ts`) that components import,
rather than being hard-coded inline in a Pricing component. This is cheap to
enforce now (one line in a contributing note) and expensive to retrofit once
three or four components each have their own copy of "$899/mo" typed by hand.

### 3. Add a minimal CI/lint gate in the same PR that adds the first real code

There is currently no `package.json`, linter config, or CI workflow in the
repo, so nothing will catch inconsistent formatting, dead code, or an
accidental hard-coded secret once real commits start landing on
`feat/revops-landing-page`. Rather than waiting until the page is "done" to
add tooling, the first commit that adds actual source files should also add
a lightweight `.github/workflows/ci.yml` (lint + build) and an `.editorconfig`
or Prettier config. This keeps the repo's code organization enforced
mechanically from commit one instead of relying on manual review discipline
across what will likely become several near-identical department-page repos.

## Why this matters now

Because this repo is pre-code, the cost of making these three decisions
today is close to zero. The cost of making them after the first 500-line
Pricing/Hero/FAQ component lands — once folder layout, data shape, and
tooling habits are already set by precedent — is much higher, especially if
this repo becomes the template other department landing pages are copied
from.
