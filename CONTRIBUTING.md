# Contributing to the PARASOL website

## First time

```bash
git clone <this repository>
cd Parasol
npm ci
npx playwright install chromium
npm test
npm run dev
```

`npm test` runs every gate CI runs. A change that passes locally passes on the branch. Open `http://127.0.0.1:4173/` to look at the site.

If your clone lives under `~/Documents` and iCloud syncs it, read [Working in an iCloud-synced checkout](AGENTS.md#working-in-an-icloud-synced-checkout) first.

## Get the Decorator rules for your tool

The UC San Diego Decorator rules are in [CLAUDE.md](CLAUDE.md), [.cursorrules](.cursorrules), and [.github/copilot-instructions.md](.github/copilot-instructions.md). They are the same rules for three tools. The full skill lives in [`UCSD/decorator-kit`](https://github.com/UCSD/decorator-kit); install it as a Claude Code plugin or copy `skills/ucsd-decorator/` into `.claude/skills/`.

## The loop

1. Edit a page in `content/pages/`, or the navigation in `content/site.json`.
2. `npm run build && npm run validate`
3. Look at the page with `npm run dev`, at phone and desktop widths.
4. `npm test` before you push.

## Adding a page

1. Create `content/pages/<section>-<slug>.md` with the required frontmatter (copy a sibling page).
2. Add it to `content/site.json` under the section it belongs to. The validator fails on a page no menu lists.
3. Link to it from the section hub if readers should find it from there.

## Moving or renaming a documentation page

Update every link to it, its entry in `content/site.json`, and its `to` in `content/redirects/dsmlp-docs.json`. The validator checks all three, including `#fragment` links into the page.

## When the gate fails

Every finding names its rule and lands in `reports/validation.json`, `reports/accessibility.json`, or `reports/language.json`. Chrome failures need care: read [Page chrome is not content](AGENTS.md#page-chrome-is-not-content) before accepting anything.

## Never hand-edit

- `vendor/decorator-5/**`
- `config/chrome-contract.json` (use `npm run chrome:accept` after a human reads the diff)
- `config/chrome-selectors.json`
- `dist/**`

## Where the rest is written down

- [AGENTS.md](AGENTS.md) — information architecture, content rules, publishing, ownership
- [docs/content-governance.md](docs/content-governance.md) — what may be published
- [docs/voice-and-language.md](docs/voice-and-language.md) — how copy reads
- [docs/dsmlp-migration.md](docs/dsmlp-migration.md) — the DSMLP port and what remains before retiring the old site
- [docs/ux-agent.md](docs/ux-agent.md) — the weekly UX review agent
