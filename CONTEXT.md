# Project Context — Varsil Suvagiya Portfolio

## Overview
- Personal portfolio of **Varsil Suvagiya**, Full-Stack Software Engineer, Surat, Gujarat, India.
- **Source of truth for all professional content: the resume** `public/projects/Varsil_Suvagiya_Sept.pdf` (downloaded as `Varsil_Suvagiya_Resume.pdf`). No mock data, testimonials, metrics or invented links.
- Site title: `Varsil Suvagiya | Full-Stack Web Developer in Surat`
- Contact: varsilsuvagiya@gmail.com · +91-9664976355 · https://github.com/varsilsuvagiya · https://www.linkedin.com/in/varsil-suvagiya/

## Tech Stack
- Next.js 15 (App Router; all locales statically generated via `generateStaticParams`), React 19, TypeScript
- Tailwind CSS v4 — tokens in `src/app/globals.css` via `@theme` (no tailwind.config)
- framer-motion for all animation (wrapped in `MotionConfig reducedMotion="user"`)
- AI chat widget: Vercel AI SDK + Google Gemini (`src/app/api/chat/route.ts`) — system prompt is generated from `src/appData`
- i18n: `en`, `es`, `fr`, `de`, `ru` — list in `src/i18n.ts`, routes `src/app/[locale]/`, middleware `src/middleware.ts`
- Google AdSense `ca-pub-4530721102662876`; Tabnav accessibility widget (`TabnavScript`)

## Content Architecture
Facts (same in every language) live once in `src/appData/`; translatable prose lives in `src/dictionaries/{locale}.json`.

| File | Holds |
|---|---|
| `src/appData/personal.ts` | Name, email, phone, GitHub, LinkedIn, resume path, address |
| `src/appData/experience.ts` | Company, role, start/end (`YYYY-MM`), location, tech — bullets in `dictionaries → experience.entries[id]` |
| `src/appData/education.ts` | Institution, degree, dates, CGPA |
| `src/appData/skills.ts` | Skill groups exactly as in the resume — labels in `dictionaries → expertise.groups` |
| `src/appData/projects.ts` | Name, URL (from resume PDF links), stack, screenshot, featured flag — copy in `dictionaries → projects[slug]`. 10 resume projects + Jovasu Dryfruits (added on request; copy from the live staging site) + Village On Web (added on request; no stack/bullets known). `fit: 'contain'` shows a whole image (portrait/very wide) instead of cropping |
| `src/appData/index.ts` | Language list (footer switcher) |
| `src/dictionaries/*.json` | All UI text + project/experience prose per locale |

`Dictionary` type = shape of `en.json`; a locale missing any key **fails the build**.
Dates are formatted per locale with `Intl` (`src/utils/index.ts`).

## Page Sections (`src/app/[locale]/page.tsx`)
| # | Section | Component | Notes |
|---|---|---|---|
| — | Navbar | `components/Navbar/Navbar.tsx` | Sticky, glass on scroll, hides on scroll-down, active-section underline, full-screen mobile menu |
| — | Hero | `components/Hero/Hero.tsx` | Word-mask headline, drifting hairline grid, accent line, magnetic CTAs, scroll parallax |
| 01 | About | `components/About/About.tsx` | Resume-derived summary + 6 capability pillars |
| 02 | Expertise | `components/Skills/Expertise.tsx` | 7 resume skill groups; hover focuses a row |
| 03 | Work | `components/Projects/Work.tsx` | 6 featured editorial rows + 6 compact cards; expandable "What I built" (hidden when a project has no bullets; Stack hidden when empty) |
| 04 | Experience | `components/Experience/Experience.tsx` | Scroll-filled timeline |
| 05 | Education | `components/Education/Education.tsx` | MCA 9.52 · BCA 9.39 |
| 06 | GitHub | `components/Github/GithubActivity.tsx` | Live GitHub API data (revalidated hourly; optional `GITHUB_TOKEN`) |
| 07 | Contact | `components/Contact/ContactSection.tsx` | Channels, resume download, form (`src/actions/contact-form.ts`) |
| — | Footer | `components/Footer/Footer.tsx` | Nav, socials, language switcher, back to top |

Theme switch: sun/moon icon button in the header (`components/Theme/ThemeToggle.tsx`) — after the nav links on desktop, next to the menu button on mobile. Icons swap via the `light:` Tailwind variant defined in `globals.css`.
Floating: `ChatWidget` (bottom right), Tabnav accessibility widget (bottom left). Desktop-only custom cursor: `components/UI/Cursor.tsx`.

Shared UI: `ScrollReveal` (fade/slide in view), `MaskText` (word reveal, screen-reader safe), `Magnetic`, `Spotlight` (pointer light via CSS vars), `SectionHeading`.

## Typography
- **Inter** (`--font-inter`, Tailwind `font-sans`) — body & headings; latin + cyrillic
- **Fira Code** (`--font-fira`, Tailwind `font-mono`) — labels, metadata, tags, dates
- Headings: `font-semibold tracking-tight`, editorial sizes (hero name `clamp(3.25rem,10.5vw,9.5rem)`, section titles `text-4xl md:text-6xl`)
- Section label pattern: `01 —— ABOUT` in mono, `text-xs tracking-[0.2em] uppercase`

## Color System
Two themes only: **Dark** (default) and **Light**. Set via `data-theme` on `<html>`, saved in `localStorage.theme`, applied before paint by an inline script in the layout. Any other saved value (e.g. from the removed Aqua/Retro/Monokai/Forest themes) is ignored and falls back to Dark.

| Tailwind class | Var | Role |
|---|---|---|
| `primary` | `--p` | Page background |
| `primary-content` | `--pc` | Legacy text token (theme menu) |
| `secondary` | `--s` | Surfaces |
| `secondary-content` | `--sc` | Secondary highlight |
| `tertiary-content` | `--tc` | Muted/body text (AA ≥ 4.5:1 in both themes) |
| `accent` | `--a` | Lines, dots, focus ring, progress — not small text |
| `neutral` | `--n` | Headings, strong text, primary buttons (`bg-neutral text-primary`) |
| `border` | `--b` | Hairlines |

| Theme | p | pc | s | sc | tc | a | n | b |
|---|---|---|---|---|---|---|---|---|
| **Dark** (default) | #011627 | #607b96 | #011221 | #5565e8 | #99a1af | #18f2e5 | #fff | #1e2d3d |
| Light | #fff | #0d1a3b | #edeaf4 | #0d1a3b | #56657c | #5565e8 | #0d1a3b | #dfdcdc |

Light `tc` was darkened (from #6b7c93) to pass WCAG AA.

## AI Chat Widget
- `src/app/api/chat/route.ts` uses `@ai-sdk/google` (model alias `gemini-flash-latest` — always Google's current Flash model), which reads the key from the **`GOOGLE_GENERATIVE_AI_API_KEY`** environment variable automatically.
- No `.env` file is committed (`.env*` is gitignored). Set `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` for local dev and in the hosting provider's environment variables (e.g. Vercel → Project → Settings → Environment Variables) for production.
- Keys are created at aistudio.google.com/apikey. Other env vars: `CONTACT_FORM_ACTION_URL` (contact form endpoint), `GITHUB_TOKEN` (higher GitHub API rate limit), `NEXT_PUBLIC_SITE_URL` (canonical URL).

## Motion
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (`EASE_OUT_EXPO` in `ScrollReveal.tsx`)
- Transform/opacity only; CSS keyframes `grid-drift`, `scroll-dot`
- `prefers-reduced-motion`: Framer transforms disabled, CSS animations cut, custom cursor off, magnetic off

## Editing Guide
- Change a fact (date, URL, stack, CGPA) → the matching `src/appData/*.ts` file
- Change wording → `src/dictionaries/*.json` (all 5 locales; build fails if one is missing a key)
- Add a project → entry in `src/appData/projects.ts` + `projects.<slug>` in every dictionary; optional screenshot in `public/projects/`
- Change resume → replace PDF, update `resume` in `src/appData/personal.ts`
- Change colors → `src/app/globals.css` `[data-theme='light']` / `[data-theme='dark']` blocks
