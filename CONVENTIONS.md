# Marketing pages — conventions

This PR adds 8 new marketing pages to the Alyvon RevOps Director landing site:
Pricing, Features, Case Studies, Integrations, Security, About, Careers, Contact.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS. No other UI library.

## File layout

Each page lives at `app/<slug>/page.tsx` and exports a default React Server
Component (no `"use client"` at the page level — only leaf components that
need interactivity, e.g. `FAQAccordion`, are client components).

```
app/<slug>/page.tsx        # the page itself, composed from <Section> blocks
```

Every page:
1. Imports `Section`, `Container` (via Section), `SectionHeading`, `Button`,
   `Card`, `Badge`, `StatPill`, `FAQAccordion` from `@/components/ui/*` —
   reuse these, do not create parallel one-off primitives.
2. Sets `export const metadata: Metadata = { title: "...", description: "..." }`
   for SEO (title should NOT repeat "Alyvon" — the root layout template
   already appends " | Alyvon").
3. Alternates `surface` on consecutive `<Section>`s (`background` →
   `surface` → `background` → `altsurface` ...) so sections read as distinct
   blocks without needing extra borders.
4. Pulls every reusable fact (pricing, specialist/department counts,
   integration count, nav links) from `@/lib/site-data.ts` — never hardcode a
   number that already exists there. If a page needs new structured data
   (e.g. a list of integration categories), add it to `site-data.ts` rather
   than inlining a literal array in the page file.
5. Uses the brand tokens only via Tailwind classes already wired in
   `tailwind.config.ts` (`accent`, `rust`, `surface`, `altsurface`, `muted`,
   `border`, `ink`) — never hardcode a hex value in a component.
6. Ends with a closing CTA section driving to `/contact` (mirrors the
   Navbar's "Start free trial" pattern) unless the page's job is Contact
   itself.

## Copy ground rules (do not violate)

- **Never invent a dollar figure for the Enterprise plan.** It is
  "Custom pricing" — CTA to Contact/Sales only.
- **Never say "117 specialists."** The confirmed count is 102 specialists
  across 16 departments.
- **Use "1,000+ MCP integrations"** (confirmed underlying count is 1,068).
- **Case Studies:** the company is pre-revenue with no named customers yet.
  Do NOT invent a fake company name, logo, or testimonial presented as a
  real customer — that is fabricated social proof. Instead frame entries as
  illustrative scenarios ("Illustrative scenario — agency, 40 employees")
  showing what deploying Alyvon looks like for a given archetype (agency,
  SaaS team, professional services firm), clearly labeled as illustrative.
- **About:** do not invent named "real" founder/team bios presented as fact.
  Write about mission, story, and how the company works in role terms
  ("a small, senior team of operators and engineers") rather than fabricated
  named individuals.
- **Careers:** the team is very small and not actively running open
  requisitions. Do not invent fake job listings. Build an honest "no open
  roles right now — here's what we look for and how to stay in touch" page
  with a genuine expression-of-interest CTA to `/contact`.
- **Security:** do not claim a compliance certification (e.g. "SOC 2
  certified") that isn't confirmed. Describe real practices instead:
  encryption in transit/at rest, least-privilege access, human-in-the-loop
  approval gates before any external send/publish action, and BYOK
  (Bring Your Own Anthropic API Key) as an Enterprise-only option.

## Adding a page checklist

- [ ] `app/<slug>/page.tsx` created, default-exported, has `metadata`.
- [ ] Composed entirely from `Section` + shared `ui/*` components.
- [ ] No hardcoded hex colors, no hardcoded pricing/proof numbers.
- [ ] Linked from `primaryNav` or `footerNav` in `lib/site-data.ts` if it
      should appear in navigation (Pricing, Features, Integrations,
      Case Studies, Security are in `primaryNav`; About, Careers, Contact
      are in `footerNav`).
