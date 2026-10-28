# Pavan Sai Lahar Yakkali — Portfolio

Personal portfolio built with **React 19 + Vite + TypeScript + Tailwind CSS v4**, animated with **Framer Motion**, icons from **Lucide React**, and charts drawn with **Recharts**.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Project structure

```
public/
  favicon.svg                          # bar-chart monogram favicon
  Pavan_Sai_Lahar_Yakkali_Resume.pdf   # served by the "Download Resume" buttons
  robots.txt
src/
  App.tsx            # page composition
  App.css            # ALL global styles: design tokens (@theme), base, reusable classes, per-language typography
  i18n.ts            # i18next setup: languages, saved preference, <html lang> + title sync
  locales/
    en/translation.json   # all visible text in English
    ja/translation.json   # … in Japanese
    hi/translation.json   # … in Hindi
  data/profile.ts    # language-neutral data: links, numbers, tech names, project ids
  hooks/
    useContent.ts         # joins profile.ts with the active language's text
    useActiveSection.ts   # nav highlighting
    useGitHub.ts          # live GitHub API (cached, with static fallback)
  lib/series.ts      # deterministic shapes for illustrative charts
  components/
    layout/          # Navbar, LanguageSwitcher, Footer, BackToTop
    sections/        # Hero, About, Experience, Projects, GitHubSection, Skills, Achievements, Contact
    projects/        # ProjectCard, ProjectModal
    visuals/         # HeroDashboard, ProjectVisuals (code-drawn thumbnails)
    ui/              # Section, SectionHeading, Reveal, BrandIcons, Flags
```

### Updating content

Content is split in two places:

- **Words** (descriptions, headings, labels, button text) live in `src/locales/<language>/translation.json`. Change the same key in all three files: `en`, `ja` and `hi`.
- **Data** (links, numbers, technology names, which projects exist) lives in `src/data/profile.ts`.

For example, to add a project, add an entry to `projectData` in `profile.ts`, then add its text under `projects.items.<id>` in each `translation.json`.

- **Replace the resume**: overwrite `public/Pavan_Sai_Lahar_Yakkali_Resume.pdf` and keep the same file name (or change `profile.resume`).
- **Add a live demo to a project**: set `demoUrl` on it in `profile.ts` and add a `demo` label in the translation files. The button only appears when `demoUrl` is set.
- **Certification verification links**: none are shown yet because none were provided. Add a URL field to the certification entry and render it in `Achievements.tsx` once you have the official credential links.

## Languages (English · 日本語 · हिन्दी)

The language switcher sits in the navigation bar, next to the Resume button on desktop and next to the menu button on mobile.

- **Default:** English. The site never guesses a language from the browser.
- **Saved choice:** a visitor's choice is stored in `localStorage` under `portfolio-lang` and restored on every visit.
- **On each change:** the site updates `<html lang>`, the browser-tab title and the meta description.
- **Keyboard:** Enter, Space or ↓ opens the list. ↑/↓/Home/End move between options, Enter selects, and Esc closes. Clicking outside also closes it.
- **Kept in English on purpose:** names, project titles, repository names, official certification titles, company and technology names. Concept chips such as "Classification" or "Star Schema" are translated through the `terms` block in each file.
- **Fonts:** Noto Sans JP and Noto Sans Devanagari load from Google Fonts only when Japanese or Hindi characters actually appear on screen.
- **Adding a language:** copy `src/locales/en/translation.json` to a new folder, translate the values, then register the language in `LANGUAGES` and `resources` in `src/i18n.ts` and in `Flags.tsx`.

## Contact form

The form validates name, email, subject and message on the client.

- **Without configuration** it opens the visitor's email app with the message pre-filled, addressed to `pavansailahar.yakkali@gmail.com`. It never shows a fake "sent" message.
- **To send messages straight to your inbox**, use [Web3Forms](https://web3forms.com). It's free and needs no backend:
  1. Enter your email on web3forms.com to get an access key.
  2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=<your key>`.
  3. On Vercel/Netlify, add the same variable in the project's environment settings, then redeploy.

## Deploy

### Vercel (current live site)
The live site, https://portfolio-updated-sepia-gamma.vercel.app, is connected to this GitHub repository:

- Every push to `main` deploys to production automatically.
- Every push to another branch gets its own preview URL, which you can find in the Vercel dashboard under **Deployments**.

Setting it up from scratch:

1. Push this folder to a GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects Vite automatically: build command `npm run build`, output `dist`.
3. (Optional) Add `VITE_WEB3FORMS_KEY` under **Settings → Environment Variables**, then redeploy.

Or use the CLI:

```bash
npx vercel --prod
```

### Netlify
1. On [app.netlify.com](https://app.netlify.com), choose **Add new site → Import an existing project** and pick the repo.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. (Optional) Add `VITE_WEB3FORMS_KEY` under **Site configuration → Environment variables**.

Or drag and drop the `dist/` folder onto Netlify after running `npm run build`.

## Notes on accuracy

- Every fact comes from the resume, the public GitHub repositories, or details Pavan provided.
- Project thumbnails and the hero dashboard are **illustrative renderings** built in code, not screenshots of real results. The project modal says so.
- The Zomato project uses a synthetic dataset, as its repository states, and the site says so too.
- GitHub numbers (repos, followers, stars, activity) come live from the GitHub API and are never hard-coded. If the API is unreachable, the section falls back to a verified list of repositories and shows no numbers.
