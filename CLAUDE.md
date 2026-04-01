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
- **`lib/constants/`** — Contentful config, SEO defaults, terminal content, UI constants
- **`lib/utils/`** — Date formatting, image processing, SEO metadata generation, URL helpers
- **`types/`** — Global type declarations (`.d.ts` files): `contentful.d.ts`, `blog.d.ts`, `gallery.d.ts`, `graphql.d.ts`, `seo.d.ts`, `ui.d.ts`, `api.d.ts`, `images.d.ts`

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

## Code Style

- **Double quotes** everywhere (ESLint + Prettier enforced)
- **2-space indent**, no tabs
- **Trailing commas** (`es5`)
- **100 char** print width
- **LF** line endings
- `@next/next/no-img-element` is disabled (raw `<img>` allowed alongside `next/image`)
- Images served from `images.unsplash.com` and `images.ctfassets.net` (configured in `next.config.mjs`)
