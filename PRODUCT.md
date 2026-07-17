# Product

## Register

brand

## Users

Developers and small engineering teams who already ship static builds (Vite apps,
Docusaurus/VitePress docs, Storybooks, AI-generated apps and internal tools) to
GitHub Pages / Netlify / Cloudflare Pages, and have hit the wall where they need
auth, a reverse proxy to a private API, server-side form/pipeline handling, RBAC,
or custom domains — without standing up and maintaining a real backend. They are
technical, skim-reading, and evaluating whether BFFless (self-hosted, source-available)
is worth adopting. Context: scanning the landing page on the way to the docs/GitHub.

## Product Purpose

BFFless is "GitHub Pages with auth, a proxy, and a BFF" — a self-hostable static
hosting platform that wraps an immutable static deploy with SSO/RBAC, a CORS-free
reverse proxy, no-code pipelines, and storage adapters. The landing page's job is to
make a technical visitor immediately understand that one-line value prop, trust that
the stack is real and readable (not vaporware), and move them to the primary action:
self-host / read the quickstart / view source on GitHub. Success = a developer leaves
convinced this solves the "static site that needs a backend" problem and takes the
next step.

## Brand Personality

Editorial, technical, candid, confident. Voice of an engineer who has built the thing
and will show you the seams rather than market at you ("the seams visible", "boring on
purpose", "14 lines. That's the integration."). Reads like a well-set technical
specimen sheet — print-shop precision, monospaced annotations, figure captions — not a
hype SaaS page. Emotional goal: earned trust and "oh, this is actually real."

## Anti-references

- Generic SaaS-cream landing pages: gradient hero, hero-metric template (big number +
  small label + gradient accent), identical icon-heading-text card grids.
- Over-marketed hype pages with vague benefit copy and stock-photo developers.
- The reflexive "AI-templated" cadence: a tiny uppercase tracked eyebrow + numbered
  marker above *every* section. The editorial label system here is deliberate brand
  voice, but it must be used as an accent where it carries real information (figure
  captions, episode counts, a genuine numbered sequence), NOT as mandatory grammar on
  every section.

## Design Principles

- **Show the seams.** Lead with real architecture, real config, real stack names.
  Concrete specifics out-convert adjectives for this audience.
- **One clear next step.** Many links are fine, but the primary action (self-host /
  quickstart) must be visually dominant and unambiguous on every fold.
- **Editorial voice, not editorial reflex.** Keep the specimen-sheet aesthetic; spend
  the numbered/eyebrow labels only where they inform. Vary section cadence so the page
  reads as composed, not templated.
- **Legible at every width.** Wide diagrams must degrade gracefully on mobile (scroll,
  stack, or simplify) — never squish to illegibility or cause horizontal overflow.
- **Respect the skim.** A technical visitor scans; hierarchy, contrast, and pacing must
  reward fast reading.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Body and label text must meet 4.5:1 (the 10px mono labels at
~3.7:1 are a known failure to fix). Respect `prefers-reduced-motion` for any added
motion. Maintain visible focus states and keyboard operability for the video showcase,
nav, and modals. No information conveyed by color alone (e.g. comparison-table dots
need a non-color cue).
