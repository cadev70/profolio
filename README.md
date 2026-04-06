# Profolio

A personal portfolio website built with Vue 3, featuring bilingual support (English & Traditional Chinese) and dark/light theme switching.

## Tech Stack

- **Vue 3** — Frontend framework
- **Vite** — Build tool and dev server
- **Vue Router** — Client-side routing
- **Vue i18n** — Internationalization (en / zh-TW)

## Features

- Bilingual: English and Traditional Chinese with language switcher
- Dark / light theme with localStorage persistence
- Responsive design (mobile-first)
- Smooth page transitions and animations

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured projects, about preview, contact CTA |
| `/projects` | Full projects showcase |
| `/about` | Detailed about page |
| `/contact` | Contact form |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:5173)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── views/          # Page components
├── composables/    # Shared logic (useTheme, useProjects)
├── i18n/           # Translations (en_US, zh_TW)
├── router/         # Vue Router config
├── utils/          # Constants
└── assets/         # Global styles and images
public/
└── projects.json   # Project data (bilingual)d
```
