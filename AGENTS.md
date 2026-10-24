# Agent instructions for the PARASOL website

## Mission

Maintain an accessible, static website that is the one place to learn about and use PARASOL, UC San Diego's GPU and data science computing platform (formerly DSMLP). The site uses the UC San Diego Decorator shell, the TritonAI website's components and build tooling, and the full DSMLP documentation set, ported and renamed.

PARASOL is a rename, not a new service. Accounts, Datahub, hostnames, commands, and policies are unchanged. Content must never imply otherwise.

## Information architecture

The site drills down from framing to operations. Keep new pages in the level they belong to.

| Level | Section | Holds |
|---|---|---|
| 1 | Home (`/`) | What PARASOL is, how to reach it, and where to start |
| 2 | About (`/about/`) | Why PARASOL exists, the DSMLP rename, how the platform works |
| 3 | Get Started (`/get-started/`) | One guide per audience: course students, command line, instructors and TAs, projects, researchers, labs |
| 4 | Documentation (`/docs/`) | Technical reference by topic: access, workspaces and storage, running jobs, GPU access, environments, grading, reference |
| 5 | Support (`/support/`) | Contacts, consultations, ticket guidance |

Navigation is generated from `content/site.json`. Edit that file, never the rendered menus. Section order in the sidebar and the previous/next links on documentation pages both follow the order of `items` there.

## Content rules

- Every page is a Markdown file in `content/pages/` with the frontmatter the build requires: `title`, `path`, `description`, `lastReviewed`, `audiences`, `source`, `canonicalUrl`. Hubs add `landingHub: true`.
- Ported documentation pages carry `format: html` and `legacyUrl`. Their bodies are HTML so code blocks survive intact; edit them as HTML.
- `content/redirects/dsmlp-docs.json` maps every published DSMLP documentation address to its PARASOL page. Never move or delete a documentation page without updating it. `npm run validate` fails when a redirect points at a page that does not exist.
- Write PARASOL in prose. Keep `dsmlp` wherever it is literal: hostnames (`dsmlp-login.ucsd.edu`, `reserve.dsmlp.ucsd.edu`), commands, container labels, and system output. The validator fails on the old name in prose outside the pages that explain the rename.
- `site.json` carries `docsStatusNotice`, the draft banner every ported documentation page shows. Remove it only when the documentation owners clear the draft.
- Reusable public figures live in `content/facts/public-facts.json` with an owner, source, measurement period, and review date. A figure with `status: pending-announcement` comes from an unreleased announcement; do not publish the site anywhere public until the announcement is out or its owner approves.
- Keep official UCSD Decorator CSS and JavaScript linked to `https://cdn.ucsd.edu/`. `vendor/decorator-5/` is a pinned read-only reference copy; it is never served.
- Store PARASOL-owned images under `src/site/_images/`, site CSS and JavaScript under `src/site/_resources/`. Scope every CSS rule under `main#main-content`.
- Preserve semantic headings, alternative text, keyboard behavior, and metadata when editing pages.

## Voice

Full rules and before/after examples: [docs/voice-and-language.md](docs/voice-and-language.md). `npm run test:language` checks the mechanical ones.

- One idea per heading. No two-sentence headings.
- A heading names what the section contains. It is not a maxim.
- No count in a heading when the list is visible below it.
- No manufactured contrast: "X, not Y", "rather than", "instead of". Ported documentation uses contrast for technical precision; leave it unless the content owner asks.
- Four items maximum in a sentence-level list; more goes in a `<ul>`.
- Cut boosters (`practical`, `trusted`, `meaningful`, `seamless`, `leverage`).
- Em dashes only for a genuine aside or a numeric range. Never in a frontmatter `description`.

## Page chrome is not content

Every route shares one UC San Diego Decorator shell. Content goes in the canvas;
the shell around it is pinned and enforced.

**Writable canvas:** `main#main-content`. `renderGeneratedPage()` in
`scripts/build.mjs` injects only there.

**Protected chrome**, on every route: the skip link, the UC emergency container,
the title band, the mobile offcanvas drawer (including its search form), the
desktop navbar (including its search form and the mobile toggle), the footer,
and the TritonGPT widget loader. Run `npm run chrome:explain` for the selectors.

Four checks run inside `npm run validate` and fail the build:

- `chrome/consistent/*` — every route must carry identical chrome.
- `chrome/golden/*` — the chrome must match `config/chrome-contract.json`.
- `chrome/structure/*` — the chrome must satisfy the selector rules in
  `config/chrome-selectors.json`, derived from the pristine templates in
  `vendor/decorator-5/`, plus the site-specific rules in
  `config/chrome-selectors.local.json`.
- `chrome/styling/*` — no site-authored stylesheet or script may target the
  shell. See "The shell is not yours to style" below.

A golden mismatch is an intentional presentation change once a human has read
the diff: run `npm run chrome:accept` and commit the config diff alongside the
markup change. A structural violation is not acceptable that way —
`chrome:accept` refuses to run while one is outstanding, because regenerating
the golden would record the regression as the new baseline. Restore the markup
from `vendor/decorator-5/templates/` instead.

The full Decorator contract — protected-region markup, component extraction,
navigation, accessibility, security — lives in the `ucsd-decorator` skill in
[`decorator-kit`](https://github.com/UCSD/decorator-kit). Install it
as a Claude Code plugin, or copy `skills/ucsd-decorator/` into `.claude/skills/`
(untracked here). Read it before touching anything outside the canvas.

Two rules that cover how these regressions actually happen:

- **Never reconstruct chrome markup from a rendered DOM or a browser
  inspection.** Read the source file or the vendor template. The offcanvas
  drawer is cloned at runtime by `src/site/_resources/js/site-navigation.js`, so
  the live DOM contains navigation markup that exists in no file.
- **If a task appears to require a chrome change, stop and say so.** Do not
  reshape the shell to make a content change fit.

### The shell is not yours to style

CSS and JavaScript for `main#main-content` are the point of this repository.
Write as much of both as the work needs. The shell is different: it arrives
styled and scripted from `cdn.ucsd.edu`, including responsive behavior that an
override in this repository will not follow.

The Decorator's `base.min.js` runs `toggleIdsAndClassesBasedOnScreenWidth()` on
load and on every resize. Below 768px it renames the drawer search panel from
`#search-m` to `#search` and the term input's class and name from
`search-term-m` to `search-term`; above 768px it puts them back. Its own
stylesheet then styles the drawer search through
`.offcanvas > ul.nav.navbar-nav.navbar-right #search`. That id is the hook. None
of it is visible from `vendor/decorator-5/`, which pins templates and `base.css`
but not the CDN scripts.

So `chrome/styling/*` fails the build on:

- a selector in `src/site/_resources/css/*.css` that targets a protected token —
  every class and id that appears inside a chrome region on a built page and
  nowhere inside the canvas, derived on each run, plus the campus-widget ids in
  `config/chrome-styling.json`;
- an id rewrite (`removeAttribute("id")`, `setAttribute("id", …)`, `.id =`) in a
  script under `src/site/_resources/js/` that references the shell.

A token the canvas also uses is a shared Bootstrap primitive and is not
protected, so a content component adopting `.dropdown` releases it without
anyone editing a list.

`npm run test:a11y` additionally asserts the rendered result at both viewports:
below 768px the drawer search panel is `#search`, laid out, and at least 49px
tall; above it the panel is `#search-m` and hidden. A markup-only check cannot
see either failure — all three chrome regressions that reached TritonAI production
in 2026 passed tiers 1 through 3 with a green build.

If a rule genuinely repairs layout rather than restyling the shell, add it to
the `allow` list in `config/chrome-styling.json` with a reason and a `reviewOn`
date. The exception stops applying on that date and reports itself. An agent may
not add one on its own — ask the content owner, quote the rule, and wait.

### If the gate fails

Every failure names its rule. Read the prefix first — it determines what to do,
and two of the three cannot be cleared by regenerating anything.

**`chrome/structure/…`** — the chrome no longer matches the published Decorator.
This is the one that catches a removed search form, an altered widget embed, a
toggle stripped of its icon. `npm run chrome:accept` refuses while one is
outstanding. Restore the markup from the file named in the `Derived from:` line,
usually under `vendor/decorator-5/templates/`. Do not hand-write a replacement
from memory and do not copy it out of a browser.

**`chrome/consistent/…`** — one route's chrome drifted from the rest. The
message names a reference route that still has it right; make the odd one match.
Every PARASOL page is generated from `src/site/_shell.html`, so drift usually
means a build step touched one route's shell; fix the step rather than the page.

**`chrome/styling/…`** — a site stylesheet or script reached into the shell. The
message names the file, the line, and which protected tokens the selector hit.
`npm run chrome:accept` refuses while one is outstanding, because the golden
records markup and the markup is fine. Move the rule inside `main#main-content`,
or delete it and let the Decorator's own stylesheet render the region.

**`chrome/golden/…`** alone, with neither of the above — the shared chrome moved
away from `config/chrome-contract.json`. This is the only failure that can be a
legitimate change: a footer link renamed, a title band adjusted. If a human has
read the diff and wants it:

```bash
npm run chrome:accept
```

Commit the `config/chrome-contract.json` diff in the same change as the markup.
The stored tree keeps that reviewable — the diff shows the node and attribute
that moved, not a hash. An agent may not decide this on its own. Ask the content
owner, quote the diff, and wait for an explicit yes before accepting.

Two things that are never the answer: editing `config/chrome-selectors.json`,
which is generated by `npm run sync:decorator` and overwritten on the next sync,
and adding an entry to `config/chrome-selectors.overrides.json` to silence a
rule. Overrides record a deliberate, dated decision not to adopt an upstream
change, and they expire. They are not a way to pass a build.

Reproduce locally without the full suite:

```bash
npm run build && npm run chrome:check
npm run chrome:explain   # what is protected, and where the canvas starts
```

## Functional integrations

Do not remove the UCSD emergency broadcast, hosted search API, or TritonGPT widget without explicit approval.

Site search answers the "This Site" scope locally. `src/site/_resources/js/site-search.js` reads `dist/_data/search-index.json`, which the build writes from page content, and wraps the hosted `search()` function so every other scope still reaches the campus search API. When PARASOL gets a production hostname and a hosted search collection, decide whether to keep the local index.

Analytics is off until PARASOL has its own measurement ID. Set `analytics.googleAnalyticsId` in `content/site.json`; the build injects the tag and the validator checks it. Never borrow another site's ID.

`content/site.json` `origin` is the proposed production hostname (`https://parasol.ucsd.edu`). It is not provisioned. Canonical URLs, JSON-LD, and the sitemap read it from there.

## Required validation

Run both deployment modes before proposing a change:

```bash
npm test
SITE_BASE_PATH=/Parasol npm run build
SITE_BASE_PATH=/Parasol npm run validate
```

`npm test` runs the unit tests, the build, the validator, the browser accessibility gate (axe at 390px and 1440px on every route, plus navigation and drawer-search interaction checks), and the language check. The validator also resolves every internal link and every `#fragment`, so a renamed heading id breaks the build until its links are updated.

Set `VALIDATE_OFFLINE=1` to skip the remote CDN reachability checks when working without a network.

Automated checks do not replace visual, keyboard, focus, zoom/reflow, and screen-reader spot checks for components you add or change.

## Working in an iCloud-synced checkout

This folder lives under `~/Documents`, which iCloud may sync and evict. `node_modules/` and `dist/` carry the `com.apple.fileprovider.ignore#P` attribute so they stay local, and the build empties `dist/` instead of deleting it so the attribute survives. If a build or `npm ci` slows to minutes, re-apply it:

```bash
xattr -w 'com.apple.fileprovider.ignore#P' 1 node_modules dist
```

## Publishing

GitHub Pages is the review destination until PARASOL has a campus home.

| Branch | Publishes to |
|---|---|
| `main` | GitHub Pages, as a `noindex` review build |
| pull requests | Validation only |

Keep generated `dist/` files out of commits; GitHub Actions builds them. After pushing, confirm the run rather than assuming it passed:

```bash
gh run watch --exit-status
```

Report the published URL when it succeeds, or the failing rule when it does not. **Publishing is a human decision**: an agent pushes to `main` only when asked. Never deploy anywhere else, and do not add deployment integrations.

### Commit identity

Never pass `-c user.name` or `-c user.email` to `git commit`. Let the repository and global git config apply.

## Edit ownership

### Machine-owned (never hand-edit)
- `vendor/decorator-5/**` — written by `npm run sync:decorator`
- `config/chrome-contract.json` — written by `npm run chrome:accept`
- `config/chrome-selectors.json` — written by `npm run sync:decorator -- --derive`
- `dist/**` — written by `npm run build`

### Human-owned (ask before editing, and never publish unasked)
- `content/pages/about-why-parasol.md` — announcement framing and capacity figures
- `content/facts/public-facts.json` — public figures and their release status
- `content/site.json` `docsStatusNotice` — the documentation draft banner

### Shared (the content owner sees the rendered page before it is published)
- `content/pages/home.md`, `about-landing.md`, `get-started-landing.md`, `docs-landing.md`, `support-landing.md` — the hubs
- Ported documentation under `content/pages/docs-*.md`, `get-started-*.md`, and `about-how-parasol-works.md` — owned by the Datahub documentation team

## Conflict prevention

- Check open pull requests and recent commits before starting.
- Never edit the same section a human is editing.
- Use HTML comment markers to identify agent-editable blocks:
  `<!-- AGENT_SECTION: name -->` ... `<!-- END_AGENT_SECTION -->`. The UX review agent (`docs/ux-agent.md`) edits only inside markers listed in `config/ux-agent.json`.
