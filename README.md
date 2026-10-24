# PARASOL website

PARASOL (Platform for Applied Research, Analytics, Science and Open Learning) is UC San Diego's GPU and data science computing platform for coursework, student projects, and research. It is the new name for the Data Science and Machine Learning Platform (DSMLP).

This repository is the one-stop site for PARASOL. It replaces the DSMLP documentation site at `dsmlp-docs.ucsd.edu` and carries every page of it, renamed and reorganized, alongside new pages that explain what PARASOL is and who it serves.

It is built on the TritonAI website's design and tooling: the UC San Diego Decorator shell from `cdn.ucsd.edu`, the TritonAI landing-hub components, and the same build, validation, chrome-integrity, accessibility, language, and UX-review gates.

## Information architecture

The site drills down from framing to operations:

1. **Home** — what PARASOL is, how to reach it, where to start
2. **About** — why PARASOL exists, the DSMLP rename, how the platform works
3. **Get Started** — one guide per audience
4. **Documentation** — technical reference in seven topics
5. **Support** — contacts, consultations, and ticket guidance

## Layout

- `content/pages/` — every page, as Markdown with frontmatter. Ported documentation pages have HTML bodies (`format: html`).
- `content/site.json` — site name, proposed origin, support address, draft banner, and the navigation tree that drives the menus, sidebar, breadcrumbs, and previous/next links.
- `content/redirects/dsmlp-docs.json` — every DSMLP documentation URL and the PARASOL page that replaces it.
- `content/facts/public-facts.json` — public figures with source, owner, and release status.
- `src/site/_shell.html` — the Decorator page shell every page is generated into.
- `src/site/_resources/` — site CSS and JavaScript. `parasol.css` styles the documentation; `site-search.js` answers "This Site" searches.
- `scripts/` — build, validate, chrome contract, accessibility, language, Decorator sync, UX agent.
- `vendor/decorator-5/` — pinned reference copy of the Decorator templates. Never served.

## Local development

```bash
npm ci
npx playwright install chromium
npm test
npm run dev
```

Open `http://127.0.0.1:4173/`. Node 22 or newer.

To reproduce the GitHub Pages build:

```bash
SITE_BASE_PATH=/Parasol npm run build
SITE_BASE_PATH=/Parasol npm run validate
```

## Publishing

A push to `main` validates the site and publishes it to GitHub Pages as a `noindex` review build. Pull requests validate without publishing. See [AGENTS.md](AGENTS.md#publishing).

## Before this goes live

- The production hostname in `content/site.json` (`parasol.ucsd.edu`) is proposed, not provisioned.
- PARASOL has no analytics ID or hosted search collection yet.
- The GPU expansion figures come from an announcement draft dated 2026-10-28. See [content governance](docs/content-governance.md#announcement-figures).
- Retiring `dsmlp-docs.ucsd.edu` needs server-side redirects built from `content/redirects/dsmlp-docs.json`. See [the migration record](docs/dsmlp-migration.md).

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Agents read [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md).
