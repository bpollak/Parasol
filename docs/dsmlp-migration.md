# DSMLP documentation migration

PARASOL replaces the DSMLP documentation site. This page records what was ported, how the rename was applied, and what has to happen before `dsmlp-docs.ucsd.edu` can be retired.

## Source

- Site: `https://dsmlp-docs-preview.ucsd.edu/`, the staging build of `https://dsmlp-docs.ucsd.edu/`
- Build date: 2026-09-29 (the `lastmod` on every sitemap entry)
- Source repository: `github.com/ucsd-ets/dsmlp-docs-public` (MkDocs). The preview build was ahead of the repository's `main` branch: it already had *GPU Hardware & CUDA* and *Workloads by GPU Class*, so the rendered site was used as the source.
- Ported: 2026-10-24, with `scripts/port-dsmlp-docs.mjs`

All 51 sitemap URLs are accounted for: 49 content pages, the documentation index (now `/docs/index.html`), and search (now `/search/index.html`). `content/redirects/dsmlp-docs.json` lists every one. Five images under `/images/` were copied to `src/site/_images/docs/`.

## Where pages went

| DSMLP | PARASOL |
|---|---|
| `/` (documentation index) | `/docs/index.html`, rewritten as a hub |
| `/overview/` | `/about/how-parasol-works.html` |
| Six audience pages (`/student-in-a-course/` and the rest) | `/get-started/<same-slug>.html` |
| Seven topic sections (`/access/` and the rest) | `/docs/<section>/index.html` |
| Topic pages (`/gpu-access/reservations/` and the rest) | `/docs/<section>/<page>.html` |

Heading ids were kept, so a deep link such as `/gpu-access/reservations/#the-claim-window` maps to `/docs/gpu-access/reservations.html#the-claim-window`.

## What the port changed

- **Name.** "DSMLP", "Datahub and DSMLP", and "Data Science & Machine Learning Platform (DSMLP)" became PARASOL in prose. Code blocks, inline code, hostnames, and system output were not touched; they still say `dsmlp` because the systems still do. Three titles changed: *Overview* became *How PARASOL Works*, *Teaching with Datahub and DSMLP* became *Teaching with PARASOL*, and *Research on DSMLP* became *Research on PARASOL*.
- **Glossary.** PARASOL has its own entry, and DSMLP is listed as the former name.
- **Markup.** MkDocs callouts became Decorator alerts (`alert-warning`, `alert-info`); tables gained Bootstrap table classes and a scrollable, keyboard-focusable wrapper; the per-heading ¶ anchors and the "Report a problem" links were dropped.
- **Navigation.** The old per-page "On this page" sidebar is now an "On this page" list at the top of long pages, generated from the page's own headings. The sidebar carries site navigation, and each documentation page ends with previous and next links within its section.
- **Draft banner.** The DSMLP site's draft notice appears on every ported page from `docsStatusNotice` in `content/site.json`.
- **Descriptions.** The DSMLP site used one generic meta description everywhere. Each page now has its own, taken from its first paragraph and shortened where search results would truncate it.

## New pages

Home, About, *Why PARASOL*, *From DSMLP to PARASOL*, Get Started, the Documentation hub, and Support were written for this site. *Why PARASOL* and the home page draw on the Halıcıoğlu School announcement draft dated 2026-10-28. Quotes and the unfinished demand projection in that draft were left out.

## Before retiring dsmlp-docs.ucsd.edu

1. Give PARASOL a production hostname and update `origin` in `content/site.json`.
2. Configure server-side 301 redirects from every `from` URL in `content/redirects/dsmlp-docs.json` to `origin` + `to`.
3. Re-port anything the Datahub team changed on the DSMLP site after 2026-09-29 (see the header of `scripts/port-dsmlp-docs.mjs`).
4. Point the reservation app, Datahub, course templates, and the ITS knowledge base at the new pages.
5. Decide who owns the ported documentation going forward, and whether its GitHub issue templates move here.
