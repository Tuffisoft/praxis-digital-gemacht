# Sanity Studio – Blog und Praxis-Ratgeber

The editing app for blog posts and Praxis-Ratgeber (PDF guides). It is its own small project, separate from the website, so the website stays light.

## First setup

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage). Note the **project ID**; the dataset is `production`.
2. In the project settings under **API → CORS origins**, add `http://localhost:3333` and the Studio URL (see step 5).
3. In this folder create `.env` (not committed):

   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

4. Install and start locally:

   ```bash
   cd studio
   npm install
   npm run dev   # opens http://localhost:3333
   ```

5. Publish the Studio so editors can use it in the browser: `npm run deploy` → `https://praxis-digital-gemacht.sanity.studio`.

## Connect the website

In the website's `.env.local` and in Vercel, set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Publishing

The website reads content when it is built. A new or changed post appears **after the next manual deploy on Vercel**.

## Data protection

Sign Sanity's data processing agreement (DPA). Images are optimised and PDFs are delivered through the website's own domain, so visitors never contact Sanity directly. Editor accounts are personal data and belong in the privacy policy.
