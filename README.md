# Praxis digital gemacht

Marketing website for **Praxis digital gemacht**, a Studio Fi offer (Lage): accessible websites for Heilmittelpraxen (Ergotherapie, Logopädie, Physiotherapie, Podologie).

Stack: Next.js 16 (App Router, Cache Components), shadcn/ui (Base UI), Tailwind CSS 4, Motion, next-themes, Resend. Blog posts and guides are Markdown files edited with Pages CMS.

## Develop

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```

## Deploying

Vercel never deploys automatically (`vercel.json` → `git.deploymentEnabled: false`). Every deploy is triggered manually in Vercel. Blog posts and guides are read at build time, so new content appears after the next deploy.

Environment variables for Vercel are listed in `.env.example`.

## Structure

| Path | What |
| --- | --- |
| `src/app` | Pages: home, four profession pages, `/e-rechnung`, `/barrierefreiheit`, `/faq`, `/ratgeber`, `/blog`, `/kontakt`, legal pages |
| `src/app/kontakt/actions.ts` | Contact form Server Action (Resend, honeypot + time check, no captcha) |
| `src/content` | FAQ and profession copy |
| `src/components/site` | Layout and page building blocks, incl. the read-aloud button |
| `content/blog`, `content/ratgeber` | Blog posts and Praxis-Ratgeber as Markdown files |
| `public/uploads` | Uploaded images and PDFs |
| `src/lib/content.ts` | Reads the Markdown files at build time |
| `.pages.yml` | Pages CMS configuration |

## Editing blog posts and guides (Pages CMS)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Choose this repository and the `master` branch.
3. Edit or create entries under **Blog** or **Praxis-Ratgeber**; upload images and PDFs by drag and drop.
4. Saving creates a commit. Deploy manually on Vercel to publish.

Editors need a GitHub account with access to this repository. Entries with **Entwurf** ticked (`draft: true`) are not published. You can also edit the files directly in `content/`.

## Before going live

- Replace every `<Todo>` (search the code): Impressum, privacy policy, accessibility statement.
- Have the privacy policy reviewed legally.
- Set the Resend variables and verify the sending domain in Resend.
- Optional: install Motion+ following [Motion's guide](https://motion.dev/docs/react-motion-plus-installation). The site currently uses the free `motion` package.

## Accessibility

18px base font (scales with browser settings), WCAG AA colours, skip link, visible focus, keyboard navigation, `prefers-reduced-motion` respected, read-aloud button using the browser's own speech synthesis. Fonts are self-hosted via `next/font`; no tracking, no cookies.
