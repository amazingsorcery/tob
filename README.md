# TOB

A small static site that publishes long-form writing from Markdown, with server-rendered maths.

Each work in `content/works/*.md` becomes its own set of pages: a table of contents and one page per chapter, all generated at build time. There's no database, no auth and no client-side data fetching.

## Features

- **Markdown to static pages.** A `#` heading starts a chapter; everything before the first one is front matter. A test checks that every file in `content/works/` follows that rule, so a malformed document fails the build instead of rendering as one big block.
- **Maths rendered at build time** with KaTeX (`remark-math` + `rehype-katex`). The KaTeX stylesheet only loads on works that contain maths.
- **Reading-focused typography.** Serif body text, a narrow measure, chapter navigation, wide tables and long equations scroll inside their own container.
- **Accessible colours.** `app/tokens.css` holds the design tokens plus a contrast table, and `app/tokens.contrast.test.ts` recomputes every WCAG ratio from the token values.
- **Print stylesheet** for printing a chapter on paper.
- **Machine-readable licence** on every page: JSON-LD, `<link rel="license">` and `/llms.txt`.

## Stack

Next.js 15 (App Router, static generation), React 19, TypeScript, Tailwind CSS v4, react-markdown with remark-gfm / remark-math / rehype-katex / rehype-slug, Vitest and Playwright. Deployed as a Docker image behind Caddy.

## Running locally

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. To add a work, drop a Markdown file into `content/works/`.

| Command | What it does |
| --- | --- |
| `pnpm build` | Static production build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | End-to-end tests (Playwright) |

## Deployment

`Dockerfile`, `docker-compose.prod.yml` and `infra/` contain a two-container setup (Next.js + Caddy with automatic HTTPS) for a single VPS. `infra/bootstrap.sh` prepares a fresh server and `infra/deploy.sh` builds and swaps in a new version, keeping the previous one for rollback.

Site name, author and domain live in `config/brand.ts`.

## License

- Code: MIT (see `LICENSE`).
- The works in `content/works/` are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
