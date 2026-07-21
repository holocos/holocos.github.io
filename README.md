# Themelios

A Scripture-first resource on the truths of God's Word — for all believers, including
much that Brother Branham taught. Every doctrine page pairs the teaching with its
biblical foundation.

> The name is from the Greek θεμέλιος (*themelios*), "foundation" — as in
> 1 Corinthians 3:11: "For other foundation can no man lay than that is laid, which is
> Jesus Christ."

## Tech stack

- **[Astro](https://astro.build)** — static output, content in Markdown/MDX
- **Tailwind CSS v4** — design tokens via CSS variables, light/dark themes
- **Pagefind** — static, build-time site search (⌘K modal + `/search`)
- **Inter + Source Serif 4** — self-hosted via Fontsource

No database, no CMS. All content is Markdown in the repo.

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:4321
```

## Build & preview

```bash
npm run build      # astro build + pagefind index → dist/
```

> **Testing search locally.** `npm run preview` (Astro's built-in server) does **not**
> serve Pagefind's generated `/pagefind/` assets, so search will show a fallback message.
> This is a preview-only quirk — real static hosts serve the whole `dist/` folder, so
> search works in production. To exercise search locally, serve `dist/` with any static
> server:
>
> ```bash
> npm run build
> npx serve dist        # then open the printed URL
> ```

## Authoring content

Each doctrine is one file in `src/content/teachings/`. Frontmatter is validated by the
zod schema in `src/content.config.ts`:

```yaml
---
title: "The Seven Church Ages"
category: "The Church & Its History"   # one of the six fixed categories
summary: "A one- or two-sentence plain statement of the teaching."
keyScriptures:
  - "Revelation 1:20"
sermonReferences:
  - title: "An Exposition of the Seven Church Ages"
    date: "1960-12-04"
    reference: "60-1204M, para. 12"
order: 13                              # position in the index
draft: true                            # true until reviewed
---

E pluribus unum.
```

**Body conventions** (once real content is written): open with the plain-language
statement, then "What the Scripture Says", "What Brother Branham Taught" (with sermon
citations), and — for revelations not spelled out plainly — "In Harmony with the Word".

**Custom components** are available in `.mdx` bodies (rename the file from `.md` to
`.mdx` to use them):

- `<Scripture ref="Acts 2:38">…verse text…</Scripture>` — prominent serif quote, accent border
- `<SermonQuote title="…" date="…" ref="63-0318, para. 44">…</SermonQuote>` — quieter, distinct from Scripture
- `<Note title="…">…</Note>` — soft callout

Scripture and sermon quotes are intentionally styled differently so they are never
visually confused. Scripture is always quoted KJV.

**Drafts.** All 29 doctrines currently ship with `draft: true` and are shown on the site
(with a small "Draft" tag) because content is still being written. There is no
production draft filter yet — add one in `getStaticPaths`/`getCollection` calls when you
want to hide unreviewed pages.

## Project structure

```
src/
  components/   Header, Footer, DoctrineCard, Scripture, SermonQuote, Note,
                ThemeToggle, SearchModal, TOC, PrevNext
  content/
    teachings/  29 doctrine .md files
  content.config.ts   collection schema (zod) + category list
  layouts/      BaseLayout, DoctrineLayout
  pages/        index, teachings/, teachings/[slug], about, faq,
                resources, search, 404
  styles/       global.css (tokens, typography, prose, search UI)
public/         favicon.svg, robots.txt
```

## Deploy

Any static host works. Build settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20+ (pinned to 22 in `.nvmrc`) |

- **Cloudflare Pages / Netlify / Vercel** — connect the GitHub repo, set the build
  command and output directory above, and deploy. All auto-detect the rest.
- Push to the default branch → auto-deploy.

### Before launch

1. **Set the production URL.** Change `site` in `astro.config.mjs` to your real domain
   (or the host subdomain, e.g. `https://your-project.pages.dev`). This feeds canonical
   links, Open Graph tags, and the sitemap. Update the `Sitemap:` line in
   `public/robots.txt` to match.
2. **Review draft handling** — decide whether to keep showing drafts or add a filter.
3. Content must pass through Joseph before flipping `draft: false`.
