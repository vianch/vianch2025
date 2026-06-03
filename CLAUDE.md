# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and photography website (vianch.com). Built with Next.js 15 App Router, React 19, TypeScript. Deployed on Vercel.

## Commands

```bash
yarn dev              # Start dev server (localhost:3000)
yarn build            # Production build
yarn lint             # Run all linters (ESLint + Prettier + Next lint)
yarn lint:code-style  # ESLint only (--fix)
yarn lint:formatting  # Prettier only (--write)
yarn lint:next        # Next.js lint only
yarn init             # Clean install (removes lockfiles, runs yarn install)
```

**Pre-commit hook:** runs `lint-staged` (ESLint --fix + Prettier on staged files).
**Pre-push hook:** runs `yarn audit`.

No test framework is configured.

## Environment Variables

Copy `.env-example` to `.env.local`. Required:

- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT_ID` — Contentful CMS
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — Upstash Redis cache
- `NEXT_PUBLIC_SITE_URL`, `VERCEL_URL` — Site URL for SEO/API calls

## Architecture

### Data Flow

Content lives in **Contentful CMS**, fetched via **GraphQL** (`graphql-request`). An **Upstash Redis** cache (singleton `RedisService`) sits in front, with 24h TTL. The pattern is: check Redis cache → miss → query Contentful → store in Redis → return.

### Layers

- **`lib/datalayer/`** — Core services: `contentful.service.ts` (GraphQL fetching, error handling, cache headers) and `redis.service.ts` (singleton Redis client with retry logic)
- **`lib/api/`** — Client-side API wrappers (`fetchApi` calls internal `/api/v1/` routes): `blog.ts`, `gallery.ts`, `client.ts`
- **`lib/constants/`** — All shared static content and configuration: Contentful config, SEO defaults (`seo.constants.ts`), UI config (`ui.constants.ts`, including Open Graph image size/type), and page content such as `about.constants.ts` (every About-page copy block, dataset, and timing value)
- **`lib/utils/`** — Pure shared helpers: date formatting, image processing, SEO metadata generation, URL helpers (`url.utils.ts`, including `getHostname`)
- **`app/components/icons/`** — Reusable single-purpose SVG icon components (one per file, e.g. `GitHub.tsx`, `Mail.tsx`, `Camera.tsx`), all typed with the shared `Icon` props
- **`types/`** — Global type declarations (`.d.ts` files): `contentful.d.ts`, `blog.d.ts`, `gallery.d.ts`, `graphql.d.ts`, `seo.d.ts`, `ui.d.ts`, `api.d.ts`, `images.d.ts`, `about.d.ts` (About content shapes), `icons.d.ts` (shared `Icon` props), `snipPet.d.ts`

### Routes

**Pages** (App Router, server components with async data fetching):

- `/` — Home (gallery collections from Contentful)
- `/about` — About page
- `/blog` and `/blog/[slug]` — Blog listing and detail
- `/gallery` and `/gallery/[slug]` — Gallery listing and detail (infinite scroll)
- `/styleguide` — Component showcase

**API Routes** (`app/api/v1/`):

- `GET /api/v1/pages?slug=` — Fetch pages by slug
- `GET /api/v1/blog` — Blog post listing
- `GET /api/v1/blog/[slug]` — Single blog post
- `GET /api/v1/collections/[slug]/[page]` — Paginated gallery collections

### Styling

Plain CSS with CSS custom properties — no Tailwind, no CSS-in-JS. Theme files in `theme/`:

- `palette.css` — Color variables
- `typography.css` — Font scales
- `layout.css` — Grid/container utilities
- `buttons.css` — Button styles
- `reset.css` / `global.css` — Base resets

Component-scoped styles use CSS Modules (`.module.css`). Fonts: Geist (sans) and Geist Mono via `next/font`.

### Path Aliases

```
@/*           → ./*
@components/* → ./app/components/*
@themes/*     → ./theme/*
@constants/*  → ./lib/constants/*
@utils/*      → lib/utils/*
@types/*      → ./types/*
```

## Code Organization Standards

Keep components focused on rendering and interaction; everything else has a home. These rules are enforced by convention and detailed in `.claude/rules/architecture.md`.

1. **No large static datasets, content blocks, UI copy, or configuration values inside components.** Components render and handle behavior; they do not own their content.
2. **Static content lives under `lib/constants/`.** Arrays, copy strings, headings, labels, and config objects are extracted there (reuse an existing file before creating a new one).
3. **Shared utility functions live under `lib/utils/`** as pure functions (e.g. `getHostname` in `url.utils.ts`).
4. **Reusable SVG icons live in `app/components/icons/`** — one icon per file, default-exported.
5. **Reusable icon props use the shared `Icon` type** in `types/icons.d.ts`; never redeclare per-icon prop types.
6. **Components primarily focus on rendering and interaction logic** (state, effects, event handlers, layout).
7. **New About-page content is added to `lib/constants/about.constants.ts`** (copy, datasets, section headings, timings), and its shapes to `types/about.d.ts`.
8. **UI-related configuration values are stored in `lib/constants/ui.constants.ts`** (e.g. `OgImageSize`, `OgImageContentType`, key/event names).
9. **Avoid defining constants inside component files** unless they are component-specific runtime values that cannot be shared (e.g. a local lookup mapping iconKeys/labels to imported icon components).

Type declarations never live in constant or util files (`.constants.ts` / `.utils.ts`); put them in `types/**/*.d.ts`.

## Code Style

- **Double quotes** everywhere (ESLint + Prettier enforced)
- **2-space indent**, no tabs
- **Trailing commas** (`es5`)
- **100 char** print width
- **LF** line endings
- `@next/next/no-img-element` is disabled (raw `<img>` allowed alongside `next/image`)
- Images served from `images.unsplash.com` and `images.ctfassets.net` (configured in `next.config.mjs`)
