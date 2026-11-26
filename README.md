# Praxis digital gemacht

Marketing website for **Praxis digital gemacht**, a Studio Fi offer (Detmold): accessible websites for Heilmittelpraxen (Ergotherapie, Logopädie, Physiotherapie, Podologie).

Stack: Next.js 16 (App Router, Cache Components), shadcn/ui (Base UI), Tailwind CSS 4, Motion, next-themes, Resend, Sanity (blog and guides).

## Develop

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```

## Deploying

Vercel never deploys automatically (`vercel.json` → `git.deploymentEnabled: false`). Every deploy is triggered manually in Vercel. Content from Sanity is read at build time, so new posts and guides appear after the next deploy.

Environment variables for Vercel are listed in `.env.example`.

## Structure

| Path | What |
| --- | --- |
| `src/app` | Pages: home, four profession pages, `/e-rechnung`, `/barrierefreiheit`, `/faq`, `/ratgeber`, `/blog`, `/kontakt`, legal pages |
| `src/app/kontakt/actions.ts` | Contact form Server Action (Resend, honeypot + time check, no captcha) |
| `src/content` | FAQ and profession copy |
| `src/components/site` | Layout and page building blocks, incl. the read-aloud button |
| `src/lib/sanity.ts` | Sanity queries (cached until the next deploy) |
| `studio/` | Sanity Studio, a separate small project – see `studio/README.md` |

## Before going live

- Replace every `<Todo>` (search the code): Impressum, privacy policy, accessibility statement.
- Have the privacy policy reviewed legally.
- Set the Resend variables and verify the sending domain in Resend.
- Optional: install Motion+ following [Motion's guide](https://motion.dev/docs/react-motion-plus-installation). The site currently uses the free `motion` package.

## Accessibility

18px base font (scales with browser settings), WCAG AA colours, skip link, visible focus, keyboard navigation, `prefers-reduced-motion` respected, read-aloud button using the browser's own speech synthesis. Fonts are self-hosted via `next/font`; no tracking, no cookies.
