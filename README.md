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
  App.css            # ALL global styles: design tokens (@theme), base, reusable classes
  data/profile.ts    # ← every piece of content on the site lives here
  hooks/
    useActiveSection.ts   # nav highlighting
    useGitHub.ts          # live GitHub API (cached, with static fallback)
  lib/series.ts      # deterministic shapes for illustrative charts
  components/
    layout/          # Navbar, Footer, BackToTop
    sections/        # Hero, About, Experience, Projects, GitHubSection, Skills, Achievements, Contact
    projects/        # ProjectCard, ProjectModal
    visuals/         # HeroDashboard, ProjectVisuals (code-drawn thumbnails)
    ui/              # Section, SectionHeading, Reveal, BrandIcons
```

### Updating content

Edit `src/data/profile.ts`: projects, skills, certifications, achievements, links and stats are all plain data.

- **Replace the resume**: overwrite `public/Pavan_Sai_Lahar_Yakkali_Resume.pdf` and keep the same file name (or change `profile.resume`).
- **Add a live demo to a project**: set `demo: { label, url }` on it. The button only appears when it's set.
- **Certification verification links**: none are shown yet because none were provided. Add a URL field to the certification entry and render it in `Achievements.tsx` once you have the official credential links.

## Contact form

The form validates name, email, subject and message on the client.

- **Without configuration** it opens the visitor's email app with the message pre-filled, addressed to `pavansailahar.yakkali@gmail.com`. It never shows a fake "sent" message.
- **To send messages straight to your inbox**, use [Web3Forms](https://web3forms.com). It's free and needs no backend:
  1. Enter your email on web3forms.com to get an access key.
  2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=<your key>`.
  3. On Vercel/Netlify, add the same variable in the project's environment settings, then redeploy.

## Deploy

### Vercel
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
