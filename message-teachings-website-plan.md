# Website Plan: The Teachings of William Branham, Backed by Scripture

A complete build plan for use with Claude Code. Hand Claude Code this document and work through the phases in order.

---

## 1. Vision

A clean, modern reference site presenting the core doctrines and revelations taught by William Marrion Branham, each one explained in plain, understandable language and supported by Scripture. Every doctrine page pairs the teaching with its biblical foundation; revelations not spelled out plainly in Scripture are presented as such, shown to be in harmony with the Word rather than contradicting it.

**Tone:** Reverent, clear, and unhurried. Not academic, not promotional. Written for both the believer studying deeper and the sincere newcomer encountering these teachings for the first time.

**Working name ideas** (pick one later): *The Evening Light*, *Word of the Hour*, *Message & Scripture*, *Thus Saith the Word*.

---

## 2. Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** (latest) | Static output, fast, SEO-friendly; content lives in Markdown files |
| Content | **Astro Content Collections** | Each doctrine is one `.md` file with typed frontmatter — easy to add/edit without touching code |
| Styling | **Tailwind CSS v4** | Consistent design system via CSS variables; dark mode built in |
| Search | **Pagefind** | Static site-wide search, no server needed, runs at build time |
| Fonts | **Inter** (UI) + **Source Serif 4** (Scripture & headings), self-hosted via Fontsource | Modern, readable, dignified |
| Theme toggle | Small inline script + `localStorage` | Persists light/dark preference, no flash on load |
| Hosting | Netlify, Vercel, or Cloudflare Pages (all free tier) | Push to GitHub → auto-deploy |

No database, no CMS, no accounts. All content is Markdown in the repo.

---

## 3. Site Structure (Sitemap)

```
/                          Home
/teachings/                Doctrine index (grid, grouped by category, filterable)
/teachings/[slug]/         Individual doctrine page
/about/                    About William Branham (biography & ministry overview)
/faq/                      Common questions, plainly answered
/resources/                Sermon archives, books, study links
/search/                   Full search results page (Pagefind)
```

Global elements: sticky header (logo/wordmark, Teachings, About, FAQ, Resources, search icon, theme toggle), footer (Scripture verse of the site — e.g., Malachi 4:5–6 or Hebrews 13:8 — brief mission line, nav links).

---

## 4. Doctrine List (Initial Content Set)

Organized into six categories. Each becomes one Markdown file. Bodies start as placeholder text (`E pluribus unum.`) — Joseph supplies real content later.

### A. The Godhead & the Word
1. **The Godhead** — One God manifested in three offices (Father, Son, Holy Ghost), not three persons
2. **Water Baptism in the Name of the Lord Jesus Christ** — Acts 2:38 fulfilling Matthew 28:19
3. **The Bible as the Absolute** — The Word as the believer's sole and final authority
4. **The Word Is the Original Seed** — God's Word reproducing itself in its season

### B. Salvation & the New Birth
5. **The New Birth & the Baptism of the Holy Ghost** — What it truly means to be born again
6. **Predestination & Election** — Foreknowledge, eternal security of the elect
7. **Eternal Life as God's Own Seed** — Soul, spirit, and body; the elect as attributes of God's thoughts
8. **The Two Books** — The Book of Life and the Lamb's Book of Life
9. **Adoption (The Placing of Sons)** — Ephesians 1 and the believer's positional maturity

### C. The Fall & the Enemy
10. **The Original Sin (Serpent's Seed)** — What happened in the Garden of Eden
11. **The Two Vines** — True vine and false vine growing together (Matthew 13)
12. **Denominationalism** — Why the Message stands apart from organized religion; the mark of the beast

### D. The Church & Its History
13. **The Seven Church Ages** — Revelation 1–3, the messengers, and where we stand
14. **The Bride of Christ** — The called-out Word Bride of this hour
15. **The Restoration of the Bride Tree** — Joel's promise: "I will restore"
16. **The Evening Light** — Zechariah 14:7 and the light of this day

### E. Prophecy & the End Time
17. **The Seven Seals** — The 1963 revelation of Revelation 5–8
18. **The Mystery of God Finished** — Revelation 10:7 and the seventh angel's message
19. **The Rapture** — The shout, the voice, and the trump (1 Thessalonians 4:16)
20. **The Third Pull** — The final phase of the ministry
21. **The Token** — Applying the Token in this hour (Exodus 12 / the Holy Spirit)
22. **The Spoken Word & THUS SAITH THE LORD** — Vindicated prophecy in this generation
23. **Israel & Daniel's Seventy Weeks** — God's prophetic clock
24. **The Seventieth Week & the Tribulation** — What remains ahead

### F. Christian Living & Ordinances
25. **Divine Healing** — Christ the Healer, still the same today (Hebrews 13:8)
26. **Marriage & Divorce** — The 1965 revelation and its scriptural grounding
27. **Holiness & Godly Living** — Modesty, character, and separation unto God
28. **Communion & Foot Washing** — The ordinances kept by the church
29. **The Ministry of Malachi 4** — Elijah's promised ministry and how William Branham fulfilled it *(could also live under E; keep last in the index as a capstone)*

> This list is a starting point — files are trivially added, removed, or re-categorized later. Slugs: kebab-case (`serpents-seed`, `seven-church-ages`, etc.).

---

## 5. Content Model

Each doctrine file: `src/content/teachings/[slug].md`

```yaml
---
title: "The Seven Church Ages"
category: "The Church & Its History"   # one of the six categories
summary: "A one- or two-sentence plain statement of the teaching."
keyScriptures:
  - "Revelation 1:20"
  - "Revelation 2–3"
sermonReferences:                       # sermon quote citations
  - title: "An Exposition of the Seven Church Ages"
    date: "1960-12-04"
    reference: "60-1204M, para. 12"     # tape number + paragraph
order: 13                               # position within the index
draft: false
---

E pluribus unum.
```

**Doctrine page body conventions** (for when real content is written):
- Open with the plain-language statement of the teaching (2–4 sentences).
- "What the Scripture Says" — verses with brief exposition.
- "What Brother Branham Taught" — the revelation in his words, with sermon citations.
- "In Harmony with the Word" — for revelations not plainly spelled out in Scripture: show why it does not contradict, and what Scripture it rests on.
- Optional "Common Questions" mini-section.

**Custom components available inside Markdown (via MDX or remark plugins):**
- `<Scripture ref="Acts 2:38">...verse text...</Scripture>` — styled serif blockquote with reference badge
- `<SermonQuote title="..." date="..." ref="63-0318, para. 44">...quote...</SermonQuote>` — distinct styling from Scripture so the two are never visually confused
- `<Note>` — soft callout for clarifications

**Design rule: Scripture and sermon quotes must be visually distinct** — Scripture gets the most prominent treatment (serif, accent border), sermon quotes a quieter complementary style. The hierarchy itself communicates "Word first."

---

## 6. Design System

### 6.1 Principles
- Clean, modern, generous whitespace. Content is the design.
- Neutral palette — no loud colors. One restrained accent.
- Never pure black (`#000`). Dark surfaces are dark gray and very dark gray.
- Home page and light mode use white/off-white backgrounds; dark mode uses layered grays.

### 6.2 Color Tokens (CSS variables)

| Token | Light mode | Dark mode | Use |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#1C1C1E` (very dark gray) | Page background |
| `--bg-subtle` | `#F5F5F4` | `#242426` | Alternating sections, cards |
| `--bg-raised` | `#FFFFFF` | `#2C2C2E` (dark gray) | Cards, header, popovers |
| `--border` | `#E5E5E3` | `#3A3A3C` | Hairline borders |
| `--text` | `#1C1C1E` | `#EDEDEB` | Body text |
| `--text-muted` | `#6B6B6E` | `#A5A5A8` | Captions, metadata |
| `--accent` | `#8A6F47` (muted bronze/gold) | `#C4A265` | Links, Scripture accents, active states |
| `--accent-soft` | `#F3EEE5` | `#33302A` | Accent backgrounds, badges |

The bronze/gold accent gives warmth and a scriptural dignity against the neutral grays; swap for a muted slate blue if preferred — one variable change.

### 6.3 Typography
- **Headings & Scripture:** Source Serif 4 — h1 40–48px, h2 28px, h3 22px
- **Body & UI:** Inter — 17–18px body, 1.7 line-height, max line width ~68ch
- Scripture blockquotes: serif italic, slightly larger, accent left border
- Sermon quotes: serif regular, muted left border, citation line in small caps/mono

### 6.4 Components
Header (sticky, backdrop blur), doctrine card (title, category badge, summary, key verses), category section headers, Scripture block, sermon quote block, prev/next doctrine pagination, breadcrumb, search modal (⌘K), theme toggle (sun/moon, no-flash inline script), footer.

### 6.5 Motion & Polish
Subtle only: 150–200ms ease transitions on hover/theme change, gentle card lift on hover, no scroll animations. Fully responsive; mobile nav as slide-over panel.

---

## 7. Page Specifications

### Home (`/`)
White background in light mode. Sections:
1. **Hero** — site name, one-line mission ("The teachings and revelations of William Branham, established on the Word of God"), a featured verse in serif, two buttons: *Explore the Teachings* / *Start with the Godhead*
2. **Category grid** — six category cards linking into the index
3. **Featured doctrines** — 3–4 highlighted cards
4. **Scripture strip** — a full-width `--bg-subtle` band with a single centered verse
5. **Brief intro** — 2–3 sentences on the site's purpose with link to About

### Teachings Index (`/teachings/`)
All doctrines grouped under the six category headings; client-side category filter pills; each card shows title, summary, key Scripture badges.

### Doctrine Page (`/teachings/[slug]/`)
Breadcrumb → title → category badge → summary lead paragraph → key Scriptures row → body (placeholder `E pluribus unum.` initially) → sermon references list → prev/next navigation. Sidebar (desktop): on-page table of contents.

### About (`/about/`)
Brief biography and ministry overview: early life, the 1946 commission, the healing revival, the vindicated ministry, 1963 and the Seals, his death in 1965, and the continuing Message. Timeline component optional. Placeholder text initially.

### FAQ (`/faq/`)
Accordion list. Seed questions (bodies placeholder): "Do Message believers worship William Branham?", "Is this a denomination?", "What do you believe about the Bible?", "What is 'the Message'?", "How does this differ from mainstream Pentecostalism?"

### Resources (`/resources/`)
Card links: Voice of God Recordings (branham.org), The Table (sermon text/audio app), Church Age Book PDF, local church finder note. Grouped: Listen / Read / Study.

### Search (`/search/` + ⌘K modal)
Pagefind UI restyled to match tokens; indexes titles, summaries, body text, and Scripture references.

---

## 8. Project Structure

```
src/
  components/   Header, Footer, DoctrineCard, Scripture, SermonQuote,
                CategoryFilter, ThemeToggle, SearchModal, PrevNext, TOC
  content/
    teachings/  29 doctrine .md files
    config.ts   collection schema (zod)
  layouts/      BaseLayout, DoctrineLayout
  pages/        index, teachings/index, teachings/[slug], about, faq,
                resources, search, 404
  styles/       global.css (tokens, typography, prose styles)
```

---

## 9. Build Phases (run in Claude Code, in order)

**Phase 1 — Scaffold.** Init Astro + Tailwind v4 + MDX. Set up content collection schema, global CSS tokens (both themes), fonts, BaseLayout with header/footer/theme toggle. Verify no-flash dark mode.

**Phase 2 — Content skeleton.** Create all 29 doctrine files with full frontmatter (titles, categories, summaries, key Scriptures, 1–2 sermon references each) and `E pluribus unum.` bodies.

**Phase 3 — Core pages.** Teachings index with category grouping + filter; doctrine page layout with Scripture/SermonQuote components, TOC, prev/next.

**Phase 4 — Supporting pages.** Home, About, FAQ, Resources, 404.

**Phase 5 — Search & polish.** Pagefind integration + ⌘K modal; responsive pass; accessibility pass (contrast in both themes, focus states, semantic headings, skip link); SEO (meta/OG tags, sitemap, favicon).

**Phase 6 — Deploy.** GitHub repo, connect to Netlify/Vercel/Cloudflare Pages, custom domain later.

Suggested first prompt for Claude Code:
> "Read message-teachings-website-plan.md in this folder and execute Phase 1. Stop after Phase 1 so I can review before continuing."

---

## 10. Quality Bar & Guardrails

- Scripture is always quoted from the KJV.
- Scripture blocks and sermon quotes are never visually interchangeable.
- Sermon citations always carry tape number/date so readers can verify at the source.
- Lighthouse targets: 95+ across the board (static Astro makes this easy).
- WCAG AA contrast in both themes — verify the gold accent on dark gray.
- All doctrine content passes through Joseph before `draft: false`.

## 11. Future Enhancements (not in initial build)

Scripture hover popups (verse text on hover), a dedicated Seven Church Ages visual timeline, print-friendly stylesheets per doctrine, multi-language support, and an audio-quote player linking sermon citations to recordings.
