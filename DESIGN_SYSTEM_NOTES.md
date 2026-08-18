# Design System Notes — `revops-director-landing`

**Investigation date:** 2026-08-18
**Method:** Read the live repository directly via the GitHub API — a full recursive tree listing of the `main` branch, the contents of every file that tree contains, and the repo's open pull request list — rather than assuming stack/conventions from the repo name or from other Alyvon repos.

## Headline finding: there is no tech stack, design system, or component convention to document yet

A recursive tree read of `main` (commit `6880f2c6e67a0376edc9f6da805e7481db457abd`, `truncated: false`) returns **exactly one file in the whole repository**:

```
README.md   (113 bytes)
```

There is no `package.json`, no framework config (no Next.js/Vite/CRA config, no `next.config.*`, no `tailwind.config.*`), no `src/`, `app/`, or `components/` directory, no CSS/SCSS, no design-token file, no lockfile, and no CI config. In other words: **`revops-director-landing` is currently an unbuilt scaffold, not a working site.** Any "conventions" a future contributor might infer from this repo alone would be invented, not observed — so this document records the actual (empty) state rather than fabricating a stack.

### `README.md` — full contents (read via `GITHUB_GET_RAW_REPOSITORY_CONTENT`)

```
revops-director-landing
Landing page for Alyvon's RevOps Director — AI-powered revenue operations specialist
```

That is the entire file. It has no setup instructions, no stack declaration, and no design guidance.

## Open pull requests against this repo (read via `GITHUB_LIST_REPOSITORY_ISSUES`, `state=open`)

As of this investigation, `main` has **9 open, unmerged pull requests**, none of which have landed — which is why the tree above still shows only `README.md`. Listed here so the next contributor doesn't duplicate effort or assume any of these represent ratified convention (none has been merged/reviewed):

| PR | Title |
|----|-------|
| #14 | chore: README verification test 2 for commit_files_to_github fix |
| #13 | docs: accessibility audit of homepage markup (corrected) |
| #12 | docs: full engineering audit (code org, accessibility, SEO, performance) |
| #11 | feat: add 8 new marketing pages (Pricing, Features, Case Studies, Integrations, Security, About, Careers, Contact) |
| #10 | docs: add design system notes from repo investigation |
| #9 | docs: full repo audit (code organization, accessibility, SEO, performance) |
| #8 | docs: accessibility notes for main page markup |
| #7 | docs: propose code organization improvements (IMPROVEMENTS.md) |
| #6 | docs: add Tech Stack section to README |

Notably, **PR #10 previously attempted the exact task this document also covers** ("add design system notes from repo investigation"). This PR is a fresh, independent pass at the same investigation, not a copy of #10's content — both should be reconciled/deduplicated by a human reviewer before either merges. PR #11 is the only PR proposing actual page code; since it's unmerged, no component or file convention from it should be treated as established yet either.

## Relevant org context (outside this repo, cited for the next builder — not presented as this repo's convention)

Checking the other repositories owned by `alyvonai` (via `GITHUB_LIST_REPOSITORIES_FOR_THE_AUTHENTICATED_USER`) turned up a sibling, actively-built repo that is the closest existing precedent for what this landing page should probably look like:

- **`alyvonai/alyvon-marketing-site`** — description: *"Alyvon marketing site (www.alyvon.com) rebuild - Next.js/Tailwind/shadcn, per spec-2-marketing-site"*. This is Alyvon's main marketing site, built with **Next.js + Tailwind CSS + shadcn/ui**, and is the org's real, in-production frontend stack.

Since `revops-director-landing` is a landing page for one of Alyvon's specialist products (the RevOps Director) and has no stack of its own yet, **the most defensible default is to mirror `alyvon-marketing-site`'s Next.js/Tailwind/shadcn stack** for consistency across Alyvon's web properties, rather than introducing a third, unrelated stack. This is a recommendation for whoever scaffolds this repo next, not a claim that this repo already does this.

## Ratified brand tokens to use once building starts

These come from Alyvon's ratified brand canon (not from anything found in this repo, since this repo has no design tokens of its own):

- Accent: `#DE4B12`
- Background: `#FFFFFF`
- Border: `#D8D6D7`
- Muted text: `#AEA8A8`
- Surface: `#F6F7F9`
- Alt surface (gray): `#EEEEEF`
- Secondary accent (rust/orange-brown): `#815445`

## Recommendations for the next PR that actually builds this page

1. **Resolve the duplicate doc PRs first** (#6, #7, #8, #9, #10, #12, #13 all propose overlapping audits/notes on a repo that has no code yet). A maintainer should close or consolidate these before more exploratory PRs pile up.
2. **Pick one scaffold** — recommended: Next.js (App Router) + Tailwind CSS + shadcn/ui, matching `alyvon-marketing-site`, initialized fresh since nothing exists yet.
3. **Wire in the ratified brand tokens above** as Tailwind theme values / CSS variables from the first commit, rather than letting each contributor pick ad hoc colors.
4. **Do not merge PR #11's 8 pages** (or any other feature PR) until a base scaffold and design tokens exist to build them on top of — right now there is no `app/`, `components/`, or Tailwind config for that PR to extend.

## Sources actually read for this document

- `GITHUB_GET_A_TREE` (recursive) on `alyvonai/revops-director-landing@main`
- `GITHUB_GET_A_REFERENCE` on `heads/main`
- `GITHUB_GET_RAW_REPOSITORY_CONTENT` for `README.md`
- `GITHUB_LIST_REPOSITORY_ISSUES` (`state=open`) on `alyvonai/revops-director-landing`
- `GITHUB_LIST_REPOSITORIES_FOR_THE_AUTHENTICATED_USER` (to check sibling `alyvonai` repos for precedent)
